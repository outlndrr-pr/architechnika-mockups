"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { img, type Project } from "@/data/content";
import { dims } from "./imageMeta";
import { CATEGORIES, altFor } from "./project";

/**
 * The Contact Sheet — CSS-columns masonry at each photograph's natural ratio.
 * Nothing is cropped. The filter is a row of Instrument Serif italic words:
 * the active one stands up into roman, in sol. Filtering changes the
 * letterform. That is the whole interaction.
 */
export default function ContactSheet({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("todos");

  const shown = useMemo(
    () =>
      active === "todos"
        ? projects
        : projects.filter((p) => p.categories.includes(active)),
    [active, projects]
  );

  return (
    <>
      <div className="b-filters" role="group" aria-label="Filter work by market">
        {CATEGORIES.map((c, i) => (
          <span key={c} style={{ display: "contents" }}>
            <button
              type="button"
              className="b-filter"
              aria-pressed={active === c}
              onClick={() => setActive(c)}
            >
              {c === "todos" ? c : c.toLowerCase()}
            </button>
            {i < CATEGORIES.length - 1 ? (
              <span className="b-filter-sep" aria-hidden="true">
                ·
              </span>
            ) : null}
          </span>
        ))}
      </div>

      <p className="b-vh" role="status" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projects"} shown
        {active === "todos" ? "" : ` in ${active}`}.
      </p>

      <div className="b-sheet" style={{ marginTop: "clamp(2.5rem, 6vw, 5rem)" }}>
        {shown.map((p) => {
          const file = p.images[0];
          const { width, height } = dims(file);
          return (
            <Link
              key={p.slug}
              href={`/brisa/portfolio/${p.slug}`}
              className="b-sheet-item"
            >
              <Image
                src={img(file, "thumb")}
                alt={altFor(p)}
                width={width}
                height={height}
                quality={75}
                sizes="(max-width: 560px) 92vw, (max-width: 980px) 46vw, 31vw"
              />
              <span className="b-sheet-cap">
                <span className="b-sheet-cap-title">{p.title}</span>
                <span className="b-sheet-cap-meta">
                  {[p.markets[0], p.location, p.year].filter(Boolean).join(" · ")}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
