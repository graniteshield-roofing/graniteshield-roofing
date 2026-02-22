/**
 * OpenAI Client — Centralized AI interface for GraniteShield
 * 
 * Handles all OpenAI API calls with:
 * - Structured JSON output parsing
 * - Latency tracking
 * - Error handling with fallback
 * - Decision logging to Supabase
 */

import OpenAI from 'openai';
import { getSupabaseAdmin } from '../supabase-admin';
import {
  RECEPTIONIST_SYSTEM_PROMPT,
  buildUserPrompt,
  buildFirstContactPrompt,
  type AIReceptionistResponse,
  type ConversationContext,
} from './receptionist-prompt';

// ============================================================================
// CLIENT SETUP
// ============================================================================

const MODEL = 'gpt-4.1-mini';

function getOpenAIClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // base_url is pre-configured via env
  });
}

// ============================================================================
// AI RECEPTIONIST — Generate next SMS reply
// ============================================================================

export async function generateReceptionistReply(
  ctx: ConversationContext
): Promise<{ response: AIReceptionistResponse; latencyMs: number }> {
  const startTime = Date.now();
  const client = getOpenAIClient();

  const userPrompt = buildUserPrompt(ctx);

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: RECEPTIONIST_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 800,
    });

    const latencyMs = Date.now() - startTime;
    const raw = completion.choices[0]?.message?.content || '{}';

    let parsed: AIReceptionistResponse;
    try {
      parsed = JSON.parse(raw) as AIReceptionistResponse;
    } catch {
      console.error('[AI] Failed to parse OpenAI response:', raw);
      parsed = buildFallbackResponse();
    }

    // Validate required fields
    if (!parsed.next_sms || typeof parsed.next_sms !== 'string') {
      console.warn('[AI] Missing next_sms in response, using fallback');
      parsed = buildFallbackResponse();
    }

    // Log decision to Supabase
    await logAIDecision({
      ghlContactId: ctx.phone, // will be resolved to contact ID upstream
      decisionType: 'sms_generate',
      inputPayload: { context: ctx },
      aiOutput: parsed,
      confidenceScore: parsed.confidence || 0.5,
      latencyMs,
    });

    return { response: parsed, latencyMs };
  } catch (err: any) {
    const latencyMs = Date.now() - startTime;
    console.error('[AI] OpenAI call failed:', err.message);

    // Log the failure
    await logAIDecision({
      ghlContactId: ctx.phone,
      decisionType: 'sms_generate',
      inputPayload: { context: ctx, error: err.message },
      aiOutput: { error: err.message },
      confidenceScore: 0,
      latencyMs,
    });

    return { response: buildFallbackResponse(), latencyMs };
  }
}

// ============================================================================
// AI RECEPTIONIST — Generate first contact message
// ============================================================================

export async function generateFirstContact(
  contactName: string,
  source: string,
  projectType?: string
): Promise<{ response: AIReceptionistResponse; latencyMs: number }> {
  const startTime = Date.now();
  const client = getOpenAIClient();

  const userPrompt = buildFirstContactPrompt(contactName, source, projectType);

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: RECEPTIONIST_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 600,
    });

    const latencyMs = Date.now() - startTime;
    const raw = completion.choices[0]?.message?.content || '{}';
    let parsed: AIReceptionistResponse;

    try {
      parsed = JSON.parse(raw) as AIReceptionistResponse;
    } catch {
      parsed = buildFirstContactFallback(contactName);
    }

    return { response: parsed, latencyMs };
  } catch (err: any) {
    console.error('[AI] First contact generation failed:', err.message);
    return {
      response: buildFirstContactFallback(contactName),
      latencyMs: Date.now() - startTime,
    };
  }
}

// ============================================================================
// LEAD INTENT CLASSIFIER
// ============================================================================

export interface LeadScoreResult {
  intent_score: number;           // 1-100
  classification: 'HOT' | 'WARM' | 'COLD';
  financing_probability: number;  // 0-1
  urgency_level: 'emergency' | 'urgent' | 'normal' | 'low';
  reasoning: string;
}

