import { BUSINESS_CONFIG, getSchemaAddress, getSchemaGeo } from '@/lib/business-config';

const SITE_URL = 'https://graniteshieldroofing.com';
const ORG_ID = `${SITE_URL}/#organization`;
const LOGO_URL = `${SITE_URL}/icon.png`;
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image.svg`; 

export function OrganizationSchema() {
  const config = BUSINESS_CONFIG as any;
  const counties = config.serviceArea?.counties || [];
  const services = config.services || [];
  const stateAbbr = config.address?.stateAbbr ?? 'ME';
  const region = config.serviceArea?.region;

  // Build areaServed: region first (if present), then counties
  const areaServedEntries = [];
  
  // Add region entry first (primary area served)
  if (region) {
    areaServedEntries.push({
      '@type': 'AdministrativeArea',
      name: `${region}, ${stateAbbr}`,
    });
  }
  
  // Add county entries, filtering out falsy values and avoiding duplicates
  const filteredCounties = counties.filter(Boolean) as string[];
  const uniqueCounties = Array.from(new Set(filteredCounties));
  areaServedEntries.push(
    ...uniqueCounties.map((county: string) => ({
      '@type': 'AdministrativeArea',
      name: `${county}, ${stateAbbr}`,
    }))
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RoofingContractor'],
    '@id': ORG_ID,
    name: config.name,
    legalName: config.legalName,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: LOGO_URL },
    image: { '@type': 'ImageObject', url: OG_IMAGE_URL },
    description: config.branding?.description,
    telephone: config.contact?.phone,
    email: config.contact?.email,
    address: getSchemaAddress(),
    geo: getSchemaGeo(),
    priceRange: '$$',
    foundingDate: config.founded?.toString() || '2018',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: config.reputation?.rating || 5.0,
      reviewCount: config.reputation?.reviewCount || 8,
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: areaServedEntries,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Exterior Services',
      itemListElement: services.map((service: string) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
          provider: { '@id': ORG_ID },
        },
      })),
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '00:00',
        closes: '00:00',
      },
    ],
    sameAs: [
      config.social?.facebook,
      config.social?.instagram,
      config.reputation?.googleReviewUrl,
    ].filter(Boolean),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function ServiceSchema({ service }: { service: { name: string; description: string; url: string } }) {
  const config = BUSINESS_CONFIG as any;
  const counties = config.serviceArea?.counties || [];
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${service.url}#service`,
    name: service.name,
    description: service.description,
    provider: { '@id': ORG_ID },
    areaServed: [
      {
        '@type': 'State',
        name: config.address?.state || 'Maine',
      },
      ...counties.map((county: string) => ({
        '@type': 'AdministrativeArea',
        name: `${county}, ${config.address?.stateAbbr || 'ME'}`,
      })),
    ],
    serviceType: service.name,
    url: service.url,
    mainEntityOfPage: service.url,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function ReportSchema({ headline, description, datePublished, dateModified, url, about, mentions, image }: any) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    headline,
    description,
    datePublished,
    dateModified,
    ...(image ? { image: [image] } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: (BUSINESS_CONFIG as any).name },
    publisher: {
      '@type': 'Organization',
      name: (BUSINESS_CONFIG as any).name,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    ...(about && about.length > 0 ? { about: about.map((t: string) => ({ '@type': 'Thing', name: t })) } : {}),
    ...(mentions && mentions.length > 0 ? { mentions: mentions.map((t: string) => ({ '@type': 'Thing', name: t })) } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function DatasetSchema({ name, description, temporalCoverage, spatialCoverage, variableMeasured, url }: any) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name,
    description,
    url,
    temporalCoverage,
    spatialCoverage: { '@type': 'Place', name: spatialCoverage },
    variableMeasured: variableMeasured?.map((v: string) => ({ '@type': 'PropertyValue', name: v })),
    creator: {
      '@type': 'Organization',
      name: (BUSINESS_CONFIG as any).name,
    },
    license: 'https://creativecommons.org/licenses/by-nc/4.0/',
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function HowToSchema({ name, description, steps, totalTime, url }: any) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    step: steps?.map((step: any, index: number) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image ? { image: step.image } : {}),
      url: `${url}#step-${index + 1}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function ItemListSchema({ name, items }: { name: string; items: string[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function PersonSchema({
  name,
  jobTitle,
  description,
  sameAs,
}: {
  name: string;
  jobTitle: string;
  description: string;
  sameAs?: string[];
}) {
  const cleanedSameAs = (sameAs || []).filter(Boolean);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    worksFor: { '@id': ORG_ID },
    ...(cleanedSameAs.length > 0 ? { sameAs: cleanedSameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Individual Reviews Schema for rich snippets
export function ReviewsSchema() {
  const reviews = [
    {
      author: 'Mike T.',
      location: 'Scarborough, ME',
      rating: 5,
      date: '2024-11-15',
      text: 'Justin and his team did an amazing job on our standing seam metal roof. Professional from start to finish. The instant quote tool was incredibly accurate - final price was within 5% of the estimate.',
    },
    {
      author: 'Sarah M.',
      location: 'Portland, ME',
      rating: 5,
      date: '2024-10-22',
      text: 'Best roofing experience we\'ve ever had. Got an instant quote online, scheduled the inspection, and had our new roof installed within two weeks. Quality workmanship and great communication.',
    },
    {
      author: 'David L.',
      location: 'Cape Elizabeth, ME',
      rating: 5,
      date: '2024-09-18',
      text: 'After getting quotes from 5 different contractors, GraniteShield was the clear choice. Fair pricing, premium materials, and Justin personally oversaw the entire project. Highly recommend.',
    },
    {
      author: 'Jennifer K.',
      location: 'Falmouth, ME',
      rating: 5,
      date: '2024-08-30',
      text: 'Emergency repair after a storm - they were out same day and had our roof tarped within hours. Permanent repair completed the following week. Saved us from major water damage.',
    },
    {
      author: 'Robert H.',
      location: 'Brunswick, ME',
      rating: 5,
      date: '2024-07-12',
      text: 'The online instant quote feature is a game changer. Got accurate pricing without having to schedule multiple appointments. The metal roof looks beautiful and should last a lifetime.',
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://graniteshieldroofing.com/#organization',
    name: 'GraniteShield Roofing & Exteriors',
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      datePublished: review.date,
      reviewBody: review.text,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// Video Schema for YouTube content
export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    ...(duration ? { duration } : {}),
    ...(contentUrl ? { contentUrl } : {}),
    ...(embedUrl ? { embedUrl } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'GraniteShield Roofing & Exteriors',
      logo: {
        '@type': 'ImageObject',
        url: 'https://graniteshieldroofing.com/logo.png',
      },
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// Product Schema for roofing services with pricing
export function ProductSchema({
  name,
  description,
  image,
  priceRange,
  url,
}: {
  name: string;
  description: string;
  image?: string;
  priceRange: { min: number; max: number };
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    ...(image ? { image } : {}),
    brand: {
      '@type': 'Brand',
      name: 'GraniteShield Roofing',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: priceRange.min,
      highPrice: priceRange.max,
      offerCount: '1',
      availability: 'https://schema.org/InStock',
      url,
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
