/**
 * Action Registry — Wires all action handlers to the Universal Outbox
 * 
 * This module registers all available action handlers so the outbox
 * can route incoming webhook events to the correct handler.
 */

import { registerActionHandler } from '../outbox';
import { handleOpenPhoneSMS } from './openphone-sms';
import { handleBlandAICall } from './bland-ai-call';
import { handleAttributionEvent } from './attribution';
import { handleInternalNotification } from './internal-notification';

let initialized = false;

/**
 * Initialize all action handlers. Safe to call multiple times (idempotent).
 */
export function initializeActionHandlers(): void {
  if (initialized) return;

  // SMS actions
  registerActionHandler('openphone.sms.send', handleOpenPhoneSMS);

  // AI calling actions (legacy — will be replaced by GHL Voice AI)
  registerActionHandler('bland_ai.call.initiate', handleBlandAICall);

  // Attribution actions
  registerActionHandler('attribution.purchase_event', handleAttributionEvent);

  // Internal notification actions
  registerActionHandler('internal.notification', handleInternalNotification);

  initialized = true;
  console.log('[ACTIONS] All action handlers registered');
}

/**
 * List of all supported action types (for validation).
 */
export const SUPPORTED_ACTIONS = [
  'openphone.sms.send',
  'bland_ai.call.initiate',
  'attribution.purchase_event',
  'internal.notification',
] as const;

export type SupportedAction = typeof SUPPORTED_ACTIONS[number];

/**
 * Check if an action type is supported.
 */
export function isValidAction(action: string): action is SupportedAction {
  return (SUPPORTED_ACTIONS as readonly string[]).includes(action);
}
