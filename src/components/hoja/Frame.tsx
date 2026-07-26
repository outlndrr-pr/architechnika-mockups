import Image from "next/image";
import { img } from "@/data/content";
import Reveal from "./Reveal";
import { Delta } from "./Marks";

interface FrameProps {
  /** filename as listed in content.ts */
  file: string;
  alt: string;
  /** sheet number printed in the caption bar, e.g. "A-204.03" */
  sheet: string;
  /** caption title, printed uppercase */
  title: string;
  /** date cell — the project year */
  date?: string | null;
  scale?: string;
  ratio?: string;
  sizes?: string;
  quality?: 60 | 75 | 90;
  kind?: "full" | "thumb";
  /** LCP image only */
  preload?: boolean;
  /** revision cloud + delta tag, for work verified as built */
  revision?: number;
  /** diagonal stamp across the image */
  stamp?: string;
  className?: string;
}

/**
 * No photograph on this site floats free. Each one is plotted inside a frame
 * that draws its own four edges, then carries a title block: sheet number,
 * title, scale, date.
 */
export default function Frame({
  file,
  alt,
  sheet,
  title,
  date,
  scale = "N.T.S.",
  ratio = "4 / 3",
  sizes = "(max-width: 900px) 100vw, 50vw",
  quality = 75,
  kind = "full",
  preload = false,
  revision,
  stamp,
  className = "",
}: FrameProps) {
  return (
    <Reveal
      as="figure"
      className={`hoja-frame${revision ? " hoja-cloud" : ""} ${className}`}
    >
      <span className="hoja-frame__edge hoja-frame__edge--t" aria-hidden="true" />
      <span className="hoja-frame__edge hoja-frame__edge--r" aria-hidden="true" />
      <span className="hoja-frame__edge hoja-frame__edge--b" aria-hidden="true" />
      <span className="hoja-frame__edge hoja-frame__edge--l" aria-hidden="true" />

      {revision ? (
        <Delta
          n={revision}
          label={`Revision ${revision}`}
          className="hoja-delta--tag"
        />
      ) : null}

      <div className="hoja-frame__media" style={{ aspectRatio: ratio }}>
        <Image
          src={img(file, kind)}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          preload={preload || undefined}
        />
        {stamp ? (
          <span className="hoja-frame__stamp hoja-tick">{stamp}</span>
        ) : null}
      </div>

      <figcaption className="hoja-frame__bar hoja-mono">
        <span className="hoja-frame__c hoja-frame__c--n">{sheet}</span>
        <span className="hoja-frame__c hoja-frame__c--t">{title}</span>
        <span className="hoja-frame__c hoja-frame__c--drop">
          ESCALA/SCALE {scale}
        </span>
        <span className="hoja-frame__c">{date ?? "N.D."}</span>
      </figcaption>
    </Reveal>
  );
}
