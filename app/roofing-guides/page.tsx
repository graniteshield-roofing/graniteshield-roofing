import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Phone,
  BookOpen,
  Snowflake,
  Wind,
  Droplets,
  Shield,
  Calculator,
  ClipboardCheck,
  CheckCircle2,
  Home,
  Wrench,
  AlertTriangle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG, SITE_URL } from '@/lib/business-config';
import { BreadcrumbSchema } from '@/components/schema-markup';

export const metadata: Metadata = {
  title: `Maine Roofing Guides | Expert Advice from ${BUSINESS_CONFIG.name}`,
  description:
    'Expert roofing guides for Maine homeowners: ice dam prevention, metal vs shingle comparison, cost guides, maintenance tips, and climate-specific advice from experienced contractors.',
  alternates: {
    canonical: 'https://graniteshieldroofing.com/roofing-guides',
  },
  openGraph: {
    title: 'Maine Roofing Guides | GraniteShield Roofing',
    description:
      'Expert roofing guides for Maine homeowners covering ice dam prevention, material selection, costs, and climate-specific best practices.',
    url: 'https://graniteshieldroofing.com/roofing-guides',
    type: 'website',
  },
};

export default function RoofingGuidesPage() {

  // Educational content organized by topic
  const guides = [
    {
      title: 'Ice Dam Problems & Prevention',
      description:
        'Complete guide to ice dam causes, prevention methods, safe removal techniques, and long-term solutions for Maine winters.',
      href: '/problems/ice-dams',
      icon: Snowflake,
      category: 'Maine Climate',
      readTime: '8 min read',
    },
    {
      title: 'Metal vs Shingle Roofing in Maine',
      description:
        'Compare standing seam metal and architectural shingles for Maine climate: lifespan, cost, performance in snow/wind, and best use cases.',
      href: '/roofing-guides/metal-vs-shingle-maine',
      icon: Shield,
      category: 'Material Selection',
      readTime: '10 min read',
      comingSoon: true,
    },
    {
      title: 'Roof Replacement Cost Guide',
      description:
        'Transparent pricing breakdown: what affects roof replacement costs in Maine, financing options, and how to evaluate contractor estimates.',
      href: '/roofing-guides/roof-replacement-cost-maine',
      icon: Calculator,
      category: 'Cost & Budget',
      readTime: '7 min read',
      comingSoon: true,
    },
    {
      title: 'Coastal Roofing Best Practices',
      description:
        'Engineering roofs for coastal Maine: salt air resistance, wind load requirements, material selection, and installation details.',
      href: '/roofing-guides/coastal-roofing-maine',
      icon: Wind,
      category: 'Maine Climate',
      readTime: '9 min read',
      comingSoon: true,
    },
    {
      title: 'Roof Maintenance Checklist',
      description:
        'Seasonal maintenance guide for Maine homeowners: spring, summer, fall, and winter inspections to extend roof lifespan.',
      href: '/roofing-guides/seasonal-maintenance-checklist',
      icon: ClipboardCheck,
      category: 'Maintenance',
      readTime: '6 min read',
      comingSoon: true,
    },
    {
      title: 'How to Choose a Roofing Contractor',
      description:
        'Maine-specific contractor selection guide: license verification, insurance requirements, red flags, and questions to ask.',
      href: '/roofing-guides/choosing-roofing-contractor-maine',
      icon: CheckCircle2,
      category: 'Contractor Selection',
      readTime: '8 min read',
      comingSoon: true,
    },
    {
      title: 'Ventilation & Ice Dam Prevention',
      description:
        'Deep dive into attic ventilation systems: ridge vents, soffit vents, proper airflow, and how ventilation prevents ice dams.',
      href: '/roofing-guides/roof-ventilation-ice-dam-prevention',
      icon: Droplets,
      category: 'Maine Climate',
      readTime: '10 min read',
      comingSoon: true,
    },
    {
      title: 'Storm Damage: Assessment & Insurance',
      description:
        'What to do after a Maine storm: damage documentation, insurance claim process, emergency tarping, and contractor coordination.',
      href: '/roofing-guides/storm-damage-insurance-claims',
      icon: AlertTriangle,
      category: 'Emergency',
      readTime: '7 min read',
      comingSoon: true,
    },
    {
      title: 'Roof Replacement Timeline & Process',
      description:
        'Step-by-step walkthrough: from estimate to completion, what to expect during tear-off, installation, cleanup, and final inspection.',
      href: '/roofing-guides/roof-replacement-process',
      icon: Home,
      category: 'Planning',
      readTime: '8 min read',
      comingSoon: true,
    },
    {
      title: 'DIY vs Professional Roof Repair',
      description:
        'When to DIY and when to call a pro: safety considerations, common repairs homeowners can handle, and when expertise is critical.',
      href: '/roofing-guides/diy-vs-professional-repair',
      icon: Wrench,
      category: 'Repair',
      readTime: '6 min read',
      comingSoon: true,
    },
  ];

  const categories = Array.from(new Set(guides.map((g) => g.category)));

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Maine Roofing Guides',
    description:
      'Educational roofing guides for Maine homeowners covering climate-specific challenges, material selection, costs, and contractor selection.',
    itemListElement: guides
      .filter((g) => !g.comingSoon)
      .map((guide, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: guide.title,
        url: `${SITE_URL}${guide.href}`,
      })),
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Roofing Guides', url: `${SITE_URL}/roofing-guides` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/90 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <BookOpen className="h-4 w-4" />
              Expert Roofing Education
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Maine Roofing Guides
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed mb-6">
              Expert advice from experienced Maine roofing contractors.
              Learn about ice dam prevention, material selection, costs,
              maintenance, and climate-specific best practices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild>
                <Link href="/instant-quote">
                  Get Instant Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="default" size="lg" asChild>
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
                  Ask an Expert
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES FILTER (Simple visual organization) */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <div className="text-sm font-semibold text-slate-700">
              Topics:
            </div>
            {categories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white border border-slate-200 text-slate-700"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDES GRID */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Card
                  key={guide.href}
                  className={`h-full ${guide.comingSoon ? 'opacity-75' : ''}`}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-slate-800" />
                      </div>
                      {guide.comingSoon && (
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-semibold">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                        {guide.category}
                      </span>
                      <span className="text-xs text-slate-500">
                        • {guide.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                      {guide.title}
                    </h2>

                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {guide.description}
                    </p>

                    <div className="mt-auto">
                      {guide.comingSoon ? (
                        <div className="w-full py-2 text-center text-sm text-slate-500">
                          Guide in development
                        </div>
                      ) : (
                        <Button className="w-full" asChild>
                          <Link href={guide.href}>
                            Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* AUTHOR/EXPERTISE SECTION (E-E-A-T) */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Written by Maine Roofing Experts
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    These guides are written and reviewed by{' '}
                    <Link
                      href="/about"
                      className="font-semibold text-blue-700 hover:underline"
                    >
                      Justin Laflamme
                    </Link>
                    , founder of GraniteShield Roofing, with over a decade of
                    hands-on experience installing, repairing, and maintaining
                    roofs across Southern Maine.
                  </p>
                  <p className="text-sm text-slate-600">
                    All content reflects real-world Maine conditions: coastal
                    salt air, heavy snow loads, ice dam challenges, and
                    freeze-thaw cycles. We focus on practical advice based on
                    actual installations, not generic roofing theory.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Have a Specific Roofing Question?
          </h2>
          <p className="text-lg text-slate-200 mb-8">
            Schedule a free inspection and get expert advice tailored to your
            home, roof condition, and Maine weather challenges.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" asChild>
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
                Call Expert
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
