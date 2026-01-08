import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Phone, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import {
  ServiceSchema,
  BreadcrumbSchema,
  FAQSchema,
} from '@/components/schema-markup';

export const metadata: Metadata = {
  title: `Roof Replacement in Southern Maine | ${BUSINESS_CONFIG.name}`,
  description:
    'Complete roof replacement built for Maine weather—ice & water protection, ventilation, flashing, and clean installs. Owner-operated quality across Southern Maine.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/services/roof-replacement',
  },
};

const SERVICE_AREAS = [
  'Portland', 'Scarborough', 'South Portland', 'Westbrook', 'Cape Elizabeth',
  'Falmouth', 'Yarmouth', 'Biddeford', 'Saco', 'Auburn', 'Turner',
];

export default function RoofReplacementPage() {
  const included = [
    'Tear-off and disposal (as needed)',
    'Roof deck inspection + minor repairs when required',
    'Ice & water protection at vulnerable areas',
    'Synthetic underlayment + starter strip (where specified)',
    'New flashing at chimneys, valleys, and transitions',
    'Ridge vent ventilation (when applicable)',
    'Magnetic nail sweep + thorough cleanup',
    'Final walkthrough + clear next steps',
  ];

  const faqs = [
    {
      question: 'How long does a roof replacement take?',
      answer:
        'Most roof replacements are completed in a few days depending on roof size, pitch, access, weather, and any decking work required. We\'ll confirm timeline after the inspection.',
    },
    {
      question: 'What\'s included in your roof replacement service?',
      answer:
        'A full system approach: protection at vulnerable areas, quality underlayment, correct flashing details, ventilation considerations, and a clean install with full cleanup. Exact scope is confirmed during inspection.',
    },
    {
      question: 'What makes a roof system "built for Maine weather"?',
      answer:
        'The difference is in the details: ice & water protection, proper underlayment, correct flashing, and ventilation planning to reduce moisture issues and prevent leaks during freeze-thaw cycles.',
    },
    {
      question: 'Do you handle storm damage?',
      answer:
        'Yes. If your roof has storm-related damage, we can document what we see and provide a clear plan for repairs or replacement.',
    },
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Roof Replacement',
          description:
            'Complete roof replacement services built for Maine weather with a system-level approach: protection, underlayment, flashing, ventilation, and clean installs.',
          url: 'https://graniteshieldroofing.com/services/roof-replacement',
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://graniteshieldroofing.com' },
          { name: 'Services', url: 'https://graniteshieldroofing.com/services' },
          { name: 'Roof Replacement', url: 'https://graniteshieldroofing.com/services/roof-replacement' },
        ]}
      />
      <FAQSchema faqs={faqs} />

      {/* HERO */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-14 sm:py-16 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-blue-600/90 px-4 py-2 text-sm font-semibold">
              Owner-Operated Quality • Southern Maine
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Roof Replacement in Southern Maine
            </h1>
            <p className="mt-4 text-lg text-slate-200">
              Complete roof replacement built for Maine weather: ice &amp; water
              protection, underlayment, flashing details, ventilation (when
              applicable), and clean installs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild className="h-12 px-6">
                <Link href="/instant-quote">
                  Get Instant Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="default" size="lg" asChild className="h-12 px-6">
                <Link href="/lp">
                  Schedule Free Inspection{' '}
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

      {/* INCLUDED + TRUST */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Premium Materials, Expert Installation
              </h2>
              <p className="mt-4 text-slate-600">
                Your roof is a system — not just shingles. We focus on the
                details that prevent leaks over time: water management at
                transitions, clean flashing, and correct installation for
                Maine&apos;s freeze-thaw cycles.
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
              <p className="mt-4 text-sm text-slate-500">
                Final scope depends on roof condition, layers, pitch, access,
                and ventilation needs—your estimate will list everything
                clearly.
              </p>
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  Schedule a Free Inspection
                </h3>
                <p className="mt-2 text-slate-600">
                  We&apos;ll assess condition, explain options, and give you a clear
                  plan — without pressure.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="default" asChild className="w-full sm:w-auto">
                    <Link href="/lp">
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

      {/* COST REPORT CALLOUT (NEW) */}
      <section className="py-12 bg-blue-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-blue-200 p-8 shadow-sm flex flex-col md:flex-row items-start gap-6">
            <div className="p-3 bg-blue-100 rounded-lg shrink-0">
               <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                How Much Does a Roof Cost in Maine?
              </h3>
              <p className="text-slate-600 mb-4">
                View our Winter 2025 Maine Roofing Cost Report with real data from completed projects.
              </p>
              <Link href="/reports/maine-roofing-cost-report-winter-2025" className="inline-flex items-center text-blue-700 font-bold hover:underline">
                Read the Cost Report <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Roof Replacement FAQs
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
            <Button variant="default" size="lg" asChild>
              <Link href="/lp">
                Schedule Free Inspection <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}