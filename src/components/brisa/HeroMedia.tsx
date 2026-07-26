"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { isNight, prHour } from "./time";

interface Props {
  nightSrc: string;
  nightAlt: string;
  daySrc: string;
  dayAlt: string;
  /** Decided on the server from real San Juan time, so first paint is right. */
  initialNight: boolean;
}

/**
 * The hero crossfades between night and day photography of the firm's own
 * buildings according to the actual hour in Puerto Rico. Both layers are
 * absolutely positioned and only opacity changes — nothing can shift.
 */
export default function HeroMedia({
  nightSrc,
  nightAlt,
  daySrc,
  dayAlt,
  initialNight,
}: Props) {
  const [night, setNight] = useState(initialNight);

  useEffect(() => {
    const sync = () => setNight(isNight(prHour()));
    sync();
    const id = window.setInterval(sync, 300_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="b-hero-media">
      <div
        className="b-hero-layer"
        data-active={night ? "true" : "false"}
        aria-hidden={!night}
      >
        <Image
          src={nightSrc}
          alt={nightAlt}
          fill
          priority={initialNight}
          quality={90}
          sizes="100vw"
        />
      </div>
      <div
        className="b-hero-layer"
        data-active={night ? "false" : "true"}
        aria-hidden={night}
      >
        <Image
          src={daySrc}
          alt={dayAlt}
          fill
          priority={!initialNight}
          quality={90}
          sizes="100vw"
        />
      </div>
      <div className="b-goldenhour" />
    </div>
  );
}
