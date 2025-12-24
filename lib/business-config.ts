export const BUSINESS_CONFIG = {
  /* ========================
     CORE BUSINESS IDENTITY
  ========================= */
  name: 'GraniteShield Roofing',
  legalName: 'GraniteShield Roofing LLC',
  owner: 'Justin Laflamme',
  businessType: 'Owner-Operated',
  founded: 2018,
  employeeCount: '5–10',

  /* ========================
     CONTACT INFORMATION
  ========================= */
  contact: {
    phone: '(207) 530-8362',
    phoneDisplay: '(207) 530-8362',
    phoneRaw: '+12075308362',
    email: 'info@graniteshieldroofing.com',
  },

  address: {
    // Service-area business (no street address for SEO safety)
    street: '',
    city: 'Southern Maine',
    state: 'Maine',
    stateAbbr: 'ME',
    zip: '',
    county: 'Cumberland County',
  },

  /* ========================
     SERVICE AREA
  ========================= */
  serviceAreaShort:
    'Southern Maine (Cumberland, York & Androscoggin Counties)',

  serviceAreaText:
    'Serving Southern Maine including Cumberland Center, Portland, Scarborough, Falmouth, Yarmouth, Cape Elizabeth, South Portland, Westbrook, Biddeford, Saco, Auburn, Turner, and surrounding towns.',

  /* ========================
     GEO COORDINATES
  ========================= */
  location: {
    latitude: 43.859,
    longitude: -70.103,
  },

  /* ========================
     SOCIAL PROFILES
  ========================= */
  social: {
    facebook: 'https://facebook.com/graniteshieldroofing',
    instagram: 'https://instagram.com/graniteshieldroofing',
  },

  /* ========================
     REVIEWS / REPUTATION
  ========================= */
  reputation: {
    googlePlaceId: '/g/11xm1p5ldx',
    googleReviewUrl:
      'https://www.google.com/search?q=GraniteShield+Roofing+reviews',
    rating: 5.0,
    reviewCount: 8,
  },

  /* ========================
     SERVICES
  ========================= */
  services: [
    'Roof Replacement',
    'Roof Repair',
    'Roof Inspection',
    'Emergency Roof Repair',
    'Ice Dam Removal',
    'Standing Seam Metal Roofing',
    'Vinyl Siding Installation',
    'Metal Siding Installation',
    'Window Replacement',
    'Gutter Installation',
  ],

  /* ========================
     BRANDING / SEO
  ========================= */
  branding: {
    tagline: "Southern Maine's Most Trusted Exterior Contractor",
    description:
      'GraniteShield Roofing & Exteriors is an owner-operated roofing contractor serving Southern Maine, specializing in standing seam metal roofing, roof replacement, siding, and windows. Clean installs, clear communication, and real accountability.',
    keywords: [
      'roofing contractor southern maine',
      'standing seam metal roofing maine',
      'roof replacement maine',
      'metal roofing contractor maine',
      'siding contractor southern maine',
      'window replacement maine',
    ],
    logoUrl: 'https://graniteshieldroofing.com/logo.png',
  },
} as const;

/* ========================
   TYPES
========================= */
export type BusinessConfig = typeof BUSINESS_CONFIG;

/* ========================
   SAFE HELPERS (USED ACROSS SITE)
========================= */

/**
 * Used in footer, contact page, schema, etc.
 * NO street address (service-area business compliant)
 */
export function getFormattedAddress() {
  return `${BUSINESS_CONFIG.serviceArea.region}, ${BUSINESS_CONFIG.address.stateAbbr}`;
}

/**
 * Used for footer + schema
 */
export function getServiceAreaText() {
  return BUSINESS_CONFIG.serviceAreaText;
}

/* ========================
   SCHEMA HELPERS
========================= */
export function getSchemaAddress() {
  return {
    '@type': 'PostalAddress',
    addressRegion: 'ME',
    addressCountry: 'US',
    areaServed: BUSINESS_CONFIG.serviceArea.region,
  };
}

export function getSchemaGeo() {
  return {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS_CONFIG.location.latitude,
    longitude: BUSINESS_CONFIG.location.longitude,
  };
}
