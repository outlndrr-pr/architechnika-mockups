"use client";

import {
  createElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { useInView } from "./useInView";

type Tag =
  | "div"
  | "section"
  | "article"
  | "figure"
  | "li"
  | "ul"
  | "dl"
  | "header"
  | "footer"
  | "p"
  | "aside";

interface RevealProps {
  children?: ReactNode;
  /** Element to render. Keeps the document semantic. */
  as?: Tag;
  className?: string;
  style?: CSSProperties;
  /** Stagger the direct children (70ms, capped at five) instead of the box. */
  group?: boolean;
  id?: string;
}

/** opacity 0→1 with an 18px rise, 900ms. Nothing else moves. */
export default function Reveal({
  children,
  as = "div",
  className,
  style,
  group = false,
  id,
}: RevealProps) {
  const [ref, shown] = useInView<HTMLElement>();

  const cls = [
    group ? "c-reveal-group" : "c-reveal",
    shown ? "is-in" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(
    as,
    { ref, className: cls, style, id } as HTMLAttributes<HTMLElement> & {
      ref: typeof ref;
      id?: string;
    },
    children
  );
}
