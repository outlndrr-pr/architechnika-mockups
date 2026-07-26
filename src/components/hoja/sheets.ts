// ─────────────────────────────────────────────────────────────────────────────
// HOJA 01 — the sheet index.
// Every route and every project has a sheet number, the way every drawing in a
// set has one. This module is the single place those numbers are assigned.
// ─────────────────────────────────────────────────────────────────────────────

import { projects, type Project } from "@/data/content";

/** Set order. Not alphabetical — the order a set is bound in. */
const SET_ORDER = [
  "normandie-hotel",
  "bayamon-medical-center",
  "raymond-dalmau-coliseum",
  "hibird-apartment-and-suites-hotel",
  "casa-caribe-boutique-hotel",
  "abitta-hotel-by-acend",
  "the-sand-and-the-sea",
  "eco-loiza-condo-hotel",
  "casa-metropolitana-ii",
  "casa-metropolitana-i",
  "aguadas-sports-complex",
  "baseball-training-facilities",
  "fine-arts-school",
  "bd-molding-facilities",
  "gonzi-industrial-park",
];

/** Projects in set order, with any slug not listed appended at the back. */
export const sheetSet: Project[] = [
  ...SET_ORDER.map((s) => projects.find((p) => p.slug === s)).filter(
    (p): p is Project => Boolean(p)
  ),
  ...projects.filter((p) => !SET_ORDER.includes(p.slug)),
];

export function sheetNo(slug: string): string {
  const i = sheetSet.findIndex((p) => p.slug === slug);
  return i < 0 ? "A-2XX" : `A-${201 + i}`;
}

export function sheetIndex(slug: string): number {
  return sheetSet.findIndex((p) => p.slug === slug);
}

export const ROUTE_SHEETS: { href: string; sheet: string; label: string }[] = [
  { href: "/hoja", sheet: "A-100", label: "HOME" },
  { href: "/hoja/portfolio", sheet: "A-200", label: "WORK" },
  { href: "/hoja/story", sheet: "A-300", label: "STUDIO" },
  { href: "/hoja/team", sheet: "A-400", label: "TEAM" },
  { href: "/hoja/contact", sheet: "A-900", label: "CONTACT" },
];

/** Resolves any /hoja/* pathname to the SHEET cell of the title block. */
export function sheetForPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "") || "/hoja";
  const m = clean.match(/^\/hoja\/portfolio\/(.+)$/);
  if (m) {
    const p = sheetSet.find((x) => x.slug === m[1]);
    if (p) return `${sheetNo(p.slug)} ${shortTitle(p.title)}`;
    return "A-2XX SHEET NOT IN SET";
  }
  const r = ROUTE_SHEETS.find((x) => x.href === clean);
  return r ? `${r.sheet} ${r.label}` : "A-000 UNISSUED";
}

/** Title trimmed to something that fits a title-block cell. */
export function shortTitle(t: string): string {
  const s = t
    .replace(/\s+(Hotel|Coliseum|Facilities|Complex|School|Park|Center)\b/gi, "")
    .replace(/\s*&\s*Suites\b/i, "")
    .replace(/\s+by\s+\w+$/i, "")
    .trim();
  return (s.length >= 4 ? s : t).toUpperCase();
}

// ── Typology (CAD layer) system ──────────────────────────────────────────────

export const LAYERS = [
  "Hospitality",
  "Residential",
  "Healthcare",
  "Sports",
  "Institutional",
  "Commercial",
] as const;

export type Layer = (typeof LAYERS)[number];

/** Each typology gets a hatch, the way each material does on a legend sheet. */
export const HATCH: Record<string, string> = {
  Hospitality:
    "repeating-linear-gradient(45deg, transparent 0 3px, currentColor 3px 4px)",
  Residential:
    "repeating-linear-gradient(-45deg, transparent 0 3px, currentColor 3px 4px)",
  Healthcare:
    "repeating-linear-gradient(0deg, transparent 0 3px, currentColor 3px 4px)",
  Sports:
    "repeating-linear-gradient(90deg, transparent 0 3px, currentColor 3px 4px)",
  Institutional:
    "repeating-linear-gradient(45deg, transparent 0 2px, currentColor 2px 3px), repeating-linear-gradient(-45deg, transparent 0 2px, currentColor 2px 3px)",
  Commercial:
    "radial-gradient(circle, currentColor 0.8px, transparent 0.9px) 0 0 / 5px 5px",
};

export function layersOf(p: Project): string[] {
  const m = p.markets?.length ? p.markets : p.categories;
  return (m ?? []).filter((x) => (LAYERS as readonly string[]).includes(x));
}

