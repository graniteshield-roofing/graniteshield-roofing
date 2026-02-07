'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone, Star, ShieldCheck, Clock, CheckCircle2, User, MapPin, Wrench } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { MEDIA } from '@/lib/media';

// Google Ads call tracking number - forwards to Justin's cell (207-730-3467)
// This number is ONLY shown on this paid traffic landing page
// Organic traffic sees the main business number on other pages
const ADS_CALL_NUMBER = '(207) 530-8362'; // Replace with Google forwarding number when ready
const ADS_CALL_RAW = '+12075308362'; // Replace with Google forwarding number when ready

const trustSignals = [
  { icon: User, text: 'Owner answers every call' },
  { icon: ShieldCheck, text: 'Licensed & fully insured' },
  { icon: Clock, text: 'Same-day response' },
  { icon: MapPin, text: 'Local Southern Maine crew' },
];

const reviews = [
  {
    name: 'Sarah M.',
    town: 'Cumberland',
    text: 'Justin answered on the first ring and was at our house the next morning. No corporate runaround.',
    rating: 5,
  },
  {
    name: 'Mike D.',
    town: 'Scarborough',
    text: 'Owner-operated means real accountability. Best roofing experience we\'ve had.',
    rating: 5,
  },
  {
    name: 'Karen L.',
    town: 'Falmouth',
    text: 'Called about ice dam damage. Justin was on our roof within hours. Incredible service.',
    rating: 5,
  },
];

const services = [
  {
    title: 'Standing Seam Metal Roofing',
    description: '50+ year lifespan. Zero maintenance. Built for Maine winters.',
    image: '/images/projects/gallery/standing-seam-metal-roof-blue-maine-01.webp',
  },
  {
    title: 'Shingle Roof Replacement',
    description: 'Full tear-off and precision install. CertainTeed certified.',
    image: '/images/projects/gallery/shingle-roof-completed-maine-01.webp',
  },
  {
    title: 'Emergency Roof Repair',
    description: 'Active leaks, storm damage, ice dams. Same-day response.',
    image: '/images/projects/gallery/metal-roof-chimney-maine.webp',
  },
];

