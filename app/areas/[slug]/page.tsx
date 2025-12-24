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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
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
      postalCode: '04074',
      addressCountry: 'US',
    },
    telephone: BUSINESS_CONFIG.contact.phoneRaw,
    url: `${baseUrl}/areas/${town.slug}`,
    areaServed: {
      '@type': 'Place',
      name: `${town.name}, ME`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Service Areas',
        item: `${baseUrl}/areas`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${town.name}, ME`,
        item: `${baseUrl}/areas/${town.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Service Areas', url: `${baseUrl}/areas` },
          { name: `${town.name}, ME`, url: `${baseUrl}/areas/${town.slug}` },
        ]}
      />
      <section className="px-6 py-12 max-w-6xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Trusted Roofing Services in {town.name}, ME
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Roofing & Exterior Experts in {town.name}
          </h1>
          <p className="text-lg text-slate-300">
            We deliver owner-led, high-quality roofing, siding, and window installs tailored for {town.name}, ME — with
            wind-resistant materials, clean lines, and clear communication.
          </p>
          <p className="text-slate-400 flex items-start gap-2">
            <MapPin className="h-5 w-5 mt-1" />
            Proudly serving {town.county} County and surrounding communities.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/lp?service=roof-replacement">
            <div className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg hover:brightness-90 transition">
              Get Free Estimate <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
          <a
            href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
          >
            <Phone className="h-5 w-5" />
            {BUSINESS_CONFIG.contact.phone}
          </a>
        </div>
      </section>
    </>
  );
}