// ── Municipalities: real names, real ZIPs, real positions ────────────────────

export interface Muni {
  key: string; // as spelled in the source records
  name: string; // as spelled in Spanish
  zip: string;
  x: number;
  y: number;
}

/** Positions plotted from lat/long onto the survey outline in PlotMap. */
export const MUNIS: Muni[] = [
  { key: "San Juan", name: "San Juan", zip: "00907", x: 218, y: 31 },
  { key: "Guaynabo", name: "Guaynabo", zip: "00969", x: 217, y: 47 },
  { key: "Bayamon", name: "Bayamón", zip: "00961", x: 206, y: 41 },
  { key: "Vega Baja", name: "Vega Baja", zip: "00693", x: 168, y: 34 },
  { key: "Loiza", name: "Loíza", zip: "00772", x: 257, y: 36 },
  { key: "Cayey", name: "Cayey", zip: "00736", x: 208, y: 80 },
  { key: "Quebradillas", name: "Quebradillas", zip: "00678", x: 72, y: 31 },
  { key: "Aguada", name: "Aguada", zip: "00602", x: 28, y: 44 },
];

const OFF_ISLAND: Record<string, { name: string; zip: string }> = {
  Columbus: { name: "Columbus, Nebraska", zip: "68601" },
};

export interface Loc {
  city: string;
  region: string;
  name: string;
  zip: string | null;
}

/** "Bayamon, PR" → { name: "Bayamón", zip: "00961", region: "PR" } */
export function parseLoc(location: string | null): Loc {
  if (!location) return { city: "", region: "", name: "UNDETERMINED", zip: null };
  const [rawCity, rawRegion] = location.split(",").map((s) => s.trim());
  const city = rawCity ?? "";
  const region = rawRegion ?? "";
  const muni = MUNIS.find((m) => m.key === city);
  if (muni) return { city, region, name: muni.name, zip: muni.zip };
  const off = OFF_ISLAND[city];
  if (off) return { city, region, name: off.name, zip: off.zip };
  return { city, region, name: city, zip: null };
}

/** `LOC: SAN JUAN, PR 00907` */
export function locCode(location: string | null): string {
  const l = parseLoc(location);
  if (!l.city) return "UNDETERMINED";
  const base = `${l.name.split(",")[0]}, ${l.region}`.toUpperCase();
  return l.zip ? `${base} ${l.zip}` : base;
}

/** Projects per municipality, for the plot map. */
export function plotCounts(): (Muni & { n: number })[] {
  return MUNIS.map((m) => ({
    ...m,
    n: sheetSet.filter((p) => parseLoc(p.location).city === m.key).length,
  })).filter((m) => m.n > 0);
}

// ── Status, honestly ─────────────────────────────────────────────────────────

export type StatusKind = "built" | "proposal" | "unrecorded";

export function statusOf(p: Project): { kind: StatusKind; text: string } {
  const s = p.status ?? "";
  if (/^completed/i.test(s)) return { kind: "built", text: "BUILT — OPERATING" };
  if (/proposal/i.test(s)) return { kind: "proposal", text: "PROPOSAL" };
  if (/proposed/i.test(s))
    return { kind: "proposal", text: "PROPOSED DEVELOPMENT" };
  if (s) return { kind: "unrecorded", text: s.toUpperCase() };
  return { kind: "unrecorded", text: "NOT NOTED IN RECORD" };
}

/** Only projects verified as completed and operating carry a revision cloud. */
export function isRevised(p: Project): boolean {
  return statusOf(p).kind === "built";
}

/** The dimension string a project is best described by. */
export function primaryDim(p: Project): string {
  const size = p.size ?? [];
  const preferred =
    size.find((s) => /seat|bed|room|student|person|apt|unit/i.test(s)) ??
    size[0];
  return (preferred ?? "SCOPE NOT DIMENSIONED").toUpperCase();
}

export function sizeLine(p: Project): string {
  return (p.size ?? []).join(" · ").toUpperCase() || "—";
}

/** The source records carry a scrape artefact in `services`. Filter to real. */
const REAL_SERVICES = ["Architectural", "Engineering", "Construction Mgmt"];

export function servicesOf(p: Project): string[] {
  return REAL_SERVICES.filter((s) => (p.services ?? []).includes(s));
}

export function deliveryLine(p: Project): string {
  const s = servicesOf(p);
  return s.length ? s.join(" + ").toUpperCase() : "ARCHITECTURAL";
}
