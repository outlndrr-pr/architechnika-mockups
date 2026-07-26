import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { img, projectBySlug, projects } from "@/data/content";
import Plate from "@/components/cantera/Plate";
import Rail from "@/components/cantera/Rail";
import Reveal from "@/components/cantera/Reveal";
import {
  alt,
  municipality,
  neighbours,
  place,
  plate as plateNo,
  services,
  title as projectTitle,
  typologies,
  typology,
} from "@/components/cantera/lib";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Not found" };
  return {
    title: projectTitle(project),
    description: project.description,
  };
}

/* Plates alternate width down the page so the eye is never given the same
   measure twice: full, two thirds hung left, three quarters hung right. */
const WIDTHS = ["c-figure--w1", "c-figure--w2", "c-figure--w3"] as const;
const RATIOS = ["3 / 2", "4 / 5", "16 / 9", "5 / 4"] as const;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = neighbours(slug);
  const rest = project.images.slice(1);

  const facts: { key: string; value: string }[] = [
    { key: "Client", value: project.client ?? "—" },
    { key: "Location", value: place(project.location) },
    { key: "Year", value: project.year ?? "—" },
    { key: "Scale", value: project.size.join(" · ") || "—" },
    { key: "Typology", value: typologies(project) },
    { key: "Services", value: services(project).join(" · ") || "—" },
  ];
  if (project.status) facts.push({ key: "Status", value: project.status });

  return (
    <article>
      {/* arrival plate, full bleed */}
      <Plate
        src={img(project.images[0])}
        alt={alt(project, 0)}
        ratio="16 / 8"
        ratioSmall="4 / 3"
        sizes="100vw"
        quality={90}
        preload
      />

      <section
        className="c-section"
        style={{ paddingBottom: "clamp(4rem, 8vw, 8rem)" }}
      >
        <div className="c-shell c-grid c-annot">
          <Reveal className="col-2-8">
            <p className="c-meta c-meta--soft">
              {typology(project)} · {municipality(project.location)} ·{" "}
              {project.year}
            </p>
            <h1 className="c-title" style={{ marginTop: "clamp(1.25rem, 2.5vw, 2rem)" }}>
              {projectTitle(project)}
            </h1>
            <p
              className="c-lead c-lead--wide"
              style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}
            >
              {project.description}
            </p>
            {project.note ? (
              <p
                className="c-body c-ital"
                style={{ marginTop: "2rem", color: "var(--ink-soft)" }}
              >
                {project.note}
              </p>
            ) : null}
          </Reveal>

          <div className="col-9-12">
            <dl className="c-facts">
              {facts.map((f) => (
                <div className="c-facts__row" key={f.key}>
                  <dt>{f.key}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* the plates */}
      {rest.length > 0 ? (
        <section
          className="c-shell"
          style={{ paddingBottom: "var(--section)" }}
          aria-label={`${projectTitle(project)} — plates`}
        >
          <div className="c-plates">
            {rest.map((file, i) => (
              <Plate
                key={file}
                src={img(file)}
                alt={alt(project, i + 1)}
                ratio={RATIOS[i % RATIOS.length]}
                ratioSmall="4 / 3"
                sizes="(min-width: 62rem) 70vw, 92vw"
                figureClassName={WIDTHS[i % WIDTHS.length]}
                caption={`Plate ${plateNo(i + 2)} · ${projectTitle(
                  project
                )}, ${municipality(project.location)}.`}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* prev / next */}
      <section className="c-shell" style={{ paddingBottom: "var(--section)" }}>
        <div className="c-grid">
          <div className="col-2-12">
            <p className="c-meta c-meta--soft" style={{ marginBottom: "2rem" }}>
              Elsewhere in the index
            </p>
            <div className="c-pagination">
              {prev ? (
                <Link
                  href={`/cantera/portfolio/${prev.slug}`}
                  className="c-pagination__item"
                  rel="prev"
                >
                  <span className="c-meta c-meta--soft">Previous</span>
                  <span
                    className="c-title c-title--light"
                    style={{ display: "block", marginTop: "0.75rem" }}
                  >
                    {projectTitle(prev)}
                  </span>
                </Link>
              ) : null}
              {next ? (
                <Link
                  href={`/cantera/portfolio/${next.slug}`}
                  className="c-pagination__item c-pagination__item--next"
                  rel="next"
                >
                  <span className="c-meta c-meta--soft">Next</span>
                  <span
                    className="c-title c-title--light"
                    style={{ display: "block", marginTop: "0.75rem" }}
                  >
                    {projectTitle(next)}
                  </span>
                </Link>
              ) : null}
            </div>
            <Link
              href="/cantera/portfolio"
              className="c-standing-link"
              style={{ marginTop: "clamp(2.5rem, 4vw, 3.5rem)" }}
            >
              ← All projects
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
