import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Phone, MapPin, Droplets, Wind, Wrench, AlertTriangle, Shield, Search, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import {
  ServiceSchema,
  BreadcrumbSchema,
  FAQSchema,
} from '@/components/schema-markup';

export const metadata: Metadata = {
  title: `Roof Repair Portland Maine | Leak Repair & Storm Damage | ${BUSINESS_CONFIG.name}`,
  description:
    'Professional roof repair in Southern Maine. Leak diagnosis, flashing repair, storm damage, and shingle replacement. Honest guidance on repair vs. replacement. Real cost ranges.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/services/roof-repair',
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

export default function RoofRepairPage() {
  const commonProblems = [
    {
      title: 'Missing or Blown-Off Shingles',
      description: 'Wind damage that exposes underlayment or roof deck',
      icon: Wind,
    },
    {
      title: 'Chimney Flashing Leaks',
      description: 'Water entering where chimney meets roofline',
      icon: Droplets,
    },
    {
      title: 'Valley Leaks',
      description: 'Water channeling where two roof planes meet',
      icon: Droplets,
    },
    {
      title: 'Pipe Boot Failures',
      description: 'Cracked or deteriorated rubber boots around vent pipes',
      icon: Wrench,
    },
    {
      title: 'Step Flashing Issues',
      description: 'Leaks where roof meets sidewalls or dormers',
      icon: AlertTriangle,
    },
    {
      title: 'Storm Damage',
      description: 'Hail impact, tree branches, or wind-lifted shingles',
      icon: Wind,
    },
    {
      title: 'Ice Dam Damage',
      description: 'Water backup from ice dams causing interior leaks',
      icon: Droplets,
    },
    {
      title: 'Aging Seal Failure',
      description: 'Shingles lifting due to adhesive breakdown',
      icon: Shield,
    },
  ];

  const costRanges = [
    {
      category: 'Minor Repairs',
      range: '$250 - $600',
      examples: [
        'Replace 5-15 shingles',
        'Seal pipe boot or small flashing leak',
        'Re-secure lifted shingles',
        'Minor valley patch',
      ],
      timeline: '2-4 hours typical',
    },
    {
      category: 'Moderate Repairs',
      range: '$600 - $1,800',
      examples: [
        'Replace 15-50 shingles',
        'Chimney counter-flashing replacement',
        'Valley flashing repair (10-20 linear feet)',
        'Multiple pipe boot replacements',
        'Step flashing at dormer or wall',
      ],
      timeline: '4-8 hours (half to full day)',
    },
    {
      category: 'Major Repairs',
      range: '$1,800 - $4,000+',
      examples: [
        'Large section replacement (100+ shingles)',
        'Complete valley reconstruction',
        'Multiple flashing systems (chimney + walls + valleys)',
        'Structural deck repair + shingles',
        'Complex leak diagnosis requiring exploratory work',
      ],
      timeline: '1-3 days depending on scope',
    },
  ];

  const repairReasons = [
    'Roof is less than 15 years old',
    'Damage is localized to one area',
    'Most of the roof is still in good condition',
    'Budget constraints require phased approach',
    'Leak is due to flashing failure, not shingle wear',
  ];

  const replacementReasons = [
    'Roof is 20+ years old or near end of rated lifespan',
    'Multiple repair areas across entire roof',
    'Widespread shingle curling, granule loss, or brittleness',
    'Multiple layers already present (code limits layers)',
    'Repeated repairs in different spots each year',
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Leak Diagnosis & Inspection',
      description: 'We locate the actual source (often not where you see the leak inside). We inspect flashing, penetrations, and vulnerable areas.',
      icon: Search,
    },
    {
      step: '2',
      title: 'Repair vs. Replace Guidance',
      description: 'We'll assess overall roof condition and tell you honestly whether repair makes sense or if you're better off replacing.',
      icon: FileText,
    },
    {
      step: '3',
      title: 'Clear Cost Estimate',
      description: 'You'll receive a written estimate with scope of work and cost breakdown before we start. No surprises.',
      icon: CheckCircle2,
    },
    {
      step: '4',
      title: 'Execute Repair',
      description: 'We fix the problem properly - addressing root cause, not just symptoms. Clean workmanship and attention to flashing details.',
      icon: Wrench,
    },
    {
      step: '5',
      title: 'Follow-Up & Warranty',
      description: 'We clean up, confirm the repair, and provide warranty coverage. If additional issues arise, we'll address them.',
      icon: Shield,
    },
  ];

  const faqs = [
    {
      question: 'How do I know if my roof can be repaired instead of replaced?',
      answer:
        'It depends on the roof\'s age, extent of damage, and overall condition. A roof under 15 years old with localized damage is usually repairable. A roof over 20 years with multiple problem areas is often better replaced. We'll inspect and give you honest guidance.',
    },
    {
      question: 'Can you fix an active leak quickly?',
      answer:
        'Yes. If you have active leaking, we prioritize stabilization to stop water intrusion, then confirm the permanent repair plan. For emergencies, see our Emergency Roof Repair page.',
    },
    {
      question: 'Do you repair flashing around chimneys and walls?',
      answer:
        'Yes. Flashing failures are one of the most common leak sources. We replace step flashing, counter-flashing, valley flashing, and pipe boots as needed.',
    },
    {
      question: 'How much does roof repair cost in Maine?',
      answer:
        'Minor repairs (replace a few shingles, seal a boot) typically cost $250-$600. Moderate repairs (flashing replacement, 15-50 shingles) run $600-$1,800. Major repairs (large sections, multiple systems) range $1,800-$4,000+. Final cost depends on scope, materials, and access difficulty.',
    },
    {
      question: 'Do you repair metal roofs?',
      answer:
        'Yes. We diagnose metal roof leaks (often fastener issues, flashing gaps, or seam problems) and recommend the right fix - whether it\'s re-fastening panels, flashing repair, or sealant application.',
    },
    {
      question: 'Will insurance cover my roof repair?',
      answer:
        'It depends on the cause. Storm damage (wind, hail, tree impact) is often covered. Age-related wear or maintenance issues typically aren\'t. We can provide documentation and photos to help with your claim.',
    },
    {
      question: 'How long does a roof repair take?',
      answer:
        'Minor repairs: 2-4 hours. Moderate repairs: half to full day. Major repairs: 1-3 days. Timeline depends on scope, weather, and access.',
    },
    {
      question: 'Do you warranty your roof repairs?',
      answer:
        'Yes. We provide a workmanship warranty on repairs. Specific terms depend on the repair scope - we'll explain coverage when providing your estimate.',
    },
    {
      question: 'What if the leak source is hard to find?',
      answer:
        'Some leaks require exploratory work - carefully removing shingles to trace the water path. We'll explain this upfront if needed and get your approval before proceeding.',
    },
    {
      question: 'Can you match existing shingles for a repair?',
      answer:
        'We do our best to match color and style. Exact matches are easier on newer roofs. Older roofs may show slight color difference due to weathering, but we minimize the visual impact.',
    },
    {
      question: 'Do you offer emergency roof repair?',
      answer:
        'Yes. For active leaks, storm damage, or structural concerns, we respond quickly. See our Emergency Roof Repair page for details on our 2-hour response commitment.',
    },
    {
      question: 'Should I repair or replace my 18-year-old roof with one leak?',
      answer:
        'It depends. If the leak is flashing-related and the shingles are still in good shape, repair makes sense. If shingles are brittle, curling, or losing granules, replacement may be smarter long-term. We'll assess and advise honestly.',
    },
    {
      question: 'Can you repair flat roofs or rubber roofs?',
      answer:
        'Yes. We repair EPDM rubber roofs, TPO, and low-slope systems. Common repairs include seam failures, punctures, and flashing issues.',
    },
    {
      question: 'Do you repair ice dam damage?',
      answer:
        'Yes. Ice dams can cause shingle damage, flashing issues, and underlayment failure. We repair the damage and recommend prevention steps (ventilation, insulation, ice & water shield upgrades).',
    },
    {
      question: 'What's included in a roof repair estimate?',
      answer:
        'Our estimate includes: diagnosis of problem, scope of repair work, materials needed, labor cost, timeline, and warranty coverage. You'll know exactly what we're fixing and what it costs.',
    },
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Roof Repair',
          description:
            'Professional roof repair services in Southern Maine for leaks, storm damage, flashing issues, and shingle replacement. Honest repair vs. replacement guidance with transparent pricing.',
          url: 'https://graniteshieldroofing.com/services/roof-repair',
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
            name: 'Roof Repair',
            url: 'https://graniteshieldroofing.com/services/roof-repair',
          },
        ]}
      />

      <FAQSchema faqs={faqs} />

      {/* Hero Section */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-14 sm:py-16 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-blue-600/90 px-4 py-2 text-sm font-semibold">
              Fast Diagnosis • Honest Guidance • Clean Repairs
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Roof Repair in Southern Maine
            </h1>

            <p className="mt-4 text-lg text-slate-200">
              Leak diagnosis, storm damage repair, flashing fixes, and shingle replacement.
              We'll tell you honestly whether repair makes sense or if replacement is smarter.
              Transparent pricing, clean workmanship, owner-led accountability.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild className="h-12 px-6">
                <Link href="/lp/free-roof-estimate">
                  Get Free Repair Estimate <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* Common Problems */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Common Roof Problems We Fix
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            These are the most frequent roof repair issues we see in Southern Maine.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commonProblems.map((problem) => (
              <Card key={problem.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 mb-4">
                    <problem.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-slate-600">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Ranges */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            What Does Roof Repair Cost? (Real Numbers)
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            Transparent pricing for roof repairs in Southern Maine. Costs vary by scope, materials, and access.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {costRanges.map((range) => (
              <Card key={range.category} className="border-2">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {range.category}
                  </h3>
                  <div className="text-3xl font-extrabold text-blue-600 mb-4">
                    {range.range}
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Examples:</p>
                    <ul className="space-y-1">
                      {range.examples.map((example) => (
                        <li key={example} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-600">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {range.timeline}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white border border-slate-200 rounded-lg max-w-3xl mx-auto">
            <p className="text-sm text-slate-600">
              <strong>Note:</strong> Final cost depends on roof pitch, access difficulty, materials needed, and extent of damage.
              These ranges reflect typical repairs in Southern Maine. You'll receive an exact quote before we start.
            </p>
          </div>
        </div>
      </section>

      {/* Repair vs Replace */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Should You Repair or Replace Your Roof?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Repair */}
            <Card className="border-2 border-green-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Repair Makes Sense</h3>
                </div>
                <ul className="space-y-3">
                  {repairReasons.map((reason) => (
                    <li key={reason} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{reason}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/lp/free-roof-estimate">
                      Get Repair Estimate <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Replace */}
            <Card className="border-2 border-amber-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Consider Replacement</h3>
                </div>
                <ul className="space-y-3">
                  {replacementReasons.map((reason) => (
                    <li key={reason} className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{reason}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/services/roof-replacement">
                      Learn About Replacement <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center p-6 bg-blue-50 border border-blue-200 rounded-lg max-w-3xl mx-auto">
            <p className="text-slate-700">
              <strong>Not sure which is right?</strong> We'll inspect your roof and give you honest guidance.
              If repair makes sense, we'll recommend it - even if replacement is more profitable for us.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Our Roof Repair Process
          </h2>

          <div className="space-y-8">
            {processSteps.map((step) => (
              <div key={step.step} className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
                <div className="hidden md:block flex-shrink-0">
                  <step.icon className="h-10 w-10 text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metal Roof Repairs */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Metal Roof Repairs
          </h2>
          <p className="text-slate-600 mb-6">
            We repair standing seam metal roofs, screw-down metal panels, and metal shingles.
            Common metal roof issues include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <Wrench className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-900">Fastener Issues</h4>
                <p className="text-sm text-slate-600">Loose, missing, or corroded screws causing leaks</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <Droplets className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-900">Flashing Gaps</h4>
                <p className="text-sm text-slate-600">Improperly sealed transitions at walls, chimneys, valleys</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-900">Seam Failures</h4>
                <p className="text-sm text-slate-600">Standing seam clips backing out or panel separation</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <Wind className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-900">Wind Damage</h4>
                <p className="text-sm text-slate-600">Panels lifted, bent, or torn from severe wind events</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/services/standing-seam-metal-roofing"
              className="text-blue-600 font-semibold hover:underline inline-flex items-center"
            >
              Learn more about metal roofing <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Roof Repair Questions Answered
          </h2>
          <div className="space-y-5">
            {faqs.map((f) => (
              <Card key={f.question}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {f.question}
                  </h3>
                  <p className="text-slate-600">{f.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-6">
              Need a roof repair? Let's assess the problem and give you honest guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" asChild>
                <Link href="/lp/free-roof-estimate">
                  Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {BUSINESS_CONFIG.contact.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
