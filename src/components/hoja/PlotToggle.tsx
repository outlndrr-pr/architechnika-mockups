"use client";

import { useEffect, useState } from "react";

type Plot = "paper" | "screen";

/** PLOT: PAPER / SCREEN — the same set, plotted on two media. */
export default function PlotToggle() {
  const [plot, setPlot] = useState<Plot>("paper");

  useEffect(() => {
    const current = document
      .querySelector(".hoja")
      ?.getAttribute("data-hoja-plot");
    if (current === "screen" || current === "paper") setPlot(current);
  }, []);

  function set(next: Plot) {
    setPlot(next);
    document.querySelector(".hoja")?.setAttribute("data-hoja-plot", next);
    try {
      localStorage.setItem("hoja-plot", next);
    } catch {
      /* the drawing still plots without a preference on file */
    }
  }

  return (
    <button
      type="button"
      className="hoja-plot-toggle hoja-mono"
      onClick={() => set(plot === "paper" ? "screen" : "paper")}
      aria-label={`Plot medium: ${plot}. Switch to ${
        plot === "paper" ? "screen" : "paper"
      }.`}
    >
      <span className="hoja-plot-toggle__swatch" aria-hidden="true" />
      <span aria-hidden="true">PLOT: {plot.toUpperCase()}</span>
    </button>
  );
}
