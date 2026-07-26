"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useInView } from "./useInView";

interface PlateProps {
  src: string;
  alt: string;
  /** Italic caption set beneath the plate. */
  caption?: ReactNode;
  /** Designed crop, e.g. "16 / 7". */
  ratio?: string;
  /** Crop used below 768px, where a wide band would starve the subject. */
  ratioSmall?: string;
  /** object-position, e.g. "50% 42%". */
  position?: string;
  sizes: string;
  quality?: 60 | 75 | 90;
  preload?: boolean;
  className?: string;
  figureClassName?: string;
}

/**
 * Image reveal: clip-path inset(0 0 100% 0) → 0 with the picture easing out of
 * a 1.06 scale beneath it. Never a fade alone — a page turns, it does not
 * dissolve.
 */
export default function Plate({
  src,
  alt,
  caption,
  ratio = "3 / 2",
  ratioSmall,
  position,
  sizes,
  quality = 75,
  preload = false,
  className,
  figureClassName,
}: PlateProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  const style = {
    "--ar": ratio,
    ...(ratioSmall ? { "--ar-sm": ratioSmall } : null),
    ...(position ? { "--pos": position } : null),
  } as CSSProperties;

  return (
    <figure className={["c-figure", figureClassName].filter(Boolean).join(" ")}>
      <div
        ref={ref}
        className={[
          "c-figure__frame",
          inView || preload ? "is-in" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          preload={preload}
          fetchPriority={preload ? "high" : "auto"}
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
