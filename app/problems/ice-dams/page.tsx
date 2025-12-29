import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Phone, AlertTriangle, CheckCircle2, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS_CONFIG } from "@/lib/business-config";
import { BreadcrumbSchema, FAQSchema } from "@/components/schema-markup";

export const metadata: Metadata = {
  title: `Ice Dam Problems in Maine | Prevention & Removal | ${BUSINESS_CONFIG.name}`,
  description: "Expert guide to Maine ice dam problems. Learn causes, prevention, safe removal methods from experienced roofing professionals. Emergency service available.",
};

export default function IceDamsPage() {
  const causes = [
    "Heat escaping through inadequate attic insulation",
    "Poor attic ventilation trapping warm air",
    "Roof valleys and lower-pitch sections",
    "North-facing roof slopes with less sun exposure",
    "Clogged gutters preventing drainage",
  ];

  const prevention = [
    "Proper attic insulation (R-60 recommended for Maine)",
    "Ridge vent and soffit ventilation systems",
    "Ice and water shield at roof eaves",
    "Heat cable installation in vulnerable areas",
    "Regular gutter cleaning before winter",
    "Professional roof inspection annually",
  ];

  const faqs = [
    {
      question: "What causes ice dams on Maine roofs?",
      answer: "Ice dams form when heat escaping through the roof melts snow, which refreezes at cold eaves creating ice barriers. This prevents proper drainage, forcing water under shingles and into your home. Maine's heavy snowfall and temperature fluctuations make ice dams particularly problematic."
    },
    {
      question: "How do I safely remove ice dams?",
      answer: "Never use hammers, axes, or roof rakes which can damage shingles. Professional steam removal is the safest method. GraniteShield uses specialized low-pressure steam equipment that melts ice without roof damage. Emergency service available throughout winter."
    },
    {
      question: "Can ice dams be prevented?",
      answer: "Yes, proper prevention includes adequate attic insulation, ventilation, and ice & water shield installation. During roof replacement, we install comprehensive ice dam prevention systems. Heat cables provide additional protection for vulnerable areas."
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://graniteshieldroofing.com" },
          { name: "Problems", url: "https://graniteshieldroofing.com/problems" },
          { name: "Ice Dams", url: "https://graniteshieldroofing.com/problems/ice-dams" },
        ]}
      />
      <FAQSchema faqs={faqs} />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Snowflake className="h-4 w-4 mr-2" />
              Maine Winter Problem
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Ice Dam Problems in Maine
            </h1>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 mb-8">
              <p className="text-lg leading-relaxed">
                Ice dams cause significant water damage to Maine homes every winter.
                Understanding causes, prevention, and safe removal methods protects your home and saves thousands in repair costs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/lp">
                  Schedule Inspection <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900" asChild>
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency Service
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                What Are Ice Dams?
              </h2>

              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Ice dams are ridges of ice that form at roof edges, preventing melting snow from
                draining properly. As water backs up behind the dam, it seeps under shingles,
                through the roof deck, and into your home causing:
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3 text-slate-700">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Interior water damage and staining</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Mold and mildew growth in attics</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Insulation damage reducing efficiency</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Gutter and downspout damage</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-700">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Thousands in repair costs if untreated</span>
                </div>
              </div>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Emergency Ice Dam Removal
                  </h3>
                  <p className="text-slate-700 text-sm mb-4">
                    Active leak or visible ice dam? Call now for same-day emergency service.
                    We use professional steam removal equipment that&apos;s safe for your roof.
                  </p>
                  <Button asChild className="w-full">
                    <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      Emergency: {BUSINESS_CONFIG.contact.phone}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Common Causes in Maine
                </h3>

                <div className="space-y-3">
                  {causes.map((cause) => (
                    <div key={cause} className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Prevention Methods
                </h3>

                <div className="space-y-3">
                  {prevention.map((method) => (
                    <div key={method} className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Ice Dam Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Protect Your Maine Home This Winter
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Schedule a pre-winter inspection to identify vulnerabilities and install prevention systems
            before ice dams form. Emergency removal available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/lp">
                Schedule Inspection <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                <Phone className="mr-2 h-5 w-5" />
                Call for Emergency
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
