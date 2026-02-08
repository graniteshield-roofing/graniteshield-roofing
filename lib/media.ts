/**
 * MEDIA LIBRARY
 * Single source of truth for ALL images, alt text, and dimensions
 * Apple-style premium media pipeline for GraniteShield Roofing
 *
 * NOTE: All paths reference local /public/images directory
 * Images should be uploaded to their respective folders as WebP format
 * See /public/images/ASSET_MANIFEST.md for complete asset list
 */

export interface MediaItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface MediaLibrary {
  heroes: {
    main: MediaItem;
  };
  proof: {
    owner: MediaItem;
  };
  about: {
    ownerOnRoof: MediaItem;
  };
  projects: {
    featured1: {
      before: MediaItem;
      during: MediaItem;
      after: MediaItem;
    };
  };
  systems: {
    integrity: {
      underlayment: MediaItem;
      flashing: MediaItem;
      ventilation: MediaItem;
    };
  };
  services: {
    metal: {
      macros: {
        seam: MediaItem;
        panel: MediaItem;
        water: MediaItem;
      };
    };
    shingles: {
      texture: MediaItem;
    };
    siding: {
      detail: MediaItem;
    };
    windows: {
      install: MediaItem;
    };
  };
  details: {
    flashing: MediaItem;
  };
}

export const MEDIA: MediaLibrary = {
  // ─────────────────────────────────────────────────────────────
  // HEROES
  // ─────────────────────────────────────────────────────────────
  heroes: {
    main: {
      src: '/images/hero-cumberland-center.webp',
      alt: 'Aerial drone view of premium standing seam metal roofing installation in Cumberland Center, Maine - GraniteShield Roofing',
      width: 1920,
      height: 2560,
    },
  },

  // ─────────────────────────────────────────────────────────────
  // ABOUT - Owner / Team Photos
  // ─────────────────────────────────────────────────────────────
  about: {
    ownerOnRoof: {
      src: '/images/owner-justin-metal-roof-install.webp',
      alt: 'GraniteShield Roofing owner installing standing seam metal roofing panels during a Maine winter project at dusk',
      width: 2048,
      height: 1367,
    },
  },

  // ─────────────────────────────────────────────────────────────
  // PROOF (Owner-Operated, Credentials)
  // ─────────────────────────────────────────────────────────────
  proof: {
    owner: {
      src: '/images/details/flashing/detail-chimney-flashing-closeup.webp',
      alt: 'Premium flashing installation detail demonstrating owner-operated quality craftsmanship',
      width: 2000,
      height: 1333,
    },
  },

  // ─────────────────────────────────────────────────────────────
  // PROJECTS - Featured Before/During/After
  // ─────────────────────────────────────────────────────────────
  projects: {
    featured1: {
      before: {
        src: '/images/projects/featured-1/project-featured-before.webp',
        alt: 'Residential roof before replacement showing weathered shingles and wear from Maine winters',
        width: 2400,
        height: 1600,
      },
      during: {
        src: '/images/projects/featured-1/project-featured-02-install.webp',
        alt: 'Standing seam metal roofing installation in progress with careful attention to flashing details',
        width: 2400,
        height: 1600,
      },
      after: {
        src: '/images/projects/featured-1/project-featured-after.webp',
        alt: 'Completed standing seam metal roof installation on Southern Maine home with clean lines and professional finish',
        width: 2400,
        height: 1600,
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // SYSTEMS - Anatomy / Integrity Layer Textures
  // ─────────────────────────────────────────────────────────────
  systems: {
    integrity: {
      underlayment: {
        src: '/images/systems/integrity/certainteed-roofrunner-underlayment.webp',
        alt: 'CertainTeed RoofRunner synthetic roofing underlayment - premium moisture barrier protection',
        width: 2000,
        height: 1333,
      },
      flashing: {
        src: '/images/details/flashing/detail-chimney-flashing-closeup.webp',
        alt: 'Precision chimney flashing detail demonstrating water-tight installation technique',
        width: 2000,
        height: 1333,
      },
      ventilation: {
        src: '/images/systems/integrity/ridge-vent-ventilation.webp',
        alt: 'Ridge vent ventilation system with synthetic underlayment - proper attic airflow to prevent ice dams',
        width: 2000,
        height: 1333,
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // SERVICES - Material Macros & Details
  // ─────────────────────────────────────────────────────────────
  services: {
    metal: {
      macros: {
        seam: {
          src: '/images/services/metal/macros/metal-seam-detail.webp',
          alt: 'Extreme close-up of standing seam metal roofing showing precision lock geometry',
          width: 2000,
          height: 1333,
        },
        panel: {
          src: '/images/services/metal/macros/hero-standing-seam-macro.webp',
          alt: 'Metal roofing panel surface with premium protective finish',
          width: 1365,
          height: 768,
        },
        water: {
          src: '/images/services/metal/macros/metal-water-beads.webp',
          alt: 'Water beading on metal roofing surface demonstrating weather-resistant coating',
          width: 2000,
          height: 1333,
        },
      },
    },
    shingles: {
      texture: {
        src: '/images/services/shingles/shingles-craftsmanship-macro-detail.webp',
        alt: 'Architectural shingle texture showing dimensional profile and granule protection',
        width: 2000,
        height: 1333,
      },
    },
    siding: {
      detail: {
        src: '/images/services/siding/siding-midnight-blue-woodgrain-macro.webp',
        alt: 'Midnight blue woodgrain siding texture close-up showing premium finish and detail',
        width: 2000,
        height: 1333,
      },
    },
    windows: {
      install: {
        src: '/images/services/metal/macros/metal-water-beads.webp',
        alt: 'Water beading on metal roofing surface demonstrating weather-resistant coating',
        width: 2000,
        height: 1333,
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // DETAILS - Craftsmanship Close-Ups
  // ─────────────────────────────────────────────────────────────
  details: {
    flashing: {
      src: '/images/details/flashing/detail-chimney-flashing-closeup.webp',
      alt: 'Chimney flashing installation detail showing proper overlap and water shedding technique',
      width: 2000,
      height: 1333,
    },
  },
};

/**
 * Helper function to get responsive sizes attribute for next/image
 */
export function getResponsiveSizes(layout: 'hero' | 'full' | 'half' | 'third'): string {
  switch (layout) {
    case 'hero':
      return '100vw';
    case 'full':
      return '(max-width: 1280px) 100vw, 1280px';
    case 'half':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px';
    case 'third':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    default:
      return '100vw';
  }
}
