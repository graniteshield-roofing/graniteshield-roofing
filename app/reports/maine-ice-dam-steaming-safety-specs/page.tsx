import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { ReportSummaryBox } from '@/components/report-summary-box';
import { LastUpdated } from '@/components/last-updated';
import { ReportSchema, FAQSchema } from '@/components/schema-markup';

const URL = 'https://graniteshieldroofing.com/reports/maine-ice-dam-steaming-safety-specs';
const DATE = '2025-01-01';

export const metadata: Metadata = {
  title: 'Maine Ice Dam Steaming Specs & Safety Standards',
  description: 'Technical specifications for safe ice dam removal. Operating PSI, temperature, and roof protection standards for Maine homes.',
  alternates: { canonical: URL },
};

export default function SteamingSpecsPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <ReportSchema 
        headline="Maine Ice Dam Steaming Safety Specifications"
        description="Technical safety standards for low-pressure steam ice dam removal on asphalt and metal roofs."
        datePublished={DATE}
        dateModified={DATE}
        url={URL}
        about={['Ice Dam Removal', 'Roof Steaming', 'Winter Roofing Safety']}
      />

      <article className="mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
          Ice Dam Steaming: <span className="text-blue-700">Safety Specifications</span>
        </h1>
        <LastUpdated date={DATE} />
        
        <div className="my-8">
          <ReportSummaryBox 
            title="Safe Operating Limits" 
            stats={[
              { label: 'Max Pressure', value: '300 PSI', description: 'High pressure (>1000 PSI) cuts shingles like a knife. Low pressure is critical.' },
              { label: 'Steam Temp', value: '290°F', description: 'Must be actual steam, not just hot water, to melt ice efficiently.' },
              { label: 'GPM Flow', value: '2-3 GPM', description: 'Low water volume prevents flooding the roof deck.' },
            ]}
          />
        </div>

        <div className="prose prose-slate max-w-none">
          <h2>Why Specifications Matter</h2>
          <p>Many &quot;steamers&quot; are actually modified pressure washers. Using high pressure (1000+ PSI) on a frozen asphalt shingle removes the granules, instantly voiding your warranty and reducing the roof&apos;s lifespan. <strong>True steam relies on heat, not force.</strong></p>
          
          <h3>The &quot;White Steam&quot; Test</h3>
          <p>True steamers produce a visible cloud of white wet steam that is safe to touch with a gloved hand at 6 inches distance. Pressure washers produce a clear spray that is dangerous.</p>

          <h3>Surface Protection Protocols</h3>
          <ul>
            <li><strong>Plastic Mallets Only:</strong> Metal tools never touch the shingles.</li>
            <li><strong>Leave a Layer:</strong> We purposefully leave a thin layer of bonded ice/snow rather than scraping down to the asphalt, allowing it to melt naturally.</li>
            <li><strong>Top-Down Melting:</strong> Channels are cut vertically to drain water first, relieving weight load.</li>
          </ul>
        </div>
      </article>
    </main>
  );
}
