export type {
  QuoteRequest,
  QuoteResponse,
  Calibration,
  Packages,
  Package,
  PriceEstimate,
  Confidence,
  Measurement,
  // Legacy types (deprecated)
  PricingRange,
  QuotePricing,
} from '@/lib/api/quote';

export type RoofTypeOption =
  | 'asphalt'
  | 'standing_seam_roof_over'
  | 'standing_seam_tear_off';

// Package selection for lead capture
export type PackageSelection = 'good' | 'best' | 'undecided';