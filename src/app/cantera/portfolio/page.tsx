import type { Metadata } from "next";
import PortfolioIndex from "@/components/cantera/PortfolioIndex";
import Reveal from "@/components/cantera/Reveal";
import { indexed } from "@/components/cantera/lib";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The ArchiTechnika index — hotels, hospitals, coliseums, housing, schools and industry across Puerto Rico, Nebraska and the U.S. Virgin Islands.",
};

export default function PortfolioPage() {
  return (
    <>
      <section
        className="c-section--half"
        style={{ paddingTop: "clamp(6rem, 13vh, 10rem)" }}
        aria-labelledby="work-index-title"
      >
        <div className="c-shell c-grid c-annot">
          <div className="col-2-9">
            <p className="c-meta c-meta--soft">
              The index · {indexed.length} plates
            </p>
            <h1
              className="c-display"
              id="work-index-title"
              style={{ marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              The flat file.
            </h1>
            <p
              className="c-lead c-lead--wide"
              style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}
            >
              Fifteen plates drawn from more than three hundred projects. What
              was built says where it stands; what was proposed says that it was
              proposed. Municipality first, then the year.
            </p>
          </div>
        </div>
      </section>

      <Reveal
        as="section"
        className="c-shell"
        style={{
          paddingTop: "clamp(3rem, 6vw, 5rem)",
          paddingBottom: "var(--section)",
        }}
      >
        <PortfolioIndex />
      </Reveal>
    </>
  );
}
