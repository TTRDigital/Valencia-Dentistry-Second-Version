import { Marquee } from "@/components/ui/Effects";

const treatments = ["Dental implants", "Porcelain veneers", "Invisalign", "Same-day crowns", "Teeth whitening", "All-on-4", "Holistic care", "TMJ relief"];
const values = ["One dentist, every visit", "No rush", "Biocompatible materials", "Plain explanations", "Honest priorities", "Gentle hands"];

/** 2. Two ticker rows in opposite directions (italic treatments, outline values); speed follows scroll velocity. */
export function HomeTicker() {
  return (
    <section className="overflow-clip bg-ivory py-12 text-ink-700 lg:py-16" aria-label="Treatments and values">
      <Marquee items={treatments} dir={1} speed={46} variant="italic" />
      <Marquee items={values} dir={-1} speed={52} variant="outline" className="mt-2" />
    </section>
  );
}
