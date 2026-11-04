import { Marquee } from "@/components/ui/Effects";

const treatments = ["Dental implants", "Porcelain veneers", "Invisalign", "Same-day crowns", "Teeth whitening", "All-on-4", "Holistic care", "TMJ relief"];
const values = ["One dentist, every visit", "No rush", "Biocompatible materials", "Plain explanations", "Honest priorities", "Gentle hands"];

/** Two crossing ribbons (charcoal and bronze) that run in opposite directions; speed follows scroll velocity. */
export function Ribbons() {
  return (
    <section className="ribbons bg-ivory" aria-label="Treatments and values">
      <div className="ribbon ribbon-a on-dark">
        <Marquee items={treatments} dir={1} speed={40} variant="italic" />
      </div>
      <div className="ribbon ribbon-b">
        <Marquee items={values} dir={-1} speed={48} variant="plain" separator="●" />
      </div>
    </section>
  );
}
