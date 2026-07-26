"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * The one motion primitive: IntersectionObserver, fires once, rootMargin -12%
 * at the foot of the viewport so nothing reveals while it is still under the
 * fold. Threshold is .15 as specified — except for blocks taller than the
 * viewport, where a fraction-of-target threshold can never be satisfied early
 * enough and any first pixel is taken as arrival instead.
 * Anything already scrolled past on mount is treated as present, so no element
 * can be stranded invisible.
 */
export function useInView<T extends HTMLElement>(): [
  RefObject<T | null>,
  boolean
] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const tall = el.getBoundingClientRect().height > window.innerHeight * 0.7;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold: tall ? 0 : 0.15, rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, inView];
}
