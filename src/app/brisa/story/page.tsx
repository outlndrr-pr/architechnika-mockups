import type { Metadata } from "next";
import Image from "next/image";
import { eras, firm, heroImages, img } from "@/data/content";
import CinemaWords from "@/components/brisa/CinemaWords";
import ContactCta from "@/components/brisa/CtaBand";
import Marquee from "@/components/brisa/Marquee";
import Reveal from "@/components/brisa/Reveal";
import { Breath, TerraceCrop } from "@/components/brisa/primitives";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Four names, one practice, one address. Architechnika's history from 1980 to today.",
};

const NAMES = [
  { year: "1980", name: "Otero Ramos Arquitectos" },
  { year: "1990", name: "Andrés Otero & Associates" },
  { year: "1995", name: "Servicios Técnicos y Desarrollos" },
  { year: "2009", name: firm.legalName },
];

export default function BrisaStory() {
  return (
    <>
      {/* Arrival */}
      <section className="b-arrival">
        <Image
          src={img(heroImages.render3)}
          alt="An Architechnika residential proposal at dusk, Puerto Rico"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="b-scrim-soft" />
        <div className="b-wrap b-arrival-body">
          <p className="b-label" style={{ color: "var(--arena)" }}>
            <span className="es">Nuestra historia</span> · 1980 — 2026
          </p>
        </div>
      </section>

      <section className="b-wrap b-band" aria-labelledby="brisa-story-title">
        <CinemaWords
          as="h1"
          className="b-display"
          lines={[
            { text: "We have changed our name", br: true },
            { text: "four times.", br: true },
            { text: "Never the address.", br: false },
          ]}
        />
        <Reveal delay={400}>
          <p
            className="b-lead b-measure-wide"
            style={{ marginTop: "clamp(1.75rem, 3vw, 2.75rem)" }}
            id="brisa-story-title"
          >
            {firm.storyLead}
          </p>
        </Reveal>
      </section>

      {/* The four names */}
      <section className="b-wrap" style={{ paddingBottom: "clamp(3rem, 7vw, 6rem)" }}>
        <div className="b-names">
          {NAMES.map((n, i) => (
            <Reveal key={n.year} className="b-name-row" delay={i * 120}>
              <span className="b-name-year">{n.year}</span>
              <span className="b-name-title">{n.name}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <Breath />

      {/* The eras */}
      <section className="b-wrap b-band-even" aria-labelledby="brisa-eras">
        <p className="b-label b-sol" id="brisa-eras">
          <span className="es">Las tres eras</span>
        </p>

        <div style={{ marginTop: "clamp(2rem, 4vw, 3.5rem)" }}>
          {eras.map((era, i) => (
            <Reveal key={era.period} className="b-era" delay={i * 120}>
              <div>
                <p className="b-label b-era-period">{era.period}</p>
                <h2 className="b-title" style={{ marginTop: "1rem" }}>
                  {era.title}
                </h2>
                <p
                  className="b-body b-measure-body"
                  style={{ marginTop: "1.75rem" }}
                >
                  {era.text}
                </p>
              </div>
              <ul className="b-highlights">
                {era.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <Breath />

      {/* The record */}
      <section className="b-wrap b-band" aria-labelledby="brisa-record">
        <p className="b-label b-sol" id="brisa-record">
          <span className="es">Por los números</span>
        </p>
        <div className="b-stats" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          {firm.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 140}>
              <p className="b-stat-value">{s.value}</p>
              <p className="b-stat-label">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <TerraceCrop
        file="0e9cb003_HYBIRD-ASHFORD__2815_29.jpg"
        alt="Terrace at the HiBird Apartment & Suites Hotel, Condado, San Juan"
        caption={
          <>
            <span className="es">La brisa decide.</span> Every plan on this
            island starts with which way the wind comes from.
          </>
        }
      />

      <section className="b-wrap b-band" aria-labelledby="brisa-method">
        <div className="b-split">
          <div>
            <p className="b-label b-sol" id="brisa-method">
              <span className="es">El método</span>
            </p>
            <h2 className="b-title b-measure" style={{ marginTop: "1.5rem" }}>
              A boutique studio that has never been limited by its size.
            </h2>
          </div>
          <div className="b-stack-m">
            <p className="b-body b-measure-body b-dim">
              We stayed small on purpose and got large through technology. 3D,
              BIM and project-management platforms arrived here early — Revit,
              3ds Max and AutoCAD are the production backbone — and strategic
              partnerships carry the rest. It is how three principals deliver a
              two-hundred-bed hospital and a ten-thousand-seat coliseum from an
              office in San Juan.
            </p>
            <p className="es" style={{ fontSize: "var(--t-lead)", lineHeight: 1.4 }}>
              Combinamos amplia experiencia arquitectónica con innovación
              técnica.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="brisa-story-donde">
        <div className="b-wrap" style={{ paddingBottom: "1.5rem" }}>
          <p className="b-label b-dim" id="brisa-story-donde">
            <span className="es">Donde hemos construido</span>
          </p>
        </div>
        <Marquee />
      </section>

      <Breath />

      <ContactCta
        file={heroImages.towers}
        alt="Twin residential towers at dusk, San Juan, Puerto Rico"
        eyebrow="Forty-five years in"
      />
    </>
  );
}
