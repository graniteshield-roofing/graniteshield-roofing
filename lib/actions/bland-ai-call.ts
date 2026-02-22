/**
 * Bland.ai AI Call Action Handler
 * 
 * Initiates AI-powered outbound calls via the Bland.ai API.
 * The AI agent uses lead context (name, address, quote details) to have
 * a natural conversation and schedule an inspection appointment.
 * 
 * API Docs: https://docs.bland.ai
 */

import type { OutboxEvent } from '../outbox';

const BLAND_AI_API_KEY = process.env.BLAND_AI_API_KEY || '';
const BLAND_AI_API_BASE = 'https://api.bland.ai/v1';
const BLAND_AI_PATHWAY_ID = process.env.BLAND_AI_PATHWAY_ID || '';

// ============================================================================
// TYPES
// ============================================================================

interface CallPayload {
  phone: string;
  firstName: string;
  lastName?: string;
  address?: string;
  city?: string;
  estimatedPrice?: string;
  selectedMaterial?: string;
  roofArea?: string;
  leadTier?: string;
  financingIntent?: string;
}

// ============================================================================
// HANDLER
// ============================================================================

export async function handleBlandAICall(
  event: OutboxEvent
): Promise<{ success: boolean; error?: string; response?: any }> {
  const payload = event.data as CallPayload;

  // Validate required fields
  if (!payload.phone) {
    return { success: false, error: 'Missing phone number' };
  }
  if (!payload.firstName) {
    return { success: false, error: 'Missing first name' };
  }

  // Check API key
  if (!BLAND_AI_API_KEY) {
    console.warn('[BLAND.AI] API key not configured — logging call instead of initiating');
    console.log(`[BLAND.AI] Would call ${payload.phone} for ${payload.firstName}`);
    return {
      success: true,
      response: { simulated: true, phone: payload.phone },
    };
  }

  // Normalize phone
  const normalizedPhone = normalizePhone(payload.phone);
  if (!normalizedPhone) {
    return { success: false, error: `Invalid phone number: ${payload.phone}` };
  }

  try {
    const callRequest: Record<string, any> = {
      phone_number: normalizedPhone,
      task: buildCallTask(payload),
      voice: 'mason',
      reduce_latency: true,
      wait_for_greeting: true,
      first_sentence: `Hi ${payload.firstName}, this is Alex from GraniteShield Roofing. I'm calling about the roof quote you just requested for your home${payload.address ? ` on ${payload.address}` : ''}. Do you have a quick minute?`,
      model: 'enhanced',
      max_duration: 5,
      record: true,
      metadata: {
        contactId: event.contactId,
        opportunityId: event.opportunityId,
        leadEngineEventId: event.id,
      },
    };

    // Use pathway if configured
    if (BLAND_AI_PATHWAY_ID) {
      callRequest.pathway_id = BLAND_AI_PATHWAY_ID;
      callRequest.pathway_params = {
        firstName: payload.firstName,
        lastName: payload.lastName || '',
        address: payload.address || '',
        city: payload.city || '',
        estimatedPrice: payload.estimatedPrice || '',
        selectedMaterial: payload.selectedMaterial || '',
        roofArea: payload.roofArea || '',
        financingIntent: payload.financingIntent || '',
      };
    }

    const response = await fetch(`${BLAND_AI_API_BASE}/calls`, {
      method: 'POST',
      headers: {
        'Authorization': BLAND_AI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(callRequest),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[BLAND.AI] API error ${response.status}: ${errorBody}`);
      return {
        success: false,
        error: `Bland.ai API error ${response.status}: ${errorBody}`,
      };
    }

    const result = await response.json();
    console.log(`[BLAND.AI] Call initiated to ${normalizedPhone} | callId=${result?.call_id || 'unknown'}`);

    return {
      success: true,
      response: result,
    };
  } catch (err: any) {
    console.error('[BLAND.AI] Request failed:', err);
    return {
      success: false,
      error: `Bland.ai request failed: ${err.message}`,
    };
  }
}

// ============================================================================
// CALL TASK BUILDER
// ============================================================================

function buildCallTask(payload: CallPayload): string {
  const parts = [
    `You are Alex, a friendly and professional sales representative for GraniteShield Roofing, a premium roofing company in Maine.`,
    `You are calling ${payload.firstName}${payload.lastName ? ` ${payload.lastName}` : ''} who just submitted a quote request on the GraniteShield website.`,
  ];

  if (payload.address) {
    parts.push(`Their property is at ${payload.address}${payload.city ? `, ${payload.city}` : ''}.`);
  }
  if (payload.selectedMaterial) {
    parts.push(`They are interested in ${payload.selectedMaterial} roofing.`);
  }
  if (payload.estimatedPrice) {
    parts.push(`Their estimated quote is around $${payload.estimatedPrice}.`);
  }
  if (payload.roofArea) {
    parts.push(`The estimated roof area is ${payload.roofArea} square feet.`);
  }
  if (payload.financingIntent === 'true' || payload.financingIntent === 'yes') {
    parts.push(`They expressed interest in financing options.`);
  }

  parts.push(
    `Your goal is to:`,
    `1. Confirm they received their quote and answer any immediate questions.`,
    `2. Schedule a free in-person roof inspection at their convenience.`,
    `3. If they mention financing, let them know GraniteShield offers flexible monthly payment plans.`,
    `4. Be warm, professional, and never pushy. If they are busy, offer to call back at a better time.`,
    `5. End the call by confirming any next steps.`,
    ``,
    `Important: Never make up information. If you don't know something, say you'll have a specialist follow up.`,
    `The business phone number is (207) 210-3282 if they want to call back.`,
  );

  return parts.join('\n');
}

// ============================================================================
// PHONE NORMALIZATION
// ============================================================================

function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  if (phone.startsWith('+') && digits.length >= 10) return `+${digits}`;
  return null;
}
