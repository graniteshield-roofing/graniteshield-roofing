/**
 * State Manager — Supabase read/write for AI Receptionist
 * 
 * Manages:
 * - Receptionist session state (current step, collected data, guardrail counters)
 * - Conversation memory (message history + AI summaries)
 * - Lead master record (upsert on first contact)
 * - Stage change logging (feedback loop)
 */

import { getSupabaseAdmin } from '../supabase-admin';

// ============================================================================
// TYPES
// ============================================================================

export interface ReceptionistSession {
  id: string;
  lead_id: string;
  ghl_contact_id: string;
  status: string;
  current_step: string;
  messages_sent: number;
  messages_received: number;
  service_needed: string | null;
  location_town: string | null;
  urgency: string | null;
  roof_type: string | null;
  preferred_time: string | null;
  additional_notes: string | null;
  last_message_sent_at: string | null;
  last_message_recv_at: string | null;
  escalated_at: string | null;
  escalation_reason: string | null;
  human_takeover: boolean;
  stop_requested: boolean;
  conversation_summary: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// LEAD MASTER — Upsert
// ============================================================================

export async function upsertLead(params: {
  ghlContactId: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  source?: string;
  projectType?: string;
  tags?: string[];
}): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('leads_master')
      .upsert(
        {
          ghl_contact_id: params.ghlContactId,
          full_name: params.fullName,
          first_name: params.firstName,
          last_name: params.lastName,
          phone: params.phone,
          email: params.email,
          source: params.source,
          project_type: params.projectType,
          tags: params.tags || [],
        },
        { onConflict: 'ghl_contact_id' }
      )
      .select('id')
      .single();

    if (error) {
      console.error('[STATE] Lead upsert failed:', error);
      return null;
    }

    return data?.id || null;
  } catch (err) {
    console.error('[STATE] Lead upsert error:', err);
    return null;
  }
}

// ============================================================================
// RECEPTIONIST SESSION — Get or Create
// ============================================================================

export async function getOrCreateSession(
  ghlContactId: string,
  leadId: string
): Promise<ReceptionistSession | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  try {
    // Try to get existing session
    const { data: existing } = await supabase
      .from('receptionist_state')
      .select('*')
      .eq('ghl_contact_id', ghlContactId)
      .single();

    if (existing) return existing as ReceptionistSession;

    // Create new session
    const { data: created, error } = await supabase
      .from('receptionist_state')
      .insert({
        lead_id: leadId,
        ghl_contact_id: ghlContactId,
        status: 'in_progress',
        current_step: 'greeting',
        messages_sent: 0,
        messages_received: 0,
      })
      .select('*')
      .single();

    if (error) {
      console.error('[STATE] Session creation failed:', error);
      return null;
    }

    return created as ReceptionistSession;
  } catch (err) {
    console.error('[STATE] Session get/create error:', err);
    return null;
  }
}

// ============================================================================
// RECEPTIONIST SESSION — Update after AI response
// ============================================================================

export async function updateSession(
  ghlContactId: string,
  updates: Partial<{
    status: string;
    current_step: string;
    messages_sent: number;
    messages_received: number;
    service_needed: string;
    location_town: string;
    urgency: string;
    roof_type: string;
    preferred_time: string;
    additional_notes: string;
    last_message_sent_at: string;
    last_message_recv_at: string;
    escalated_at: string;
    escalation_reason: string;
    human_takeover: boolean;
    stop_requested: boolean;
    conversation_summary: string;
  }>
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('receptionist_state')
      .update(updates)
      .eq('ghl_contact_id', ghlContactId);

    if (error) {
      console.error('[STATE] Session update failed:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[STATE] Session update error:', err);
    return false;
  }
}

// ============================================================================
// CONVERSATION MEMORY — Log message
// ============================================================================

