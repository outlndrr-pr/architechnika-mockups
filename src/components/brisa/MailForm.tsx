"use client";

import { useState, type FormEvent } from "react";
import { firm } from "@/data/content";

/**
 * No backend, no third party: the form composes a mailto: URL and hands the
 * message to the sender's own mail client. Nothing is collected here.
 */
export default function MailForm() {
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = project.trim()
      ? `${project.trim()} — enquiry`
      : "Project enquiry";
    const body = [message.trim(), "", name.trim() && `— ${name.trim()}`]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${firm.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="b-form" onSubmit={onSubmit}>
      <div className="b-field">
        <label htmlFor="b-name">Your name</label>
        <input
          id="b-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="b-field">
        <label htmlFor="b-project">The site, or the building</label>
        <input
          id="b-project"
          name="project"
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </div>

      <div className="b-field">
        <label htmlFor="b-message">What are you trying to do?</label>
        <textarea
          id="b-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <p>
        <button type="submit" className="b-pill">
          Open in mail
        </button>
      </p>
      <p className="b-body b-dim" style={{ fontSize: "0.875rem" }}>
        This opens your own mail app with the message prepared. Nothing is sent
        or stored from this page.
      </p>
    </form>
  );
}
