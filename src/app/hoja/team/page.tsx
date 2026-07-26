import Link from "next/link";
import type { Metadata } from "next";
import { team } from "@/data/content";
import Section from "@/components/hoja/Section";
import Reveal from "@/components/hoja/Reveal";
import PersonnelBlock, { INITIALS } from "@/components/hoja/Personnel";
import { Arrow, Leader, TypeIn } from "@/components/hoja/Marks";

export const metadata: Metadata = {
  title: "A-400 TEAM — Personnel · ArchiTechnika, Inc.",
  description:
    "Three principals: the founder, the innovator, the technician. Identified the way a drawing identifies them — by the initials in the DRAWN BY cell.",
};

const DUTY: Record<string, string> = {
  AOS: "Aprobado por / Approved by",
  AOJ: "Revisado por / Checked by",
  LIT: "Dibujado por / Drawn by",
};

export default function TeamSheet() {
  return (
    <>
      <Section flush num={1} id="personnel-head">
        <Reveal>
          <p className="hoja-mono hoja-dim-text" style={{ margin: 0 }}>
            A-400 · PERSONAL / PERSONNEL
          </p>
          <h1 className="hoja-display" style={{ marginTop: ".65rem" }}>
            Three principals.
            <br />
            One title block.
          </h1>
        </Reveal>

        <TypeIn
          text="AOS · APROBADO POR — AOJ · REVISADO POR — LIT · DIBUJADO POR"
          className="hoja-mono hoja-dim-text hoja-hero__dim"
        />

        <Reveal className="hoja-body" delay={1} style={{ marginTop: "1.5rem" }}>
          <p className="hoja-body">
            Every sheet a firm issues carries three cells at its lower right:
            who drew it, who checked it, and who approved it. At this practice
            those cells have held the same three sets of initials for most of
            forty-five years, which is an unusual thing to be able to say and
            the most useful thing we can tell you about how the work gets made.
          </p>
        </Reveal>

        <div
          className="hoja-panel hoja-mono"
          style={{ marginTop: "2rem", maxWidth: "38rem" }}
        >
          <div className="hoja-panel__head hoja-tick">
            <span>Asignación / Assignment</span>
            <span>A-400.01</span>
          </div>
          <div className="hoja-panel__body">
            {team.map((p) => {
              const ini = INITIALS[p.name] ?? "—";
              return (
                <p
                  key={p.name}
                  className="hoja-mono"
                  style={{
                    borderTop: "1px solid var(--grid-major)",
                    padding: ".45rem 0",
                    margin: 0,
                  }}
                >
                  <Leader left={DUTY[ini] ?? "—"} right={ini} />
                </p>
              );
            })}
          </div>
        </div>
      </Section>

      {team.map((p, i) => (
        <Section
          key={p.name}
          id={`p-${INITIALS[p.name]?.toLowerCase() ?? i}`}
          letter={["A", "B", "C"][i]}
          num={i + 2}
          title={p.name}
          note={<>A-40{i + 1}</>}
          alt={i % 2 === 1}
        >
          <div className="hoja-split hoja-split--5-7">
            <PersonnelBlock person={p} sheet={`A-40${i + 1}`} />
            <Reveal delay={1}>
              <p className="hoja-body">{p.bio}</p>
            </Reveal>
          </div>
        </Section>
      ))}

      <Section id="team-cta" letter="D" num={team.length + 2}>
        <Reveal
          className="hoja-mono"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className="hoja-dim-text">
            THE NEXT GENERATION IS BEING TRAINED IN-HOUSE. SAME TITLE BLOCK.
          </span>
          <Link href="/hoja/contact" className="hoja-btn hoja-btn--red">
            Open sheet A-900 contact <Arrow dir="next" />
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
