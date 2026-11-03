import type { Metadata } from "next";
import Link from "next/link";
import { services } from "../../../../content/services";
import { posts } from "@/lib/blog";
import { footerNav } from "@/lib/nav";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SplitHero } from "@/components/sections/Hero";
import { accent } from "@/components/ui/Accent";

const crumbs = [{ label: "Home", href: "/" }, { label: "Sitemap", href: "/sitemap/" }];
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMeta({ title: "Sitemap | Valencia Dentistry", description: "Every page on the Valencia Dentistry website: services, about, reviews, blog articles and contact.", path: "/sitemap/" });

export default function HtmlSitemap() {
  const groups = [
    { title: "Practice", links: [{ label: "Home", href: "/" }, ...footerNav.practice, ...footerNav.legal] },
    { title: "Services", links: [{ label: "All services", href: "/services/" }, ...services.map((s) => ({ label: s.name, href: s.path }))] },
    { title: "Blog", links: [{ label: "All articles", href: "/blog/" }, ...posts.map((p) => ({ label: p.title, href: `/${p.slug}/` }))] },
  ];
  return (
    <>
    <JsonLd data={breadcrumbSchema(crumbs)} />
    <SplitHero tone="light" image="/images/office/treatment-room.jpg" imageAlt="Treatment room with a dental chair, monitors and large arched windows" portrait={false}>
      <div data-reveal=""><Breadcrumbs items={crumbs} /></div>
      <p className="eyebrow mt-5" data-reveal=""><span className="gold-rule w-8" aria-hidden="true" />Sitemap</p>
      <h1 className="mt-5" data-reveal="" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>{accent("Every page on the site", 2)}</h1>
    </SplitHero>
    <Section tone="ivory" size="sm">
      <div className="grid gap-12 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title}>
            <h2 className="text-2xl">{g.title}</h2>
            <ul className="mt-4 text-base">
              {g.links.map((l) => <li key={l.href}><Link href={l.href} className="inline-flex min-h-11 items-center hover:text-olive hover:underline underline-offset-4">{l.label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
    </>
  );
}
