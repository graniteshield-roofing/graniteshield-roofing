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
  title: `Standing Seam Metal Roofing in Southern Maine | ${BUSINESS_CONFIG.name}`,
  description:
    'Standing seam metal roofing in Southern Maine built for snow load, wind, and coastal exposure. Clean detailing, proper transitions, and owner-led installs.',
  alternates: {
    canonical:
      'https://graniteshieldroofing.com/services/standing-seam-metal-roofing',
  },
};

const SERVICE_AREAS = [
  'Cumberland Center',
  'Portland',
  'Falmouth',
  'Yarmouth',
  'Freeport',
  'Scarborough',
  'Cape Elizabeth',
  'South Portland',
  'Westbrook',
];

export default function StandingSeamMetalRoofingPage() {
  const included = [
    'System-first planning for Maine weather exposure',
    'Underlayment + ice & water strategy (as needed)',
    'Clean transitions at walls, chimneys, and valleys',
    'Ventilation considerations (when applicable)',
    'Tight detailing + clean finish work',
    'Cleanup + final walkthrough',
  ];

  const faqs = [
    {
      question: 'Is standing seam metal roofing good for Maine?',
      answer:
        'Yes. Standing seam is highly durable and performs well with Maine snow, wind, and freeze-thaw cycles when detailed correctly at transitions and flashing points.',
    },
    {
      question: 'Do you install metal roofs in coastal towns?',
      answer:
        'Yes. Coastal exposure requires careful detailing for wind-driven rain and long-term performance. We build systems designed for Maine conditions.',
    },
    {
      question: 'How long does a standing seam roof last?',
      answer:
        'Metal systems can last for decades. Longevity depends on material, installation quality, and detailing at transitions and penetrations.',
    },
    {
      question: 'Do you install over existing shingles?',
      answer:
        'Sometimes. It depends on roof condition, layers, code requirements, and system design. We’ll recommend the safest long-term option after inspection.',
    },
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Standing Seam Metal Roofing',
          description:
            'Standing seam metal roofing services in Southern Maine built for snow, wind, and long-term performance with clean detailing and owner-led accountability.',
          url: 'https://graniteshieldroofing.com/services/standing-seam-metal-roofing',
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
            name: 'Standing Seam Metal Roofing',
            url: 'https://graniteshieldroofing.com/services/standing-seam-metal-roofing',
          },
        ]}
      />

      <FAQSchema faqs={faqs} />

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-14 sm:py-16 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-blue-600/90 px-4 py-2 text-sm font-semibold">
              Premium Metal Roofing • Built for Maine Weather
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Standing Seam Metal Roofing in Southern Maine
            </h1>

            <p className="mt-4 text-lg text-slate-200">
              Long-life metal roof systems engineered for Maine snow, wind, and
              coastal exposure — with clean transitions, correct flashing, and
              owner-led accountability.
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
                System-Level Detailing Matters
              </h2>
              <p className="mt-4 text-slate-600">
                Metal roofing is only as good as the detailing at transitions —
                walls, chimneys, valleys, and penetrations. We build the system,
                not just the panels.
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Standing Seam Metal Roofing FAQs
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
