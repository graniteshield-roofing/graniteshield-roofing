import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Star, Facebook, Instagram } from 'lucide-react';
import {
  BUSINESS_CONFIG,
  getFormattedAddress,
  getServiceAreaText,
} from '@/lib/business-config';

const LOGO_MARK =
  'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto,w_160/v1766125469/96c0aa8c-22d0-4717-80b1-6bb874f5d69a_1_vawddf.png';

export function SiteFooter() {
  const rating = BUSINESS_CONFIG?.reputation?.rating;
  const reviewCount = BUSINESS_CONFIG?.reputation?.reviewCount;

  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Conversion row (footer CTA) */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-200">
                Ready to schedule a free inspection?
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Call now or request an estimate — fast response across Southern
                Maine.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-transparent px-5 text-sm font-extrabold text-white hover:bg-white hover:text-slate-950 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call {BUSINESS_CONFIG.contact.phone}
              </a>

              <Link
                href="/lp"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[hsl(var(--cta))] px-5 text-sm font-extrabold text-[hsl(var(--cta-foreground))] hover:bg-[hsl(var(--cta))]/90 transition-colors"
              >
                Request Estimate
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={LOGO_MARK}
                alt="GraniteShield Roofing & Exteriors shield logo"
                width={44}
                height={44}
                className="rounded-md"
              />
              <div className="text-2xl font-extrabold tracking-tight">
                Granite<span className="text-white">Shield</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-300">
              {BUSINESS_CONFIG.branding.tagline}
            </p>

            {/* Rating (safe / optional) */}
            {rating ? (
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[hsl(var(--cta))] text-[hsl(var(--cta))]"
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-200">
                  {rating}
                  {typeof reviewCount === 'number' ? (
                    <span className="text-slate-400">
                      {' '}
                      ({reviewCount} reviews)
                    </span>
                  ) : null}
                </span>
              </div>
            ) : null}

            <p className="mt-3 text-xs text-slate-400">
              Owner-operated quality • Clean installs • Real accountability
            </p>

            {/* GEO line (AI + local relevance) */}
            <p className="mt-3 text-xs text-slate-400">
              Serving Southern Maine:{' '}
              {getServiceAreaText?.() ||
                'Cumberland County and surrounding towns'}
              .
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-white">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link
                  href="/services/roof-replacement"
                  className="hover:text-white transition-colors"
                >
                  Roof Replacement
                </Link>
              </li>
              <li>
                <Link
                  href="/services/roof-repair"
                  className="hover:text-white transition-colors"
                >
                  Roof Repair
                </Link>
              </li>
              <li>
                <Link
                  href="/services/standing-seam-metal-roofing"
                  className="hover:text-white transition-colors"
                >
                  Standing Seam Metal Roofing
                </Link>
              </li>
              <li>
                <Link
                  href="/services/vinyl-siding"
                  className="hover:text-white transition-colors"
                >
                  Vinyl Siding
                </Link>
              </li>
              <li>
                <Link
                  href="/services/windows"
                  className="hover:text-white transition-colors"
                >
                  Window Replacement
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-white">
              Service Areas
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link
                  href="/areas/scarborough"
                  className="hover:text-white transition-colors"
                >
                  Scarborough
                </Link>
              </li>
              <li>
                <Link
                  href="/areas/portland"
                  className="hover:text-white transition-colors"
                >
                  Portland
                </Link>
              </li>
              <li>
                <Link
                  href="/areas/cumberland"
                  className="hover:text-white transition-colors"
                >
                  Cumberland
                </Link>
              </li>
              <li>
                <Link
                  href="/areas/falmouth"
                  className="hover:text-white transition-colors"
                >
                  Falmouth
                </Link>
              </li>
              <li>
                <Link
                  href="/areas"
                  className="hover:text-[hsl(var(--cta))] transition-colors font-semibold"
                >
                  View All Areas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-white">
              Contact
            </h3>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-slate-200 flex-shrink-0 mt-0.5" />
                <span>{getFormattedAddress()}</span>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-slate-200 flex-shrink-0" />
                <a
                  href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS_CONFIG.contact.phone}
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-slate-200 flex-shrink-0" />
                <a
                  href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {BUSINESS_CONFIG.contact.email}
                </a>
              </li>
            </ul>

            <div className="mt-4 flex items-center gap-4">
              {BUSINESS_CONFIG.social.facebook ? (
                <a
                  href={BUSINESS_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                  aria-label="GraniteShield on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              ) : null}

              {BUSINESS_CONFIG.social.instagram ? (
                <a
                  href={BUSINESS_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                  aria-label="GraniteShield on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All rights
            reserved.
          </p>

          <p className="mt-2">
            Licensed & Insured Maine Roofing Contractor
            
          </p>
        </div>
      </div>
    </footer>
  );
}
