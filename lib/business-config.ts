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

  /* ========================
     HOURS (⛔ REQUIRED BY CONTACT PAGE)
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
     ADDRESS (SERVICE-AREA SAFE)
  ========================= */
  address: {
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
  serviceArea: {
    region: 'Southern Maine',
    counties: [
      'Cumberland County',
      'York County',
      'Androscoggin County',
    ],
  },

  serviceAreaText:
    'Serving Southern Maine including Cumberland Center, Portland, Scarborough, Falmouth, Yarmouth, Cape Elizabeth, South Portland, Westbrook, Biddeford, Saco, Auburn, Turner, and surrounding towns.',

  /* ========================
     GEO
  ========================= */
  location: {
    latitude: 43.859,
    longitude: -70.103,
  },

  /* ========================
     SOCIAL
  ========================= */
  social: {
    facebook: 'https://facebook.com/graniteshieldroofing',
    instagram: 'https://instagram.com/graniteshieldroofing',
  },

  /* ========================
     REVIEWS
  ========================= */
  reputation: {
    googleReviewUrl:
      'https://www.google.com/search?q=GraniteShield+Roofing+reviews',
    rating: 5.0,
    reviewCount: 50,
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
     BRANDING
  ========================= */
  branding: {
    tagline: "Southern Maine's Most Trusted Exterior Contractor",
    description:
      'GraniteShield Roofing & Exteriors is an owner-operated roofing contractor serving Southern Maine, specializing in standing seam metal roofing, roof replacement, siding, and windows.',
    logoUrl: 'https://graniteshieldroofing.com/logo.png',

    // ⭐ NEW — required for layout.tsx metadata (and nice for SEO/AI)
    keywords: [
      'Maine roofing',
      'metal roofing Maine',
      'roof replacement',
      'CertainTeed installer',
      'GraniteShield Roofing',
      'standing seam roofs',
      'Southern Maine contractor',
      'siding and windows',
      'roof repair Portland ME',
      'Scarborough roofing contractor',
      'Biddeford siding',
      'window replacement Maine',
      'ice dam removal Southern Maine',
      'roof leak repair Maine',
    ],
  },
} as const;

export type BusinessConfig = typeof BUSINESS_CONFIG;

/* ========================
   HELPERS (USED SITE-WIDE)
========================= */
export function getFormattedAddress() {
  return `${BUSINESS_CONFIG.serviceArea.region}, ${BUSINESS_CONFIG.address.stateAbbr}`;
}

export function getServiceAreaText() {
  return BUSINESS_CONFIG.serviceAreaText;
}

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
