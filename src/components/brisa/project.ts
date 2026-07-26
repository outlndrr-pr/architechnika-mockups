import type { Project } from "@/data/content";

const SERVICE_LABELS: Record<string, string> = {
  Architectural: "Architectural",
  Engineering: "Engineering",
  "Construction Mgmt": "Construction Management",
  "Construction Management": "Construction Management",
};

/** The scrape left market names and a split word inside a few service lists. */
export function services(p: Project): string[] {
  const out: string[] = [];
  for (const raw of p.services) {
    const label = SERVICE_LABELS[raw];
    if (label && !out.includes(label)) out.push(label);
  }
  return out;
}

/** "San Juan, PR" → "San Juan" */
export function city(p: Project): string {
  return (p.location ?? "").split(",")[0].trim();
}

/** The whole Passage card: one line under a cinema-size name. */
export function passageMeta(p: Project): string {
  const parts = [p.markets[0], p.location, services(p).join(" & ")];
  return parts.filter(Boolean).join(" · ");
}

export function heroImageOf(p: Project): string {
  return p.images[0];
}

export function altFor(p: Project, index = 0): string {
  const where = p.location ? `, ${p.location}` : "";
  return index === 0
    ? `${p.title}${where}`
    : `${p.title}${where} — view ${index + 1}`;
}

/** Projects that are not built yet must never read as built work. */
export function isProposal(p: Project): boolean {
  return !!p.status && /proposal|proposed/i.test(p.status);
}

export const CATEGORIES = [
  "todos",
  "Hospitality",
  "Residential",
  "Healthcare",
  "Sports",
  "Institutional",
  "Commercial",
] as const;
