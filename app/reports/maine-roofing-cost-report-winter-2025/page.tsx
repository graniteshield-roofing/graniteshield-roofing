import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Phone, MapPin, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import {
  BreadcrumbSchema,
  ReportSchema,
  DatasetSchema,
  FAQSchema,
} from '@/components/schema-markup';
import { ReportSummaryBox } from '@/components/report-summary-box';
import { LastUpdated } from '@/components/last-updated';
import { MethodologyBlock } from '@/components/methodology-block';

const SITE_URL = 'https://graniteshieldroofing.com';
const PAGE_URL = `${SITE_URL}/reports/maine-roofing-cost-report-winter-2025`;
const DATE_PUBLISHED = '2025-01-01';
const DATE_MODIFIED = '2025-01-01';

export const metadata: Metadata = {
  title: `Maine Roofing Cost Report — Winter 2025 | ${BUSINESS_CONFIG.name}`,
  description:
    'How much does a roof cost in Maine? Real data from Southern Maine: architectural shingles, standing seam metal, screw-down metal. Updated Winter 2025.',
  alternates: {
    canonical: PAGE_URL,
  },
};

export default function MaineRoofingCostReportPage() {
  const faqs = [
    {
      question: 'What does "2,000 sq ft roof" mean in these estimates?',
      answer:
        'This refers to the roof surface area (not house footprint). A 2,000 sq ft roof is typical for a 1,600–1,800 sq ft ranch or cape. Costs include tear-off, disposal, new materials, ice/water shield, and installation.',
    },
    {
      question: 'Why is Maine roofing more expensive than national averages?',
      answer:
        'Maine projects require extended ice/water shield, steeper-pitch adjustments, winter access constraints, and disposal costs. We also use higher-spec underlayment for freeze/thaw cycles.',
    },
    {
      question: 'Do these prices include permits and inspections?',
      answer:
        'Yes, all estimates include typical permit fees for Southern Maine towns. Complex structural work may require additional engineering review.',
    },
    {
      question: 'How often do you update this report?',
      answer:
        'We update this report every 6 months (Winter/Summer) with new data from completed projects. Check the "Last Updated" section for the most recent refresh.',
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Reports', url: `${SITE_URL}/reports` },
          {
            name: 'Maine Roofing Cost Report — Winter 2025',
            url: PAGE_URL,
          },
        ]}
      />

      <ReportSchema
        headline="Maine Roofing Cost Report — Winter 2025"
        description="Comprehensive cost data for roof replacement in Southern Maine by material type and region"
        datePublished={DATE_PUBLISHED}
        dateModified={DATE_MODIFIED}
        url={PAGE_URL}
        about={['Roof Replacement Costs', 'Maine Roofing', 'Roofing Materials']}
        mentions={[
          'Architectural Shingles',
          'Standing Seam Metal Roofing',
          'Screw-Down Metal Roofing',
          'Southern Maine',
        ]}
      />

      <DatasetSchema
        name="Maine Roofing Cost Data — Winter 2025"
        description="Cost benchmarks for roof replacement projects in Southern Maine based on completed jobs"
        temporalCoverage="2024-06/2025-01"
        spatialCoverage={{
          type: 'State',
          name: 'Maine',
          geo: {
            latitude: BUSINESS_CONFIG.location.latitude,
            longitude: BUSINESS_CONFIG.location.longitude,
          },
        }}
        variableMeasured={[
          'Roof Replacement Cost (Architectural Shingles)',
          'Roof Replacement Cost (Standing Seam Metal)',
          'Roof Replacement Cost (Screw-Down Metal)',
          'Regional Cost Variance',
        ]}
        measurementTechnique="Analysis of completed roofing projects including materials, labor, disposal, and permit costs"
        url={PAGE_URL}
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

            <div className="inline-flex items-center rounded-full bg-blue-600/90 px-4 py-2 text-sm font-semibold mb-6">
              Cost Data • Updated Winter 2025
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Maine Roofing Cost Report — Winter 2025
            </h1>

            <p className="text-xl text-slate-200 leading-relaxed">
              Real cost data from completed roofing projects in Southern Maine.
              Includes material breakdowns, regional variance, and Maine-specific
              factors that affect pricing.
            </p>

            <div className="mt-8 flex items-start gap-2 text-slate-200 text-sm">
              <MapPin className="h-4 w-4 mt-0.5 text-slate-300 flex-shrink-0" />
              <p>
                Data collected from projects in{' '}
                <span className="font-semibold">
                  Portland, Scarborough, Falmouth, Yarmouth, Cape Elizabeth,
                  South Portland, Westbrook
                </span>
                , and surrounding Southern Maine towns.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <LastUpdated
              date={DATE_MODIFIED}
              changeLog={[
                'Initial Winter 2025 report published',
                'Data collected from June 2024 - January 2025',
              ]}
            />
          </div>

          <div className="mb-12">
            <ReportSummaryBox
              title="Key Cost Benchmarks"
              stats={[
                {
                  label: 'Architectural Shingles',
                  value: '$12,000–$18,000',
                  description: '2,000 sq ft roof, Southern Maine average',
                },
                {
                  label: 'Standing Seam Metal',
                  value: '$24,000–$35,000',
                  description: '2,000 sq ft roof, 24-gauge steel',
                },
                {
                  label: 'Screw-Down Metal',
                  value: '$16,000–$22,000',
                  description: '2,000 sq ft roof, exposed fasteners',
                },
                {
                  label: 'Portland Metro Average',
                  value: '$15,000',
                  description: 'Architectural shingles, typical job',
                },
                {
                  label: 'Scarborough/Cape Elizabeth',
                  value: '$16,500',
                  description: 'Coastal premium (salt air, access)',
                },
                {
                  label: 'Biddeford/Saco',
                  value: '$13,500',
                  description: 'Lower cost corridor',
                },
              ]}
              note="All figures include tear-off, disposal, ice/water shield, permits, and typical Maine underlayment requirements. Excludes structural repairs or complex chimney work."
            />
          </div>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Material Breakdown
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 not-prose mb-12">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Architectural Shingles
                  </h3>
                  <div className="text-3xl font-extrabold text-blue-600 mb-2">
                    $12,000–$18,000
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    CertainTeed Landmark or equivalent, 30-year warranty
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Most cost-effective option</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>25–30 year lifespan in Maine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Wide color selection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Extended ice/water shield included</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Standing Seam Metal
                  </h3>
                  <div className="text-3xl font-extrabold text-blue-600 mb-2">
                    $24,000–$35,000
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    24-gauge steel, concealed fasteners, 40+ year warranty
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Longest lifespan (50+ years)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Best for ice dam prevention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Premium aesthetic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Higher upfront cost, best long-term ROI</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Screw-Down Metal
                  </h3>
                  <div className="text-3xl font-extrabold text-blue-600 mb-2">
                    $16,000–$22,000
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Exposed fastener panels, 26-gauge steel, 30-year warranty
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Mid-range metal option</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>40+ year lifespan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Good for barns, sheds, simple roofs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Fasteners require periodic maintenance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              What Drives Roof Cost in Maine?
            </h2>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Maine-Specific Cost Factors
                  </h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>Extended ice/water shield:</strong> 6 feet minimum
                        (vs. 3 feet in warmer states)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>Pitch/steepness:</strong> Many Maine homes have
                        steep roofs requiring staging, safety equipment
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>Access constraints:</strong> Narrow driveways,
                        tree coverage, winter conditions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>Winter work premiums:</strong> Cold-weather
                        installation requires specialized adhesives, longer setup
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">
                    What's Included in These Estimates
                  </h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Complete tear-off of existing roof</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Disposal and dumpster fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Synthetic underlayment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Extended ice/water shield (6+ feet)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>New roofing material + installation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Permits and inspections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Manufacturer warranty</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <MethodologyBlock
                sections={[
                  {
                    heading: 'Data Collection',
                    content:
                      'Cost data collected from completed roofing projects between June 2024 and January 2025 in Southern Maine (Cumberland, York, and Androscoggin Counties).',
                  },
                  {
                    heading: 'What We Include',
                    content: [
                      'Final invoiced amounts (not estimates)',
                      'All material costs including underlayment, ice/water shield, and roofing material',
                      'Labor for tear-off, disposal, and installation',
                      'Permit fees and inspection costs',
                      'Typical complexity projects (excludes major structural repairs)',
                    ],
                  },
                  {
                    heading: 'What We Exclude',
                    content: [
                      'Structural repairs or deck replacement',
                      'Complex chimney rebuilds or custom flashing',
                      'Commercial or multi-family projects',
                      'Projects with unusual access requirements (crane, helicopter)',
                    ],
                  },
                  {
                    heading: 'Standard Roof Definition',
                    content:
                      'A "2,000 sq ft roof" refers to the total roof surface area (measured on slope, not horizontal footprint). This is typical for a 1,600–1,800 sq ft single-story home or a 1,200–1,400 sq ft cape with dormers.',
                  },
                  {
                    heading: 'Update Frequency',
                    content:
                      'This report is updated every 6 months (Winter and Summer) with new data. Check the "Last Updated" section at the top of this page for the most recent refresh date.',
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

          <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Ready for a Precise Estimate?
              </h3>
              <p className="text-slate-600 mb-6">
                These benchmarks provide a starting point, but every roof is
                different. Schedule a free on-site inspection for a detailed,
                no-obligation quote specific to your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="cta" size="lg" asChild>
                  <Link href="/lp/free-roof-estimate">
                    Request Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call {BUSINESS_CONFIG.contact.phone}
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
