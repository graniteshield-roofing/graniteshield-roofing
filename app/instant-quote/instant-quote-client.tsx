'use client';

import { useState } from 'react';
import { QuoteRequest, QuoteResponse, getInstantQuote } from '@/lib/api/quote';
import { QuoteForm } from './components/QuoteForm';
import { QuoteResults } from './components/QuoteResults';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/business-config';

// Simple tracking utility
function track(event: string, payload?: Record<string, unknown>) {
  console.log('[track]', event, payload ?? {});
}

export function InstantQuoteClient() {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<QuoteRequest | null>(null);

  const handleSubmit = async (request: QuoteRequest) => {
    setIsLoading(true);
    setError(null);
    setLastRequest(request); // Save request for retry

    track('instant_quote_submit', {
      address: request.address,
      roofTypes: request.roofTypes,
    });

    try {
      const response = await getInstantQuote(request);
      setQuote(response);
      setError(null); // Clear any previous error on success
      track('instant_quote_success', {
        calibrationStatus: response.calibration?.calibration_status,
        measurementSource: response.calibration?.measurement_source,
        calibratedSquares: response.measurement?.calibratedSquares || response.estimatedSquares,
      });
      // Note: Lead capture is now handled in LeadCaptureForm component
    } catch (err) {
      // Show user-friendly error message
      setError(
        "We couldn't generate an instant quote right now. Enter your information below and we'll measure your roof manually and get right back to you."
      );
      // Log the actual error for debugging
      console.error('Quote request failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastRequest) {
      handleSubmit(lastRequest);
    }
  };

  const handleReset = () => {
    setQuote(null);
    setError(null);
    setLastRequest(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-blue-600 text-white border-0">
              Instant Standing Seam Estimate • Advanced Measurement Technology
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Instant Online Roofing Estimate for Southern Maine
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed mb-6">
              Get an instant estimate for standing seam metal roofing in minutes. We
              measure your roof using advanced satellite and LiDAR technology, then
              provide clear package pricing — no confusing per-square-foot calculations.
            </p>

            <p className="text-slate-300 text-sm">
              <strong>Note:</strong> This is an estimate based on available data.
              Final pricing requires an on-site measurement and assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {quote ? (
            <QuoteResults
              data={quote}
              initialFormData={{
                address: lastRequest?.address || '',
                name: lastRequest?.name,
                firstName: lastRequest?.firstName,
                lastName: lastRequest?.lastName,
                email: lastRequest?.email,
                phone: lastRequest?.phone,
              }}
              onReset={handleReset}
            />
          ) : (
            <div className="max-w-2xl mx-auto">
              {/* Error Alert with Retry */}
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Unable to Generate Quote</AlertTitle>
                  <AlertDescription className="space-y-3">
                    <p>{error}</p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        onClick={handleRetry}
                        disabled={isLoading || !lastRequest}
                        variant="outline"
                        size="sm"
                      >
                        Try Again
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="sm:ml-auto"
                      >
                        <a href="tel:+12075308362">
                          Call (207) 530-8362
                        </a>
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              <QuoteForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={null}
              />

              {/* Info Card */}
              <Card className="mt-6 border-slate-200 bg-slate-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    How It Works
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>
                        Enter your address to get started
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>
                        We measure your roof using advanced satellite and LiDAR
                        technology
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>
                        See clear GOOD vs BEST package pricing — simple, transparent
                        estimates
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>
                        This is a preliminary estimate — we&apos;ll verify and finalize
                        pricing during your free on-site inspection. Questions? Call us at{' '}
                        <a
                          href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          {BUSINESS_CONFIG.contact.phone}
                        </a>
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

