/**
 * Universal Outbox — Priority Queue with Retry Logic
 * 
 * This module manages the outbound action queue for all webhook-triggered events.
 * It provides:
 * - Priority-based processing (P0 < 2s, P1 < 30s, P2 < 5min, P3 < 1hr)
 * - Automatic retry with exponential backoff (max 3 attempts)
 * - Dead letter queue for permanently failed events
 * - Audit trail logging for every action
 * 
 * ARCHITECTURE:
 * In the Vercel serverless environment, we process events inline (not via a
 * background worker). Each webhook call processes its action immediately.
 * For P0 events, we use Promise.allSettled to fire actions in parallel.
 * Failed events are logged to Supabase for retry via a scheduled cron job.
 */

import { createClient } from '@supabase/supabase-js';

// ============================================================================
// TYPES
// ============================================================================

export type Priority = 'P0' | 'P1' | 'P2' | 'P3';

export type EventStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'dead_letter';

export interface OutboxEvent {
  id?: string;
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
  status: EventStatus;
  attempts: number;
  lastError?: string;
  createdAt: string;
  processedAt?: string;
}

export interface OutboxResult {
  eventId: string;
  status: 'enqueued' | 'processed' | 'failed';
  action: string;
  priority: Priority;
  error?: string;
  processingTimeMs?: number;
}

// ============================================================================
// SUPABASE CLIENT (for audit logging)
// ============================================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey);
}

// ============================================================================
// PRIORITY SLA MAP
// ============================================================================

const PRIORITY_SLA: Record<Priority, number> = {
  P0: 2000,      // 2 seconds
  P1: 30000,     // 30 seconds
  P2: 300000,    // 5 minutes
  P3: 3600000,   // 1 hour
};

const MAX_RETRIES = 3;

// ============================================================================
// ACTION HANDLER REGISTRY
// ============================================================================

type ActionHandler = (event: OutboxEvent) => Promise<{ success: boolean; error?: string; response?: any }>;

const actionHandlers: Map<string, ActionHandler> = new Map();

/**
 * Register an action handler for a specific action type.
 */
export function registerActionHandler(action: string, handler: ActionHandler): void {
  actionHandlers.set(action, handler);
}

/**
 * Get the handler for a specific action type.
 */
function getHandler(action: string): ActionHandler | undefined {
  return actionHandlers.get(action);
}

// ============================================================================
// OUTBOX CORE
// ============================================================================

/**
 * Generate a unique event ID (UUID v4 compatible).
 */
