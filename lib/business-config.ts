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
    // Service-area business: leave street/zip blank
    street: '',
    city: 'Southern Maine',
    state: 'Maine',
    stateAbbr: 'ME',
    zip: '',
    county: 'Cumberland County',
  },

  /* ========================
     SERVICE AREA (NO STREET ADDRESS — SEO SAFE)
  ========================= */
  serviceAreaShort: 'Southern Maine (Cumberland, York & Androscoggin Counties)',

  serviceAreaText:
    'Serving Southern Maine including Cumberland Center, Portland, Scarborough, Falmouth, Yarmouth, Cape Elizabeth, South Portland, Westbrook, Biddeford, Saco, Auburn, Turner, and surrounding towns.',

  /* ========================
     GEO COORDINATES (REGIONAL)
  ========================= */
  location: {
    latitude: 43.859, // Southern Maine regional centroid
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
    // Keep place id if you have it
    googlePlaceId: '/g/11xm1p5ldx',

    // Use a standard, reliable Google reviews destination link:
    // (Users can click and see reviews / leave review depending on Google context)
    googleReviewUrl:
      'https://www.google.com/search?q=GraniteShield+Roofing+reviews',

    rating: 5.0,
    reviewCount: 8,
  },

  /* ========================
     CREDENTIALS
  ========================= */
  credentials: {
    certifications: [],
    accreditations: [],
    insurance: 'Fully Licensed & Insured',
  },

  /* ========================
     SERVICE AREA STRUCTURE
  ========================= */
  serviceArea: {
    primaryCities: [
      'Cumberland Center',
      'Portland',
      'Scarborough',
      'Falmouth',
      'Yarmouth',
      'Cape Elizabeth',
      'South Portland',
      'Westbrook',
      'Biddeford',
      'Saco',
      'Auburn',
      'Turner',
    ],
    counties: ['Cumberland County', 'York County', 'Androscoggin County'],
    state: 'Maine',
    region: 'Southern Maine',
  },

  /* ========================
     BUSINESS HOURS
  ========================= */
  hours: {
    monday: '7:00 AM – 6:00 PM',
    tuesday: '7:00 AM – 6:00 PM',
    wednesday: '7:00 AM – 6:00 PM',
    thursday: '7:00 AM – 6:00 PM',
    friday: '7:00 AM – 6:00 PM',
    saturday: '8:00 AM – 4:00 PM',
    sunday: 'Closed',
  },

  /* ========================
     SERVICES OFFERED
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
     BRANDING / SEO COPY
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
  },
} as const;

/* ========================
   TYPES
========================= */
export type BusinessConfig = typeof BUSINESS_CONFIG;

/* ========================
   HELPERS (SAFE EVERYWHERE)
========================= */

/**
 * NAP-style “service area” line (no street address)
 * Use in footer/contact blocks when you want it to read like a real business listing,
 * but without publishing a street address.
 */
export function getFormattedAddress() {
  return `${BUSINESS_CONFIG.serviceArea.region}, ${BUSINESS_CONFIG.address.stateAbbr} — ${BUSINESS_CONFIG.serviceAreaShort}`;
}

export function getServiceAreaText() {
  return BUSINESS_CONFIG.serviceAreaText;
}

/* ========================
   SCHEMA HELPERS (AI / GEO)
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
