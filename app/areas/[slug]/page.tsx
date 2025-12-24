import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Phone, ArrowRight } from 'lucide-react';

import { getTownBySlug, getAllTownSlugs } from '@/lib/towns-data';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { BreadcrumbSchema } from '@/components/schema-markup';

export async function generateStaticParams() {
  return getAllTownSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const town = getTownBySlug(params.slug);
  if (!town) return {};

  return {
    title: `${town.name}, ME Roofing & Exteriors | ${BUSINESS_CONFIG.name}`,
    description: `GraniteShield Roofing proudly serves ${town.name}, ME with expert roofing, siding, and exterior upgrades. Clean installs. Clear communication. Owner-led quality.`,
    alternates: {
      canonical: `https://graniteshieldroofing.com/areas/${town.slug}`,
    },
  };
}

export default function TownPage({ params }: { params: { slug: string } }) {
  const town = getTownBySlug(params.slug);
  if (!town) return notFound();

  const baseUrl = 'https://graniteshieldroofing.com';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_CONFIG.name,
    image: BUSINESS_CONFIG.branding.logoUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: town.name,
      addressRegion: 'ME',
      addressCountry: 'US',
    },
    telephone: BUSINESS_CONFIG.contact.phoneRaw,
    url: `${baseUrl}/areas/${town.slug}`,
    areaServed: {
      '@type': 'Place',
      name: `${town.name}, ME`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Service Areas', url: `${baseUrl}/areas` },
          { name: `${town.name}, ME`, url: `${baseUrl}/areas/${town.slug}` },
        ]}
      />

      <section className="px-6 py-12 max-w-6xl mx-auto space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">
            Roofing & Exterior Experts in {town.name}, ME
          </h1>

          <p className="text-slate-600">
            Owner-led roofing, siding, and exterior installations built for
            Maine’s climate — clean installs, strong materials, and real
            accountability.
          </p>

          <p className="flex items-center gap-2 text-slate-500">
            <MapPin className="h-5 w-5" />
            Serving {town.county} County and surrounding areas
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/lp?service=roof-replacement">
            <div className="inline-flex items-center gap-2 bg-yellow-400 px-6 py-3 font-semibold rounded-lg">
              Get Free Estimate <ArrowRight className="h-5 w-5" />
            </div>
          </Link>

          <a
            href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
            className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg"
          >
            <Phone className="h-5 w-5" />
            {BUSINESS_CONFIG.contact.phone}
          </a>
        </div>
      </section>
    </>
  );
}
