// ✅ Competitive upgrade for SEO-rich AI-readable schema injection
import {
  BUSINESS_CONFIG,
  getSchemaAddress,
  getSchemaGeo,
} from '@/lib/business-config';

const SITE_URL = 'https://graniteshieldroofing.com';
const ORG_ID = `${SITE_URL}/#organization`;
const LOGO_URL = `${SITE_URL}/logo.png`; // ✅ Used in logo schema
const OG_IMAGE_URL =
  'https://res.cloudinary.com/durhnu8rr/image/upload/v1766122201/Untitled_1640_x_720_px_Mobile_Video_1_pnhryl.jpg';

export function OrganizationSchema() {
  const sameAs = [
    BUSINESS_CONFIG.social.facebook,
    BUSINESS_CONFIG.social.instagram,
    BUSINESS_CONFIG.reputation.googleReviewUrl,
  ].filter(Boolean);

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RoofingContractor'],
    '@id': ORG_ID,
    name: BUSINESS_CONFIG.name,
    legalName: BUSINESS_CONFIG.legalName,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
    image: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
    },
    description: BUSINESS_CONFIG.branding.description,
    telephone: BUSINESS_CONFIG.contact.phone,
    email: BUSINESS_CONFIG.contact.email,
    address: getSchemaAddress(),
    geo: getSchemaGeo(),
    priceRange: '$$',
    foundingDate: BUSINESS_CONFIG.founded.toString(),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS_CONFIG.reputation.rating,
      reviewCount: BUSINESS_CONFIG.reputation.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: BUSINESS_CONFIG.serviceArea.region,
      },
      ...BUSINESS_CONFIG.serviceArea.counties.map((county) => ({
        '@type': 'AdministrativeArea',
        name: `${county}, ${BUSINESS_CONFIG.address.stateAbbr}`,
      })),
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Exterior Services',
      itemListElement: BUSINESS_CONFIG.services.map((service) => ({
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
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({
  service,
}: {
  service: { name: string; description: string; url: string };
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${service.url}#service`,
    name: service.name,
    description: service.description,
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'State',
      name: BUSINESS_CONFIG.address.state,
    },
    serviceType: service.name,
    url: service.url,
    mainEntityOfPage: service.url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function VideoObjectSchema({
  name,
  description,
  contentUrl,
  thumbnailUrl,
  uploadDate,
  location,
}: {
  name: string;
  description: string;
  contentUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
  location: { city: string; state: string };
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    contentUrl,
    thumbnailUrl,
    uploadDate,
    contentLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.city,
        addressRegion: location.state,
      },
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: BUSINESS_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: SITE_URL,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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

export function LocalServiceSchema({
  townName,
  townSlug,
  intro,
}: {
  townName: string;
  townSlug: string;
  intro?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Service', 'LocalBusiness'],
    serviceType: 'Roofing Contractor',
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'City',
      name: townName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: townName,
        addressRegion: 'ME',
      },
    },
    url: `${SITE_URL}/areas/${townSlug}`,
    name: `Roofing Services in ${townName}, ME`,
    description:
      intro ||
      `Professional roofing, siding, and exterior services in ${townName}, ME.`,
    mainEntityOfPage: `${SITE_URL}/areas/${townSlug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
