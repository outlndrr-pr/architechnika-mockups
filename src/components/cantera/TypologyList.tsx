"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { img, markets } from "@/data/content";
import { countIn, firstImageOfMarket, slugifyMarket } from "./lib";

/**
 * Landing §5 — the typologies as a hairline list with a held image preview.
 * Counts are honest: they count the plates published in this index, not the
 * three hundred projects behind them.
 */
export default function TypologyList() {
  const [active, setActive] = useState<string | null>(null);
  const previews = markets.map((m) => ({
    name: m.name as string,
    ...firstImageOfMarket(m.name),
  }));

  return (
    <div className="c-grid c-flatfile">
      <div className="col-1-7">
        <ul className="c-typologies">
          {markets.map((m) => (
            <li
              className="c-typology"
              key={m.name}
              onMouseEnter={() => setActive(m.name)}
              onMouseLeave={() => setActive(null)}
            >
              <Link
                href={`/cantera/portfolio#${slugifyMarket(m.name)}`}
                className="c-typology__link"
                onFocus={() => setActive(m.name)}
                onBlur={() => setActive(null)}
              >
                <span className="c-typology__name">{m.name}</span>
                <span className="c-typology__count">
                  {String(countIn(m.name)).padStart(2, "0")} plates
                </span>
                <span className="c-typology__blurb">{m.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-8-12">
        <div className="c-preview" aria-hidden="true">
          <div className="c-preview__frame">
            {previews.map((p) => (
              <Image
                key={p.name}
                src={img(p.file, "thumb")}
                alt=""
                fill
                sizes="(min-width: 62rem) 34vw, 1px"
                quality={75}
                className={active === p.name ? "is-active" : undefined}
              />
            ))}
          </div>
          <p className="c-preview__caption">
            {active
              ? (() => {
                  const p = previews.find((x) => x.name === active);
                  return p ? `${p.title}, ${p.where}.` : null;
                })()
              : "Six markets, one standard."}
          </p>
        </div>
      </div>
    </div>
  );
}
