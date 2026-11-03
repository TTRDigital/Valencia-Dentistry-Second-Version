import Link from "next/link";
import type { Service, ExtraSection } from "../../../content/types";
import { services as builtInServices } from "../../../content/services";
import { site, doctor, technology, testimonials, cases } from "../../../content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button, Arrow } from "@/components/ui/Button";
import { Icon, TechIcon } from "@/components/ui/Icons";
import { Img } from "@/components/ui/Img";
import { Photo } from "@/components/ui/Photo";
import { Marquee } from "@/components/ui/Effects";
import { type Crumb } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/ui/Faq";
import { ResultsShowcase } from "@/components/home/Results";
import { ClosingCta } from "@/components/home/Closing";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ServiceNav } from "@/components/service/ServiceNav";
import { photosFor } from "@/components/service/photos";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

const galleryFor: Record<string, string[]> = {
  "dental-implants": ["implant-1", "case-1", "case-3"],
  "all-on-4-implants": ["implant-1", "case-1", "case-3"],
  "dental-crowns": ["case-6", "case-3", "case-1"],
  "dental-bridges": ["case-1", "implant-1", "case-3"],
  "restorative-dentistry": ["case-1", "case-6", "implant-1"],
};

const icons = [Icon.sparkle, Icon.shield, Icon.heart, Icon.leaf, Icon.check, Icon.star];

export function crumbsFor(s: Service, services: Service[] = builtInServices): Crumb[] {
  const list: Crumb[] = [{ label: "Home", href: "/" }, { label: "Services", href: "/services/" }];
  if (s.parent) {
    const p = services.find((x) => x.path === s.parent);
    if (p) list.push({ label: p.name, href: p.path });
  }
  list.push({ label: s.name, href: s.path });
  return list;
}

const nav = [
  { id: "overview", label: "Overview" },
  { id: "what-it-is", label: "What it is" },
  { id: "who", label: "Who it's for" },
  { id: "process", label: "Process" },
  { id: "why-us", label: "Why us" },
  { id: "faq", label: "FAQ" },
];

