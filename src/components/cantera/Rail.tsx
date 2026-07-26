import type { ReactNode } from "react";

export interface RailItem {
  key: string;
  value: ReactNode;
}

/**
 * The marginalia rail — columns 9 to 12, baseline-aligned to the paragraph it
 * annotates. It is a description list, because that is what marginalia is.
 * Below the editorial breakpoint it becomes a footnote block under its
 * paragraph, which is what a margin does when there is no margin.
 */
export default function Rail({
  items,
  className,
}: {
  items: RailItem[];
  className?: string;
}) {
  return (
    <dl className={["c-rail", className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <div className="c-rail__item" key={item.key}>
          <dt className="c-rail__key">{item.key}</dt>
          <dd className="c-rail__val">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
