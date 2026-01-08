export interface TownData {
  name: string;
  slug: string;
  county: string;
  climate: "coastal" | "inland";
  description: string;
  localFactors: string[];
  neighborhoods?: string[];
  directAnswer: string;
}

export const TOWNS_DATA: TownData[] = [
  {
    name: "Scarborough",
    slug: "scarborough",
    county: "Cumberland",
    climate: "coastal",
    description: "Local Scarborough roofing experts. Owner-operated with experienced professionals. Coastal wind protection, salt air resistant materials. 5.0 rating. Based in Scarborough.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Scarborough, Maine, designed for coastal weather conditions including salt air corrosion and 130 MPH winds.",
    localFactors: [
      "Coastal wind loads up to 130 MPH",
      "Salt air corrosion resistance",
      "Atlantic moisture protection",
      "Pine Point beach proximity considerations",
      "Scarborough Marsh humidity management",
      "Route 1 corridor commercial experience",
    ],
    neighborhoods: ["Pine Point", "Higgins Beach", "Pleasant Hill", "Black Point"],
  },
  {
    name: "Portland",
    slug: "portland",
    county: "Cumberland",
    climate: "coastal",
    description: "Portland's trusted roofing experts. Historic home specialists, commercial roofing, coastal protection. Owner-operated quality. Serving West End, East End, Munjoy Hill.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Portland, Maine, designed for coastal weather conditions with expertise in historic home preservation.",
    localFactors: [
      "West End historic homes",
      "East End waterfront properties",
      "Munjoy Hill steep-slope roofs",
      "Old Port commercial buildings",
      "Bayside mixed-use developments",
      "Back Cove coastal exposure",
    ],
    neighborhoods: ["West End", "East End", "Munjoy Hill", "Old Port", "Bayside"],
  },
  {
    name: "Turner",
    slug: "turner",
    county: "Androscoggin",
    climate: "inland",
    description: "Turner Maine roofing contractor. Rural property experts with heavy snow load experience. Expert installation and quality workmanship.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Turner, Maine, designed for inland weather conditions including heavy snow loads and extreme temperature fluctuations.",
    localFactors: [
      "Heavy snow load engineering (50+ PSF)",
      "Rural property accessibility",
      "Agricultural building experience",
      "Extreme temperature variations",
      "Ice dam prevention systems",
      "Barn and outbuilding roofing",
    ],
  },
  {
    name: "Auburn",
    slug: "auburn",
    county: "Androscoggin",
    climate: "inland",
    description: "Auburn roofing contractor serving residential and commercial properties. Expert installation with premium materials.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Auburn, Maine, designed for inland weather conditions with expertise in both residential and commercial properties.",
    localFactors: [
      "Multi-family property specialists",
      "Commercial roofing systems",
      "Heavy winter snow loads",
      "Mill building restorations",
      "Residential neighborhoods",
      "Industrial property experience",
    ],
  },
  {
    name: "Westbrook",
    slug: "westbrook",
    county: "Cumberland",
    climate: "inland",
    description: "Westbrook Maine roofing services. Complete solutions for residential and commercial properties.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Westbrook, Maine, designed for inland weather conditions with comprehensive residential and commercial expertise.",
    localFactors: [
      "Presumpscot River valley climate",
      "Mixed residential neighborhoods",
      "Commercial district roofing",
      "Historic mill buildings",
      "Suburban developments",
      "Ice dam management",
    ],
  },
  {
    name: "Biddeford",
    slug: "biddeford",
    county: "York",
    climate: "coastal",
    description: "Biddeford roofing contractor specializing in coastal protection and ocean exposure resistance.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Biddeford, Maine, designed for coastal weather conditions with superior ocean exposure protection.",
    localFactors: [
      "Ocean exposure protection",
      "Salt air resistant materials",
      "Saco River mouth climate",
      "Historic downtown properties",
      "Beach community roofing",
      "High wind resistance systems",
    ],
  },
  {
    name: "Saco",
    slug: "saco",
    county: "York",
    climate: "coastal",
    description: "Saco Maine roofing experts specializing in storm damage and preventive maintenance.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Saco, Maine, designed for coastal weather conditions with expert storm damage repair and prevention.",
    localFactors: [
      "Coastal storm exposure",
      "Ferry Beach area properties",
      "Historic district roofing",
      "Salt spray protection",
      "Wind damage prevention",
      "Beach erosion considerations",
    ],
  },
  {
    name: "South Portland",
    slug: "south-portland",
    county: "Cumberland",
    climate: "coastal",
    description: "South Portland roofing contractor providing expert repairs and complete replacements.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in South Portland, Maine, designed for coastal weather conditions with comprehensive repair and replacement services.",
    localFactors: [
      "Portland Harbor exposure",
      "Commercial district roofing",
      "Willard Beach properties",
      "Bug Light area homes",
      "Industrial roofing systems",
      "Coastal wind protection",
    ],
  },
  {
    name: "Cape Elizabeth",
    slug: "cape-elizabeth",
    county: "Cumberland",
    climate: "coastal",
    description: "Cape Elizabeth roofing specialists for premium coastal properties.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Cape Elizabeth, Maine, designed for coastal weather conditions with expertise in high-end oceanfront properties.",
    localFactors: [
      "Direct ocean exposure",
      "Premium coastal homes",
      "Lighthouse area properties",
      "Fort Williams neighborhood",
      "Extreme wind resistance needed",
      "Salt corrosion prevention",
    ],
  },
  {
    name: "Falmouth",
    slug: "falmouth",
    county: "Cumberland",
    climate: "coastal",
    description: "Falmouth Maine roofing experts specializing in high-end residential installations.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Falmouth, Maine, designed for coastal weather conditions with expertise in luxury residential properties.",
    localFactors: [
      "Casco Bay exposure",
      "High-end residential properties",
      "Foreside neighborhood",
      "Historic estates",
      "Premium material installations",
      "Architectural design matching",
    ],
  },
  {
    name: "Yarmouth",
    slug: "yarmouth",
    county: "Cumberland",
    climate: "coastal",
    description: "Yarmouth roofing contractor providing quality craftsmanship for coastal homes.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Yarmouth, Maine, designed for coastal weather conditions with superior craftsmanship for waterfront properties.",
    localFactors: [
      "Royal River valley climate",
      "Coastal village properties",
      "Historic Main Street buildings",
      "Waterfront homes",
      "Salt air protection",
      "Traditional architecture preservation",
    ],
  },
  {
    name: "Freeport",
    slug: "freeport",
    county: "Cumberland",
    climate: "coastal",
    description: "Freeport roofing services for commercial and residential properties.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Freeport, Maine, designed for coastal weather conditions with commercial and residential expertise.",
    localFactors: [
      "Downtown commercial district",
      "Coastal residential areas",
      "L.L.Bean area properties",
      "Historic village roofing",
      "Mixed-use buildings",
      "Tourist district structures",
    ],
  },
  {
    name: "Brunswick",
    slug: "brunswick",
    county: "Cumberland",
    climate: "coastal",
    description: "Brunswick Maine roofing for historic preservation and modern installation.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Brunswick, Maine, designed for coastal weather conditions with historic preservation expertise.",
    localFactors: [
      "Bowdoin College area",
      "Historic Federal Street",
      "Former Naval Air Station",
      "Downtown historic district",
      "Coastal influence protection",
      "Architectural preservation",
    ],
  },
  {
    name: "Bath",
    slug: "bath",
    county: "Sagadahoc",
    climate: "coastal",
    description: "Bath roofing specialists serving maritime climate properties.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Bath, Maine, designed for maritime climate conditions with expertise in historic shipbuilding district properties.",
    localFactors: [
      "Kennebec River climate",
      "Maritime exposure",
      "Historic shipbuilding district",
      "Victorian architecture",
      "Coastal humidity management",
      "Salt spray resistance",
    ],
  },
  {
    name: "Lewiston",
    slug: "lewiston",
    county: "Androscoggin",
    climate: "inland",
    description: "Lewiston roofing contractor specializing in multi-family and commercial properties.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Lewiston, Maine, designed for inland weather conditions with multi-family and commercial expertise.",
    localFactors: [
      "Multi-family buildings",
      "Historic mill district",
      "Commercial properties",
      "Triple-decker homes",
      "Heavy snow load capacity",
      "Urban roofing challenges",
    ],
  },
  {
    name: "Gorham",
    slug: "gorham",
    county: "Cumberland",
    climate: "inland",
    description: "Gorham Maine roofing for suburban and rural properties.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Gorham, Maine, designed for inland weather conditions serving suburban and rural properties.",
    localFactors: [
      "Suburban neighborhoods",
      "Rural properties",
      "USM campus area",
      "Village historic district",
      "Heavy winter weather",
      "Ice dam prevention",
    ],
  },
  {
    name: "Windham",
    slug: "windham",
    county: "Cumberland",
    climate: "inland",
    description: "Windham roofing experts specializing in lakefront properties.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Windham, Maine, designed for inland weather conditions with lakefront property expertise.",
    localFactors: [
      "Sebago Lake properties",
      "Lakefront homes",
      "Suburban developments",
      "Moisture management",
      "Four-season climate",
      "Recreational property roofing",
    ],
  },
  {
    name: "Gray",
    slug: "gray",
    county: "Cumberland",
    climate: "inland",
    description: "Gray Maine roofing providing complete solutions for all seasons.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Gray, Maine, designed for inland weather conditions with four-season durability.",
    localFactors: [
      "Four-season extremes",
      "Rural and suburban mix",
      "Heavy snowfall areas",
      "Temperature fluctuations",
      "Agricultural buildings",
      "Residential developments",
    ],
  },
  {
    name: "Old Orchard Beach",
    slug: "old-orchard-beach",
    county: "York",
    climate: "coastal",
    description: "Old Orchard Beach roofing contractor for coastal environment properties.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Old Orchard Beach, Maine, designed for extreme coastal weather conditions with beachfront expertise.",
    localFactors: [
      "Direct beach exposure",
      "Salt spray damage prevention",
      "Tourist property maintenance",
      "Pier area buildings",
      "Seasonal property care",
      "Hurricane-force wind protection",
    ],
  },
  {
    name: "Kennebunk",
    slug: "kennebunk",
    county: "York",
    climate: "coastal",
    description: "Kennebunk roofing specialists for premium coastal installations.",
    directAnswer: "GraniteShield Roofing provides premium roofing, siding, and window systems in Kennebunk, Maine, designed for coastal weather conditions with luxury property expertise.",
    localFactors: [
      "Kennebunk Beach properties",
      "Historic village homes",
      "Luxury coastal estates",
      "Ocean Road properties",
      "Premium installations",
      "Architectural authenticity",
    ],
  },
];

export const getTownBySlug = (slug: string): TownData | undefined => {
  return TOWNS_DATA.find(town => town.slug === slug);
};

export const getAllTownSlugs = (): string[] => {
  return TOWNS_DATA.map(town => town.slug);
};

export const getTownsByCounty = () => {
  return TOWNS_DATA.reduce((acc, town) => {
    const county = town.county;
    if (!acc[county]) {
      acc[county] = [];
    }
    acc[county].push(town);
    return acc;
  }, {} as Record<string, TownData[]>);
};

/**
 * Get list of town names for service area display
 */
export const getServiceAreaNames = (): string[] => {
  return TOWNS_DATA.map(town => town.name);
};