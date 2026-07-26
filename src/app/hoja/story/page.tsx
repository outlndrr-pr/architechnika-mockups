import Link from "next/link";
import type { Metadata } from "next";
import { eras, firm, projectBySlug } from "@/data/content";
import Section from "@/components/hoja/Section";
import Frame from "@/components/hoja/Frame";
import Reveal from "@/components/hoja/Reveal";
import RevisionHistory, {
  type RevRow,
} from "@/components/hoja/RevisionHistory";
import { Arrow, Leader, TypeIn } from "@/components/hoja/Marks";

export const metadata: Metadata = {
  title: "A-300 STUDIO — Revision history · ArchiTechnika, Inc.",
  description:
    "Four names, one practice, forty-five years: the firm's history issued as the revision block of a drawing set, 1980 to today.",
};

export default function StorySheet() {
  const bayamon = projectBySlug("bayamon-medical-center")!;
  const hibird = projectBySlug("hibird-apartment-and-suites-hotel")!;

  const rows: RevRow[] = [
    {
      n: 1,
      date: "1980",
      desc: "Issued as Otero Ramos Arquitectos",
      by: "AOS",
      period: eras[0].period,
      title: eras[0].title,
      text: eras[0].text,
      highlights: eras[0].highlights,
      media: (
        <Reveal className="hoja-nodwg hoja-mono">
          <span>
            NO SHEETS FROM THIS REVISION HAVE BEEN DIGITIZED.
            <br />
            DRAWN BY HAND, 1980—1989.
            <br />
            <span className="hoja-dim-text">
              ORIGINALS ON VELLUM. STILL LEGIBLE.
            </span>
          </span>
        </Reveal>
      ),
    },
    {
      n: 2,
      date: "1990",
      desc: "Reissued — Andres Otero & Associates",
      by: "AOS",
      period: eras[1].period,
      title: eras[1].title,
      text: eras[1].text,
      highlights: eras[1].highlights,
      media: (
        <Frame
          file={bayamon.images[1]}
          alt="Hospital Hermanos Meléndez, Bayamón — the medical campus the firm expanded through the 1990s."
          sheet="A-202.02"
          title="Hospital Hnos. Meléndez · Bayamón"
          date={bayamon.year}
          ratio="4 / 3"
          quality={75}
          sizes="(max-width: 800px) 100vw, 34vw"
        />
      ),
    },
    {
      n: 3,
      date: "1995",
      desc: 'D.B.A. "Architechnika" added',
      by: "AOS / AOJ",
      period: "1995",
      title: "Servicios Técnicos y Desarrollos, Inc.",
      text: "Continuation of revision △2 — see above. Andres Otero & Associates became Servicios Técnicos y Desarrollos Inc., the venture under which the Architechnika brand was born. No change of scope, no change of personnel, and no change to the way a set gets drawn.",
      highlights: [],
      media: (
        <Reveal className="hoja-nodwg hoja-mono">
          <span>
            SIN CAMBIO DE ALCANCE / NO SCOPE CHANGE
            <br />
            <span className="hoja-dim-text">REFER TO REVISION △2</span>
          </span>
        </Reveal>
      ),
    },
    {
      n: 4,
      date: "2009",
      desc: "Incorporated — ArchiTechnika, Inc.",
      by: "AOJ",
      period: eras[2].period,
      title: eras[2].title,
      text: eras[2].text,
      highlights: eras[2].highlights,
      media: (
        <Frame
          file={hibird.images[0]}
          alt="HiBird Apartment & Suites Hotel on Avenida Ashford, Condado, at night."
          sheet="A-204.02"
          title="HiBird · Avenida Ashford"
          date={hibird.year}
          ratio="4 / 3"
          quality={75}
          sizes="(max-width: 800px) 100vw, 34vw"
          revision={4}
        />
      ),
    },
  ];

  return (
    <>
      <Section flush num={1} id="studio">
        <Reveal>
          <p className="hoja-mono hoja-dim-text" style={{ margin: 0 }}>
            A-300 · ESTUDIO / STUDIO
          </p>
          <h1 className="hoja-display" style={{ marginTop: ".65rem" }}>
            Four names.
            <br />
            One practice.
          </h1>
        </Reveal>

        <TypeIn
          text="1980 — 2026 · 45 AÑOS DE EMISIÓN CONTINUA / 45 YEARS OF CONTINUOUS ISSUE"
          className="hoja-mono hoja-dim-text hoja-hero__dim"
        />

        <div className="hoja-split hoja-split--7-5" style={{ marginTop: "2rem" }}>
          <p className="hoja-body">{firm.storyLead}</p>

          <Reveal className="hoja-panel" delay={1}>
            <div className="hoja-panel__head hoja-tick">
              <span>Por los números / By the numbers</span>
              <span>A-300.01</span>
            </div>
            <div className="hoja-panel__body">
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {firm.stats.map((s) => (
                  <li
                    key={s.label}
                    className="hoja-mono"
                    style={{
                      borderTop: "1px solid var(--grid-major)",
                      padding: ".45rem 0",
                    }}
                  >
                    <Leader
                      left={s.label.toUpperCase()}
                      right={<strong className="hoja-red">{s.value}</strong>}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        id="revision-history"
        letter="A"
        num={2}
        title="Historial de revisiones / Revision history"
        note={<>04 REVISIONES · EXPANDIBLES</>}
        alt
      >
        <RevisionHistory rows={rows} />

        <Reveal className="hoja-mono hoja-dim-text" style={{ marginTop: "1.1rem" }}>
          SELECCIONE UNA FILA PARA EXPANDIR / SELECT A ROW TO EXPAND.
        </Reveal>
      </Section>

      <Section id="continuity" letter="B" num={3} title="Continuidad / Continuity">
        <div className="hoja-split hoja-split--7-5">
          <div>
            <p className="hoja-h3" style={{ maxWidth: "28ch" }}>
              The letterhead changed four times. The line man never did.
            </p>
            <p className="hoja-body" style={{ marginTop: "1rem" }}>
              Luis I. Tua joined Otero Ramos Arquitectos in 1980 as its first
              line man and has developed the construction documents for more
              than three hundred projects since — through every name on the
              masthead, every change of software, and one complete migration
              from vellum to BIM. Andrés Otero Sr. has practised across the
              whole span. Andrés Otero Jr. brought the model.
            </p>
            <p className="hoja-body">
              That is the entire explanation for how a studio this size
              delivers a hospital campus in Bayamón and a ten-thousand-seat
              coliseum in Quebradillas: nobody has had to be told twice how the
              firm draws.
            </p>
            <p style={{ marginTop: "1.5rem" }}>
              <Link href="/hoja/team" className="hoja-btn">
                Open sheet A-400 personnel <Arrow dir="next" />
              </Link>
            </p>
          </div>

          <Reveal className="hoja-panel" delay={1}>
            <div className="hoja-panel__head hoja-tick">
              <span>Firmas / Signatures</span>
              <span>DRAWN · CHECKED · APPROVED</span>
            </div>
            <div className="hoja-panel__body">
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {[
                  ["AOS", "Andrés Otero Sr.", "1980—"],
                  ["AOJ", "Andrés Otero Jr.", "2009—"],
                  ["LIT", "Luis I. Tua", "1980—"],
                ].map(([ini, name, span]) => (
                  <li
                    key={ini}
                    className="hoja-mono"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "3.5rem 1fr auto",
                      gap: ".75rem",
                      borderTop: "1px solid var(--grid-major)",
                      padding: ".5rem 0",
                    }}
                  >
                    <span className="hoja-red">{ini}</span>
                    <span>{name}</span>
                    <span className="hoja-dim-text">{span}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
