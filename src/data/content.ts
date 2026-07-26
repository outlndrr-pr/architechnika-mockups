// ─────────────────────────────────────────────────────────────────────────────
// Architechnika — single source of truth for all site content.
// Scraped from architechnika.com (Squarespace) 2026-07-26, corrected against
// public records (Ascend spelling, Becton Dickinson, proposal status labels).
// ─────────────────────────────────────────────────────────────────────────────

import projectsRaw from "./projects_final.json";
import cdnMapRaw from "./cdn_map.json";

const cdnMap: Record<string, string> = cdnMapRaw;

export type Market =
  | "Hospitality"
  | "Residential"
  | "Healthcare"
  | "Sports"
  | "Institutional"
  | "Commercial";

export interface Project {
  slug: string;
  title: string;
  description: string;
  year: string | null;
  client: string | null;
  location: string | null;
  size: string[];
  services: string[];
  markets: string[];
  categories: string[];
  images: string[]; // filenames under /images/full and /images/thumb
  status?: string; // e.g. "Completed — operating today", "Design proposal"
  note?: string; // extra verified context worth telling
}

// Per-project corrections & enrichment (research-verified).
const overrides: Record<string, Partial<Project>> = {
  "abitta-hotel-by-acend": {
    title: "Ábitta Hotel by Ascend",
    status: "Completed — operating today",
    note: "Now operating in Condado as the Ábitta Boutique Hotel, part of the Ascend Hotel Collection, steps from the Caribe Hilton.",
    description:
      "A 56-room existing building beside the Caribe Hilton in San Juan, remodeled to high-standard hospitality criteria, with outdoor pool facilities and a restaurant.",
  },
  "bd-molding-facilities": {
    title: "BD Molding Facilities",
    description:
      "Clean-room design and construction drawings for a Becton Dickinson plant in Columbus, Nebraska. The addition was integrated into an existing pharmaceutical plant.",
  },
  "normandie-hotel": {
    status: "Design proposal",
    note: "The Normandie — an Art Deco landmark listed on the National Register of Historic Places — was reimagined for an investor group: modern within, while preserving the historic ship-shaped silhouette and ornamental language of its era.",
    description:
      "The Normandie Hotel is one of San Juan's most iconic historic buildings, its streamline-moderne form recalling the great ocean liners. Our proposal for a group of investors modernized the interiors while preserving the historic ship shape and the architectural ornament of its era. Estimated construction cost: $75M.",
  },
  "eco-loiza-condo-hotel": {
    status: "Proposed development",
    description:
      "An eco-touristic hotel of 140 rooms and 14 villas proposed for the town of Loíza, with a budgeted construction cost of $35,000,000. Supporting facilities and ecological architectural highlights are incorporated throughout.",
  },
  "hibird-apartment-and-suites-hotel": {
    title: "HiBird Apartment & Suites Hotel",
    status: "Completed — operating today",
    note: "Operating today on Ashford Avenue, Condado, as a highly-rated aparthotel.",
    description:
      "The main reinforced seven-story concrete structure was updated and 27 apartments remodeled, with supporting gym, pool, parking structure and restaurant facilities. Contemporary architecture with high-tech systems and high-end apartment interiors.",
  },
  "raymond-dalmau-coliseum": {
    note: "Home court of the Piratas de Quebradillas and named for one of Puerto Rican basketball's greatest figures.",
  },
  "the-sand-and-the-sea": {
    title: "The Sand & The Sea",
    description:
      "High in the Cordillera Central above Cayey, this small boutique hotel crowns a mountaintop. A hacienda architectural character shapes the structure, its restaurant, and a great outdoor terrace with a magnificent view of the mountains.",
  },
  "casa-metropolitana-ii": {
    description:
      "This 80-apartment building comprises all supporting facilities necessary for elderly residents. Its modern expression — an eight-floor building with stepped apartment setbacks — integrates into its surroundings as part of a residential and institutional urban master plan, one of the best of its kind in metropolitan San Juan.",
  },
};

export const projects: Project[] = (projectsRaw as Project[]).map((p) => ({
  ...p,
  ...overrides[p.slug],
}));

export const featuredSlugs = [
  "hibird-apartment-and-suites-hotel",
  "normandie-hotel",
  "casa-caribe-boutique-hotel",
  "raymond-dalmau-coliseum",
  "the-sand-and-the-sea",
  "casa-metropolitana-ii",
];

