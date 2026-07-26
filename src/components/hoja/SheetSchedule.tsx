"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { HATCH } from "./sheets";

export interface SchedRow {
  slug: string;
  sheet: string;
  title: string;
  layers: string[];
  type: string;
  muni: string;
  year: string;
  size: string;
  status: string;
  statusKind: string;
}

type SortKey = "sheet" | "title" | "type" | "muni" | "year" | "status";

const COLS: { key: SortKey | null; label: string; mod: string }[] = [
  { key: "sheet", label: "Hoja / Sheet", mod: "n" },
  { key: "title", label: "Proyecto / Project", mod: "p" },
  { key: "type", label: "Tipo / Type", mod: "t" },
  { key: "muni", label: "Municipio", mod: "m" },
  { key: "year", label: "Año", mod: "y" },
  { key: null, label: "Área / Size", mod: "s" },
  { key: "status", label: "Estado / Status", mod: "st" },
];

export default function SheetSchedule({
  rows,
  layers,
  thumbs,
}: {
  rows: SchedRow[];
  layers: string[];
  thumbs: { slug: string; node: ReactNode }[];
}) {
  const [on, setOn] = useState<string[]>(layers);
  const [view, setView] = useState<"list" | "thumb">("list");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({
    key: "sheet",
    dir: 1,
  });

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sort.key] ?? "";
      const bv = b[sort.key] ?? "";
      return av.localeCompare(bv, "es", { numeric: true }) * sort.dir;
    });
    return copy;
  }, [rows, sort]);

  const isOn = (r: SchedRow) => r.layers.some((l) => on.includes(l));
  const visible = sorted.filter(isOn).length;

  function toggle(layer: string) {
    setOn((prev) =>
      prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]
    );
  }

  function head(key: SortKey) {
    setSort((s) => (s.key === key ? { key, dir: (s.dir * -1) as 1 | -1 } : { key, dir: 1 }));
  }

  return (
    <div>
      {/* ── layer panel ─────────────────────────────────────────────────── */}
      <div className="hoja-panel" style={{ marginBottom: "1.5rem" }}>
        <div className="hoja-panel__head hoja-tick">
          <span>Panel de capas / Layer panel</span>
          <span>
            {on.length} / {layers.length} ON
          </span>
        </div>
        <div className="hoja-panel__body">
          <div className="hoja-layers">
            {layers.map((l) => {
              const active = on.includes(l);
              return (
                <span className="hoja-chip" key={l}>
                  <span
                    className="hoja-chip__hatch"
                    aria-hidden="true"
                    style={{
                      background: HATCH[l],
                      color: active ? "var(--plot-red)" : "var(--graphite-2)",
                      opacity: active ? 1 : 0.4,
                    }}
                  />
                  <button
                    type="button"
                    className="hoja-chip__main"
                    aria-pressed={active}
                    onClick={() => toggle(l)}
                  >
                    <span className="hoja-chip__box" aria-hidden="true">
                      {active ? (
                        <svg width="8" height="7" viewBox="0 0 8 7">
                          <path
                            d="M0.7 3.4 3 5.9 7.3 0.9"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                          />
                        </svg>
                      ) : null}
                    </span>
                    {l}
                  </button>
                  <button
                    type="button"
                    className="hoja-chip__iso"
                    onClick={() => setOn([l])}
                    aria-label={`Isolate layer ${l}`}
                  >
                    ISO
                  </button>
                </span>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: ".5rem 1.25rem",
              alignItems: "center",
              marginTop: "1rem",
              paddingTop: ".9rem",
              borderTop: "1px solid var(--grid-major)",
            }}
          >
            <button
              type="button"
              className="hoja-btn"
              onClick={() => setOn(layers)}
              disabled={on.length === layers.length}
              style={{ opacity: on.length === layers.length ? 0.4 : 1 }}
            >
              Show all layers
            </button>
            <button
              type="button"
              className="hoja-btn hoja-btn--red"
              onClick={() => setOn([])}
              disabled={on.length === 0}
              style={{ opacity: on.length === 0 ? 0.4 : 1 }}
            >
              Freeze all
            </button>

            <span style={{ marginLeft: "auto" }} className="hoja-tick hoja-dim-text">
              Vista / View
            </span>
            <span style={{ display: "flex" }}>
              <button
                type="button"
                className="hoja-btn"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
                style={{
                  borderRight: 0,
                  color: view === "list" ? "var(--plot-red)" : undefined,
                  borderColor: view === "list" ? "var(--plot-red)" : undefined,
                }}
              >
                List
              </button>
              <button
                type="button"
                className="hoja-btn"
                aria-pressed={view === "thumb"}
                onClick={() => setView("thumb")}
                style={{
                  color: view === "thumb" ? "var(--plot-red)" : undefined,
                  borderColor: view === "thumb" ? "var(--plot-red)" : undefined,
                }}
              >
                Thumb
              </button>
            </span>
          </div>

          <p className="hoja-vh" role="status" aria-live="polite">
            {visible} of {rows.length} sheets shown.{" "}
            {on.length === 0
              ? "All layers frozen."
              : `Layers on: ${on.join(", ")}.`}
          </p>
          <p
            className="hoja-mono hoja-dim-text"
            aria-hidden="true"
            style={{ margin: ".85rem 0 0" }}
          >
            {String(visible).padStart(2, "0")} DE / OF{" "}
            {String(rows.length).padStart(2, "0")} HOJAS VISIBLES
          </p>
        </div>
      </div>

      {/* ── the schedule ────────────────────────────────────────────────── */}
      {view === "list" ? (
        <div className="hoja-sched" role="table" aria-label="Sheet schedule">
          <div className="hoja-sched__head hoja-tick" role="row">
            {COLS.map((c) => (
              <span
                key={c.label}
                role="columnheader"
                aria-sort={
                  c.key && sort.key === c.key
                    ? sort.dir === 1
                      ? "ascending"
                      : "descending"
                    : c.key
                      ? "none"
                      : undefined
                }
              >
                {c.key ? (
                  <button
                    type="button"
                    className="hoja-sortbtn"
                    onClick={() => head(c.key as SortKey)}
                  >
                    {c.label}
                    <SortMark
                      state={sort.key === c.key ? sort.dir : 0}
                    />
                  </button>
                ) : (
                  c.label
                )}
              </span>
            ))}
          </div>

          <div role="rowgroup">
            {sorted.map((r) => {
              const off = !isOn(r);
              return (
                <div
                  key={r.slug}
                  className="hoja-sched__row"
                  role="row"
                  data-off={off ? "1" : "0"}
                  inert={off}
                >
                  <div className="hoja-sched__rowin" role="presentation">
                    <span className="hoja-sched__cell hoja-sched__cell--n" role="cell">
                      <span className="hoja-sched__lab">Hoja</span>
                      {r.sheet}
                    </span>
                    <span className="hoja-sched__cell hoja-sched__cell--p" role="cell">
                      <Link href={`/hoja/portfolio/${r.slug}`} className="hoja-sched__stretch">
                        <span
                          className="hoja-sched__hatch"
                          aria-hidden="true"
                          style={{ background: HATCH[r.layers[0]] }}
                        />
                        <span className="hoja-sched__name">{r.title}</span>
                      </Link>
                      <span className="hoja-sched__open" aria-hidden="true">
                        → OPEN
                      </span>
                    </span>
                    <span className="hoja-sched__cell" role="cell">
                      <span className="hoja-sched__lab">Tipo</span>
                      {r.type}
                    </span>
                    <span className="hoja-sched__cell" role="cell">
                      <span className="hoja-sched__lab">Municipio</span>
                      {r.muni}
                    </span>
                    <span className="hoja-sched__cell" role="cell">
                      <span className="hoja-sched__lab">Año</span>
                      {r.year}
                    </span>
                    <span className="hoja-sched__cell" role="cell">
                      <span className="hoja-sched__lab">Área</span>
                      {r.size}
                    </span>
                    <span
                      className="hoja-sched__cell"
                      role="cell"
                      style={
                        r.statusKind === "proposal"
                          ? { color: "var(--plot-red)" }
                          : undefined
                      }
                    >
                      <span className="hoja-sched__lab">Estado</span>
                      {r.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="hoja-thumbs">
          {thumbs.map((t) => {
            const row = rows.find((r) => r.slug === t.slug);
            const off = !row || !isOn(row);
            return (
              <div
                key={t.slug}
                className="hoja-thumbs__item"
                data-off={off ? "1" : "0"}
              >
                <Link href={`/hoja/portfolio/${t.slug}`} className="hoja-framelink">
                  {t.node}
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {visible === 0 ? (
        <p className="hoja-mono hoja-dim-text" style={{ marginTop: "1.5rem" }}>
          ALL LAYERS FROZEN. THE SHEET IS BLANK — WHICH IS, TECHNICALLY, A VALID
          DRAWING.
        </p>
      ) : null}
    </div>
  );
}

function SortMark({ state }: { state: 1 | -1 | 0 }) {
  if (state === 0) return null;
  return (
    <svg
      width="7"
      height="5"
      viewBox="0 0 7 5"
      aria-hidden="true"
      style={{
        marginLeft: "0.5ch",
        transform: state === 1 ? "none" : "rotate(180deg)",
      }}
    >
      <path d="M3.5 0 7 5 0 5 Z" fill="currentColor" />
    </svg>
  );
}
