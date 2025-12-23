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
  title: `Metal Siding in Southern Maine | ${BUSINESS_CONFIG.name}`,
  description:
    'Metal siding installation in Southern Maine with clean moisture management, tight trim lines, and durable performance for Maine weather.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/services/metal-siding',
  },
};

const SERVICE_AREAS = [
  'Portland',
  'Scarborough',
  'Falmouth',
  'Yarmouth',
  'Freeport',
  'South Portland',
  'Westbrook',
];

export default function MetalSidingPage() {
  const included = [
    'Moisture management planning (housewrap + transitions)',
    'Straight, clean trim lines and proper detailing',
    'Durable metal profiles designed for wind exposure',
    'Window/door integration done correctly',
    'Cleanup + final walkthrough',
  ];

  const faqs = [
    {
      question: 'Is metal siding good for Maine weather?',
      answer:
        'Yes. With proper moisture management and correct detailing around openings and transitions, metal siding is highly durable in Maine conditions.',
    },
    {
      question: 'Does siding performance depend on what’s underneath?',
      answer:
        'Absolutely. Housewrap, flashings, and how details are tied together matter as much as the siding itself.',
    },
    {
      question: 'Can you match trim and corners cleanly?',
      answer:
        'Yes. We focus on crisp lines, clean corners, and proper integration so the finished exterior looks intentional—not pieced together.',
    },
    {
      question: 'Do you also handle roofing and windows?',
      answer:
        'Yes. We do full exteriors, which helps keep the system tight when multiple components are involved.',
    },
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Metal Siding',
          description:
            'Metal siding installation in Southern Maine with clean moisture management, tight trim lines, and durable performance.',
          url: 'https://graniteshieldroofing.com/services/metal-siding',
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
            name: 'Metal Siding',
            url: 'https://graniteshieldroofing.com/services/metal-siding',
          },
        ]}
      />

      <FAQSchema faqs={faqs} />

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-14 sm:py-16 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-blue-600/90 px-4 py-2 text-sm font-semibold">
              Durable Exteriors • Clean Detail Work
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Metal Siding in Southern Maine
            </h1>

            <p className="mt-4 text-lg text-slate-200">
              Metal siding built for wind and weather — with proper moisture
              management, crisp trim lines, and clean integration around windows
              and doors.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild className="h-12 px-6">
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

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                A Clean Exterior System
              </h2>
              <p className="mt-4 text-slate-600">
                Great siding installs rely on the “invisible” parts: housewrap,
                flashing, and tight transitions. We build it like a system so it
                performs for years.
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
                  Tell us what you’re replacing and what matters most
                  (durability, curb appeal, maintenance) — we’ll guide you fast.
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Metal Siding FAQs
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
