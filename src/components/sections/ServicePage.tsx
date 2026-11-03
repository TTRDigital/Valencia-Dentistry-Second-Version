import Link from "next/link";
import type { Service, ExtraSection } from "../../../content/types";
import { services as builtInServices } from "../../../content/services";
import { site } from "../../../content/site";
import { Hero } from "./Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button, Arrow } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Img } from "@/components/ui/Img";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/ui/Faq";
import { TechnologyRow } from "./Technology";
import { GalleryPreview } from "./Gallery";
import { Reviews, GoogleRating } from "./Reviews";
import { CtaBand } from "./Cta";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

const galleryFor: Record<string, string[]> = {
  "dental-implants": ["implant-1", "case-1", "case-3"],
  "all-on-4-implants": ["implant-1", "case-1", "case-3"],
  "dental-crowns": ["case-6", "case-3", "case-1"],
  "dental-bridges": ["case-1", "implant-1", "case-3"],
  "restorative-dentistry": ["case-1", "case-6", "implant-1"],
};

export function crumbsFor(s: Service, services: Service[] = builtInServices): Crumb[] {
  const list: Crumb[] = [{ label: "Home", href: "/" }, { label: "Services", href: "/services/" }];
  if (s.parent) {
    const p = services.find((x) => x.path === s.parent);
    if (p) list.push({ label: p.name, href: p.path });
  }
  list.push({ label: s.name, href: s.path });
  return list;
}

