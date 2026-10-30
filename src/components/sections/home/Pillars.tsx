import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icons";

const pillars = [
  { n: "01", title: "Advanced technology", text: "3D CBCT imaging, iTero scanning, guided implant surgery and PRF therapy, so diagnosis is precise and treatment is gentler.", I: Icon.sparkle },
  { n: "02", title: "Calming spaces", text: "A quiet, light-filled office with sedation options when you want them. Nothing here feels like a clinic.", I: Icon.leaf },
  { n: "03", title: "One-on-one care", text: "Dr. Moezzi leads every visit herself. No handoffs, no rush, and a plan explained in plain language.", I: Icon.heart },
];

export function Pillars() {
  return (
    <Section tone="ink" labelledBy="pillars-heading">
      <SectionHeading eyebrow="Our approach" title="Patient-centered. Detail-driven." id="pillars-heading" lead="Holistic, integrative dentistry means we look at the whole person, choose biocompatible materials and favor prevention over quick fixes." />
      <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
        {pillars.map((p, i) => (
          <li key={p.n} className="bg-ink p-8 lg:p-10" data-reveal="" style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}>
            <div className="flex items-center justify-between">
              <span className="font-display text-3xl text-gold">{p.n}</span>
              <p.I className="h-6 w-6 text-on-dark-muted" />
            </div>
            <h3 className="mt-10 text-2xl">{p.title}</h3>
            <p className="mt-3 text-on-dark-muted">{p.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
