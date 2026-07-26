import type { ReactNode } from "react";
import { Bubble } from "./Marks";
import Reveal from "./Reveal";

interface SectionProps {
  /** circled grid letter across the top of the section: Ⓐ Ⓑ Ⓒ … */
  letter?: string;
  /** circled numeral down the left edge of the sheet */
  num?: number;
  title?: string;
  /** mono note, set flush right of the title */
  note?: ReactNode;
  id?: string;
  alt?: boolean;
  flush?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Section({
  letter,
  num,
  title,
  note,
  id,
  alt = false,
  flush = false,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`hoja-section${alt ? " hoja-section--alt" : ""}${
        flush ? " hoja-section--flush" : ""
      } ${className}`}
      aria-labelledby={title && id ? `${id}-t` : undefined}
    >
      {num !== undefined ? (
        <div className="hoja-section__rail" aria-hidden="true">
          <Bubble>{num}</Bubble>
        </div>
      ) : null}

      <div className="hoja-wrap">
        {title ? (
          <Reveal className="hoja-section__head">
            {letter ? <Bubble>{letter}</Bubble> : null}
            <div className="hoja-section__titles">
              <h2 className="hoja-h2" id={id ? `${id}-t` : undefined}>
                {title}
              </h2>
            </div>
            {note ? (
              <div className="hoja-section__note hoja-mono">{note}</div>
            ) : null}
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
