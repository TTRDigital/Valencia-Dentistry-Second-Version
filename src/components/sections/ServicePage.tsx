import type { Service, ExtraSection } from "../../../content/types";
import { services as builtInServices } from "../../../content/services";
import { site, doctor, technology, testimonials, cases } from "../../../content/site";
import { Button, Arrow } from "@/components/ui/Button";
import { Icon, TechIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { Marquee } from "@/components/ui/Effects";
import { type Crumb } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/ui/Faq";
import { ResultsStage } from "@/components/atelier/Results";
import { TreatmentIndex } from "@/components/atelier/TreatmentIndex";
import { BeginCta } from "@/components/atelier/Cta";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ServiceNav } from "@/components/service/ServiceNav";
import { ChapterIndex } from "@/components/service/ChapterIndex";
import { photosFor } from "@/components/service/photos";
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

const slug = (t: string) => `x-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;

function Chapter({ id, n, label, title, intro, children, dark }: { id: string; n: number; label: string; title: React.ReactNode; intro?: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`scroll-mt-28 border-t py-16 first:border-t-0 first:pt-0 lg:py-24 ${dark ? "border-white/10" : "border-sand"}`}>
      <p className="chapter"><b>({String(n).padStart(2, "0")})</b> {label}</p>
      <h2 id={`${id}-h`} className="mt-6 max-w-3xl text-[clamp(2.4rem,1.5rem+2.8vw,4.5rem)]" data-split="">{title}</h2>
      {intro && <p className="lead mt-6 max-w-2xl" data-reveal="">{intro}</p>}
      <div className="mt-10 lg:mt-14">{children}</div>
    </section>
  );
}

/** Puts the last two words of a heading in italic accent. */
function acc(t: string) {
  const w = t.split(" ");
  if (w.length < 3) return t;
  return (
    <>
      {w.slice(0, -2).join(" ")} <em className="accent">{w.slice(-2).join(" ")}</em>
    </>
  );
}

/**
 * Service page, editorial edition: a typographic hero, a benefits ribbon,
 * then a long-form article in numbered chapters with a sticky chapter index
 * (desktop) or chip bar (phones), a large review, related treatments as a
 * hover-preview index and the closing CTA. All copy comes from the content
 * files unchanged.
 */
export function ServicePage({ s, all }: { s: Service; all?: Service[] }) {
  const services = all ?? builtInServices;
  const crumbs = crumbsFor(s, services);
  const related = s.related.map((r) => services.find((x) => x.slug === r)).filter(Boolean) as Service[];
  const children = services.filter((x) => x.parent === s.path);
  const photos = photosFor(s);
  const [p0, p1, p2] = photos;
  const tech = s.technology.map((k) => technology.find((t) => t.key === k)).filter(Boolean) as typeof technology;
  const review = ["restorative", "cosmetic"].includes(s.category) ? testimonials.find((t) => t.id === "tamarea-jaster") ?? testimonials[0] : testimonials[0];
  const caseList = s.showGallery ? ((galleryFor[s.slug] ?? ["case-2", "case-4", "case-5"]).map((id) => cases.find((c) => c.id === id)).filter(Boolean) as typeof cases) : [];

  const chapters: { id: string; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "benefits", label: "Benefits" },
    { id: "who", label: "Who it’s for" },
    ...(s.extraSections ?? []).map((x) => ({ id: slug(x.heading), label: x.eyebrow ?? x.heading.split(" ").slice(0, 3).join(" ") })),
    { id: "process", label: "The process" },
    ...(tech.length ? [{ id: "technology", label: "Technology" }] : []),
    ...(caseList.length ? [{ id: "results", label: "Results" }] : []),
    { id: "cost", label: "Cost" },
    { id: "faq", label: "Questions" },
  ];
  const num = (id: string) => chapters.findIndex((c) => c.id === id) + 1;

  return (
    <>
      <JsonLd data={[serviceSchema(s), breadcrumbSchema(crumbs), faqSchema(s.faqs)].filter(Boolean)} />
      <ServiceHero s={s} crumbs={crumbs} photos={photos} />

      <section className="on-dark overflow-clip bg-ink py-5 text-on-dark" aria-label={`${s.name} at a glance`}>
        <Marquee items={s.benefits.items.map((b) => b.title)} dir={1} speed={44} variant="italic" />
      </section>

      <div className="lg:hidden"><ServiceNav items={chapters} /></div>

      <div className="relative bg-ivory text-text">
        <div className="container-x grid gap-10 py-16 lg:grid-cols-12 lg:py-28">
          <aside className="hidden lg:col-span-3 lg:block"><ChapterIndex items={chapters} /></aside>
          <article className="min-w-0 lg:col-span-9">
            <Chapter id="overview" n={num("overview")} label="Overview" title={acc(s.overview.heading)}>
              <div className="grid gap-12 xl:grid-cols-12">
                <div className="prose-v drop-cap xl:col-span-7" data-reveal="">
                  {s.overview.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <div className="relative xl:col-span-5">
                  <div className="relative mx-auto max-w-[460px] pb-20">
                    {p1 && <Photo src={p1.src} alt={p1.alt} w={420} mw={84} parallax={4} className="ml-auto w-[88%]" position="50% 30%" />}
                    {p2 && <div className="absolute bottom-0 left-0 w-[56%]"><Photo src={p2.src} alt={p2.alt} w={260} mw={50} parallax={8} frameClassName="ring-8 ring-ivory" position="50% 30%" /></div>}
                  </div>
                </div>
              </div>
              {children.length > 0 && (
                <div className="mt-12" data-reveal="">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">In this area</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {children.map((c) => <li key={c.slug}><a href={c.path} className="btn btn-outline btn-sm"><span className="btn-label">{c.name} <Arrow className="btn-arrow" /></span></a></li>)}
                  </ul>
                </div>
              )}
            </Chapter>

            <Chapter id="benefits" n={num("benefits")} label="Benefits" title={acc(s.benefits.heading)} intro={s.benefits.intro}>
              <ol className="grid gap-3 sm:grid-cols-2">
                {s.benefits.items.map((b, i) => (
                  <li key={b.title} className="group rounded-[var(--r-lg)] border border-sand bg-white/50 p-7 transition-colors duration-500 hover:bg-white sm:p-9" data-reveal="" style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}>
                    <span className="font-display text-5xl text-gold-700 tabular">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-6">{b.title}</h3>
                    <p className="mt-3 text-muted">{b.text}</p>
                  </li>
                ))}
              </ol>
            </Chapter>

            <Chapter id="who" n={num("who")} label="Who it’s for" title={acc(s.whoFor.heading)} intro={s.whoFor.intro}>
              <div className="grid items-start gap-10 xl:grid-cols-12">
                <ul className="xl:col-span-7">
                  {s.whoFor.bullets.map((b, i) => (
                    <li key={b} className="flex items-start gap-5 border-t border-sand py-5 text-lg last:border-b" data-reveal="" style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-white"><Icon.check className="h-4 w-4" /></span>{b}
                    </li>
                  ))}
                </ul>
                <div className="xl:col-span-5">
                  {p0 && <Photo src={p0.portrait ?? p0.src} alt={p0.alt} ratio={p0.portrait ? "2/3" : "4/5"} w={p0.portrait ? 330 : 400} mw={80} arch={!!p0.portrait} parallax={4} className="mx-auto" />}
                </div>
              </div>
            </Chapter>

            {s.extraSections?.map((x) => <Extra key={x.heading} x={x} n={num(slug(x.heading))} />)}

            <Chapter id="process" n={num("process")} label="The process" title={acc(s.process.heading)} intro={s.process.intro}>
              <ol className="relative">
                <span className="absolute bottom-6 left-[23px] top-6 w-px bg-sand" aria-hidden="true"><span data-draw="y" className="block h-full w-px origin-top bg-gold" /></span>
                {s.process.steps.map((st, i) => (
                  <li key={st.title} className="relative grid gap-2 pb-12 pl-20 last:pb-0" data-reveal="">
                    <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-ivory font-display text-lg tabular">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="pt-2">{st.title}</h3>
                    <p className="max-w-2xl text-muted">{st.text}</p>
                  </li>
                ))}
              </ol>
            </Chapter>

            {tech.length > 0 && (
              <Chapter id="technology" n={num("technology")} label="Technology" title={<>Tools that make it <em className="accent">gentler</em></>}>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {tech.map((t) => (
                    <li key={t.key} className="on-dark rounded-[var(--r-lg)] bg-olive-900 p-7 text-on-dark" data-reveal="">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink"><TechIcon k={t.key} className="h-6 w-6" /></span>
                      <h3 className="mt-6">{t.name}</h3>
                      <p className="mt-2 text-sm text-on-dark-muted">{t.text}</p>
                      <p className="mt-5 border-t border-white/10 pt-5 font-display text-lg italic">{t.benefit}</p>
                    </li>
                  ))}
                </ul>
              </Chapter>
            )}

            {caseList.length > 0 && (
              <Chapter id="results" n={num("results")} label="Results" title={<>Results you <em className="accent">can see</em></>} intro="Drag the handle, or use the arrow keys, to compare.">
                <div className="on-dark rounded-[var(--r-lg)] bg-ink px-5 py-12 text-on-dark sm:px-10">
                  <ResultsStage cases={caseList} />
                </div>
              </Chapter>
            )}

            <Chapter id="cost" n={num("cost")} label="Cost" title={acc(s.cost.heading)}>
              <div className="grid gap-10 xl:grid-cols-12">
                <div className="prose-v xl:col-span-7" data-reveal="">{s.cost.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
                <ul className="grid gap-3 self-start xl:col-span-5">
                  {[
                    { t: "Your first visit", d: "Exam and digital X-rays with Dr. Lavi", I: Icon.sparkle },
                    { t: site.insurance, d: "We verify benefits before treatment", I: Icon.shield },
                    { t: site.financing, d: "Monthly plans through third-party partners", I: Icon.calendar },
                  ].map(({ t, d, I }) => (
                    <li key={t} className="flex items-center gap-4 rounded-[var(--r-md)] border border-sand bg-white p-5" data-reveal="">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory-200 text-gold-700"><I className="h-5 w-5" /></span>
                      <div><p className="font-medium">{t}</p><p className="text-sm text-muted">{d}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
            </Chapter>

            <Chapter id="faq" n={num("faq")} label="Questions" title={<>{s.name} <em className="accent">questions</em></>}>
              <FaqList items={s.faqs} />
              <div className="on-dark mt-12 flex flex-col gap-6 rounded-[var(--r-lg)] bg-ink p-8 text-on-dark sm:flex-row sm:items-center sm:justify-between sm:p-10" data-reveal="">
                <div>
                  <p className="chapter">Ask Dr. Lavi</p>
                  <p className="mt-3 font-display text-3xl leading-tight">Still wondering if it is right for you?</p>
                  <p className="mt-2 max-w-md text-sm text-on-dark-muted">{doctor.bio[0].split(". ").slice(-1)[0]}</p>
                </div>
                <Button href={site.bookingUrl} variant="gold" size="lg" cursor="Book">Book a consultation</Button>
              </div>
            </Chapter>
          </article>
        </div>
      </div>

      {review && (
        <section className="relative bg-ivory-200 text-text section-lg lg:py-36" aria-labelledby="quote-heading">
          <div className="container-x">
            <h2 id="quote-heading" className="sr-only">What a patient says</h2>
            <figure className="max-w-5xl">
              <blockquote className="mf" data-words="">
                <span className="sr-only">{review.text}</span>
                <span className="mw" aria-hidden="true">“</span>
                {review.text.split(" ").map((w, k) => <span key={k} className="mw" aria-hidden="true">{w} </span>)}
                <span className="mw" aria-hidden="true">”</span>
              </blockquote>
              <figcaption className="mt-8 text-sm text-muted"><span className="font-medium text-text">{review.name}</span> · Google review · {"★".repeat(review.rating)}</figcaption>
            </figure>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="relative bg-ivory text-text section-lg" aria-labelledby="related-heading">
          <div className="container-x">
            <p className="chapter"><b>(+)</b> Related care</p>
            <h2 id="related-heading" className="mt-6" data-split="">You may also be <em className="accent">looking for</em></h2>
            <div className="mt-12"><TreatmentIndex items={related.map((r) => ({ name: r.name, href: r.path, text: r.menuDescription, image: r.image, group: "" }))} groups={[]} /></div>
          </div>
        </section>
      )}

      <BeginCta title={s.cta.heading} text={s.cta.text} />
    </>
  );
}

function Extra({ x, n }: { x: ExtraSection; n: number }) {
  const id = slug(x.heading);
  return (
    <Chapter id={id} n={n} label={x.eyebrow ?? "Good to know"} title={acc(x.heading)} intro={x.intro}>
      <div className={`grid gap-10 ${x.image ? "xl:grid-cols-12" : ""}`}>
        <div className={x.image ? "xl:col-span-7" : ""}>
          {x.items && (
            <ul className={`grid gap-3 ${x.image ? "sm:grid-cols-2" : "sm:grid-cols-2 xl:grid-cols-3"}`}>
              {x.items.map((it, i) => (
                <li key={it.title} className="rounded-[var(--r-md)] border border-sand bg-white/50 p-6 transition-colors duration-500 hover:bg-white" data-reveal="" style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}>
                  <span className="text-xs tabular text-gold-700">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-2xl">{it.title}</h3>
                  <p className="mt-2 text-sm text-muted">{it.text}</p>
                </li>
              ))}
            </ul>
          )}
          {x.bullets && (
            <ul className="grid gap-x-8 sm:grid-cols-2" data-reveal="">
              {x.bullets.map((b) => <li key={b} className="flex items-start gap-3 border-t border-sand py-4 text-base"><Icon.check className="mt-1 h-4 w-4 shrink-0 text-olive" />{b}</li>)}
            </ul>
          )}
          {x.columns && (
            <div className="grid gap-4 sm:grid-cols-2">
              {x.columns.map((c, i) => (
                <div key={c.title} className={`rounded-[var(--r-lg)] p-7 ${i % 2 ? "on-dark bg-ink text-on-dark" : "border border-sand bg-white"}`} data-reveal="" style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
                  <h3 className="text-2xl">{c.title}</h3>
                  <ul className="mt-5 space-y-3">{c.bullets.map((b) => <li key={b} className={`flex items-start gap-3 text-sm ${i % 2 ? "text-on-dark-muted" : ""}`}><Icon.check className={`mt-0.5 h-4 w-4 shrink-0 ${i % 2 ? "text-gold" : "text-olive"}`} />{b}</li>)}</ul>
                </div>
              ))}
            </div>
          )}
        </div>
        {x.image && (
          <div className="xl:col-span-5">
            <Photo src={x.image} alt={x.imageAlt ?? ""} w={400} mw={92} parallax={4} className="mx-auto" position="50% 30%" />
          </div>
        )}
      </div>
    </Chapter>
  );
}

export { Arrow };
