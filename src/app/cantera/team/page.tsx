import type { Metadata } from "next";
import Link from "next/link";
import { firm, team } from "@/data/content";
import Hairline from "@/components/cantera/Hairline";
import Rail from "@/components/cantera/Rail";
import Reveal from "@/components/cantera/Reveal";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Andrés Otero Sr., Andrés Otero Jr. and Luis I. Tua — the three principals of ArchiTechnika, Inc., San Juan, Puerto Rico.",
};

/* No portraits exist, and none are needed: a monograph names its authors in
   type. Each principal is given a rail of plain record instead of a face. */
const RECORDS: { key: string; value: string }[][] = [
  [
    { key: "Since", value: "1980 · founding partner" },
    { key: "Registered", value: "Puerto Rico · Nebraska" },
    { key: "Clients", value: "UPR · Travenol · General Electric · Esso · Shell · Texaco" },
    { key: "Municipalities", value: "Quebradillas · Bayamón · Vega Baja · Aguada" },
  ],
  [
    { key: "Since", value: "2009 · co-founder" },
    { key: "Tools", value: "Revit · 3ds Max · AutoCAD" },
    { key: "As developer", value: "110 units · $90M+ · three condominiums" },
    { key: "Consultancy", value: "Méndez & Co. / Heineken Caribbean, 2003—2016" },
  ],
  [
    { key: "Since", value: "1980 · first line man" },
    { key: "Documents", value: "300+ construction document sets" },
    { key: "Also", value: "Permitting · supervision · engineering design" },
    { key: "Now", value: "Training the next generation" },
  ],
];

export default function TeamPage() {
  return (
    <>
      <section
        className="c-hero"
        style={{ paddingTop: "clamp(6rem, 15vh, 11rem)" }}
        aria-labelledby="team-page-title"
      >
        <div className="c-shell c-grid">
          <div className="col-2-12">
            <p className="c-meta c-meta--soft">The principals</p>
            <h1
              className="c-display"
              id="team-page-title"
              style={{ marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              Three principals. Two since 1980.
            </h1>
          </div>
        </div>
        <div className="c-shell" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          <Hairline />
          <p className="c-meta c-hero__meta">
            <span>Andrés Otero Sr.</span>
            <span aria-hidden="true">·</span>
            <span>Andrés Otero Jr.</span>
            <span aria-hidden="true">·</span>
            <span>Luis I. Tua</span>
          </p>
        </div>
      </section>

      <section
        className="c-shell"
        style={{ paddingTop: "clamp(5rem, 9vw, 9rem)" }}
        aria-label="The principals"
      >
        {team.map((person, i) => (
          <Reveal
            as="article"
            group
            key={person.name}
            className="c-grid c-principal"
          >
            <div className="col-2-6">
              <span className="c-principal__index c-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="c-title" style={{ marginTop: "1.25rem" }}>
                {person.name}
              </h2>
              <p className="c-principal__role">{person.role}</p>
              <p className="c-meta c-meta--soft" style={{ marginTop: "1.5rem" }}>
                {person.credentials}
              </p>
            </div>
            <div className="col-7-12">
              <p className="c-body">{person.bio}</p>
              <Rail
                className="c-plate__rail"
                items={RECORDS[i]}
              />
            </div>
          </Reveal>
        ))}
      </section>

      <section className="c-section">
        <div className="c-shell c-grid">
          <Reveal className="col-2-9">
            <p className="c-title c-title--light" style={{ maxWidth: "24ch" }}>
              A practice of three, and the partners it chooses.
            </p>
            <p className="c-body" style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
              The studio has stayed small on purpose. Scale arrives through
              technology and through strategic partnerships assembled per
              project — which is how a boutique office in San Juan documents a
              two-hundred-bed hospital, a ten-thousand-seat coliseum and a
              clean-room addition in Nebraska without ever becoming a
              corporation.
            </p>
            <p style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
              <a className="c-contact-line c-link" href={`mailto:${firm.email}`}>
                {firm.email}
              </a>
            </p>
            <div style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
              <Link href="/cantera/contact" className="c-standing-link">
                Write to the studio →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
