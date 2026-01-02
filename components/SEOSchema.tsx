import Script from 'next/script';
import { BUSINESS_CONFIG } from '@/lib/business-config';

interface SEOSchemaProps {
  type?: 'home' | 'service' | 'article' | 'faq';
  service?: {
    name: string;
    description: string;
    price?: string;
  };
  article?: {
    title: string;
    description: string;
    datePublished: string;
    dateModified?: string;
  };
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export function SEOSchema({ type = 'home', service, article, faqs }: SEOSchemaProps) {
  // LocalBusiness Schema (for homepage and all pages)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': 'https://graniteshieldroofing.com/#organization',
    name: BUSINESS_CONFIG.name,
    description: 'Maine\'s most trusted roofing experts since 2010. Specializing in residential and commercial roofing with advanced LiDAR technology for accurate measurements.',
    url: 'https://graniteshieldroofing.com',
    logo: 'https://graniteshieldroofing.com/logo.png',
    image: 'https://graniteshieldroofing.com/og-image.jpg',
    telephone: BUSINESS_CONFIG.phone,
    email: BUSINESS_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_CONFIG.address.street,
      addressLocality: BUSINESS_CONFIG.address.city,
      addressRegion: BUSINESS_CONFIG.address.state,
      postalCode: BUSINESS_CONFIG.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.6591,
      longitude: -70.2568,
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'Maine',
      },
      {
        '@type': 'City',
        name: 'Portland',
        containedIn: {
          '@type': 'State',
          name: 'Maine',
        },
      },
      {
        '@type': 'City',
        name: 'Bangor',
        containedIn: {
          '@type': 'State',
          name: 'Maine',
        },
      },
      {
        '@type': 'City',
        name: 'Augusta',
        containedIn: {
          '@type': 'State',
          name: 'Maine',
        },
      },
    ],
    priceRange: '$$-$$$',
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
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.facebook.com/graniteshieldroofing',
      'https://www.instagram.com/graniteshieldroofing',
    ],
  };

  // Service Schema
  const serviceSchema = service ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    provider: {
      '@id': 'https://graniteshieldroofing.com/#organization',
    },
    description: service.description,
    areaServed: {
      '@type': 'State',
      name: 'Maine',
    },
    ...(service.price ? {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'USD',
      },
    } : {}),
  } : null;

  // Article Schema
  const articleSchema = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: BUSINESS_CONFIG.name,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: 'https://graniteshieldroofing.com/logo.png',
      },
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
  } : null;

  // FAQ Schema
  const faqSchema = faqs && faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://graniteshieldroofing.com',
      },
    ],
  };

  return (
    <>
      {/* LocalBusiness Schema */}
      <Script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* Service Schema */}
      {serviceSchema && (
        <Script
          id="schema-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
      )}

      {/* Article Schema */}
      {articleSchema && (
        <Script
          id="schema-article"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
      )}

      {/* FAQ Schema */}
      {faqSchema && (
        <Script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      {/* Breadcrumb Schema */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
