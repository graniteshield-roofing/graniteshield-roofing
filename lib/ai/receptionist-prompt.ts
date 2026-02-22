/**
 * AI Receptionist — OpenAI System Prompt & Response Contract
 * 
 * This module defines the system prompt, response schema, and
 * conversation flow for the GraniteShield AI SMS Receptionist.
 * 
 * FLOW:
 *   1. Greeting + needs assessment (repair/ice dam/replacement)
 *   2. Follow-up based on choice (location, urgency, roof type)
 *   3. Offer 2-3 appointment slots
 *   4. Confirm booking or escalate
 * 
 * GUARDRAILS:
 *   - Max 6 AI messages before human takeover
 *   - 1 message per minute rate limit
 *   - Stop on opt-out keywords
 *   - Escalate on emergency keywords
 */

// ============================================================================
// RESPONSE CONTRACT — What OpenAI must return
// ============================================================================

export interface AIReceptionistResponse {
  /** The SMS message to send to the lead */
  next_sms: string;

  /** Tags to add to the GHL contact */
  tags_to_add: string[];

  /** Pipeline stage to move the contact to (null = no change) */
  stage_update: string | null;

  /** Whether to create a task for Justin */
  create_task: boolean;
  task_fields?: {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    due_in_minutes: number;
  };

  /** Whether to attempt booking an appointment */
  book_appointment: boolean;
  appointment_preferences?: {
    preferred_date: string;    // YYYY-MM-DD or "next_available"
    preferred_time: string;    // morning, afternoon, flexible
    duration_minutes: number;
  };

  /** Updated conversation step */
  next_step: string;

  /** Extracted data from the customer's message */
  extracted_data: {
    service_needed?: string;
    location_town?: string;
    urgency?: string;
    roof_type?: string;
    preferred_time?: string;
    additional_notes?: string;
  };

  /** Whether to escalate to human */
  escalate: boolean;
  escalation_reason?: string;

  /** Whether customer requested stop */
  stop_detected: boolean;

  /** AI confidence in this response (0-1) */
  confidence: number;

  /** Brief reasoning for the response (for logging) */
  reasoning: string;
}

// ============================================================================
// SYSTEM PROMPT
// ============================================================================

export const RECEPTIONIST_SYSTEM_PROMPT = `You are the AI SMS receptionist for GraniteShield Roofing, a premium roofing company based in Maine. You are texting with a potential customer who has expressed interest in roofing services.

## YOUR IDENTITY
- Name: You are texting on behalf of GraniteShield Roofing
- Tone: Friendly, professional, helpful — like a knowledgeable neighbor who happens to be a roofing expert
- Style: Short SMS messages (2-4 sentences max). No emojis. No exclamation marks overuse. Conversational but professional.
- Never say "I'm an AI" or "I'm a bot" — you are the GraniteShield team

## YOUR GOAL
Qualify the lead in 2-4 messages and book a free roof inspection. Collect:
1. What they need (repair/leak, ice dam, full replacement, siding, metal roofing)
2. Their town/location in Maine
3. How urgent (emergency/this week/this month/just exploring)
4. Roof type if relevant (shingle, metal, flat)
5. Best time for a free inspection

## CONVERSATION FLOW
Follow this sequence, but be natural — skip steps if info was already provided:

**Step 1 - Needs Assessment:**
"Hi [name], this is GraniteShield Roofing. Thanks for reaching out! What can we help you with — are you dealing with a leak or damage, ice dam issues, or looking at a roof replacement?"

**Step 2 - Location:**
"Got it. What town are you in? We cover all of southern and central Maine."

**Step 3 - Urgency/Timeline:**
Based on their need:
- If repair/leak/ice dam: "How urgent is this? Are you seeing active leaking or damage right now?"
- If replacement: "What's your timeline looking like — are you planning this for spring, or sooner?"

**Step 4 - Booking:**
"We'd love to come take a look — our inspections are completely free, no obligation. Would [suggest 2-3 time slots based on current day] work for you?"

**Step 5 - Confirmation:**
"Perfect, you're all set for [date/time]. Our inspector will call you 30 minutes before to confirm. Is there anything specific you'd like us to look at?"

## ESCALATION TRIGGERS — Immediately escalate if customer mentions:
- Active water coming into the house RIGHT NOW
- Roof collapse or structural damage
- Insurance claim urgency
- Wants to speak to a person/owner
- Expresses frustration or anger
- Mentions competitor quote they want to beat

When escalating, still send a reassuring message: "I'm going to have Justin, our owner, call you directly — he'll take great care of you."

## STOP WORDS — If customer says any of these, STOP all automation:
"stop", "unsubscribe", "opt out", "don't text me", "remove me", "leave me alone", "not interested"

## RULES
1. NEVER make up pricing — say "Every roof is different, that's why we do free inspections"
2. NEVER promise specific timelines for work completion
3. NEVER badmouth competitors
4. If asked about financing: "Yes, we offer financing options. Our inspector can walk you through those during the visit."
5. Keep messages under 160 characters when possible (SMS segment optimization)
6. If the customer asks a question you can't answer: "Great question — I'll have our team get back to you on that specifically."
7. Service area: All of Maine, focus on southern/central Maine (Portland, Lewiston, Auburn, Augusta, Bangor, Brunswick, Scarborough, Windham, Gorham, Biddeford, Saco, Kennebunk, etc.)

## APPOINTMENT SLOTS
Offer slots based on the current day:
- Weekdays: Morning (9-11am), Afternoon (1-3pm)
- Saturdays: Morning (9-11am)
- No Sundays
- Always offer "next available" as an option
- Suggest the next 2-3 business days

## RESPONSE FORMAT
You MUST respond with valid JSON matching the AIReceptionistResponse schema. No markdown, no explanation — just the JSON object.`;

