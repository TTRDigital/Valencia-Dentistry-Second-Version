import { site } from "../../../content/site";
import { getTestimonials } from "@/lib/cms";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Carousel } from "@/components/ui/Carousel";
import { Stars } from "@/components/ui/Stars";
import { Icon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import type { Testimonial } from "../../../content/types";

export function ReviewCard({ t, dark }: { t: Testimonial; dark?: boolean }) {
  const initials = t.name.split(/\s+/).map((s) => s[0]).join("").slice(0, 2).toUpperCase();
  return (
    <article className={`flex h-full flex-col rounded-2xl border p-7 ${dark ? "border-white/10 bg-white/[0.04]" : "border-sand bg-white"}`}>
      <div className="flex items-center justify-between">
        <Stars n={t.rating} />
        <span className="inline-flex items-center gap-1.5 text-xs text-muted"><Icon.google className="h-3.5 w-3.5" /> Google review</span>
      </div>
      <p className={`mt-5 flex-1 text-[0.98rem] leading-relaxed ${dark ? "text-on-dark" : "text-text"}`}>“{t.text}”</p>
      <footer className="mt-6 flex items-center gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-base ${dark ? "bg-gold text-ink" : "bg-ink-700 text-on-dark"}`} aria-hidden="true">{initials}</span>
        <div>
          <p className="text-sm font-semibold">{t.name}</p>
          {t.service && <p className={`text-xs ${dark ? "text-on-dark-muted" : "text-muted"}`}>{t.service}</p>}
        </div>
      </footer>
    </article>
  );
}

export function GoogleRating({ dark, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-3 ${className}`} aria-label={`${site.google.rating.toFixed(1)} stars, ${site.google.reviewCount}+ Google reviews (opens Google Maps)`}>
      <Icon.google className="h-6 w-6" />
      <span className="font-display text-2xl leading-none">{site.google.rating.toFixed(1)}</span>
      <span className="flex flex-col leading-tight">
        <Stars n={5} className="h-3.5 w-3.5" />
        <span className={`text-xs ${dark ? "text-on-dark-muted" : "text-muted"}`}>{site.google.reviewCount}+ Google reviews</span>
      </span>
    </a>
  );
}

export async function Reviews({ tone = "ivory-200", heading = "Kind words from our patients", eyebrow = "Reviews", items }: { tone?: "ivory" | "ivory-200" | "ink"; heading?: string; eyebrow?: string; items?: Testimonial[] }) {
  const dark = tone === "ink";
  const list = items ?? (await getTestimonials());
  return (
    <Section tone={tone} labelledBy="reviews-heading">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow={eyebrow} title={heading} id="reviews-heading" lead="Every review below is a real Google review from a patient of the practice, shown word for word." />
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-reveal="">
          <GoogleRating dark={dark} />
          <Button href="/testimonials/" variant="outline" size="sm">Read more reviews</Button>
        </div>
      </div>
      <div className="mt-12">
        <Carousel label="Patient reviews" dark={dark}>
          {list.map((t) => (
            <ReviewCard key={t.id} t={t} dark={dark} />
          ))}
        </Carousel>
      </div>
    </Section>
  );
}
