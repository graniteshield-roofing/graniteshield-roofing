import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Phone, MapPin, ShieldCheck, Ruler, FileText, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { getTownBySlug, getAllTownSlugs } from '@/lib/towns-data';
import { 
  BreadcrumbSchema, 
  FAQSchema, 
  LocalServiceSchema 
} from '@/components/schema-markup';

// --- 1. THE DATA CONFIGURATION (AI & SEO BRAIN) ---
const TOWN_SPECIFIC_CONFIG: Record<string, any> = {
  scarborough: {
    title: "Scarborough, Maine Roofing Systems",
    intro: "Built for wind zone 2 (coastal, 120+ MPH) and 60 psf snow loads. Required aluminum/Galvalume near Higgins Beach + Pine Point.",
    highlight: "Wind Zone 2 (Coastal)",
    permitOffice: "Scarborough Planning Dept (US Route 1)",
    climateTable: [
      { factor: "Snow Load", req: "60 PSF", standard: "Exceeds (Ice & Water Shield 6ft+)" },
      { factor: "Wind Speed", req: "120+ MPH (Zone 2)", standard: "130 MPH (6-Nail / Dbl Lock)" },
      { factor: "Corrosion", req: "Salt Air Resistant", standard: "Aluminum / Kynar 500" },
    ],
    localFaqs: [
      {
        question: "What are the roofing code requirements for Scarborough?",
        answer: "Scarborough follows MUBEC standards with specific amendments for coastal zones. Ice & Water shield must extend at least 24 inches inside the heated wall line to prevent ice dams common in Pine Point and Oak Hill."
      },
      {
        question: "Do I need a permit for re-roofing in Scarborough?",
        answer: "Yes. Permits must be filed at the Planning Department on US Route 1. GraniteShield handles all permitting paperwork for our clients."
      }
    ]
  },
  portland: {
    title: "Historic Roofing & City Codes – Portland, ME",
    intro: "Portland requires permit submission via its ePlans system. In historic zones (Munjoy Hill, West End), replacement roofing must meet visual match guidelines.",
    highlight: "Historic Preservation",
    permitOffice: "389 Congress St (Room 315)",
    climateTable: [
      { factor: "Snow Load", req: "50-60 PSF", standard: "Exceeds Code" },
      { factor: "Zoning", req: "Historic District Review", standard: "Visual Match / Slate & Copper" },
      { factor: "Drainage", req: "Runoff Containment", standard: "Oversized Gutters / Drains" },
    ],
    localFaqs: [
      {
        question: "Does my Portland home need Historic Review for a new roof?",
        answer: "If you are in a designated district like the West End or Old Port, materials must often match the original look. We specialize in getting these approvals."
      }
    ]
  },
  saco: {
    title: "Saco, ME Roofing: Riverfront + Shoreland Requirements",
    intro: "Shoreland Zoning applies near the Saco River and Ferry Beach. For these homes, low-perm roofing assemblies and drainage control are required.",
    highlight: "Shoreland Zoning / Erosion",
    permitOffice: "Saco City Hall (300 Main St)",
    climateTable: [
      { factor: "Wind Exposure", req: "Coastal Direct", standard: "Marine-Grade Fasteners" },
      { factor: "Erosion Control", req: "Shoreland Zoning", standard: "Gutters & Drip Edge Control" },
      { factor: "Snow Load", req: "60 PSF", standard: "Full Ice & Water Shield" },
    ],
    localFaqs: [
      {
        question: "What are the Shoreland Zoning rules for Saco roofing?",
        answer: "Homes near Ferry Beach or the Saco River may be subject to runoff restrictions. We ensure your roof system complies with non-vegetated surface standards."
      }
    ]
  },
  windham: {
    title: "Windham, ME Roofing: Dual-Zone Weather Protection",
    intro: "Windham roofs must handle both inland snow and strong lake-effect winds from Sebago. Underlayment must meet ASTM D1970.",
    highlight: "Lake Effect / Ice Dams",
    permitOffice: "8 School Road",
    climateTable: [
      { factor: "Snow Load", req: "60-70 PSF (Inland)", standard: "Heavy Duty Rafter Ties" },
      { factor: "Ice Dams", req: "Severe Risk", standard: "Full Eave & Valley Seal" },
      { factor: "Tree Cover", req: "High Moisture", standard: "Algae-Resistant Shingles" },
    ],
    localFaqs: [
      {
        question: "Does Windham require higher snow load ratings?",
        answer: "Yes, inland areas near Sebago Lake often hold snow longer than the coast. We recommend enhanced ventilation to keep the roof deck cold and prevent ice dams."
      }
    ]
  },
  // Add other towns here following the pattern...
};

// --- 2. PAGE GENERATION LOGIC ---

