/**
 * MEDIA LIBRARY
 * Single source of truth for ALL images, alt text, and dimensions
 * Apple-style premium media pipeline for GraniteShield Roofing
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
        fastener: MediaItem;
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
      src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1766473079/roofing-siding-exterior-renovation-southern-maine-granite-shield.jpg.png',
      alt: 'Professional roofing installation in Southern Maine featuring quality materials and skilled craftsmanship',
      width: 2400,
      height: 1350,
    },
  },

  // ─────────────────────────────────────────────────────────────
  // PROOF (Owner, Team, Credentials)
  // ─────────────────────────────────────────────────────────────
  proof: {
    owner: {
      src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/proof/owner-justin-laflamme',
      alt: 'Justin Laflamme, owner of GraniteShield Roofing, on a residential roofing project in Southern Maine',
      width: 1600,
      height: 1200,
    },
  },

  // ─────────────────────────────────────────────────────────────
  // PROJECTS - Featured Before/During/After
  // ─────────────────────────────────────────────────────────────
  projects: {
    featured1: {
      before: {
        src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/projects/featured-1/before',
        alt: 'Residential roof before replacement showing weathered shingles and wear from Maine winters',
        width: 2400,
        height: 1600,
      },
      during: {
        src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/projects/featured-1/install',
        alt: 'Standing seam metal roofing installation in progress with careful attention to flashing details',
        width: 2400,
        height: 1600,
      },
      after: {
        src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/projects/featured-1/after',
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
        src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/systems/integrity/underlayment-macro',
        alt: 'Close-up of synthetic roofing underlayment installation showing moisture barrier protection',
        width: 2000,
        height: 1333,
      },
      flashing: {
        src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/systems/integrity/flashing-detail',
        alt: 'Precision flashing detail at roof penetration demonstrating water-tight installation technique',
        width: 2000,
        height: 1333,
      },
      ventilation: {
        src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/systems/integrity/ridge-vent',
        alt: 'Ridge ventilation system installed to ensure proper attic airflow and prevent ice dams',
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
          src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/services/metal/macro-seam',
          alt: 'Extreme close-up of standing seam metal roofing panel connection showing mechanical lock detail',
          width: 2000,
          height: 1333,
        },
        panel: {
          src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/services/metal/macro-panel',
          alt: 'Metal roofing panel surface texture with protective coating visible in detail',
          width: 2000,
          height: 1333,
        },
        fastener: {
          src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/services/metal/macro-fastener',
          alt: 'Concealed fastener clip system for standing seam metal roof showing precision engineering',
          width: 2000,
          height: 1333,
        },
      },
    },
    shingles: {
      texture: {
        src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/services/shingles/architectural-texture',
        alt: 'Architectural shingle texture showing dimensional profile and granule protection',
        width: 2000,
        height: 1333,
      },
    },
    siding: {
      detail: {
        src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/services/siding/vinyl-corner-detail',
        alt: 'Clean vinyl siding corner installation with tight trim lines and proper moisture management',
        width: 2000,
        height: 1333,
      },
    },
    windows: {
      install: {
        src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/services/windows/flashing-install',
        alt: 'Window flashing installation detail showing proper integration with house wrap and siding',
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
      src: 'https://res.cloudinary.com/durhnu8rr/image/upload/f_auto,q_auto/v1/graniteshield/details/step-flashing',
      alt: 'Step flashing installation detail showing proper overlap and water shedding technique',
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
