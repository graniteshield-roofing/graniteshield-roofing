/**
 * Internal Notification Action Handler
 * 
 * Sends internal team notifications via Resend email API.
 * Used for alerts like no-show detection, dead letter alerts, etc.
 */

import type { OutboxEvent } from '../outbox';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const TEAM_EMAIL = process.env.TEAM_NOTIFICATION_EMAIL || 'justin@graniteshieldroofing.com';
const FROM_EMAIL = process.env.NOTIFICATION_FROM_EMAIL || 'GraniteShield System <system@graniteshieldroofing.com>';

// ============================================================================
// TYPES
// ============================================================================

interface NotificationPayload {
  type: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
  subject?: string;
  body?: string;
  [key: string]: any;
}

// ============================================================================
// NOTIFICATION TEMPLATES
// ============================================================================

const TEMPLATES: Record<string, (payload: NotificationPayload) => { subject: string; html: string }> = {
  no_show_alert: (p) => ({
    subject: `⚠️ NO-SHOW: ${p.firstName || 'Unknown'} ${p.lastName || ''} — ${p.address || 'No address'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #dc2626;">Inspection No-Show Alert</h2>
        <p>The following customer did not show up for their scheduled inspection:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Name</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${p.firstName || ''} ${p.lastName || ''}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><a href="tel:${p.phone}">${p.phone || 'N/A'}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Address</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${p.address || 'N/A'}</td></tr>
        </table>
        <p>A reschedule SMS has been sent automatically. Manual follow-up may be needed.</p>
      </div>
    `,
  }),

  dead_letter_alert: (p) => ({
    subject: `🚨 DEAD LETTER: Action failed for ${p.firstName || 'Unknown'} — Immediate action required`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #dc2626;">Dead Letter Alert — Action Failed</h2>
        <p>An automated action has failed after all retry attempts:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Customer</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${p.firstName || ''} ${p.lastName || ''}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${p.phone || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Failed Action</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${p.type || 'Unknown'}</td></tr>
        </table>
        <p style="color: #dc2626; font-weight: bold;">This lead may not have received their initial contact. Manual follow-up required immediately.</p>
      </div>
    `,
  }),

  stale_quote_alert: (p) => ({
    subject: `📋 Stale Quote: ${p.firstName || 'Unknown'} — $${p.estimatedPrice || '?'} quote sitting 48+ hours`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #f59e0b;">Stale Quote Follow-Up Needed</h2>
        <p>This quote has been sitting for 48+ hours without movement:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Customer</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${p.firstName || ''} ${p.lastName || ''}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><a href="tel:${p.phone}">${p.phone || 'N/A'}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Quote Value</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">$${p.estimatedPrice || 'Unknown'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Material</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${p.selectedMaterial || 'Unknown'}</td></tr>
        </table>
        <p>Call them to close the deal.</p>
      </div>
    `,
  }),
};

// ============================================================================
// HANDLER
// ============================================================================

export async function handleInternalNotification(
  event: OutboxEvent
): Promise<{ success: boolean; error?: string; response?: any }> {
  const payload = event.data as NotificationPayload;

  if (!payload.type) {
    return { success: false, error: 'Missing notification type' };
  }

  // Get template or use custom subject/body
  let subject: string;
  let html: string;

  const template = TEMPLATES[payload.type];
  if (template) {
    const rendered = template(payload);
    subject = rendered.subject;
    html = rendered.html;
  } else if (payload.subject && payload.body) {
    subject = payload.subject;
    html = payload.body;
  } else {
    subject = `GraniteShield Alert: ${payload.type}`;
    html = `<pre>${JSON.stringify(payload, null, 2)}</pre>`;
  }

  // Check API key
  if (!RESEND_API_KEY) {
    console.warn('[NOTIFICATION] Resend API key not configured — logging notification');
    console.log(`[NOTIFICATION] Would send: ${subject}`);
    return { success: true, response: { simulated: true, subject } };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TEAM_EMAIL],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return { success: false, error: `Resend API ${response.status}: ${errorBody}` };
    }

    const result = await response.json();
    console.log(`[NOTIFICATION] Email sent: ${subject} | id=${result?.id || 'unknown'}`);

    return { success: true, response: result };
  } catch (err: any) {
    return { success: false, error: `Resend request failed: ${err.message}` };
  }
}
