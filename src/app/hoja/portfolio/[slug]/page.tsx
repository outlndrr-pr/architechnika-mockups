import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectBySlug } from "@/data/content";
import Section from "@/components/hoja/Section";
import Frame from "@/components/hoja/Frame";
import Reveal from "@/components/hoja/Reveal";
import Spec from "@/components/hoja/Spec";
import { Arrow, DimString, TypeIn } from "@/components/hoja/Marks";
import {
  deliveryLine,
  isRevised,
  layersOf,
  locCode,
  primaryDim,
  servicesOf,
  sheetIndex,
  sheetNo,
  sheetSet,
  statusOf,
} from "@/components/hoja/sheets";

export function generateStaticParams() {
  return sheetSet.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Sheet not in set — ArchiTechnika, Inc." };
  return {
    title: `${sheetNo(project.slug)} ${project.title} — ArchiTechnika, Inc.`,
    description: project.description,
  };
}

const SUBSHEETS = [
  { n: "01", es: "Descripción", en: "Description", id: "description" },
  { n: "02", es: "Especificaciones", en: "Specifications", id: "specs" },
  { n: "03", es: "Cantidades", en: "Quantities", id: "quantities" },
  { n: "04", es: "Fotografías", en: "Photographs", id: "photographs" },
];

export default async function ProjectSheet({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const sheet = sheetNo(project.slug);
  const i = sheetIndex(project.slug);
  const prev = sheetSet[(i - 1 + sheetSet.length) % sheetSet.length];
  const next = sheetSet[(i + 1) % sheetSet.length];
  const status = statusOf(project);
  const built = isRevised(project);
  const [hero, ...rest] = project.images;

  return (
    <Section flush num={1} id="sheet-head">
      {/* ── sheet header ─────────────────────────────────────────────────── */}
      <Reveal>
        <p className="hoja-mono hoja-dim-text" style={{ margin: 0 }}>
          <Link href="/hoja/portfolio" className="hoja-link">
            A-200 SHEET SCHEDULE
          </Link>{" "}
          / {sheet}
        </p>
        <h1 className="hoja-display" style={{ marginTop: ".65rem" }}>
          {project.title}
        </h1>
      </Reveal>

      <DimString label={primaryDim(project)} className="hoja-hero__dim" />

      <TypeIn
        text={`LOC: ${locCode(project.location)} · AÑO ${
          project.year ?? "N.D."
        } · ESTADO / STATUS: ${status.text}`}
        className="hoja-mono hoja-dim-text"
      />

      <div style={{ marginTop: "clamp(1.5rem,3vw,2.5rem)" }}>
        <Frame
          file={hero}
          alt={`${project.title}, ${project.location ?? "Puerto Rico"}`}
          sheet={`${sheet}.01`}
          title={project.title}
          date={project.year}
          ratio="16 / 9"
          sizes="100vw"
          quality={90}
          preload
          revision={built ? 4 : undefined}
          stamp={status.kind === "proposal" ? "NOT FOR CONSTRUCTION" : undefined}
        />
      </div>

      {/* ── the set ──────────────────────────────────────────────────────── */}
      <div
        className="hoja-split hoja-split--8-4"
        style={{ marginTop: "clamp(2.5rem,5vw,4rem)" }}
      >
        <div className="hoja-flow">
          <div id="description">
            <h2 className="hoja-h2">{sheet}.01 Descripción</h2>
            <p className="hoja-body" style={{ marginTop: "1rem" }}>
              {project.description}
            </p>
            {project.note ? (
              <div className="hoja-panel" style={{ marginTop: "1.5rem" }}>
                <div className="hoja-panel__head hoja-tick">
                  <span>Notas generales / General notes</span>
                  <span>VERIFICADO / VERIFIED</span>
                </div>
                <div className="hoja-panel__body">
                  <p className="hoja-body" style={{ margin: 0 }}>
                    {project.note}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <div id="specs">
            <h2 className="hoja-h2">{sheet}.02 Especificaciones</h2>
            <Spec
              className="hoja-plate__spec"
              rows={[
                {
                  es: "Tipo",
                  en: "Type",
                  v: layersOf(project).join(" / ").toUpperCase() || "—",
                },
                {
                  es: "Localización",
                  en: "Location",
                  v: locCode(project.location),
                },
                { es: "Año", en: "Year", v: project.year ?? "N.D." },
                { es: "Cliente", en: "Client", v: project.client ?? "—" },
                { es: "Entrega", en: "Delivery", v: deliveryLine(project) },
                {
                  es: "Estado",
                  en: "Status",
                  v: status.text,
                  tone:
                    status.kind === "proposal"
                      ? "red"
                      : status.kind === "unrecorded"
                        ? "muted"
                        : undefined,
                },
                {
                  es: "Revisión",
                  en: "Revision",
                  v: built ? "△4 · AS OPERATING" : "△0 · NO REVISIONS ISSUED",
                  tone: built ? "red" : "muted",
                },
                {
                  es: "Hojas",
                  en: "Sheets",
                  v: `${String(project.images.length).padStart(2, "0")} PHOTOGRAPHIC`,
                },
              ]}
            />
          </div>

          <div id="quantities">
            <h2 className="hoja-h2">{sheet}.03 Cantidades</h2>
            <ol className="hoja-scope hoja-mono" style={{ marginTop: "1rem" }}>
              {(project.size ?? []).map((s, n) => (
                <li key={s}>
                  <span>.{String(n + 1).padStart(2, "0")}</span>
                  <span>{s.toUpperCase()}</span>
                </li>
              ))}
              {servicesOf(project).map((s, n) => (
                <li key={s}>
                  <span>
                    .{String((project.size?.length ?? 0) + n + 1).padStart(2, "0")}
                  </span>
                  <span>{s.toUpperCase()} SERVICES</span>
                </li>
              ))}
              {(project.size ?? []).length === 0 &&
              servicesOf(project).length === 0 ? (
                <li>
                  <span>.01</span>
                  <span>NOT DIMENSIONED IN RECORD</span>
                </li>
              ) : null}
            </ol>
          </div>
        </div>

        {/* ── sheet-number sidebar ───────────────────────────────────────── */}
        <div>
          <Reveal className="hoja-panel hoja-sidebar" delay={1}>
            <div className="hoja-panel__head hoja-tick">
              <span>En esta hoja / On this sheet</span>
              <span>{sheet}</span>
            </div>
            <div className="hoja-panel__body">
              <nav aria-label="Sheet contents">
                {SUBSHEETS.map((s) => (
                  <a
                    key={s.n}
                    href={`#${s.id}`}
                    className="hoja-sidebar__row hoja-mono"
                  >
                    {sheet}.{s.n} &nbsp;{s.es.toUpperCase()} / {s.en.toUpperCase()}
                  </a>
                ))}
              </nav>
              <p
                className="hoja-mono hoja-dim-text"
                style={{ marginTop: "1rem" }}
              >
                DIBUJADO POR / DRAWN BY: LIT
                <br />
                REVISADO POR / CHECKED BY: AOJ
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── photographs ──────────────────────────────────────────────────── */}
      {rest.length ? (
        <div id="photographs" style={{ marginTop: "clamp(2.5rem,5vw,4rem)" }}>
          <h2 className="hoja-h2">{sheet}.04 Fotografías</h2>
          <div className="hoja-gallery" style={{ marginTop: "1.35rem" }}>
            {rest.map((file, n) => (
              <Frame
                key={file}
                file={file}
                alt={`${project.title} — view ${n + 2}`}
                sheet={`${sheet}.04.${String(n + 1).padStart(2, "0")}`}
                title={project.title}
                date={project.year}
                ratio="4 / 3"
                quality={75}
                sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ))}
          </div>
        </div>
      ) : null}

      {/* ── prev / next ──────────────────────────────────────────────────── */}
      <nav className="hoja-prevnext hoja-mono" aria-label="Adjacent sheets">
        <Link href={`/hoja/portfolio/${prev.slug}`} className="hoja-btn">
          <Arrow dir="prev" /> {sheetNo(prev.slug)} {prev.title}
        </Link>
        <Link href="/hoja/portfolio" className="hoja-link">
          A-200 · ALL SHEETS
        </Link>
        <Link href={`/hoja/portfolio/${next.slug}`} className="hoja-btn">
          {sheetNo(next.slug)} {next.title} <Arrow dir="next" />
        </Link>
      </nav>
    </Section>
  );
}
