import Reveal from "./Reveal";
import { Leader } from "./Marks";
import { plotCounts } from "./sheets";

/**
 * Signature moment — the project distribution drawn as a survey plot.
 * Single-colour island outline, plot-red crosshair ticks at the municipalities
 * with sheets in this set, mono legend keyed by number.
 */

const PR_MAIN =
  "M16 34 L44 29 L78 27 L112 28 L146 24 L178 27 L210 25 L242 29 L272 32 L290 36 " +
  "L300 44 L303 58 L296 68 L301 80 L293 90 L284 98 L256 101 L230 99 L204 104 " +
  "L176 101 L150 105 L122 101 L96 104 L74 99 L56 103 L44 106 L38 112 L34 126 " +
  "L28 128 L26 114 L30 106 L20 100 L14 88 L19 74 L12 62 L15 48 Z";

const CULEBRA = "M316 48 L322 45 L327 48 L324 52 L318 52 Z";
const VIEQUES = "M308 69 L317 65 L330 66 L338 69 L328 72 L314 72 Z";

export default function PlotMap() {
  const plots = plotCounts().sort((a, b) => b.n - a.n || a.name.localeCompare(b.name));

  return (
    <div className="hoja-split hoja-split--7-5">
      <Reveal className="hoja-panel">
        <div className="hoja-panel__head hoja-tick">
          <span>Plano de distribución / Distribution plot</span>
          <span>ESC. GRÁFICA · APROX.</span>
        </div>
        <div className="hoja-panel__body">
          <svg
            className="hoja-map"
            viewBox="0 0 348 140"
            role="img"
            aria-label={`Survey plot of Puerto Rico marking the ${plots.length} municipalities with sheets in this set, plus Vieques and Culebra.`}
          >
            {/* graticule corner ticks */}
            <g className="hoja-map__grid">
              <path d="M4 10 H16 M4 10 V22" />
              <path d="M344 10 H332 M344 10 V22" />
              <path d="M4 134 H16 M4 134 V122" />
              <path d="M344 134 H332 M344 134 V122" />
              <path d="M4 60 H10" />
              <path d="M170 134 V128" />
            </g>
            <text className="hoja-map__lab" x="4" y="57">
              18°15′N
            </text>
            <text className="hoja-map__lab" x="160" y="139">
              66°25′W
            </text>

            {/* north arrow */}
            <g>
              <path d="M332 30 L336 42 L332 39 L328 42 Z" className="hoja-map__arrow" />
              <text className="hoja-map__lab" x="329" y="27">
                N
              </text>
            </g>

            {/* the island */}
            <path className="hoja-map__island" d={PR_MAIN} />
            <path className="hoja-map__island" d={CULEBRA} />
            <path className="hoja-map__island" d={VIEQUES} />
            <text className="hoja-map__lab" x="306" y="60">
              CULEBRA
            </text>
            <text className="hoja-map__lab" x="300" y="80">
              VIEQUES
            </text>

            {/* crosshair ticks */}
            {plots.map((p, i) => (
              <g key={p.key}>
                <path
                  className="hoja-map__tick"
                  d={`M${p.x - 5} ${p.y} H${p.x + 5} M${p.x} ${p.y - 5} V${p.y + 5}`}
                />
                <circle className="hoja-map__dot" cx={p.x} cy={p.y} r="2.6" />
                <text
                  className="hoja-map__lab hoja-map__lab--n"
                  x={p.x + 6.5}
                  y={p.y - 4}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            ))}
          </svg>

          <p className="hoja-mono hoja-dim-text" style={{ margin: "0.9rem 0 0" }}>
            ISLAS MUNICIPIO (VIEQUES · CULEBRA) SHOWN IN APPROXIMATE POSITION,
            NOT TO SCALE. TICKS MARK MUNICIPALITIES, NOT COORDINATES.
          </p>
        </div>
      </Reveal>

      <Reveal className="hoja-panel" delay={1}>
        <div className="hoja-panel__head hoja-tick">
          <span>Leyenda / Legend</span>
          <span>HOJAS EN ESTE JUEGO</span>
        </div>
        <div className="hoja-panel__body">
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {plots.map((p, i) => (
              <li
                key={p.key}
                className="hoja-mono"
                style={{
                  borderTop: "1px solid var(--grid-major)",
                  padding: "0.4rem 0",
                }}
              >
                <Leader
                  left={
                    <>
                      <span className="hoja-red">
                        {String(i + 1).padStart(2, "0")}
                      </span>{" "}
                      {p.name.toUpperCase()}, PR {p.zip}
                    </>
                  }
                  right={`${String(p.n).padStart(2, "0")} ${
                    p.n === 1 ? "HOJA" : "HOJAS"
                  }`}
                />
              </li>
            ))}
          </ul>

          <p
            className="hoja-mono"
            style={{
              marginTop: "1.1rem",
              paddingTop: "0.9rem",
              borderTop: "1px solid var(--graphite)",
            }}
          >
            + NEBRASKA · FLORIDA · USVI
          </p>
          <p className="hoja-mono hoja-dim-text" style={{ margin: "0.35rem 0 0" }}>
            + 350 SERVICE STATION CONVERSIONS · ESSO / SHELL / TEXACO ·
            ISLAND-WIDE · 1980—
          </p>
          <p className="hoja-mono hoja-dim-text" style={{ margin: "0.35rem 0 0" }}>
            + 2,700 DWELLINGS · SOCIAL-INTEREST HOUSING · MUNICIPALITIES
            ISLAND-WIDE
          </p>
        </div>
      </Reveal>
    </div>
  );
}
