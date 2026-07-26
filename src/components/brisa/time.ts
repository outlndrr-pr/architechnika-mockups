// La Hora — the site knows what time it is in San Juan.
// Shared by the server render and the client tick so both agree on the hour
// and nothing shifts on hydration.

export const PR_TZ = "America/Puerto_Rico";

export type DayMoment =
  | "amanecer"
  | "mañana"
  | "mediodía"
  | "tarde"
  | "atardecer"
  | "noche";

/** Hour (0–23) right now in Puerto Rico. */
export function prHour(date: Date = new Date()): number {
  const h = new Intl.DateTimeFormat("en-US", {
    timeZone: PR_TZ,
    hour: "numeric",
    hour12: false,
  }).format(date);
  // "24" is emitted by some engines for midnight.
  return Number(h) % 24;
}

/** Clock face, e.g. "6:47 PM". */
export function prClock(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: PR_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function dayMoment(hour: number): DayMoment {
  if (hour >= 5 && hour < 7) return "amanecer";
  if (hour >= 7 && hour < 12) return "mañana";
  if (hour >= 12 && hour < 14) return "mediodía";
  if (hour >= 14 && hour < 18) return "tarde";
  if (hour >= 18 && hour < 20) return "atardecer";
  return "noche";
}

/** Night runs 20:00 → 05:00 AST. The hero picks its photograph from this. */
export function isNight(hour: number): boolean {
  return hour >= 20 || hour < 5;
}

export interface Hora {
  clock: string;
  moment: DayMoment;
  hour: number;
}

export function readHora(date: Date = new Date()): Hora {
  const hour = prHour(date);
  return { clock: prClock(date), moment: dayMoment(hour), hour };
}
