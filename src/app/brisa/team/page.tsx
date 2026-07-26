import type { Metadata } from "next";
import { firm, heroImages, team } from "@/data/content";
import CinemaWords from "@/components/brisa/CinemaWords";
import ContactCta from "@/components/brisa/CtaBand";
import Reveal from "@/components/brisa/Reveal";
import { Breath, TerraceCrop } from "@/components/brisa/primitives";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Three principals — el Fundador, el Innovador, el Técnico. Architechnika, San Juan, Puerto Rico.",
};

const EPITHETS = ["El Fundador", "El Innovador", "El Técnico"];

export default function BrisaTeam() {
  return (
    <>
      {/* No portraits. The names are the picture. */}
      <section className="b-wrap b-band" aria-labelledby="brisa-team-title">
        <p className="b-label b-sol">
          <span className="es">Los principales</span>
        </p>
        <CinemaWords
          as="h1"
          className="b-display"
          lines={[
            { text: "Three names", br: true },
            { text: "on the drawings.", br: false },
          ]}
        />
        <Reveal delay={340}>
          <p
            className="b-lead b-measure-wide"
            style={{ marginTop: "clamp(1.75rem, 3vw, 2.75rem)" }}
            id="brisa-team-title"
          >
            We have never put photographs of ourselves on this page. What you
            hire is the judgement, and the judgement is legible in the work.
          </p>
        </Reveal>
      </section>

      <Breath />

      <section className="b-wrap" aria-label="Principals">
        {team.map((person, i) => (
          <Reveal key={person.name} className="b-principal" delay={i * 120}>
            <p className="b-label b-dim">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="b-title" style={{ marginTop: "1rem" }}>
              {person.name}
              <span className="b-principal-epithet es">{EPITHETS[i]}</span>
            </h2>

            <div className="b-principal-grid">
              <div>
                <p className="b-label b-dim">{person.role}</p>
                <p className="b-body" style={{ marginTop: "0.75rem" }}>
                  {person.credentials}
                </p>
              </div>
              <p className="b-body b-measure-body b-dim">{person.bio}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <Breath />

      <TerraceCrop
        file="b8bb1657_ChatGPT_Image_Jan_2_2C_2026_2C_02_10_34_PM.jpg"
        alt="An Architechnika residential proposal seen from its terrace"
        caption={
          <>
            <span className="es">Tres socios, una oficina.</span> {firm.address}
          </>
        }
      />

      <section className="b-wrap b-band" aria-labelledby="brisa-next-gen">
        <div className="b-split">
          <div>
            <p className="b-label b-sol" id="brisa-next-gen">
              <span className="es">La próxima generación</span>
            </p>
            <h2 className="b-title b-measure" style={{ marginTop: "1.5rem" }}>
              The people who will still be here in 2050.
            </h2>
          </div>
          <p className="b-body b-measure-body b-dim">
            The firm&apos;s production has run through the same hands since
            1980, and those hands now train the young architects and engineers
            who carry the tradition forward. That is the succession plan: not a
            document, a habit.
          </p>
        </div>
      </section>

      <ContactCta
        file={heroImages.sunset}
        alt="Sunset over residences in Puerto Rico"
        eyebrow="Work with us"
      />
    </>
  );
}
