export interface QuoteRequest {
  address: string;
  // Separate address components (optional, sent in addition to address string)
  streetAddress?: string;
  city?: string;
  state?: string;
  zip?: string;
  // Name fields
  name?: string;
  firstName?: string;
  lastName?: string;
  // Contact fields
  email?: string;
  phone?: string;
  // Roof type selection
  roofTypes?: Array<'asphalt' | 'standing_seam_roof_over' | 'standing_seam_tear_off'>;
}

export interface PricePerSquare {
  low: number;
  mid: number;
  high: number;
}

export interface PricingRange {
  low: number;
  mid: number;
  high: number;
  currency: 'USD';
  label: string;
  pricePerSquare: PricePerSquare;
}

export interface QuotePricing {
  asphalt?: PricingRange;
  standingSeamRoofOver?: PricingRange;
  standingSeamTearOff?: PricingRange;
}

export interface QuoteResponse {
  normalizedAddress: string;
  coordinates?: { latitude: number; longitude: number };
  estimatedSquares: number;
  measurementMethod: 'lidar' | 'synthetic';
  pricing: QuotePricing;
  assumptions: string[];
  metadata?: {
    cached?: boolean;
    processingTimeMs?: number;
    timestamp?: string;
    dataSource?: string;
    pitchSummary?: string;
    wasteFactor?: number;
    confidenceScore?: number;
  };
}

/**
 * API Base URL for the Roof Measurement Engine backend
 * 
 * - Production: Set NEXT_PUBLIC_MEASURE_API_BASE_URL to the Render URL
 * - Development: Falls back to http://localhost:4000 when env var is not set
 */
export const API_BASE_URL = (() => {
  const base = process.env.NEXT_PUBLIC_MEASURE_API_BASE_URL || 'http://localhost:4000';
  // Strip all trailing slashes to ensure clean URL construction
  return base.replace(/\/+$/, '');
})();

// Build endpoint URL with exactly one slash between base and path
function buildQuoteUrl(): string {
  return `${API_BASE_URL}/quote`;
}

export async function getInstantQuote(payload: QuoteRequest): Promise<QuoteResponse> {
  // Build clean payload: include all provided fields, trimming strings where appropriate
  const cleanPayload: QuoteRequest = {
    address: payload.address.trim(),
    // Include separate address components if provided
    ...(payload.streetAddress?.trim() ? { streetAddress: payload.streetAddress.trim() } : {}),
    ...(payload.city?.trim() ? { city: payload.city.trim() } : {}),
    ...(payload.state?.trim() ? { state: payload.state.trim() } : {}),
    ...(payload.zip?.trim() ? { zip: payload.zip.trim() } : {}),
    // Include name fields
    ...(payload.name?.trim() ? { name: payload.name.trim() } : {}),
    ...(payload.firstName?.trim() ? { firstName: payload.firstName.trim() } : {}),
    ...(payload.lastName?.trim() ? { lastName: payload.lastName.trim() } : {}),
    // Include contact fields
    ...(payload.email?.trim() ? { email: payload.email.trim() } : {}),
    ...(payload.phone?.trim() ? { phone: payload.phone.trim() } : {}),
    // Include roof types
    ...(payload.roofTypes && payload.roofTypes.length > 0
      ? { roofTypes: payload.roofTypes }
      : {}),
  };

  const url = buildQuoteUrl();
  
  // Log the final URL in development only
  if (process.env.NODE_ENV === 'development') {
    console.debug('[quote] POST', url);
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cleanPayload),
    redirect: 'follow',
  });

  // Check if fetch followed a redirect (301/302)
  if (response.redirected) {
    throw new Error(
      `Quote API redirected unexpectedly. Original: ${url}, Redirected to: ${response.url}. This usually means the API base URL is incorrect or has a trailing slash issue.`
    );
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(
      `Failed to get quote: ${response.status} ${response.statusText}. ${errorText}`
    );
  }

  return response.json();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatSquares(squares: number): string {
  return `${squares.toFixed(1)} squares`;
}

/**
 * Health check for the measurement engine backend
 * Returns true if the backend is reachable and healthy
 */
export async function pingMeasureHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      cache: 'no-store',
    });
    return res.ok;
  } catch {
    return false;
  }
}
