import Link from "next/link";
import type { CSSProperties } from "react";
import { firm, heroImages, img, projectBySlug, team } from "@/data/content";
import Hairline from "@/components/cantera/Hairline";
import Ledger from "@/components/cantera/Ledger";
import Plate from "@/components/cantera/Plate";
import Rail from "@/components/cantera/Rail";
import Reveal from "@/components/cantera/Reveal";
import TypologyList from "@/components/cantera/TypologyList";
import {
  alt,
  municipality,
  plate as plateNo,
  services,
  title as projectTitle,
} from "@/components/cantera/lib";

const v = (o: Record<string, string | number>) => o as CSSProperties;

/* §4 — three plates from the monograph. The italic line under each name is
   editorial connective copy; every figure in it is carried in content.ts. */
const PLATES: { slug: string; line: string; ratio: string }[] = [
  {
    slug: "normandie-hotel",
    line: "A 1942 ocean liner in concrete, brought back to sea.",
    ratio: "16 / 9",
  },
  {
    slug: "bayamon-medical-center",
    line: "Two hundred beds, and the hundred medical offices that keep them working.",
    ratio: "4 / 3",
  },
  {
    slug: "raymond-dalmau-coliseum",
    line: "Ten thousand seats, and the sightline from every one of them.",
    ratio: "16 / 9",
  },
];

const LINEAGE = [
  {
    year: "1980",
    name: "Otero Ramos Arquitectos",
    note: "Two architecture-school friends, one draughtsman, and the island's telephone exchanges.",
  },
  {
    year: "1990",
    name: "Andrés Otero & Associates",
    note: "The partnership ends; the practice does not.",
  },
  {
    year: "1995",
    name: "Servicios Técnicos y Desarrollos",
    note: "The venture under which the Architechnika name was born.",
  },
  {
    year: "2009",
    name: "ArchiTechnika, Inc.",
    note: "Father and son as partners, and a new way of engaging the design process.",
  },
];

