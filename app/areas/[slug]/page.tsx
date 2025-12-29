import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  CloudSnow,
  Wind,
  Droplets,
} from 'lucide-react';

import { getTownBySlug, getAllTownSlugs } from '@/lib/towns-data';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { BreadcrumbSchema, FAQSchema } from '@/components/schema-markup';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { loadTownContent } from '@/lib/town-content';

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

  // Try to load markdown content for enhanced metadata
  const markdownContent = loadTownContent(params.slug);

  return {
    title: markdownContent?.metaTitle || `${town.name}, ME Roofing & Exteriors | ${BUSINESS_CONFIG.name}`,
    description: markdownContent?.metaDescription || `GraniteShield Roofing proudly serves ${town.name}, ME with expert roofing, siding, and exterior upgrades. Clean installs. Clear communication. Owner-led quality.`,
    alternates: {
      canonical: `https://graniteshieldroofing.com/areas/${town.slug}`,
    },
  };
}

export default function TownPage({ params }: { params: { slug: string } }) {
  const town = getTownBySlug(params.slug);
  if (!town) return notFound();

  // Load markdown content if available (returns null for fallback to generated content)
  const markdown = loadTownContent(params.slug);

  const baseUrl = 'https://graniteshieldroofing.com';

  // Popular services relevant to this town
  const popularServices = [
    { name: 'Roof Replacement', href: '/services/roof-replacement' },
    {
      name: 'Standing Seam Metal Roofing',
      href: '/services/standing-seam-metal-roofing',
    },
    { name: 'Roof Repair', href: '/services/roof-repair' },
    { name: 'Vinyl Siding', href: '/services/vinyl-siding' },
  ];

  // Town-specific FAQs
  const faqs = [
    {
      question: `Do you serve all of ${town.name}?`,
      answer: `Yes, we serve all neighborhoods and areas throughout ${town.name}, ${town.county} County. Response time is typically 15–30 minutes from our base in Southern Maine.`,
    },
    {
      question: `What roofing challenges are common in ${town.name}?`,
      answer:
        town.climate === 'coastal'
          ? `${town.name} faces coastal weather challenges including salt air corrosion, high wind loads, and wind-driven rain. We design roof and exterior systems specifically for these conditions with proper material selection and installation details.`
          : `${town.name} experiences inland Maine weather including heavy snow loads, ice dams, and extreme temperature fluctuations. We engineer roof systems with proper ventilation, insulation coordination, and ice & water protection.`,
    },
    {
      question: `Do you handle permit requirements for ${town.name}?`,
      answer: `Yes. We're familiar with ${town.name}'s local permitting process and handle all necessary documentation. We'll coordinate inspections and ensure compliance with local building codes.`,
    },
  ];

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

      <FAQSchema faqs={faqs} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-blue-600 text-white border-0">
              Serving {town.county} County
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Roofing & Exterior Experts in {town.name}, ME
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed mb-6">
              {markdown?.quickAnswer || town.directAnswer}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild>
                <Link href={`/lp?service=roof-replacement&town=${town.slug}`}>
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

            <p className="mt-6 flex items-start gap-2 text-slate-300 text-sm">
              <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <span>
                Serving all {town.name} neighborhoods
                {town.neighborhoods && town.neighborhoods.length > 0 && (
                  <> including {town.neighborhoods.join(', ')}</>
                )}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Local Conditions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                {town.climate === 'coastal' ? (
                  <Wind className="h-8 w-8 text-blue-600" />
                ) : (
                  <CloudSnow className="h-8 w-8 text-blue-600" />
                )}
                <h2 className="text-3xl font-bold text-slate-900">
                  Built for {town.name}&apos;s Climate
                </h2>
              </div>

              <p className="text-slate-600 mb-6">
                {town.climate === 'coastal'
                  ? `${town.name}'s coastal location demands specialized roofing and exterior systems. We engineer every installation for salt air resistance, high wind loads, and moisture protection.`
                  : `${town.name}'s inland climate requires robust systems designed for heavy snow loads, ice dam prevention, and extreme temperature swings. We build for Maine winters.`}
              </p>

              <div className="space-y-3">
                {town.localFactors.map((factor, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-lg bg-slate-50"
                  >
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-800">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Popular Services in {town.name}
                </h3>
                <p className="text-slate-600 mb-6">
                  Based on {town.climate === 'coastal' ? 'coastal' : 'inland'}{' '}
                  Maine conditions and homeowner needs.
                </p>

                <div className="space-y-3">
                  {popularServices.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-blue-600 hover:bg-blue-50 transition-colors group"
                    >
                      <span className="font-semibold text-slate-900 group-hover:text-blue-700">
                        {service.name}
                      </span>
                      <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
                    </Link>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <Button variant="cta" size="lg" asChild className="w-full">
                    <Link
                      href={`/lp?service=roof-replacement&town=${town.slug}`}
                    >
                      Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Projects Placeholder */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Recent Projects in {town.name}
          </h2>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Droplets className="h-8 w-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Project Gallery Coming Soon
                  </h3>
                  <p className="text-slate-700 mb-4">
                    We&apos;re working with homeowners in {town.name} to
                    showcase completed roof and exterior projects. Check back
                    soon for before/after photos, project details, and local
                    testimonials.
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Homeowners:</strong> If we completed your project
                    and you&apos;d like to be featured, please contact us. We
                    respect your privacy and only showcase projects with
                    permission.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/*
            OWNER INPUT CHECKLIST for Recent Projects section:
            ================================================
            For each project in this town, provide:
            - [ ] Project address/neighborhood (e.g., "Pine Point area")
            - [ ] Project type (e.g., "Standing seam metal roof replacement")
            - [ ] Completion year (e.g., "2023")
            - [ ] 3-5 before/after photos (high resolution)
            - [ ] Brief project story (2-3 sentences about challenges/solutions)
            - [ ] Homeowner permission (written consent to feature project)
            - [ ] Optional: Homeowner testimonial with first name + neighborhood

            Replace the "Coming Soon" card above with real project cards when ready.
          */}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
            Common Questions About Roofing in {town.name}
          </h2>
          <p className="text-slate-600 text-center mb-10">
            Answers based on local climate, building codes, and homeowner needs
          </p>

          <div className="space-y-5">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-600 mb-4">
              More questions about roofing in {town.name}?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" asChild>
                <Link href={`/lp?service=roof-inspection&town=${town.slug}`}>
                  Schedule Free Inspection
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Get Started in {town.name}?
          </h2>
          <p className="text-lg text-slate-200 mb-8">
            Free inspection, clear estimate, and owner-led accountability from
            estimate to completion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" asChild>
              <Link href={`/lp?service=roof-replacement&town=${town.slug}`}>
                Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
              asChild
            >
              <Link href="/areas">
                View All Service Areas <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-slate-300">
            Also serving nearby towns:{' '}
            <Link href="/areas" className="underline hover:text-white">
              View all Southern Maine coverage
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
