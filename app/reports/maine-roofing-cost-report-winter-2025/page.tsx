import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { ReportSummaryBox } from '@/components/report-summary-box';
import { LastUpdated } from '@/components/last-updated';
import { MethodologyBlock } from '@/components/methodology-block';
import { ReportSchema, DatasetSchema, BreadcrumbSchema } from '@/components/schema-markup';

const URL = 'https://graniteshieldroofing.com/reports/maine-roofing-cost-report-winter-2025';
const DATE = '2025-01-01';

export const metadata: Metadata = {
  title: 'Maine Roofing Cost Report: Winter 2025 Prices | GraniteShield',
  description: 'Analysis of roofing costs in Southern Maine (2024-2025). Real price ranges for architectural shingles, standing seam metal, and rubber roofing.',
  alternates: { canonical: URL },
};

export default function CostReportPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <BreadcrumbSchema items={[{ name: 'Reports', url: 'https://graniteshieldroofing.com/reports' }, { name: 'Cost Report', url: URL }]} />
      <ReportSchema 
        headline="Maine Roofing Cost Report: Winter 2025 Market Analysis"
        description="Comprehensive analysis of residential roofing costs in Southern Maine based on project data."
        datePublished={DATE}
        dateModified={DATE}
        url={URL}
        about={['Roofing Costs', 'Asphalt Shingles', 'Metal Roofing']}
        mentions={['Southern Maine', 'Portland', 'Cumberland County']}
      />
      <DatasetSchema 
        name="Maine Residential Roofing Cost Dataset 2025"
        description="Cost ranges by material and roof size for Southern Maine."
        url={URL}
        temporalCoverage="2024-01-01/2025-01-01"
        spatialCoverage="Maine, USA"
        variableMeasured={['Cost per square foot', 'Total replacement cost', 'Material costs']}
      />

      <article className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Maine Roofing Cost Report: <span className="text-blue-700">Winter 2025</span>
          </h1>
          <LastUpdated date={DATE} changeLog={['Updated with Q4 2024 material pricing', 'Added screw-down metal data']} />
        </div>

        <ReportSummaryBox 
          title="Key Market Benchmarks" 
          note="*Prices reflect typical 2,000 sq. ft. roofs in Cumberland/York County. Includes labor, materials, waste, and warranty."
          stats={[
            { label: 'Architectural Shingle', value: '$12k - $18k', description: 'Avg. for standard colonial/ranch homes.' },
            { label: 'Standing Seam Metal', value: '$24k - $35k', description: 'Hidden fastener, 24-gauge PVDF.' },
            { label: 'Screw-Down Metal', value: '$16k - $22k', description: 'Exposed fastener, residential gauge.' },
          ]}
        />

        <div className="prose prose-slate max-w-none mt-12">
          <h2>What Drives Roofing Prices in Maine?</h2>
          <p>Unlike national averages found on Angi or HomeAdvisor, Maine roofing costs are driven by specific regional factors:</p>
          <ul>
            <li><strong>Ice & Water Shield Code:</strong> Maine code often requires extensive ice barrier coverage due to our freeze/thaw cycles, increasing material costs by 15-20% vs southern states.</li>
            <li><strong>Steep Pitch Safety:</strong> Many historic Maine homes have 10/12+ pitches, requiring staging and harnesses, which adds labor time.</li>
            <li><strong>Disposal Fees:</strong> Tipping fees in Southern Maine have risen to ~$145/ton, impacting tear-off costs.</li>
          </ul>

          <h3>Cost Breakdown by Material</h3>
          <div className="not-prose my-8 overflow-hidden rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Material</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price Per Sq Ft</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Lifespan</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 font-medium">Asphalt Shingle (Arch)</td>
                  <td className="px-6 py-4">$6.00 - $9.00</td>
                  <td className="px-6 py-4">25-30 Years</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Standing Seam Metal</td>
                  <td className="px-6 py-4">$12.00 - $18.00</td>
                  <td className="px-6 py-4">50+ Years</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Rubber (EPDM)</td>
                  <td className="px-6 py-4">$10.00 - $14.00</td>
                  <td className="px-6 py-4">20-25 Years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <MethodologyBlock 
          sections={[
            { heading: 'Data Source', content: 'Aggregated from 50+ completed GraniteShield projects and verified supplier price sheets in Cumberland & York Counties.' },
            { heading: 'Inclusions', content: ['Old roof removal & disposal', 'Ice & Water Shield (6ft min)', 'Synthetic underlayment', 'New drip edge & flashing', 'Labor & Insurance'] },
            { heading: 'Exclusions', content: 'Major plywood decking replacement (billed per sheet) and structural rafter repairs.' }
          ]}
        />
      </article>
    </main>
  );
}