import { projects, type Project } from "@/data/content";

/* --------------------------------------------------------------------------
   Cantera — presentation helpers.
   Nothing here invents a fact: it only corrects orthography (Spanish
   municipality names carry their accents), filters scrape artefacts out of the
   `services` arrays, and derives ordering.
   -------------------------------------------------------------------------- */

/** Municipality names are always Spanish, roman — never italic, never anglicised. */
const SPANISH: Record<string, string> = {
  Bayamon: "Bayamón",
  Loiza: "Loíza",
  Rio: "Río",
  Catano: "Cataño",
  Guanica: "Guánica",
  Mayaguez: "Mayagüez",
  Anasco: "Añasco",
  Manati: "Manatí",
};

const US_STATES: Record<string, string> = {
  NE: "Nebraska",
  FL: "Florida",
  PR: "Puerto Rico",
};

export function spanish(text: string): string {
  return text.replace(
    /\b(Bayamon|Loiza|Rio|Catano|Guanica|Mayaguez|Anasco|Manati)\b/g,
    (m) => SPANISH[m] ?? m
  );
}

/** "Bayamon, PR" → "Bayamón" */
export function municipality(location: string | null): string {
  if (!location) return "—";
  return spanish(location.split(",")[0].trim());
}

/** "Columbus, NE" → "Nebraska"; "San Juan, PR" → "Puerto Rico" */
export function region(location: string | null): string {
  if (!location) return "";
  const parts = location.split(",");
  const code = (parts[1] ?? "").trim();
  return US_STATES[code] ?? code;
}

/** "Bayamon, PR" → "Bayamón, Puerto Rico" */
export function place(location: string | null): string {
  if (!location) return "—";
  const r = region(location);
  return r ? `${municipality(location)}, ${r}` : municipality(location);
}

export function title(p: Project): string {
  return spanish(p.title);
}

/** The scrape split "Markets" across two array entries on one record. */
const REAL_SERVICES: Record<string, string> = {
  Architectural: "Architectural",
  Engineering: "Engineering",
  "Construction Mgmt": "Construction Management",
  "Construction Management": "Construction Management",
};

export function services(p: Project): string[] {
  const seen = new Set<string>();
  for (const s of p.services) {
    const clean = REAL_SERVICES[s.trim()];
    if (clean) seen.add(clean);
  }
  return [...seen];
}

export function typology(p: Project): string {
  return p.markets[0] ?? p.categories[0] ?? "Architecture";
}

export function typologies(p: Project): string {
  return p.markets.join(" · ");
}

/** Newest first; undated last. Stable and deterministic for static generation. */
export const indexed: Project[] = [...projects].sort((a, b) => {
  const ya = Number(a.year ?? 0);
  const yb = Number(b.year ?? 0);
  if (yb !== ya) return yb - ya;
  return a.title.localeCompare(b.title);
});

export function projectIndex(slug: string): number {
  return indexed.findIndex((p) => p.slug === slug);
}

export function neighbours(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const i = projectIndex(slug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? indexed[i - 1] : null,
    next: i < indexed.length - 1 ? indexed[i + 1] : null,
  };
}

export const marketNames = [
  "Hospitality",
  "Residential",
  "Healthcare",
  "Sports",
  "Institutional",
  "Commercial",
] as const;

export function countIn(market: string): number {
  return projects.filter((p) => p.markets.includes(market)).length;
}

export function firstImageOfMarket(market: string): {
  file: string;
  title: string;
  where: string;
} {
  const p = indexed.find((x) => x.markets.includes(market)) ?? indexed[0];
  return { file: p.images[0], title: title(p), where: municipality(p.location) };
}

/** "Hospitality" → "hospitality", used for the portfolio's hash deep-links. */
export function slugifyMarket(market: string): string {
  return market.toLowerCase();
}

/** Two-digit plate numbers: 01, 02 … 15. */
export function plate(n: number): string {
  return String(n).padStart(2, "0");
}

/** Alt text: project title + the context of the frame. */
export function alt(p: Project, i: number): string {
  const where = place(p.location);
  return i === 0
    ? `${title(p)}, ${where} — ${typology(p).toLowerCase()} project by ArchiTechnika.`
    : `${title(p)}, ${where} — view ${plate(i + 1)} of ${p.images.length}.`;
}
