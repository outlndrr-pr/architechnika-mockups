"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { img } from "@/data/content";
import {
  indexed,
  marketNames,
  municipality,
  slugifyMarket,
  title,
  typology,
} from "./lib";

const FILTERS = ["All", ...marketNames] as const;

/**
 * Signature moment B — The Flat File.
 * A typographic index, not a grid. Hovering a row lifts it out of the drawer:
 * neighbours dim, its baseline rule thickens to two points of cantera, and the
 * plate arrives in the held right column.
 */
export default function PortfolioIndex() {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<string | null>(null);

  /* Deep links from the landing typology list: /cantera/portfolio#hospitality */
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash) return;
    const match = marketNames.find((m) => slugifyMarket(m) === hash);
    if (match) setFilter(match);
  }, []);

  const rows = useMemo(
    () =>
      filter === "All"
        ? indexed
        : indexed.filter((p) => p.markets.includes(filter)),
    [filter]
  );

  return (
    <div className="c-grid c-flatfile">
      <div className="col-1-7">
        <ul className="c-filters">
          {FILTERS.map((f) => (
            <li key={f}>
              <button
                type="button"
                className="c-filter"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            </li>
          ))}
        </ul>

        <p aria-live="polite" className="c-visually-hidden">
          {rows.length} {rows.length === 1 ? "project" : "projects"} shown
          {filter === "All" ? "" : ` in ${filter}`}.
        </p>

        <ul className="c-list">
          {rows.map((p) => (
            <li
              className="c-row"
              key={p.slug}
              onMouseEnter={() => setActive(p.slug)}
              onMouseLeave={() => setActive(null)}
            >
              <Link
                href={`/cantera/portfolio/${p.slug}`}
                className="c-row__link"
                onFocus={() => setActive(p.slug)}
                onBlur={() => setActive(null)}
              >
                <span className="c-row__name">{title(p)}</span>
                <span className="c-row__facts c-small">
                  <span className="c-row__thumb">
                    <Image
                      src={img(p.images[0], "thumb")}
                      alt=""
                      fill
                      sizes="88px"
                      quality={60}
                    />
                  </span>
                  <span>{typology(p)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{municipality(p.location)}</span>
                  {p.status ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="c-row__status">{p.status}</span>
                    </>
                  ) : null}
                </span>
                <span className="c-row__year">{p.year ?? "—"}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-8-12">
        <div className="c-preview" aria-hidden="true">
          <div className="c-preview__frame">
            {indexed.map((p) => (
              <Image
                key={p.slug}
                src={img(p.images[0], "thumb")}
                alt=""
                fill
                sizes="(min-width: 62rem) 34vw, 1px"
                quality={75}
                className={active === p.slug ? "is-active" : undefined}
              />
            ))}
          </div>
          <p className="c-preview__caption">
            {active
              ? (() => {
                  const p = indexed.find((x) => x.slug === active);
                  return p
                    ? `${title(p)} — ${municipality(p.location)}, ${p.year}.`
                    : null;
                })()
              : `${rows.length} of three hundred. The rest are in the flat file.`}
          </p>
        </div>
      </div>
    </div>
  );
}
