import Image from "next/image";
import Link from "next/link";
import {
  firm,
  heroImages,
  img,
  projectBySlug,
  team,
  type Project,
} from "@/data/content";
import CinemaWords from "@/components/brisa/CinemaWords";
import ContactCta from "@/components/brisa/CtaBand";
import HeroMedia from "@/components/brisa/HeroMedia";
import LaHora from "@/components/brisa/LaHora";
import Marquee from "@/components/brisa/Marquee";
import Passage from "@/components/brisa/Passage";
import Reveal from "@/components/brisa/Reveal";
import { Breath, TerraceCrop } from "@/components/brisa/primitives";
import { dims } from "@/components/brisa/imageMeta";
import { isNight, prHour } from "@/components/brisa/time";

const PASSAGE_SLUGS = [
  "normandie-hotel",
  "hibird-apartment-and-suites-hotel",
  "casa-metropolitana-ii",
];

const TYPOLOGY_PREVIEW: { file: string; label: string; alt: string }[] = [
  {
    file: "0f17b2da_HIBIRD_-_ASHFORD_12.jpg",
    label: "Hospitality",
    alt: "HiBird Apartment & Suites Hotel, Avenida Ashford, Condado",
  },
  {
    file: "70944de6_BAYAMON_MEDICAL_PLAZA__285_29.jpg",
    label: "Healthcare",
    alt: "Bayamón Medical Center, Bayamón, Puerto Rico",
  },
  {
    file: "0ea28915_Picture1.jpg",
    label: "Sports",
    alt: "Raymond Dalmau Coliseum, Quebradillas, Puerto Rico",
  },
  {
    file: "a08bef16_Picture1.jpg",
    label: "Residential",
    alt: "Casa Metropolitana II, San Juan, Puerto Rico",
  },
  {
    file: "9479beff_EBA_VEGA_BAJA__283_29.jpg",
    label: "Institutional",
    alt: "Fine Arts School, Vega Baja, Puerto Rico",
  },
  {
    file: "d53a968a_PS-GIP_CONCEPTUAL_SCHEMATIC_Photo_-_1.jpg",
    label: "Commercial",
    alt: "Gonzi Industrial Park, Guaynabo, Puerto Rico",
  },
];

