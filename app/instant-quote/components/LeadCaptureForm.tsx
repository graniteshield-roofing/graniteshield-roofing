'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { QuoteResponse } from '@/lib/api/quote';
import { PackageSelection } from '../types';

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Unified Lead Engine Backend URL
 * 
 * The quote-frontend backend is the SINGLE source of truth for lead storage,
 * GHL webhook, lead scoring, and notifications. This replaces the old
 * /api/leads → Supabase path.
 * 
 * tRPC mutation endpoints use POST with JSON body to:
 *   {BASE}/api/trpc/leads.ingestFromWebsite
 */
const LEAD_ENGINE_BASE_URL =
  process.env.NEXT_PUBLIC_LEAD_ENGINE_URL ||
  'https://quote-graniteshieldroofing.com';

// Use the REST wrapper for stable external POST transport (Phase 1.5)
const LEAD_INGEST_URL = `${LEAD_ENGINE_BASE_URL}/api/leads/ingest`;

// ============================================================================
// TYPES
// ============================================================================

interface LeadCaptureFormProps {
  quoteData: QuoteResponse;
  initialData?: {
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address: string;
  };
  onSuccess?: () => void;
}

// ============================================================================
// UTM HELPERS
// ============================================================================

/**
 * Extract UTM parameters and ad tracking data from the current URL.
 * These are captured once on mount and sent with the lead payload.
 */
function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};

  const keys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'ad_id',
    'fbclid',
    'gclid',
  ];

  for (const key of keys) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }

  return utm;
}

/**
 * Extract town from a normalized address string.
 * Expects format: "123 Main St, Portland, ME 04101"
 * Returns the city/town component.
 */
function extractTown(address: string): string {
  if (!address) return '';
  const parts = address.split(',').map((s) => s.trim());
  // Town is typically the second part: "Street, Town, State ZIP"
  if (parts.length >= 2) {
    return parts[1];
  }
  return '';
}

// ============================================================================
// COMPONENT
// ============================================================================

