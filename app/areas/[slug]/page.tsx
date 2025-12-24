import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  Phone,
  MapPin,
  ShieldCheck,
  Ruler,
  FileText,
  CheckCircle2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { getTownBySlug, getAllTownSlugs } from '@/lib/towns-data';
import {
  BreadcrumbSchema,
  FAQSchema,
  LocalServiceSchema,
} from '@/components/schema-markup';

/* -------------------------------------------------------------------------- */
/* 1. TOWN-SPECIFIC DATA (AI + SEO AUTHORITY LAYER)                              */
/* -------------------------------------------------------------------------- */

const TOWN_SPECIFIC_CONFIG: Record<
  string,
  {
    title: string;
    intro: string;
    highlight: string;
    permitOffice: string;
    climateTable: {
      factor: string;
      req: string;
      standard: string;
    }[];
    localFaqs: { question: string; answer: string }[];
  }
> = {
  scarborough: {
    title: 'Scarborough, Maine Roofing Systems',
    intro:
      'Engineered for coastal Wind Zone 2 exposure (120+ MPH gusts) and 60 psf ground snow loads. Galvalume or aluminum roofing is recommended within one mile of Pine Point and Higgins Beach.',
    highlight: 'Wind Zone 2 (Coastal)',
    permitOffice: 'Scarborough Planning Department (US Route 1)',
    climateTable: [
      {
        factor: 'Snow Load',
        req: '50–60 PSF (Cumberland County)',
        standard: 'Ice & Water Shield extending 24"+ past heated wall line',
      },
      {
        factor: 'Wind Resistance',
        req: 'ASCE 7‑16 / 120+ MPH',
        standard: '130 MPH rated fastening & locking systems',
      },
      {
        factor: 'Salt Air Corrosion',
        req: 'Coastal Exposure',
        standard: 'Aluminum or Kynar 500® coated steel',
      },
    ],
    localFaqs: [
      {
        question: 'Do I need a permit to replace my roof in Scarborough?',
        answer:
          'Yes. Scarborough requires a building permit for roof replacement or re-roofing, filed through the Planning Department on US Route 1. GraniteShield manages all permitting and inspections.',
      },
      {
        question: 'What ice dam protection is required in Scarborough?',
        answer:
          'Per Maine Uniform Building and Energy Code (MUBEC), Ice & Water Shield must extend a minimum of 24 inches inside the heated wall line to protect against ice dam damage.',
      },
    ],
  },

  portland: {
    title: 'Portland, ME Roofing & Historic District Compliance',
    intro:
      'Portland roofing projects must meet MUBEC standards and additional Historic Preservation guidelines in districts such as the West End, Munjoy Hill, and Old Port.',
    highlight: 'Historic Preservation Review',
    permitOffice: 'Portland Permitting & Inspections (389 Congress St)',
    climateTable: [
      {
        factor: 'Snow Load',
        req: '50–60 PSF',
        standard: 'Full eave Ice & Water Shield coverage',
      },
      {
        factor: 'Historic Districts',
        req: 'Visual Material Match',
        standard: 'Slate‑look, copper, or approved architectural systems',
      },
      {
        factor: 'Urban Drainage',
        req: 'Runoff Control',
        standard: 'Oversized gutters & controlled discharge',
      },
    ],
    localFaqs: [
      {
        question: 'Does Portland require historic approval for roofing?',
        answer:
          'Homes located in designated historic districts often require review to ensure roofing materials match the historic character. We assist homeowners with approvals and compliance.',
      },
    ],
  },

  saco: {
    title: 'Saco, ME Roofing: Shoreland & Riverfront Requirements',
    intro:
      'Homes near the Saco River, Ferry Beach, and coastal zones are subject to Shoreland Zoning rules impacting runoff, erosion control, and roofing assembly selection.',
    highlight: 'Shoreland Zoning Compliance',
    permitOffice: 'Saco Code Enforcement (300 Main St)',
    climateTable: [
      {
        factor: 'Wind Exposure',
        req: 'Coastal / Riverfront',
        standard: 'Marine‑grade fasteners & sealed transitions',
      },
      {
        factor: 'Snow Load',
        req: 'Up to 60 PSF',
        standard: 'Full Ice & Water Shield system',
      },
      {
        factor: 'Runoff Control',
        req: 'Shoreland Ordinance',
        standard: 'Drip edge & gutter discharge management',
      },
    ],
    localFaqs: [
      {
        question: 'Are there special rules for roofing near the Saco River?',
        answer:
          'Yes. Shoreland Zoning may limit runoff and require additional erosion controls. Our roofing systems are designed to meet these standards.',
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 2. STATIC GENERATION                                                         */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return getAllTownSlugs().map((slug) => ({ slug }));
}

/* -------------------------------------------------------------------------- */
/* 3. METADATA (SEO + AI)                                                        */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const town = getTownBySlug(params.slug);
  if (!town) return { title: 'Area Not Found' };

  const local = TOWN_SPECIFIC_CONFIG[params.slug];

  const title = local
    ? `${local.title} | ${BUSINESS_CONFIG.name}`
    : `Roofing & Exterior Contractor in ${town.name}, ME | ${BUSINESS_CONFIG.name}`;

  const description =
    local?.intro ||
    town.description ||
    `Roof replacement, roof repair, metal roofing, siding, and inspections in ${town.name}, ME.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://graniteshieldroofing.com/areas/${town.slug}`,
    },
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

/* -------------------------------------------------------------------------- */
/* 4. PAGE COMPONENT                                                            */
/* -------------------------------------------------------------------------- */

export default function TownPage({ params }: { params: { slug: string } }) {
  const town = getTownBySlug(params.slug);
  if (!town) notFound();

  const local = TOWN_SPECIFIC_CONFIG[params.slug];

  const globalFaqs = [
    {
      question: `Do you serve ${town.name} year‑round?`,
      answer: `Yes. GraniteShield Roofing serves ${town.name} throughout the year, including winter inspections, repairs, and scheduled replacements.`,
    },
    {
      question: `Is financing available in ${town.name}?`,
      answer:
        'Yes. We offer multiple financing options for qualified homeowners to make roofing and exterior upgrades more affordable.',
    },
  ];

  return (
    <>
      {/* ---------------- SCHEMA (INVISIBLE, HIGH VALUE) ---------------- */}
      <LocalServiceSchema
        townName={town.name}
        townSlug={town.slug}
        intro={local?.intro}
      />
      <FAQSchema faqs={[...(local?.localFaqs || []), ...globalFaqs]} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://graniteshieldroofing.com' },
          {
            name: 'Service Areas',
            url: 'https://graniteshieldroofing.com/areas',
          },
          {
            name: town.name,
            url: `https://graniteshieldroofing.com/areas/${town.slug}`,
          },
        ]}
      />

      {/* ---------------- PAGE CONTENT ---------------- */}
      <section className="px-6 py-12 max-w-6xl mx-auto space-y-12">
        {/* HERO */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-slate-900">
            {local?.title || `Roofing & Exteriors in ${town.name}, ME`}
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl">
            {local?.intro ||
              `GraniteShield Roofing provides owner-led roofing and exterior services in ${town.name}, built for Maine weather and local code requirements.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href="/lp">
                Get Free {town.name} Estimate{' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                <Phone className="mr-2 h-5 w-5" />
                {BUSINESS_CONFIG.contact.phone}
              </a>
            </Button>
          </div>
        </div>

        {/* DATA AUTHORITY SECTION */}
        {local && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-blue-600" />
                  {town.name} Climate & Code Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="p-4 text-left">Factor</th>
                      <th className="p-4 text-left">Local Requirement</th>
                      <th className="p-4 text-left">Our Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    {local.climateTable.map((row, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-4 font-medium">{row.factor}</td>
                        <td className="p-4">{row.req}</td>
                        <td className="p-4 text-green-700 font-semibold flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          {row.standard}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  Permits & Regulations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">Permit Office</p>
                    <p className="text-slate-600">{local.permitOffice}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-blue-600 mt-1" />
                  <p className="text-slate-600">
                    Roofing projects must comply with{' '}
                    <strong>{local.highlight}</strong>. GraniteShield manages all
                    documentation and inspections.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </>
  );
}
