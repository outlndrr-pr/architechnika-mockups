"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger, in ms. */
  delay?: number;
  className?: string;
  as?: ElementType;
  /** Reveal once and never re-hide. */
  id?: string;
}

/**
 * Everything drifts; nothing snaps. Opacity + a 48px rise + a 6px blur that
 * clears — the blur is what makes it read as atmosphere rather than a slide.
 * IntersectionObserver only: no scroll listeners anywhere in this direction.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  id,
}: RevealProps) {
  const Tag = as as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className ? `b-reveal ${className}` : "b-reveal"}
      data-in={shown ? "true" : "false"}
      style={delay ? ({ "--rd": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
