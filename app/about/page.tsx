import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Phone, CheckCircle2, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import {
  BreadcrumbSchema,
  FAQSchema,
  PersonSchema,
} from '@/components/schema-markup';
import { getServiceAreaNames } from '@/lib/towns-data';

export const metadata: Metadata = {
  title:
    'About GraniteShield Roofing | Owner-Operated Roofing & Exteriors in Southern Maine',
  description:
    'Learn about GraniteShield Roofing & Exteriors — an owner-operated roofing, siding, and window contractor serving Southern Maine. Clear communication, clean installs, and real accountability.',
  alternates: { canonical: 'https://graniteshieldroofing.com/about' },
  openGraph: {
    title: 'About GraniteShield Roofing | Southern Maine',
    description:
      'Owner-operated roofing & exterior systems built for Maine weather — metal roofing, roof replacement, repairs, siding, and windows.',
    url: 'https://graniteshieldroofing.com/about',
    siteName: 'GraniteShield Roofing & Exteriors',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About GraniteShield Roofing | Southern Maine',
    description:
      'Owner-operated roofing & exteriors built for Maine weather — clean installs and real accountability.',
  },
};

export default function AboutPage() {

  // ✅ Get service areas from towns-data.ts (single source of truth)
  const serviceAreas = getServiceAreaNames();

  const corePoints = [
    'Owner-operated: the person you speak with stays involved through completion.',
    'System-first installs: flashing, ventilation, and water management matter more than hype.',
    'Clean job sites: protect landscaping, maintain safety, and leave the property spotless.',
    'Straight communication: clear scope, clear schedule, no disappearing act.',
  ];

  const serviceLinks = [
    { label: 'Roof Replacement', href: '/services/roof-replacement' },
    { label: 'Roof Repair', href: '/services/roof-repair' },
    {
      label: 'Standing Seam Metal Roofing',
      href: '/services/standing-seam-metal-roofing',
    },
    { label: 'Vinyl Siding', href: '/services/vinyl-siding' },
    { label: 'Metal Siding', href: '/services/metal-siding' },
    { label: 'Windows', href: '/services/windows' },
  ];

  const faqs = [
    {
      question: 'Is GraniteShield owner-operated?',
      answer:
        'Yes. GraniteShield is built around direct oversight, clear communication, and accountability from estimate to completion.',
    },
    {
      question: 'What areas do you serve?',
      answer:
        'We serve Southern Maine, including towns across Cumberland County, York County, and nearby areas. If you’re unsure, contact us and we’ll confirm your location.',
    },
    {
      question: 'What makes your installs different?',
      answer:
        'We focus on system-level performance: proper flashing details, ventilation (when applicable), and water management so your roof and exterior hold up to Maine weather.',
    },
  ];

  return (
    <>
      {/* ✅ Breadcrumb + FAQ schema (clean SEO/AI signal) */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'About', url: `${SITE_URL}/about` },
        ]}
      />
      <FAQSchema faqs={faqs} />

      {/* ✅ Person schema (Justin only — keep it real/public) */}
      <PersonSchema
        name="Justin Laflamme"
        jobTitle="Founder & Owner"
        description="Founder and owner of GraniteShield Roofing & Exteriors. Personally oversees projects to ensure quality, communication, and accountability."
      />

      {/* HERO */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-blue-600 text-white border-0">
              Owner-Operated • Southern Maine
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              About GraniteShield Roofing & Exteriors
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-slate-200">
              GraniteShield is built around one idea:
              <span className="font-semibold text-white"> do it right</span> —
              with clean installs, clear communication, and real accountability.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="cta" asChild className="h-12 px-6">
                <Link href="/lp">
                  Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 px-6 bg-transparent text-white border-white hover:bg-white hover:text-slate-900"
              >
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {BUSINESS_CONFIG.contact.phone}
                </a>
              </Button>
            </div>

            <div className="mt-6 flex items-start gap-2 text-slate-200 text-sm max-w-2xl">
              <MapPin className="h-4 w-4 mt-0.5 text-slate-300" />
              <p>
                Serving Southern Maine: {serviceAreas.join(', ')} and
                surrounding towns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY + PRINCIPLES */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                What We Stand For
              </h2>
              <p className="mt-3 text-slate-600">
                We’re not trying to look flashy. We’re built to feel safe,
                established, and accountable — because roofing is a risk
                purchase.
              </p>

              <ul className="mt-6 space-y-3 text-slate-700">
                {corePoints.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-slate-600">
                Our work is designed for New England conditions — snow loads,
                ice, wind-driven rain, and coastal exposure. If you want it done
                correctly, you’re in the right place.
              </p>
            </div>

            <Card className="border-slate-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  Services We’re Known For
                </h3>
                <p className="mt-2 text-slate-600">
                  Explore details, FAQs, and what to expect for each service.
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="rounded-lg border border-slate-200 px-4 py-3 text-slate-800 hover:border-slate-300 hover:bg-slate-50 transition"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    className="w-full sm:w-auto"
                    variant="outline"
                  >
                    <Link href="/services">
                      View All Services <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <Link href="/areas">Service Areas</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* OWNER SECTION (no images for now) */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Owner Oversight</h2>
          <p className="mt-3 text-slate-600">
            GraniteShield is founded and led by{' '}
            <span className="font-semibold">Justin Laflamme</span>. Homeowners
            get a clear plan, clean work, and a contractor who stays involved —
            not a handoff to strangers.
          </p>

          <div className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  Justin Laflamme
                </h3>
                <p className="mt-1 text-sm text-blue-700 font-semibold uppercase tracking-wide">
                  Founder & Owner
                </p>
                <p className="mt-4 text-slate-700">
                  GraniteShield exists because too many homeowners get
                  overpromised and underdelivered. The focus here is
                  craftsmanship, water management, and clear communication —
                  with the owner staying accountable from start to finish.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mt-8 text-slate-600">
            Want to talk through options? Start with an inspection and we’ll
            give you a clear recommendation based on your home and Maine
            conditions.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">FAQ</h2>

          <div className="mt-10 space-y-5">
            {faqs.map((f) => (
              <Card key={f.question}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {f.question}
                  </h3>
                  <p className="mt-2 text-slate-600">{f.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 text-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Work with GraniteShield?
          </h2>
          <p className="mt-4 text-slate-300 text-lg">
            Book a free inspection and get a clear scope, clean plan, and real
            accountability.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="cta" asChild className="h-12 px-6">
              <Link href="/lp">
                Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 px-6 bg-transparent text-white border-white hover:bg-white hover:text-slate-900"
            >
              <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                <Phone className="mr-2 h-5 w-5" />
                {BUSINESS_CONFIG.contact.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
