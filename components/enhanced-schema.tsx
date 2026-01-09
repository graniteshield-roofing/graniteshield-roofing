'use client';

import Script from 'next/script';
import { BUSINESS_CONFIG } from '@/lib/business-config';

// Comprehensive schema markup for maximum SEO/GEO/AI visibility
export function EnhancedSchemaMarkup() {
  const baseUrl = 'https://graniteshieldroofing.com';
  
  // All Maine towns for comprehensive geo coverage
  const maineTowns = [
    'Portland', 'Scarborough', 'South Portland', 'Cape Elizabeth', 'Falmouth',
    'Yarmouth', 'Freeport', 'Brunswick', 'Bath', 'Westbrook', 'Gorham',
    'Windham', 'Gray', 'Cumberland', 'North Yarmouth', 'Pownal', 'Durham',
    'Lisbon', 'Topsham', 'Harpswell', 'Phippsburg', 'West Bath', 'Woolwich',
    'Biddeford', 'Saco', 'Old Orchard Beach', 'Kennebunk', 'Kennebunkport',
    'Wells', 'Ogunquit', 'York', 'Kittery', 'Eliot', 'South Berwick',
    'Berwick', 'Sanford', 'Springvale', 'Alfred', 'Waterboro', 'Limerick',
    'Limington', 'Hollis', 'Buxton', 'Dayton', 'Arundel', 'Lyman',
    'Auburn', 'Lewiston', 'Turner', 'Minot', 'Poland', 'Mechanic Falls',
    'Oxford', 'Norway', 'Paris', 'Buckfield', 'Hebron', 'Sumner',
    'Augusta', 'Waterville', 'Bangor', 'Brewer', 'Orono', 'Old Town'
  ];

  // Enhanced LocalBusiness with RoofingContractor type
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RoofingContractor', 'HomeAndConstructionBusiness'],
    '@id': `${baseUrl}/#organization`,
    name: BUSINESS_CONFIG.name,
    alternateName: ['GraniteShield Roofing', 'GraniteShield Exteriors', 'Granite Shield Roofing Maine'],
    description: BUSINESS_CONFIG.branding.description,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    image: [
      `${baseUrl}/og-image.jpg`,
      `${baseUrl}/images/services/metal/metal-finished-standing-seam-black-camp.webp`,
    ],
    telephone: BUSINESS_CONFIG.contact.phone,
    email: BUSINESS_CONFIG.contact.email,
    foundingDate: '2020',
    founder: {
      '@type': 'Person',
      name: 'Justin Laflamme',
      jobTitle: 'Owner',
    },
    slogan: BUSINESS_CONFIG.branding.tagline,
    knowsAbout: [
      'Roof Replacement',
      'Standing Seam Metal Roofing',
      'Asphalt Shingle Installation',
      'Ice Dam Removal',
      'Emergency Roof Repair',
      'Roof Inspection',
      'Vinyl Siding',
      'Metal Siding',
      'Window Replacement',
      'Gutter Installation',
      'Maine Weather Protection',
      'Coastal Roofing',
      'Snow Load Engineering',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Southern Maine',
      addressRegion: 'ME',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_CONFIG.location.latitude,
      longitude: BUSINESS_CONFIG.location.longitude,
    },
    areaServed: maineTowns.map(town => ({
      '@type': 'City',
      name: town,
      containedInPlace: {
        '@type': 'State',
        name: 'Maine',
        '@id': 'https://www.wikidata.org/wiki/Q724',
      },
    })),
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS_CONFIG.location.latitude,
        longitude: BUSINESS_CONFIG.location.longitude,
      },
      geoRadius: '80000', // 80km radius
    },
    priceRange: '$$-$$$',
    currenciesAccepted: 'USD',
    paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Financing Available'],
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
      ratingValue: '5.0',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Roofing & Exterior Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Roofing Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Standing Seam Metal Roofing',
                description: 'Premium standing seam metal roof installation engineered for Maine weather',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Asphalt Shingle Roofing',
                description: 'CertainTeed architectural shingle installation with lifetime warranty',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Roof Replacement',
                description: 'Complete roof replacement with premium materials and workmanship',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Emergency Roof Repair',
                description: '24/7 emergency roof repair service for storm damage and leaks',
              },
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Exterior Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Vinyl Siding Installation',
                description: 'Premium vinyl siding installation for Maine homes',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Window Replacement',
                description: 'Energy-efficient window replacement and installation',
              },
            },
          ],
        },
      ],
    },
    sameAs: [
      BUSINESS_CONFIG.social.facebook,
      BUSINESS_CONFIG.social.instagram,
    ],
    potentialAction: [
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/lp`,
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
          ],
        },
        result: {
          '@type': 'Reservation',
          name: 'Free Roof Inspection',
        },
      },
      {
        '@type': 'QuoteAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/instant-quote`,
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
          ],
        },
        result: {
          '@type': 'Order',
          name: 'Instant Roofing Quote',
        },
      },
    ],
  };

  // WebSite schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: BUSINESS_CONFIG.name,
    description: BUSINESS_CONFIG.branding.description,
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/areas?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  };

  // SoftwareApplication schema for PeakVex instant quote tool
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PeakVex Instant Roof Quote',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    description: 'Advanced LiDAR-powered instant roof measurement and quote tool for Maine homeowners',
    url: `${baseUrl}/instant-quote`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    featureList: [
      'Satellite roof measurement',
      'LiDAR accuracy',
      'Instant pricing',
      'Multiple material options',
      'No obligation quote',
    ],
  };

  // Speakable schema for voice search optimization
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${baseUrl}/#webpage`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.hero-description', '.faq-answer'],
    },
    mainEntity: {
      '@id': `${baseUrl}/#organization`,
    },
  };

  return (
    <>
      <Script
        id="schema-local-business-enhanced"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="schema-software"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      <Script
        id="schema-speakable"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(speakableSchema),
        }}
      />
    </>
  );
}

// Service-specific schema for service pages
export function ServiceSchema({ 
  serviceName, 
  serviceDescription,
  serviceUrl,
}: { 
  serviceName: string; 
  serviceDescription: string;
  serviceUrl: string;
}) {
  const baseUrl = 'https://graniteshieldroofing.com';
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}/#service`,
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    areaServed: {
      '@type': 'State',
      name: 'Maine',
    },
    serviceType: serviceName,
    termsOfService: `${baseUrl}/privacy-policy`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: serviceName,
    },
  };

  return (
    <Script
      id={`schema-service-${serviceName.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

// Town/Area-specific schema for local pages
export function TownSchema({ 
  townName, 
  townSlug,
  county,
}: { 
  townName: string; 
  townSlug: string;
  county: string;
}) {
  const baseUrl = 'https://graniteshieldroofing.com';
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/areas/${townSlug}/#localbusiness`,
    name: `${BUSINESS_CONFIG.name} - ${townName}`,
    description: `Professional roofing contractor serving ${townName}, Maine. Standing seam metal roofing, shingle installation, and exterior services.`,
    url: `${baseUrl}/areas/${townSlug}`,
    telephone: BUSINESS_CONFIG.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: townName,
      addressRegion: 'ME',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: townName,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: `${county} County`,
        containedInPlace: {
          '@type': 'State',
          name: 'Maine',
        },
      },
    },
    parentOrganization: {
      '@id': `${baseUrl}/#organization`,
    },
  };

  return (
    <Script
      id={`schema-town-${townSlug}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
