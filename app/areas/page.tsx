import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, MapPin, Phone } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { BreadcrumbSchema } from '@/components/schema-markup';
import { getAllTownSlugs, getTownBySlug } from '@/lib/towns-data';

export const metadata: Metadata = {
  title: `Service Areas in Southern Maine | ${BUSINESS_CONFIG.name}`,
  description:
    'GraniteShield Roofing & Exteriors serves homeowners across Southern Maine with shingle roofing, roof replacement, roof repair, standing seam metal roofing, siding, windows, inspections, and emergency repairs. View towns we serve and request a free estimate.',
  alternates: { canonical: 'https://graniteshieldroofing.com/areas' },
};

export default function AreasPage() {
  const baseUrl = 'https://graniteshieldroofing.com';

  const townSlugs = getAllTownSlugs();
  const towns = townSlugs
    .map((slug) => getTownBySlug(slug))
    .filter(Boolean) as Array<{
    slug: string;
    name: string;
    county?: string;
    state?: string;
    nearby?: string[];
  }>;

  const quickTowns = [
    'Cumberland Center',
    'Portland',
    'Scarborough',
    'Falmouth',
    'Yarmouth',
    'Cape Elizabeth',
    'South Portland',
    'Westbrook',
    'Biddeford',
    'Saco',
    'Auburn',
    'Turner',
  ];

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'GraniteShield Service Areas',
    itemListElement: towns.map((t, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${t.name}, ME`,
      url: `${baseUrl}/areas/${t.slug}`,
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Service Areas', url: `${baseUrl}/areas` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section className="bg-gradient-to-br from-slate-950 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Local, Owner-Operated Contractor
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Service Areas in Southern Maine
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed">
              GraniteShield Roofing &amp; Exteriors serves homeowners across
              Southern Maine with shingle roofing, roof replacement, roof
              repair, standing seam metal roofing, siding, windows, inspections,
              and emergency repairs — built for Maine weather with clean
              installs and real accountability.
            </p>

            <p className="mt-4 text-slate-300 flex items-start gap-2">
              <MapPin className="h-5 w-5 text-slate-300 mt-0.5 flex-shrink-0" />
              <span>
                Common areas: {quickTowns.slice(0, 8).join(', ')} and
                surrounding towns.
              </span>
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="cta" asChild>
                <Link href="/lp?service=roof-replacement">
                  Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
                asChild
              >
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {BUSINESS_CONFIG.contact.phone}
                </a>
              </Button>
            </div>

            <div className="mt-4 text-slate-300 text-sm">
              Need shingles?{' '}
              <Link
                href="/lp?service=shingle-roofing"
                className="underline hover:text-white"
              >
                Request a shingle roofing estimate
              </Link>
              .
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900">
              Towns We Serve
            </h2>
            <p className="mt-3 text-slate-600">
              Select your town to see service details, local FAQs, and a fast
              way to request an estimate.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {towns.map((t) => (
              <Card key={t.slug} className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-slate-800" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {t.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {t.county ? `${t.county} County` : 'Southern Maine'} •
                        ME
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-slate-600 text-sm">
                    Roofing and exterior services built for Maine conditions —
                    clean installs, clear communication, owner oversight.
                  </p>

                  <div className="mt-auto pt-6">
                    <Button className="w-full" asChild>
                      <Link href={`/areas/${t.slug}`}>
                        View {t.name} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <Card>
              <CardContent className="p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Don’t see your town listed?
                  </h3>
                  <p className="text-slate-600">
                    Call us — we’ll confirm service availability and next steps
                    quickly.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <Button size="lg" variant="cta" asChild>
                    <Link href="/lp?service=roof-replacement">
                      Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <Button size="lg" variant="outline" asChild>
                    <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
