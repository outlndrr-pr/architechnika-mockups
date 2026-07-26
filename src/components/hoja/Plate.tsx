import Link from "next/link";
import type { Project } from "@/data/content";
import Frame from "./Frame";
import Spec from "./Spec";
import Reveal from "./Reveal";
import { Arrow, DimString } from "./Marks";
import {
  deliveryLine,
  isRevised,
  locCode,
  primaryDim,
  sheetNo,
  statusOf,
} from "./sheets";

/**
 * A dimensioned plate: framed photograph, dimension string, spec block.
 * The revision cloud appears only on work verified as built and operating.
 */
export default function Plate({
  project,
  dim,
  flip = false,
  preload = false,
}: {
  project: Project;
  /** override the dimension string label */
  dim?: string;
  flip?: boolean;
  preload?: boolean;
}) {
  const sheet = sheetNo(project.slug);
  const status = statusOf(project);
  const built = isRevised(project);

  return (
    <article className={`hoja-split ${flip ? "hoja-split--5-7" : "hoja-split--7-5"}`}>
      <div style={{ order: flip ? 2 : 1 }}>
        <Link href={`/hoja/portfolio/${project.slug}`} className="hoja-framelink">
          <Frame
            file={project.images[0]}
            alt={`${project.title} — ${project.location ?? "Puerto Rico"}`}
            sheet={`${sheet}.01`}
            title={project.title}
            date={project.year}
            ratio="16 / 10"
            sizes="(max-width: 900px) 100vw, 58vw"
            quality={75}
            preload={preload}
            revision={built ? 4 : undefined}
            stamp={
              status.kind === "proposal" ? "NOT FOR CONSTRUCTION" : undefined
            }
          />
        </Link>
        <DimString
          label={dim ?? primaryDim(project)}
          className="hoja-plate__dim"
        />
      </div>

      <Reveal style={{ order: flip ? 1 : 2 }} delay={1}>
        <p className="hoja-mono hoja-dim-text" style={{ margin: 0 }}>
          {sheet} · {locCode(project.location)}
        </p>
        <h3 className="hoja-h2" style={{ marginTop: ".5rem" }}>
          {project.title}
        </h3>
        <p className="hoja-body" style={{ marginTop: ".9rem" }}>
          {project.description}
        </p>

        <Spec
          className="hoja-plate__spec"
          rows={[
            {
              es: "Tipo",
              en: "Type",
              v: (project.markets ?? []).join(" / ").toUpperCase() || "—",
            },
            { es: "Año", en: "Year", v: project.year ?? "N.D." },
            { es: "Cliente", en: "Client", v: project.client ?? "—" },
            {
              es: "Entrega",
              en: "Delivery",
              v: deliveryLine(project),
            },
            {
              es: "Estado",
              en: "Status",
              v: status.text,
              tone: status.kind === "proposal" ? "red" : undefined,
            },
          ]}
        />

        <p style={{ marginTop: "1.25rem" }}>
          <Link
            href={`/hoja/portfolio/${project.slug}`}
            className="hoja-btn"
          >
            Open sheet {sheet} <Arrow dir="next" />
          </Link>
        </p>
      </Reveal>
    </article>
  );
}
