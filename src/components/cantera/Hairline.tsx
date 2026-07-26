"use client";

import { useInView } from "./useInView";

/** A rule that draws itself from the left in 1100ms. The layout is hairlines. */
export default function Hairline({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLHRElement>();
  return (
    <hr
      ref={ref}
      className={["c-hairline", inView ? "is-in" : "", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
