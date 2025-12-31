import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, FileText, Database, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { BreadcrumbSchema, ItemListSchema } from '@/components/schema-markup';

export const metadata: Metadata = {
  title: `Maine Roofing Data Reports | ${BUSINESS_CONFIG.name}`,
  description:
    'Access proprietary Maine roofing data reports: cost benchmarks, ice dam steaming safety specs, winter emergency response processes, and industry insights.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/reports',
  },
};

const SITE_URL = 'https://graniteshieldroofing.com';

const reports = [
  {
    title: 'Maine Roofing Cost Report — Winter 2025',
    slug: 'maine-roofing-cost-report-winter-2025',
    description:
      'Comprehensive cost data for roof replacement in Southern Maine: by material, region, and project scope. Real numbers from completed jobs.',
    icon: TrendingUp,
    highlight: 'Updated for Winter 2025',
    category: 'Cost Data',
  },
  {
    title: 'Maine Ice Dam Steaming Safety Specs',
    slug: 'maine-ice-dam-steaming-safety-specs',
    description:
      'Technical specifications for low-pressure ice dam steaming: PSI ranges, surface protection, application criteria, and homeowner safety checklist.',
    icon: Database,
    highlight: 'Technical Reference',
    category: 'Safety & Process',
  },
  {
    title: 'Maine Winter Roofing Response Times & Process',
    slug: 'maine-winter-roofing-response-times-and-process',
    description:
      'Emergency roofing response workflow: triage criteria, typical response times, what to expect when you call during Maine winter.',
    icon: FileText,
    highlight: 'Emergency Guide',
    category: 'Process',
  },
];

export default function ReportsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Reports', url: `${SITE_URL}/reports` },
        ]}
      />

      <ItemListSchema
        name="Maine Roofing Data Reports"
        description="Proprietary data reports and technical specifications for Maine roofing"
        url={`${SITE_URL}/reports`}
        items={reports.map((report) => ({
          name: report.title,
          url: `${SITE_URL}/reports/${report.slug}`,
          description: report.description,
        }))}
      />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-blue-600/90 px-4 py-2 text-sm font-semibold mb-6">
              Data-Driven Insights • Maine-Specific
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Maine Roofing Data Reports
            </h1>

            <p className="text-xl text-slate-200 leading-relaxed">
              Access proprietary data and technical specifications designed to
              help homeowners make informed decisions about roofing projects in
              Southern Maine.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <Card key={report.slug} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-blue-600 mb-1">
                          {report.category}
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">
                          {report.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {report.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                        {report.highlight}
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/reports/${report.slug}`}>
                          View Report <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Why We Publish This Data
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  Homeowners deserve access to real, verifiable information when
                  making roofing decisions. These reports combine data from
                  completed projects, technical specifications, and operational
                  processes to provide transparency.
                </p>
                <p>
                  All data is specific to Southern Maine conditions, materials,
                  and practices. We update these reports regularly to ensure
                  accuracy and relevance.
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" asChild>
                  <Link href="/lp/free-roof-estimate">
                    Request Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
