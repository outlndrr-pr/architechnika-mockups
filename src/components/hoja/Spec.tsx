import type { ReactNode } from "react";

export interface SpecRow {
  es: string;
  en: string;
  v: ReactNode;
  tone?: "red" | "muted";
}

/** The spec block. Bilingual labels, Spanish first, as PR sets are drawn. */
export default function Spec({
  rows,
  className = "",
}: {
  rows: SpecRow[];
  className?: string;
}) {
  return (
    <dl className={`hoja-spec hoja-mono ${className}`}>
      {rows.map((r) => (
        <div className="hoja-spec__row" key={r.en}>
          <dt className="hoja-spec__k">
            {r.es} / {r.en}
          </dt>
          <dd
            className={`hoja-spec__v${
              r.tone === "red"
                ? " hoja-spec__v--red"
                : r.tone === "muted"
                  ? " hoja-spec__v--muted"
                  : ""
            }`}
          >
            {r.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}
