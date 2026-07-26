"use client";

import { useEffect, useState } from "react";

/** The footer scale bar is calibrated to CSS pixels. This states the sheet. */
export default function ViewportReadout() {
  const [size, setSize] = useState<string>("————— × ————— PX");

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setSize(`${window.innerWidth} × ${window.innerHeight} PX`);
    };
    const onResize = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <span>{size}</span>;
}
