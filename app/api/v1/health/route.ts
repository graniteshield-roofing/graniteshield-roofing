/**
 * Health Check Endpoint — /api/v1/health
 * 
 * Returns system status for monitoring. No authentication required.
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const checks: Record<string, string> = {};

  // Check environment variables
  checks.ghl_api_key = process.env.GHL_API_KEY ? 'configured' : 'missing';
  checks.ghl_webhook_secret = process.env.GHL_WEBHOOK_SECRET ? 'configured' : 'missing';
  checks.openphone_api_key = process.env.OPENPHONE_API_KEY ? 'configured' : 'missing';
  checks.bland_ai_api_key = process.env.BLAND_AI_API_KEY ? 'configured' : 'missing';
  checks.resend_api_key = process.env.RESEND_API_KEY ? 'configured' : 'missing';
  checks.meta_capi = (process.env.META_PIXEL_ID && process.env.META_CAPI_ACCESS_TOKEN) ? 'configured' : 'missing';
  checks.supabase = (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) ? 'configured' : 'missing';

  const allConfigured = Object.values(checks).every(v => v === 'configured');

  return NextResponse.json({
    status: allConfigured ? 'healthy' : 'degraded',
    service: 'GraniteShield Lead Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    checks,
    endpoints: {
      automation: '/api/v1/automation',
      health: '/api/v1/health',
      smsOptOut: '/api/v1/sms/opt-out',
    },
  });
}
