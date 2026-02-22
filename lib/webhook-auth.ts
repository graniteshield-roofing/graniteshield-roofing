/**
 * Webhook Authentication Module
 * 
 * Validates incoming GHL webhook requests using a shared secret.
 * The secret is stored in the GHL_WEBHOOK_SECRET environment variable
 * and must match the X-GHL-Webhook-Secret header on every request.
 */

import { NextRequest } from 'next/server';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.GHL_WEBHOOK_SECRET || '';
const HEADER_NAME = 'x-ghl-webhook-secret';

export interface AuthResult {
  authenticated: boolean;
  error?: string;
}

/**
 * Validate the webhook request using the shared secret header.
 * Uses timing-safe comparison to prevent timing attacks.
 */
export function validateWebhookAuth(request: NextRequest): AuthResult {
  if (!WEBHOOK_SECRET) {
    console.error('[WEBHOOK AUTH] GHL_WEBHOOK_SECRET is not configured');
    return {
      authenticated: false,
      error: 'Webhook secret not configured on server',
    };
  }

  const providedSecret = request.headers.get(HEADER_NAME);

  if (!providedSecret) {
    return {
      authenticated: false,
      error: 'Missing X-GHL-Webhook-Secret header',
    };
  }

  // Timing-safe comparison to prevent timing attacks
  const secretBuffer = Buffer.from(WEBHOOK_SECRET, 'utf-8');
  const providedBuffer = Buffer.from(providedSecret, 'utf-8');

  if (secretBuffer.length !== providedBuffer.length) {
    return {
      authenticated: false,
      error: 'Invalid webhook secret',
    };
  }

  const isValid = crypto.timingSafeEqual(secretBuffer, providedBuffer);

  if (!isValid) {
    return {
      authenticated: false,
      error: 'Invalid webhook secret',
    };
  }

  return { authenticated: true };
}

/**
 * Generate a cryptographically secure webhook secret.
 * Call this once during setup to generate the shared secret.
 */
export function generateWebhookSecret(): string {
  return crypto.randomBytes(32).toString('hex');
}
