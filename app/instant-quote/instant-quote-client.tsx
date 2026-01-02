'use client';

import { useState } from 'react';
import { QuoteRequest, QuoteResponse, getInstantQuote } from '@/lib/api/quote';

// Save lead to database
async function saveLead(request: QuoteRequest, response: QuoteResponse) {
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: request.address,
        normalizedAddress: response.normalizedAddress,
        name: request.name,
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        roofTypes: request.roofTypes,
        estimatedSquares: response.estimatedSquares,
        measurementMethod: response.measurementMethod,
        coordinates: response.coordinates,
        pricing: response.pricing,
        metadata: response.metadata,
      }),
    });
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
}
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
        estimatedSquares: response.estimatedSquares,
        measurementMethod: response.measurementMethod,
      });

      // Save lead to database (don't block on this)
      saveLead(request, response).catch(err => {
        console.error('Failed to save lead:', err);
      });
    } catch (err) {
      // Show user-friendly error message
      setError(
        "We couldn't generate an instant quote right now, but we've received your info and will follow up with an exact price."
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
              Instant Roofing Estimate • Powered by LiDAR & Real Pricing
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Instant Online Roofing Estimate for Southern Maine
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed mb-6">
              Get a ballpark estimate for your roofing project in minutes. Our
              instant quote uses LiDAR data, roof size measurements, and
              GraniteShield&apos;s real per-square pricing to give you accurate
              estimates for asphalt shingles and standing seam metal roofing.
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
            <QuoteResults data={quote} onReset={handleReset} />
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
                        Enter your address and select your preferred roof types
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>
                        Our system uses LiDAR and synthetic roof measurements to
                        estimate your roof size
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>
                        Get instant pricing estimates based on GraniteShield&apos;s
                        real per-square rates
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>
                        This is an estimate — final pricing requires an on-site
                        assessment. Questions? Call us at{' '}
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

