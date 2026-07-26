import Link from "next/link";
import { firm } from "@/data/content";
import { ROUTE_SHEETS } from "./sheets";
import ViewportReadout from "./ViewportReadout";
import { Leader } from "./Marks";

const LINEAGE = [
  "1980 · Otero Ramos Arquitectos",
  "1990 · Andres Otero & Associates",
  "1995 · Servicios Técnicos y Desarrollos, Inc.",
  "2009 · ArchiTechnika, Inc.",
];

export default function Footer() {
  return (
    <footer className="hoja-foot">
      <div className="hoja-wrap">
        <div className="hoja-split hoja-split--8-4">
          <div>
            <p className="hoja-tick hoja-dim-text">
              Índice de hojas / Sheet index
            </p>
            <ul
              className="hoja-mono"
              style={{ listStyle: "none", margin: ".7rem 0 0", padding: 0 }}
            >
              {ROUTE_SHEETS.map((r) => (
                <li
                  key={r.href}
                  style={{
                    borderTop: "1px solid var(--grid-major)",
                    padding: ".38rem 0",
                  }}
                >
                  <Link href={r.href} style={{ display: "block" }}>
                    <Leader left={r.sheet} right={r.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="hoja-tick hoja-dim-text">Bloque de contacto</p>
            <address
              className="hoja-mono"
              style={{ fontStyle: "normal", marginTop: ".7rem" }}
            >
              <div>{firm.legalName}</div>
              <div className="hoja-dim-text">{firm.address}</div>
              <div style={{ marginTop: ".5rem" }}>
                <a className="hoja-link" href={firm.phoneHref}>
                  {firm.phone}
                </a>
              </div>
              <div>
                <a className="hoja-link" href={`mailto:${firm.email}`}>
                  {firm.email}
                </a>
              </div>
            </address>
          </div>
        </div>

        <hr className="hoja-rule" style={{ margin: "clamp(1.5rem,3vw,2.5rem) 0" }} />

        <div className="hoja-split hoja-split--8-4">
          <div>
            <p className="hoja-tick hoja-dim-text">
              Historial de revisiones / Legal lineage
            </p>
            <ul
              className="hoja-mono"
              style={{
                listStyle: "none",
                margin: ".6rem 0 0",
                padding: 0,
                columns: "2 15rem",
                columnGap: "2rem",
              }}
            >
              {LINEAGE.map((l) => (
                <li key={l} className="hoja-dim-text" style={{ padding: ".15rem 0" }}>
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="hoja-tick hoja-dim-text">
              Escala gráfica / Graphic scale
            </p>
            <div className="hoja-scalebar" style={{ marginTop: ".7rem" }}>
              <div className="hoja-scalebar__bar" aria-hidden="true">
                <span className="hoja-scalebar__seg" />
                <span className="hoja-scalebar__seg" />
                <span className="hoja-scalebar__seg" />
                <span className="hoja-scalebar__seg" />
              </div>
              <div className="hoja-scalebar__nums hoja-tick" aria-hidden="true">
                <span>0</span>
                <span>100</span>
                <span>200 PX</span>
              </div>
              <p className="hoja-mono hoja-dim-text" style={{ margin: 0 }}>
                Hoja / sheet: <ViewportReadout />
              </p>
            </div>
          </div>
        </div>

        <p
          className="hoja-mono hoja-dim-text"
          style={{ marginTop: "clamp(1.75rem,3.5vw,3rem)" }}
        >
          © 2026 {firm.legalName} · All sheets and specifications remain the
          property of the architect · Set typeset in Archivo &amp; DM Mono ·
          Dirección 02 / Direction 02 — HOJA 01
        </p>
      </div>
    </footer>
  );
}
