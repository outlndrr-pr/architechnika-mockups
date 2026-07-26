"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

interface RevealProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  id?: string;
  /** 0–4, staggers the fade by 90ms increments */
  delay?: 1 | 2 | 3 | 4;
  threshold?: number;
  rootMargin?: string;
  children?: ReactNode;
}

/**
 * The plotter head. Adds data-in="true" the first time an element enters the
 * viewport; every plot-in animation in hoja.css hangs off that attribute, and
 * every one of them is disabled under prefers-reduced-motion.
 */
export default function Reveal({
  as,
  className,
  style,
  id,
  delay,
  threshold = 0.12,
  rootMargin = "0px 0px -6% 0px",
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || drawn) return;
    if (typeof IntersectionObserver === "undefined") {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [drawn, threshold, rootMargin]);

  const El = (as ?? "div") as ElementType;

  return (
    <El
      ref={ref}
      id={id}
      className={className ? `hoja-reveal ${className}` : "hoja-reveal"}
      style={style}
      data-in={drawn ? "true" : "false"}
      data-delay={delay}
    >
      {children}
    </El>
  );
}
