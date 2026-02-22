/**
 * AI Receptionist Webhook — /api/v1/receptionist
 * 
 * This is the brain of the GraniteShield AI Receptionist.
 * 
 * FLOW:
 * 1. GHL sends inbound SMS webhook → this endpoint
 * 2. Load/create session state from Supabase
 * 3. Run guardrails (stop words, rate limit, max messages)
 * 4. Call OpenAI for next response + actions
 * 5. Execute actions on GHL (tags, stage, tasks)
 * 6. Send SMS reply via OpenPhone
 * 7. Update Supabase state
 * 
 * ALSO HANDLES:
 * - First contact (outbound) when new lead is created
 * - Stage change feedback loop
 * 
 * ENDPOINTS:
 * POST /api/v1/receptionist          — Inbound SMS from customer
 * POST /api/v1/receptionist?action=first_contact  — New lead first touch
 * POST /api/v1/receptionist?action=stage_change   — Stage change feedback
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateWebhookAuth } from '@/lib/webhook-auth';
import { generateReceptionistReply, generateFirstContact, classifyLeadIntent } from '@/lib/ai/openai-client';
import { runGuardrails } from '@/lib/ai/guardrails';
import {
  upsertLead,
  getOrCreateSession,
  updateSession,
  logMessage,
  getRecentMessages,
  logStageChange,
  updateLeadIntelligence,
} from '@/lib/ai/state-manager';
import {
  addTagsToContact,
  updateOpportunityStage,
  createTask,
  notifyJustin,
  searchContactByPhone,
  getContact,
} from '@/lib/actions/ghl-executor';
import { handleOpenPhoneSMS } from '@/lib/actions/openphone-sms';
import type { OutboxEvent } from '@/lib/outbox';
import type { ConversationContext } from '@/lib/ai/receptionist-prompt';

// ============================================================================
// POST HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = `rcpt_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
  const action = request.nextUrl.searchParams.get('action') || 'inbound_sms';

  console.log(`[RECEPTIONIST] ${requestId} — action=${action}`);

  // Authenticate
  const auth = validateWebhookAuth(request);
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error, requestId }, { status: 401 });
  }

  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON', requestId }, { status: 400 });
  }

  try {
    switch (action) {
      case 'inbound_sms':
        return await handleInboundSms(payload, requestId, startTime);
      case 'first_contact':
        return await handleFirstContact(payload, requestId, startTime);
      case 'stage_change':
        return await handleStageChange(payload, requestId);
      default:
        return NextResponse.json({ error: `Unknown action: ${action}`, requestId }, { status: 400 });
    }
  } catch (err: any) {
    console.error(`[RECEPTIONIST] ${requestId} — Unexpected error:`, err);
    return NextResponse.json({ error: 'Internal server error', requestId }, { status: 500 });
  }
}

// ============================================================================
// INBOUND SMS HANDLER
// ============================================================================

/**
 * Expected payload from GHL webhook:
 * {
 *   contactId: string,
 *   phone: string,
 *   message: string,
 *   firstName?: string,
 *   lastName?: string,
 *   email?: string,
 *   opportunityId?: string
 * }
 */
