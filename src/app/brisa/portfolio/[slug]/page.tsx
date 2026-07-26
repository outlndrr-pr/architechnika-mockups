import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { img, projects, projectBySlug } from "@/data/content";
import CinemaWords from "@/components/brisa/CinemaWords";
import Reveal from "@/components/brisa/Reveal";
import { Breath, TerraceCrop } from "@/components/brisa/primitives";
import { dims } from "@/components/brisa/imageMeta";
import { essayFor } from "@/components/brisa/essays";
import { altFor, isProposal, services } from "@/components/brisa/project";

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
  if (!project) return { title: "Work" };
  return {
    title: project.title,
    description: project.description.slice(0, 180),
  };
}

const PLATE_CLASS = ["b-plate-mid", "b-plate-narrow", ""];

export default async function BrisaProject({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const essay = essayFor(project.slug);
  const rest = project.images.slice(1);
  // One terrace crop per project — the deep-overhang view, 21/9.
  const terraceIdx = rest.length > 1 ? 1 : rest.length === 1 ? 0 : -1;

  const facts: { key: string; value: React.ReactNode }[] = [];
  if (project.status)
    facts.push({
      key: "Status",
      value: <span className="b-status">{project.status}</span>,
    });
  if (project.year) facts.push({ key: "Year", value: project.year });
  if (project.client) facts.push({ key: "Client", value: project.client });
  if (project.location) facts.push({ key: "Location", value: project.location });
  if (project.size.length)
    facts.push({ key: "Size", value: project.size.join(" · ") });
  const svc = services(project);
  if (svc.length) facts.push({ key: "Services", value: svc.join(" · ") });
  if (project.markets.length)
    facts.push({ key: "Market", value: project.markets.join(" · ") });

  return (
    <>
      {/* Arrival */}
      <section className="b-arrival">
        <Image
          src={img(project.images[0])}
          alt={altFor(project)}
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="b-scrim-soft" />
        <div className="b-wrap b-arrival-body">
          <p className="b-label" style={{ color: "var(--arena)" }}>
            {[project.markets[0], project.location, project.year]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </section>

      {/* The name */}
      <section className="b-wrap b-band" aria-labelledby="brisa-project-title">
        <CinemaWords
          as="h1"
          className="b-cinema"
          lines={[{ text: project.title }]}
        />
        {isProposal(project) ? (
          <Reveal delay={260}>
            <p className="b-label b-sol" style={{ marginTop: "1.5rem" }}>
              {project.status} — not built
            </p>
          </Reveal>
        ) : project.status ? (
          <Reveal delay={260}>
            <p className="b-label b-sol" style={{ marginTop: "1.5rem" }}>
              {project.status}
            </p>
          </Reveal>
        ) : null}

        <div
          className="b-stack-m"
          style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)", maxWidth: "46rem" }}
          id="brisa-project-title"
        >
          {(essay ?? [project.description]).map((para, i) => (
            <Reveal key={i} delay={340 + i * 140}>
              <p className="b-lead">{para}</p>
            </Reveal>
          ))}
          {project.note ? (
            <Reveal delay={620}>
              <p className="b-body b-dim">{project.note}</p>
            </Reveal>
          ) : null}
        </div>
      </section>

      <Breath />

      {/* The sequence */}
      {rest.length ? (
        <section className="b-seq" aria-label={`${project.title} — images`}>
          {rest.map((file, i) => {
            if (i === terraceIdx) {
              return (
                <TerraceCrop
                  key={file}
                  file={file}
                  alt={altFor(project, i + 1)}
                  quality={75}
                  caption={
                    <>
                      <span className="es">Desde la terraza.</span>{" "}
                      {project.location ?? "Puerto Rico"}.
                    </>
                  }
                />
              );
            }
            const { width, height } = dims(file);
            const cls = PLATE_CLASS[i % PLATE_CLASS.length];
            return (
              <Reveal key={file} className="b-plate" as="figure">
                <div className={cls}>
                  <div className="b-plate-frame b-drift">
                    <Image
                      src={img(file)}
                      alt={altFor(project, i + 1)}
                      width={width}
                      height={height}
                      quality={75}
                      sizes={
                        cls === "b-plate-narrow"
                          ? "(max-width: 900px) 92vw, 46rem"
                          : cls === "b-plate-mid"
                            ? "(max-width: 1200px) 92vw, 72rem"
                            : "100vw"
                      }
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </section>
      ) : null}

      <Breath />

      {/* The quiet facts band, at the bottom, where it belongs */}
      <section className="b-wrap b-band-even" aria-labelledby="brisa-facts">
        <p className="b-label b-dim" id="brisa-facts">
          <span className="es">Los datos</span>
        </p>
        <dl className="b-facts" style={{ marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}>
          {facts.map((f) => (
            <div className="b-fact" key={f.key}>
              <dt className="b-fact-key">{f.key}</dt>
              <dd className="b-fact-val">{f.value}</dd>
            </div>
          ))}
        </dl>
        <p className="b-body b-dim" style={{ marginTop: "2rem" }}>
          <Link href="/brisa/portfolio" className="b-underline">
            ← Back to the contact sheet
          </Link>
        </p>
      </section>

      {/* Next */}
      <Link href={`/brisa/portfolio/${next.slug}`} className="b-next">
        <Image
          src={img(next.images[0])}
          alt={altFor(next)}
          fill
          quality={75}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="b-scrim-firm" />
        <div className="b-wrap b-next-body">
          <p className="b-label b-sol">Next</p>
          <p className="b-title" style={{ marginTop: "1rem" }}>
            {next.title}
          </p>
          <p className="b-label" style={{ marginTop: "1rem", color: "var(--arena)" }}>
            {[next.markets[0], next.location].filter(Boolean).join(" · ")}
          </p>
        </div>
      </Link>
    </>
  );
}
