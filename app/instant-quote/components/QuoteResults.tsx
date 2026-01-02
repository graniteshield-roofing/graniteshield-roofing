'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, MapPin, CheckCircle2 } from 'lucide-react';
import { QuoteResponse, formatCurrency, formatSquares } from '@/lib/api/quote';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { useEffect } from 'react';

// Dynamically import map component to avoid SSR issues
const QuoteMapPreview = dynamic(
  () => import('@/components/QuoteMapPreview').then((mod) => mod.QuoteMapPreview),
  {
    ssr: false,
    loading: () => (
      <Card className="border-slate-200">
        <CardContent className="p-8 text-center">
          <p className="text-sm text-slate-600">Loading map preview...</p>
        </CardContent>
      </Card>
    ),
  }
);

interface QuoteResultsProps {
  data: QuoteResponse;
  onReset: () => void;
}

const ROOF_TYPE_CONFIG: Record<
  'asphalt' | 'standingSeamRoofOver' | 'standingSeamTearOff',
  { label: string; badge: string }
> = {
  asphalt: {
    label: 'Asphalt Shingles',
    badge: 'Asphalt',
  },
  standingSeamRoofOver: {
    label: 'Standing Seam Metal (Roof-over)',
    badge: 'Metal (Roof-over)',
  },
  standingSeamTearOff: {
    label: 'Standing Seam Metal (Full Tear-off)',
    badge: 'Metal (Tear-off)',
  },
};

// Simple tracking utility
function track(event: string, payload?: Record<string, unknown>) {
  console.log('[track]', event, payload ?? {});
}

