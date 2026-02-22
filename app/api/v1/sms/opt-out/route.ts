/**
 * SMS Opt-Out Webhook — /api/v1/sms/opt-out
 * 
 * Receives inbound SMS from OpenPhone and processes STOP/HELP/START keywords
 * for A2P 10DLC compliance.
 * 
 * COMPLIANCE REQUIREMENTS:
 * - STOP must be honored within 10 seconds
 * - Confirmation message must be sent after STOP
 * - No further messages after STOP until re-opt-in
 * - HELP must return business contact info
 */

import { NextRequest, NextResponse } from 'next/server';

// ============================================================================
// KEYWORD DETECTION
// ============================================================================

const OPT_OUT_KEYWORDS = ['stop', 'unsubscribe', 'cancel', 'end', 'quit'];
const HELP_KEYWORDS = ['help', 'info'];
const RE_OPT_IN_KEYWORDS = ['start', 'yes', 'unstop'];

type KeywordAction = 'opt_out' | 'help' | 're_opt_in' | 'none';

function detectKeyword(body: string): KeywordAction {
  const normalized = body.trim().toLowerCase();
  if (OPT_OUT_KEYWORDS.includes(normalized)) return 'opt_out';
  if (HELP_KEYWORDS.includes(normalized)) return 'help';
  if (RE_OPT_IN_KEYWORDS.includes(normalized)) return 're_opt_in';
  return 'none';
}

// ============================================================================
// RESPONSE MESSAGES
// ============================================================================

const RESPONSE_MESSAGES: Record<KeywordAction, string> = {
  opt_out: 'You have been unsubscribed from GraniteShield Roofing messages. Reply START to re-subscribe. For help, call (207) 210-3282.',
  help: 'GraniteShield Roofing: For support, call (207) 210-3282 or email info@graniteshieldroofing.com. Reply STOP to unsubscribe.',
  re_opt_in: 'You have been re-subscribed to GraniteShield Roofing messages. Reply STOP to unsubscribe. Reply HELP for help.',
  none: '',
};

// ============================================================================
// POST HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from, body: messageBody, messageId } = body;

    if (!from || !messageBody) {
      return NextResponse.json(
        { status: 'error', error: 'Missing from or body' },
        { status: 400 }
      );
    }

    const action = detectKeyword(messageBody);

    if (action === 'none') {
      // Not a keyword message — ignore
      return NextResponse.json({ status: 'ignored', reason: 'not_a_keyword' });
    }

    console.log(`[SMS OPT-OUT] ${action} from ${from} | messageId=${messageId}`);

    // Process the keyword
    const responseMessage = RESPONSE_MESSAGES[action];

    // Update GHL contact tag
    if (action === 'opt_out') {
      await updateGHLOptOutStatus(from, true);
    } else if (action === 're_opt_in') {
      await updateGHLOptOutStatus(from, false);
    }

    // Send response SMS via OpenPhone
    if (responseMessage) {
      await sendResponseSMS(from, responseMessage);
    }

    return NextResponse.json({
      status: 'processed',
      action,
      phone: from,
      responseMessage,
    });
  } catch (err: any) {
    console.error('[SMS OPT-OUT] Error:', err);
    return NextResponse.json(
      { status: 'error', error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ============================================================================
// GHL INTEGRATION
// ============================================================================

async function updateGHLOptOutStatus(phone: string, optedOut: boolean): Promise<void> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.warn('[SMS OPT-OUT] GHL not configured — skipping tag update');
    return;
  }

  try {
    // Search for contact by phone
    const searchRes = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${locationId}&phone=${encodeURIComponent(phone)}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Version': '2021-07-28',
        },
      }
    );

    if (!searchRes.ok) return;

    const searchData = await searchRes.json();
    const contact = searchData?.contact;
    if (!contact?.id) return;

    // Update tags
    const currentTags: string[] = contact.tags || [];
    let newTags: string[];

    if (optedOut) {
      newTags = [...currentTags.filter(t => t !== 'sms: opted in'), 'sms: opted out'];
    } else {
      newTags = [...currentTags.filter(t => t !== 'sms: opted out'), 'sms: opted in'];
    }

    await fetch(
      `https://services.leadconnectorhq.com/contacts/${contact.id}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags: newTags }),
      }
    );

    console.log(`[SMS OPT-OUT] Updated GHL contact ${contact.id} — optedOut=${optedOut}`);
  } catch (err) {
    console.error('[SMS OPT-OUT] GHL update failed:', err);
  }
}

// ============================================================================
// OPENPHONE RESPONSE
// ============================================================================

async function sendResponseSMS(to: string, message: string): Promise<void> {
  const apiKey = process.env.OPENPHONE_API_KEY;
  const phoneNumberId = process.env.OPENPHONE_PHONE_NUMBER_ID;

  if (!apiKey || !phoneNumberId) {
    console.warn('[SMS OPT-OUT] OpenPhone not configured — logging response');
    console.log(`[SMS OPT-OUT] Would send to ${to}: ${message}`);
    return;
  }

  try {
    await fetch('https://api.openphone.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        to: [to],
        from: phoneNumberId,
      }),
    });

    console.log(`[SMS OPT-OUT] Response sent to ${to}`);
  } catch (err) {
    console.error('[SMS OPT-OUT] Failed to send response:', err);
  }
}