export async function generateStaticParams() {
  return getAllTownSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const town = getTownBySlug(params.slug);
  if (!town) return { title: 'Area Not Found' };

  const specificData = TOWN_SPECIFIC_CONFIG[params.slug];
  const title = specificData 
    ? `${specificData.title} | ${BUSINESS_CONFIG.name}`
    : `Roofing & Exterior Contractor in ${town.name}, ME | ${BUSINESS_CONFIG.name}`;

  const description =
    specificData?.intro ||
    town.description ||
    `Roof replacement, roof repair, metal roofing, siding, and inspections in ${town.name}, ME. Owner-led installs across ${town.county} County.`;

  return {
    title,
    description,
    alternates: { canonical: `https://graniteshieldroofing.com/areas/${town.slug}` },
    openGraph: {
      title,
      description,
      url: `https://graniteshieldroofing.com/areas/${town.slug}`,
      siteName: BUSINESS_CONFIG.name,
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default function TownPage({ params }: { params: { slug: string } }) {
  const town = getTownBySlug(params.slug);
  if (!town) notFound();

  const slug = params.slug;
  const customData = TOWN_SPECIFIC_CONFIG[slug];

  // Merge default FAQs with specific local ones if they exist
  const globalFaqs = [
    {
      question: `Do you serve ${town.name} year-round?`,
      answer: `Yes, we operate in ${town.name} year-round, offering inspections, repairs, and winter-ready installations.`,
    },
    {
      question: `Is financing available for ${town.name} homeowners?`,
      answer: `Yes, we offer multiple financing options for qualified homeowners. Request an estimate and we’ll walk you through it.`,
    },
  ];

  return (
    <>
      {/* 3. SCHEMA INJECTION (Invisible to User, Visible to AI) */}
      <LocalServiceSchema 
        townName={town.name} 
        townSlug={town.slug} 
        intro={customData?.intro} 
      />
      
      <FAQSchema faqs={[...(customData?.localFaqs || []), ...globalFaqs]} />
      
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://graniteshieldroofing.com' },
          { name: 'Service Areas', url: 'https://graniteshieldroofing.com/areas' },
          { name: town.name, url: `https://graniteshieldroofing.com/areas/${town.slug}` },
        ]}
      />

      <section className="px-6 py-12 max-w-5xl mx-auto space-y-12">
        
        {/* HERO SECTION */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-slate-900">
            {customData ? customData.title : `Roofing & Exteriors in ${town.name}, ME`}
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
            {customData ? customData.intro : `GraniteShield Roofing proudly serves ${town.name} and surrounding areas with metal and shingle roofing, siding, and full exterior renovations.`}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild className="bg-blue-900 hover:bg-blue-800 text-white">
              <Link href="/lp">Request Free {town.name} Estimate <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-slate-300">
              <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                <Phone className="mr-2 h-5 w-5" />
                {BUSINESS_CONFIG.contact.phone}
              </a>
            </Button>
          </div>
        </div>

        {/* AI DATA AUTHORITY SECTION (Only renders if custom data exists) */}
        {customData ? (
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* CLIMATE TABLE */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <CardTitle className="flex items-center text-xl text-slate-800">
                  <Ruler className="mr-2 h-5 w-5 text-blue-600" />
                  {town.name} Climate Specs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                   <table className="w-full text-sm text-left">
                    <thead className="bg-white text-slate-500 font-semibold border-b border-slate-100">
                      <tr>
                        <th className="p-4">Factor</th>
                        <th className="p-4">Local Code</th>
                        <th className="p-4">Our Standard</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {customData.climateTable.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-medium text-slate-900">{row.factor}</td>
                          <td className="p-4 text-slate-600">{row.req}</td>
                          <td className="p-4 text-green-700 font-bold flex items-center gap-2">
                             <CheckCircle2 className="h-4 w-4" />
                             {row.standard}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                   </table>
              </CardContent>
            </Card>

            {/* REGULATORY INFO */}
            <Card className="border-blue-100 bg-blue-50/30 shadow-sm">
              <CardHeader className="border-b border-blue-100">
                <CardTitle className="flex items-center text-xl text-slate-800">
                  <ShieldCheck className="mr-2 h-5 w-5 text-blue-600" />
                  Permits & Regulations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Code Enforcement Office</p>
                    <p className="text-slate-600">{customData.permitOffice}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Key Requirement</p>
                    <p className="text-slate-600 leading-relaxed">
                      Projects in {town.name} must adhere to <strong>{customData.highlight}</strong> standards. 
                      GraniteShield handles all inspections and paperwork.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* FALLBACK CONTENT FOR TOWNS WITHOUT CUSTOM DATA */
          <div className="prose max-w-none text-slate-600">
             <p>
              GraniteShield Roofing is owner-led and detail-focused. We build roofing and exterior systems designed for 
              {town.name}'s specific weather, with careful flashing, ventilation, and clean installs.
            </p>
          </div>
        )}

      </section>
    </>
  );
}