export function ServicePage({ s, all }: { s: Service; all?: Service[] }) {
  const services = all ?? builtInServices;
  const crumbs = crumbsFor(s, services);
  const related = s.related.map((slug) => services.find((x) => x.slug === slug)).filter(Boolean) as Service[];
  const children = services.filter((x) => x.parent === s.path);
  return (
    <>
      <JsonLd data={[serviceSchema(s), breadcrumbSchema(crumbs), faqSchema(s.faqs)].filter(Boolean)} />
      <Hero image={s.image} imageAlt={s.imageAlt} compact objectPosition="center 35%">
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6" data-reveal="">{s.hero.eyebrow}</p>
          <h1 className="mt-4" data-reveal="" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>{s.hero.title}</h1>
          <p className="lead mt-6 max-w-2xl" data-reveal="" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>{s.hero.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal="" style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
            <Button href={site.bookingUrl} variant="gold" size="lg">Book a consultation</Button>
            <Button href={`tel:${site.phoneE164}`} variant="outline" size="lg" icon={<Icon.phone className="h-4 w-4" />}>{site.phone}</Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-sm" data-reveal="" style={{ "--reveal-delay": "320ms" } as React.CSSProperties}>
            <GoogleRating dark />
            <span className="inline-flex items-center gap-2"><Icon.shield className="h-4 w-4 text-gold" />{site.insurance}</span>
            <span className="inline-flex items-center gap-2"><Icon.sparkle className="h-4 w-4 text-gold" />{site.insurance}</span>
          </div>
        </div>
      </Hero>

      {/* Overview */}
      <Section tone="ivory" labelledBy="overview-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Overview" title={s.overview.heading} id="overview-heading" />
            <div className="prose-v mt-8" data-reveal="">
              {s.overview.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {children.length > 0 && (
              <div className="mt-10" data-reveal="">
                <p className="eyebrow">In this area</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {children.map((c) => (
                    <li key={c.slug}><Link href={c.path} className="btn btn-outline btn-sm">{c.name}</Link></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <aside className="lg:col-span-5">
            {s.overview.highlights?.length ? (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {s.overview.highlights.map((h, i) => (
                  <li key={h.title} className="card p-6" data-reveal="" style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
                    <span className="font-display text-2xl text-gold-700">0{i + 1}</span>
                    <h3 className="mt-3 text-xl">{h.title}</h3>
                    <p className="mt-2 text-sm text-muted">{h.text}</p>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="card mt-6 bg-ink p-7 text-on-dark on-dark grain" data-reveal="">
              <p className="eyebrow">Talk to Dr. Lavi</p>
              <p className="mt-2 font-display text-2xl">A consultation is the right first step</p>
              <p className="mt-2 text-sm text-on-dark-muted">Bring your questions. You will leave with a clear picture of your options and a written estimate.</p>
              <div className="mt-5 flex flex-col gap-2"><Button href={site.bookingUrl} variant="gold" size="sm">Book your first visit</Button><Button href="/appointment/" variant="outline" size="sm">Request an appointment</Button></div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Who it's for */}
      <Section tone="ivory-200" labelledBy="who-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5"><SectionHeading eyebrow="Is it right for you" title={s.whoFor.heading} id="who-heading" lead={s.whoFor.intro} /></div>
          <ul className="grid gap-3 self-center sm:grid-cols-2 lg:col-span-7">
            {s.whoFor.bullets.map((b, i) => (
              <li key={b} className="flex items-start gap-3 rounded-xl border border-sand bg-ivory p-4 text-[0.95rem]" data-reveal="" style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
                <Icon.check className="mt-1 h-4 w-4 shrink-0 text-gold-700" />{b}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Benefits */}
      <Section tone="ivory" labelledBy="benefits-heading">
        <SectionHeading eyebrow="Benefits" title={s.benefits.heading} id="benefits-heading" lead={s.benefits.intro} />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-3">
          {s.benefits.items.map((b, i) => (
            <li key={b.title} className="bg-ivory p-7" data-reveal="" style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}>
              <span className="font-display text-2xl text-gold-700">0{i + 1}</span>
              <h3 className="mt-3 text-xl">{b.title}</h3>
              <p className="mt-2 text-sm text-muted">{b.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Process */}
      <Section tone="ink" labelledBy="process-heading">
        <SectionHeading eyebrow="What to expect" title={s.process.heading} id="process-heading" lead={s.process.intro} />
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {s.process.steps.map((st, i) => (
            <li key={st.title} className="relative border-t border-white/15 pt-6" data-reveal="" style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}>
              <span className="absolute -top-px left-0 h-px w-12 bg-gold" aria-hidden="true" />
              <span className="font-display text-3xl text-gold">0{i + 1}</span>
              <h3 className="mt-4 text-xl">{st.title}</h3>
              <p className="mt-2 text-sm text-on-dark-muted">{st.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {s.technology.length > 0 && <TechnologyRow keys={s.technology} tone="white" heading="Technology used" eyebrow="Precision" lead="The tools Dr. Lavi uses for this treatment, and why they matter to you." />}

      {s.extraSections?.map((x, i) => <Extra key={x.heading} x={x} alt={i % 2 === 1} />)}

      {s.showGallery && <GalleryPreview ids={galleryFor[s.slug] ?? ["case-2", "case-4", "case-5"]} heading="Results you can see" eyebrow="Before & after" lead="Drag the handle to compare. Real cases from the practice, shared with permission." />}

      {/* Cost */}
      <Section tone="ivory-200" labelledBy="cost-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Cost & financing" title={s.cost.heading} id="cost-heading" />
            <div className="prose-v mt-8" data-reveal="">{s.cost.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
          </div>
          <div className="grid gap-4 self-center lg:col-span-5" data-reveal="">
            {[
              ["Your first visit", "Exam and digital X-rays with Dr. Lavi", Icon.sparkle],
              [site.insurance, "We verify benefits before treatment", Icon.shield],
              [site.financing, "Monthly plans through third-party partners", Icon.calendar],
            ].map(([t, d, I]) => {
              const C = I as (p: { className?: string }) => React.JSX.Element;
              return (
                <div key={t as string} className="card flex items-center gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory-200 text-gold-700"><C className="h-5 w-5" /></span>
                  <div><p className="font-semibold text-ink-700">{t as string}</p><p className="text-sm text-muted">{d as string}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* FAQs */}
      <Section tone="ivory" labelledBy="faq-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="Questions" title={`${s.name} FAQs`} id="faq-heading" lead="Straight answers to what patients ask most." /></div>
          <div className="lg:col-span-8"><FaqList items={s.faqs} /></div>
        </div>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section tone="white" labelledBy="related-heading" size="sm">
          <SectionHeading eyebrow="Related care" title="You may also be looking for" id="related-heading" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => (
              <li key={r.slug} data-reveal="" style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
                <Link href={r.path} className="group card img-zoom block h-full overflow-hidden">
                  <div className="relative aspect-[3/2]"><Img src={r.image} alt={r.imageAlt} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" /></div>
                  <div className="p-5">
                    <h3 className="flex items-center justify-between text-lg">{r.name}<Icon.arrowRight className="h-4 w-4 text-gold-700 transition-transform group-hover:translate-x-1" /></h3>
                    <p className="mt-1 text-xs text-muted">{r.menuDescription}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Reviews tone="ivory-200" heading="What patients say" />
      <CtaBand title={s.cta.heading} text={s.cta.text} />
    </>
  );
}

function Extra({ x, alt }: { x: ExtraSection; alt: boolean }) {
  const tone = alt ? "ivory-200" : "ivory";
  const id = `x-${x.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;
  const hasImage = Boolean(x.image);
  return (
    <Section tone={tone} labelledBy={id}>
      <div className={`grid gap-10 ${hasImage ? "lg:grid-cols-12 lg:gap-16" : ""}`}>
        <div className={hasImage ? "lg:col-span-7" : ""}>
          <SectionHeading eyebrow={x.eyebrow ?? "Good to know"} title={x.heading} id={id} lead={x.intro} />
          {x.items && (
            <ul className={`mt-10 grid gap-4 ${hasImage ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {x.items.map((it, i) => (
                <li key={it.title} className="card p-6" data-reveal="" style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}>
                  <h3 className="text-lg">{it.title}</h3>
                  <p className="mt-2 text-sm text-muted">{it.text}</p>
                </li>
              ))}
            </ul>
          )}
          {x.bullets && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2" data-reveal="">
              {x.bullets.map((b) => <li key={b} className="flex items-start gap-3 text-[0.95rem]"><Icon.check className="mt-1 h-4 w-4 shrink-0 text-gold-700" />{b}</li>)}
            </ul>
          )}
          {x.columns && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {x.columns.map((c, i) => (
                <div key={c.title} className="card p-7" data-reveal="" style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
                  <h3 className="text-xl">{c.title}</h3>
                  <ul className="mt-4 space-y-2.5">{c.bullets.map((b) => <li key={b} className="flex items-start gap-3 text-sm"><Icon.check className="mt-1 h-4 w-4 shrink-0 text-gold-700" />{b}</li>)}</ul>
                </div>
              ))}
            </div>
          )}
        </div>
        {hasImage && (
          <div className="lg:col-span-5" data-reveal="">
            <div className="gold-frame img-zoom sticky top-32">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl"><Img src={x.image!} alt={x.imageAlt ?? ""} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" /></div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

export { Arrow };
