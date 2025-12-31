import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Phone, MapPin, Zap, Clock, AlertTriangle, Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import {
  ServiceSchema,
  BreadcrumbSchema,
  FAQSchema,
} from '@/components/schema-markup';

export const metadata: Metadata = {
  title: `Ice Dam Removal in Southern Maine | ${BUSINESS_CONFIG.name}`,
  description:
    'Ice dam removal in Southern Maine with safe stabilization and guidance to prevent repeat issues: ventilation, insulation, and vulnerable detail protection.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/services/ice-dam-removal',
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

export default function IceDamRemovalPage() {
  const included = [
    'Ice dam assessment + leak-risk stabilization',
    'Safe removal approach guidance (based on conditions)',
    'Vulnerable areas + flashing detail review',
    'Recommendations to reduce repeat icing (ventilation/insulation)',
    'Clear next steps if repairs are needed',
  ];

  const faqs = [
    {
      question: 'Why do ice dams happen?',
      answer:
        'Ice dams often result from heat loss, snow melt/refreeze cycles, and poor ventilation or insulation patterns. Water backs up and can enter vulnerable areas.',
    },
    {
      question: 'Can ice dams cause leaks?',
      answer:
        'Yes. Ice dams can force water under shingles or into transitions, leading to interior leaks and damage.',
    },
    {
      question: 'How do you prevent ice dams long-term?',
      answer:
        'Prevention typically involves better ventilation (when applicable), insulation improvements, and protecting vulnerable roof areas with the right underlayment strategy.',
    },
    {
      question: 'Do you repair damage after ice dams?',
      answer:
        'Yes. If ice dams cause leaks or damage, we can assess, repair, and recommend the best next steps.',
    },
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Ice Dam Removal',
          description:
            'Ice dam removal and stabilization in Southern Maine with prevention guidance and repair planning for long-term performance.',
          url: 'https://graniteshieldroofing.com/services/ice-dam-removal',
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
            name: 'Ice Dam Removal',
            url: 'https://graniteshieldroofing.com/services/ice-dam-removal',
          },
        ]}
      />

      <FAQSchema faqs={faqs} />

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-14 sm:py-16 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-blue-600/90 px-4 py-2 text-sm font-semibold">
              Winter Leak Protection • Maine Conditions
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Ice Dam Removal in Southern Maine
            </h1>

            <p className="mt-4 text-lg text-slate-200">
              Ice dams can cause water to back up into vulnerable roof areas. We
              help stabilize the risk, assess damage, and recommend prevention
              steps so it doesn’t keep happening.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild className="h-12 px-6">
                <Link href="/lp/free-roof-estimate">
                  Request Help <ArrowRight className="ml-2 h-5 w-5" />
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
                  Call Now
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
                What We Focus On
              </h2>
              <p className="mt-4 text-slate-600">
                Ice dams are a system problem. We look at the conditions that
                caused them and what’s needed to reduce repeat events.
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
                  Stop the Damage
                </h3>
                <p className="mt-2 text-slate-600">
                  If you’re seeing leaks or heavy icing, reach out now — we’ll
                  help stabilize the situation and plan the fix.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="cta" asChild className="w-full sm:w-auto">
                    <Link href="/lp/free-roof-estimate">
                      Request Help <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* RELATED RESOURCES */}
      <section className="py-12 bg-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Ice Dam Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-blue-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Ice Dam Steaming Safety Specs
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">
                      Technical specifications for safe ice dam removal: PSI
                      ranges, surface protection, and homeowner safety checklist.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/reports/maine-ice-dam-steaming-safety-specs">
                        View Technical Specs <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Ice Dam Problem Guide
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">
                      Learn about ice dam causes, prevention methods, and what
                      makes them particularly problematic in Maine.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/problems/ice-dams">
                        Read Problem Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Ice Dam FAQs
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
                Request Help <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
