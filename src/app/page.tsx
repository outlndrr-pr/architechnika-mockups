import Link from "next/link";
import Image from "next/image";
import { img } from "@/data/content";

const DIRECTIONS = [
  {
    id: "cantera",
    num: "01",
    name: "Cantera",
    line: "A quiet-luxury monograph. Ink on bone, one terracotta accent, the restraint of a firm that has already proved itself.",
    img: img("69e2f5d6_Picture1.jpg"),
  },
  {
    id: "hoja",
    num: "02",
    name: "Hoja 01",
    line: "The website as a drawing set. Visible grids, title blocks, dimension strings — forty-five years of technical rigor as the interface.",
    img: img("b9ac8a0f_Picture3.jpg"),
  },
  {
    id: "brisa",
    num: "03",
    name: "Brisa",
    line: "Caribbean modernism as a light problem. Warm darkness, golden-hour photography, and a site that knows what time it is in San Juan.",
    img: img("6bc24b01_HIBIRD-ASHFORD_9.jpg"),
  },
];

export default function Home() {
  return (
    <main className="min-h-dvh bg-[#0E0E10] text-white flex flex-col">
      <header className="px-6 pt-10 pb-6 md:px-12 md:pt-14">
        <p className="text-[11px] tracking-[0.28em] uppercase text-white/50">
          Architechnika · San Juan, Puerto Rico · Est. 1980
        </p>
        <h1 className="mt-3 text-3xl md:text-5xl font-light tracking-tight">
          Three directions, one firm.
        </h1>
        <p className="mt-3 max-w-xl text-sm md:text-base text-white/60 leading-relaxed">
          Three complete website mockups for Architechnika. Open any direction —
          a floating switcher lets you jump between them from any page.
        </p>
      </header>

      <div className="flex-1 grid md:grid-cols-3 gap-px bg-white/10 border-t border-white/10">
        {DIRECTIONS.map((d) => (
          <Link
            key={d.id}
            href={`/${d.id}`}
            className="group relative flex flex-col justify-end overflow-hidden bg-[#0E0E10] min-h-[46vh] md:min-h-[70vh]"
          >
            <Image
              src={d.img}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-50 transition-all duration-700 ease-out group-hover:opacity-75 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative p-6 md:p-8">
              <p className="text-[11px] tracking-[0.3em] text-white/60">
                {d.num}
              </p>
              <h2 className="mt-1 text-2xl md:text-3xl font-light">{d.name}</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-white/65 max-w-xs">
                {d.line}
              </p>
              <p className="mt-4 text-[12px] tracking-[0.18em] uppercase text-white/80 group-hover:text-white transition-colors">
                Enter →
              </p>
            </div>
          </Link>
        ))}
      </div>

      <footer className="px-6 py-4 md:px-12 text-[11px] text-white/35 flex justify-between">
        <span>Prepared for review · 2026</span>
        <span>Cantera · Hoja · Brisa</span>
      </footer>
    </main>
  );
}