export default function CallLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ============================================
          HERO — MOBILE-FIRST, CALL-DOMINANT
      ============================================ */}
      <section className="relative">
        {/* Hero Image */}
        <div className="relative h-[45vh] sm:h-[50vh] lg:h-[60vh] w-full overflow-hidden">
          <Image
            src={MEDIA.heroes.main.src}
            alt={MEDIA.heroes.main.alt}
            width={MEDIA.heroes.main.width}
            height={MEDIA.heroes.main.height}
            className="h-full w-full object-cover object-[center_40%]"
            priority
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-slate-900/80" />

          {/* Hero text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <div className="flex items-center gap-1.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 text-sm font-semibold text-white/90">
                5.0 ({BUSINESS_CONFIG.reputation.reviewCount} reviews)
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-3xl">
              Talk to the Owner.
              <br />
              <span className="text-amber-400">Not a Call Center.</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/85 max-w-xl">
              Premium roofing built for Maine weather. One call, one person, real answers.
            </p>
          </div>
        </div>

        {/* ============================================
            PRIMARY CTA — GIANT CALL BUTTON
        ============================================ */}
        <div className="relative -mt-8 z-10 px-4">
          <a
            href={`tel:${ADS_CALL_RAW}`}
            className="mx-auto flex max-w-lg items-center justify-center gap-3 rounded-2xl bg-amber-500 px-8 py-5 shadow-2xl shadow-amber-500/30 transition-all duration-200 hover:bg-amber-400 hover:shadow-amber-400/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Phone className="h-7 w-7 text-slate-900 animate-pulse" />
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Call Justin Now
            </span>
          </a>
          <p className="mt-3 text-center text-sm text-slate-500">
            Speak directly with the owner — no voicemail maze
          </p>
        </div>
      </section>

      {/* ============================================
          TRUST SIGNALS — 4 PILLARS
      ============================================ */}
      <section className="py-10 px-4">
        <div className="mx-auto max-w-lg grid grid-cols-2 gap-4">
          {trustSignals.map((signal) => (
            <div
              key={signal.text}
              className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4"
            >
              <signal.icon className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-medium text-slate-700 leading-snug">
                {signal.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          OWNER CREDIBILITY SECTION
      ============================================ */}
      <section className="bg-slate-900 py-12 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 mb-6">
            <User className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">Owner-Operated</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            When You Call, Justin Answers
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-xl mx-auto">
            No sales reps. No subcontractors. No corporate runaround. Justin personally oversees 
            every project from the first phone call to the final inspection. That&apos;s why 
            GraniteShield has a perfect 5.0-star rating.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">5.0★</div>
              <div className="text-xs text-slate-400 mt-1">Google Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Owner On-Site</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">24hr</div>
              <div className="text-xs text-slate-400 mt-1">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          MID-PAGE CTA
      ============================================ */}
      <section className="py-8 px-4 bg-slate-50">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-slate-600 mb-4 text-sm">
            Ready to talk about your roof? One call is all it takes.
          </p>
          <a
            href={`tel:${ADS_CALL_RAW}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Phone className="h-5 w-5" />
            {ADS_CALL_NUMBER}
          </a>
        </div>
      </section>

      {/* ============================================
          SERVICES — VISUAL TRUST STACK
      ============================================ */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8">
            What We Do Best
          </h2>
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-snug">
                    {service.description}
                  </p>
                </div>
                <Wrench className="h-5 w-5 text-slate-300 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          REVIEWS — SOCIAL PROOF
      ============================================ */}
      <section className="bg-slate-50 py-12 px-4">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8">
            What Homeowners Say
          </h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-xl bg-white p-5 shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-600">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{review.name}</div>
                    <div className="text-xs text-slate-500">{review.town}, Maine</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICE AREA
      ============================================ */}
      <section className="py-10 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <MapPin className="h-8 w-8 text-amber-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Serving All of Southern Maine
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Cumberland Center, Portland, Scarborough, Falmouth, Yarmouth, Freeport, 
            Cape Elizabeth, South Portland, Westbrook, Biddeford, Saco, Auburn, 
            Turner, and surrounding towns.
          </p>
        </div>
      </section>

      {/* ============================================
          FINAL CTA — BOTTOM OF PAGE
      ============================================ */}
      <section className="bg-slate-900 py-14 px-4">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Your Roof Deserves Better
          </h2>
          <p className="text-slate-400 mb-8 text-sm">
            Skip the forms. Skip the wait. Talk to the person who will actually be on your roof.
          </p>
          <a
            href={`tel:${ADS_CALL_RAW}`}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-amber-500 px-10 py-5 shadow-2xl shadow-amber-500/20 transition-all duration-200 hover:bg-amber-400 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Phone className="h-7 w-7 text-slate-900" />
            <span className="text-xl font-extrabold text-slate-900">
              Call Justin — {ADS_CALL_NUMBER}
            </span>
          </a>
          <p className="mt-4 text-xs text-slate-500">
            Available Mon–Fri 7AM–6PM, Sat 8AM–4PM
          </p>
        </div>
      </section>

      {/* ============================================
          STICKY MOBILE CALL BAR
      ============================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <a
          href={`tel:${ADS_CALL_RAW}`}
          className="flex items-center justify-center gap-3 bg-amber-500 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
        >
          <Phone className="h-5 w-5 text-slate-900 animate-pulse" />
          <span className="text-base font-extrabold text-slate-900">
            Tap to Call Justin Now
          </span>
        </a>
      </div>

      {/* Bottom padding for sticky bar on mobile */}
      <div className="h-16 md:hidden" />
    </div>
  );
}
