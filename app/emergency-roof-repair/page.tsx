import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Phone,
  AlertTriangle,
  Droplets,
  Home,
  Clock,
  MapPin,
  ClipboardCheck,
  Shield,
  DollarSign,
  CheckCircle2,
  Snowflake,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import {
  ServiceSchema,
  BreadcrumbSchema,
  FAQSchema,
} from '@/components/schema-markup';

export const metadata: Metadata = {
  title: `Emergency Roof Repair in Southern Maine | Active Leaks & Tarping | ${BUSINESS_CONFIG.name}`,
  description:
    'Emergency roof leak repair and temporary tarping in Southern Maine. Average 2-hour response for active leaks during storms when crews are available. Serving Scarborough, Portland, South Portland, Biddeford, Saco, and nearby towns.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/emergency-roof-repair',
  },
};

const SERVICE_AREAS = [
  'Scarborough',
  'Portland',
  'South Portland',
  'Biddeford',
  'Saco',
  'Falmouth',
  'Yarmouth',
  'Westbrook',
  'Cape Elizabeth',
];

export default function EmergencyRoofRepairPage() {
  const emergencyScenarios = [
    {
      title: 'Active Ceiling Leak',
      description:
        'Water actively dripping through ceiling, light fixtures, or down walls during rain or snow melt.',
      icon: Droplets,
    },
    {
      title: 'Storm-Torn Shingles or Metal',
      description:
        'Wind has ripped off shingles, loosened metal panels, or exposed bare decking.',
      icon: AlertTriangle,
    },
    {
      title: 'Tree or Branch Impact',
      description:
        'Tree limb has hit the roof, broken decking, or damaged ridge / eave areas.',
      icon: Home,
    },
    {
      title: 'Ice Dam Leak',
      description:
        'Water backing up behind ice at eaves or valleys, causing interior staining or active dripping.',
      icon: Snowflake,
    },
  ];

  const costRanges = [
    {
      category: 'Emergency Tarping & Leak Stop',
      range: '$450 - $950',
      description:
        'Temporary tarp installation or localized leak stop to stabilize active water intrusion during a storm.',
      examples: [
        'Blue tarp over damaged section',
        'Quick patch at obvious leak point',
        'Temporary sealing around chimney or vent',
      ],
    },
    {
      category: 'Emergency Leak + Same-Visit Repair',
      range: '$750 - $1,800',
      description:
        'Emergency response plus permanent repair completed in the same visit when conditions allow.',
      examples: [
        'Shingle section replacement around leak area',
        'Pipe boot or flashing replacement',
        'Small valley or ridge repair',
      ],
    },
    {
      category: 'Major Storm / Structural Emergency',
      range: '$1,800 - $4,500+',
      description:
        'Larger damaged areas, structural concerns, or multi-spot failures requiring extensive temporary protection and follow-up work.',
      examples: [
        'Tree impact with broken decking',
        'Multiple leaks across different roof planes',
        'Complex chimney / valley emergency',
      ],
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Call Us Immediately',
      description:
        'If water is actively coming in, call right away. We ask where the leak is, what you&apos;re seeing, and whether power or safety is affected.',
      icon: Phone,
    },
    {
      step: '2',
      title: 'Photo Review & Triage',
      description:
        'If it&apos;s safe, you text or email photos of the damage (inside and outside). We use this to prioritize severity and plan materials.',
      icon: ClipboardCheck,
    },
    {
      step: '3',
      title: 'On-Site Stabilization',
      description:
        'We arrive, stop the active leak first (tarping, patching, diverting water), then assess surrounding areas for hidden damage.',
      icon: Shield,
    },
    {
      step: '4',
      title: 'Emergency Repair or Plan',
      description:
        'If weather and conditions allow, we perform permanent repairs. If not, we stabilize and schedule a follow-up repair once safe.',
      icon: Home,
    },
    {
      step: '5',
      title: 'Documentation & Next Steps',
      description:
        'We document damage with photos, explain what happened, and outline permanent repair options and costs. Insurance documentation available when needed.',
      icon: FileText,
    },
  ];

  const faqs = [
    {
      question: 'What counts as an emergency roof repair?',
      answer:
        'An emergency is any active water intrusion that can cause immediate damage: water dripping through ceilings, leaks near electrical fixtures, major sections of missing shingles, tree impacts, or ice dams causing water to pour inside. If water is coming in now, treat it as an emergency.',
    },
    {
      question: 'Are you available 24/7?',
      answer:
        'We prioritize emergency calls during storms and peak leak events and do our best to respond as quickly as possible. Overnight or extreme-weather availability depends on safety and crew status. If we can&apos;t safely get on the roof, we&apos;ll advise temporary steps you can take to limit damage until conditions improve.',
    },
    {
      question: 'How fast can you get here?',
      answer:
        'In many Southern Maine emergencies we average around a 2-hour response time during daytime storms, depending on weather, distance, and how many active emergencies are in progress. During major storm events, we triage based on severity and safety.',
    },
    {
      question: 'What do you do on an emergency visit?',
      answer:
        'Our first priority is to stop water from entering your home. That might be tarping, temporary patching, redirecting water, or sealing around obvious failure points. Once the leak is stabilized, we assess damage and discuss permanent repair options with you.',
    },
    {
      question: 'Do you work with insurance for storm damage?',
      answer:
        'Yes. We can document storm damage with photos, provide written findings, and coordinate with your adjuster. You handle the claim; we handle repairs and any emergency measures needed to protect your home.',
    },
    {
      question: 'How much does emergency roof repair cost?',
      answer:
        'Emergency visits cost more than standard, scheduled repairs due to the urgency, after-hours work, and difficult conditions. Most emergency calls fall between $450 and $1,800 depending on severity, access, and whether permanent repairs are completed the same visit.',
    },
    {
      question: 'What if the weather is too dangerous to work?',
      answer:
        'If wind, lightning, or icy conditions make roof access unsafe, we focus on what can be done from the ground or inside (catching water, protecting belongings, advising safe temporary measures). We return as soon as conditions are safe to complete stabilization and repairs.',
    },
    {
      question: 'Can emergency repairs be financed?',
      answer:
        'Yes. If the total repair cost meets lender minimums (typically $1,000-$2,500), you can finance emergency work just like larger projects. This is helpful when storm damage hits unexpectedly. See our financing page for more details.',
    },
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Emergency Roof Repair',
          description:
            'Emergency roof leak repair, temporary tarping, and storm damage stabilization in Southern Maine. Average 2-hour response for active leaks when crews are available.',
          url: 'https://graniteshieldroofing.com/emergency-roof-repair',
        }}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://graniteshieldroofing.com' },
          {
            name: 'Emergency Roof Repair',
            url: 'https://graniteshieldroofing.com/emergency-roof-repair',
          },
        ]}
      />

      <FAQSchema faqs={faqs} />

      <section className="bg-gradient-to-br from-slate-950 to-red-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-14 sm:py-16 max-w-3xl">
            <Badge className="mb-6 bg-red-600 text-white border-0">
              Active Leak? Get Help Fast • Southern Maine
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Emergency Roof Repair & Tarping in Southern Maine
            </h1>

            <p className="mt-4 text-lg text-slate-100">
              Water coming in right now? We prioritize active leaks, emergency
              tarping, and storm damage stabilization across Scarborough,
              Portland, South Portland, Biddeford, Saco, and nearby towns.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                variant="cta"
                size="lg"
                asChild
                className="h-14 px-8 text-lg"
              >
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  <Phone className="mr-2 h-6 w-6" />
                  Call Now for Emergency Help
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 px-8 bg-transparent text-white border-white hover:bg-white hover:text-slate-900"
              >
                <Link href="/lp?service=emergency-roof-repair">
                  Request Emergency Visit Online
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-200">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-slate-300 flex-shrink-0" />
                <p>
                  <strong>Target response:</strong> Around 2 hours for active
                  leaks during storms when crews are available. Actual times
                  depend on weather, road conditions, and call volume.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-slate-300 flex-shrink-0" />
                <p>
                  Serving Southern Maine:{' '}
                  <span className="font-semibold">
                    {SERVICE_AREAS.join(', ')}
                  </span>{' '}
                  and surrounding towns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              When It&apos;s an Emergency – And When It&apos;s Not
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Use emergency service when water is actively entering your home or
              there&apos;s immediate risk of damage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Emergency Situations
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <Droplets className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Active dripping through ceiling or light fixtures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Droplets className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Water running down interior walls during storms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Storm damage with bare wood or broken areas exposed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Tree or large branch impact on roof or ridge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Ice dam leaks soaking ceilings, walls, or flooring
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Non-Emergency Situations
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                    <span>Minor ceiling stain that&apos;s not growing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                    <span>
                      A few missing shingles but no active leak inside
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                    <span>Age-related wear you&apos;ve noticed for months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Planning ahead for replacement or evaluating options
                    </span>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-slate-600">
                  These are best handled through our{' '}
                  <Link
                    href="/services/roof-repair"
                    className="underline font-semibold"
                  >
                    standard Roof Repair service
                  </Link>{' '}
                  where you&apos;ll get more scheduling flexibility and lower
                  non-emergency pricing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <DollarSign className="h-12 w-12 text-slate-900 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Emergency Roof Repair Cost in Southern Maine
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Typical ranges for emergency leak response and stabilization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
            {costRanges.map((range, idx) => (
              <Card key={idx} className="border-slate-200 bg-white">
                <CardContent className="p-6">
                  <div className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-2">
                    {range.category}
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-3">
                    {range.range}
                  </div>
                  <p className="text-sm text-slate-700 mb-3">
                    {range.description}
                  </p>
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                    Common Examples:
                  </p>
                  <ul className="space-y-1">
                    {range.examples.map((example, i) => (
                      <li
                        key={i}
                        className="text-sm text-slate-700 flex items-start gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-lg p-6 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700">
              <strong>Exact emergency pricing requires on-site assessment.</strong>{' '}
              Emergency work involves working in storms, after hours, and in
              challenging conditions. We always explain pricing before work
              begins and prioritize stopping damage first, then planning
              permanent repairs with you.
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-3">
              For larger follow-up repairs or replacements, financing is
              available.
            </p>
            <Button variant="outline" asChild>
              <Link href="/financing">
                See Financing Options <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Emergency Roof Repair Process
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              What to expect from your first call until the leak is under
              control
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {processSteps.map((step) => (
              <Card
                key={step.step}
                className="border-l-4 border-l-red-600 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6 flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-bold">
                        {step.step}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-2">
            Emergency Roof Repair FAQs
          </h2>
          <p className="text-slate-600 text-center mb-10">
            Common questions from Southern Maine homeowners during storms and
            active leaks
          </p>

          <div className="space-y-5">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
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

      <section className="py-20 bg-gradient-to-br from-slate-950 to-red-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Droplets className="h-16 w-16 text-red-300 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Water Coming In Right Now?
          </h2>
          <p className="text-xl text-slate-100 mb-10 max-w-2xl mx-auto">
            Don&apos;t wait for more damage. We prioritize active leaks,
            emergency tarping, and storm damage stabilization across Southern
            Maine. Call now and we&apos;ll walk you through the next steps.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="cta"
              size="lg"
              asChild
              className="h-16 px-10 text-lg"
            >
              <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                <Phone className="mr-2 h-6 w-6" />
                Call: {BUSINESS_CONFIG.contact.phone}
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-16 px-10 bg-transparent text-white border-white hover:bg-white hover:text-slate-900"
            >
              <Link href="/lp?service=emergency-roof-repair">
                Request Emergency Visit
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-slate-300">
            Serving {SERVICE_AREAS.join(', ')} and all Southern Maine
            communities
          </p>
        </div>
      </section>
    </>
  );
}
