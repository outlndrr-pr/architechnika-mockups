import type { Metadata } from "next";
import Section from "@/components/hoja/Section";
import Frame from "@/components/hoja/Frame";
import Reveal from "@/components/hoja/Reveal";
import SheetSchedule, {
  type SchedRow,
} from "@/components/hoja/SheetSchedule";
import { TypeIn } from "@/components/hoja/Marks";
import {
  LAYERS,
  isRevised,
  layersOf,
  parseLoc,
  sheetNo,
  sheetSet,
  sizeLine,
  statusOf,
} from "@/components/hoja/sheets";

export const metadata: Metadata = {
  title: "A-200 WORK — Sheet schedule · ArchiTechnika, Inc.",
  description:
    "The sheet schedule: every published project by sheet number, typology, municipality, year, size and status. Filter it the way you would freeze a CAD layer.",
};

export default function PortfolioSheet() {
  const rows: SchedRow[] = sheetSet.map((p) => {
    const status = statusOf(p);
    const loc = parseLoc(p.location);
    return {
      slug: p.slug,
      sheet: sheetNo(p.slug),
      title: p.title,
      layers: layersOf(p),
      type: layersOf(p).join(" / ").toUpperCase() || "—",
      muni: `${loc.name.split(",")[0].toUpperCase()}${
        loc.region ? `, ${loc.region}` : ""
      }`,
      year: p.year ?? "N.D.",
      size: sizeLine(p),
      status: status.text,
      statusKind: status.kind,
    };
  });

  const present = LAYERS.filter((l) =>
    sheetSet.some((p) => layersOf(p).includes(l))
  );

  const thumbs = sheetSet.map((p) => ({
    slug: p.slug,
    node: (
      <Frame
        file={p.images[0]}
        alt={`${p.title} — ${p.location ?? "Puerto Rico"}`}
        sheet={sheetNo(p.slug)}
        title={p.title}
        date={p.year}
        kind="thumb"
        ratio="4 / 3"
        quality={60}
        sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
        revision={isRevised(p) ? 4 : undefined}
        stamp={
          statusOf(p).kind === "proposal" ? "NOT FOR CONSTRUCTION" : undefined
        }
      />
    ),
  }));

  return (
    <Section
      flush
      num={1}
      id="schedule"
      letter="A"
      title="Índice de hojas / Sheet schedule"
      note={
        <>
          A-200 · {String(sheetSet.length).padStart(2, "0")} HOJAS PUBLICADAS
        </>
      }
    >
      <Reveal style={{ marginBottom: "clamp(1.5rem,3vw,2.5rem)" }}>
        <p className="hoja-h3" style={{ maxWidth: "34ch" }}>
          Fifteen sheets are published. Three hundred were drawn.
        </p>
        <p className="hoja-body" style={{ marginTop: ".9rem" }}>
          What follows is a schedule, not a gallery: the same columns a
          contractor reads before opening a single drawing. Freeze a typology
          layer and the rows fade out and collapse, exactly as they would in the
          model.
        </p>
        <TypeIn
          text="FILTROS = CAPAS CAD · [×] ACTIVA · ISO AÍSLA · SHOW ALL LAYERS RESTAURA"
          className="hoja-mono hoja-dim-text"
        />
      </Reveal>

      <SheetSchedule rows={rows} layers={[...present]} thumbs={thumbs} />
    </Section>
  );
}
