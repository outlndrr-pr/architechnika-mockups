"use client";

import { useState, type FormEvent } from "react";
import { firm } from "@/data/content";
import { LAYERS } from "./sheets";
import { Arrow } from "./Marks";

const DELIVERY = [
  "Architectural",
  "Architectural + Engineering",
  "Construction Management",
  "Feasibility / Due diligence",
  "Undetermined",
];

/**
 * ISSUE FOR REVIEW. A transmittal, not a contact form: the fields a firm
 * actually needs before it can answer, composed into a mail draft.
 */
export default function ContactForm() {
  const [issued, setIssued] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    const body = [
      "TRANSMITTAL — ISSUED FOR REVIEW",
      "────────────────────────────────",
      `PROYECTO / PROJECT ....... ${get("project") || "—"}`,
      `TIPOLOGÍA / TYPOLOGY ..... ${get("typology") || "—"}`,
      `LOCALIZACIÓN / LOCATION .. ${get("location") || "—"}`,
      `ALCANCE / DELIVERY ....... ${get("delivery") || "—"}`,
      `PRESUPUESTO / BUDGET ..... ${get("budget") || "—"}`,
      `FECHA META / TARGET ...... ${get("target") || "—"}`,
      "",
      "DESCRIPCIÓN / PROGRAM",
      get("program") || "—",
      "",
      "────────────────────────────────",
      `DE / FROM ... ${get("name") || "—"}`,
      `ORG ......... ${get("org") || "—"}`,
      `EMAIL ....... ${get("email") || "—"}`,
      `TEL ......... ${get("phone") || "—"}`,
    ].join("\n");

    const subject = `ISSUE FOR REVIEW — ${get("project") || "New program"}`;
    const url = `mailto:${firm.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setIssued(true);
    window.location.href = url;
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      <div className="hoja-form__grid">
        <Field
          es="Proyecto"
          en="Project"
          name="project"
          required
          placeholder="Working title"
        />
        <Field
          es="Tipología"
          en="Typology"
          name="typology"
          as="select"
          options={[...LAYERS, "Master plan", "Other"]}
        />
        <Field
          es="Localización"
          en="Location"
          name="location"
          placeholder="Municipality, PR"
        />
        <Field
          es="Alcance"
          en="Delivery"
          name="delivery"
          as="select"
          options={DELIVERY}
        />
        <Field
          es="Presupuesto"
          en="Budget"
          name="budget"
          placeholder="USD, order of magnitude"
        />
        <Field es="Fecha meta" en="Target date" name="target" placeholder="YYYY-MM" />

        <Field
          es="Descripción"
          en="Program"
          name="program"
          as="textarea"
          required
          wide
          placeholder="Site, program, constraints, and the part you think is impossible."
        />

        <Field es="Nombre" en="Name" name="name" required />
        <Field es="Organización" en="Organization" name="org" />
        <Field es="Correo" en="Email" name="email" type="email" required />
        <Field es="Teléfono" en="Phone" name="phone" type="tel" />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1rem",
          marginTop: "1.25rem",
        }}
      >
        <button type="submit" className="hoja-btn hoja-btn--red">
          <span aria-hidden="true">[</span> Issue <Arrow dir="next" />{" "}
          <span aria-hidden="true">]</span>
        </button>
        <p className="hoja-mono hoja-dim-text" style={{ margin: 0 }}>
          <span className="hoja-req">*</span> CAMPOS REQUERIDOS / REQUIRED ·
          OPENS YOUR MAIL CLIENT WITH THE TRANSMITTAL COMPOSED
        </p>
      </div>

      <p className="hoja-vh" role="status" aria-live="polite">
        {issued
          ? "Transmittal composed and handed to your mail client."
          : ""}
      </p>
    </form>
  );
}

function Field({
  es,
  en,
  name,
  required = false,
  as = "input",
  type = "text",
  options,
  placeholder,
  wide = false,
}: {
  es: string;
  en: string;
  name: string;
  required?: boolean;
  as?: "input" | "textarea" | "select";
  type?: string;
  options?: readonly string[];
  placeholder?: string;
  wide?: boolean;
}) {
  const id = `hoja-f-${name}`;
  return (
    <div className={`hoja-field${wide ? " hoja-field--wide" : ""}`}>
      <label className="hoja-field__lab hoja-tick" htmlFor={id}>
        {es} <em>/ {en}</em>
        {required ? <span className="hoja-req"> *</span> : null}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={name} required={required} placeholder={placeholder} />
      ) : as === "select" ? (
        <select id={id} name={name} required={required} defaultValue="">
          <option value="">— select —</option>
          {options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
