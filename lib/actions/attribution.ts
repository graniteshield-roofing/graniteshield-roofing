/**
 * Attribution Action Handler — Meta CAPI + Google Offline Conversions
 * 
 * Fires offline conversion events to close the attribution loop:
 * 1. Meta Conversions API (CAPI) — Purchase event with hashed PII
 * 2. Google Ads Offline Conversion Import — via gclid
 * 
 * This handler is triggered when an opportunity moves to "Won" in GHL,
 * sending the actual revenue value back to ad platforms for optimization.
 */

import crypto from 'crypto';
import type { OutboxEvent } from '../outbox';

// ============================================================================
// ENV CONFIG
// ============================================================================

const META_PIXEL_ID = process.env.META_PIXEL_ID || '';
const META_ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || '';
const META_CAPI_BASE = 'https://graph.facebook.com/v19.0';

const GOOGLE_ADS_CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID || '';
const GOOGLE_ADS_CONVERSION_ACTION_ID = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID || '';
const GOOGLE_ADS_DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '';
const GOOGLE_ADS_OAUTH_TOKEN = process.env.GOOGLE_ADS_OAUTH_TOKEN || '';

// ============================================================================
// TYPES
// ============================================================================

interface AttributionPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  monetaryValue: string;
  utmSource?: string;
  utmCampaign?: string;
  gclid?: string;
  fbclid?: string;
  leadEngineId?: string;
  quoteId?: string;
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

export async function handleAttributionEvent(
  event: OutboxEvent
): Promise<{ success: boolean; error?: string; response?: any }> {
  const payload = event.data as AttributionPayload;

  if (!payload.email && !payload.phone) {
    return { success: false, error: 'Missing both email and phone — cannot attribute' };
  }

  const results: { meta?: any; google?: any } = {};
  const errors: string[] = [];

  // Fire both in parallel
  const [metaResult, googleResult] = await Promise.allSettled([
    fireMetaCAPI(payload, event),
    fireGoogleOfflineConversion(payload, event),
  ]);

  // Process Meta result
  if (metaResult.status === 'fulfilled') {
    if (metaResult.value.success) {
      results.meta = metaResult.value.response;
      console.log('[ATTRIBUTION] Meta CAPI event sent successfully');
    } else {
      errors.push(`Meta CAPI: ${metaResult.value.error}`);
    }
  } else {
    errors.push(`Meta CAPI threw: ${metaResult.reason}`);
  }

  // Process Google result
  if (googleResult.status === 'fulfilled') {
    if (googleResult.value.success) {
      results.google = googleResult.value.response;
      console.log('[ATTRIBUTION] Google OCI event sent successfully');
    } else {
      errors.push(`Google OCI: ${googleResult.value.error}`);
    }
  } else {
    errors.push(`Google OCI threw: ${googleResult.reason}`);
  }

  // Consider success if at least one platform received the event
  const hasAnySuccess = results.meta || results.google;

  if (hasAnySuccess) {
    return {
      success: true,
      response: results,
      error: errors.length > 0 ? errors.join('; ') : undefined,
    };
  }

  return {
    success: false,
    error: errors.join('; ') || 'Both attribution platforms failed',
  };
}

// ============================================================================
// META CONVERSIONS API
// ============================================================================

