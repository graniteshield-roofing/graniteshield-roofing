# Instant Quote Frontend - Backend Contract

## Overview

The instant quote UI expects the backend `QuoteResponse` to include the following structure:

```typescript
{
  packages: {
    good: { priceEstimate: { type: 'range' | 'exact', min?, max?, exact? }, label? },
    best: { priceEstimate: { type: 'range' | 'exact', min?, max?, exact? }, label? }
  },
  calibration: {
    measurement_source: 'hover' | 'synthetic' | 'synthetic_clamped',
    calibration_status: 'exact_hover' | 'within_range' | 'out_of_range',
    data_source_display: string
  },
  measurement?: {
    calibratedSquares?: number,
    estimatedSquares?: number,
    method?: 'lidar' | 'synthetic'
  },
  confidence?: { ... },
  assumptions: string[],
  normalizedAddress: string,
  coordinates?: { latitude: number, longitude: number }
}
```

## Key Points

- **GOOD/BEST packages**: Pricing is displayed directly from `packages.good` and `packages.best.priceEstimate` (no per-square-foot calculations shown to users)
- **Calibration badges**: Measurement source and confidence badges are derived from `calibration.calibration_status`:
  - `exact_hover` → "Exact 3D Scan" (green badge)
  - `within_range` → "Calibrated Estimate" (secondary badge)
  - `out_of_range` → "Needs Review" (amber badge)
- **Measurement source**: Displayed from `calibration.data_source_display`
- **Assumptions text**: Dynamically generated based on `calibration.calibration_status`

## Lead Capture

When users submit contact information, the lead payload includes:
- `selectedPackage`: 'good' | 'best' | 'undecided'
- `calibration.measurement_source`
- `calibration.calibration_status`
- `measurement.calibratedSquares` (if available)

This allows the backend/CRM to track estimate quality for each lead.

