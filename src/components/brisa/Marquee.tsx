import { municipalities } from "@/data/content";

function Run({ hidden }: { hidden?: boolean }) {
  return (
    <div className="b-marquee-run" aria-hidden={hidden || undefined}>
      {municipalities.map((m) => (
        <span className="b-marquee-item" key={m}>
          {m}
          <span className="b-diamond" aria-hidden="true">
            {" ◆ "}
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * The Trade Wind marquee — every municipality the firm has built in, drifting
 * right to left at the speed of the wind that named this direction. ~70s a
 * cycle. Pauses on hover. Under prefers-reduced-motion it becomes a static
 * wrapped list and nothing is lost.
 */
export default function Marquee() {
  return (
    <>
      <div className="b-marquee">
        <div className="b-marquee-track">
          <Run />
          <Run hidden />
        </div>
        <div className="b-marquee-static">
          <p>
            {municipalities.map((m, i) => (
              <span className="b-marquee-item" key={m}>
                {m}
                {i < municipalities.length - 1 ? (
                  <span className="b-diamond" aria-hidden="true">
                    {" ◆ "}
                  </span>
                ) : null}
              </span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