export async function logMessage(params: {
  leadId: string;
  ghlContactId: string;
  direction: 'inbound' | 'outbound';
  message: string;
  channel?: string;
  aiSummary?: string;
  sentimentScore?: number;
  detectedIntent?: string;
  extractedData?: Record<string, any>;
  messageSource?: string;
}): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('conversation_memory').insert({
      lead_id: params.leadId,
      ghl_contact_id: params.ghlContactId,
      direction: params.direction,
      channel: params.channel || 'sms',
      message: params.message,
      ai_summary: params.aiSummary,
      sentiment_score: params.sentimentScore,
      detected_intent: params.detectedIntent,
      extracted_data: params.extractedData,
      message_source: params.messageSource,
    });

    if (error) {
      console.error('[STATE] Message log failed:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[STATE] Message log error:', err);
    return false;
  }
}

// ============================================================================
// CONVERSATION MEMORY — Get recent messages for context
// ============================================================================

export async function getRecentMessages(
  ghlContactId: string,
  limit: number = 10
): Promise<Array<{ direction: string; message: string; created_at: string }>> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('conversation_memory')
      .select('direction, message, created_at')
      .eq('ghl_contact_id', ghlContactId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('[STATE] Get messages failed:', error);
      return [];
    }

    return (data || []).reverse(); // Return in chronological order
  } catch (err) {
    console.error('[STATE] Get messages error:', err);
    return [];
  }
}

// ============================================================================
// STAGE CHANGE — Feedback loop logging
// ============================================================================

export async function logStageChange(params: {
  ghlContactId: string;
  ghlOpportunityId?: string;
  pipelineName: string;
  fromStage?: string;
  toStage: string;
  triggeredBy: string;
}): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  try {
    // Get current lead data for context
    const { data: lead } = await supabase
      .from('leads_master')
      .select('id, intent_score, ai_classification')
      .eq('ghl_contact_id', params.ghlContactId)
      .single();

    const { error } = await supabase.from('stage_changes').insert({
      lead_id: lead?.id || null,
      ghl_contact_id: params.ghlContactId,
      ghl_opportunity_id: params.ghlOpportunityId,
      pipeline_name: params.pipelineName,
      from_stage: params.fromStage,
      to_stage: params.toStage,
      intent_score_at_change: lead?.intent_score,
      classification_at_change: lead?.ai_classification,
      triggered_by: params.triggeredBy,
    });

    if (error) {
      console.error('[STATE] Stage change log failed:', error);
      return false;
    }

    // Also update the lead master record
    if (lead?.id) {
      await supabase
        .from('leads_master')
        .update({
          current_stage: params.toStage,
          current_pipeline: params.pipelineName,
          lead_status: mapStageToStatus(params.toStage),
        })
        .eq('id', lead.id);
    }

    return true;
  } catch (err) {
    console.error('[STATE] Stage change error:', err);
    return false;
  }
}

// ============================================================================
// UPDATE LEAD INTELLIGENCE
// ============================================================================

export async function updateLeadIntelligence(
  ghlContactId: string,
  updates: Partial<{
    intent_score: number;
    ai_classification: string;
    urgency_level: string;
    financing_probability: number;
    response_time_seconds: number;
    first_contact_at: string;
  }>
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('leads_master')
      .update(updates)
      .eq('ghl_contact_id', ghlContactId);

    if (error) {
      console.error('[STATE] Lead intelligence update failed:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[STATE] Lead intelligence update error:', err);
    return false;
  }
}

// ============================================================================
// HELPERS
// ============================================================================

function mapStageToStatus(stage: string): string {
  const map: Record<string, string> = {
    'New Lead': 'new',
    'Contacted': 'contacted',
    'Qualified': 'qualified',
    'Inspection Scheduled': 'scheduled',
    'Inspection Completed': 'scheduled',
    'Quoted': 'quoted',
    'Financing': 'quoted',
    'Won': 'won',
    'Lost': 'lost',
  };
  return map[stage] || 'new';
}