export function QuoteResults({ data, onReset }: QuoteResultsProps) {
  // Type guard to filter out undefined pricing entries
  const pricingEntries = Object.entries(data.pricing).filter(
    (entry): entry is [keyof typeof ROOF_TYPE_CONFIG, NonNullable<QuoteResponse['pricing'][keyof QuoteResponse['pricing']]>] => {
      const [key, value] = entry;
      return value !== undefined && key in ROOF_TYPE_CONFIG;
    }
  );

  const measurementMethodLabel =
    data.measurementMethod === 'lidar' ? 'LiDAR' : 'Synthetic';

  // Get first pricing entry (primary roof type) for monthly payment estimate
  const primaryPricing = pricingEntries.length > 0 ? pricingEntries[0][1] : null;
  const monthlyPaymentEstimate = primaryPricing
    ? Math.round(primaryPricing.mid / 120)
    : null;

  // Check if financing URL is available (handle empty string as not available)
  const financingUrl =
    process.env.NEXT_PUBLIC_FINANCING_PREAPPROVAL_URL?.trim() || undefined;

  // Track results view on mount
  useEffect(() => {
    track('instant_quote_results_view', {
      estimatedSquares: data.estimatedSquares,
      measurementMethod: data.measurementMethod,
      dataSource: data.metadata?.dataSource || 'unknown',
    });
  }, [data]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Summary Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">
            Your Estimate Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm text-slate-600">Address</div>
              <div className="font-semibold text-slate-900">
                {data.normalizedAddress}
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-600">Estimated Roof Size</div>
            <div className="font-semibold text-slate-900 text-lg">
              {formatSquares(data.estimatedSquares)}
            </div>
            <div className="text-sm text-slate-700 mt-1">
              ({Math.round(data.estimatedSquares * 100).toLocaleString()} sq ft)
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Based on {measurementMethodLabel} data
            </div>
          </div>

          {data.metadata?.pitchSummary && (
            <div>
              <div className="text-sm text-slate-600">Pitch Summary</div>
              <div className="font-semibold text-slate-900">
                {data.metadata.pitchSummary}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Map Preview */}
      {data.coordinates?.latitude && data.coordinates?.longitude && (
        <QuoteMapPreview
          latitude={data.coordinates.latitude}
          longitude={data.coordinates.longitude}
        />
      )}

      {/* Pricing Cards */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Pricing Estimates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingEntries.map(([key, pricing]) => {
            const config = ROOF_TYPE_CONFIG[key];
            return (
              <Card
                key={key}
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl font-bold text-slate-900">
                      {pricing.label}
                    </CardTitle>
                    <Badge variant="outline">{config.badge}</Badge>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900">
                    {formatCurrency(pricing.mid)}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    {formatCurrency(pricing.low)} – {formatCurrency(pricing.high)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-600">Good (low)</span>
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(pricing.low)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {formatCurrency(pricing.pricePerSquare.low)}/sq
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-600">Better (mid)</span>
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(pricing.mid)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {formatCurrency(pricing.pricePerSquare.mid)}/sq
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-600">Best (high)</span>
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(pricing.high)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {formatCurrency(pricing.pricePerSquare.high)}/sq
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Assumptions */}
      {(data.assumptions.length > 0 || data.estimatedSquares) && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Assumptions & Fine Print
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {/* Enhanced roof size assumption with calibration clarity */}
              <li className="text-sm text-slate-700 flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>
                  Estimated {data.estimatedSquares.toFixed(1)} squares (about{' '}
                  {Math.round(data.estimatedSquares * 100).toLocaleString()} sq
                  ft), calibrated using real-world HOVER test roofs for
                  ballpark accuracy.
                </span>
              </li>
              {/* Other assumptions from API */}
              {data.assumptions
                .filter(
                  (assumption) =>
                    !assumption.toLowerCase().includes('estimated') &&
                    !assumption.toLowerCase().includes('squares') &&
                    !assumption.toLowerCase().includes('sq ft') &&
                    !assumption.toLowerCase().includes('calibrated')
                )
                .map((assumption, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-slate-700 flex items-start gap-2"
                  >
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{assumption}</span>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Lock Your Quote & Next Steps */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Lock Your Quote & Next Steps
        </h2>
        <p className="text-slate-600 mb-6">
          Owner-operated. Southern Maine. Fast scheduling + clean installs.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 30-Day Price Lock Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">
                30-Day Price Lock
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Lock today&apos;s estimate range for 30 days after a free on-site
                verification.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>No obligation</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>On-site measurement confirms exact price</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Fast scheduling</span>
                </li>
              </ul>
              <Button
                variant="cta"
                size="lg"
                className="w-full"
                asChild
              >
                <Link
                  href="/lp?service=instant-quote-lock"
                  onClick={() => track('instant_quote_click_lock')}
                >
                  Lock My Quote
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Financing Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-slate-900">
                  Financing Available
                </CardTitle>
                {!financingUrl && (
                  <Badge variant="outline" className="text-xs">
                    Pre-Approval Link Coming Soon
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {financingUrl ? (
                <>
                  <p className="text-sm text-slate-600">
                    Takes ~2 minutes. No impact until you accept terms.
                  </p>
                  {monthlyPaymentEstimate && (
                    <div className="pt-2 border-t border-slate-200">
                      <div className="text-2xl font-bold text-slate-900">
                        Estimated from {formatCurrency(monthlyPaymentEstimate)}/mo*
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        *Estimated payment for planning only. Actual terms depend on
                        approval and options.
                      </p>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={financingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('instant_quote_click_financing')}
                    >
                      Get Pre-Approved Online
                    </a>
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-slate-600">
                    Ask us during scheduling — we&apos;ll send the secure link.
                  </p>
                  {monthlyPaymentEstimate && (
                    <div className="pt-2 border-t border-slate-200">
                      <div className="text-2xl font-bold text-slate-900">
                        Estimated from {formatCurrency(monthlyPaymentEstimate)}/mo*
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        *Estimated payment for planning only. Actual terms depend on
                        approval and options.
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Schedule Card (Primary CTA) */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">
                Schedule Your Free On-Site Measurement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Confirm measurements, material options, and finalize your exact quote.
              </p>
              <Button
                variant="cta"
                size="lg"
                className="w-full bg-slate-900 text-white hover:bg-slate-800"
                asChild
              >
                <Link
                  href="/contact?intent=instant-quote"
                  onClick={() => track('instant_quote_click_schedule')}
                >
                  Schedule Free Inspection
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                asChild
              >
                <a
                  href="tel:+12075308362"
                  onClick={() => track('instant_quote_click_call')}
                >
                  Call (207) 530-8362
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom CTA (simplified) */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
          <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
            This is an estimated quote. For a detailed assessment and final pricing,
            schedule a free consultation with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="cta"
              size="lg"
              asChild
              className="bg-white text-slate-900 hover:bg-slate-100"
            >
              <Link
                href="/contact?intent=instant-quote"
                onClick={() => track('instant_quote_click_schedule')}
              >
                Schedule Free Inspection
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white/30 text-white hover:bg-white/10"
            >
              <a
                href="tel:+12075308362"
                onClick={() => track('instant_quote_click_call')}
              >
                Call (207) 530-8362
              </a>
            </Button>
          </div>
          <div className="mt-4">
            <Button
              variant="ghost"
              onClick={onReset}
              className="text-slate-300 hover:text-white"
            >
              Get New Quote
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
