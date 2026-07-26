import Reveal from "./Reveal";
import { Leader } from "./Marks";

export interface Person {
  name: string;
  role: string;
  credentials: string;
  bio: string;
}

export const INITIALS: Record<string, string> = {
  "Andrés Otero Sr.": "AOS",
  "Andrés Otero Jr.": "AOJ",
  "Luis I. Tua": "LIT",
};

export const ROLE_ES: Record<string, string> = {
  "The Founder": "El Fundador",
  "The Innovator": "El Innovador",
  "The Technician": "El Técnico",
};

export const SINCE: Record<string, string> = {
  AOS: "1980",
  AOJ: "2009",
  LIT: "1980",
};

/**
 * No portraits exist in the record, so none are invented. Personnel are
 * identified the way they are identified on a sheet: by their initials in the
 * DRAWN BY cell.
 */
export default function PersonnelBlock({
  person,
  sheet,
  delay,
  bio = false,
}: {
  person: Person;
  sheet: string;
  delay?: 1 | 2 | 3;
  bio?: boolean;
}) {
  const initials = INITIALS[person.name] ?? person.name.slice(0, 3).toUpperCase();

  return (
    <Reveal className="hoja-panel" delay={delay}>
      <div className="hoja-panel__head hoja-tick">
        <span>{sheet} · Personal / Personnel</span>
        <span>Dibujado por / Drawn by: {initials}</span>
      </div>

      <div className="hoja-hatchfield" style={{ padding: "1.4rem 0.85rem 1rem" }}>
        <p className="hoja-person__initials">{initials}</p>
      </div>

      <div className="hoja-panel__body" style={{ borderTop: "1px solid var(--graphite)" }}>
        <h3 className="hoja-h3">{person.name}</h3>
        <p className="hoja-mono hoja-red" style={{ margin: "0.4rem 0 0" }}>
          {(ROLE_ES[person.role] ?? person.role).toUpperCase()} /{" "}
          {person.role.toUpperCase()}
        </p>
        <p
          className="hoja-mono hoja-dim-text"
          style={{ margin: "0.55rem 0 0", letterSpacing: "0.04em" }}
        >
          {person.credentials}
        </p>

        <p
          className="hoja-mono"
          style={{
            margin: "0.9rem 0 0",
            paddingTop: "0.7rem",
            borderTop: "1px solid var(--grid-major)",
          }}
        >
          <Leader left="En la práctica desde" right={SINCE[initials] ?? "—"} />
        </p>

        {bio ? (
          <p className="hoja-body" style={{ marginTop: "1rem" }}>
            {person.bio}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
