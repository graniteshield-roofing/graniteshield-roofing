'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { QuoteResponse, formatCurrency } from '@/lib/api/quote';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { useEffect, useState } from 'react';
import { LeadCaptureForm } from './LeadCaptureForm';

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
  initialFormData?: {
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address: string;
  };
  onReset: () => void;
}

// Format price estimate from backend (handles both range and exact)
function formatPriceEstimate(priceEstimate: { type: 'range' | 'exact'; min?: number; max?: number; exact?: number }): string {
  if (priceEstimate.type === 'exact' && priceEstimate.exact !== undefined) {
    return formatCurrency(priceEstimate.exact);
  }
  if (priceEstimate.type === 'range' && priceEstimate.min !== undefined && priceEstimate.max !== undefined) {
    if (priceEstimate.min === priceEstimate.max) {
      return formatCurrency(priceEstimate.min);
    }
    return `${formatCurrency(priceEstimate.min)} – ${formatCurrency(priceEstimate.max)}`;
  }
  return 'Price on request';
}

// Get calibration badge info based on calibration_status
function getCalibrationBadge(calibration: QuoteResponse['calibration']): {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  description?: string;
} {
  switch (calibration.calibration_status) {
    case 'exact_hover':
      return {
        label: 'Exact 3D Scan',
        variant: 'default',
        className: 'bg-green-600 text-white',
      };
    case 'within_range':
      return {
        label: 'Calibrated Estimate',
        variant: 'secondary',
        description: 'Within 5–15% of reference data. We\'ll confirm on-site.',
      };
    case 'out_of_range':
      return {
        label: 'Needs Review',
        variant: 'destructive',
        className: 'bg-amber-600 text-white',
        description: 'This estimate is outside our normal calibration range. We\'ll manually measure your roof during the inspection and confirm pricing before any work begins.',
      };
    default:
      return {
        label: 'Estimate',
        variant: 'outline',
      };
  }
}

// Get assumptions text based on calibration_status
function getAssumptionsText(calibration: QuoteResponse['calibration']): string {
  switch (calibration.calibration_status) {
    case 'exact_hover':
      return 'Estimate based on exact Hover 3D roof measurements for this property.';
    case 'within_range':
      return 'Estimate based on calibrated aerial + LiDAR roof measurements, within 5–15% of reference data. Final price confirmed after on-site inspection.';
    case 'out_of_range':
      return 'Estimate flagged for manual review; we\'ll precisely measure your roof on-site before confirming any pricing.';
    default:
      return 'Estimate based on available measurement data. Final price confirmed after on-site inspection.';
  }
}

// Simple tracking utility
function track(event: string, payload?: Record<string, unknown>) {
  console.log('[track]', event, payload ?? {});
}

export function QuoteResults({ data, initialFormData, onReset }: QuoteResultsProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const calibratedSquares = data.measurement?.calibratedSquares || data.estimatedSquares;

  // Track results view on mount (must be before any conditional returns)
  useEffect(() => {
    if (data.calibration) {
      track('instant_quote_results_view', {
        calibrationStatus: data.calibration.calibration_status,
        measurementSource: data.calibration.measurement_source,
        calibratedSquares,
      });
    }
  }, [data.calibration, calibratedSquares]);

  // Validate required fields
  if (!data.packages || !data.calibration) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-amber-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Unable to Display Quote
          </h3>
          <p className="text-slate-700 mb-6">
            The quote data is incomplete. Please contact us directly for a quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="cta" size="lg" asChild>
              <Link href="/contact?intent=instant-quote">Contact Us</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={onReset}>
              Try Different Address
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const calibrationBadge = getCalibrationBadge(data.calibration);
  const assumptionsText = getAssumptionsText(data.calibration);

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
              <div className="font-semibold text-slate-900">{data.normalizedAddress}</div>
            </div>
          </div>

          {/* Measurement Source */}
          <div>
            <div className="text-sm text-slate-600">Measurement Source</div>
            <div className="font-semibold text-slate-900 text-lg">
              {data.calibration.data_source_display}
            </div>
          </div>

          {/* Calibration Badge */}
          <div className="space-y-2">
            <Badge
              variant={calibrationBadge.variant}
              className={calibrationBadge.className}
            >
              {calibrationBadge.label}
            </Badge>
            {calibrationBadge.description && (
              <p className="text-sm text-slate-700">{calibrationBadge.description}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Map Preview */}
      {data.coordinates?.latitude && data.coordinates?.longitude && (
        <QuoteMapPreview
          latitude={data.coordinates.latitude}
          longitude={data.coordinates.longitude}
        />
      )}

      {/* GOOD vs BEST Packages */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Your Standing Seam Roof Estimate
        </h2>
        <p className="text-slate-600 mb-6">
          Choose the package that fits your needs. We&apos;ll help you decide during your free
          on-site inspection.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* GOOD Package */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl font-bold text-slate-900">GOOD</CardTitle>
                <Badge variant="outline" className="text-sm">
                  {data.packages.good.label || 'Standard Standing Seam'}
                </Badge>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">
                {formatPriceEstimate(data.packages.good.priceEstimate)}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 pt-4 border-t border-slate-200">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Premium standing seam metal roofing</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Standard color options</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Quality installation with clean detailing</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Designed for Maine weather conditions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* BEST Package */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-blue-200 bg-blue-50 relative">
            <div className="absolute top-4 right-4">
              <Badge className="bg-blue-600 text-white">POPULAR</Badge>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl font-bold text-slate-900">BEST</CardTitle>
                <Badge variant="outline" className="text-sm">
                  {data.packages.best.label || 'Enhanced Standing Seam'}
                </Badge>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">
                {formatPriceEstimate(data.packages.best.priceEstimate)}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 pt-4 border-t border-slate-200">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Premium standing seam metal roofing</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Premium color & texture options</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Enhanced snow & ice protection</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Superior curb appeal & durability</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Quality installation with clean detailing</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assumptions & Fine Print */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            Assumptions & Fine Print
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="text-sm text-slate-700 flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">•</span>
              <span>{assumptionsText}</span>
            </li>
            {calibratedSquares && (
              <li className="text-sm text-slate-700 flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>
                  Estimated roof size: about {calibratedSquares.toFixed(1)} squares
                  ({Math.round(calibratedSquares * 100).toLocaleString()} sq ft)
                </span>
              </li>
            )}
            <li className="text-sm text-slate-700 flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">•</span>
              <span>
                Final pricing requires an on-site measurement and assessment.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Additional disclaimer for out_of_range */}
      {data.calibration.calibration_status === 'out_of_range' && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-slate-700">
            <strong>Important:</strong> {calibrationBadge.description}
          </AlertDescription>
        </Alert>
      )}

      {/* Lead Capture Form or CTA Buttons */}
      {showLeadForm ? (
        <LeadCaptureForm
          quoteData={data}
          initialData={initialFormData}
          onSuccess={() => {
            // Form handles success state internally
          }}
        />
      ) : (
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
            <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
              Book your free on-site inspection to finalize your quote and lock in these
              prices for 30 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="cta"
                size="lg"
                onClick={() => setShowLeadForm(true)}
                className="bg-white text-slate-900 hover:bg-slate-100"
              >
                Book Free Inspection
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white/30 text-white hover:bg-white/10"
              >
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  Call {BUSINESS_CONFIG.contact.phone}
                </a>
              </Button>
            </div>
            <div className="mt-6">
              <Button variant="ghost" onClick={onReset} className="text-slate-300 hover:text-white">
                Get New Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
