import type { Metadata } from "next";
import { Fraunces, Inter_Tight, Newsreader } from "next/font/google";
import Nav from "@/components/cantera/Nav";
import Colophon from "@/components/cantera/Colophon";
import StyleSwitcher from "@/components/StyleSwitcher";
import "./cantera.css";

/* Display: Fraunces, loaded variable so the optical-size axis is available.
   Weights are held at 300/400 and opsz is set per role in cantera.css —
   144 for display, 72 for titles, 48/36/24 for smaller settings — with
   SOFT and WONK pinned to 0. */
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  variable: "--cantera-fraunces",
});

/* Text: Newsreader, 300/400 plus italic for captions, pull quotes, colophon. */
const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--cantera-newsreader",
});

/* Utility: Inter Tight, uppercase and tracked. Never a sentence. */
const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--cantera-inter-tight",
});

export const metadata: Metadata = {
  title: {
    default:
      "ArchiTechnika — Architecture with purpose. Built to endure.",
    template: "%s — ArchiTechnika",
  },
  description:
    "A monograph of ArchiTechnika, Inc. — architects in San Juan, Puerto Rico since 1980. Hotels, hospitals, coliseums and houses across Puerto Rico, the United States and the U.S. Virgin Islands.",
};

export default function CanteraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`cantera ${fraunces.variable} ${newsreader.variable} ${interTight.variable}`}
    >
      <Nav />
      <main className="c-main">{children}</main>
      <Colophon />
      <StyleSwitcher />
    </div>
  );
}
