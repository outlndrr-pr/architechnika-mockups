import Link from "next/link";
import type { Metadata } from "next";
import {
  firm,
  heroImages,
  markets,
  projectBySlug,
  team,
} from "@/data/content";
import Section from "@/components/hoja/Section";
import Frame from "@/components/hoja/Frame";
import Reveal from "@/components/hoja/Reveal";
import DrawingIndex from "@/components/hoja/DrawingIndex";
import Plate from "@/components/hoja/Plate";
import PlotMap from "@/components/hoja/PlotMap";
import RevisionHistory from "@/components/hoja/RevisionHistory";
import PersonnelBlock from "@/components/hoja/Personnel";
import ContactForm from "@/components/hoja/ContactForm";
import Spec from "@/components/hoja/Spec";
import { Arrow, DimString, Leader, TypeIn } from "@/components/hoja/Marks";
import { HATCH, layersOf, sheetSet } from "@/components/hoja/sheets";

export const metadata: Metadata = {
  title: "A-100 HOME — ArchiTechnika, Inc.",
  description: firm.intro,
};

const LINEAGE =
  "OTERO RAMOS ARQUITECTOS · ANDRES OTERO & ASSOCIATES · SERVICIOS TÉCNICOS Y DESARROLLOS · ARCHITECHNIKA, INC.";

const METHOD = [
  {
    n: "01",
    k: "Modelar / Model",
    t: "Revit · 3ds Max · AutoCAD",
    b: "The firm went to 3D and BIM early — early enough that the rest of the island was still redlining paper. Every sheet since is a view of a model, not a drawing of a guess.",
  },
  {
    n: "02",
    k: "Coordinar / Coordinate",
    t: "Clash detection · strategic partnerships",
    b: "Consultants are pulled into the model, not into a meeting. Conflicts get resolved at a desk in San Juan instead of on a slab in the rain, which is the whole argument for doing it this way.",
  },
  {
    n: "03",
    k: "Documentar / Document",
    t: "300+ document sets since 1980",
    b: "One man, Luis I. Tua, has developed the construction documents for more than three hundred of them. Continuity is not a value statement here. It is a staffing fact.",
  },
];

const REV_TEASER = [
  {
    n: 1,
    date: "1980",
    desc: "Issued as Otero Ramos Arquitectos",
    by: "AOS",
  },
  {
    n: 2,
    date: "1990",
    desc: "Reissued — Andres Otero & Associates",
    by: "AOS",
  },
  {
    n: 3,
    date: "1995",
    desc: 'D.B.A. "Architechnika" added',
    by: "AOS / AOJ",
  },
  {
    n: 4,
    date: "2009",
    desc: "Incorporated — ArchiTechnika, Inc.",
    by: "AOJ",
  },
];