async function handleInboundSms(payload: any, requestId: string, startTime: number) {
  const { contactId, phone, message, firstName, lastName, email, opportunityId } = payload;

  if (!contactId || !message) {
    return NextResponse.json({ error: 'Missing contactId or message', requestId }, { status: 400 });
  }

  console.log(`[RECEPTIONIST] ${requestId} — Inbound from ${contactId}: "${message.substring(0, 80)}"`);

  // 1. Upsert lead in Supabase
  const leadId = await upsertLead({
    ghlContactId: contactId,
    fullName: [firstName, lastName].filter(Boolean).join(' ') || undefined,
    firstName,
    lastName,
    phone,
    email,
  });

  if (!leadId) {
    console.error(`[RECEPTIONIST] ${requestId} — Failed to upsert lead`);
    return NextResponse.json({ error: 'Failed to create lead record', requestId }, { status: 500 });
  }

  // 2. Get or create receptionist session
  const session = await getOrCreateSession(contactId, leadId);
  if (!session) {
    return NextResponse.json({ error: 'Failed to get session', requestId }, { status: 500 });
  }

  // 3. Log inbound message
  await logMessage({
    leadId,
    ghlContactId: contactId,
    direction: 'inbound',
    message,
    messageSource: 'customer',
  });

  // 4. Run guardrails
  const guardrail = runGuardrails({
    incomingMessage: message,
    messagesSent: session.messages_sent,
    lastMessageSentAt: session.last_message_sent_at ? new Date(session.last_message_sent_at) : null,
    lastMessageRecvAt: session.last_message_recv_at ? new Date(session.last_message_recv_at) : null,
    humanTakeover: session.human_takeover,
    stopRequested: session.stop_requested,
  });

  console.log(`[RECEPTIONIST] ${requestId} — Guardrail: ${guardrail.action} (allowed=${guardrail.allowed})`);

  // Handle stop
  if (guardrail.action === 'stop') {
    await updateSession(contactId, {
      stop_requested: true,
      status: 'stopped',
    });
    await addTagsToContact(contactId, ['system: opted out']);
    console.log(`[RECEPTIONIST] ${requestId} — Customer opted out, automation stopped`);
    return NextResponse.json({ status: 'stopped', reason: guardrail.reason, requestId });
  }

  // Handle max messages — escalate to human
  if (guardrail.action === 'max_messages') {
    await updateSession(contactId, {
      human_takeover: true,
      status: 'escalated',
      escalation_reason: 'Max AI messages reached',
    });
    await createTask(contactId, 'AI Max Messages — Human Follow-up Needed',
      `AI sent ${session.messages_sent} messages without resolution. Last customer message: "${message}". Please follow up manually.`, 10);
    await notifyJustin(`🔔 Lead needs human follow-up (AI max messages). Contact: ${firstName || 'Unknown'} ${phone || ''}`);
    return NextResponse.json({ status: 'escalated', reason: guardrail.reason, requestId });
  }

  // Handle rate limit
  if (guardrail.action === 'rate_limit') {
    console.log(`[RECEPTIONIST] ${requestId} — Rate limited, will retry`);
    return NextResponse.json({ status: 'rate_limited', reason: guardrail.reason, requestId });
  }

  // 5. Build conversation context for OpenAI
  const recentMessages = await getRecentMessages(contactId, 8);
  const conversationSummary = session.conversation_summary ||
    recentMessages.map(m => `${m.direction === 'inbound' ? 'Customer' : 'GraniteShield'}: ${m.message}`).join('\n');

  const now = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const context: ConversationContext = {
    contactName: [firstName, lastName].filter(Boolean).join(' ') || 'Customer',
    phone: phone || '',
    currentStep: session.current_step,
    messagesSent: session.messages_sent,
    messagesReceived: session.messages_received + 1,
    conversationSummary,
    collectedData: {
      service_needed: session.service_needed || undefined,
      location_town: session.location_town || undefined,
      urgency: session.urgency || undefined,
      roof_type: session.roof_type || undefined,
      preferred_time: session.preferred_time || undefined,
    },
    incomingMessage: message,
    currentDayOfWeek: dayNames[now.getDay()],
    currentDate: now.toISOString().split('T')[0],
  };

  // 6. Call OpenAI
  const { response: aiResponse, latencyMs } = await generateReceptionistReply(context);
  console.log(`[RECEPTIONIST] ${requestId} — AI responded in ${latencyMs}ms, confidence=${aiResponse.confidence}`);

  // 7. Execute AI-directed actions

  // 7a. Send SMS reply
  const smsEvent: OutboxEvent = {
    action: 'openphone.sms.send',
    priority: 'P0',
    contactId,
    opportunityId: opportunityId || '',
    pipelineId: '',
    stageId: '',
    data: { phone, message: aiResponse.next_sms, firstName },
    metadata: { workflowName: 'ai-receptionist', triggeredAt: new Date().toISOString(), ghlLocationId: 'WN9muDg6rCcc3qk631Hz' },
    status: 'processing',
    attempts: 0,
    createdAt: new Date().toISOString(),
  };
  const smsResult = await handleOpenPhoneSMS(smsEvent);

  if (!smsResult.success) {
    console.error(`[RECEPTIONIST] ${requestId} — SMS send failed: ${smsResult.error}`);
  }

  // 7b. Add tags
  if (aiResponse.tags_to_add?.length) {
    await addTagsToContact(contactId, aiResponse.tags_to_add);
  }

  // 7c. Update stage
  if (aiResponse.stage_update && opportunityId) {
    await updateOpportunityStage(opportunityId, aiResponse.stage_update);
  }

  // 7d. Create task
  if (aiResponse.create_task && aiResponse.task_fields) {
    await createTask(
      contactId,
      aiResponse.task_fields.title,
      aiResponse.task_fields.description,
      aiResponse.task_fields.due_in_minutes
    );
  }

  // 7e. Escalate if needed
  if (aiResponse.escalate || guardrail.action === 'escalate') {
    const reason = aiResponse.escalation_reason || guardrail.reason || 'AI-detected escalation';
    await updateSession(contactId, {
      escalated_at: new Date().toISOString(),
      escalation_reason: reason,
    });
    await createTask(contactId, `URGENT: ${reason}`,
      `Customer message: "${message}"\nAI assessment: ${aiResponse.reasoning}`, 5);
    await notifyJustin(`🚨 URGENT LEAD: ${firstName || 'Unknown'} (${phone || 'no phone'}) — ${reason}`);
  }

  // 8. Update Supabase state
  const sessionUpdates: any = {
    status: aiResponse.stop_detected ? 'stopped' : (aiResponse.escalate ? 'escalated' : 'awaiting_reply'),
    current_step: aiResponse.next_step,
    messages_sent: session.messages_sent + 1,
    messages_received: session.messages_received + 1,
    last_message_sent_at: new Date().toISOString(),
    last_message_recv_at: new Date().toISOString(),
    stop_requested: aiResponse.stop_detected,
  };

  // Merge extracted data
  const ext = aiResponse.extracted_data || {};
  if (ext.service_needed) sessionUpdates.service_needed = ext.service_needed;
  if (ext.location_town) sessionUpdates.location_town = ext.location_town;
  if (ext.urgency) sessionUpdates.urgency = ext.urgency;
  if (ext.roof_type) sessionUpdates.roof_type = ext.roof_type;
  if (ext.preferred_time) sessionUpdates.preferred_time = ext.preferred_time;

  await updateSession(contactId, sessionUpdates);

  // 9. Log outbound message
  await logMessage({
    leadId,
    ghlContactId: contactId,
    direction: 'outbound',
    message: aiResponse.next_sms,
    messageSource: 'ai_receptionist',
    detectedIntent: aiResponse.next_step,
  });

  const totalTime = Date.now() - startTime;
  console.log(`[RECEPTIONIST] ${requestId} — Complete in ${totalTime}ms`);

  return NextResponse.json({
    status: 'processed',
    requestId,
    sms_sent: smsResult.success,
    ai_latency_ms: latencyMs,
    total_ms: totalTime,
    next_step: aiResponse.next_step,
    tags_added: aiResponse.tags_to_add,
    escalated: aiResponse.escalate,
  });
}

