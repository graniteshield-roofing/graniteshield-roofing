import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Phone, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import {
  BreadcrumbSchema,
  ReportSchema,
  FAQSchema,
} from '@/components/schema-markup';
import { ReportSummaryBox } from '@/components/report-summary-box';
import { LastUpdated } from '@/components/last-updated';
import { MethodologyBlock } from '@/components/methodology-block';

const SITE_URL = 'https://graniteshieldroofing.com';
const PAGE_URL = `${SITE_URL}/reports/maine-ice-dam-steaming-safety-specs`;
const DATE_PUBLISHED = '2025-01-01';
const DATE_MODIFIED = '2025-01-01';

export const metadata: Metadata = {
  title: `Maine Ice Dam Steaming Safety Specs | ${BUSINESS_CONFIG.name}`,
  description:
    'Technical specifications for safe ice dam steaming: low-pressure PSI ranges, surface protection practices, application criteria, and homeowner safety checklist.',
  alternates: {
    canonical: PAGE_URL,
  },
};

export default function IceDamSteamingSafetySpecsPage() {
  const faqs = [
    {
      question: 'Why is low-pressure steaming safer than other ice dam removal methods?',
      answer:
        'Low-pressure steam melts ice without the mechanical force that damages shingles, flashing, or roof structure. Unlike chipping, prying, or high-pressure washing, steam removes ice without creating new leak points.',
    },
    {
      question: 'Can steaming damage my roof?',
      answer:
        'When performed correctly with proper PSI ranges and technique, steaming is the safest ice dam removal method. Damage occurs when high-pressure equipment or improper technique is used—this is why PSI specs and operator training matter.',
    },
    {
      question: 'How long does ice dam steaming take?',
      answer:
        'A typical ice dam takes 1-3 hours to safely remove, depending on thickness and location. We prioritize creating drainage channels first to stop active leaking, then complete full removal.',
    },
    {
      question: 'Will the ice dam come back after steaming?',
      answer:
        "Steaming removes the symptom (ice), but doesn't fix the root cause (heat loss, ventilation, or insulation issues). We provide recommendations for long-term prevention during every ice dam service call.",
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Reports', url: `${SITE_URL}/reports` },
          {
            name: 'Maine Ice Dam Steaming Safety Specs',
            url: PAGE_URL,
          },
        ]}
      />

      <ReportSchema
        headline="Maine Ice Dam Steaming Safety Specs"
        description="Technical specifications and safety protocols for low-pressure ice dam steaming"
        datePublished={DATE_PUBLISHED}
        dateModified={DATE_MODIFIED}
        url={PAGE_URL}
        about={['Ice Dam Removal', 'Ice Dam Steaming', 'Roof Safety']}
        mentions={[
          'Low-Pressure Steam',
          'Ice Dams',
          'Maine Winter',
          'Roof Protection',
        ]}
      />

      <FAQSchema faqs={faqs} />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/reports"
              className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-4"
            >
              ← Back to Reports
            </Link>

            <div className="inline-flex items-center rounded-full bg-red-600/90 px-4 py-2 text-sm font-semibold mb-6">
              <Shield className="h-4 w-4 mr-2" />
              Safety & Technical Specs
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Maine Ice Dam Steaming Safety Specs
            </h1>

            <p className="text-xl text-slate-200 leading-relaxed">
              Technical specifications for safe, effective ice dam removal using
              low-pressure steam. Designed for homeowner reference and contractor
              accountability.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <LastUpdated
              date={DATE_MODIFIED}
              changeLog={[
                'Initial technical specifications published',
                'Based on manufacturer guidelines and field experience',
              ]}
            />
          </div>

          <div className="mb-12">
            <ReportSummaryBox
              title="Key Safety Specifications"
              stats={[
                {
                  label: 'Maximum Operating PSI',
                  value: '300–500 PSI',
                  description: 'Steam output pressure at nozzle',
                },
                {
                  label: 'Operating Temperature',
                  value: '280–320°F',
                  description: 'Steam temperature range',
                },
                {
                  label: 'Minimum Safe Distance',
                  value: '2–4 inches',
                  description: 'Nozzle to roof surface spacing',
                },
                {
                  label: 'Typical Flow Rate',
                  value: '2–4 GPM',
                  description: 'Water consumption during operation',
                },
                {
                  label: 'Surface Contact Time',
                  value: '3–8 seconds',
                  description: 'Per section before moving nozzle',
                },
                {
                  label: 'Operator Certification',
                  value: 'Required',
                  description: 'Equipment-specific training mandatory',
                },
              ]}
              note="These specifications are based on commercial low-pressure ice dam steaming equipment. High-pressure washers and DIY equipment do not meet these safety criteria and can cause severe roof damage."
            />
          </div>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              What Is Low-Pressure Ice Dam Steaming?
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-slate-700 leading-relaxed">
                Low-pressure ice dam steaming uses specialized equipment to
                generate high-temperature steam at controlled pressure levels
                (300–500 PSI). This melts ice dams safely without the mechanical
                force that damages shingles, underlayment, or flashing.
              </p>
              <p className="text-slate-700 leading-relaxed mt-4">
                <strong className="text-slate-900">
                  This is NOT the same as pressure washing.
                </strong>{' '}
                Pressure washers operate at 1,500–3,000+ PSI and can tear
                shingles, force water under underlayment, and create new leak
                points.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Technical Specifications
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 not-prose mb-12">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Equipment Requirements
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-1">
                        Steam Generator Type
                      </div>
                      <div className="text-slate-600 text-sm">
                        Commercial-grade, diesel or electric, continuous-duty rated
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-1">
                        Pressure Range
                      </div>
                      <div className="text-slate-600 text-sm">
                        300–500 PSI at nozzle (adjustable, monitored)
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-1">
                        Temperature Range
                      </div>
                      <div className="text-slate-600 text-sm">
                        280–320°F steam output
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-1">
                        Hose Length
                      </div>
                      <div className="text-slate-600 text-sm">
                        100–200 feet minimum for roof access
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-1">
                        Safety Features
                      </div>
                      <div className="text-slate-600 text-sm">
                        Pressure relief valve, temperature gauge, emergency shutoff
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Operator Safety Protocols
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-1">
                        Fall Protection
                      </div>
                      <div className="text-slate-600 text-sm">
                        Harness, anchor points, slip-resistant boots (pitched roofs)
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-1">
                        Personal Protective Equipment
                      </div>
                      <div className="text-slate-600 text-sm">
                        Insulated gloves, safety glasses, non-slip footwear
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-1">
                        Training Requirements
                      </div>
                      <div className="text-slate-600 text-sm">
                        Equipment-specific certification, roof safety training
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-1">
                        Weather Constraints
                      </div>
                      <div className="text-slate-600 text-sm">
                        No work during active storms, high winds (&gt;25 mph), or icy conditions
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Surface Protection Practices
            </h2>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <h4 className="font-semibold text-slate-900 mb-4">
                How We Protect Your Roof During Steaming
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm mb-1">
                        Controlled Nozzle Distance
                      </div>
                      <div className="text-slate-600 text-sm">
                        Maintain 2–4 inches from surface to prevent concentrated
                        force on shingles or flashing
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm mb-1">
                        Sweeping Motion Technique
                      </div>
                      <div className="text-slate-600 text-sm">
                        Continuous lateral movement prevents heat concentration and
                        surface stress
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm mb-1">
                        Flashing Awareness
                      </div>
                      <div className="text-slate-600 text-sm">
                        Reduced pressure near chimneys, vents, valleys where metal
                        flashing can conduct heat
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm mb-1">
                        Drainage Channel Priority
                      </div>
                      <div className="text-slate-600 text-sm">
                        Cut channels through ice first to relieve water backup, then
                        widen progressively
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm mb-1">
                        Visual Inspection During Work
                      </div>
                      <div className="text-slate-600 text-sm">
                        Continuous assessment for granule loss, shingle lifting, or
                        underlayment exposure
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm mb-1">
                        Debris Management
                      </div>
                      <div className="text-slate-600 text-sm">
                        Clear ice chunks away from gutters and downspouts to prevent
                        re-freezing blockages
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              When Steaming Is Appropriate
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 not-prose mb-8">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Good Candidates for Steaming
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Active leak from ice dam backup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Ice thickness &gt; 2 inches along eaves</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Water pooling visible behind ice barrier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Asphalt shingle or metal roof in good condition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Safe roof access available</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    When NOT to Use Steaming
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Roof structure compromised (sagging, visible damage)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Brittle or very old shingles prone to cracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Active storm or unsafe weather conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Minimal ice buildup (&lt; 1 inch, no leak risk)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Flat roof or unconventional roofing system</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mb-12">
              <MethodologyBlock
                title="Homeowner Safety Checklist"
                sections={[
                  {
                    heading: 'Before You Hire a Contractor',
                    content: [
                      'Ask what PSI range their equipment operates at (should be 300-500 PSI)',
                      'Verify they carry liability insurance and workers comp',
                      'Request operator certifications or training documentation',
                      'Confirm they inspect for roof damage during and after work',
                      'Get a clear explanation of their drainage channel strategy',
                    ],
                  },
                  {
                    heading: 'During the Work',
                    content: [
                      'Verify operators are using fall protection on pitched roofs',
                      'Watch for sweeping motion (not static steam application)',
                      'Ensure they maintain safe distance from roof surface',
                      'Ask questions if you see aggressive chipping or prying',
                      'Confirm they clear debris from gutters after ice removal',
                    ],
                  },
                  {
                    heading: 'After Ice Dam Removal',
                    content: [
                      'Request a post-work roof inspection summary',
                      'Document any damage observed (photos, notes)',
                      'Ask for prevention recommendations (ventilation, insulation)',
                      'Schedule follow-up if leaks continue after ice removal',
                      'Consider long-term solutions to prevent repeat ice dams',
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 mb-12">
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

          <Card className="bg-gradient-to-br from-red-50 to-slate-50 border-red-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Need Ice Dam Removal in Southern Maine?
              </h3>
              <p className="text-slate-600 mb-6">
                GraniteShield uses commercial low-pressure steam equipment and
                certified operators. We follow these safety specs on every ice dam
                removal job—and we'll explain exactly what we're doing and why.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="cta" size="lg" asChild>
                  <Link href="/services/ice-dam-removal">
                    Ice Dam Removal Service <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Emergency: {BUSINESS_CONFIG.contact.phone}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
