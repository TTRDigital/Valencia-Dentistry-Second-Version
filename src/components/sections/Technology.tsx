import { technology } from "../../../content/site";
import type { TechKey } from "../../../content/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/Icons";

export function TechnologyRow({ keys, tone = "ivory", heading = "Precision you can feel", eyebrow = "Technology", lead }: { keys?: TechKey[]; tone?: "ivory" | "ivory-200" | "white" | "ink"; heading?: string; eyebrow?: string; lead?: string }) {
  const items = keys?.length ? technology.filter((t) => keys.includes(t.key)) : technology;
  return (
    <Section tone={tone} labelledBy="tech-heading">
      <SectionHeading eyebrow={eyebrow} title={heading} id="tech-heading" lead={lead ?? "Modern tools make visits shorter, diagnoses clearer and treatment gentler. Here is what you will find in the office."} />
      <ul className={`mt-12 grid gap-px overflow-hidden rounded-2xl border ${tone === "ink" ? "border-white/10 bg-white/10" : "border-sand bg-sand"} ${items.length === 1 ? "" : "sm:grid-cols-2"} ${items.length >= 4 ? "lg:grid-cols-4" : items.length === 3 ? "lg:grid-cols-3" : ""}`}>
        {items.map((t, i) => (
          <li key={t.key} className={`${tone === "ink" ? "bg-ink" : tone === "white" ? "bg-white" : "bg-ivory"} p-7`} data-reveal="" style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
            <TechIcon k={t.key} className="h-10 w-10 text-gold-700" />
            <h3 className="mt-5 text-lg">{t.name}</h3>
            <p className={`mt-2 text-sm ${tone === "ink" ? "text-on-dark-muted" : "text-muted"}`}>{t.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