export function ServicePage({ s, all }: { s: Service; all?: Service[] }) {
  const services = all ?? builtInServices;
  const crumbs = crumbsFor(s, services);
  const related = s.related.map((slug) => services.find((x) => x.slug === slug)).filter(Boolean) as Service[];
  const children = services.filter((x) => x.parent === s.path);
  const photos = photosFor(s);
  const [p0, p1, p2] = photos;
  const p3 = photos[3] ?? { src: "/images/office/treatment-room.jpg", alt: "Dr. Lavi's treatment room on Tourney Road", portrait: "/images/portrait/treatment-room.jpg" };
  const tech = s.technology.map((k) => technology.find((t) => t.key === k)).filter(Boolean) as typeof technology;
  const review = ["restorative", "cosmetic"].includes(s.category) || s.slug === "dental-crowns" ? testimonials.find((t) => t.id === "tamarea-jaster") ?? testimonials[0] : testimonials[0];
  const why = [
    { title: doctor.credentials[0], text: "Dr. Lavi sees every patient himself, at every visit, and takes the time to listen before he recommends anything." },
    ...tech.map((t) => ({ title: t.name, text: t.text })),
    { title: site.insurance, text: `We verify your benefits before treatment. ${site.financing} help spread the cost of larger treatment.` },
  ];
  const caseList = s.showGallery ? (galleryFor[s.slug] ?? ["case-2", "case-4", "case-5"]).map((id) => cases.find((c) => c.id === id)).filter(Boolean) as typeof cases : [];

  return (
    <>
      <JsonLd data={[serviceSchema(s), breadcrumbSchema(crumbs), faqSchema(s.faqs)].filter(Boolean)} />
      <ServiceHero s={s} crumbs={crumbs} photos={photos} />

      {/* Quick facts, overlapping the hero */}
      <div className="relative z-10 -mt-16 lg:-mt-20">
        <div className="container-x">
          <dl className="grid overflow-hidden rounded-[var(--r-lg)] border border-sand bg-white shadow-[0_30px_60px_-35px_rgba(27,26,23,0.45)] sm:grid-cols-2 lg:grid-cols-4">
            {(s.overview.highlights ?? []).slice(0, 3).map((h, i) => (
              <div key={h.title} className="flex flex-col-reverse gap-1 border-b border-sand p-5 sm:p-6 lg:border-b-0 lg:border-r">
                <dd className="text-sm text-muted">{h.text}</dd>
                <dt className="flex items-center gap-2 font-display text-lg leading-snug text-ink-700"><span className="text-xs font-semibold text-gold-700 tabular">0{i + 1}</span>{h.title}</dt>
              </div>
            ))}
            <div className="flex flex-col-reverse gap-1 p-5 sm:p-6">
              <dd className="text-sm text-muted">From {site.google.reviewCount} Google reviews</dd>
              <dt className="flex items-center gap-2 font-display text-lg text-ink-700"><Icon.google className="h-5 w-5" />{site.google.rating} ★ rating</dt>
            </div>
          </dl>
        </div>
      </div>

      {/* Ticker band */}
      <section className="overflow-clip pb-4 pt-12 text-ink-700 lg:pt-16" aria-label={`${s.name} benefits`}>
        <Marquee items={s.benefits.items.map((b) => b.title)} dir={1} speed={44} variant="italic" />
      </section>

      <ServiceNav items={nav} />

      {/* Overview beside a two-photo collage */}
      <Section tone="light" id="overview" labelledBy="overview-heading" className="scroll-mt-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Overview" title={s.overview.heading} id="overview-heading" />
            <div className="prose-v mt-8" data-reveal="">
              {s.overview.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {children.length > 0 && (
              <div className="mt-10" data-reveal="">
                <p className="eyebrow">In this area</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {children.map((c) => (
                    <li key={c.slug}><Link href={c.path} className="btn btn-outline btn-sm"><span className="btn-label">{c.name} <Arrow className="btn-arrow" /></span></Link></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto max-w-[560px] pb-24 sm:pb-32 lg:sticky lg:top-40">
              {p1 && <Photo src={p1.src} alt={p1.alt} w={520} mw={84} parallax={4} className="ml-auto w-[88%]" position="50% 30%" />}
              {p2 && (
                <div className="absolute bottom-0 left-0 w-[58%]">
                  <Photo src={p2.src} alt={p2.alt} w={320} mw={52} parallax={8} frameClassName="ring-8 ring-ivory" position="50% 30%" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* What it is: icon cards */}
      <Section tone="olive" id="what-it-is" labelledBy="what-heading" className="scroll-mt-36">
        <SectionHeading eyebrow="What it is" title={s.benefits.heading} id="what-heading" lead={s.benefits.intro} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.benefits.items.map((b, i) => {
            const I = icons[i % icons.length];
            return (
              <li key={b.title} className="card-dark p-7 transition-colors duration-500 hover:border-gold/40" data-reveal="" style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink"><I className="h-5 w-5" /></span>
                <h3 className="mt-6 text-xl">{b.title}</h3>
                <p className="mt-2 text-sm text-on-dark-muted">{b.text}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Who it's for: checklist panel with a photo */}
      <Section tone="light" id="who" labelledBy="who-heading" className="scroll-mt-36">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            {p0 && <Photo src={p0.portrait ?? p0.src} alt={p0.alt} ratio={p0.portrait ? "2/3" : "4/5"} w={p0.portrait ? 340 : 420} mw={84} arch={!!p0.portrait} parallax={4} className="mx-auto" />}
          </div>
          <div className="lg:col-span-7">
            <div className="on-dark rounded-[var(--r-lg)] bg-ink p-7 text-on-dark sm:p-10 lg:p-12">
              <SectionHeading eyebrow="Is it right for you" title={s.whoFor.heading} id="who-heading" lead={s.whoFor.intro} />
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {s.whoFor.bullets.map((b, i) => (
                  <li key={b} className="flex items-start gap-3 rounded-[var(--r-sm)] border border-white/10 bg-white/[0.04] p-4 text-[0.95rem]" data-reveal="" style={{ "--reveal-delay": `${(i % 2) * 70}ms` } as React.CSSProperties}>
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-ink"><Icon.check className="h-3.5 w-3.5" /></span>{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {s.extraSections?.map((x, i) => <Extra key={x.heading} x={x} alt={i % 2 === 0} />)}

      {/* Process: connected step cards, the line draws in */}
      <Section tone="dark" id="process" labelledBy="process-heading" className="scroll-mt-36">
        <SectionHeading eyebrow="What to expect" title={s.process.heading} id="process-heading" lead={s.process.intro} />
        <ol className={`relative mt-14 grid gap-5 md:grid-cols-2 ${s.process.steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          <span className="absolute left-[23px] top-0 bottom-0 w-px bg-white/15 md:hidden" aria-hidden="true"><span data-draw="y" className="block h-full w-px origin-top bg-gold" /></span>
          <span className="absolute left-0 right-0 top-[23px] hidden h-px bg-white/15 md:block" aria-hidden="true"><span data-draw="x" className="block h-px w-full origin-left bg-gold" /></span>
          {s.process.steps.map((st, i) => (
            <li key={st.title} className="relative pl-16 md:pl-0" data-reveal="" style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}>
              <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-ink font-display text-lg text-gold md:relative">{String(i + 1).padStart(2, "0")}</span>
              <div className="card-dark mt-0 p-6 md:mt-6">
                <h3 className="text-xl">{st.title}</h3>
                <p className="mt-2 text-sm text-on-dark-muted">{st.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {caseList.length > 0 && (
        <Section tone="light" labelledBy="results-heading">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
            <SectionHeading eyebrow="Before & after" title="Results you can see" id="results-heading" lead="Drag the handle, or use the arrow keys, to compare." />
            <Button href="/smile-gallery/" variant="outline">See the gallery</Button>
          </div>
          <ResultsShowcase cases={caseList} />
        </Section>
      )}

      {/* Why us: numbered cards with a photo */}
      <Section tone="olive" id="why-us" labelledBy="why-heading" className="scroll-mt-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Why Valencia Dentistry" title="Why patients choose us" id="why-heading" />
            {p3 && <Photo src={p3.portrait ?? p3.src} alt={p3.alt} ratio={p3.portrait ? "2/3" : "4/5"} w={320} mw={84} arch={!!p3.portrait} className="mt-10 hidden lg:block" />}
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {why.map((w, i) => (
              <li key={w.title} className="card-dark p-7" data-reveal="" style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}>
                <span className="font-display text-5xl font-light text-gold tabular">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-xl">{w.title}</h3>
                <p className="mt-2 text-sm text-on-dark-muted">{w.text}</p>
                {tech[i - 1] && <span className="mt-4 inline-flex text-gold"><TechIcon k={tech[i - 1].key} className="h-6 w-6" /></span>}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Cost & financing (no prices) */}
      <Section tone="cream" labelledBy="cost-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Cost & financing" title={s.cost.heading} id="cost-heading" />
            <div className="prose-v mt-8" data-reveal="">{s.cost.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
          </div>
          <ul className="grid gap-4 self-center lg:col-span-5">
            {[
              { t: "Your first visit", d: "Exam and digital X-rays with Dr. Lavi", I: Icon.sparkle },
              { t: site.insurance, d: "We verify benefits before treatment", I: Icon.shield },
              { t: site.financing, d: "Monthly plans through third-party partners", I: Icon.calendar },
            ].map(({ t, d, I }) => (
              <li key={t} className="card flex items-center gap-4 p-5" data-reveal="">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory-200 text-gold-700"><I className="h-5 w-5" /></span>
                <div><p className="font-semibold text-ink-700">{t}</p><p className="text-sm text-muted">{d}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* FAQ beside an "Ask Dr. Lavi" card */}
      <Section tone="light" id="faq" labelledBy="faq-heading" className="scroll-mt-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Questions" title={`${s.name} FAQs`} id="faq-heading" lead="Straight answers to what patients ask most." accentWords={1} />
            <div className="on-dark mt-10 rounded-[var(--r-lg)] bg-ink p-7 text-on-dark lg:sticky lg:top-40" data-reveal="">
              <p className="eyebrow">Ask Dr. Lavi</p>
              <p className="mt-3 font-display text-2xl leading-snug">Still wondering if it is right for you?</p>
              <p className="mt-3 text-sm text-on-dark-muted">Bring your questions to a consultation. You will leave with a clear picture of your options and a written plan.</p>
              <div className="mt-6 flex flex-col gap-2">
                <Button href={site.bookingUrl} variant="gold" size="sm" cursor="Book">Book a consultation</Button>
                <Button href={`tel:${site.phoneE164}`} variant="outline" size="sm" icon={<Icon.phone className="h-4 w-4" />}>{site.phone}</Button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8"><FaqList items={s.faqs} /></div>
        </div>
      </Section>

      {/* A large review quote */}
      {review && (
        <Section tone="dark" labelledBy="quote-heading">
          <h2 id="quote-heading" className="sr-only">What a patient says</h2>
          <figure className="mx-auto max-w-5xl text-center">
            <Icon.quote className="mx-auto h-10 w-10 text-gold" />
            <blockquote className="mt-8 font-display text-[clamp(1.75rem,1.2rem+2.4vw,3.5rem)] font-light leading-[1.15] tracking-[-0.02em]" data-split="">“{review.text}”</blockquote>
            <figcaption className="mt-8 text-sm text-on-dark-muted"><span className="font-semibold text-on-dark">{review.name}</span> · Google review · {"★".repeat(review.rating)}</figcaption>
          </figure>
        </Section>
      )}

      {/* Related treatments */}
      {related.length > 0 && (
        <Section tone="light" labelledBy="related-heading">
          <SectionHeading eyebrow="Related care" title="You may also be looking for" id="related-heading" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => (
              <li key={r.slug} data-reveal="" style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
                <Link href={r.path} className="group block h-full" data-cursor="View">
                  <div className="frame relative aspect-[4/5]">
                    <Img src={r.image} alt={r.imageAlt} fill sizes="(min-width: 1024px) 570px, (min-width: 640px) 88vw, 172vw" className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" style={{ objectPosition: "50% 30%" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
                    <div className="absolute inset-x-5 bottom-5 text-white">
                      <h3 className="flex items-center justify-between gap-3 font-display text-2xl">{r.name}<Arrow className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" /></h3>
                      <p className="mt-1 text-xs text-white/80">{r.menuDescription}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <ClosingCta title={s.cta.heading} text={s.cta.text} />
    </>
  );
}

function Extra({ x, alt }: { x: ExtraSection; alt: boolean }) {
  const id = `x-${x.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;
  const hasImage = Boolean(x.image);
  return (
    <Section tone={alt ? "cream" : "light"} labelledBy={id}>
      <div className={`grid gap-10 ${hasImage ? "lg:grid-cols-12 lg:gap-16" : ""}`}>
        <div className={hasImage ? "lg:col-span-7" : ""}>
          <SectionHeading eyebrow={x.eyebrow ?? "Good to know"} title={x.heading} id={id} lead={x.intro} />
          {x.items && (
            <ul className={`mt-10 grid gap-4 ${hasImage ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {x.items.map((it, i) => (
                <li key={it.title} className="card p-6" data-reveal="" style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}>
                  <span className="text-xs font-semibold text-gold-700 tabular">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg">{it.title}</h3>
                  <p className="mt-2 text-sm text-muted">{it.text}</p>
                </li>
              ))}
            </ul>
          )}
          {x.bullets && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2" data-reveal="">
              {x.bullets.map((b) => <li key={b} className="flex items-start gap-3 text-[0.95rem]"><Icon.check className="mt-1 h-4 w-4 shrink-0 text-olive" />{b}</li>)}
            </ul>
          )}
          {x.columns && (
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {x.columns.map((c, i) => (
                <div key={c.title} className={`rounded-[var(--r-md)] p-7 ${i % 2 ? "on-dark bg-ink text-on-dark" : "card"}`} data-reveal="" style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
                  <h3 className="text-xl">{c.title}</h3>
                  <ul className="mt-4 space-y-2.5">{c.bullets.map((b) => <li key={b} className={`flex items-start gap-3 text-sm ${i % 2 ? "text-on-dark-muted" : ""}`}><Icon.check className={`mt-1 h-4 w-4 shrink-0 ${i % 2 ? "text-gold" : "text-olive"}`} />{b}</li>)}</ul>
                </div>
              ))}
            </div>
          )}
        </div>
        {hasImage && (
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-40">
              <Photo src={x.image!} alt={x.imageAlt ?? ""} w={480} mw={92} parallax={4} className="mx-auto" position="50% 30%" />
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

export { Arrow };
