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
  title: `Roof Repair in Southern Maine | ${BUSINESS_CONFIG.name}`,
  description:
    'Roof repair in Southern Maine for leaks, storm damage, and flashing issues. Fast stabilization, clean repairs, and owner-led accountability.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/services/roof-repair',
  },
};

const SERVICE_AREAS = [
  'Portland',
  'Scarborough',
  'South Portland',
  'Westbrook',
  'Falmouth',
  'Yarmouth',
  'Biddeford',
  'Saco',
];

export default function RoofRepairPage() {
  const included = [
    'Leak diagnosis + targeted repair plan',
    'Flashing repairs at chimneys, valleys, and transitions',
    'Storm damage stabilization',
    'Shingle replacement (when applicable)',
    'Fast temporary protection when needed',
    'Clean worksite + clear next steps',
  ];

  const faqs = [
    {
      question: 'Can you fix an active leak quickly?',
      answer:
        'Yes. If you have active leaking, contact us — we prioritize stabilization and then confirm the permanent repair plan.',
    },
    {
      question: 'Do you repair flashing and chimneys?',
      answer:
        'Yes. Many leaks come from flashing, transitions, and penetrations. We focus on the details that stop leaks long-term.',
    },
    {
      question: 'Do you repair metal roofs?',
      answer:
        'Yes. We diagnose the cause and recommend the right fix — from fastener issues to flashing or transition detailing.',
    },
    {
      question: 'How do I know if I need repair or replacement?',
      answer:
        'We’ll inspect condition, problem areas, and system performance. If repair is viable, we’ll recommend it. If not, we’ll explain why.',
    },
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Roof Repair',
          description:
            'Roof repair services in Southern Maine for leaks, storm damage, flashing issues, and fast stabilization.',
          url: 'https://graniteshieldroofing.com/services/roof-repair',
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
            name: 'Roof Repair',
            url: 'https://graniteshieldroofing.com/services/roof-repair',
          },
        ]}
      />

      <FAQSchema faqs={faqs} />

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-14 sm:py-16 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-blue-600/90 px-4 py-2 text-sm font-semibold">
              Fast Stabilization • Clean Repair Plan
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Roof Repair in Southern Maine
            </h1>

            <p className="mt-4 text-lg text-slate-200">
              Leak diagnosis, storm damage repair, flashing fixes, and fast
              stabilization to protect your home. Owner-led accountability and
              clean workmanship.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild className="h-12 px-6">
                <Link href="/instant-quote">
                  Get Instant Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="default" size="lg" asChild className="h-12 px-6">
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

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Repairs That Actually Stop Leaks
              </h2>
              <p className="mt-4 text-slate-600">
                Many “repairs” fail because the real cause wasn’t addressed. We
                find the source, explain it clearly, and fix the vulnerable
                detail — not just the symptom.
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
                  Need Help Fast?
                </h3>
                <p className="mt-2 text-slate-600">
                  If you have active leaking or storm damage, call now — we’ll
                  help stabilize and plan the permanent fix.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="cta" asChild className="w-full sm:w-auto">
                    <Link href="/lp">
                      Book Inspection <ArrowRight className="ml-2 h-5 w-5" />
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Roof Repair FAQs
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
              <Link href="/lp">
                Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
