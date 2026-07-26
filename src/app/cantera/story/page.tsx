import type { Metadata } from "next";
import Link from "next/link";
import { eras, firm, img } from "@/data/content";
import Hairline from "@/components/cantera/Hairline";
import Plate from "@/components/cantera/Plate";
import Rail from "@/components/cantera/Rail";
import Reveal from "@/components/cantera/Reveal";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Otero Ramos Arquitectos, Andrés Otero & Associates, Servicios Técnicos y Desarrollos, ArchiTechnika, Inc. — four names, one practice, since 1980.",
};

/* One plate per era. Each is a project of that era, captioned plainly. */
const ERA_PLATES = [
  {
    file: "e37e6712_Picture0.jpg",
    alt: "Bayamón Medical Center, Bayamón, Puerto Rico — the hospital and medical office building designed by the practice.",
    caption: "Bayamón Medical Center, Bayamón.",
    ratio: "4 / 3",
  },
  {
    file: "0ea28915_Picture1.jpg",
    alt: "Coliseo Raymond Dalmau, Quebradillas, Puerto Rico — the ten-thousand-seat municipal coliseum.",
    caption: "Coliseo Raymond Dalmau, Quebradillas.",
    ratio: "16 / 9",
  },
  {
    file: "0f17b2da_HIBIRD_-_ASHFORD_12.jpg",
    alt: "HiBird Apartment & Suites Hotel, Condado, San Juan — the ground-floor lobby and market after remodelling.",
    caption: "HiBird Apartment & Suites Hotel, Condado.",
    ratio: "16 / 9",
  },
];

export default function StoryPage() {
  return (
    <>
      {/* Hero — the Spanish sentence, set at the largest type in the book. */}
      <section
        className="c-hero"
        style={{ paddingTop: "clamp(6rem, 15vh, 11rem)" }}
        aria-labelledby="studio-title"
      >
        <div className="c-shell c-grid">
          <div className="col-2-12">
            <p className="c-meta c-meta--soft">La firma · The studio</p>
            <h1
              className="c-display"
              id="studio-title"
              lang="es"
              style={{ marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              Arquitectura con propósito. Construida para perdurar.
            </h1>
          </div>
        </div>
        <div className="c-shell" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          <Hairline />
          <p className="c-meta c-hero__meta">
            <span>Architecture with purpose</span>
            <span aria-hidden="true">·</span>
            <span>Built to endure</span>
          </p>
        </div>
      </section>

      {/* The lead */}
      <section className="c-section" style={{ paddingTop: "clamp(5rem, 9vw, 9rem)" }}>
        <div className="c-shell c-grid c-annot">
          <Reveal className="col-2-8">
            <p className="c-lead c-lead--wide">{firm.storyLead}</p>
            <p className="c-body" style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
              {firm.intro}
            </p>
          </Reveal>
          <div className="col-9-12">
            <Rail
              items={[
                { key: "Founded", value: "1980 · San Juan, Puerto Rico" },
                { key: "Practice", value: firm.services.join(" · ") },
                { key: "Projects", value: "300+ completed" },
                { key: "Markets", value: "Six, one standard" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* The eras */}
      <section className="c-shell" aria-labelledby="eras-title">
        <h2 id="eras-title" className="c-visually-hidden">
          The practice, era by era
        </h2>
        {eras.map((era, i) => (
          <Reveal
            as="article"
            group
            key={era.period}
            className="c-grid c-era"
          >
            <div className="col-2-6">
              <p className="c-era__period c-nums">{era.period}</p>
              <h3 className="c-title" style={{ marginTop: "1.25rem" }}>
                {era.title}
              </h3>
              <p className="c-meta c-meta--soft" style={{ marginTop: "1.5rem" }}>
                Chapter {String(i + 1).padStart(2, "0")} of 03
              </p>
            </div>
            <div className="col-7-12">
              <p className="c-body">{era.text}</p>
              <ul className="c-highlights">
                {era.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
                <Plate
                  src={img(ERA_PLATES[i].file)}
                  alt={ERA_PLATES[i].alt}
                  ratio={ERA_PLATES[i].ratio}
                  ratioSmall="4 / 3"
                  sizes="(min-width: 62rem) 46vw, 92vw"
                  caption={ERA_PLATES[i].caption}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* The mantra */}
      <section className="c-section">
        <div className="c-shell c-grid">
          <Reveal className="col-2-9">
            <p
              className="c-title c-title--light"
              style={{ maxWidth: "22ch" }}
            >
              {firm.mantra}
            </p>
            <p className="c-body" style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
              That sentence is not a slogan; it is an operating decision. A
              boutique studio delivers hospitals and coliseums because it
              adopted 3D, BIM and project-management platforms early and
              partners deliberately. The headcount stays small. The work does
              not have to.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "clamp(1.5rem, 4vw, 3rem)",
                marginTop: "clamp(2.5rem, 5vw, 4rem)",
              }}
            >
              <Link href="/cantera/team" className="c-standing-link">
                The principals →
              </Link>
              <Link href="/cantera/portfolio" className="c-standing-link">
                The index →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
