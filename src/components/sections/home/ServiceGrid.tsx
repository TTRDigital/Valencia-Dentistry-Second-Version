import Link from "next/link";
import { serviceCategories } from "../../../../content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icons";

export function ServiceGrid({ heading = "Everything your smile needs", eyebrow = "Services", lead = "Preventive care, family dentistry, cosmetic work, implants and surgery in one office, with the same dentist every time." }: { heading?: string; eyebrow?: string; lead?: string }) {
  return (
    <Section tone="ivory-200" labelledBy="services-heading">
      <SectionHeading eyebrow={eyebrow} title={heading} id="services-heading" lead={lead} align="center" />
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCategories.map((c, i) => (
          <li key={c.key} data-reveal="" style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}>
            <Link href={c.href} className="group card img-zoom block h-full overflow-hidden rounded-2xl transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(15,31,51,0.35)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Img src={c.image} alt={c.imageAlt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-7">
                <p className="eyebrow">{c.key === "surgery" ? "Surgical" : c.name}</p>
                <h3 className="mt-2 flex items-center justify-between gap-4 text-2xl">
                  {c.name}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sand text-ink-700 transition-colors group-hover:bg-ink-700 group-hover:text-white"><Icon.arrowRight className="h-4 w-4" /></span>
                </h3>
                <p className="mt-2 text-sm text-muted">{c.text}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