export default function BrisaLanding() {
  const night = isNight(prHour());
  const panels = PASSAGE_SLUGS.map((s) => projectBySlug(s)).filter(
    Boolean
  ) as Project[];

  return (
    <>
      {/* §1 — The Hour */}
      <section className="b-hero" aria-labelledby="brisa-hero-title">
        <HeroMedia
          initialNight={night}
          nightSrc={img(heroImages.hibirdNight)}
          nightAlt="HiBird Apartment & Suites Hotel at night, Avenida Ashford, Condado, San Juan"
          daySrc={img(heroImages.normandieAerial)}
          dayAlt="Aerial view of the Normandie Hotel, San Juan, Puerto Rico"
        />

        <div className="b-wrap b-hero-body">
          <p className="b-label b-hero-label">
            San Juan, Puerto Rico · 18.4655° N, 66.1057° W
          </p>
          <CinemaWords
            as="h1"
            className="b-display"
            lines={[
              { text: "Designing high-performance", br: true },
              { text: "spaces that shape cities", br: true },
              { text: "y elevan la vida diaria.", spanish: true },
            ]}
          />
          <div className="b-hero-foot">
            <p className="b-lead b-measure-wide" id="brisa-hero-title">
              Forty-five years of architecture on this island and everywhere it
              reaches.
            </p>
            <div className="b-hero-hora">
              <LaHora />
            </div>
          </div>
        </div>
      </section>

      {/* §2 */}
      <Breath />

      {/* §3 — La firma */}
      <section className="b-wrap b-band" aria-labelledby="brisa-firma">
        <div className="b-split">
          <div>
            <Reveal>
              <p className="b-label b-sol">
                <span className="es">La firma</span>
              </p>
            </Reveal>
            <Reveal delay={140}>
              <h2
                className="b-title"
                id="brisa-firma"
                style={{ marginTop: "1.5rem" }}
              >
                Architecture with purpose.
                <br />
                Built to endure.
              </h2>
            </Reveal>
            <Reveal delay={280}>
              <p
                className="b-lead b-measure-wide"
                style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}
              >
                The trade wind comes out of the east, all day, all year. It is
                why buildings on this island are turned the way they are — the
                long side to the breeze, deep overhangs against the sun, rooms
                that can be opened. We design for that wind first, and cool
                what is left.
              </p>
            </Reveal>
          </div>

          <div className="b-stack-m">
            <Reveal delay={420}>
              <p className="b-body b-measure-body b-dim">{firm.intro}</p>
            </Reveal>
            <Reveal delay={560}>
              <p className="es" style={{ fontSize: "var(--t-lead)", lineHeight: 1.4 }}>
                Combinamos amplia experiencia arquitectónica con innovación
                técnica.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* §4 — The Passage */}
      <Passage projects={panels} />

      <section className="b-wrap b-band-even">
        <Reveal>
          <p className="b-title">
            <Link href="/brisa/portfolio" className="b-underline">
              Three hundred more →
            </Link>
          </p>
        </Reveal>
      </section>

      {/* §5 — Trade Wind marquee */}
      <section aria-labelledby="brisa-donde">
        <div className="b-wrap" style={{ paddingBottom: "1.5rem" }}>
          <Reveal>
            <p className="b-label b-dim" id="brisa-donde">
              <span className="es">Donde hemos construido</span>
            </p>
          </Reveal>
        </div>
        <Marquee />
      </section>

      {/* §6 — Typologies contact sheet */}
      <section className="b-wrap b-band" aria-labelledby="brisa-typologies">
        <Reveal>
          <h2 className="b-title b-measure" id="brisa-typologies">
            Hotels, hospitals, coliseums, and houses.
            <br />
            <span className="es">Any scale. That has always been the point.</span>
          </h2>
        </Reveal>

        <div className="b-sheet" style={{ marginTop: "clamp(2.5rem, 6vw, 5rem)" }}>
          {TYPOLOGY_PREVIEW.map((t, i) => {
            const { width, height } = dims(t.file);
            return (
              <Reveal key={t.file} delay={i * 140}>
                <Link href="/brisa/portfolio" className="b-sheet-item">
                  <Image
                    src={img(t.file, "thumb")}
                    alt={t.alt}
                    width={width}
                    height={height}
                    quality={60}
                    sizes="(max-width: 560px) 92vw, (max-width: 980px) 46vw, 31vw"
                  />
                  <span className="b-sheet-cap">
                    <span className="b-sheet-cap-title">{t.label}</span>
                    <span className="b-sheet-cap-meta">See all work</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* §7 */}
      <Breath />

      {/* §8 — History */}
      <section className="b-band" aria-labelledby="brisa-history">
        <div className="b-wrap" style={{ paddingBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          <Reveal>
            <p className="b-label b-sol">
              <span className="es">Nuestra historia</span>
            </p>
          </Reveal>
          <Reveal delay={140}>
            <h2 className="b-title b-measure" id="brisa-history" style={{ marginTop: "1.5rem" }}>
              We have changed our name four times.
              <br />
              We have never changed the address.
            </h2>
          </Reveal>
        </div>

        <TerraceCrop
          file="45b2bd4a_Arch-Hospital_Hermanos_Melendez._2.jpg"
          alt="Hospital Hermanos Meléndez, Bayamón, Puerto Rico"
          caption={
            <>
              <span className="es">Cuatro nombres, una misma práctica.</span>{" "}
              Bayamón, from the first decade.
            </>
          }
        />

        <div className="b-wrap" style={{ paddingTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          <div className="b-names">
            {[
              { year: "1980", name: "Otero Ramos Arquitectos" },
              { year: "1990", name: "Andrés Otero & Associates" },
              { year: "1995", name: "Servicios Técnicos y Desarrollos" },
              { year: "2009", name: firm.legalName },
            ].map((n, i) => (
              <Reveal key={n.year} className="b-name-row" delay={i * 120}>
                <span className="b-name-year">{n.year}</span>
                <span className="b-name-title">{n.name}</span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={520}>
            <p className="b-lead b-measure-wide" style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
              Four names, one practice, and the same city since {firm.founded}.{" "}
              <Link href="/brisa/story" className="b-underline">
                Read the whole story →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* §9 — Los principales */}
      <section className="b-wrap b-band b-band-alt" aria-labelledby="brisa-team">
        <Reveal>
          <p className="b-label b-sol">
            <span className="es">Los principales</span>
          </p>
        </Reveal>
        <Reveal delay={140}>
          <h2 className="b-title b-measure" id="brisa-team" style={{ marginTop: "1.5rem" }}>
            Three principals. One practice since 1980.
          </h2>
        </Reveal>

        <div className="b-names" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          {team.map((person, i) => (
            <Reveal key={person.name} className="b-name-row" delay={i * 140}>
              <span className="b-name-year">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="b-name-title">{person.name}</span>
                <span className="b-principal-epithet es">
                  {["El Fundador", "El Innovador", "El Técnico"][i]}
                </span>
                <span
                  className="b-body b-dim"
                  style={{ display: "block", marginTop: "0.5rem" }}
                >
                  {person.credentials}
                </span>
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={520}>
          <p className="b-lead" style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
            <Link href="/brisa/team" className="b-underline">
              Meet the studio →
            </Link>
          </p>
        </Reveal>
      </section>

      {/* §10 — Contact */}
      <ContactCta
        file={heroImages.towers}
        alt="Twin residential towers at dusk, San Juan, Puerto Rico"
        eyebrow="Contact"
      />
    </>
  );
}
