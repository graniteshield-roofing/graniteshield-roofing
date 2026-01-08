import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone, CheckCircle2, Clock, Shield, MapPin, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BUSINESS_CONFIG, SITE_URL } from '@/lib/business-config';
import { getServiceAreaNames } from '@/lib/towns-data';
import { WebPageSchema, FAQSchema, BreadcrumbSchema } from '@/components/schema-markup';
import { PeakVexWidget } from './components/PeakVexWidget';

export const metadata: Metadata = {
  title: `Instant Roof Quote in 60 Seconds | ${BUSINESS_CONFIG.name}`,
  description:
    'Get an instant roofing quote in 60 seconds from your home. No in-home sales pitch—accurate satellite-based measurements, transparent pricing, and quick verification. Available across Southern Maine.',
  alternates: {
    canonical: `${SITE_URL}/instant-quote`,
  },
  openGraph: {
    title: `Instant Roof Quote in 60 Seconds | ${BUSINESS_CONFIG.name}`,
    description:
      'Get an instant roofing quote in 60 seconds from your home. Accurate satellite measurements, transparent pricing, available across Southern Maine.',
    url: `${SITE_URL}/instant-quote`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Instant Roof Quote in 60 Seconds | ${BUSINESS_CONFIG.name}`,
    description:
      'Get an instant roofing quote in 60 seconds. No sales pitch—just accurate measurements and transparent pricing.',
  },
};

export default function InstantQuotePage() {
  const serviceAreas = getServiceAreaNames();

  const faqs = [
    {
      question: 'How accurate is the instant quote?',
      answer:
        'Our instant quote uses satellite imagery and advanced roof modeling to provide a preliminary estimate. The accuracy is typically within 10-15% for standard residential roofs. We confirm the exact measurements and scope during a quick on-site verification before finalizing your quote.',
    },
    {
      question: 'Is this a final price?',
      answer:
        'The instant quote is a preliminary estimate based on satellite measurements. We schedule a brief in-person verification to finalize the exact scope, materials, ventilation needs, decking condition, and any unique details. After verification, you'll receive a final, detailed quote with no surprises.',
    },
    {
      question: 'Do I have to schedule an appointment?',
      answer:
        'No appointment needed for the instant quote—get it right now from your home. If you decide to proceed, we schedule a quick on-site verification (typically 15-30 minutes) to finalize details before installation.',
    },
    {
      question: 'What if my roof is complex or has a steep pitch?',
      answer:
        'Our satellite measurement technology handles complex roof shapes, multiple levels, and steep pitches. During the on-site verification, we assess any unique conditions, access challenges, or specialized requirements that may affect the final scope and pricing.',
    },
    {
      question: 'What roofing materials are supported?',
      answer:
        'The instant quote works best for common residential roofing: asphalt shingles, standing seam metal roofing, and standard architectural shingle systems. We can quote metal, shingle, and composite materials. Final material selection is confirmed during verification based on your preferences and home requirements.',
    },
    {
      question: 'How long does the final verification take?',
      answer:
        'The on-site verification is quick—typically 15-30 minutes. We measure the roof, assess decking condition, check ventilation, evaluate access, and discuss material options. Within 24-48 hours, you receive a detailed final quote with everything included.',
    },
    {
      question: 'Do you offer financing?',
      answer:
        'Yes, we offer financing options for qualified homeowners. During the final verification, we can discuss financing plans that fit your budget. Contact us directly to learn more about available options.',
    },
    {
      question: 'Is my information safe?',
      answer:
        'Absolutely. We use secure, encrypted connections to protect your address and contact information. Your data is only used to provide your quote and follow up as requested. We never share your information with third parties.',
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Instant Quote', url: `${SITE_URL}/instant-quote` },
        ]}
      />
      <WebPageSchema
        name={`Instant Roof Quote in 60 Seconds | ${BUSINESS_CONFIG.name}`}
        description="Get an instant roofing quote in 60 seconds. Accurate satellite measurements, transparent pricing, available across Southern Maine."
        url={`${SITE_URL}/instant-quote`}
        mainEntity={{ '@type': 'LocalBusiness', '@id': `${SITE_URL}/#organization` }}
      />
      <FAQSchema faqs={faqs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 to-slate-800 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-blue-600 text-white border-0">
              No In-Home Sales Pitch • Fast & Accurate • Available Now
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Instant Roof Quote in{' '}
              <span className="text-blue-300">60 Seconds</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-6">
              Get a preliminary roofing estimate from the comfort of your home. We use
              accurate satellite-based roof measurements to provide transparent pricing—
              no long sales process, no pressure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="cta"
                size="lg"
                asChild
                className="h-12 sm:h-14"
              >
                <Link href="#peakvex-quote">
                  Get My Instant Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 sm:h-14 bg-transparent text-white border-white/70 hover:bg-white hover:text-slate-900"
              >
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Talk to a Roofing Expert
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust + Value Bullets */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'No in-home sales pitch',
                description: 'Get your quote instantly without scheduling an appointment or sitting through a sales presentation.',
              },
              {
                icon: MapPin,
                title: 'Accurate satellite-based measurements',
                description: 'Advanced satellite imagery and roof modeling provide precise measurements for your preliminary estimate.',
              },
              {
                icon: Zap,
                title: 'Fast, transparent pricing range',
                description: 'See your estimated cost range immediately—no hidden fees, no confusing calculations.',
              },
              {
                icon: Clock,
                title: 'Quick final verification',
                description: 'Schedule a brief 15-30 minute on-site visit to confirm details and finalize your exact quote.',
              },
              {
                icon: CheckCircle2,
                title: 'Best for common residential roofs',
                description: 'Works great for asphalt shingles, standing seam metal, and standard architectural shingle systems.',
              },
              {
                icon: Phone,
                title: 'Expert support available',
                description: 'Questions? Our team is ready to help you understand your quote and next steps.',
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              Three simple steps to get your roofing estimate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Enter your address',
                description:
                  'Simply enter your home address in the widget below. Our system locates your property and begins analysis.',
              },
              {
                step: '2',
                title: 'We generate measurements',
                description:
                  'We use satellite imagery and advanced roof modeling technology to measure your roof and calculate your estimate.',
              },
              {
                step: '3',
                title: 'Get your instant estimate',
                description:
                  'Receive your preliminary pricing range immediately. Then we schedule a quick on-site verification (15-30 minutes) to finalize scope, materials, ventilation, and decking details before installation.',
              },
            ].map((item, index) => (
              <Card key={index} className="border-slate-200">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Widget Section */}
      <section id="peakvex-quote" className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="border-slate-200 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              {/* PeakVex Widget - Script injected via client component */}
              <PeakVexWidget />

              {/* What Happens Next */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  What happens next?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  After you receive your instant estimate, we'll contact you to schedule a brief
                  in-home or on-site verification (typically 15-30 minutes) to finalize the exact
                  scope, materials, ventilation needs, decking condition, and any unique details.
                  This ensures your final quote is accurate and comprehensive with no surprises.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Local Signals */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Available Across Our Service Area
            </h2>
            <p className="text-slate-600 mb-6">
              Instant quotes are available for properties throughout Southern Maine, including
              {serviceAreas.slice(0, 8).map((area, i) => (
                <span key={area}>
                  {i > 0 && ', '}
                  {area}
                </span>
              ))}
              {serviceAreas.length > 8 && `, and ${serviceAreas.length - 8} more areas`}.
            </p>
            <p className="text-sm text-slate-500">
              Don't see your area listed?{' '}
              <a
                href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                className="text-blue-600 hover:underline font-medium"
              >
                Contact us
              </a>{' '}
              to confirm coverage.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about our instant quote process
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-slate-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
