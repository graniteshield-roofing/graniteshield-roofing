import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { InstantQuoteClient } from './instant-quote-client';

export const metadata: Metadata = {
  title: `Instant Online Roofing Quote | ${BUSINESS_CONFIG.name}`,
  description:
    "Get an instant standing seam metal roofing estimate for your Southern Maine home. We measure your roof using advanced satellite and LiDAR technology, then provide clear GOOD vs BEST package pricing.",
  alternates: {
    canonical: 'https://graniteshieldroofing.com/instant-quote',
  },
};

export default function InstantQuotePage() {
  return <InstantQuoteClient />;
}
