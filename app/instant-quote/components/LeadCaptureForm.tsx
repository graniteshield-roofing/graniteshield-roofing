'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { QuoteResponse } from '@/lib/api/quote';
import { PackageSelection } from '../types';

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

export function LeadCaptureForm({
  quoteData,
  initialData,
  onSuccess,
}: LeadCaptureFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [firstName, setFirstName] = useState(initialData?.firstName || '');
  const [lastName, setLastName] = useState(initialData?.lastName || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [selectedPackage, setSelectedPackage] = useState<PackageSelection>('undecided');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage(null);

    // Validate email
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

    // Build name from first + last if available, otherwise use name field
    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ') || name.trim();

    try {
      const phoneDigits = phone ? phone.replace(/\D/g, '') : '';
      const normalizedPhone = phoneDigits.length >= 10 ? phoneDigits : undefined;

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: initialData?.address || quoteData.normalizedAddress,
          normalizedAddress: quoteData.normalizedAddress,
          name: fullName || undefined,
          firstName: firstName.trim() || undefined,
          lastName: lastName.trim() || undefined,
          email: email.trim(),
          phone: normalizedPhone,
          roofTypes: ['standing_seam_roof_over', 'standing_seam_tear_off'], // Focus on standing seam
          estimatedSquares: quoteData.measurement?.calibratedSquares || quoteData.estimatedSquares,
          measurementMethod: quoteData.measurement?.method || quoteData.measurementMethod,
          coordinates: quoteData.coordinates,
          pricing: quoteData.pricing,
          metadata: {
            ...quoteData.metadata,
            selectedPackage, // Include package selection
            calibration: quoteData.calibration ? {
              measurement_source: quoteData.calibration.measurement_source,
              calibration_status: quoteData.calibration.calibration_status,
            } : undefined,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit your information');
      }

      setSubmitStatus('success');
      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500);
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

