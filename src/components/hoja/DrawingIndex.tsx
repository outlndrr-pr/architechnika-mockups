import Link from "next/link";
import Reveal from "./Reveal";
import { Leader } from "./Marks";
import { ROUTE_SHEETS } from "./sheets";

const NOTES: Record<string, string> = {
  "/hoja": "THIS SHEET",
  "/hoja/portfolio": "300+ PROJECTS",
  "/hoja/story": "1980 — 2026",
  "/hoja/team": "3 PRINCIPALS",
  "/hoja/contact": "(787) 775-5500",
};

/**
 * Signature moment A — the drawing index is the navigation. You find your way
 * around this firm the way a superintendent finds their way around a set.
 */
export default function DrawingIndex() {
  return (
    <Reveal className="hoja-index">
      <div className="hoja-index__head hoja-tick">
        <span>Índice de hojas / Drawing index</span>
        <span>05 HOJAS</span>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {ROUTE_SHEETS.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="hoja-index__row hoja-mono">
              <span className="hoja-index__n">{r.sheet}</span>
              <span className="hoja-index__name">{r.label}</span>
              <Leader left="" right={NOTES[r.href] ?? ""} />
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
