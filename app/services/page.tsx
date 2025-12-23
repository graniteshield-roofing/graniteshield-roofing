// app/services/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Home,
  Wrench,
  ClipboardCheck,
  Snowflake,
  Zap,
  Shield,
  PanelsTopLeft,
  LayoutGrid,
  AppWindow,
  Phone,
  MapPin,
  Layers,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { BreadcrumbSchema } from '@/components/schema-markup';

export const metadata: Metadata = {
  title: `Roofing, Siding & Window Services in Southern Maine | ${BUSINESS_CONFIG.name}`,
  description:
    'Explore GraniteShield’s roofing and exterior services in Southern Maine: roof replacement, roof repair, shingle roofing, standing seam metal roofing, roof inspections, ice dam removal, siding, emergency repairs, and window replacement. Owner-operated quality, clean installs, and fast estimates.',
  alternates: { canonical: 'https://graniteshieldroofing.com/services' },
};

type ServiceCard = {
  title: string;
  description: string;
  href: string;
  icon: any;
  highlights: string[];
};

export default function ServicesPage() {
  const baseUrl = 'https://graniteshieldroofing.com';

  // Light geo reinforcement (keep short + real)
  const serviceAreas = [
    'Portland',
    'Scarborough',
    'South Portland',
    'Westbrook',
    'Cape Elizabeth',
    'Falmouth',
    'Yarmouth',
    'Biddeford',
    'Saco',
    'Auburn',
    'Turner',
  ];

  // ✅ Best conversion order for Maine (highest-intent first)
  const services: ServiceCard[] = [
    {
      title: 'Roof Replacement',
      description:
        'Complete tear-off and replacement with system-level details built for Maine weather.',
      href: '/services/roof-replacement',
      icon: Home,
      highlights: [
        'Ice & water protection',
        'Flashing + ventilation',
        'Clean install + cleanup',
      ],
    },
    {
      title: 'Roof Repair',
      description:
        'Leak repairs, storm damage, flashing fixes, and fast response to protect your home.',
      href: '/services/roof-repair',
      icon: Wrench,
      highlights: [
        'Leak detection',
        'Storm damage repair',
        'Emergency tarping',
      ],
    },
    {
      title: 'Shingle Roofing',
      description:
        'Architectural shingle systems installed with clean flashing, ventilation (when applicable), and tight detailing.',
      href: '/services/shingle-roofing',
      icon: Layers,
      highlights: [
        'Architectural shingles',
        'Flashing + ventilation',
        'Clean install + cleanup',
      ],
    },
    {
      title: 'Standing Seam Metal Roofing',
      description:
        'Premium standing seam systems engineered for Maine snow, wind, and coastal conditions.',
      href: '/services/standing-seam-metal-roofing',
      icon: PanelsTopLeft,
      highlights: [
        'Long lifespan',
        'Low maintenance',
        'Modern architectural look',
      ],
    },
    {
      title: 'Emergency Repair',
      description:
        'Fast response for urgent leaks and storm damage to stabilize and protect your home.',
      href: '/services/emergency-repair',
      icon: Zap,
      highlights: [
        'Rapid response',
        'Temporary protection',
        'Damage documentation',
      ],
    },
    {
      title: 'Roof Inspection',
      description:
        'Professional inspections with photo documentation and clear recommendations.',
      href: '/services/roof-inspection',
      icon: ClipboardCheck,
      highlights: ['Condition assessment', 'Photo notes', 'Clear next steps'],
    },
    {
      title: 'Ice Dam Removal',
      description:
        'Winter services to reduce ice dam risk and help prevent cold-weather water intrusion.',
      href: '/services/ice-dam-removal',
      icon: Snowflake,
      highlights: [
        'Emergency support',
        'Leak mitigation',
        'Prevention guidance',
      ],
    },
    {
      title: 'Vinyl Siding',
      description:
        'Premium vinyl siding installs with clean detailing and tight moisture management.',
      href: '/services/vinyl-siding',
      icon: LayoutGrid,
      highlights: [
        'Curb appeal upgrade',
        'Low maintenance',
        'Full trim integration',
      ],
    },
    {
      title: 'Metal Siding',
      description:
        'Steel & aluminum siding systems built for durability, wind resistance, and clean lines.',
      href: '/services/metal-siding',
      icon: Shield,
      highlights: [
        'Durable finishes',
        'Coastal-ready options',
        'Modern profiles',
      ],
    },
    {
      title: 'Windows',
      description:
        'Window replacement and exterior integration for energy efficiency and clean finishes.',
      href: '/services/windows',
      icon: AppWindow,
      highlights: [
        'Energy-efficient options',
        'Trim + flashing details',
        'Exterior integration',
      ],
    },
  ];

  // Schema: Services hub list (helps crawlers + AI understand structure)
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Roofing & Exterior Services in Southern Maine',
    itemListElement: services.map((s, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: s.title,
      url: `${baseUrl}${s.href}`,
    })),
  };

  // Schema: Catalog (clean semantics)
  const offerCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'GraniteShield Roofing & Exteriors — Services',
    url: `${baseUrl}/services`,
    provider: {
      '@type': 'RoofingContractor',
      name: BUSINESS_CONFIG.name,
      // ✅ Use raw phone for structured data
      telephone: BUSINESS_CONFIG.contact.phoneRaw,
      url: baseUrl,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Southern Maine' },
      ...serviceAreas.map((city) => ({ '@type': 'City', name: `${city}, ME` })),
    ],
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        url: `${baseUrl}${s.href}`,
        description: s.description,
      },
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Services', url: `${baseUrl}/services` },
        ]}
      />

      {/* JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
      />

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Owner-Operated Quality
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Roofing, Siding &amp; Window Services in Southern Maine
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed">
              Full-service exterior work across Southern Maine — roof
              replacement, roof repair, shingle roofing, standing seam metal
              roofing, inspections, ice dam removal, siding, windows, and
              emergency repairs. Clean installs, clear communication, and real
              accountability.
            </p>

            <p className="mt-4 text-slate-300 flex items-start gap-2">
              <MapPin className="h-5 w-5 text-slate-300 mt-0.5 flex-shrink-0" />
              <span>
                Serving: {serviceAreas.slice(0, 8).join(', ')} and surrounding
                towns.
              </span>
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="cta" asChild>
                <Link href="/lp">
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
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.href} className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-slate-800" />
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                      {s.title}
                    </h2>
                    <p className="text-slate-600 mb-4">{s.description}</p>

                    <ul className="space-y-2 mb-6">
                      {s.highlights.map((h) => (
                        <li
                          key={h}
                          className="text-sm text-slate-600 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      <Button className="w-full" asChild>
                        <Link href={s.href}>
                          View Service <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Not sure which service you need?
                </h3>
                <p className="text-slate-600">
                  Tell us what’s going on — we’ll route you to the right
                  solution fast.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Button size="lg" variant="cta" asChild>
                  <Link href="/lp">
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
      </section>
    </>
  );
}
