'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'Service Areas', href: '/areas' },
    { name: 'About', href: '/about' },

    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label={`${BUSINESS_CONFIG.name} Home`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="text-2xl font-extrabold tracking-tight text-slate-900">
              Granite<span className="text-slate-900">Shield</span>
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-500">
              Roofing & Exteriors • Southern Maine
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
              aria-label={`Call ${BUSINESS_CONFIG.name}`}
            >
              <Phone className="h-4 w-4 text-slate-900" />
              <span>{BUSINESS_CONFIG.contact.phone}</span>
            </a>

            <Button asChild size="sm" variant="cta">
              <Link href="/lp">Free Inspection</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-900 hover:bg-slate-50"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-slate-800 hover:bg-slate-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.name}</span>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </Link>
              ))}

              <div className="mt-2 grid grid-cols-1 gap-3 px-1">
                <a
                  href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white py-3 text-base font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone className="h-5 w-5" />
                  {BUSINESS_CONFIG.contact.phone}
                </a>

                <Button asChild size="lg" variant="cta" className="w-full">
                  <Link href="/lp" onClick={() => setMobileMenuOpen(false)}>
                    Free Inspection
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