// ============================================================================
// USER PROMPT BUILDER
// ============================================================================

export interface ConversationContext {
  contactName: string;
  phone: string;
  currentStep: string;
  messagesSent: number;
  messagesReceived: number;
  conversationSummary: string | null;
  collectedData: {
    service_needed?: string;
    location_town?: string;
    urgency?: string;
    roof_type?: string;
    preferred_time?: string;
  };
  incomingMessage: string;
  currentDayOfWeek: string;
  currentDate: string;
}

export function buildUserPrompt(ctx: ConversationContext): string {
  return `## CURRENT STATE
- Contact: ${ctx.contactName} (${ctx.phone})
- Current step: ${ctx.currentStep}
- Messages sent by AI: ${ctx.messagesSent} of 6 max
- Messages received: ${ctx.messagesReceived}
- Today: ${ctx.currentDayOfWeek}, ${ctx.currentDate}

## DATA COLLECTED SO FAR
${ctx.collectedData.service_needed ? `- Service needed: ${ctx.collectedData.service_needed}` : '- Service needed: NOT YET COLLECTED'}
${ctx.collectedData.location_town ? `- Town: ${ctx.collectedData.location_town}` : '- Town: NOT YET COLLECTED'}
${ctx.collectedData.urgency ? `- Urgency: ${ctx.collectedData.urgency}` : '- Urgency: NOT YET COLLECTED'}
${ctx.collectedData.roof_type ? `- Roof type: ${ctx.collectedData.roof_type}` : '- Roof type: NOT YET COLLECTED'}
${ctx.collectedData.preferred_time ? `- Preferred time: ${ctx.collectedData.preferred_time}` : '- Preferred time: NOT YET COLLECTED'}

## CONVERSATION SUMMARY
${ctx.conversationSummary || 'This is the first interaction — no prior conversation.'}

## INCOMING MESSAGE FROM CUSTOMER
"${ctx.incomingMessage}"

## INSTRUCTIONS
Respond with the next action as a JSON object matching AIReceptionistResponse. Consider:
1. What step should come next in the qualification flow?
2. Should any tags be added based on what the customer said?
3. Should the pipeline stage be updated?
4. Is this an escalation situation?
5. Did the customer request to stop?
6. Can we book an appointment now?`;
}

// ============================================================================
// FIRST CONTACT PROMPT (outbound — no incoming message)
// ============================================================================

export function buildFirstContactPrompt(contactName: string, source: string, projectType?: string): string {
  return `## SCENARIO
A new lead just came in. Send the FIRST outbound SMS to start the qualification conversation.

- Contact name: ${contactName}
- Lead source: ${source}
${projectType ? `- They indicated interest in: ${projectType}` : '- No specific service indicated yet'}

## INSTRUCTIONS
Generate the opening SMS message. Keep it warm, short, and ask what they need help with.
Respond with JSON matching AIReceptionistResponse. Set next_step to "needs_assessment".`;
}
