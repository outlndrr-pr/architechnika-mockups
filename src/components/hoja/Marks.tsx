import type { CSSProperties, ReactNode } from "react";
import Reveal from "./Reveal";

/* ── Δ delta triangle ────────────────────────────────────────────────────── */

export function Delta({
  n,
  label,
  className = "",
}: {
  n: number;
  label?: string;
  className?: string;
}) {
  return (
    <span className={`hoja-delta hoja-mono ${className}`}>
      <svg width="10" height="9" viewBox="0 0 10 9" aria-hidden="true">
        <path
          d="M5 0.6 9.3 8.4 0.7 8.4 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <span>{n}</span>
      {label ? <span className="hoja-vh">{label}</span> : null}
    </span>
  );
}

/* ── ◀ ▶ set navigation arrows ───────────────────────────────────────────── */

export function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="8" height="9" viewBox="0 0 8 9" aria-hidden="true">
      <path
        d={dir === "prev" ? "M7.5 0.5 0.5 4.5 7.5 8.5 Z" : "M0.5 0.5 7.5 4.5 0.5 8.5 Z"}
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Ⓐ circled grid bubble ───────────────────────────────────────────────── */

export function Bubble({
  children,
  red = false,
}: {
  children: ReactNode;
  red?: boolean;
}) {
  return (
    <span className={`hoja-bubble${red ? " hoja-bubble--red" : ""}`} aria-hidden="true">
      {children}
    </span>
  );
}

/* ── dot leader row ──────────────────────────────────────────────────────── */

const DOTS = "·".repeat(200);

export function Leader({
  left,
  right,
  className = "",
}: {
  left: ReactNode;
  right: ReactNode;
  className?: string;
}) {
  return (
    <span className={`hoja-leader ${className}`}>
      <span>{left}</span>
      <span className="hoja-leader__dots" aria-hidden="true">
        {DOTS}
      </span>
      <span className="hoja-leader__r">{right}</span>
    </span>
  );
}

/* ── ├──── DIMENSION STRING ────┤ ────────────────────────────────────────── */

export function DimString({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <Reveal className={`hoja-dim hoja-mono ${className}`}>
      <span className="hoja-dim__cap" aria-hidden="true" />
      <span className="hoja-dim__line hoja-dim__line--l" aria-hidden="true" />
      <span className="hoja-dim__label">{label}</span>
      <span className="hoja-dim__line hoja-dim__line--r" aria-hidden="true" />
      <span className="hoja-dim__cap" aria-hidden="true" />
    </Reveal>
  );
}

/* ── mono text that types itself in ──────────────────────────────────────── */

export function TypeIn({
  text,
  className = "",
  as = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "span" | "div" | "h2";
}) {
  const n = Math.max(6, Math.min(text.length, 64));
  return (
    <Reveal
      as={as}
      className={`hoja-typein ${className}`}
      style={
        {
          "--typen": n,
          "--typedur": `${n * 22}ms`,
        } as CSSProperties
      }
    >
      <span className="hoja-typein__t" style={{ display: "inline-block" }}>
        {text}
      </span>
    </Reveal>
  );
}