// ============================================================================
// FIRST CONTACT HANDLER — New lead, send opening SMS
// ============================================================================

async function handleFirstContact(payload: any, requestId: string, startTime: number) {
  const { contactId, phone, firstName, lastName, email, source, projectType, opportunityId } = payload;

  if (!contactId || !phone) {
    return NextResponse.json({ error: 'Missing contactId or phone', requestId }, { status: 400 });
  }

  console.log(`[RECEPTIONIST] ${requestId} — First contact for ${contactId}`);

  // 1. Upsert lead
  const leadId = await upsertLead({
    ghlContactId: contactId,
    fullName: [firstName, lastName].filter(Boolean).join(' ') || undefined,
    firstName,
    lastName,
    phone,
    email,
    source,
    projectType,
  });

  if (!leadId) {
    return NextResponse.json({ error: 'Failed to create lead', requestId }, { status: 500 });
  }

  // 2. Score the lead
  const { result: score } = await classifyLeadIntent({
    source: source || 'unknown',
    projectType,
    hasPhone: !!phone,
    hasEmail: !!email,
  });

  // 3. Update lead intelligence
  await updateLeadIntelligence(contactId, {
    intent_score: score.intent_score,
    ai_classification: score.classification,
    urgency_level: score.urgency_level,
    financing_probability: score.financing_probability,
    response_time_seconds: Math.round((Date.now() - startTime) / 1000),
    first_contact_at: new Date().toISOString(),
  });

  // 4. Tag based on classification
  const intentTag = `intent: ${score.classification.toLowerCase()}`;
  await addTagsToContact(contactId, [intentTag]);

  // 5. Create session
  await getOrCreateSession(contactId, leadId);

  // 6. Generate first contact SMS
  const contactName = [firstName, lastName].filter(Boolean).join(' ') || 'there';
  const { response: aiResponse } = await generateFirstContact(contactName, source || 'website', projectType);

  // 7. Send SMS
  const smsEvent: OutboxEvent = {
    action: 'openphone.sms.send',
    priority: 'P0',
    contactId,
    opportunityId: opportunityId || '',
    pipelineId: '',
    stageId: '',
    data: { phone, message: aiResponse.next_sms, firstName },
    metadata: { workflowName: 'ai-receptionist-first-contact', triggeredAt: new Date().toISOString(), ghlLocationId: 'WN9muDg6rCcc3qk631Hz' },
    status: 'processing',
    attempts: 0,
    createdAt: new Date().toISOString(),
  };
  const smsResult = await handleOpenPhoneSMS(smsEvent);

  // 8. Update session
  await updateSession(contactId, {
    status: 'awaiting_reply',
    current_step: aiResponse.next_step,
    messages_sent: 1,
    last_message_sent_at: new Date().toISOString(),
  });

  // 9. Log outbound message
  await logMessage({
    leadId,
    ghlContactId: contactId,
    direction: 'outbound',
    message: aiResponse.next_sms,
    messageSource: 'ai_receptionist',
  });

  // 10. Update stage if specified
  if (aiResponse.stage_update && opportunityId) {
    await updateOpportunityStage(opportunityId, aiResponse.stage_update);
  }

  const totalTime = Date.now() - startTime;
  console.log(`[RECEPTIONIST] ${requestId} — First contact complete in ${totalTime}ms | score=${score.intent_score} class=${score.classification}`);

  return NextResponse.json({
    status: 'processed',
    requestId,
    sms_sent: smsResult.success,
    intent_score: score.intent_score,
    classification: score.classification,
    total_ms: totalTime,
  });
}

// ============================================================================
// STAGE CHANGE HANDLER — Feedback loop
// ============================================================================

async function handleStageChange(payload: any, requestId: string) {
  const { contactId, opportunityId, pipelineName, fromStage, toStage, triggeredBy } = payload;

  if (!contactId || !toStage) {
    return NextResponse.json({ error: 'Missing contactId or toStage', requestId }, { status: 400 });
  }

  await logStageChange({
    ghlContactId: contactId,
    ghlOpportunityId: opportunityId,
    pipelineName: pipelineName || 'Sales',
    fromStage,
    toStage,
    triggeredBy: triggeredBy || 'ghl_workflow',
  });

  console.log(`[RECEPTIONIST] ${requestId} — Stage change logged: ${fromStage} → ${toStage}`);

  return NextResponse.json({ status: 'logged', requestId });
}

// ============================================================================
// GET HANDLER — Health check
// ============================================================================

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'GraniteShield AI Receptionist',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      inbound_sms: 'POST /api/v1/receptionist',
      first_contact: 'POST /api/v1/receptionist?action=first_contact',
      stage_change: 'POST /api/v1/receptionist?action=stage_change',
    },
  });
}
