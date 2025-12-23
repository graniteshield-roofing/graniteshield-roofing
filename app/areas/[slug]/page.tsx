import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Phone, MapPin, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { getTownBySlug, getAllTownSlugs } from '@/lib/towns-data';
import { BreadcrumbSchema, FAQSchema } from '@/components/schema-markup';

export async function generateStaticParams() {
  return getAllTownSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const town = getTownBySlug(params.slug);

  if (!town) {
    return { title: 'Area Not Found' };
  }

  const title = `Roofing & Exterior Contractor in ${town.name}, ME | ${BUSINESS_CONFIG.name}`;
  const description =
    town.description ||
    `Roof replacement, roof repair, metal roofing, siding, and roof inspections in ${town.name}, ME. Owner-led quality, clean installs, and fast estimates across ${town.county} County.`;

  const canonical = `https://graniteshieldroofing.com/areas/${town.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BUSINESS_CONFIG.name,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function TownPage({ params }: { params: { slug: string } }) {
  const town = getTownBySlug(params.slug);
  if (!town) notFound();

  const isCoastal = town.climate === 'coastal';

  const faqs = [
    {
      question: `What roofing issues are most common in ${town.name}, Maine?`,
      answer: isCoastal
        ? `${town.name}'s coastal conditions can accelerate wear from wind-driven rain and salt air. We focus on tight flashing details, proper ventilation, and materials designed for coastal exposure to reduce leaks and premature aging.`
        : `${town.name}'s inland winters can increase ice dam risk, snow load stress, and freeze-thaw wear. We focus on ventilation, ice & water protection in vulnerable areas, and correct flashing details to reduce winter-related leaks.`,
    },
    {
      question: `How long do roofs typically last in ${town.name}?`,
      answer:
        'Roof lifespan depends on materials, ventilation, and install quality. Many asphalt shingle roofs last 20–30 years in Maine with proper detailing and periodic inspections. Standing seam metal roofing often lasts significantly longer with minimal maintenance.',
    },
    {
      question: `Do you serve ${town.name} year-round?`,
      answer: `Yes. We serve ${town.name} throughout the year, including winter inspections and emergency repairs. For full replacements, we schedule around safe weather windows while keeping communication and timelines clear.`,
    },
  ];

  // ✅ include Shingle Roofing now that you offer it
  const services = [
    { title: 'Shingle Roofing', href: '/services/shingle-roofing' },
    { title: 'Roof Replacement', href: '/services/roof-replacement' },
    { title: 'Roof Repair', href: '/services/roof-repair' },
    { title: 'Roof Inspection', href: '/services/roof-inspection' },
    {
      title: 'Standing Seam Metal Roofing',
      href: '/services/standing-seam-metal-roofing',
    },
    { title: 'Ice Dam Removal', href: '/services/ice-dam-removal' },
    { title: 'Vinyl Siding', href: '/services/vinyl-siding' },
    { title: 'Metal Siding', href: '/services/metal-siding' },
    { title: 'Windows', href: '/services/windows' },
  ];

  const climateIcon = isCoastal ? '🌊' : '🏔️';
  const climateLabel = isCoastal
    ? 'Coastal Conditions'
    : 'Snow & Ice Conditions';

  return (
    <>
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
      <FAQSchema faqs={faqs} />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <MapPin className="h-4 w-4 mr-2" />
              Serving {town.name}, {town.county} County {climateIcon}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Roofing & Exterior Services in {town.name}, ME
            </h1>

            <div className="bg-blue-600/20 backdrop-blur-md border border-blue-400/30 rounded-lg p-6 mb-6">
              <p className="text-lg leading-relaxed font-medium">
                {town.directAnswer}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 mb-8">
              <p className="text-lg leading-relaxed">
                {BUSINESS_CONFIG.name} is owner-led and detail-focused. We build
                roofing and exterior systems designed for{' '}
                {climateLabel.toLowerCase()}, with careful flashing,
                ventilation, and clean installs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/lp">
                  Schedule Free Inspection{' '}
                  <ArrowRight className="ml-2 h-5 w-5" />
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

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Built for {town.name} Weather
              </h2>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {isCoastal
                  ? `${town.name} homes face wind-driven rain and coastal exposure. We prioritize sealed transitions, proper flashing, and systems that resist corrosion and uplift forces.`
                  : `${town.name} homes face snow loads and ice dam conditions. We prioritize ventilation, ice & water protection in vulnerable zones, and clean detailing that prevents leaks.`}
              </p>

              <div className="space-y-3">
                {(town.localFactors || []).map((factor) => (
                  <div key={factor} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {town.neighborhoods && town.neighborhoods.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Neighborhoods & Areas in {town.name}
                    </h3>
                    <ul className="space-y-2 text-slate-600">
                      {town.neighborhoods.map((n) => (
                        <li key={n} className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">
              Services We Offer in {town.name}, ME
            </h2>
            <p className="text-slate-600 mt-3">
              Explore our core services. Each page includes FAQs and
              service-specific details.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Card key={s.href} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {s.title}
                  </h3>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={s.href}>
                      View Service <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link href="/services">
                View All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
