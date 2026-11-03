import { Section, SectionHeading } from "@/components/ui/Section";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icons";

const comforts = [
  "Sedation options for anxious patients",
  "Every visit led by Dr. Lavi, start to finish",
  "Clear estimates before treatment begins",
  "Same-day availability for urgent needs",
  "Mercury-free, biocompatible materials",
  "A quiet room and an unhurried pace",
];

const steps = [
  { t: "A real conversation", d: "Your first visit starts with time to talk, not a tray of instruments. Tell us what worries you and what you hope for." },
  { t: "A thorough look", d: "Digital X-rays, a careful exam and, when useful, a 3D scan. You see what we see on screen." },
  { t: "A plan in plain language", d: "Options, priorities and costs laid out clearly, so you decide with no pressure." },
  { t: "Care at your pace", d: "Treatment is scheduled around your life, with the same familiar faces at every appointment." },
];

export function CareFirst() {
  return (
    <Section tone="ivory" labelledBy="care-heading">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Comfort" title="Care that puts you first" id="care-heading" lead="Dentistry can be calm. We built the office, the schedule and the pace of each visit around that idea." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1" data-reveal="">
            {comforts.map((c) => (
              <li key={c} className="flex items-start gap-3 text-base"><Icon.check className="mt-1 h-4 w-4 shrink-0 text-gold-700" />{c}</li>
            ))}
          </ul>
          <div className="relative mt-10 aspect-[5/4] overflow-hidden rounded-2xl img-zoom lg:aspect-[4/3]" data-reveal="">
            <Img src="/images/office/cleaning.jpg" alt="Hygienist cleaning a patient's teeth in a bright treatment room" fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-16">
          <p className="eyebrow" data-reveal="">Your first visit</p>
          <ol className="mt-6 border-l border-sand">
            {steps.map((s, i) => (
              <li key={s.t} className="relative pl-10 pb-10 last:pb-0" data-reveal="" style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
                <span className="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-gold bg-ivory font-display text-xs text-gold-700" aria-hidden="true">{i + 1}</span>
                <h3 className="text-2xl">{s.t}</h3>
                <p className="mt-2 max-w-xl text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
