"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

/**
 * Signature moment A — The Ledger.
 * A hairline-ruled table of the firm's real output. Every figure below is
 * carried in src/data/content.ts (firm.stats, the principals' records, the
 * project sizes). It contains no adjectives.
 */
const ROWS: {
  n: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
}[] = [
  {
    n: 45,
    suffix: "+",
    label: "years of continuous practice",
    note: "Since 1980",
  },
  {
    n: 300,
    suffix: "+",
    label: "completed projects",
    note: "Puerto Rico · USA · USVI",
  },
  {
    n: 350,
    suffix: "+",
    label: "service stations converted",
    note: "Esso · Shell · Texaco",
  },
  {
    n: 2700,
    suffix: "+",
    label: "dwellings of social-interest housing",
    note: "Servicios Técnicos y Desarrollos",
  },
  {
    n: 10000,
    label: "seats, Raymond Dalmau Coliseum",
    note: "Quebradillas",
  },
  {
    n: 200,
    label: "beds, Bayamón Medical Center",
    note: "Hospital Hnos. Meléndez",
  },
  {
    n: 90,
    prefix: "$",
    suffix: "M+",
    label: "in developed value, 110 units",
    note: "Three condominiums",
  },
];

const DURATION = 1200;
const fmt = new Intl.NumberFormat("en-US");

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

export default function Ledger() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [progress, setProgress] = useState(0);
  // Rendered complete on the server and for anyone without scripting; the
  // count-up only arms itself once the client has taken over.
  const [armed, setArmed] = useState(false);
  useEffect(() => setArmed(true), []);

  useEffect(() => {
    if (!inView || progress === 1) return;

    const reduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      setProgress(easeOutQuint(t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // Runs exactly once, on entry.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const shown = armed ? progress : 1;

  return (
    <div ref={ref} className="c-ledger">
      {ROWS.map((row) => (
        <div className="c-ledger__row" key={row.label}>
          <div className="c-ledger__value">
            {row.prefix}
            {fmt.format(Math.round(row.n * shown))}
            {row.suffix}
          </div>
          <div className="c-ledger__label">{row.label}</div>
          <div className="c-ledger__note">{row.note}</div>
        </div>
      ))}
    </div>
  );
}
