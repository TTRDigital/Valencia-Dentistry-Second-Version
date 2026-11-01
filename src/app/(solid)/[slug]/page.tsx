import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { posts, postBySlug, categoryLabel, withHeadingIds, readingTime, formatDate } from "@/lib/blog";
import { doctor, site } from "../../../../content/site";
import { Section } from "@/components/ui/Section";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/ui/Faq";
import { Button, Arrow } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/Cta";
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) return {};
  return pageMeta({ title: p.seo.title, description: p.seo.description, path: `/${p.slug}/`, type: "article", publishedTime: p.datePublished, modifiedTime: p.dateModified, ogKey: `post--${p.slug}` });
}

async function Article({ params }: Pick<PageProps<"/[slug]">, "params">) {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) notFound();
  const { html, toc } = withHeadingIds(p.html);
  const related = p.related.map(postBySlug).filter(Boolean).slice(0, 3) as typeof posts;
  const crumbs = [{ label: "Home", href: "/" }, { label: "Blog", href: "/blog/" }, { label: p.title, href: `/${p.slug}/` }];
  return (
    <>
      <JsonLd data={[articleSchema(p), breadcrumbSchema(crumbs), faqSchema(p.faqs)].filter(Boolean)} />
      <article>
        <Section tone="ivory" size="sm" as="div" className="pt-10 lg:pt-14">
          <Breadcrumbs items={crumbs.map((c, i) => (i === 2 ? { ...c, label: "Article" } : c))} />
          <header className="mx-auto mt-8 max-w-3xl text-center">
            <p className="eyebrow">{categoryLabel[p.category]}</p>
            <h1 className="mt-4 text-[clamp(2rem,1.4rem+2.4vw,3.4rem)]">{p.title}</h1>
            <span className="gold-rule gold-rule-center mt-6" aria-hidden="true" />
            <p className="mt-6 text-sm text-muted">
              By <Link href="/about/" className="font-semibold text-ink-700">{p.author}</Link> · <time dateTime={p.datePublished}>{formatDate(p.datePublished)}</time>
              {p.dateModified !== p.datePublished && <> · Updated <time dateTime={p.dateModified}>{formatDate(p.dateModified!)}</time></>} · {readingTime(p.html)} min read
            </p>
          </header>
          <div className="relative mx-auto mt-10 aspect-[3/1] max-w-5xl overflow-hidden rounded-2xl">
            <Img src={p.image} alt={p.imageAlt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>
        </Section>

        <Section tone="ivory" as="div" size="sm" className="pt-0">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
            <aside className="min-w-0 lg:col-span-4 lg:order-2">
              <div className="lg:sticky lg:top-32 space-y-6">
                {toc.length > 2 && (
                  <nav aria-labelledby="toc-heading" className="card p-6">
                    <p id="toc-heading" className="eyebrow">In this article</p>
                    <ol className="mt-3 space-y-2 text-sm">
                      {toc.map((t, i) => (
                        <li key={t.id} className="flex gap-3"><span className="tabular text-gold-700">{String(i + 1).padStart(2, "0")}</span><a href={`#${t.id}`} className="hover:text-slate-600 hover:underline underline-offset-4">{t.text}</a></li>
                      ))}
                    </ol>
                  </nav>
                )}
                <div className="card bg-ink p-6 text-on-dark on-dark grain">
                  <p className="eyebrow">Ready to talk?</p>
                  <p className="mt-2 font-display text-xl">Ask Dr. Moezzi about your own case</p>
                  <p className="mt-2 text-sm text-on-dark-muted">{site.offer.title} for new patients.</p>
                  <div className="mt-4 flex flex-col gap-2"><Button href={site.bookingUrl} variant="gold" size="sm">Book Online</Button><Button href={`tel:${site.phoneE164}`} variant="outline" size="sm" icon={<Icon.phone className="h-4 w-4" />}>{site.phone}</Button></div>
                </div>
              </div>
            </aside>
            <div className="min-w-0 lg:col-span-8 lg:order-1">
              {p.keyTakeaways.length > 0 && (
                <aside className="rounded-2xl border border-gold/60 bg-white p-7" aria-labelledby="takeaways">
                  <p id="takeaways" className="eyebrow">Key takeaways</p>
                  <ul className="mt-4 space-y-2.5">
                    {p.keyTakeaways.map((k) => <li key={k} className="flex items-start gap-3 text-[0.95rem]"><Icon.check className="mt-1 h-4 w-4 shrink-0 text-gold-700" />{k}</li>)}
                  </ul>
                </aside>
              )}
              <div className="prose-v mt-10" dangerouslySetInnerHTML={{ __html: html }} />
              {p.faqs.length > 0 && (
                <section className="mt-14" aria-labelledby="post-faq">
                  <h2 id="post-faq" className="text-3xl">Frequently asked questions</h2>
                  <span className="gold-rule mt-5" aria-hidden="true" />
                  <FaqList items={p.faqs} className="mt-8" />
                </section>
              )}
              <section className="mt-14 flex flex-col gap-6 rounded-2xl border border-sand bg-white p-7 sm:flex-row" aria-labelledby="author">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-slate-100"><Img src={doctor.portrait} alt={doctor.portraitAlt} fill sizes="96px" className="object-cover object-top" /></div>
                <div>
                  <p className="eyebrow">About the author</p>
                  <h2 id="author" className="mt-1 text-2xl">{doctor.name}</h2>
                  <p className="mt-2 text-sm text-muted">{doctor.bio[0]} {doctor.bio[2]}</p>
                  <Link href="/about/" className="text-link mt-3 text-sm">Read her story <Arrow /></Link>
                </div>
              </section>
              <p className="mt-8 text-xs text-muted">This article is general information, not medical advice. For guidance about your own teeth, please book a consultation.</p>
            </div>
          </div>
        </Section>

        {related.length > 0 && (
          <Section tone="ivory-200" size="sm" labelledBy="related-posts">
            <h2 id="related-posts" className="text-3xl">Related reading</h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/${r.slug}/`} className="group card img-zoom flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-[3/1.6] overflow-hidden"><Img src={r.image} alt={r.imageAlt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" /></div>
                    <div className="p-6"><p className="eyebrow">{categoryLabel[r.category]}</p><h3 className="mt-2 text-lg group-hover:underline underline-offset-4 decoration-gold">{r.title}</h3></div>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </article>
      <CtaBand title="Have a question this article did not answer?" text="Book a consultation in Valencia and get answers about your own teeth, timeline and budget." />
    </>
  );
}

export default function Page({ params }: PageProps<"/[slug]">) {
  return (
    <Suspense fallback={null}>
      <Article params={params} />
    </Suspense>
  );
}
