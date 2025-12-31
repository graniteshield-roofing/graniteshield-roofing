import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { LastUpdated } from '@/components/last-updated';
import { HowToSchema } from '@/components/schema-markup';

const URL = 'https://graniteshieldroofing.com/reports/maine-winter-roofing-response-times-and-process';

export const metadata: Metadata = {
  title: 'Maine Winter Roofing Emergency Response Process',
  description: 'Our winter triage criteria and expected response times for active leaks vs snow load issues.',
  alternates: { canonical: URL },
};

export default function ResponseTimePage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <HowToSchema 
        name="How to Handle a Winter Roof Emergency"
        description="Step-by-step process for homeowners facing active leaks or ice dams in Maine."
        url={URL}
        steps={[
          { name: 'Contain Interior Damage', text: 'Place buckets and move furniture. Do not climb on the roof.' },
          { name: 'Document for Insurance', text: 'Take photos of interior damage and exterior ice buildup from the ground.' },
          { name: 'Call for Triage', text: 'Contact GraniteShield. State if water is actively entering living space.' }
        ]}
      />

      <article className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
          Winter Response Times & <span className="text-blue-700">Triage Process</span>
        </h1>
        <LastUpdated date="2025-01-01" />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h3 className="text-red-900 font-bold uppercase text-sm mb-2">Priority 1: Critical</h3>
            <p className="font-bold text-2xl text-slate-900 mb-2">2 - 6 Hours</p>
            <p className="text-sm text-slate-700">Active interior water intrusion. Ceiling collapse risk. Electrical hazard.</p>
          </div>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <h3 className="text-orange-900 font-bold uppercase text-sm mb-2">Priority 2: Urgent</h3>
            <p className="font-bold text-2xl text-slate-900 mb-2">24 - 48 Hours</p>
            <p className="text-sm text-slate-700">Severe ice dams without active leaks. Visible structural strain.</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="text-blue-900 font-bold uppercase text-sm mb-2">Priority 3: Standard</h3>
            <p className="font-bold text-2xl text-slate-900 mb-2">3 - 7 Days</p>
            <p className="text-sm text-slate-700">Preventative snow removal. Routine inspections. Non-urgent assessments.</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none mt-12">
          <h2>The Triage Workflow</h2>
          <p>During Maine winter storms, call volume spikes. We prioritize safety and property preservation.</p>
          <ol>
            <li><strong>Intake:</strong> We verify address and access (is the driveway plowed?).</li>
            <li><strong>Remote Assessment:</strong> We may ask for photos to determine equipment needs (steamer vs shovels).</li>
            <li><strong>Dispatch:</strong> Teams are routed geographically to maximize stops per day.</li>
          </ol>
        </div>
      </article>
    </main>
  );
}
