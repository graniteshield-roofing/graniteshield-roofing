/**
 * GHL Webhook Receiver — /api/v1/automation
 * 
 * This is the single entry point for all GHL workflow webhook actions.
 * It validates authentication, parses the payload, and routes the action
 * to the Universal Outbox for processing.
 * 
 * SECURITY:
 * - Shared secret via X-GHL-Webhook-Secret header
 * - Rate limiting via IP tracking (logged, not enforced in v1)
 * - Payload validation with strict schema checking
 * 
 * SUPPORTED ACTIONS:
 * - openphone.sms.send       → Send SMS via OpenPhone
 * - bland_ai.call.initiate   → Initiate AI call via Bland.ai
 * - attribution.purchase_event → Fire Meta CAPI + Google OCI events
 * - internal.notification     → Send internal team notification
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateWebhookAuth } from '@/lib/webhook-auth';
import { enqueueAndProcess, type Priority } from '@/lib/outbox';
import { initializeActionHandlers, isValidAction } from '@/lib/actions';

// Initialize handlers on cold start
initializeActionHandlers();

// ============================================================================
// TYPES
// ============================================================================

interface WebhookPayload {
  action: string;
  priority: Priority;
  contactId: string;
  opportunityId: string;
  pipelineId: string;
  stageId: string;
  data: Record<string, any>;
  metadata: {
    workflowName: string;
    triggeredAt: string;
    ghlLocationId: string;
  };
}

const VALID_PRIORITIES: Priority[] = ['P0', 'P1', 'P2', 'P3'];

// ============================================================================
// POST HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = generateRequestId();

  console.log(`[WEBHOOK] ${requestId} — Incoming request`);

  // 1. Authenticate
  const auth = validateWebhookAuth(request);
  if (!auth.authenticated) {
    console.warn(`[WEBHOOK] ${requestId} — Auth failed: ${auth.error}`);
    return NextResponse.json(
      { status: 'error', error: auth.error, requestId },
      { status: 401 }
    );
  }

  // 2. Parse payload
  let payload: WebhookPayload;
  try {
    payload = await request.json();
  } catch (err) {
    console.error(`[WEBHOOK] ${requestId} — Invalid JSON body`);
    return NextResponse.json(
      { status: 'error', error: 'Invalid JSON body', requestId },
      { status: 400 }
    );
  }

  // 3. Validate payload
  const validation = validatePayload(payload);
  if (!validation.valid) {
    console.warn(`[WEBHOOK] ${requestId} — Validation failed: ${validation.error}`);
    return NextResponse.json(
      { status: 'error', error: validation.error, requestId },
      { status: 400 }
    );
  }

  // 4. Log the incoming event
  console.log(`[WEBHOOK] ${requestId} — action=${payload.action} priority=${payload.priority} contact=${payload.contactId} workflow=${payload.metadata?.workflowName}`);

  // 5. Enqueue and process
  try {
    const result = await enqueueAndProcess(
      payload.action,
      payload.priority,
      payload.contactId,
      payload.opportunityId,
      payload.pipelineId,
      payload.stageId,
      payload.data,
      payload.metadata
    );

    const totalTime = Date.now() - startTime;
    console.log(`[WEBHOOK] ${requestId} — Completed in ${totalTime}ms | eventId=${result.eventId} status=${result.status}`);

    if (result.status === 'processed') {
      return NextResponse.json({
        status: 'enqueued',
        eventId: result.eventId,
        action: result.action,
        priority: result.priority,
        processingTimeMs: result.processingTimeMs,
        requestId,
      });
    } else {
      // Return 200 even on failure — GHL should not retry (our outbox handles retries)
      return NextResponse.json({
        status: 'enqueued',
        eventId: result.eventId,
        action: result.action,
        priority: result.priority,
        warning: result.error,
        requestId,
      });
    }
  } catch (err: any) {
    console.error(`[WEBHOOK] ${requestId} — Unexpected error:`, err);
    return NextResponse.json(
      { status: 'error', error: 'Internal server error', requestId },
      { status: 500 }
    );
  }
}

// ============================================================================
// GET HANDLER (Health Check)
// ============================================================================

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'GraniteShield Automation Webhook',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    actions: [
      'openphone.sms.send',
      'bland_ai.call.initiate',
      'attribution.purchase_event',
      'internal.notification',
    ],
  });
}

// ============================================================================
// VALIDATION
// ============================================================================

function validatePayload(payload: any): { valid: boolean; error?: string } {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, error: 'Payload must be a JSON object' };
  }

  if (!payload.action || typeof payload.action !== 'string') {
    return { valid: false, error: 'Missing or invalid "action" field' };
  }

  if (!isValidAction(payload.action)) {
    return { valid: false, error: `Unsupported action: ${payload.action}. Supported: openphone.sms.send, bland_ai.call.initiate, attribution.purchase_event, internal.notification` };
  }

  if (!payload.priority || !VALID_PRIORITIES.includes(payload.priority)) {
    return { valid: false, error: `Missing or invalid "priority" field. Must be one of: ${VALID_PRIORITIES.join(', ')}` };
  }

  if (!payload.contactId || typeof payload.contactId !== 'string') {
    return { valid: false, error: 'Missing or invalid "contactId" field' };
  }

  if (!payload.data || typeof payload.data !== 'object') {
    return { valid: false, error: 'Missing or invalid "data" field' };
  }

  if (!payload.metadata || typeof payload.metadata !== 'object') {
    return { valid: false, error: 'Missing or invalid "metadata" field' };
  }

  if (!payload.metadata.workflowName) {
    return { valid: false, error: 'Missing "metadata.workflowName" field' };
  }

  return { valid: true };
}

// ============================================================================
// UTILITIES
// ============================================================================

function generateRequestId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `req_${timestamp}_${random}`;
}
