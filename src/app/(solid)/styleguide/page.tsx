import type { Metadata } from "next";
import { site, technology, testimonials, cases } from "../../../../content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button, Arrow } from "@/components/ui/Button";
import { Icon, TechIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { ReviewCard, GoogleRating } from "@/components/sections/Reviews";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { FaqList } from "@/components/ui/Faq";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { Img } from "@/components/ui/Img";
import { homeFaqs } from "../../../../content/pages";

export const metadata: Metadata = {
  title: "Style guide",
  description: "Design tokens, type and components of the Valencia Dentistry website.",
  robots: { index: false, follow: false },
};

const colors = [
  ["--ink", "#1C1B19", "Dark surfaces"],
  ["--ink-700", "#2E2E2E", "Logo charcoal, headings"],
  ["--slate", "#7A6B52", "Taupe accent, links, icons"],
  ["--slate-600", "#5E5240", "Solid buttons"],
  ["--ivory", "#FAF7F1", "Page background"],
  ["--ivory-200", "#F2ECE1", "Alternate band"],
  ["--sand", "#E9E1D2", "Hairlines"],
  ["--gold", "#D9BE8C", "Dividers, accents (decorative)"],
  ["--gold-700", "#856A33", "Eyebrows, gold text (AA on ivory and white)"],
  ["--text", "#22211F", "Body text"],
  ["--muted", "#5F5A52", "Secondary text"],
  ["--on-dark", "#F3EEE4", "Text on ink"],
];

export default function StyleGuide() {
  return (
    <>
      <Section tone="ivory" size="sm">
        <SectionHeading eyebrow="Internal · noindex" title="Style guide" as="h1" lead="Tokens, type, components and motion rules for the Valencia Dentistry site. Everything on the site is built from these pieces." />
      </Section>

      <Section tone="white" size="sm" labelledBy="sg-color">
        <SectionHeading title="Color" id="sg-color" lead="Warm charcoal and taupe from the Valencia Dentistry mark, on ivory, with champagne gold hairlines. Every text/background pair passes WCAG AA." />
        <ul className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {colors.map(([v, hex, use]) => (
            <li key={v} className="card overflow-hidden">
              <div className="h-20" style={{ background: `var(${v})` }} />
              <div className="p-4 text-sm"><p className="font-semibold">{v}</p><p className="tabular text-muted">{hex}</p><p className="mt-1 text-xs text-muted">{use}</p></div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="ivory" size="sm" labelledBy="sg-type">
        <SectionHeading title="Typography" id="sg-type" lead="Fraunces (variable, optical size, 300 weight) for display, Manrope for body and UI. Cormorant Garamond is wired as the alternate serif for comparison." />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="eyebrow">Eyebrow · Manrope 600 · 0.72rem · 0.18em tracking</p>
            <p className="display-xl font-display">Display XL</p>
            <h1>Heading one, Fraunces 300</h1>
            <h2>Heading two, fluid with clamp()</h2>
            <h3>Heading three, Fraunces 400</h3>
            <p className="serif-italic text-2xl">Italic serif for quotes and emphasis</p>
            <p className="lead">Lead paragraph, Manrope, muted. Short sentences, one idea each.</p>
            <p>Body paragraph at 1–1.06rem with 1.65 line height. Links look like <a href="#" className="text-link">this <Arrow /></a>.</p>
          </div>
          <div className="space-y-6" style={{ fontFamily: "var(--font-serif-alt)" }}>
            <p className="eyebrow">Alternate serif · Cormorant Garamond</p>
            <p className="display-xl" style={{ fontFamily: "inherit" }}>Display XL</p>
            <h1 style={{ fontFamily: "inherit" }}>Heading one, Cormorant 300</h1>
            <h2 style={{ fontFamily: "inherit" }}>Heading two in Cormorant</h2>
            <p className="text-2xl italic" style={{ fontFamily: "inherit" }}>Italic serif for quotes and emphasis</p>
            <p className="text-sm text-muted" style={{ fontFamily: "var(--font-sans)" }}>Proposed: Fraunces (left). Cormorant reads lighter and more classical; it needs larger sizes on phones.</p>
          </div>
        </div>
      </Section>

      <Section tone="white" size="sm" labelledBy="sg-buttons">
        <SectionHeading title="Buttons & links" id="sg-buttons" />
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button>Solid (slate)</Button>
          <Button variant="ink">Ink</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="gold">Gold</Button>
          <Button size="sm" variant="outline">Small</Button>
          <Button size="lg" icon={<Arrow />}>Large with icon</Button>
          <a className="text-link" href="#">Text link <Icon.arrowRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-6 rounded-2xl bg-ink p-8 on-dark text-on-dark grain">
          <div className="flex flex-wrap gap-4"><Button variant="gold">Gold on ink</Button><Button variant="outline">Outline on ink</Button><Logo tone="light" className="h-8 w-auto" /></div>
        </div>
      </Section>

      <Section tone="ivory-200" size="sm" labelledBy="sg-comp">
        <SectionHeading title="Components" id="sg-comp" />
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <ReviewCard t={testimonials[1]} />
          <BeforeAfter c={cases[1]} />
          <div className="space-y-4">
            <GoogleRating />
            <OpenBadge className="block" />
            <ul className="grid grid-cols-4 gap-3">{technology.map((t) => <li key={t.key} className="card flex flex-col items-center gap-2 p-3 text-center text-[0.65rem]"><TechIcon k={t.key} className="h-8 w-8 text-gold-700" />{t.name}</li>)}</ul>
            <div className="card img-zoom overflow-hidden"><div className="relative aspect-[4/3]"><Img src="/images/office/cleaning.jpg" alt="Hygienist cleaning a patient's teeth in a bright treatment room" fill sizes="400px" className="object-cover" /></div><p className="p-4 text-sm">Image card with slow zoom on hover</p></div>
          </div>
        </div>
        <div className="mt-10 max-w-2xl"><FaqList items={homeFaqs.slice(0, 3)} /></div>
      </Section>

      <Section tone="white" size="sm" labelledBy="sg-motion">
        <SectionHeading title="Motion & spacing" id="sg-motion" lead="Reveal: fade + 24px rise, 900ms, staggered 80–120ms, IntersectionObserver. Image hover scale 1.04 over 1.2s. Hero drift 24s. Everything off under prefers-reduced-motion. Section padding 72–160px, container max 84rem, 16px gutters on phones." />
        <p className="mt-6 text-sm text-muted">Practice facts used across the site: {site.phone} · {site.address.street} · {site.offer.title}.</p>
      </Section>
    </>
  );
}
