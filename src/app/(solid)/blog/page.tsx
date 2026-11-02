import type { Metadata } from "next";
import Link from "next/link";
import { categoryLabel, formatDate, readingTime } from "@/lib/blog";
import { getPosts } from "@/lib/cms";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/sections/Cta";
import { BlogFilter } from "@/components/sections/BlogFilter";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Dental Health Blog | Valencia Dentistry, Santa Clarita",
  description: "Plain-language guides from Dr. Nuriel Lavi, DDS on implants, crowns, bridges, extractions, cosmetic dentistry and keeping a healthy smile in Santa Clarita.",
  path: "/blog/",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "Blog", href: "/blog/" }];

export default async function BlogIndex() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Section tone="ivory" size="sm" className="pt-10 lg:pt-14">
        <Breadcrumbs items={crumbs} />
        <SectionHeading eyebrow="Blog" title="Guides for a healthier smile" as="h1" lead="Written by Dr. Nuriel Lavi, DDS for patients in Valencia and Santa Clarita. Honest answers about costs, timelines, recovery and options." className="mt-6" />
        <Link href={`/${featured.slug}/`} className="group mt-12 grid gap-8 overflow-hidden rounded-2xl border border-sand bg-white lg:grid-cols-12" data-reveal="">
          <div className="relative aspect-[3/1] lg:col-span-7 lg:aspect-auto lg:min-h-[320px] img-zoom overflow-hidden">
            <Img src={featured.image} alt={featured.imageAlt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
          </div>
          <div className="p-7 lg:col-span-5 lg:py-10 lg:pr-10">
            <p className="eyebrow">Latest · {categoryLabel[featured.category]}</p>
            <h2 className="mt-3 text-3xl group-hover:underline underline-offset-4 decoration-gold">{featured.title}</h2>
            <p className="mt-3 text-muted">{featured.excerpt}</p>
            <p className="mt-5 text-xs uppercase tracking-wider text-muted">{formatDate(featured.datePublished)} · {readingTime(featured.html)} min read</p>
            <span className="text-link mt-5 text-sm">Read the guide <Icon.arrowRight className="h-4 w-4" /></span>
          </div>
        </Link>
      </Section>
      <Section tone="ivory-200" size="sm">
        <BlogFilter posts={rest.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, image: p.image, imageAlt: p.imageAlt, category: p.category, date: formatDate(p.datePublished), minutes: readingTime(p.html) }))} labels={categoryLabel} />
      </Section>
      <CtaBand eyebrow="Questions about your own smile?" title="Talk to Dr. Lavi in person" text="Articles are a starting point. A consultation gives you answers about your teeth, your bone and your budget." />
    </>
  );
}
