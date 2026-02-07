import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, CheckCircle2, MapPin, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BUSINESS_CONFIG } from '@/lib/business-config';
import { MEDIA, getResponsiveSizes } from '@/lib/media';
import { FeaturedProject } from '@/components/featured-project';
import { SystemAnatomy } from '@/components/system-anatomy';
import { MetalMacroGallery } from '@/components/metal-macro-gallery';
import { ProjectGallery } from '@/components/project-gallery';
import { SEOSchema } from '@/components/SEOSchema';

export default function HomePage() {
  // Add SEO Schema markup
  const seoSchemaProps = {
    type: 'home' as const,
    faqs: [
      {
        question: 'How long does a roof replacement take in Maine?',
        answer: 'Most residential roof replacements in Maine take 1-3 days depending on size, weather conditions, and roof complexity. We work efficiently while maintaining quality standards.',
      },
      {
        question: 'Do you offer instant roof measurements?',
        answer: 'Yes! Our instant quote tool uses advanced LiDAR technology to provide accurate roof measurements in seconds. Get your estimate at graniteshieldroofing.com/instant-quote',
      },
      {
        question: 'What areas in Maine do you serve?',
        answer: 'We serve all of Southern Maine including Portland, Bangor, Augusta, Cumberland, Falmouth, Yarmouth, Freeport, Scarborough, Cape Elizabeth, and surrounding areas.',
      },
      {
        question: 'What types of roofing do you install?',
        answer: 'We specialize in standing seam metal roofing and high-performance asphalt shingle systems. Both are engineered for Maine\'s harsh weather including heavy snow loads, ice dams, and coastal exposure.',
      },
    ],
  };

  const baseUrl = 'https://graniteshieldroofing.com';

  // ✅ Use MEDIA library for hero image
  const heroImg = MEDIA.heroes.main;

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
      desc: 'High-performance shingle systems with clean flashing, ventilation (when applicable), and tight detailing.',
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
      "Owner-operated roofing and exterior contractor serving Southern Maine. Standing seam metal roofing, shingle roofing, roof replacement, roof repair, siding, and windows — built for Maine weather.",
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
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      {/* Enhanced SEO Schema */}
      <SEOSchema {...seoSchemaProps} />
      
      {/* Legacy JSON-LD (keeping for compatibility) */}
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

      {/* ✅ HERO - Cumberland Center Metal Roof */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Mobile: Split layout - image on top, content below */}
        {/* Desktop: Traditional overlay layout */}
        <div className="relative min-h-[100vh] sm:min-h-[80vh] lg:min-h-[700px] flex flex-col sm:block">
          
          {/* Background image - full on desktop, top portion on mobile */}
          <div className="relative h-[45vh] sm:h-auto sm:absolute sm:inset-0">
            <Image
              src={heroImg.src}
              alt={heroImg.alt}
              fill
              priority
              sizes={getResponsiveSizes('hero')}
              className="object-cover object-[center_65%] sm:object-center"
            />
            {/* Lighter overlay on mobile to show the roof, darker on desktop for text */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 sm:from-black/50 sm:via-black/25 sm:to-black/50" />
          </div>

          {/* Content - solid dark background on mobile, glass on desktop */}
          <div className="relative z-10 flex-1 sm:flex-none sm:mx-auto sm:max-w-7xl sm:px-6 lg:px-8">
            <div className="h-full sm:pt-20 lg:pt-24 sm:pb-14">
              {/* Mobile: solid dark panel at bottom | Desktop: glass overlay */}
              <div className="h-full sm:h-auto sm:max-w-2xl sm:rounded-2xl sm:border sm:border-white/20 bg-slate-900 sm:bg-white/10 sm:backdrop-blur-2xl sm:shadow-2xl p-5 sm:p-8">
                
                <Badge className="mb-3 sm:mb-4 bg-blue-600 text-white border-0 text-xs">
                  Owner-Operated • Southern Maine
                </Badge>

                <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                  Roofing & Exteriors Built for{' '}
                  <span className="text-blue-300">Southern Maine</span>
                </h1>

                <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-slate-300 sm:text-white/95 leading-relaxed">
                  Standing seam metal roofing, shingle systems, repairs & more — owner on-site.
                </p>

                {/* CTA row */}
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button variant="cta" size="lg" asChild className="h-11 sm:h-14 text-base">
                    <Link href="/instant-quote">
                      <Zap className="mr-2 h-5 w-5" />
                      Get Instant Quote
                    </Link>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="h-11 sm:h-14 bg-transparent text-white border-white/70 hover:bg-white hover:text-slate-900"
                  >
                    <Link href="/lp">
                      Free Inspection <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                {/* Phone number */}
                <div className="mt-3">
                  <a
                    href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                    className="inline-flex items-center gap-2 text-slate-300 sm:text-white/90 hover:text-white text-sm font-medium transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Or call: {BUSINESS_CONFIG.contact.phone}
                  </a>
                </div>

                {/* Trust line - simplified on mobile */}
                <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-300 sm:text-white/95">
                  <span className="inline-flex items-center gap-1">
                    <span aria-hidden>⭐</span> 5.0 (50+ reviews)
                  </span>
                  <span className="opacity-60">•</span>
                  <span>24–48hr scheduling</span>
                  <span className="opacity-60">•</span>
                  <span>$0 assessment</span>
                </div>

                {/* Bullets - horizontal on mobile */}
                <div className="mt-3 sm:mt-5 flex flex-wrap sm:grid sm:grid-cols-3 gap-x-4 gap-y-1 sm:gap-2 text-xs sm:text-sm text-slate-300 sm:text-white/95">
                  {['Licensed & Insured', 'Clean Install', 'Owner Oversight'].map((text) => (
                    <div key={text} className="flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
                      {text}
                    </div>
                  ))}
                </div>

                {/* Service areas - hidden on mobile, shown on desktop */}
                <div className="hidden sm:flex mt-4 items-start gap-2 text-white/90 text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 text-slate-200" />
                  <p className="leading-relaxed">
                    Serving Southern Maine: {serviceAreas.join(', ')} and surrounding towns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* subtle bottom fade into white section - desktop only */}
          <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Roofing & Exterior Services
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl">
              High-performance systems built for Maine weather — metal, shingles, repairs, siding, and windows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Card key={`${s.title}-${s.href}`} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">{s.desc}</p>

                  <div className="mt-auto pt-6 flex flex-col gap-3">
                    <Button asChild variant="cta" className="w-full h-11">
                      <Link href={s.funnel}>Request Free Assessment</Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full h-11">
                      <Link href={s.href}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 max-w-3xl text-slate-600 text-sm leading-relaxed">
            GraniteShield Roofing & Exteriors is an owner-operated contractor serving Southern Maine, including Portland,
            Scarborough, Saco, Biddeford, Auburn, and surrounding communities. We install standing seam metal roofing and
            high-performance shingle systems, handle full roof replacements and fast repairs, and deliver clean exterior
            upgrades built for Maine&apos;s climate.
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT - Before/During/After */}
      <FeaturedProject />

      {/* SYSTEM ANATOMY - Integrity Layers */}
      <SystemAnatomy />

      {/* METAL MACRO GALLERY - Craftsmanship Close-Ups */}
      <MetalMacroGallery />

      {/* PROJECT GALLERY - Real Project Photos */}
      <ProjectGallery />
    </>
  );
}
