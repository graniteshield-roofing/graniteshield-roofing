import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, CheckCircle2, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BUSINESS_CONFIG } from '@/lib/business-config';

export default function HomePage() {
  const baseUrl = 'https://graniteshieldroofing.com';

  // ✅ One optimized HERO image (no mobile/desktop swap)
  // Fixes blur: q_85 + dpr_auto + fill + sizes="100vw"
  const heroImage =
    'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_85,dpr_auto,w_2400,c_fill,g_auto/v1766473079/roofing-siding-exterior-renovation-southern-maine-granite-shield.jpg.png';

  const serviceAreas = [
    'Cumberland Center',
    'Portland',
    'Falmouth',
    'Yarmouth',
    'Freeport',
    'Scarborough',
    'Cape Elizabeth',
    'South Portland',
    'Westbrook',
    'Biddeford',
    'Saco',
    'Auburn',
    'Turner',
  ];

  const services = [
    {
      title: 'Standing Seam Metal Roofing',
      desc: 'Long-life metal roofing engineered for Maine snow, wind, and coastal exposure.',
      href: '/services/standing-seam-metal-roofing',
      funnel: '/lp?service=standing-seam-metal-roofing',
    },
    {
      title: 'Shingle Roofing',
      desc: 'High-performance shingle systems installed with clean flashing, ventilation (when applicable), and tight detailing.',
      href: '/services/shingle-roofing',
      funnel: '/lp?service=shingle-roofing',
    },
    {
      title: 'Roof Replacement',
      desc: 'System-first replacements with clean flashing, ventilation (when applicable), and thorough cleanup.',
      href: '/services/roof-replacement',
      funnel: '/lp?service=roof-replacement',
    },
    {
      title: 'Roof Repair',
      desc: 'Leak diagnosis, storm damage repair, and fast stabilization to protect your home.',
      href: '/services/roof-repair',
      funnel: '/lp?service=roof-repair',
    },
    {
      title: 'Vinyl Siding',
      desc: 'Tight moisture management, crisp trim lines, and curb-appeal upgrades.',
      href: '/services/vinyl-siding',
      funnel: '/lp?service=vinyl-siding',
    },
    {
      title: 'Metal Siding',
      desc: 'Durable steel/aluminum systems with modern profiles and strong wind resistance.',
      href: '/services/metal-siding',
      funnel: '/lp?service=metal-siding',
    },
    {
      title: 'Windows',
      desc: 'Window replacements with proper exterior integration for energy efficiency and clean finishes.',
      href: '/services/windows',
      funnel: '/lp?service=windows',
    },
  ];

  const faqs = [
    {
      q: 'Do you serve homeowners throughout Southern Maine?',
      a: 'Yes. GraniteShield Roofing & Exteriors serves Southern Maine across Cumberland, York, and Androscoggin County areas.',
    },
    {
      q: 'Do you install both metal and shingle roofing?',
      a: 'Yes. We install standing seam metal roofing and high-performance shingle systems, built for Maine weather and detailed for long-term performance.',
    },
    {
      q: 'What’s included in your roof replacement process?',
      a: 'We focus on system-level performance: protection in vulnerable areas, clean flashing, ventilation (when applicable), and thorough cleanup.',
    },
    {
      q: 'Do you handle emergency repairs?',
      a: 'Yes. If you have active leaking or storm damage, contact us and we’ll help stabilize the situation quickly.',
    },
    {
      q: 'Do you install metal roofing in coastal towns?',
      a: 'Yes. Coastal installations require wind- and salt-resistant detailing designed for long-term performance.',
    },
  ];

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${BUSINESS_CONFIG.name} | Roofing & Exteriors in Southern Maine`,
    url: baseUrl,
    description:
      'Owner-operated roofing and exterior contractor in Southern Maine. Standing seam metal roofing, shingle roofing, roof replacement, roof repair, siding, and windows.',
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'RoofingContractor'],
    name: BUSINESS_CONFIG.name,
    url: baseUrl,
    telephone: BUSINESS_CONFIG.contact.phoneRaw,
    description:
      'Owner-operated roofing and exterior contractor serving Southern Maine. Standing seam metal roofing, shingle roofing, roof replacement, roof repair, siding, and windows — built for Maine weather.',
    areaServed: serviceAreas.map((a) => ({
      '@type': 'City',
      name: a,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'ME',
        addressCountry: 'US',
      },
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ✅ HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Stabilize hero height so it doesn't “breathe” */}
        <div className="relative h-[72vh] min-h-[520px] max-h-[760px]">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="Roofing, siding, and exterior renovation in Southern Maine by GraniteShield Roofing"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Readability overlays */}
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/70" />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:py-14 sm:px-6 lg:px-8">
            {/* ✅ Glass panel so text always pops */}
            <div className="max-w-3xl rounded-2xl bg-black/45 backdrop-blur-md p-6 sm:p-8 border border-white/10 shadow-2xl">
              <Badge className="mb-5 bg-blue-600 text-white border-0">
                Owner-Operated • Southern Maine • Licensed & Insured
              </Badge>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                Roofing & Exteriors Built for{' '}
                <span className="text-blue-300">Southern Maine</span>
              </h1>

              <p className="mt-4 text-lg sm:text-xl text-slate-200">
                Standing seam metal roofing, shingle systems, roof replacements, repairs,
                siding, and windows — clean installs, tight detailing, and real accountability
                from the owner on-site.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" asChild>
                  <Link href="/lp">
                    Get Free Exterior Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-transparent text-white border-white hover:bg-white hover:text-slate-900"
                >
                  <a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call {BUSINESS_CONFIG.contact.phone}
                  </a>
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-200">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden>⭐</span> 5.0 (8 reviews)
                </span>
                <span className="opacity-70">•</span>
                <span>Most assessments scheduled in 24–48 hours</span>
                <span className="opacity-70">•</span>
                <span>$0 assessment fee</span>
              </div>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-200">
                {['Licensed & Insured', 'Clean Install + Cleanup', 'Owner Oversight'].map(
                  (text) => (
                    <div key={text} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-amber-300" />
                      {text}
                    </div>
                  )
                )}
              </div>

              <div className="mt-5 flex items-start gap-2 text-slate-200 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-slate-300" />
                <p>Serving Southern Maine: {serviceAreas.join(', ')} and surrounding towns.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Card key={`${s.title}-${s.href}`}>
                <CardContent className="p-6 flex flex-col h-full">
                  <h2 className="text-xl font-semibold">{s.title}</h2>
                  <p className="mt-2 text-slate-600">{s.desc}</p>

                  <div className="mt-auto pt-6 flex flex-col gap-3">
                    <Button asChild variant="cta" className="w-full">
                      <Link href={s.funnel}>Request Free Assessment</Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full">
                      <Link href={s.href}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 max-w-3xl text-slate-600 text-sm leading-relaxed">
            GraniteShield Roofing & Exteriors is an owner-operated roofing and exterior contractor
            serving Southern Maine, including Portland, Scarborough, Saco, Biddeford, Auburn, and
            surrounding communities. We install standing seam metal roofing and high-performance
            shingle systems, handle full roof replacements and emergency repairs, and deliver clean
            exterior upgrades built for Maine’s climate.
          </div>
        </div>
      </section>
    </>
  );
}
