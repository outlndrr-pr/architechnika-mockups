import type { Metadata } from "next";
import { firm, heroImages, projects } from "@/data/content";
import CinemaWords from "@/components/brisa/CinemaWords";
import ContactSheet from "@/components/brisa/ContactSheet";
import ContactCta from "@/components/brisa/CtaBand";
import Reveal from "@/components/brisa/Reveal";
import { Breath } from "@/components/brisa/primitives";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The contact sheet — every project, uncropped, at its own proportions. Architechnika, San Juan, Puerto Rico.",
};

export default function BrisaPortfolio() {
  return (
    <>
      <section className="b-wrap b-band" aria-labelledby="brisa-work-title">
        <p className="b-label b-sol">
          <span className="es">El contacto</span> — {projects.length} published
          projects of {firm.stats[1].value}
        </p>
        <CinemaWords
          as="h1"
          className="b-display"
          lines={[{ text: "The contact sheet" }]}
        />
        <Reveal delay={300}>
          <p
            className="b-lead b-measure-wide"
            style={{ marginTop: "clamp(1.75rem, 3vw, 2.75rem)" }}
            id="brisa-work-title"
          >
            Nothing here is cropped. Each photograph keeps the proportion it was
            taken in, because the shape of a frame is part of what it tells you
            about a building.
          </p>
        </Reveal>
      </section>

      <section className="b-wrap" style={{ paddingBottom: "clamp(4rem, 9vw, 8rem)" }}>
        <ContactSheet projects={projects} />
      </section>

      <Breath />

      <ContactCta
        file={heroImages.sunset}
        alt="Sunset over residences in Puerto Rico"
        eyebrow="The other two hundred and eighty-five"
      />
    </>
  );
}
