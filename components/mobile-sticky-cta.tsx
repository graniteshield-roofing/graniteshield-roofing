'use client';

import Link from 'next/link';
import { Phone, CalendarCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/business-config';

export function MobileStickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="grid grid-cols-2 gap-px border-t border-border bg-border">
        <a
          href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
          className="flex items-center justify-center gap-2 bg-background py-4 text-sm font-extrabold text-foreground hover:bg-slate-50 transition-colors"
          aria-label="Call GraniteShield Roofing"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>

        <Link
          href="/lp"
          className="flex items-center justify-center gap-2 bg-[hsl(var(--cta))] py-4 text-sm font-extrabold text-[hsl(var(--cta-foreground))] hover:bg-[hsl(var(--cta))]/90 transition-colors"
          aria-label="Get a free estimate"
        >
          <CalendarCheck className="h-4 w-4" />
          Free Estimate
        </Link>
      </div>
    </div>
  );
}
