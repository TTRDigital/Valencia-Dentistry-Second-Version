import { site } from "../../../content/site";
import { VisitMap } from "@/components/home/Visit";

/** Visit block for inner pages: the static brand map (live map on request) and the directions card. */
export function Visit({ heading = "Visit us in Valencia", eyebrow = "Find us" }: { heading?: string; eyebrow?: string }) {
  return (
    <section className="relative bg-ivory-200 text-text section" aria-labelledby="visit-heading">
      <div className="container-x">
        <p className="chapter">{eyebrow}</p>
        <h2 id="visit-heading" className="mt-6 mb-12" data-split="">{heading}</h2>
        <VisitMap site={site} />
      </div>
    </section>
  );
}