export const featured = featuredSlugs.map(
  (s) => projects.find((p) => p.slug === s)!
);

export const markets: { name: Market; blurb: string }[] = [
  { name: "Hospitality", blurb: "Boutique hotel conversions and repositionings across Condado, Old San Juan and beyond — from historic landmarks to operating aparthotels." },
  { name: "Residential", blurb: "From luxury Dorado Beach residences to 2,700+ units of social-interest housing across the island." },
  { name: "Healthcare", blurb: "Hospitals, medical office buildings and pharmaceutical clean rooms in Puerto Rico and Nebraska." },
  { name: "Sports", blurb: "Coliseums, municipal complexes and training facilities — up to 10,000 seats." },
  { name: "Institutional", blurb: "Schools, churches, libraries and civic master plans for municipalities island-wide." },
  { name: "Commercial", blurb: "Shopping centers, industrial parks, offices — and over 350 service-station programs." },
];

export const firm = {
  name: "Architechnika",
  legalName: "ArchiTechnika, Inc.",
  tagline: "Architecture with Purpose. Built to Endure.",
  heroKicker: "Architecture rooted in purpose, shaped by experience.",
  subline:
    "Designing high-performance spaces that shape cities and elevate everyday life.",
  intro:
    "Architechnika is an architectural practice grounded in experience, technical precision, and purposeful design. From complex urban developments to refined architectural statements, we create environments that stand the test of time.",
  mantra: "Broad architectural experience, combined with technical innovation.",
  storyLead:
    "Architechnika's partners have led a diverse portfolio of design and construction projects for over 40 years. With more than 300 completed projects across Puerto Rico, the USA and the Virgin Islands, the practice spans every key building archetype: hospitality, pharmaceutical, residential, commercial, industrial and institutional — the sustainable focus and elegant, efficient solutions of a boutique design firm, at any scale.",
  address: "803 San Patricio Ave., San Juan, PR 00921",
  phone: "(787) 775-5500",
  phoneHref: "tel:+17877755500",
  email: "info@architechnika.com",
  founded: 1980,
  stats: [
    { value: "45+", label: "years of continuous practice" },
    { value: "300+", label: "completed projects" },
    { value: "6", label: "markets, one standard" },
    { value: "2,700+", label: "housing units delivered" },
  ],
  services: ["Architectural", "Engineering", "Construction Management"],
};

export const eras = [
  {
    period: "1980 — 1989",
    title: "Otero Ramos Arquitectos",
    text: "Our journey began in 1980, when architecture-school friends Arq. Andrés Otero and Arq. Jorge Ramos founded Otero Ramos Arquitectos — a partnership that lasted a decade and established the principles that still drive the firm: architectural excellence through technical innovation, delivered with personal service.",
    highlights: [
      "Puerto Rico Telephone Company exchange buildings across the island",
      "150+ gas stations built and remodeled for Esso and Shell; 20+ for Texaco",
      "Hospital Hermanos Meléndez, Bayamón",
      "Hospital Guadalupe expansion, Hato Rey",
      "Schools in Bo. Guanábano, Aguada",
      "20+ private residences in San Juan, Guaynabo and Dorado",
    ],
  },
  {
    period: "1990 — 2009",
    title: "Andres Otero & Associates → Servicios Técnicos y Desarrollos",
    text: "In 1990 Andrés Otero founded Andres Otero & Associates, which in 1995 became Servicios Técnicos y Desarrollos Inc. — the venture under which the Architechnika brand was born. Andrés Otero Jr. began his architecture studies in this era and started steering the firm toward new technology, laying the bedrock for its next evolution.",
    highlights: [
      "Bayamón Medical Plaza and Hospital Hnos. Meléndez expansions",
      "Retail programs: Sam's, Builders Square (Costco), Kmart, Marshalls",
      "Hatillo, Vega Baja & Quebradillas municipal coliseums",
      "Master plans, terminals and malecón for municipalities island-wide",
      "2,700+ dwellings of social-interest housing",
      "Travenol clean-room facilities, Barceloneta",
    ],
  },
  {
    period: "2010 — Today",
    title: "ArchiTechnika, Inc.",
    text: "In 2009, ArchiTechnika Inc. was born: father and son as partners, and a new way of engaging the design process. An early adopter of 3D, BIM and project-management platforms, the firm became a lean boutique studio that handles projects of any scale through technology and strategic partnerships — every project receiving the same dedication and attention to detail.",
    highlights: [
      "Hotel conversions and repositionings across Condado & Old San Juan — Kimpton, Aloft, Selina, Ascend",
      "HiBird Apartment & Suites Hotel, Ashford Avenue",
      "Normandie Hotel repositioning proposal",
      "Luxury residences at Dorado Beach and Palmas del Mar",
      "Work across Puerto Rico, Nebraska and Florida",
      "Master plans: Ciudad Roberto Clemente, Guaynabo Urban Center",
    ],
  },
];

