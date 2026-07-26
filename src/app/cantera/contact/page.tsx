import type { Metadata } from "next";
import { firm } from "@/data/content";
import ContactForm from "@/components/cantera/ContactForm";
import Hairline from "@/components/cantera/Hairline";
import Rail from "@/components/cantera/Rail";
import Reveal from "@/components/cantera/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `ArchiTechnika, Inc. — ${firm.address}. ${firm.phone}. ${firm.email}.`,
};

export default function ContactPage() {
  return (
    <>
      <section
        className="c-hero"
        style={{ paddingTop: "clamp(6rem, 15vh, 11rem)" }}
        aria-labelledby="contact-page-title"
      >
        <div className="c-shell c-grid">
          <div className="col-2-12">
            <p className="c-meta c-meta--soft">Contact</p>
            <h1
              className="c-display"
              id="contact-page-title"
              style={{ marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              Bring us the difficult one.
            </h1>
          </div>
        </div>
        <div className="c-shell" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          <Hairline />
          <p className="c-meta c-hero__meta">
            <span>San Juan, Puerto Rico</span>
            <span aria-hidden="true">·</span>
            <span>We answer the telephone</span>
          </p>
        </div>
      </section>

      <section className="c-section" style={{ paddingTop: "clamp(5rem, 9vw, 9rem)" }}>
        <div className="c-shell c-grid c-annot">
          <Reveal className="col-2-8">
            <p className="c-lead c-lead--wide">
              Tell us the programme, the site and the constraint that is making
              it hard. If there are drawings, say so — we read drawings before
              we read decks.
            </p>
            <div style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
              <ContactForm />
            </div>
          </Reveal>

          <div className="col-9-12">
            <Rail
              items={[
                {
                  key: "Office",
                  value: (
                    <>
                      ArchiTechnika, Inc.
                      <br />
                      803 San Patricio Ave.
                      <br />
                      San Juan, PR 00921
                    </>
                  ),
                },
                {
                  key: "Telephone",
                  value: (
                    <a className="c-link c-nums" href={firm.phoneHref}>
                      {firm.phone}
                    </a>
                  ),
                },
                {
                  key: "Email",
                  value: (
                    <a className="c-link" href={`mailto:${firm.email}`}>
                      {firm.email}
                    </a>
                  ),
                },
                { key: "Practice", value: firm.services.join(" · ") },
                {
                  key: "Territory",
                  value: "Puerto Rico · United States · U.S. Virgin Islands",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section
        className="c-section"
        style={{ paddingTop: 0, paddingBottom: "var(--section)" }}
      >
        <div className="c-shell c-grid">
          <div className="col-2-9">
            <p className="c-meta c-meta--soft" style={{ marginBottom: "1.5rem" }}>
              Direct
            </p>
            <p>
              <a className="c-contact-line c-link" href={`mailto:${firm.email}`}>
                {firm.email}
              </a>
            </p>
            <p style={{ marginTop: "1.25rem" }}>
              <a
                className="c-contact-line c-link c-nums"
                href={firm.phoneHref}
              >
                {firm.phone}
              </a>
            </p>
            <p className="c-small" style={{ marginTop: "2rem" }}>
              {firm.address}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