async function fireMetaCAPI(
  payload: AttributionPayload,
  event: OutboxEvent
): Promise<{ success: boolean; error?: string; response?: any }> {
  if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
    console.warn('[ATTRIBUTION] Meta CAPI not configured — logging event');
    console.log('[ATTRIBUTION] Would fire Meta Purchase event:', {
      email: payload.email,
      value: payload.monetaryValue,
    });
    return { success: true, response: { simulated: true, platform: 'meta' } };
  }

  const eventTime = Math.floor(Date.now() / 1000);
  const eventId = `purchase_${event.opportunityId}_${eventTime}`;

  const userData: Record<string, any> = {};
  if (payload.email) userData.em = [sha256Hash(payload.email.toLowerCase().trim())];
  if (payload.phone) userData.ph = [sha256Hash(normalizePhoneForHash(payload.phone))];
  if (payload.firstName) userData.fn = [sha256Hash(payload.firstName.toLowerCase().trim())];
  if (payload.lastName) userData.ln = [sha256Hash(payload.lastName.toLowerCase().trim())];
  userData.country = [sha256Hash('us')];
  userData.st = [sha256Hash('me')]; // Maine

  const eventData = {
    data: [
      {
        event_name: 'Purchase',
        event_time: eventTime,
        event_id: eventId,
        action_source: 'system_generated',
        user_data: userData,
        custom_data: {
          currency: 'USD',
          value: parseFloat(payload.monetaryValue) || 0,
          content_name: 'Roofing Project',
          content_category: 'Home Improvement',
          lead_engine_id: payload.leadEngineId,
          quote_id: payload.quoteId,
        },
      },
    ],
  };

  // Add fbclid if available for deduplication
  if (payload.fbclid) {
    eventData.data[0].user_data = {
      ...eventData.data[0].user_data,
      fbc: `fb.1.${eventTime}.${payload.fbclid}`,
    } as any;
  }

  try {
    const response = await fetch(
      `${META_CAPI_BASE}/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      return { success: false, error: `Meta CAPI ${response.status}: ${errorBody}` };
    }

    const result = await response.json();
    return { success: true, response: result };
  } catch (err: any) {
    return { success: false, error: `Meta CAPI request failed: ${err.message}` };
  }
}

// ============================================================================
// GOOGLE ADS OFFLINE CONVERSION IMPORT
// ============================================================================

async function fireGoogleOfflineConversion(
  payload: AttributionPayload,
  event: OutboxEvent
): Promise<{ success: boolean; error?: string; response?: any }> {
  if (!GOOGLE_ADS_CUSTOMER_ID || !GOOGLE_ADS_DEVELOPER_TOKEN) {
    console.warn('[ATTRIBUTION] Google Ads OCI not configured — logging event');
    console.log('[ATTRIBUTION] Would fire Google Offline Conversion:', {
      gclid: payload.gclid,
      value: payload.monetaryValue,
    });
    return { success: true, response: { simulated: true, platform: 'google' } };
  }

  // Google OCI requires gclid
  if (!payload.gclid) {
    console.warn('[ATTRIBUTION] No gclid available — skipping Google OCI');
    return { success: true, response: { skipped: true, reason: 'no_gclid' } };
  }

  const conversionTime = new Date().toISOString().replace('T', ' ').split('.')[0] + '+00:00';

  const conversionData = {
    conversions: [
      {
        gclid: payload.gclid,
        conversion_action: `customers/${GOOGLE_ADS_CUSTOMER_ID}/conversionActions/${GOOGLE_ADS_CONVERSION_ACTION_ID}`,
        conversion_date_time: conversionTime,
        conversion_value: parseFloat(payload.monetaryValue) || 0,
        currency_code: 'USD',
      },
    ],
    partialFailure: true,
  };

  try {
    const response = await fetch(
      `https://googleads.googleapis.com/v16/customers/${GOOGLE_ADS_CUSTOMER_ID}:uploadOfflineUserDataJobs`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GOOGLE_ADS_OAUTH_TOKEN}`,
          'developer-token': GOOGLE_ADS_DEVELOPER_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conversionData),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      return { success: false, error: `Google OCI ${response.status}: ${errorBody}` };
    }

    const result = await response.json();
    return { success: true, response: result };
  } catch (err: any) {
    return { success: false, error: `Google OCI request failed: ${err.message}` };
  }
}

// ============================================================================
// HASHING UTILITIES
// ============================================================================

function sha256Hash(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function normalizePhoneForHash(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return digits;
  return digits;
}
