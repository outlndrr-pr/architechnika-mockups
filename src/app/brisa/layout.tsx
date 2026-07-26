import type { Metadata } from "next";
import { Figtree, Instrument_Serif } from "next/font/google";
import StyleSwitcher from "@/components/StyleSwitcher";
import Nav from "@/components/brisa/Nav";
import Footer from "@/components/brisa/Footer";
import { THEME_BOOTSTRAP, BRISA_ROOT_ID } from "@/components/brisa/ThemeToggle";
import "./brisa.css";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-brisa-serif",
});

const sans = Figtree({
  weight: ["300", "400", "500"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-brisa-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Architechnika — Architecture with purpose, built to endure",
    template: "%s — Architechnika",
  },
  description:
    "Forty-four years of architecture on this island and everywhere it reaches. Architechnika, San Juan, Puerto Rico.",
};

export default function BrisaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id={BRISA_ROOT_ID}
      className={`brisa ${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      <div className="b-shell">
        <a href="#brisa-main" className="b-skip">
          Skip to content
        </a>
        <Nav />
        <main id="brisa-main">{children}</main>
        <Footer />
      </div>
      <StyleSwitcher />
    </div>
  );
}