export const team = [
  {
    name: "Andrés Otero Sr.",
    role: "The Founder",
    credentials: "M.Arch, University of Puerto Rico · Registered Architect, PR & Nebraska",
    bio: "A Puerto Rico and Nebraska-registered architect with more than 44 years of experience, Andrés Otero has led projects spanning commercial centers, healthcare, pharmaceutical and institutional work, and master plans for government and private clients. His client roster ranges from the University of Puerto Rico, Travenol Laboratories and General Electric to Esso, Shell and Texaco — for whom he directed the architectural conversion of more than 350 service stations across the island — alongside the municipalities of Quebradillas, Bayamón, Vega Baja and Aguada. As president of Servicios Técnicos y Desarrollos, he served as direct associate to developers on more than 2,700 units of social-interest housing.",
  },
  {
    name: "Andrés Otero Jr.",
    role: "The Innovator",
    credentials: "MBA, Tulane University · Licensed Real Estate Broker",
    bio: "The innovating life force behind the firm he co-founded with his father. An early believer in 3D design, he introduced BIM to the practice — Revit, 3ds Max and AutoCAD are its production backbone — after completing a computer-animation program and certificates in real-estate development and project management. As a developer, he led three luxury condominium projects totaling 110 units and over $90M in value through design, permitting and pre-sales. He has served as principal architectural consultant to hospitality developers for over a decade, and as special-projects and branding consultant to Méndez & Co. / Heineken Caribbean from 2003 to 2016. His body of work exceeds 100 architectural projects.",
  },
  {
    name: "Luis I. Tua",
    role: "The Technician",
    credentials: "B.S. Civil Engineering, Polytechnic University of PR",
    bio: "The core of the firm's production through every iteration since 1980, when he joined Otero Ramos Arquitectos as its first line man. He has developed the construction documents for more than 300 projects and has led permitting, project supervision and engineering design for much of his career — earning his civil engineering degree along the way. Fluent in AutoCAD and Revit, he now trains the new generation of young architects and engineers who carry the firm's tradition forward.",
  },
];

export const heroImages = {
  towers: "7cdb80eb_Twin_towers_with_elegant_entrance.jpg",
  sunset: "311079db_Tranquil_sunset_over_luxury_residences.jpg",
  render3: "b8bb1657_ChatGPT_Image_Jan_2_2C_2026_2C_02_10_34_PM.jpg",
  hibirdNight: "6bc24b01_HIBIRD-ASHFORD_9.jpg",
  normandieAerial: "69e2f5d6_Picture1.jpg",
};

/**
 * Image URL resolver. Serves from the original Squarespace CDN (still live)
 * so deployments don't need to ship ~50MB of local imagery; falls back to
 * the local copies under /public/images for any unmapped file.
 */
export function img(file: string, kind: "full" | "thumb" = "full") {
  const cdn = cdnMap[file];
  if (cdn) return `${cdn}?format=${kind === "full" ? "2500w" : "800w"}`;
  return `/images/${kind}/${file}`;
}

export function projectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// Municipality names the firm has built in — for marquees / footers.
export const municipalities = [
  "San Juan", "Bayamón", "Guaynabo", "Carolina", "Aguada", "Quebradillas",
  "Vega Baja", "Vega Alta", "Cayey", "Loíza", "Ponce", "Arecibo", "Hatillo",
  "Juncos", "Humacao", "Dorado", "Moca", "Maunabo", "Cidra", "Barceloneta",
  "Toa Baja", "Toa Alta", "Orocovis", "Utuado", "Guayama", "Ceiba", "Jayuya",
  "Cataño", "Guánica", "Luquillo",
];
