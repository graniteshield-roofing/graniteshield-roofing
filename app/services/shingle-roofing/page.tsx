import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Phone, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import {
  ServiceSchema,
  BreadcrumbSchema,
  FAQSchema,
} from '@/components/schema-markup';

export const metadata: Metadata = {
  title: `Shingle Roofing in Southern Maine | ${BUSINESS_CONFIG.name}`,
  description:
    'Architectural shingle roofing in Southern Maine installed with clean flashing, ventilation (when applicable), and tight detailing. Owner-led quality and clear estimates.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/services/shingle-roofing',
  },
};

const SERVICE_AREAS = [
  'Cumberland Center',
  'Portland',
  'Scarborough',
  'Falmouth',
  'Yarmouth',
  'Freeport',
  'Cape Elizabeth',
  'South Portland',
  'Westbrook',
  'Biddeford',
  'Saco',
  'Auburn',
  'Turner',
];

export default function ShingleRoofingServicePage() {
  const included = [
    'System-first assessment (leaks, ventilation, flashing points)',
    'Tear-off + deck review (as needed)',
    'Ice & water protection strategy for vulnerable areas (as needed)',
    'Clean flashing at chimneys, walls, valleys, and penetrations',
    'Ventilation considerations (when applicable)',
    'Cleanup + final walkthrough',
  ];

  const faqs = [
    {
      question: 'Do you install architectural shingles?',
      answer:
        'Yes. We install high-performance architectural shingle systems and focus on clean flashing, ventilation (when applicable), and tight detailing for long-term performance.',
    },
    {
      question: 'How do I know if I need a full roof replacement?',
      answer:
        'If shingles are curling, missing, leaking, or the roof is near the end of its expected life, replacement may be the best long-term option. We confirm with an on-site assessment.',
    },
    {
      question: 'Do you offer repairs too?',
      answer:
        'Yes. If a repair is the right call, we’ll recommend it. If the roof is failing system-wide, we’ll show you why and outline options.',
    },
    {
      question: 'Is shingle roofing good for Maine weather?',
      answer:
        'Yes—when installed as a system with proper flashing and ventilation. Maine snow, wind, and freeze-thaw cycles make detailing and transitions critical.',
    },
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Shingle Roofing',
          description:
            'Architectural shingle roofing services in Southern Maine installed with clean flashing, ventilation (when applicable), and owner-led accountability.',
          url: 'https://graniteshieldroofing.com/services/shingle-roofing',
        }}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://graniteshieldroofing.com' },
          {
            name: 'Services',
            url: 'https://graniteshieldroofing.com/services',
          },
          {
            name: 'Shingle Roofing',
            url: 'https://graniteshieldroofing.com/services/shingle-roofing',
          },
        ]}
      />

      <FAQSchema faqs={faqs} />

      {/* HERO */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-14 sm:py-16 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-blue-600/90 px-4 py-2 text-sm font-semibold">
              Architectural Shingles • Built for Maine Weather
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Shingle Roofing in Southern Maine
            </h1>

            <p className="mt-4 text-lg text-slate-200">
              High-performance architectural shingle systems installed with
              clean flashing, ventilation (when applicable), and tight detailing
              — with real accountability from the owner on-site.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild className="h-12 px-6">
                <Link href="/instant-quote">
                  Get Instant Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="default" size="lg" asChild className="h-12 px-6">
                <Link href="/lp/free-roof-estimate">
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
                Serving Southern Maine:{' '}
                <span className="font-semibold">
                  {SERVICE_AREAS.join(', ')}
                </span>{' '}
                and nearby towns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Shingles Need System-Level Detailing
              </h2>
              <p className="mt-4 text-slate-600">
                Shingle roofs fail at transitions—chimneys, walls, valleys, and
                penetrations. We focus on the full system: flashing, ventilation
                (when applicable), and clean weatherproofing.
              </p>

              <div className="mt-8 space-y-3">
                {included.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-lg bg-slate-50 p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  Get a Clear Plan
                </h3>
                <p className="mt-2 text-slate-600">
                  We’ll inspect, explain options, and give you a clean estimate
                  that’s built for Maine conditions.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="cta" asChild className="w-full sm:w-auto">
                    <Link href="/lp/free-roof-estimate">
                      Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </a>
                  </Button>
                </div>

                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/services">Back to Services</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Shingle Roofing FAQs
          </h2>

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

          <div className="mt-12 text-center">
            <Button variant="cta" size="lg" asChild>
              <Link href="/lp/free-roof-estimate">
                Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
