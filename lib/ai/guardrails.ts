/**
 * AI Receptionist Guardrails
 * 
 * Prevents runaway automation, protects customer experience,
 * and enforces compliance rules.
 * 
 * RULES:
 * 1. Never send more than 1 message per minute
 * 2. Max 6 AI messages total without human takeover
 * 3. Stop all automation if customer asks to stop
 * 4. Escalate on emergency keywords
 * 5. Mark stale after 24h of no response
 */

// ============================================================================
// STOP WORDS — Immediately halt all automation
// ============================================================================

const STOP_WORDS = [
  'stop',
  'unsubscribe',
  'opt out',
  'opt-out',
  'optout',
  'don\'t text me',
  'dont text me',
  'remove me',
  'leave me alone',
  'not interested',
  'cancel',
  'quit',
];

// ============================================================================
// ESCALATION KEYWORDS — Create urgent task + notify Justin
// ============================================================================

const ESCALATION_KEYWORDS = [
  'leaking right now',
  'water coming in',
  'active leak',
  'emergency',
  'roof collapsed',
  'caved in',
  'falling apart',
  'insurance claim',
  'talk to someone',
  'talk to a person',
  'talk to the owner',
  'speak to someone',
  'speak to a person',
  'frustrated',
  'pissed',
  'angry',
  'terrible',
  'worst',
  'competitor',
  'other quote',
  'another company',
  'beat this price',
  'match this price',
];

// ============================================================================
// GUARDRAIL CHECKS
// ============================================================================

export interface GuardrailResult {
  allowed: boolean;
  reason?: string;
  action: 'proceed' | 'stop' | 'escalate' | 'rate_limit' | 'max_messages' | 'human_takeover' | 'stale';
}

/**
 * Check if the incoming message contains stop words.
 */
export function checkStopWords(message: string): boolean {
  const lower = message.toLowerCase().trim();
  return STOP_WORDS.some(word => {
    // Exact match or word boundary match
    const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(lower);
  });
}

/**
 * Check if the incoming message contains escalation keywords.
 */
export function checkEscalationKeywords(message: string): { shouldEscalate: boolean; keyword?: string } {
  const lower = message.toLowerCase().trim();
  for (const keyword of ESCALATION_KEYWORDS) {
    if (lower.includes(keyword.toLowerCase())) {
      return { shouldEscalate: true, keyword };
    }
  }
  return { shouldEscalate: false };
}

/**
 * Check rate limit — no more than 1 message per minute.
 */
export function checkRateLimit(lastMessageSentAt: Date | null): boolean {
  if (!lastMessageSentAt) return true; // No previous message, OK to send
  const elapsed = Date.now() - lastMessageSentAt.getTime();
  return elapsed >= 60_000; // 60 seconds minimum
}

/**
 * Check max message count — max 6 AI messages before human takeover.
 */
export function checkMaxMessages(messagesSent: number): boolean {
  return messagesSent < 6;
}

/**
 * Check if session is stale — no response in 24 hours.
 */
export function checkStale(lastMessageRecvAt: Date | null): boolean {
  if (!lastMessageRecvAt) return false;
  const elapsed = Date.now() - lastMessageRecvAt.getTime();
  return elapsed > 24 * 60 * 60 * 1000; // 24 hours
}

/**
 * Run all guardrails against current state and incoming message.
 * Returns whether the AI should proceed and what action to take.
 */
export function runGuardrails(params: {
  incomingMessage: string;
  messagesSent: number;
  lastMessageSentAt: Date | null;
  lastMessageRecvAt: Date | null;
  humanTakeover: boolean;
  stopRequested: boolean;
}): GuardrailResult {
  // 1. Already stopped?
  if (params.stopRequested) {
    return { allowed: false, reason: 'Customer previously requested stop', action: 'stop' };
  }

  // 2. Human already took over?
  if (params.humanTakeover) {
    return { allowed: false, reason: 'Human has taken over this conversation', action: 'human_takeover' };
  }

  // 3. Check stop words in incoming message
  if (checkStopWords(params.incomingMessage)) {
    return { allowed: false, reason: 'Customer requested to stop', action: 'stop' };
  }

  // 4. Check max messages
  if (!checkMaxMessages(params.messagesSent)) {
    return { allowed: false, reason: `Max AI messages reached (${params.messagesSent}/6)`, action: 'max_messages' };
  }

  // 5. Check rate limit
  if (!checkRateLimit(params.lastMessageSentAt)) {
    return { allowed: false, reason: 'Rate limit: less than 1 minute since last message', action: 'rate_limit' };
  }

  // 6. Check escalation keywords
  const escalation = checkEscalationKeywords(params.incomingMessage);
  if (escalation.shouldEscalate) {
    // Still allowed to send a response, but also escalate
    return { allowed: true, reason: `Escalation triggered: "${escalation.keyword}"`, action: 'escalate' };
  }

  // All clear
  return { allowed: true, action: 'proceed' };
}

// ============================================================================
// EXPORTS
// ============================================================================

export { STOP_WORDS, ESCALATION_KEYWORDS };
