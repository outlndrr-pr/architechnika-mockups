"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * A 2px plot-red line sweeps the top of the page on every route change — the
 * plotter pen crossing a fresh sheet.
 */
export default function PlotSweep() {
  const pathname = usePathname();
  const [pass, setPass] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setPass((p) => p + 1);
  }, [pathname]);

  if (pass === 0) return null;
  return <span key={pass} className="hoja-sweep" data-run="1" aria-hidden="true" />;
}
