"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { sheetForPath } from "./sheets";

/** The set was issued on this date. It does not re-issue itself on page load. */
const ISSUE_DATE = "2026-07-26";
const REVS = 8;

/**
 * The persistent title block. Fixed to the bottom of the viewport, the way it
 * is fixed to the bottom-right of every sheet in the set.
 *
 * SHEET reflects the current route. REV reflects scroll depth — the only
 * scroll listener on the site, throttled to one read per animation frame.
 */
export default function TitleBlock() {
  const pathname = usePathname() || "/hoja";
  const [rev, setRev] = useState(1);
  const [flash, setFlash] = useState(false);
  const revRef = useRef(1);

  useEffect(() => {
    let frame = 0;
    let flashTimer: ReturnType<typeof setTimeout> | undefined;

    const read = () => {
      frame = 0;
      const doc = document.documentElement;
      const span = doc.scrollHeight - doc.clientHeight;
      const pct = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
      const next = Math.min(REVS, Math.floor(pct * REVS) + 1);
      if (next !== revRef.current) {
        revRef.current = next;
        setRev(next);
        setFlash(true);
        if (flashTimer) clearTimeout(flashTimer);
        flashTimer = setTimeout(() => setFlash(false), 180);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      if (flashTimer) clearTimeout(flashTimer);
    };
  }, [pathname]);

  const sheet = sheetForPath(pathname);

  return (
    <div
      className="hoja-tb hoja-mono"
      role="complementary"
      aria-label="Title block"
    >
      <Cell k="Firm" v="ArchiTechnika, Inc." mod="brand" />
      <Cell k="Localización / Location" v="San Juan, PR" drop />
      <Cell k="Hoja / Sheet" v={sheet} />
      <Cell k="Escala / Scale" v="N.T.S." drop />
      <div
        className="hoja-tb__cell hoja-tb__cell--rev"
        data-flash={flash ? "1" : "0"}
      >
        <span className="hoja-tb__k">Rev</span>
        <span className="hoja-tb__v">
          {String(rev).padStart(2, "0")} / {String(REVS).padStart(2, "0")}
        </span>
      </div>
      <Cell k="Fecha / Date" v={ISSUE_DATE} drop />
      <div className="hoja-tb__cell hoja-tb__spacer" aria-hidden="true" />
    </div>
  );
}

function Cell({
  k,
  v,
  drop = false,
  mod,
}: {
  k: string;
  v: string;
  drop?: boolean;
  mod?: string;
}) {
  return (
    <div
      className={`hoja-tb__cell${drop ? " hoja-tb__cell--drop" : ""}${
        mod ? ` hoja-tb__cell--${mod}` : ""
      }`}
    >
      <span className="hoja-tb__k">{k}</span>
      <span className="hoja-tb__v">{v}</span>
    </div>
  );
}
