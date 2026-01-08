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
  title: `Roof Inspection in Southern Maine | ${BUSINESS_CONFIG.name}`,
  description:
    'Professional roof inspections in Southern Maine for leaks, storm damage, aging shingles, and metal roof system checks. Clear findings + next steps.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/services/roof-inspection',
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

export default function RoofInspectionPage() {
  const included = [
    'Roof surface + problem-area inspection',
    'Flashing/transition checks (chimneys, valleys, walls)',
    'Ventilation review (when applicable)',
    'Leak-risk assessment (most common failure points)',
    'Photos + straightforward recommendations',
    'Clear next steps (repair vs replacement guidance)',
  ];

  const faqs = [
    {
      question: 'What do you look for during a roof inspection?',
      answer:
        'We check vulnerable details first: flashing, transitions, penetrations, ventilation (when applicable), and common leak points. Then we evaluate overall condition and explain your best next step.',
    },
    {
      question: 'Do you provide photos or documentation?',
      answer:
        'Yes. When helpful, we document findings with photos and outline recommended actions clearly.',
    },
    {
      question: 'How do I know if I need repair or replacement?',
      answer:
        'We’ll tell you honestly. If repair is the right move, we’ll recommend it. If the system is near end-of-life, we’ll explain why replacement is the smarter long-term decision.',
    },
    {
      question: 'Do you inspect metal roofs too?',
      answer:
        'Yes. We inspect metal roof transitions, fasteners (if applicable), flashing, and details that affect long-term performance.',
    },
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Roof Inspection',
          description:
            'Roof inspections in Southern Maine for leak diagnosis, storm damage, aging roof systems, and next-step recommendations.',
          url: 'https://graniteshieldroofing.com/services/roof-inspection',
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
            name: 'Roof Inspection',
            url: 'https://graniteshieldroofing.com/services/roof-inspection',
          },
        ]}
      />

      <FAQSchema faqs={faqs} />

      {/* HERO */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-14 sm:py-16 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-blue-600/90 px-4 py-2 text-sm font-semibold">
              Clear Findings • No Pressure • Southern Maine
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Roof Inspection in Southern Maine
            </h1>

            <p className="mt-4 text-lg text-slate-200">
              If you’re seeing leaks, missing shingles, storm damage, or you’re
              unsure about roof condition — we’ll inspect the system, show you
              what matters, and give you a clear next step.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild className="h-12 px-6">
                <Link href="/instant-quote">
                  Get Instant Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="default" size="lg" asChild className="h-12 px-6">
                <Link href="/lp/free-roof-estimate">
                  Request Inspection <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* INCLUDED + CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                What’s Included
              </h2>
              <p className="mt-4 text-slate-600">
                We focus on system performance — not vague opinions. You’ll get
                a clear explanation of what’s happening and what to do next.
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
                  Get Clarity Fast
                </h3>
                <p className="mt-2 text-slate-600">
                  Tell us what’s going on — we’ll route you to the right
                  solution quickly.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="cta" asChild className="w-full sm:w-auto">
                    <Link href="/lp/free-roof-estimate">
                      Request Inspection <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Roof Inspection FAQs
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
                Request Inspection <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
