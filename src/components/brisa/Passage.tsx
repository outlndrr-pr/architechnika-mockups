import Image from "next/image";
import Link from "next/link";
import { img, type Project } from "@/data/content";
import { altFor, passageMeta } from "./project";

/**
 * The Passage — full-viewport project panels. Each name is set in cinema type
 * and pinned with position: sticky while its photograph scrolls beneath it;
 * the next panel's arrival releases it. Chapter cards in a film.
 * Native scroll only. Nothing is jacked.
 */
export default function Passage({ projects }: { projects: Project[] }) {
  return (
    <section className="b-passage" aria-label="Selected work">
      {projects.map((p, i) => (
        <article className="b-panel" key={p.slug}>
          <div className="b-panel-media">
            <Image
              src={img(p.images[0])}
              alt={altFor(p)}
              fill
              quality={75}
              sizes="100vw"
            />
            <div className="b-panel-veil" />
          </div>

          <div className="b-panel-caption">
            <p className="b-panel-index b-label">
              {String(i + 1).padStart(2, "0")} — Selected work
            </p>
            <h3 className="b-cinema b-panel-title">
              <Link href={`/brisa/portfolio/${p.slug}`}>{p.title}</Link>
            </h3>
            <p className="b-panel-meta">{passageMeta(p)}</p>
            <Link
              href={`/brisa/portfolio/${p.slug}`}
              className="b-panel-more b-label b-underline"
            >
              Walk through it →
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
