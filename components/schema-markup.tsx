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

export function WebPageSchema({
  name,
  description,
  url,
  mainEntity,
}: {
  name: string;
  description: string;
  url: string;
  mainEntity?: { '@type': string; '@id': string };
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    ...(mainEntity ? { mainEntity } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function ItemListSchema({ 
  name, 
  items 
}: { 
  name: string; 
  items: string[] | Array<{ name: string; url?: string }> 
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => {
      const itemName = typeof item === 'string' ? item : item.name;
      const itemUrl = typeof item === 'string' ? undefined : item.url;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: itemName,
        ...(itemUrl ? { item: itemUrl } : {}),
      };
    }),
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