export default function HojaHome() {
  const normandie = projectBySlug("normandie-hotel")!;
  const bayamon = projectBySlug("bayamon-medical-center")!;
  const dalmau = projectBySlug("raymond-dalmau-coliseum")!;
  const hibird = projectBySlug("hibird-apartment-and-suites-hotel")!;

  const counts = Object.fromEntries(
    markets.map((m) => [
      m.name,
      sheetSet.filter((p) => layersOf(p).includes(m.name)).length,
    ])
  ) as Record<string, number>;

  return (
    <>
      {/* ═══ §1 COVER SHEET ═══════════════════════════════════════════════ */}
      <Section flush num={1} className="hoja-hero">
        <TypeIn
          text={LINEAGE}
          className="hoja-mono hoja-dim-text hoja-hero__lineage"
        />

        <div className="hoja-split hoja-split--7-5" style={{ marginTop: "1.75rem" }}>
          <div>
            <Reveal as="h1" className="hoja-display">
              Architecture
              <br />
              rooted in purpose,
              <br />
              shaped by experience.
            </Reveal>

            <DimString
              label="EST. 1980 — 300+ PROJECTS — PR · USA · USVI"
              className="hoja-hero__dim"
            />

            <Reveal delay={1} className="hoja-hero__sub">
              <p className="hoja-sub">{firm.subline}</p>
              <p className="hoja-mono hoja-dim-text" style={{ marginTop: ".9rem" }}>
                ARQUITECTURA CON PROPÓSITO. CONSTRUIDA PARA PERDURAR.
              </p>
            </Reveal>
          </div>

          <DrawingIndex />
        </div>

        <div style={{ marginTop: "clamp(2rem,5vw,4rem)" }}>
          <Frame
            file={heroImages.normandieAerial}
            alt="Aerial view of the Normandie Hotel, San Juan — the streamline-moderne hull seen from above."
            sheet="A-101"
            title="Normandie Hotel · Aerial"
            date="2020"
            ratio="21 / 9"
            sizes="100vw"
            quality={90}
            preload
          />
        </div>
      </Section>

      {/* ═══ §2 Ⓐ THE METHOD ══════════════════════════════════════════════ */}
      <Section
        id="method"
        letter="A"
        num={2}
        title="El método / The method"
        note={<>A-100.02 · GENERAL NOTES</>}
        alt
      >
        <div className="hoja-split hoja-split--7-5">
          <div>
            <p className="hoja-h3" style={{ maxWidth: "22ch" }}>
              Combining broad architectural experience with technical
              innovation.
            </p>
            <p className="hoja-body" style={{ marginTop: "1.1rem" }}>
              We are a boutique studio that delivers institutional-scale work.
              That is not a contradiction — it is a technology decision made
              early and never walked back. A ten-thousand-seat coliseum and a
              nine-room hotel on a mountaintop go through the same model, the
              same coordination, and the same set of eyes.
            </p>
            <p className="hoja-body">{firm.storyLead}</p>
            <p className="hoja-body">
              Forty-five years in one jurisdiction also means we know what the
              island will do to a building, and what the permitting office will
              do to a schedule.
            </p>
          </div>

          <Reveal className="hoja-panel" delay={1}>
            <div className="hoja-panel__head hoja-tick">
              <span>Criterios de diseño / Design criteria</span>
              <span>JURISDICCIÓN: PR</span>
            </div>
            <div className="hoja-panel__body">
              <Spec
                rows={[
                  { es: "Zona sísmica", en: "Seismic zone", v: "3" },
                  { es: "Viento", en: "Wind", v: "ASCE 7 · CAT. IV" },
                  { es: "Velocidad", en: "V(ult)", v: "165 MPH" },
                  { es: "Código", en: "Code", v: "PRBC / IBC ADOPTED" },
                  { es: "Registro", en: "Registration", v: "PR · NEBRASKA" },
                  {
                    es: "Servicios",
                    en: "Services",
                    v: firm.services.join(" + ").toUpperCase(),
                  },
                ]}
              />
              <p
                className="hoja-mono hoja-dim-text"
                style={{ margin: "0.9rem 0 0" }}
              >
                TYPICAL DESIGN CRITERIA FOR THIS JURISDICTION. A FIRM THAT HAS
                DOCUMENTED A HOSPITAL AND A COLISEUM ON A HURRICANE-AND-EARTHQUAKE
                ISLAND HAS NO MAINLAND EQUIVALENT.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="hoja-cols" style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
          {METHOD.map((m, i) => (
            <Reveal
              key={m.n}
              className="hoja-method"
              delay={(i + 1) as 1 | 2 | 3}
            >
              <p className="hoja-mono hoja-red" style={{ margin: 0 }}>
                {m.n}
              </p>
              <p className="hoja-h3" style={{ marginTop: ".5rem" }}>
                {m.k}
              </p>
              <p className="hoja-mono hoja-dim-text" style={{ marginTop: ".4rem" }}>
                {m.t.toUpperCase()}
              </p>
              <p className="hoja-body" style={{ marginTop: ".9rem" }}>
                {m.b}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══ §3 Ⓑ SELECTED SHEETS ═════════════════════════════════════════ */}
      <Section
        id="sheets"
        letter="B"
        num={3}
        title="Hojas seleccionadas / Selected sheets"
        note={<>04 DE / OF 300+</>}
      >
        <div className="hoja-flow">
          <Plate
            project={hibird}
            dim="27 APARTMENTS · 40 ROOMS · AVENIDA ASHFORD"
          />
          <Plate
            project={normandie}
            dim="1942 STRUCTURE · 204 ROOMS · FULL REPOSITIONING"
            flip
          />
          <Plate project={bayamon} dim="100 MEDICAL OFFICES · 160,000 SF" />
          <Plate project={dalmau} dim="10,000 SEATS" flip />
        </div>

        <Reveal
          className="hoja-mono"
          style={{
            marginTop: "clamp(2rem,4vw,3rem)",
            paddingTop: "1rem",
            borderTop: "1px solid var(--graphite)",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className="hoja-dim-text">
            THE OTHER 296 ARE NOT PHOTOGRAPHED. THEY ARE BUILT.
          </span>
          <Link href="/hoja/portfolio" className="hoja-btn">
            Open sheet schedule A-200 <Arrow dir="next" />
          </Link>
        </Reveal>
      </Section>

      {/* ═══ §4 Ⓒ TYPOLOGY LEGEND ═════════════════════════════════════════ */}
      <Section
        id="legend"
        letter="C"
        num={4}
        title="Leyenda de tipologías / Typology legend"
        note={<>A-100.04 · HATCH SCHEDULE</>}
        alt
      >
        <Reveal className="hoja-panel">
          <div className="hoja-panel__head hoja-tick">
            <span>Patrón / Hatch</span>
            <span>Hojas en este juego / Sheets in this set</span>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {markets.map((m) => (
              <li key={m.name} className="hoja-legend__row">
                <span
                  className="hoja-legend__sw"
                  aria-hidden="true"
                  style={{ background: HATCH[m.name] }}
                />
                <div style={{ minWidth: 0 }}>
                  <p className="hoja-mono" style={{ margin: 0 }}>
                    <Leader
                      left={m.name.toUpperCase()}
                      right={`${String(counts[m.name] ?? 0).padStart(2, "0")} ${
                        counts[m.name] === 1 ? "HOJA" : "HOJAS"
                      }`}
                    />
                  </p>
                  <p className="hoja-body hoja-dim-text" style={{ marginTop: ".3rem" }}>
                    {m.blurb}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="hoja-mono hoja-dim-text" style={{ marginTop: "1.1rem" }}>
          ANY SCALE. THE TECHNOLOGY DECIDES, NOT THE HEADCOUNT.
        </Reveal>
      </Section>

      {/* ═══ §5 Ⓓ PROJECT DISTRIBUTION ════════════════════════════════════ */}
      <Section
        id="distribution"
        letter="D"
        num={5}
        title="Distribución de proyectos"
        note={<>A-100.05 · SURVEY PLOT</>}
      >
        <Reveal className="hoja-h3" style={{ maxWidth: "26ch", marginBottom: "1.6rem" }}>
          Three hundred projects. One island, and everywhere it reaches.
        </Reveal>
        <PlotMap />
      </Section>

      {/* ═══ §6 Ⓔ REVISION HISTORY ════════════════════════════════════════ */}
      <Section
        id="revisions"
        letter="E"
        num={6}
        title="Historial de revisiones"
        note={<>A-300 · SEE STUDIO SHEET</>}
        alt
      >
        <RevisionHistory rows={REV_TEASER} expandable={false} />
        <Reveal
          className="hoja-mono"
          style={{
            marginTop: "1.25rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className="hoja-dim-text">
            FOUR NAMES. ONE PRACTICE. ONE CONTINUOUS LINE OF DRAWINGS.
          </span>
          <Link href="/hoja/story" className="hoja-btn">
            Open sheet A-300 <Arrow dir="next" />
          </Link>
        </Reveal>
      </Section>

      {/* ═══ §7 Ⓕ PERSONNEL ═══════════════════════════════════════════════ */}
      <Section
        id="personnel"
        letter="F"
        num={7}
        title="Personal / Personnel"
        note={<>03 PRINCIPALES · 120+ AÑOS</>}
      >
        <div
          className="hoja-split"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
          }}
        >
          {team.map((p, i) => (
            <PersonnelBlock
              key={p.name}
              person={p}
              sheet={`A-40${i + 1}`}
              delay={(i + 1) as 1 | 2 | 3}
            />
          ))}
        </div>
        <Reveal className="hoja-mono hoja-dim-text" style={{ marginTop: "1.1rem" }}>
          NO PORTRAITS ARE ON FILE. PERSONNEL ARE IDENTIFIED BY THE INITIALS THEY
          SIGN SHEETS WITH.
        </Reveal>
      </Section>

      {/* ═══ §8 Ⓖ ISSUE FOR REVIEW ════════════════════════════════════════ */}
      <Section
        id="issue"
        letter="G"
        num={8}
        title="Emitido para revisión / Issue for review"
        note={<>A-900 · TRANSMITTAL</>}
        alt
      >
        <div className="hoja-split hoja-split--8-4">
          <div>
            <Reveal as="p" className="hoja-display" style={{ maxWidth: "12ch" }}>
              Send us the program.
            </Reveal>
            <p className="hoja-body" style={{ marginTop: "1.2rem" }}>
              Bring the one with the difficult site, the unforgiving schedule,
              or the building that already exists and refuses to cooperate.
              Those are the ones that end up in the set.
            </p>
            <div style={{ marginTop: "1.75rem" }}>
              <ContactForm />
            </div>
          </div>

          <Reveal className="hoja-panel" delay={1}>
            <div className="hoja-panel__head hoja-tick">
              <span>Bloque de contacto</span>
              <span>A-900</span>
            </div>
            <div className="hoja-panel__body">
              <Spec
                rows={[
                  { es: "Firma", en: "Firm", v: firm.legalName },
                  { es: "Dirección", en: "Address", v: firm.address },
                  {
                    es: "Teléfono",
                    en: "Phone",
                    v: (
                      <a className="hoja-link" href={firm.phoneHref}>
                        {firm.phone}
                      </a>
                    ),
                  },
                  {
                    es: "Correo",
                    en: "Email",
                    v: (
                      <a className="hoja-link" href={`mailto:${firm.email}`}>
                        {firm.email}
                      </a>
                    ),
                  },
                  { es: "Horario", en: "Hours", v: "LUN—VIE · 08:00—17:00 AST" },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