export default function CanteraLanding() {
  return (
    <>
      {/* ── §1 · Hero — the held breath ────────────────────────────────── */}
      <section className="c-hero" aria-labelledby="hero-title">
        <div className="c-shell c-grid">
          <div className="col-2-12">
            <h1 className="c-display" id="hero-title">
              <span className="c-mask" style={v({ "--i": 0 })}>
                <span>Architecture</span>
              </span>
              <span className="c-mask" style={v({ "--i": 1 })}>
                <span>with purpose.</span>
              </span>
              <span className="c-mask" style={v({ "--i": 2 })}>
                <span>Built to endure.</span>
              </span>
            </h1>
          </div>
        </div>

        <div className="c-shell" style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
          <Hairline />
          <p className="c-meta c-hero__meta">
            <span>San Juan, Puerto Rico</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1980</span>
            <span aria-hidden="true">·</span>
            <span>300+ projects</span>
          </p>
        </div>

        <div className="c-shell c-grid c-hero__plate">
          <div className="col-3-11">
            <Plate
              src={img(heroImages.hibirdNight)}
              alt="HiBird Apartment & Suites Hotel at night on Avenida Ashford, Condado, San Juan — the illuminated seven-storey facade after its remodelling by ArchiTechnika."
              ratio="16 / 7"
              ratioSmall="4 / 5"
              position="50% 46%"
              sizes="(min-width: 62rem) 72vw, 92vw"
              quality={90}
              preload
              caption="HiBird Hotel, Avenida Ashford, Condado."
            />
          </div>
        </div>
      </section>

      {/* ── §2 · Statement ─────────────────────────────────────────────── */}
      <section className="c-section" aria-labelledby="statement-title">
        <h2 id="statement-title" className="c-visually-hidden">
          The practice
        </h2>
        <div className="c-shell c-grid c-annot">
          <Reveal className="col-2-8">
            <p className="c-lead c-lead--wide">
              For forty-five years we have designed the buildings Puerto Rico
              works in, heals in, competes in, and sleeps in. Hotels on Ashford.
              A two-hundred-bed hospital in Bayamón. A ten-thousand-seat
              coliseum. Three hundred and fifty gas stations. We are a boutique
              studio that has never been limited by its size — only sharpened by
              it.
            </p>
          </Reveal>
          <div className="col-9-12">
            <Rail
              items={[
                { key: "Established", value: "1980 · San Juan" },
                { key: "Practice", value: firm.services.join(" · ") },
                {
                  key: "Territory",
                  value: "Puerto Rico · United States · U.S. Virgin Islands",
                },
                { key: "Office", value: firm.address },
              ]}
            />
          </div>
        </div>

        <div
          className="c-shell c-grid"
          style={{ marginTop: "clamp(6rem, 11vw, 10rem)" }}
        >
          <Reveal className="col-2-9">
            <p className="c-title c-title--light" lang="es">
              Arquitectura con propósito. Construida para perdurar.
            </p>
            <p
              className="c-meta c-meta--soft"
              style={{ marginTop: "1.5rem" }}
            >
              Architecture with purpose. Built to endure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── §3 · The Ledger ────────────────────────────────────────────── */}
      <section className="c-section c-wash" aria-labelledby="ledger-title">
        <div className="c-shell c-grid">
          <Reveal className="col-2-8">
            <p className="c-meta" lang="es">
              Por los números
            </p>
            <p className="c-meta c-meta--soft" style={{ marginTop: "0.6rem" }}>
              The record, in figures
            </p>
            <h2 className="c-title" id="ledger-title" style={{ marginTop: "2rem" }}>
              What forty-five years amounts to.
            </h2>
          </Reveal>
        </div>
        <div
          className="c-shell"
          style={{ marginTop: "clamp(3.5rem, 6vw, 5.5rem)" }}
        >
          <Ledger />
        </div>
      </section>

      {/* ── §4 · Selected work — monograph plates ──────────────────────── */}
      <section className="c-section" aria-labelledby="work-title">
        <div className="c-shell c-grid">
          <Reveal className="col-2-8">
            <p className="c-meta c-meta--soft">Selected work</p>
            <h2 className="c-title" id="work-title" style={{ marginTop: "1.5rem" }}>
              Three of three hundred.
            </h2>
          </Reveal>
        </div>

        <div className="c-shell" style={{ marginTop: "clamp(4rem, 7vw, 6rem)" }}>
          {PLATES.map((entry, i) => {
            const p = projectBySlug(entry.slug);
            if (!p) return null;
            const href = `/cantera/portfolio/${p.slug}`;
            return (
              <Reveal
                key={p.slug}
                as="article"
                group
                className={`c-grid c-plate${i % 2 === 1 ? " c-plate--flip" : ""}`}
              >
                <div className="c-plate__media">
                  <Link href={href}>
                    <Plate
                      src={img(p.images[0])}
                      alt={alt(p, 0)}
                      ratio={entry.ratio}
                      ratioSmall="4 / 3"
                      sizes="(min-width: 62rem) 55vw, 92vw"
                    />
                  </Link>
                </div>
                <div className="c-plate__text">
                  <span className="c-plate__index c-nums">
                    {plateNo(i + 1)}
                  </span>
                  <h3 className="c-title">
                    <Link href={href} className="c-link">
                      {projectTitle(p)}
                    </Link>
                  </h3>
                  <p className="c-plate__line">{entry.line}</p>
                  <Rail
                    className="c-plate__rail"
                    items={[
                      { key: "Year", value: p.year ?? "—" },
                      {
                        key: "Municipality",
                        value: municipality(p.location),
                      },
                      { key: "Scope", value: p.size.join(" · ") },
                      {
                        key: p.status ? "Status" : "Services",
                        value: p.status ?? services(p).join(" · "),
                      },
                    ]}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="c-shell c-grid" style={{ marginTop: "clamp(3rem, 5vw, 4.5rem)" }}>
          <div className="col-2-8">
            <Link href="/cantera/portfolio" className="c-standing-link">
              View all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ── §5 · Typologies ────────────────────────────────────────────── */}
      <section className="c-section c-wash" aria-labelledby="typology-title">
        <div className="c-shell c-grid">
          <Reveal className="col-2-8">
            <p className="c-meta c-meta--soft">Typologies</p>
            <h2
              className="c-title"
              id="typology-title"
              style={{ marginTop: "1.5rem" }}
            >
              Hotels, hospitals, coliseums, and houses.
            </h2>
            <p className="c-lead c-lead--wide" style={{ marginTop: "1.75rem" }}>
              Any scale. The technology decides, not the headcount.
            </p>
          </Reveal>
        </div>
        <div
          className="c-shell"
          style={{ marginTop: "clamp(3.5rem, 6vw, 5.5rem)" }}
        >
          <TypologyList />
        </div>
      </section>

      {/* ── §6 · History teaser ────────────────────────────────────────── */}
      <section className="c-section" aria-labelledby="history-title">
        <div className="c-shell c-grid c-annot">
          <Reveal className="col-2-8">
            <p className="c-meta c-meta--soft">The lineage</p>
            <h2
              className="c-title"
              id="history-title"
              style={{ marginTop: "1.5rem" }}
            >
              Four names. One practice.
            </h2>
            <p className="c-body" style={{ marginTop: "2rem" }}>
              The firm has been reconstituted four times since 1980 — as a
              partnership, as a sole practice, as a development-services
              company, and finally as ArchiTechnika, Inc. The letterhead
              changed. The drawings, the clients, and the man who has been
              producing the construction documents since the first year did not.
            </p>
          </Reveal>
          <div className="col-9-12">
            <Rail
              items={[
                { key: "Founded", value: "1980, by Arq. Andrés Otero and Arq. Jorge Ramos" },
                { key: "Incorporated", value: "2009, as ArchiTechnika, Inc." },
                { key: "Address", value: "Unchanged" },
              ]}
            />
          </div>
        </div>

        <div
          className="c-shell c-grid"
          style={{ marginTop: "clamp(3.5rem, 6vw, 5rem)" }}
        >
          <div className="col-2-12">
            <ol className="c-lineage">
              {LINEAGE.map((l) => (
                <li key={l.year}>
                  <span className="c-lineage__year">{l.year}</span>
                  <span>
                    <span className="c-lineage__name">{l.name}</span>
                    <span
                      className="c-small"
                      style={{ display: "block", marginTop: "0.4rem" }}
                    >
                      {l.note}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <Link
              href="/cantera/story"
              className="c-standing-link"
              style={{ marginTop: "clamp(2.5rem, 4vw, 3.5rem)" }}
            >
              The whole history →
            </Link>
          </div>
        </div>
      </section>

      {/* ── §7 · Team teaser ───────────────────────────────────────────── */}
      <section className="c-section c-wash" aria-labelledby="team-title">
        <div className="c-shell c-grid">
          <Reveal className="col-2-8">
            <p className="c-meta c-meta--soft">The principals</p>
            <h2 className="c-title" id="team-title" style={{ marginTop: "1.5rem" }}>
              Three principals. Two of them have been here since 1980.
            </h2>
          </Reveal>
        </div>

        <div
          className="c-shell c-grid"
          style={{ marginTop: "clamp(3.5rem, 6vw, 5rem)" }}
        >
          <Reveal group className="col-2-12">
            {team.map((person) => (
              <div key={person.name} className="c-teaser-row">
                <span className="c-lineage__name">{person.name}</span>
                <span className="c-small c-ital">{person.role}</span>
                <span className="c-meta c-meta--soft">
                  {person.credentials}
                </span>
              </div>
            ))}
          </Reveal>
          <div
            className="col-2-12"
            style={{ marginTop: "clamp(2.5rem, 4vw, 3.5rem)" }}
          >
            <Link href="/cantera/team" className="c-standing-link">
              The three of them →
            </Link>
          </div>
        </div>
      </section>

      {/* ── §8 · Contact ───────────────────────────────────────────────── */}
      <section className="c-section" aria-labelledby="contact-title">
        <div className="c-shell c-grid c-annot">
          <Reveal className="col-2-8">
            <h2 className="c-display" id="contact-title">
              Bring us the difficult one.
            </h2>
            <p
              className="c-lead c-lead--wide"
              style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}
            >
              The hospital on the constrained site. The 1942 landmark that must
              keep its silhouette. The coliseum with a municipal budget. Those
              are the ones we want.
            </p>
            <p style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
              <a
                className="c-contact-line c-link"
                href={`mailto:${firm.email}`}
              >
                {firm.email}
              </a>
            </p>
          </Reveal>
          <div className="col-9-12">
            <Rail
              items={[
                {
                  key: "Telephone",
                  value: (
                    <a className="c-link c-nums" href={firm.phoneHref}>
                      {firm.phone}
                    </a>
                  ),
                },
                { key: "Office", value: firm.address },
                {
                  key: "Written enquiry",
                  value: (
                    <Link className="c-link" href="/cantera/contact">
                      Send us the programme
                    </Link>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
