'use client';

import Image from 'next/image';
import { Phone, Star, ShieldCheck, Clock, CheckCircle2, MapPin, Wrench, Award, Users } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { MEDIA } from '@/lib/media';

// Google Ads call tracking number
const ADS_CALL_NUMBER = '(207) 530-8362';
const ADS_CALL_RAW = '+12075308362';

const trustSignals = [
  { icon: ShieldCheck, text: 'Licensed & fully insured' },
  { icon: Users, text: 'Owner-supervised crew' },
  { icon: Clock, text: 'Response within 24 hours' },
  { icon: MapPin, text: 'Southern Maine based' },
];

const reviews = [
  {
    name: 'Sarah M.',
    town: 'Cumberland',
    text: 'Professional from start to finish. The crew was respectful, clean, and thorough. Our new metal roof looks incredible.',
    rating: 5,
  },
  {
    name: 'Mike D.',
    town: 'Scarborough',
    text: 'Real accountability at every step. The quality of the install and the cleanup afterward set GraniteShield apart.',
    rating: 5,
  },
  {
    name: 'Karen L.',
    town: 'Falmouth',
    text: 'Had ice dam damage and they responded the same day. Handled everything with care. Highly recommend.',
    rating: 5,
  },
];

const services = [
  {
    title: 'Standing Seam Metal Roofing',
    description: '50+ year lifespan. Engineered for Maine\'s harshest conditions.',
    image: '/images/projects/gallery/standing-seam-metal-roof-blue-maine-01.webp',
  },
  {
    title: 'Shingle Roof Replacement',
    description: 'Full tear-off and precision install. CertainTeed certified systems.',
    image: '/images/projects/gallery/shingle-roof-completed-maine-01.webp',
  },
  {
    title: 'Emergency Roof Repair',
    description: 'Active leaks, storm damage, ice dams. Same-day response available.',
    image: '/images/projects/gallery/metal-roof-chimney-maine.webp',
  },
];

export default function CallLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ============================================
          HERO — CLEAN, PROFESSIONAL, CALL-FOCUSED
      ============================================ */}
      <section className="relative">
        {/* Hero Image */}
        <div className="relative h-[42vh] sm:h-[48vh] lg:h-[56vh] w-full overflow-hidden">
          <Image
            src={MEDIA.heroes.main.src}
            alt={MEDIA.heroes.main.alt}
            width={MEDIA.heroes.main.width}
            height={MEDIA.heroes.main.height}
            className="h-full w-full object-cover object-[center_40%]"
            priority
          />
          {/* Refined gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/20 to-slate-900/70" />

          {/* Hero text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-3xl">
              Roofing Systems
              <br />
              <span className="text-amber-400">Built for Maine.</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
              Standing seam metal, shingle replacements, and emergency repair.
              <br className="hidden sm:block" />
              Owner-supervised quality on every project.
            </p>
          </div>
        </div>

        {/* ============================================
            PRIMARY CTA — CALL BUTTON
        ============================================ */}
        <div className="relative -mt-8 z-10 px-4">
          <a
            href={`tel:${ADS_CALL_RAW}`}
            className="mx-auto flex max-w-lg items-center justify-center gap-3 rounded-2xl bg-amber-500 px-8 py-5 shadow-xl transition-all duration-200 hover:bg-amber-400 hover:scale-[1.01] active:scale-[0.99]"
          >
            <Phone className="h-6 w-6 text-slate-900" />
            <span className="text-xl sm:text-2xl font-bold text-slate-900">
              Call GraniteShield Roofing
            </span>
          </a>
          <p className="mt-3 text-center text-sm text-slate-500">
            {ADS_CALL_NUMBER} &middot; Mon–Fri 7AM–6PM, Sat 8AM–4PM
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
              <signal.icon className="h-5 w-5 text-slate-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-medium text-slate-700 leading-snug">
                {signal.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          COMPANY CREDIBILITY SECTION
      ============================================ */}
      <section className="bg-slate-900 py-12 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Every Project. Owner-Supervised.
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-xl mx-auto text-sm sm:text-base">
            GraniteShield Roofing is a crew-based operation where every job is personally 
            overseen by the company owner. Our roofing specialists handle each phase with 
            precision — from initial assessment through final inspection. That commitment 
            to quality is why we maintain a perfect 5.0-star rating.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">5.0★</div>
              <div className="text-xs text-slate-400 mt-1">Google Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{BUSINESS_CONFIG.reputation.reviewCount}+</div>
              <div className="text-xs text-slate-400 mt-1">5-Star Reviews</div>
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
            Questions about your roof? Our team is ready to help.
          </p>
          <a
            href={`tel:${ADS_CALL_RAW}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99]"
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
            Our Roofing Services
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
          <MapPin className="h-8 w-8 text-slate-400 mx-auto mb-3" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
            Serving Southern Maine
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
            Ready to Discuss Your Project?
          </h2>
          <p className="text-slate-400 mb-8 text-sm">
            Speak with our team about your roofing needs. No pressure, no obligation.
          </p>
          <a
            href={`tel:${ADS_CALL_RAW}`}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-amber-500 px-10 py-5 shadow-xl transition-all duration-200 hover:bg-amber-400 hover:scale-[1.01] active:scale-[0.99]"
          >
            <Phone className="h-6 w-6 text-slate-900" />
            <span className="text-xl font-bold text-slate-900">
              {ADS_CALL_NUMBER}
            </span>
          </a>
          <p className="mt-4 text-xs text-slate-500">
            Mon–Fri 7AM–6PM &middot; Sat 8AM–4PM
          </p>
        </div>
      </section>

      {/* ============================================
          STICKY MOBILE CALL BAR — PROFESSIONAL
      ============================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <a
          href={`tel:${ADS_CALL_RAW}`}
          className="flex items-center justify-center gap-3 bg-amber-500 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
        >
          <Phone className="h-5 w-5 text-slate-900" />
          <span className="text-base font-bold text-slate-900">
            Call GraniteShield Roofing
          </span>
        </a>
      </div>

      {/* Bottom padding for sticky bar on mobile */}
      <div className="h-16 md:hidden" />
    </div>
  );
}