export function LeadCaptureForm({
  quoteData,
  initialData,
  onSuccess,
}: LeadCaptureFormProps) {
  // Form state
  const [firstName, setFirstName] = useState(initialData?.firstName || '');
  const [lastName, setLastName] = useState(initialData?.lastName || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [selectedPackage, setSelectedPackage] = useState<PackageSelection>('undecided');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Honeypot field — hidden from real users, filled by bots
  const [honeypot, setHoneypot] = useState('');

  // Idempotency: generate a unique submissionId per form mount (UUID v4)
  const [submissionId] = useState(() => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback for older browsers
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  });

  // UTM params captured once on mount
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    setUtmParams(getUtmParams());
  }, []);

  // ── Phone formatting ──────────────────────────────────────────────────
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  // ── Validation ────────────────────────────────────────────────────────
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ── Derive pricing from quoteData ─────────────────────────────────────
  function getEstimatedPrice(): number {
    // Use the selected package price, or fall back to the "good" package
    const pkg = selectedPackage === 'best'
      ? quoteData.packages?.metal?.best
      : quoteData.packages?.metal?.good;

    if (!pkg?.priceEstimate) return 0;

    const pe = pkg.priceEstimate;
    if (pe.type === 'exact' && pe.exact) return pe.exact;
    if (pe.type === 'range' && pe.min && pe.max) return Math.round((pe.min + pe.max) / 2);
    return pe.min || pe.max || pe.exact || 0;
  }

  // ── Submit handler ────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage(null);

    // Validate email (required)
    if (!email.trim()) {
      setErrorMessage('Email is required');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    // Phone validation: 0 digits OK, 1-9 invalid, 10+ valid
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length > 0 && phoneDigits.length < 10) {
      setErrorMessage('Phone number must be at least 10 digits');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const address = initialData?.address || quoteData.normalizedAddress || '';
      const estimatedPrice = getEstimatedPrice();
      const town = extractTown(address);

      // ── Build unified payload ───────────────────────────────────────
      const payload = {
        // Idempotency
        submissionId,

        // Honeypot (should be empty for real users)
        website: honeypot || undefined,
        // PII
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
        email: email.trim().toLowerCase(),
        phone: phoneDigits.length >= 10 ? phoneDigits : undefined,

        // Property
        address,
        town: town || undefined,

        // Roof measurement
        areaSquareFeet: quoteData.measurement?.calibratedSquares
          ? quoteData.measurement.calibratedSquares * 100  // squares → sqft
          : (quoteData.estimatedSquares ? quoteData.estimatedSquares * 100 : undefined),
        pitch: undefined, // Not collected in this form
        material: 'metal', // Standing seam focus
        estimatedPrice: estimatedPrice || undefined,
        latitude: quoteData.coordinates?.latitude,
        longitude: quoteData.coordinates?.longitude,
        measurementSource: quoteData.calibration?.measurement_source === 'lidar'
          ? 'GOOGLE_SOLAR' as const
          : 'ESTIMATE' as const,
        measurementConfidence: quoteData.calibration?.calibration_status === 'within_range'
          ? 'HIGH' as const
          : 'LOW' as const,

        // Package & Pricing
        packageSelected: selectedPackage,
        predictedRevenue: estimatedPrice || undefined,

        // Financing (stub — will be enhanced in Phase 2)
        financingIntent: false,

        // Attribution — UTM + Ad tracking
        utmSource: utmParams.utm_source || undefined,
        utmMedium: utmParams.utm_medium || undefined,
        utmCampaign: utmParams.utm_campaign || undefined,
        utmTerm: utmParams.utm_term || undefined,
        utmContent: utmParams.utm_content || undefined,
        adId: utmParams.ad_id || utmParams.fbclid || utmParams.gclid || undefined,
        referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
        landingPage: typeof window !== 'undefined' ? window.location.href : undefined,

        // Consent
        smsConsent: phoneDigits.length >= 10 ? true : false,
      };

      // ── Send to unified lead engine (REST wrapper) ─────────────────
      const response = await fetch(LEAD_INGEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errMsg =
          errorData?.error ||
          errorData?.error?.message ||
          'Failed to submit your information';
        throw new Error(errMsg);
      }

      const data = await response.json();

      if (data?.success) {
        setSubmitStatus('success');

        // Fire client-side tracking event (for GTM / Meta Pixel)
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'lead_submitted',
            leadId: data.leadId,
            leadScore: data.score,
            leadTier: data.tier,
            packageSelected: selectedPackage,
            estimatedPrice,
            town,
          });
        }

        if (onSuccess) {
          setTimeout(() => onSuccess(), 1500);
        }
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again or call us directly.'
      );
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success state ─────────────────────────────────────────────────────
  if (submitStatus === 'success') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-2">We&apos;ve Got It!</h3>
          <p className="text-slate-700 mb-4">
            Thank you for your interest. We&apos;ll be in touch shortly to schedule your free
            on-site inspection.
          </p>
          <p className="text-sm text-slate-600">
            Expect a call or email from our team within 24 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────
  return (
    <Card className="shadow-xl border-slate-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-900">
          Lock In Your Estimate
        </CardTitle>
        <p className="text-slate-600 mt-2">
          Provide your contact information and we&apos;ll schedule your free on-site inspection to
          finalize your quote.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Package Selection */}
          <div className="space-y-3">
            <Label>Which package are you interested in? (optional)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedPackage('good')}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  selectedPackage === 'good'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-semibold text-slate-900">GOOD</div>
                <div className="text-sm text-slate-600">Standard Package</div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPackage('best')}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  selectedPackage === 'best'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-semibold text-slate-900">BEST</div>
                <div className="text-sm text-slate-600">Enhanced Package</div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPackage('undecided')}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  selectedPackage === 'undecided'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-semibold text-slate-900">Not Sure</div>
                <div className="text-sm text-slate-600">We&apos;ll help you decide</div>
              </button>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name (optional)</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name (optional)</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Honeypot — hidden from real users, catches bots */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              top: '-9999px',
              width: 0,
              height: 0,
              overflow: 'hidden',
              opacity: 0,
              tabIndex: -1,
            } as React.CSSProperties}
          >
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional but recommended)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(207) 555-1234"
              value={phone}
              onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
              disabled={isSubmitting}
              maxLength={14}
            />
            <p className="text-xs text-slate-500">
              We&apos;ll call or text to schedule your inspection
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="cta"
            size="lg"
            className="w-full h-12"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Book Your Free Roof Inspection'
            )}
          </Button>

          <p className="text-xs text-center text-slate-500">
            By submitting, you agree to be contacted by GraniteShield Roofing. We respect your
            privacy and will never share your information.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
