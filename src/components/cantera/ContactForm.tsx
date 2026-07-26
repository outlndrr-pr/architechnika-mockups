"use client";

import { useState, type FormEvent } from "react";
import { firm, markets } from "@/data/content";

/**
 * No backend, and no pretence of one: the form composes a letter and hands it
 * to the visitor's own mail client, addressed to the studio.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const subject = `Enquiry — ${get("kind") || "Project"} — ${
      get("name") || "New enquiry"
    }`;

    const body = [
      `Name: ${get("name")}`,
      `Organisation: ${get("organisation") || "—"}`,
      `Email: ${get("email")}`,
      `Telephone: ${get("phone") || "—"}`,
      `Project type: ${get("kind")}`,
      `Site / municipality: ${get("site") || "—"}`,
      "",
      "The project:",
      get("message"),
      "",
      "— Sent from architechnika.com",
    ].join("\n");

    window.location.href = `mailto:${firm.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className="c-form" onSubmit={handleSubmit}>
      <div className="c-field">
        <label htmlFor="c-name">Name</label>
        <input id="c-name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="c-field">
        <label htmlFor="c-organisation">Organisation</label>
        <input
          id="c-organisation"
          name="organisation"
          type="text"
          autoComplete="organization"
        />
      </div>

      <div className="c-field">
        <label htmlFor="c-email">Email</label>
        <input
          id="c-email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <div className="c-field">
        <label htmlFor="c-phone">Telephone</label>
        <input id="c-phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      <div className="c-field">
        <label htmlFor="c-kind">Project type</label>
        <select id="c-kind" name="kind" defaultValue={markets[0].name}>
          {markets.map((m) => (
            <option key={m.name} value={m.name}>
              {m.name}
            </option>
          ))}
          <option value="Master plan">Master plan</option>
          <option value="Something else">Something else</option>
        </select>
      </div>

      <div className="c-field">
        <label htmlFor="c-site">Site or municipality</label>
        <input id="c-site" name="site" type="text" />
      </div>

      <div className="c-field">
        <label htmlFor="c-message">The project</label>
        <textarea
          id="c-message"
          name="message"
          rows={6}
          required
          placeholder="Programme, scale, site, schedule — whatever you already know."
        />
      </div>

      <div>
        <button className="c-btn" type="submit">
          Compose the letter
        </button>
        <p
          aria-live="polite"
          className="c-small"
          style={{ marginTop: "1.25rem", maxWidth: "48ch" }}
        >
          {sent
            ? `Your mail programme should now hold a draft addressed to ${firm.email}. Nothing is sent until you send it.`
            : "This opens a letter in your own mail programme, addressed to the studio. We answer."}
        </p>
      </div>
    </form>
  );
}