export async function classifyLeadIntent(leadData: {
  source: string;
  projectType?: string;
  message?: string;
  timeline?: string;
  town?: string;
  hasPhone: boolean;
  hasEmail: boolean;
  formAnswers?: Record<string, any>;
}): Promise<{ result: LeadScoreResult; latencyMs: number }> {
  const startTime = Date.now();
  const client = getOpenAIClient();

  const prompt = `Score this roofing lead on a scale of 1-100 and classify as HOT, WARM, or COLD.

LEAD DATA:
- Source: ${leadData.source}
- Project type: ${leadData.projectType || 'not specified'}
- Message: "${leadData.message || 'none'}"
- Timeline: ${leadData.timeline || 'not specified'}
- Town: ${leadData.town || 'not specified'}
- Has phone: ${leadData.hasPhone}
- Has email: ${leadData.hasEmail}
- Form answers: ${JSON.stringify(leadData.formAnswers || {})}

SCORING GUIDE:
- 80-100 (HOT): Emergency repairs, active leaks, ice dams with damage, ready to schedule this week, insurance claims
- 50-79 (WARM): Planning replacement, comparing quotes, timeline within 1-3 months, interested in financing
- 1-49 (COLD): Just browsing, no timeline, incomplete contact info, out of service area

RESPOND WITH JSON:
{
  "intent_score": <number 1-100>,
  "classification": "<HOT|WARM|COLD>",
  "financing_probability": <number 0-1>,
  "urgency_level": "<emergency|urgent|normal|low>",
  "reasoning": "<brief explanation>"
}`;

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a lead scoring AI for a Maine roofing company. Respond only with valid JSON.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
      max_tokens: 300,
    });

    const latencyMs = Date.now() - startTime;
    const raw = completion.choices[0]?.message?.content || '{}';
    const result = JSON.parse(raw) as LeadScoreResult;

    // Validate and clamp
    result.intent_score = Math.max(1, Math.min(100, result.intent_score || 50));
    if (!['HOT', 'WARM', 'COLD'].includes(result.classification)) {
      result.classification = result.intent_score >= 80 ? 'HOT' : result.intent_score >= 50 ? 'WARM' : 'COLD';
    }

    // Log decision
    await logAIDecision({
      ghlContactId: 'scoring',
      decisionType: 'lead_score',
      inputPayload: leadData,
      aiOutput: result,
      confidenceScore: result.intent_score / 100,
      latencyMs,
    });

    return { result, latencyMs };
  } catch (err: any) {
    console.error('[AI] Lead scoring failed:', err.message);
    return {
      result: {
        intent_score: 50,
        classification: 'WARM',
        financing_probability: 0.3,
        urgency_level: 'normal',
        reasoning: 'Scoring failed — defaulting to WARM for safety',
      },
      latencyMs: Date.now() - startTime,
    };
  }
}

// ============================================================================
// DECISION LOGGING
// ============================================================================

async function logAIDecision(params: {
  ghlContactId: string;
  decisionType: string;
  inputPayload: any;
  aiOutput: any;
  confidenceScore: number;
  latencyMs: number;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  try {
    await supabase.from('ai_decisions').insert({
      ghl_contact_id: params.ghlContactId,
      decision_type: params.decisionType,
      model_used: MODEL,
      input_payload: params.inputPayload,
      ai_output: params.aiOutput,
      confidence_score: params.confidenceScore,
      latency_ms: params.latencyMs,
    });
  } catch (err) {
    console.warn('[AI] Failed to log decision to Supabase:', err);
  }
}

// ============================================================================
// FALLBACK RESPONSES
// ============================================================================

function buildFallbackResponse(): AIReceptionistResponse {
  return {
    next_sms: "Thanks for your message! Let me have someone from our team get back to you shortly.",
    tags_to_add: ['system: needs review'],
    stage_update: null,
    create_task: true,
    task_fields: {
      title: 'AI Receptionist Fallback — Manual Follow-up Needed',
      description: 'The AI receptionist could not generate a response. Please follow up manually.',
      priority: 'high',
      due_in_minutes: 15,
    },
    book_appointment: false,
    next_step: 'escalated',
    extracted_data: {},
    escalate: true,
    escalation_reason: 'AI response generation failed',
    stop_detected: false,
    confidence: 0,
    reasoning: 'Fallback response — OpenAI call failed or returned invalid JSON',
  };
}

function buildFirstContactFallback(name: string): AIReceptionistResponse {
  const firstName = name.split(' ')[0] || 'there';
  return {
    next_sms: `Hi ${firstName}, this is GraniteShield Roofing. Thanks for reaching out! What can we help you with — are you dealing with a leak or damage, ice dam issues, or looking at a roof replacement?`,
    tags_to_add: [],
    stage_update: 'Contacted',
    create_task: false,
    book_appointment: false,
    next_step: 'needs_assessment',
    extracted_data: {},
    escalate: false,
    stop_detected: false,
    confidence: 0.9,
    reasoning: 'Hardcoded first contact fallback — reliable opening message',
  };
}
