import type { Metadata } from "next";
import { firm } from "@/data/content";
import Section from "@/components/hoja/Section";
import Reveal from "@/components/hoja/Reveal";
import Spec from "@/components/hoja/Spec";
import ContactForm from "@/components/hoja/ContactForm";
import { TypeIn } from "@/components/hoja/Marks";

export const metadata: Metadata = {
  title: "A-900 CONTACT — Issue for review · ArchiTechnika, Inc.",
  description: `${firm.legalName}, ${firm.address}. ${firm.phone}. Send the program and we will answer it.`,
};

export default function ContactSheet() {
  return (
    <>
      <Section flush num={1} id="contact-head">
        <Reveal>
          <p className="hoja-mono hoja-dim-text" style={{ margin: 0 }}>
            A-900 · EMITIDO PARA REVISIÓN / ISSUED FOR REVIEW
          </p>
          <h1 className="hoja-display" style={{ marginTop: ".65rem" }}>
            Send us
            <br />
            the program.
          </h1>
        </Reveal>

        <TypeIn
          text="RESPUESTA TÍPICA / TYPICAL RESPONSE: 1—2 DÍAS HÁBILES · SE HABLA ESPAÑOL"
          className="hoja-mono hoja-dim-text hoja-hero__dim"
        />

        <div className="hoja-split hoja-split--5-7" style={{ marginTop: "2.25rem" }}>
          <Reveal className="hoja-panel">
            <div className="hoja-panel__head hoja-tick">
              <span>Bloque de contacto / Contact block</span>
              <span>A-900.01</span>
            </div>
            <div className="hoja-panel__body">
              <p
                className="hoja-h3"
                style={{ margin: "0 0 1rem", lineHeight: 1.2 }}
              >
                <a className="hoja-link" href={firm.phoneHref}>
                  {firm.phone}
                </a>
              </p>
              <address style={{ fontStyle: "normal" }}>
                <Spec
                  rows={[
                    { es: "Firma", en: "Firm", v: firm.legalName },
                    { es: "Dirección", en: "Address", v: firm.address },
                    {
                      es: "Correo",
                      en: "Email",
                      v: (
                        <a className="hoja-link" href={`mailto:${firm.email}`}>
                          {firm.email}
                        </a>
                      ),
                    },
                    { es: "Horario", en: "Hours", v: "LUN—VIE · 08:00—17:00 AST" },
                    { es: "Zona", en: "Time zone", v: "AST · UTC−04:00" },
                    {
                      es: "Servicios",
                      en: "Services",
                      v: firm.services.join(" + ").toUpperCase(),
                    },
                    {
                      es: "Jurisdicciones",
                      en: "Jurisdictions",
                      v: "PUERTO RICO · USA · USVI",
                    },
                  ]}
                />
              </address>
              <p className="hoja-mono hoja-dim-text" style={{ marginTop: "1rem" }}>
                LLAMADAS CONTESTADAS POR PERSONAS. / CALLS ARE ANSWERED BY
                PEOPLE.
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal className="hoja-panel">
              <div className="hoja-panel__head hoja-tick">
                <span>Transmisión / Transmittal</span>
                <span>A-900.02</span>
              </div>
              <div className="hoja-panel__body">
                <p className="hoja-body" style={{ marginTop: 0 }}>
                  Fill the transmittal and it will compose itself into a mail
                  draft — the same fields we would ask for on the phone, in the
                  same order, so nothing has to be asked twice.
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section
        id="criteria"
        letter="A"
        num={2}
        title="Antes de escribir / Before you write"
        note={<>A-900.03 · NOTES TO BIDDER</>}
        alt
      >
        <div className="hoja-cols">
          {[
            {
              n: "01",
              t: "Bring the difficult one",
              b: "The building that already exists, the site that fights back, the schedule that was set before the design was. Those are the projects this office is organised around.",
            },
            {
              n: "02",
              t: "Scale is not the question",
              b: "Nine rooms on a mountaintop or ten thousand seats in Quebradillas — both go through the same model and the same three sets of initials.",
            },
            {
              n: "03",
              t: "Say what is undecided",
              b: "A program with honest gaps is easier to price than one with confident guesses in it. Mark the unknowns; we will schedule them.",
            },
          ].map((c, i) => (
            <Reveal
              key={c.n}
              className="hoja-method"
              delay={(i + 1) as 1 | 2 | 3}
            >
              <p className="hoja-mono hoja-red" style={{ margin: 0 }}>
                {c.n}
              </p>
              <p className="hoja-h3" style={{ marginTop: ".5rem" }}>
                {c.t}
              </p>
              <p className="hoja-body" style={{ marginTop: ".8rem" }}>
                {c.b}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
