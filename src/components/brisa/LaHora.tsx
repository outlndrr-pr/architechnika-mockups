"use client";

import { useEffect, useState } from "react";
import { readHora } from "./time";

/**
 * The site is somewhere, and it is not where you are.
 * Rendered on the server with San Juan's real hour, then re-read on mount and
 * every minute after. No layout shift: the string is the same width class in
 * both passes.
 */
export default function LaHora({ className }: { className?: string }) {
  const [hora, setHora] = useState(() => readHora());

  useEffect(() => {
    setHora(readHora());
    const id = window.setInterval(() => setHora(readHora()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={className ? `b-hora ${className}` : "b-hora"}>
      <time suppressHydrationWarning>{hora.clock} AST</time>
      <span aria-hidden="true">·</span>
      <span className="b-hora-moment" suppressHydrationWarning>
        {hora.moment}
      </span>
    </p>
  );
}
