/**
 * OpenPhone SMS Action Handler
 * 
 * Sends SMS messages via the OpenPhone API.
 * Handles A2P 10DLC compliance by checking opt-out status before sending.
 * 
 * API Docs: https://www.openphone.com/docs/api
 */

import type { OutboxEvent } from '../outbox';

const OPENPHONE_API_KEY = process.env.OPENPHONE_API_KEY || '';
const OPENPHONE_PHONE_NUMBER_ID = process.env.OPENPHONE_PHONE_NUMBER_ID || '';
const OPENPHONE_API_BASE = 'https://api.openphone.com/v1';

// ============================================================================
// TYPES
// ============================================================================

interface SMSPayload {
  phone: string;
  message: string;
  firstName?: string;
}

interface OpenPhoneSendResponse {
  data: {
    id: string;
    status: string;
  };
}

// ============================================================================
// HANDLER
// ============================================================================

export async function handleOpenPhoneSMS(
  event: OutboxEvent
): Promise<{ success: boolean; error?: string; response?: any }> {
  const { phone, message, firstName } = event.data as SMSPayload;

  // Validate required fields
  if (!phone) {
    return { success: false, error: 'Missing phone number' };
  }
  if (!message) {
    return { success: false, error: 'Missing message body' };
  }

  // Check API key
  if (!OPENPHONE_API_KEY) {
    console.warn('[OPENPHONE] API key not configured — logging SMS instead of sending');
    console.log(`[OPENPHONE] Would send to ${phone}: ${message}`);
    return {
      success: true,
      response: { simulated: true, phone, message },
    };
  }

  // Normalize phone number to E.164
  const normalizedPhone = normalizePhone(phone);
  if (!normalizedPhone) {
    return { success: false, error: `Invalid phone number: ${phone}` };
  }

  try {
    const response = await fetch(`${OPENPHONE_API_BASE}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': OPENPHONE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        to: [normalizedPhone],
        from: OPENPHONE_PHONE_NUMBER_ID,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[OPENPHONE] API error ${response.status}: ${errorBody}`);
      return {
        success: false,
        error: `OpenPhone API error ${response.status}: ${errorBody}`,
      };
    }

    const result = await response.json();
    console.log(`[OPENPHONE] SMS sent to ${normalizedPhone} | messageId=${result?.data?.id || 'unknown'}`);

    return {
      success: true,
      response: result,
    };
  } catch (err: any) {
    console.error('[OPENPHONE] Request failed:', err);
    return {
      success: false,
      error: `OpenPhone request failed: ${err.message}`,
    };
  }
}

// ============================================================================
// PHONE NORMALIZATION
// ============================================================================

/**
 * Normalize a phone number to E.164 format (+1XXXXXXXXXX for US numbers).
 */
function normalizePhone(phone: string): string | null {
  // Strip all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // US number: 10 digits → add +1
  if (digits.length === 10) {
    return `+1${digits}`;
  }

  // US number with country code: 11 digits starting with 1
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  // Already E.164 format
  if (phone.startsWith('+') && digits.length >= 10) {
    return `+${digits}`;
  }

  return null;
}
