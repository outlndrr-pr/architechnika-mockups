"use client";

import { useState, type ReactNode } from "react";
import { Delta } from "./Marks";

export interface RevRow {
  n: number;
  date: string;
  desc: string;
  by: string;
  period?: string;
  title?: string;
  text?: string;
  highlights?: string[];
  media?: ReactNode;
}

/**
 * Signature moment C — the firm's history as the revision block of a drawing
 * set. Four names, one practice, one address. Rows expand into the era.
 */
export default function RevisionHistory({
  rows,
  expandable = true,
  caption = "Historial de revisiones / Revision history",
}: {
  rows: RevRow[];
  expandable?: boolean;
  caption?: string;
}) {
  const [open, setOpen] = useState<number | null>(expandable ? rows[0]?.n ?? null : null);

  return (
    <div className="hoja-rev">
      <div className="hoja-rev__head hoja-tick">
        <span>Rev</span>
        <span>Fecha</span>
        <span>Descripción / Description</span>
        <span className="hoja-rev__by">Por / By</span>
      </div>

      {rows.map((r) => {
        const isOpen = open === r.n;
        return (
          <div key={r.n} className="hoja-rev__row" data-open={isOpen ? "1" : "0"}>
            {expandable ? (
              <h3 style={{ margin: 0 }}>
                <button
                  type="button"
                  className="hoja-rev__btn"
                  aria-expanded={isOpen}
                  aria-controls={`rev-${r.n}`}
                  onClick={() => setOpen(isOpen ? null : r.n)}
                >
                  <span>
                    <Delta n={r.n} />
                  </span>
                  <span>{r.date}</span>
                  <span className="hoja-rev__d">{r.desc}</span>
                  <span className="hoja-rev__by">{r.by}</span>
                </button>
              </h3>
            ) : (
              <div className="hoja-rev__btn" style={{ cursor: "default" }}>
                <span>
                  <Delta n={r.n} />
                </span>
                <span>{r.date}</span>
                <span className="hoja-rev__d">{r.desc}</span>
                <span className="hoja-rev__by">{r.by}</span>
              </div>
            )}

            {expandable ? (
              <div className="hoja-rev__panel" id={`rev-${r.n}`} inert={!isOpen}>
                <div className="hoja-rev__panelin">
                  <div className="hoja-rev__content">
                    <div>
                      <p className="hoja-mono hoja-dim-text" style={{ margin: 0 }}>
                        {r.period}
                      </p>
                      <p className="hoja-sub" style={{ marginTop: ".35rem" }}>
                        {r.title}
                      </p>
                      <p className="hoja-body" style={{ marginTop: ".8rem" }}>
                        {r.text}
                      </p>
                      {r.highlights?.length ? (
                        <ul className="hoja-rev__hl hoja-mono">
                          {r.highlights.map((h, i) => (
                            <li key={h}>
                              <span>.{String(i + 1).padStart(2, "0")}</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <div>{r.media}</div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
