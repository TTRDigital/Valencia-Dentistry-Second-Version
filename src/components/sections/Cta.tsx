import { site } from "../../../content/site";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";

/** Final call to action band (ink). */
export function CtaBand({ eyebrow = "Begin here", title, text, offer = true }: { eyebrow?: string; title: string; text: string; offer?: boolean }) {
  return (
    <Section tone="ink" size="sm" className="border-t border-white/10">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7" data-reveal="">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-4">{title}</h2>
          <p className="lead mt-5 max-w-2xl">{text}</p>
        </div>
        <div className="lg:col-span-5 lg:justify-self-end" data-reveal="" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href={site.bookingUrl} variant="gold" size="lg">Book your first visit</Button>
            <Button href={`tel:${site.phoneE164}`} variant="outline" size="lg" icon={<Icon.phone className="h-4 w-4" />}>{site.phone}</Button>
          </div>
          {offer && <p className="mt-4 text-sm text-on-dark-muted">{site.insurance} · {site.financing}</p>}
        </div>
      </div>
    </Section>
  );
}
