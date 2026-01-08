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
  title: `Roof Maintenance in Southern Maine | ${BUSINESS_CONFIG.name}`,
  description:
    'Roof maintenance in Southern Maine to reduce leak risk, extend roof life, and catch small problems early. Clean, system-focused care.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/services/roof-maintenance',
  },
};

const SERVICE_AREAS = [
  'Portland',
  'Scarborough',
  'South Portland',
  'Westbrook',
  'Falmouth',
  'Yarmouth',
];

export default function RoofMaintenancePage() {
  const included = [
    'Vulnerable area checks (flashing, transitions, penetrations)',
    'Fastener/edge detailing review (as applicable)',
    'Gutter/flow problem spotting (where relevant)',
    'Small repairs noted before they become big repairs',
    'Clear recommendations + priorities',
  ];

  const faqs = [
    {
      question: 'Is roof maintenance worth it?',
      answer:
        'Yes — catching issues early often prevents water damage and larger repairs later. Maintenance is about reducing risk and extending roof life.',
    },
    {
      question: 'How often should a roof be checked?',
      answer:
        'Typically once per year and after major storms. We’ll recommend a schedule based on your roof type and exposure.',
    },
    {
      question: 'Do you maintain metal roofs too?',
      answer:
        'Yes. Metal roofs still depend on transitions, flashing, and details. We inspect those system points and recommend any needed adjustments.',
    },
    {
      question: 'Will you try to sell me a replacement?',
      answer:
        'No. If maintenance or repair is the right move, we’ll recommend it. If replacement is truly necessary, we’ll explain why clearly.',
    },
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Roof Maintenance',
          description:
            'Roof maintenance in Southern Maine to reduce leak risk, extend roof life, and catch small problems early with system-focused checks.',
          url: 'https://graniteshieldroofing.com/services/roof-maintenance',
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
            name: 'Roof Maintenance',
            url: 'https://graniteshieldroofing.com/services/roof-maintenance',
          },
        ]}
      />

      <FAQSchema faqs={faqs} />

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-14 sm:py-16 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-blue-600/90 px-4 py-2 text-sm font-semibold">
              Reduce Leak Risk • Extend Roof Life
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Roof Maintenance in Southern Maine
            </h1>

            <p className="mt-4 text-lg text-slate-200">
              Maintenance is the easiest way to protect your home: identify weak
              points, fix small issues early, and keep your roof system
              performing through Maine weather.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild className="h-12 px-6">
                <Link href="/instant-quote">
                  Get Instant Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="default" size="lg" asChild className="h-12 px-6">
                <Link href="/lp/free-roof-estimate">
                  Request Maintenance Check{' '}
                  <ArrowRight className="ml-2 h-5 w-5" />
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
                What’s Included
              </h2>
              <p className="mt-4 text-slate-600">
                We focus on the system points where roofs actually fail:
                transitions, flashing, penetrations, and edge details.
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
                  Keep It Simple
                </h3>
                <p className="mt-2 text-slate-600">
                  Book a check-up. We’ll show you what matters and prioritize
                  fixes (if any) with zero fluff.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="cta" asChild className="w-full sm:w-auto">
                    <Link href="/lp/free-roof-estimate">
                      Book Now <ArrowRight className="ml-2 h-5 w-5" />
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
            Roof Maintenance FAQs
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
                Request Maintenance Check{' '}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
