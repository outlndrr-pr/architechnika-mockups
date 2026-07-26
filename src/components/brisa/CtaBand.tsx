import Image from "next/image";
import { firm, img } from "@/data/content";
import LaHora from "./LaHora";

/**
 * The full-bleed close. Text sits low in the band, on a flat scrim that keeps
 * it well past 4.5:1 over the photograph, with La Hora mirrored from the hero.
 */
export default function CtaBand({
  file,
  alt,
  eyebrow = "Contact",
}: {
  file: string;
  alt: string;
  eyebrow?: string;
}) {
  return (
    <section className="b-cta" aria-labelledby="brisa-cta-title">
      <Image
        src={img(file)}
        alt={alt}
        fill
        quality={75}
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      <div className="b-scrim-firm" />

      <div className="b-wrap b-cta-body">
        <p className="b-label b-sol">{eyebrow}</p>
        <h2 className="b-title" id="brisa-cta-title" style={{ marginTop: "1.5rem" }}>
          Let&apos;s talk about the site.
          <br />
          <span className="es">Hablemos.</span>
        </h2>

        <div className="b-contact-lines" style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
          <a className="b-contact-line b-underline" href={`mailto:${firm.email}`}>
            {firm.email}
          </a>
          <a className="b-contact-line b-underline" href={firm.phoneHref}>
            {firm.phone}
          </a>
        </div>

        <div style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
          <LaHora />
        </div>
      </div>
    </section>
  );
}
