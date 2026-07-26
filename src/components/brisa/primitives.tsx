import Image from "next/image";
import { img } from "@/data/content";
import Reveal from "./Reveal";

/**
 * BREATH — a named primitive. Pure noche, nothing in it. It exists so the
 * heavy bands have somewhere to land.
 */
export function Breath({ alt = false }: { alt?: boolean }) {
  return (
    <div
      className={alt ? "b-breath b-breath-alt" : "b-breath"}
      aria-hidden="true"
    />
  );
}

export function Label({
  children,
  sol = false,
}: {
  children: React.ReactNode;
  sol?: boolean;
}) {
  return (
    <p className={sol ? "b-label b-sol" : "b-label b-dim"}>{children}</p>
  );
}

/**
 * Terrace crop — a view framed by a deep overhang, which is the defining move
 * of Caribbean modernism. Caption hangs in the left margin, in italic.
 */
export function TerraceCrop({
  file,
  alt,
  caption,
  quality = 75,
  drift = true,
}: {
  file: string;
  alt: string;
  caption: React.ReactNode;
  quality?: 60 | 75 | 90;
  drift?: boolean;
}) {
  return (
    <Reveal className="b-terrace" as="figure">
      <div className={drift ? "b-terrace-frame b-drift" : "b-terrace-frame"}>
        <Image
          src={img(file)}
          alt={alt}
          fill
          quality={quality}
          sizes="(max-width: 1100px) 100vw, 80vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <figcaption className="b-terrace-caption">{caption}</figcaption>
    </Reveal>
  );
}
