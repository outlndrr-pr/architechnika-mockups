import Image from "next/image";
import Link from "next/link";
import { firm, heroImages, img } from "@/data/content";
import LaHora from "./LaHora";
import { BRISA_NAV } from "./navItems";

/**
 * The second — and last — appearance of the golden-hour gradient. The page
 * doesn't end; the light goes.
 */
export default function Footer() {
  return (
    <footer className="b-footer">
      <div className="b-footer-media" aria-hidden="true">
        <Image
          src={img(heroImages.sunset)}
          alt=""
          fill
          quality={60}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="b-goldenhour" />
      </div>

      <div className="b-wrap b-footer-body">
        <div className="b-footer-grid">
          <div>
            <p className="b-title">
              {firm.name}
              <br />
              <span className="es">Arquitectura con propósito.</span>
            </p>
            <p className="b-lead b-measure" style={{ marginTop: "1.5rem" }}>
              <a href={`mailto:${firm.email}`} className="b-underline">
                {firm.email}
              </a>
              <br />
              <a href={firm.phoneHref} className="b-underline">
                {firm.phone}
              </a>
            </p>
          </div>

          <nav className="b-footer-nav" aria-label="Footer">
            <p className="b-label b-dim">Site</p>
            {BRISA_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="b-underline">
                {item.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className="b-label b-dim">Studio</p>
            <p style={{ marginTop: "0.5rem" }}>
              {firm.address}
              <br />
              18.4655° N, 66.1057° W
            </p>
            <div style={{ marginTop: "1.25rem" }}>
              <LaHora />
            </div>
          </div>
        </div>

        <div className="b-footer-rule">
          <p>
            {firm.legalName} — <span className="es">Otero Ramos Arquitectos</span>{" "}
            · <span className="es">Andrés Otero &amp; Associates</span> ·{" "}
            <span className="es">Servicios Técnicos y Desarrollos</span> ·{" "}
            {firm.legalName}
          </p>
          <p>
            <span className="es">Construida para perdurar.</span> Est.{" "}
            {firm.founded}.
          </p>
        </div>
      </div>
    </footer>
  );
}
