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
import { RelatedServices } from '@/components/related-services';


export const metadata: Metadata = {
  title: `24/7 Emergency Roof Repair in Southern Maine | ${BUSINESS_CONFIG.name}`,
  description:
    '24/7 emergency roof repair for storm damage and active leaks across Southern Maine. Same-day response, emergency tarping, and photo documentation to minimize home damage.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/services/emergency-repair',
  },
  openGraph: {
    title: `24/7 Emergency Roof Repair in Southern Maine | ${BUSINESS_CONFIG.name}`,
    description:
      '24/7 emergency roof repair for storm damage and active leaks across Southern Maine. Same-day response, emergency tarping, and photo documentation to minimize home damage.',
    url: 'https://graniteshieldroofing.com/services/emergency-repair',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EmergencyRepairPage() {
  const emergencyServices = [
    'Emergency Tarping & Protection',
    'Storm Damage Assessment',
    'Active Leak Repair',
    'Wind Damage Repair',
    'Fallen Tree Removal Support',
    'Insurance Documentation',
    'Temporary Weatherproofing',
    'Immediate Water Intrusion Control',
  ];

  const faqs = [
    {
      question: 'How quickly can you respond to emergencies?',
      answer:
        'GraniteShield Roofing prioritizes emergency calls for active leaks and storm damage. We provide same-day response throughout Southern Maine whenever possible to help minimize water intrusion and interior damage.',
    },
    {
      question: 'Do you work with insurance for emergency repairs?',
      answer:
        'Yes. We document damage with photos and clear notes to support your insurance claim. We can provide the documentation you need and help you understand next steps during the claims process.',
    },
    {
      question: 'What qualifies as a roofing emergency?',
      answer:
        'Active water leaks, storm damage exposing the interior, large missing shingle sections, structural damage, or any situation where your home is vulnerable to weather should be treated as an emergency. When in doubt, call us.',
    },
  ];

  // Light geo relevance (not spammy)
  const serviceAreas = [
    'Scarborough',
    'Portland',
    'South Portland',
    'Westbrook',
    'Cape Elizabeth',
    'Falmouth',
    'Yarmouth',
    'Biddeford',
    'Saco',
    'Old Orchard Beach',
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Emergency Roof Repair',
          description:
            '24/7 emergency roofing services for storm damage, active leaks, and urgent repairs throughout Southern Maine. Immediate response to minimize damage.',
          url: 'https://graniteshieldroofing.com/services/emergency-repair',
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
            name: 'Emergency Roof Repair',
            url: 'https://graniteshieldroofing.com/services/emergency-repair',
          },
        ]}
      />

      <FAQSchema faqs={faqs} />

      {/* HERO */}
      <section className="bg-gradient-to-br from-red-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap className="h-4 w-4" />
              24/7 Emergency Service
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Emergency Roof Repair Services in Southern Maine
            </h1>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 mb-8">
              <p className="text-lg leading-relaxed">
                When disaster strikes, GraniteShield Roofing responds fast. We
                provide emergency roof repair for storm damage and active leaks
                to help protect your home and reduce interior damage.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: {BUSINESS_CONFIG.contact.phone}
                </a>
              </Button>

              {/* FIX: send to the actual estimate form */}
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
                asChild
              >
                <Link href="/lp/free-roof-estimate">
                  Request Emergency Service{' '}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* QUICK LOCAL SIGNAL */}
            <div className="mt-8 text-sm text-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4" />
                <span className="font-semibold">Serving:</span>
              </div>
              <p className="leading-relaxed">
                {serviceAreas.join(', ')} and surrounding Southern Maine towns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Immediate Response When You Need It Most
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Roof emergencies don’t wait for business hours. Whether it’s
                storm damage, an active leak, or sudden exposure, we respond
                quickly to protect your home and prevent further damage.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="h-10 w-10 text-red-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-slate-900">
                      24/7
                    </div>
                    <div className="text-sm text-slate-600">
                      Always Available
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Zap className="h-10 w-10 text-red-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-slate-900">
                      Same-Day
                    </div>
                    <div className="text-sm text-slate-600">
                      Emergency Response
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* NEW: helpful checklist = better UX + SEO */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">
                  What to do right now (before we arrive)
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                    Move valuables away from leak areas and place
                    buckets/towels.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                    Take a few photos inside/outside (only if safe) for
                    documentation.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                    Avoid climbing on the roof—wet surfaces and wind are
                    dangerous.
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Don’t Wait — Call Immediately
                    </h3>
                    <p className="text-slate-700 text-sm">
                      Every minute counts when water is entering your home.
                      Emergency tarping and temporary protection can prevent
                      major interior damage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Emergency Services We Provide
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {emergencyServices.map((service) => (
                  <div
                    key={service}
                    className="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-slate-800 font-medium">
                      {service}
                    </span>
                  </div>
                ))}
              </div>

              {/* NEW: second CTA near the list */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button className="bg-red-600 hover:bg-red-700" asChild>
                  <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call {BUSINESS_CONFIG.contact.phone}
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/lp/free-roof-estimate">
                    Request Help Online <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMON EMERGENCIES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Common Roofing Emergencies We Handle
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We help homeowners across Southern Maine stabilize urgent roof
              issues and plan the correct next repair.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <AlertTriangle className="h-10 w-10 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Active Leaks
                </h3>
                <p className="text-slate-600 text-sm">
                  Water entering your home requires immediate action to reduce
                  interior damage and mold risk.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Zap className="h-10 w-10 text-orange-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Storm Damage
                </h3>
                <p className="text-slate-600 text-sm">
                  Wind and debris can compromise your roof quickly—temporary
                  protection helps prevent escalation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Shield className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Missing Shingles
                </h3>
                <p className="text-slate-600 text-sm">
                  Missing areas expose underlayment and can lead to leaks during
                  rain or snow melt.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Clock className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Structural Issues
                </h3>
                <p className="text-slate-600 text-sm">
                  Sagging, holes, or visible structural damage should be
                  assessed immediately for safety.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* RESPONSE PROCESS CALLOUT */}
      <section className="py-12 bg-blue-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="border-blue-200 bg-white">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Understanding Our Emergency Response Process
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Learn about our winter emergency response workflow, triage
                    criteria, and realistic response times for different types of
                    roofing emergencies in Southern Maine.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/reports/maine-winter-roofing-response-times-and-process">
                      View Response Process <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ RENDER */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Emergency? Call Right Now
          </h2>
          <p className="text-xl mb-8">
            Don’t wait when your home is at risk. We’re available 24/7 to help
            stabilize storm damage and active leaks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-slate-100 text-lg h-14 px-8"
              asChild
            >
              <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                <Phone className="mr-2 h-5 w-5" />
                Emergency: {BUSINESS_CONFIG.contact.phone}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-red-600"
              asChild
            >
              <Link href="/lp/free-roof-estimate">
                Request Help Online <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
