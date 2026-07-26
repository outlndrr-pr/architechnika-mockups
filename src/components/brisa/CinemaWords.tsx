"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface WordLine {
  text: string;
  /** Spanish is set in Instrument Serif italic, whatever the size. */
  spanish?: boolean;
  /** Break after this line. */
  br?: boolean;
}

interface Props {
  lines: WordLine[];
  className?: string;
  /** ms between words */
  stagger?: number;
  /** ms before the first word */
  offset?: number;
  as?: "h1" | "h2" | "p" | "div";
}

/**
 * The cinema entrance: each WORD rises out of a 12px blur. Words, not
 * characters — characters read as a gimmick, words read as breath.
 */
export default function CinemaWords({
  lines,
  className,
  stagger = 90,
  offset = 120,
  as = "h1",
}: Props) {
  const Tag = as as React.ElementType;
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
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let i = 0;
  const out: ReactNode[] = [];

  lines.forEach((line, li) => {
    const words = line.text.split(" ").filter(Boolean);
    words.forEach((word, wi) => {
      const delay = offset + i * stagger;
      i += 1;
      out.push(
        <span
          key={`${li}-${wi}`}
          className={line.spanish ? "b-word es" : "b-word"}
          style={{ "--wd": `${delay}ms` } as React.CSSProperties}
        >
          <span>{word}</span>
          {wi < words.length - 1 ? " " : null}
        </span>
      );
    });
    if (line.br && li < lines.length - 1) {
      out.push(<br key={`br-${li}`} />);
    } else if (li < lines.length - 1) {
      out.push(<span key={`sp-${li}`} className="b-word">{" "}</span>);
    }
  });

  return (
    <Tag ref={ref} className={className} data-in={shown ? "true" : "false"}>
      <span className="b-words" data-in={shown ? "true" : "false"}>
        {out}
      </span>
    </Tag>
  );
}
