import Link from "next/link";
import { firm } from "@/data/content";

const LINEAGE = [
  { year: "1980", name: "Otero Ramos Arquitectos" },
  { year: "1990", name: "Andrés Otero & Associates" },
  { year: "1995", name: "Servicios Técnicos y Desarrollos" },
  { year: "2009", name: "ArchiTechnika, Inc." },
];

/** Signature moment C — the footer is a genuine colophon, not a sitemap. */
export default function Colophon() {
  return (
    <footer className="c-colophon">
      <div className="c-shell c-grid">
        <div className="col-1-7">
          <p className="c-meta c-meta--soft">Colophon</p>
          <p className="c-colophon__rules" style={{ marginTop: "1.5rem" }}>
            This monograph is set in Fraunces at optical size 144 for display,
            Newsreader for reading, and Inter&nbsp;Tight for the record. Ink is
            never black; paper is never white. One accent, drawn from the burnt
            clay of the tejas of Old San Juan, is permitted three times to a
            page. Photography is untinted and uncropped except where a plate
            demands it. Nothing on these pages moves that a printed page would
            not.
          </p>
          <p className="c-colophon__rules" style={{ marginTop: "1.5rem" }}>
            One practice, four names, one address —{" "}
            <span style={{ fontStyle: "normal" }}>{firm.address}</span>.
          </p>
        </div>

        <div className="col-8-12">
          <p className="c-meta c-meta--soft">The practice, in order</p>
          <ol
            className="c-colophon__lineage"
            style={{ listStyle: "none", padding: 0, marginTop: "1.5rem" }}
          >
            {LINEAGE.map((l) => (
              <li key={l.year}>
                <span className="c-nums" style={{ fontStyle: "normal" }}>
                  {l.year}
                </span>
                {"  ·  "}
                {l.name}
              </li>
            ))}
          </ol>

          <div style={{ marginTop: "2.75rem", display: "grid", rowGap: "0.4rem" }}>
            <a className="c-link c-small" href={`mailto:${firm.email}`}>
              {firm.email}
            </a>
            <a className="c-link c-small c-nums" href={firm.phoneHref}>
              {firm.phone}
            </a>
            <Link className="c-link c-small" href="/cantera/contact">
              Bring us the difficult one
            </Link>
          </div>

          <p className="c-meta c-meta--soft" style={{ marginTop: "2.75rem" }}>
            © 2026 {firm.legalName} · San Juan, Puerto Rico
          </p>
        </div>
      </div>
    </footer>
  );
}
