import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, FileText, Database, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { BreadcrumbSchema, ItemListSchema } from '@/components/schema-markup';

export const metadata: Metadata = {
  title: `Maine Roofing Data Reports | ${BUSINESS_CONFIG.name}`,
  description: 'Access proprietary Maine roofing data reports: cost benchmarks, ice dam steaming safety specs, winter emergency response processes, and industry insights.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/reports',
  },
};

const SITE_URL = 'https://graniteshieldroofing.com';

const reports = [
  {
    title: 'Maine Roofing Cost Report (Winter 2025)',
    description: 'Real cost data for asphalt, metal, and rubber roofing in Southern Maine. Based on completed project analysis.',
    href: '/reports/maine-roofing-cost-report-winter-2025',
    icon: Database,
    updated: 'Jan 2025'
  },
  {
    title: 'Ice Dam Steaming Safety Specifications',
    description: 'Technical standards for safe ice dam removal: PSI limits, temperature ranges, and surface protection protocols.',
    href: '/reports/maine-ice-dam-steaming-safety-specs',
    icon: Shield,
    updated: 'Jan 2025'
  },
  {
    title: 'Winter Emergency Response Times',
    description: 'Our triage criteria and response time benchmarks for active leaks vs. snow load concerns.',
    href: '/reports/maine-winter-roofing-response-times-and-process',
    icon: FileText,
    updated: 'Jan 2025'
  }
];

export default function ReportsIndex() {
  return (
    <main className="min-h-screen bg-white py-12">
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Reports', url: `${SITE_URL}/reports` }
      ]} />
      <ItemListSchema 
        name="Maine Roofing Data Reports" 
        items={reports.map(r => r.title)} 
      />
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Maine Roofing Data & Reports
        </h1>
        <p className="text-xl text-slate-600 mb-12">
          Transparent, verifiable data to help Maine homeowners make informed decisions.
        </p>

        <div className="grid gap-6">
          {reports.map((report) => (
            <Link key={report.href} href={report.href} className="group">
              <Card className="hover:border-blue-300 transition-all hover:shadow-md">
                <CardContent className="p-8 flex items-start gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <report.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-700">
                        {report.title}
                      </h2>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        Updated: {report.updated}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{report.description}</p>
                    <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                      Read Report <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