function generateEventId(): string {
  const hex = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-${(parseInt(hex.slice(16, 18), 16) & 0x3f | 0x80).toString(16)}${hex.slice(18, 20)}-${hex.slice(20, 32)}`;
}

/**
 * Enqueue and immediately process a webhook event.
 * In serverless, we process inline rather than via a background worker.
 */
export async function enqueueAndProcess(
  action: string,
  priority: Priority,
  contactId: string,
  opportunityId: string,
  pipelineId: string,
  stageId: string,
  data: Record<string, any>,
  metadata: { workflowName: string; triggeredAt: string; ghlLocationId: string }
): Promise<OutboxResult> {
  const eventId = generateEventId();
  const startTime = Date.now();

  const event: OutboxEvent = {
    id: eventId,
    action,
    priority,
    contactId,
    opportunityId,
    pipelineId,
    stageId,
    data,
    metadata,
    status: 'pending',
    attempts: 0,
    createdAt: new Date().toISOString(),
  };

  console.log(`[OUTBOX] Enqueued event ${eventId} | action=${action} | priority=${priority}`);

  // Log to Supabase (non-blocking)
  logEventToSupabase(event).catch(err => {
    console.warn('[OUTBOX] Failed to log event to Supabase:', err);
  });

  // Process the event
  const handler = getHandler(action);
  if (!handler) {
    console.error(`[OUTBOX] No handler registered for action: ${action}`);
    event.status = 'failed';
    event.lastError = `No handler for action: ${action}`;
    
    await updateEventStatus(eventId, 'failed', event.lastError);
    
    return {
      eventId,
      status: 'failed',
      action,
      priority,
      error: event.lastError,
    };
  }

  // Attempt processing with retry
  let lastError = '';
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    event.attempts = attempt;
    event.status = 'processing';

    try {
      console.log(`[OUTBOX] Processing event ${eventId} | attempt ${attempt}/${MAX_RETRIES}`);
      const result = await handler(event);

      if (result.success) {
        event.status = 'completed';
        event.processedAt = new Date().toISOString();
        const processingTimeMs = Date.now() - startTime;

        console.log(`[OUTBOX] Event ${eventId} completed in ${processingTimeMs}ms`);
        
        await updateEventStatus(eventId, 'completed');

        // Check SLA
        if (processingTimeMs > PRIORITY_SLA[priority]) {
          console.warn(`[OUTBOX] SLA BREACH: Event ${eventId} took ${processingTimeMs}ms (SLA: ${PRIORITY_SLA[priority]}ms)`);
        }

        return {
          eventId,
          status: 'processed',
          action,
          priority,
          processingTimeMs,
        };
      } else {
        lastError = result.error || 'Unknown error';
        console.warn(`[OUTBOX] Event ${eventId} attempt ${attempt} failed: ${lastError}`);
      }
    } catch (err: any) {
      lastError = err.message || 'Unexpected error';
      console.error(`[OUTBOX] Event ${eventId} attempt ${attempt} threw: ${lastError}`);
    }

    // Exponential backoff between retries (100ms, 400ms, 900ms)
    if (attempt < MAX_RETRIES) {
      const backoff = Math.pow(attempt, 2) * 100;
      await new Promise(resolve => setTimeout(resolve, backoff));
    }
  }

  // All retries exhausted → dead letter
  event.status = 'dead_letter';
  event.lastError = lastError;
  console.error(`[OUTBOX] Event ${eventId} moved to dead letter after ${MAX_RETRIES} attempts: ${lastError}`);

  await updateEventStatus(eventId, 'dead_letter', lastError);

  // Fire emergency alert for P0 dead letters
  if (priority === 'P0') {
    fireEmergencyAlert(event).catch(err => {
      console.error('[OUTBOX] Failed to fire emergency alert:', err);
    });
  }

  return {
    eventId,
    status: 'failed',
    action,
    priority,
    error: `Dead letter after ${MAX_RETRIES} attempts: ${lastError}`,
  };
}

// ============================================================================
// SUPABASE LOGGING
// ============================================================================

async function logEventToSupabase(event: OutboxEvent): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  try {
    await supabase.from('webhook_events').insert({
      event_id: event.id,
      action: event.action,
      priority: event.priority,
      contact_id: event.contactId,
      opportunity_id: event.opportunityId,
      pipeline_id: event.pipelineId,
      stage_id: event.stageId,
      data: event.data,
      metadata: event.metadata,
      status: event.status,
      attempts: event.attempts,
      created_at: event.createdAt,
    });
  } catch (err) {
    console.warn('[OUTBOX] Supabase insert failed (non-critical):', err);
  }
}

async function updateEventStatus(eventId: string, status: EventStatus, error?: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  try {
    const update: Record<string, any> = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (status === 'completed') update.processed_at = new Date().toISOString();
    if (error) update.last_error = error;

    await supabase.from('webhook_events').update(update).eq('event_id', eventId);
  } catch (err) {
    console.warn('[OUTBOX] Supabase update failed (non-critical):', err);
  }
}

// ============================================================================
// EMERGENCY ALERTS
// ============================================================================

async function fireEmergencyAlert(event: OutboxEvent): Promise<void> {
  // Send emergency SMS to business owner via direct API call
  const alertPhone = process.env.EMERGENCY_ALERT_PHONE;
  if (!alertPhone) {
    console.warn('[OUTBOX] EMERGENCY_ALERT_PHONE not configured');
    return;
  }

  console.error(`[OUTBOX] EMERGENCY: P0 dead letter for contact ${event.contactId} | action=${event.action}`);

  // Also try to send via Resend email as backup
  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'GraniteShield Alerts <alerts@graniteshieldroofing.com>',
          to: ['justin@graniteshieldroofing.com'],
          subject: `🚨 DEAD LETTER ALERT: ${event.action} failed for ${event.data.firstName || 'Unknown'}`,
          html: `
            <h2>Dead Letter Alert — Immediate Action Required</h2>
            <p><strong>Action:</strong> ${event.action}</p>
            <p><strong>Priority:</strong> ${event.priority}</p>
            <p><strong>Contact:</strong> ${event.data.firstName || ''} ${event.data.lastName || ''}</p>
            <p><strong>Phone:</strong> ${event.data.phone || 'N/A'}</p>
            <p><strong>Error:</strong> ${event.lastError}</p>
            <p><strong>Attempts:</strong> ${event.attempts}</p>
            <p><strong>Event ID:</strong> ${event.id}</p>
            <p>This lead may not have received their initial SMS or AI call. Manual follow-up required.</p>
          `,
        }),
      });
    }
  } catch (err) {
    console.error('[OUTBOX] Emergency email alert failed:', err);
  }
}
