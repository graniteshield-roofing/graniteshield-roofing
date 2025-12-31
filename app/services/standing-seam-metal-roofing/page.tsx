import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Phone, MapPin, Layers, Shield, Ruler, Snowflake, Wind, Droplets, Clock, Home, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import {
  ServiceSchema,
  BreadcrumbSchema,
  FAQSchema,
} from '@/components/schema-markup';

export const metadata: Metadata = {
  title: `Standing Seam Metal Roofing Southern Maine | Premium Installation | ${BUSINESS_CONFIG.name}`,
  description:
    'Premium standing seam metal roofing in Southern Maine. 40-60+ year lifespan, superior snow shedding, wind-rated to 140+ mph. Honest cost ranges: $24k-$70k depending on home size and complexity.',
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
  const metalCostRanges = [
    {
      homeType: 'Smaller Simple Homes',
      size: 'Ranch / Cape (~1,500-2,200 sq ft)',
      squares: '15-22 squares',
      range: '$24,000 - $35,000+',
      drivers: [
        'Simpler roof line',
        'Single story or basic cape',
        'Fewer penetrations and transitions',
        'Standard pitch (4/12 to 6/12)',
      ],
    },
    {
      homeType: 'Typical 2-Story Homes',
      size: 'Colonial / Farmhouse (~2,200-3,000 sq ft)',
      squares: '22-30 squares',
      range: '$30,000 - $45,000+',
      drivers: [
        'Moderate complexity',
        'Multiple roof planes',
        'Chimneys, valleys, dormers',
        'Standard to steep pitch',
      ],
    },
    {
      homeType: 'Larger / Complex Homes',
      size: 'Large Colonial / Custom (~3,000+ sq ft)',
      squares: '30-50+ squares',
      range: '$45,000 - $70,000+',
      drivers: [
        'Complex roof geometry',
        'Multiple stories and transitions',
        'Steep pitch or challenging access',
        'Coastal exposure requiring premium materials',
      ],
    },
  ];

  const whatIsStandingSeam = [
    {
      title: 'Continuous Vertical Panels',
      description: 'Metal panels run continuously from ridge to eave with no horizontal seams to trap water or snow',
      icon: Layers,
    },
    {
      title: 'Raised Locked Seams',
      description: 'Panels interlock with raised vertical seams (typically 1.5"-2" tall) that channel water away from fasteners',
      icon: Shield,
    },
    {
      title: 'No Exposed Fasteners',
      description: 'Hidden clip system allows thermal expansion/contraction without fastener stress. No screw holes to leak.',
      icon: CheckCircle2,
    },
    {
      title: 'Premium Gauge & Finish',
      description: '24-26 gauge steel or aluminum with Kynar 500 / PVDF finish for maximum lifespan and color retention',
      icon: Ruler,
    },
  ];

  const comparisonData = [
    {
      category: 'Lifespan',
      shingles: '20-30 years typical',
      metal: '40-60+ years (often outlasts the house)',
    },
    {
      category: 'Snow Shedding',
      shingles: 'Snow accumulates, ice dams common',
      metal: 'Snow slides off naturally, reduces ice dam risk',
    },
    {
      category: 'Wind Resistance',
      shingles: 'Rated to 110-130 mph (can lift in severe storms)',
      metal: 'Rated to 140+ mph, interlocking panels resist uplift',
    },
    {
      category: 'Maintenance',
      shingles: 'Periodic repairs, algae treatment, eventual replacement',
      metal: 'Virtually maintenance-free (inspect flashings)',
    },
    {
      category: 'Fire Resistance',
      shingles: 'Class A fire rating (good)',
      metal: 'Class A fire rating, non-combustible material',
    },
    {
      category: 'Energy Efficiency',
      shingles: 'Absorbs heat (hot attic in summer)',
      metal: 'Reflects heat (cooler attic, lower cooling costs)',
    },
    {
      category: 'Upfront Cost',
      shingles: '$12,000 - $25,000 (typical home)',
      metal: '$24,000 - $45,000+ (see ranges above)',
    },
  ];

  const idealUseCases = [
    {
      title: 'Forever Homes',
      description: 'Planning to stay 20+ years? Metal outlasts shingles and eliminates re-roofing costs.',
    },
    {
      title: 'Ice Dam Problems',
      description: 'Metal&apos;s smooth surface and snow-shedding properties dramatically reduce ice dam formation.',
    },
    {
      title: 'Coastal Exposure',
      description: 'Salt air, wind-driven rain, and severe weather demand premium materials. Metal delivers.',
    },
    {
      title: 'Historic Aesthetics',
      description: 'Standing seam complements colonial, farmhouse, and traditional Maine architecture beautifully.',
    },
    {
      title: 'Low-Maintenance Priority',
      description: 'Never want to re-roof again? Metal&apos;s 40-60+ year lifespan minimizes long-term hassle.',
    },
    {
      title: 'Environmental Values',
      description: 'Metal is recyclable, reflects heat (energy savings), and doesn&apos;t end up in landfills like shingles.',
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Inspection & Planning',
      description: 'We assess roof structure, pitch, complexity, and exposure. Discuss color, profile, and underlayment strategy for Maine conditions.',
      icon: Home,
    },
    {
      step: '2',
      title: 'Underlayment & Ice Protection',
      description: 'High-temp synthetic underlayment rated for metal roofing. Ice & water shield at eaves, valleys, and vulnerable areas per Maine code.',
      icon: Shield,
    },
    {
      step: '3',
      title: 'Panel Installation',
      description: 'Continuous panels installed from eave to ridge using hidden clip system. Precise alignment and fastening for thermal movement.',
      icon: Layers,
    },
    {
      step: '4',
      title: 'Flashing & Transitions',
      description: 'Custom flashing at chimneys, walls, valleys, and penetrations. This is where quality separates good installs from leaks.',
      icon: Ruler,
    },
    {
      step: '5',
      title: 'Final Details & Cleanup',
      description: 'Ridge caps, trim details, gutter integration, and thorough cleanup. Final walkthrough to confirm quality.',
      icon: CheckCircle2,
    },
  ];

  const mainePerformance = [
    {
      title: 'Freeze-Thaw Cycles',
      description: 'Metal expands and contracts without cracking. No shingle brittleness or seal failures from Maine winter extremes.',
      icon: Snowflake,
    },
    {
      title: 'Heavy Snow Loads',
      description: 'Snow slides off naturally (plan for ground clearance). Reduces roof load stress and ice dam formation.',
      icon: Layers,
    },
    {
      title: 'Wind-Driven Rain',
      description: 'Interlocking panels and raised seams shed water aggressively. Wind-rated to 140+ mph for coastal exposure.',
      icon: Wind,
    },
    {
      title: 'Ice & Water Protection',
      description: 'Smooth surface minimizes ice dam grip. Combined with proper attic insulation/ventilation, ice risk drops dramatically.',
      icon: Droplets,
    },
  ];

  const faqs = [
    {
      question: 'How long does a standing seam metal roof last in Maine?',
      answer:
        'Standing seam metal roofs typically last 40-60+ years in Maine, and often outlive the house. Lifespan depends on material (steel vs. aluminum), finish quality (Kynar 500 is best), and installation quality at transitions and flashing points. Many metal roofs installed in the 1980s are still performing well today.',
    },
    {
      question: 'How much does a standing seam metal roof cost in Southern Maine?',
      answer:
        'Cost depends on home size and complexity. Smaller simple homes (1,500-2,200 sq ft): $24k-$35k. Typical 2-story homes (2,200-3,000 sq ft): $30k-$45k. Larger or complex homes (3,000+ sq ft): $45k-$70k+. Final cost depends on roof pitch, complexity, material choice, and coastal exposure requirements.',
    },
    {
      question: 'Will snow slide off a metal roof and cause problems?',
      answer:
        'Yes, snow will slide off metal roofs naturally - this is actually a benefit for reducing ice dams and roof load. However, you need to plan for it: avoid walkways directly below eaves, consider snow guards if needed, and ensure adequate ground clearance. We'll help you plan for safe snow shedding.',
    },
    {
      question: 'Is a metal roof noisy when it rains?',
      answer:
        'No. When properly installed over solid decking with quality underlayment (as we do), standing seam metal roofs are NOT significantly louder than shingles. The noise concern comes from barn/shed metal over open framing - not the case with residential installations.',
    },
    {
      question: 'Metal vs. shingles - which is better for Maine?',
      answer:
        'It depends on priorities. Metal costs 2-3x upfront but lasts 40-60+ years (vs. 20-30 for shingles), sheds snow better, resists ice dams, handles wind/coastal exposure, and requires virtually no maintenance. Shingles cost less upfront but need replacement sooner. For forever homes, coastal properties, or ice dam issues, metal is often the smarter long-term choice.',
    },
    {
      question: 'Can you install metal roofing over existing shingles?',
      answer:
        'Sometimes, but not always. It depends on the number of existing layers, roof condition, structural capacity, and local code. We generally recommend tear-off to inspect decking and ensure proper underlayment installation. We'll assess and recommend the safest approach after inspection.',
    },
    {
      question: 'Does metal roofing rust or corrode in coastal Maine?',
      answer:
        'Quality standing seam metal with Kynar 500 / PVDF finish is highly resistant to salt air and coastal corrosion. Aluminum is naturally corrosion-resistant; steel requires proper coating. We recommend aluminum or premium-coated steel for coastal properties. Cheap painted steel or screw-down metal can corrode - that&apos;s why material quality matters.',
    },
    {
      question: 'What colors are available for standing seam metal?',
      answer:
        'Common colors include charcoal gray, slate gray, black, dark bronze, forest green, barn red, and weathered zinc. We typically recommend darker colors for Maine aesthetics (they hide dirt and blend with surroundings). Color choice affects cost slightly - custom colors cost more than standard offerings.',
    },
    {
      question: 'Do you offer financing for metal roofing?',
      answer:
        'Yes. We partner with Sunlight Financial to offer flexible payment plans for metal roof projects. Monthly payments for a typical $30k-$45k metal roof can range from $280-$650/month depending on term and credit profile. See our Financing page for details.',
    },
    {
      question: 'How long does metal roof installation take?',
      answer:
        'Typical installations take 3-7 days depending on home size, complexity, weather, and whether tear-off is required. Simple ranches may finish in 3-4 days. Complex colonials with multiple roof planes and details can take 5-7 days. We'll give you a timeline estimate after inspection.',
    },
    {
      question: 'What is the difference between standing seam and screw-down metal?',
      answer:
        'Standing seam uses hidden clips (no exposed fasteners) and allows thermal expansion/contraction without stress. Screw-down metal has exposed screws that penetrate the panel - these can leak over time as screws back out or washers deteriorate. Standing seam is premium; screw-down is budget. We recommend standing seam for residential.',
    },
    {
      question: 'Will a metal roof increase my home value?',
      answer:
        'Yes, typically. Buyers value the long lifespan, low maintenance, and premium aesthetics. ROI varies, but metal roofs often recoup 85-95% of cost at resale, and the curb appeal and "never re-roof again" selling point can be significant in competitive markets.',
    },
    {
      question: 'Do I need special insulation or ventilation for a metal roof?',
      answer:
        'No special requirements beyond good roofing practice. Proper attic insulation (R-49+ for Maine) and ventilation (1:150 ratio) are critical for ANY roof to prevent ice dams and condensation. We assess ventilation during inspection and recommend improvements if needed.',
    },
    {
      question: 'Can you repair a standing seam metal roof if it gets damaged?',
      answer:
        'Yes. Common repairs include re-fastening loose clips, replacing damaged panels, and fixing flashing issues. Metal roofs are repairable, though panel replacement requires care to match color and profile. See our Roof Repair page for metal-specific repair services.',
    },
    {
      question: 'Is standing seam metal roofing worth the cost?',
      answer:
        'For the right situation, absolutely. If you&apos;re staying in your home 20+ years, dealing with ice dams, in a coastal area, or tired of repeat re-roofing costs, the premium upfront cost pays off in longevity, performance, and peace of mind. For short-term ownership or tight budgets, quality shingles may make more sense. We&apos;ll help you decide honestly.',
    },
  ];

  return (
    <>
      <ServiceSchema
        service={{
          name: 'Standing Seam Metal Roofing',
          description:
            'Premium standing seam metal roofing installation in Southern Maine. 40-60+ year lifespan, superior snow shedding, wind-rated performance, and expert flashing details for Maine weather.',
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-20 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-amber-600/90 px-4 py-2 text-sm font-semibold">
              <Shield className="mr-2 h-4 w-4" />
              Premium Metal Roofing • 40-60+ Year Lifespan
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Standing Seam Metal Roofing in Southern Maine
            </h1>

            <p className="mt-6 text-xl text-slate-200">
              This is not cheap barn metal. Standing seam is a premium roofing system
              engineered for Maine snow, wind, and coastal exposure. 40-60+ year lifespan,
              superior snow shedding, virtually maintenance-free. Honest cost ranges below.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild className="h-14 px-8">
                <Link href="/lp/free-roof-estimate">
                  Get Free Metal Roof Estimate <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 px-8 bg-transparent text-white border-white hover:bg-white hover:text-slate-900"
              >
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {BUSINESS_CONFIG.contact.phone}
                </a>
              </Button>
            </div>

            <div className="mt-8 flex items-start gap-2 text-slate-300 text-sm max-w-2xl">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                Serving: <span className="font-semibold">{SERVICE_AREAS.join(', ')}</span> and nearby Southern Maine towns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Standing Seam */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            What Is Standing Seam Metal Roofing?
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            Standing seam is a premium metal roofing system with hidden fasteners and interlocking
            raised seams. Here's what makes it different from cheap screw-down metal:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatIsStandingSeam.map((feature) => (
              <Card key={feature.title} className="border-2 hover:border-amber-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 mb-4">
                    <feature.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Transparency */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            What Does Standing Seam Metal Cost? (Real Numbers)
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            Transparent pricing for standing seam metal roofing in Southern Maine.
            Your actual cost depends on home size, roof complexity, and material choices.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {metalCostRanges.map((range) => (
              <Card key={range.homeType} className="border-2">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {range.homeType}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">{range.size}</p>
                  <p className="text-xs text-slate-500 mb-4">{range.squares}</p>
                  <div className="text-3xl font-extrabold text-amber-600 mb-4">
                    {range.range}
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Cost drivers:</p>
                    <ul className="space-y-1">
                      {range.drivers.map((driver) => (
                        <li key={driver} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-600">{driver}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white border border-slate-200 rounded-lg max-w-3xl mx-auto">
            <p className="text-sm text-slate-600 mb-3">
              <strong>What's included:</strong> Tear-off of existing roof, premium synthetic underlayment,
              ice & water shield (Maine code-compliant), standing seam panels (24-26 gauge), hidden clip system,
              custom flashing at all transitions, ridge caps, trim, cleanup, and workmanship warranty.
            </p>
            <p className="text-sm text-slate-600">
              <strong>Not included:</strong> Structural repairs (rotten decking, trusses), major ventilation upgrades,
              gutter replacement, or chimney rebuilds. These are quoted separately if needed.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/financing"
              className="inline-flex items-center text-blue-600 font-semibold hover:underline"
            >
              <DollarSign className="mr-1 h-4 w-4" />
              Financing available - monthly payments from $280-$650 for typical projects
            </Link>
          </div>
        </div>
      </section>

      {/* Metal vs Shingles Comparison */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Standing Seam Metal vs. Asphalt Shingles
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 p-4 text-left font-bold text-slate-900">Category</th>
                  <th className="border border-slate-300 p-4 text-left font-bold text-slate-900">Asphalt Shingles</th>
                  <th className="border border-slate-300 p-4 text-left font-bold text-amber-700">Standing Seam Metal</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={row.category} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="border border-slate-300 p-4 font-semibold text-slate-900">{row.category}</td>
                    <td className="border border-slate-300 p-4 text-slate-700">{row.shingles}</td>
                    <td className="border border-slate-300 p-4 text-slate-900 font-medium bg-amber-50/30">{row.metal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-slate-700">
              <strong>Bottom line:</strong> Metal costs 2-3x upfront but lasts 2x longer (or more) with virtually no maintenance.
              For forever homes, coastal properties, or homeowners tired of ice dams and re-roofing, metal is often the smarter
              long-term investment.
            </p>
          </div>
        </div>
      </section>

      {/* Ideal Use Cases */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Is Standing Seam Metal Right for Your Home?
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            Metal roofing excels in these situations. If any apply to you, it&apos;s worth considering:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {idealUseCases.map((useCase) => (
              <Card key={useCase.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-slate-600">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Maine Performance */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            How Metal Roofing Performs in Maine Weather
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            Maine winters and coastal exposure are tough on roofs. Here's how standing seam metal handles it:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainePerformance.map((perf) => (
              <Card key={perf.title} className="border-2 hover:border-blue-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 mb-4">
                    <perf.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {perf.title}
                  </h3>
                  <p className="text-sm text-slate-600">{perf.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Our Standing Seam Installation Process
          </h2>

          <div className="space-y-8">
            {processSteps.map((step) => (
              <div key={step.step} className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-600 text-white text-xl font-bold">
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

          <div className="mt-10 p-6 bg-white border-2 border-amber-200 rounded-lg">
            <p className="text-slate-700">
              <strong>Quality matters most at transitions.</strong> The panels themselves rarely leak - leaks come from
              improperly detailed chimneys, valleys, wall flashings, and penetrations. We obsess over these details
              because that&apos;s where amateur installs fail.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Standing Seam Metal Roofing Questions
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
              Considering metal for your home? Let's discuss whether it makes sense for your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" asChild>
                <Link href="/lp/free-roof-estimate">
                  Get Free Metal Roof Estimate <ArrowRight className="ml-2 h-5 w-5" />
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
