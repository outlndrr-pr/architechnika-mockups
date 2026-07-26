import type { Metadata } from "next";
import { Archivo, DM_Mono } from "next/font/google";
import StyleSwitcher from "@/components/StyleSwitcher";
import Nav from "@/components/hoja/Nav";
import TitleBlock from "@/components/hoja/TitleBlock";
import PlotSweep from "@/components/hoja/PlotSweep";
import Footer from "@/components/hoja/Footer";
import "./hoja.css";

/** Variable — the width axis carries every uppercase display line in the set. */
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-hoja-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-hoja-mono",
});

export const metadata: Metadata = {
  title: "HOJA 01 — ArchiTechnika, Inc. · San Juan, Puerto Rico",
  description:
    "The drawing set. Forty-five years of architecture in Puerto Rico, issued sheet by sheet: 300+ projects, hospitality through healthcare, documented to institutional standard.",
};

/* Sets the plot medium before first paint so the sheet never flashes.
   Stamps the .hoja wrapper (which this layout owns), never <html>. */
const PLOT_BOOT = `try{var w=document.currentScript.parentElement;var p=localStorage.getItem('hoja-plot');w.setAttribute('data-hoja-plot',p==='screen'?'screen':'paper')}catch(e){}`;

export default function HojaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`hoja ${archivo.variable} ${dmMono.variable}`}
      data-hoja-plot="paper"
      suppressHydrationWarning
    >
      <script dangerouslySetInnerHTML={{ __html: PLOT_BOOT }} />
      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".hoja-reveal{opacity:1!important}.hoja-frame__edge{transform:none!important}.hoja-frame__media,.hoja-frame__bar,.hoja-dim__label,.hoja-dim__cap{opacity:1!important}.hoja-dim__line{transform:none!important}.hoja-typein__t{clip-path:none!important}",
          }}
        />
      </noscript>
      <a href="#sheet" className="hoja-skip hoja-mono">
        Saltar a la hoja / Skip to sheet
      </a>
      <div className="hoja-gridlayer" aria-hidden="true" />
      <PlotSweep />
      <Nav />
      <main className="hoja-main" id="sheet">
        {children}
      </main>
      <Footer />
      <TitleBlock />
      <StyleSwitcher />
    </div>
  );
}
