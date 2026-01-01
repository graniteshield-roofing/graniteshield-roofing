export interface QuoteRequest {
  address: string;
  email?: string;
  name?: string;
  phone?: string;
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

// Normalize base URL: strip trailing slashes to prevent double slashes in endpoint
function getNormalizedApiBase(): string {
  const base = process.env.NEXT_PUBLIC_QUOTE_API_URL ?? 'http://localhost:4000';
  // Strip all trailing slashes to ensure clean URL construction
  return base.replace(/\/+$/, '');
}

// Build endpoint URL with exactly one slash between base and path
function buildQuoteUrl(): string {
  const base = getNormalizedApiBase();
  return `${base}/quote`;
}

export async function getInstantQuote(payload: QuoteRequest): Promise<QuoteResponse> {
  // Build clean payload: only include phone/name if they have non-empty values after trimming
  const cleanPayload: QuoteRequest = {
    address: payload.address.trim(),
    ...(payload.email ? { email: payload.email.trim() } : {}),
    ...(payload.roofTypes && payload.roofTypes.length > 0
      ? { roofTypes: payload.roofTypes }
      : {}),
    ...(payload.phone && payload.phone.trim().length > 0
      ? { phone: payload.phone.trim() }
      : {}),
    ...(payload.name && payload.name.trim().length > 0
      ? { name: payload.name.trim() }
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
