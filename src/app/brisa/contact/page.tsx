import type { Metadata } from "next";
import Image from "next/image";
import { firm, heroImages, img } from "@/data/content";
import CinemaWords from "@/components/brisa/CinemaWords";
import LaHora from "@/components/brisa/LaHora";
import MailForm from "@/components/brisa/MailForm";
import Reveal from "@/components/brisa/Reveal";
import { Breath } from "@/components/brisa/primitives";

export const metadata: Metadata = {
  title: "Contact",
  description: `${firm.address} · ${firm.phone} · ${firm.email}`,
};

export default function BrisaContact() {
  return (
    <>
      {/* Full-bleed CTA band, text low, on a firm scrim */}
      <section className="b-cta" aria-labelledby="brisa-contact-title">
        <Image
          src={img(heroImages.hibirdNight)}
          alt="HiBird Apartment & Suites Hotel at night, Avenida Ashford, Condado"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="b-scrim-firm" />

        <div className="b-wrap b-cta-body">
          <p className="b-label b-sol">
            San Juan, Puerto Rico · 18.4655° N, 66.1057° W
          </p>
          <CinemaWords
            as="h1"
            className="b-display"
            lines={[
              { text: "Let's talk about the site.", br: true },
              { text: "Hablemos.", spanish: true },
            ]}
          />
          <div
            className="b-contact-lines"
            style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}
            id="brisa-contact-title"
          >
            <a className="b-contact-line b-underline" href={`mailto:${firm.email}`}>
              {firm.email}
            </a>
            <a className="b-contact-line b-underline" href={firm.phoneHref}>
              {firm.phone}
            </a>
          </div>
          <div style={{ marginTop: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            <LaHora />
          </div>
        </div>
      </section>

      <Breath />

      <section className="b-wrap b-band" aria-labelledby="brisa-contact-detail">
        <div className="b-split">
          <div>
            <p className="b-label b-sol" id="brisa-contact-detail">
              <span className="es">La oficina</span>
            </p>
            <h2 className="b-title b-measure" style={{ marginTop: "1.5rem" }}>
              Bring us the difficult one.
            </h2>
            <p
              className="b-lead b-measure-wide"
              style={{ marginTop: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              A landmark that has to stay a landmark. A hospital wing that has
              to open on a date. A hotel that has to be finished before the
              season. Tell us the constraint first — it is usually where the
              design is.
            </p>

            <div className="b-names" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
              <div className="b-name-row">
                <span className="b-name-year">Studio</span>
                <span>{firm.address}</span>
              </div>
              <div className="b-name-row">
                <span className="b-name-year">Phone</span>
                <span>
                  <a href={firm.phoneHref} className="b-underline">
                    {firm.phone}
                  </a>
                </span>
              </div>
              <div className="b-name-row">
                <span className="b-name-year">Email</span>
                <span>
                  <a href={`mailto:${firm.email}`} className="b-underline">
                    {firm.email}
                  </a>
                </span>
              </div>
              <div className="b-name-row">
                <span className="b-name-year">Services</span>
                <span>{firm.services.join(" · ")}</span>
              </div>
            </div>
          </div>

          <Reveal delay={200}>
            <p className="b-label b-dim" style={{ marginBottom: "1.5rem" }}>
              <span className="es">Escríbenos</span>
            </p>
            <MailForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
