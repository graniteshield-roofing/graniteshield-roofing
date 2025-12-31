import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Phone, MapPin, Droplets, Wind, AlertTriangle, Zap, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import {
  ServiceSchema,
  BreadcrumbSchema,
  FAQSchema,
} from '@/components/schema-markup';

export const metadata: Metadata = {
  title: `Emergency Roof Repair Portland Maine | 2-Hour Response | ${BUSINESS_CONFIG.name}`,
  description:
    'Emergency roof repair in Portland & Southern Maine. Active leak? Storm damage? We respond in 2 hours. Honest pricing, fast stabilization, and permanent repair plans.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/emergency-roof-repair',
  },
};

const SERVICE_AREAS = [
  'Scarborough',
  'Portland',
  'South Portland',
  'Westbrook',
  'Falmouth',
  'Yarmouth',
  'Cape Elizabeth',
  'Biddeford',
];

export default function EmergencyRoofRepairPage() {
  const emergencyScenarios = [
    {
      title: 'Active Ceiling Leak',
      description: 'Water dripping from ceiling, visible stains spreading, or wet insulation in attic',
      icon: Droplets,
    },
    {
      title: 'Storm Damage',
      description: 'Missing shingles, visible holes, or tarps blown off after wind/hail/snow event',
      icon: Wind,
    },
    {
      title: 'Structural Concern',
      description: 'Sagging roofline, heavy snow load, or tree/branch impact damage',
      icon: AlertTriangle,
    },
    {
      title: 'Ice Dam Leaking',
      description: 'Water backing up from ice dam, icicles inside attic, or active winter leak',
      icon: Zap,
    },
  ];

  const costRanges = [
    {
      category: 'Emergency Tarping & Leak Stop',
      range: '$450 - $950',
      examples: [
        'Emergency tarp installation (materials + labor)',
        'Temporary leak stabilization',
        'Ice dam steaming for active leak',
        'Emergency service call (no charge - pay only for work)',
      ],
      timeline: 'Same day response',
    },
    {
      category: 'Emergency Leak + Same-Visit Repair',
      range: '$750 - $1,800',
      examples: [
        'Stop active leak + permanent repair',
        'Flashing replacement at leak source',
        'Shingle replacement (10-30 shingles)',
        'Chimney counter-flashing repair',
      ],
      timeline: '2-6 hours typical',
    },
    {
      category: 'Major Storm / Structural Emergency',
      range: '$1,800 - $4,500+',
      examples: [
        'Large section shingle replacement',
        'Multiple leak points across roof',
        'Structural stabilization + tarping',
        'Complex flashing/valley reconstruction',
      ],
      timeline: 'Staged repair (stabilize now, repair ASAP)',
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Call Us Immediately',
      description: 'We answer calls directly. No voicemail jail. Describe the situation and we'll triage urgency.',
      icon: Phone,
    },
    {
      step: '2',
      title: '2-Hour Response Window',
      description: 'For active leaks and structural emergencies, we mobilize within 2 hours during business hours. After-hours and weekends: we'll still respond same-day when possible.',
      icon: Clock,
    },
    {
      step: '3',
      title: 'Assess & Stabilize',
      description: 'We locate the leak source, stop active water intrusion, and explain what happened and why.',
      icon: AlertTriangle,
    },
    {
      step: '4',
      title: 'Transparent Cost Options',
      description: 'You'll know the cost before we start. Temporary stabilization vs. permanent repair vs. staged approach - your call.',
      icon: CheckCircle2,
    },
    {
      step: '5',
      title: 'Execute & Follow Through',
      description: 'We complete the work, clean up, and confirm next steps if additional work is needed.',
      icon: Shield,
    },
  ];

  const faqs = [
    {
      question: 'What counts as an emergency roof repair?',
      answer:
        'Active leaks (water entering living space or attic), storm damage exposing roof deck, structural concerns (sagging, tree damage), ice dams causing leaks, or heavy snow load risk. If you\'re worried about damage happening right now, call us.',
    },
    {
      question: 'Do you really respond in 2 hours?',
      answer:
        'Yes, for true emergencies during business hours. We prioritize active leaks and structural threats. After-hours and weekends, we respond same-day when possible. Non-emergency repairs are scheduled within 1-3 days.',
    },
    {
      question: 'Do you charge for emergency service calls?',
      answer:
        'No separate service call fee. You pay only for the work we do (tarping, temporary stabilization, permanent repair, etc.). We'll quote the cost before starting.',
    },
    {
      question: 'How much does emergency tarping cost?',
      answer:
        'Emergency tarping typically runs $450-$950 depending on roof pitch, access difficulty, and tarp size needed. This includes materials, labor, and securing the tarp to prevent blow-off.',
    },
    {
      question: 'Can you do a permanent repair during the emergency visit?',
      answer:
        'Often yes, if conditions allow and materials are on hand. For example, a chimney flashing leak or small shingle blow-off can often be permanently repaired same-visit. Larger damage may require tarping now and scheduling a full repair.',
    },
    {
      question: 'What if I need emergency help at night or on the weekend?',
      answer:
        'Call us. We don\'t guarantee instant response outside business hours, but we answer calls and mobilize same-day for true emergencies when possible. At minimum, we\'ll talk you through temporary protection steps.',
    },
    {
      question: 'Do you handle ice dam emergencies in winter?',
      answer:
        'Yes. Ice dam removal via low-pressure steaming is a common emergency call. If an ice dam is causing active leaking, we can steam it off to stop the leak, then assess prevention steps.',
    },
    {
      question: 'Will you help me file an insurance claim for storm damage?',
      answer:
        'We can provide documentation, photos, and a repair estimate for your insurance claim. We don\'t negotiate directly with adjusters, but we'll give you the information you need to file.',
    },
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Emergency Roof Repair',
          description:
            'Emergency roof repair service in Portland and Southern Maine with 2-hour response for active leaks and storm damage. Honest pricing, fast stabilization, permanent repairs.',
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-20 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-red-600/90 px-4 py-2 text-sm font-semibold">
              <Clock className="mr-2 h-4 w-4" />
              2-Hour Emergency Response
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Emergency Roof Repair in Portland & Southern Maine
            </h1>

            <p className="mt-6 text-xl text-slate-200">
              Active leak? Storm damage? We respond in 2 hours for true emergencies.
              Transparent pricing, fast stabilization, and honest guidance on permanent repairs.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild className="h-14 px-8 text-lg">
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  <Phone className="mr-2 h-6 w-6" />
                  Call Now for Emergency
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 px-8 text-lg bg-transparent text-white border-white hover:bg-white hover:text-slate-900"
              >
                <Link href="/lp/free-roof-estimate">
                  <Clock className="mr-2 h-5 w-5" />
                  Schedule Non-Emergency Repair
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex items-start gap-2 text-slate-300 text-sm max-w-2xl">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                Serving: <span className="font-semibold">{SERVICE_AREAS.join(', ')}</span> and nearby Southern Maine towns
              </p>
            </div>

            <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <p className="text-sm text-slate-300">
                <strong className="text-white">No service call fee.</strong> You pay only for work performed.
                All costs quoted before we start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Scenarios */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            When to Call for Emergency Roof Repair
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            If you're experiencing any of these situations, call us immediately. We'll help stabilize the damage and prevent it from getting worse.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyScenarios.map((scenario) => (
              <Card key={scenario.title} className="border-2 hover:border-red-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
                    <scenario.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {scenario.title}
                  </h3>
                  <p className="text-sm text-slate-600">{scenario.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="cta" size="lg" asChild>
              <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                <Phone className="mr-2 h-5 w-5" />
                Call {BUSINESS_CONFIG.contact.phone} Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Cost Transparency */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Emergency Roof Repair Costs (Real Numbers)
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            No hidden fees. No surprise charges. Here's what emergency roof repairs typically cost in Southern Maine.
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
                    <p className="text-sm font-semibold text-slate-700 mb-2">Typical scenarios:</p>
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
              <strong>Important:</strong> Costs vary based on roof pitch, access difficulty, extent of damage, and materials required.
              These ranges reflect typical emergency repairs in Southern Maine. You'll receive an exact quote before work begins.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            How Emergency Roof Repair Works
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

      {/* FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Emergency Roof Repair Questions
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
              Have an emergency? Don't wait - call us now.
            </p>
            <Button variant="cta" size="lg" asChild>
              <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                <Phone className="mr-2 h-5 w-5" />
                {BUSINESS_CONFIG.contact.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
