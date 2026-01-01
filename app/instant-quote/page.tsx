import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { InstantQuoteClient } from './instant-quote-client';

export const metadata: Metadata = {
  title: `Instant Online Roofing Quote | ${BUSINESS_CONFIG.name}`,
  description:
    "Get an instant roofing estimate for your Southern Maine home using LiDAR-powered measurements and GraniteShield's real per-square pricing for asphalt shingles and standing seam metal.",
  alternates: {
    canonical: 'https://graniteshieldroofing.com/instant-quote',
  },
};

export default function InstantQuotePage() {
  return <InstantQuoteClient />;
}
