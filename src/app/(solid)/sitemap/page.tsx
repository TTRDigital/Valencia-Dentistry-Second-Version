import type { Metadata } from "next";
import Link from "next/link";
import { services } from "../../../../content/services";
import { posts } from "@/lib/blog";
import { footerNav } from "@/lib/nav";
import { Section, SectionHeading } from "@/components/ui/Section";
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
    <Section tone="ivory" size="sm" className="pt-10 lg:pt-14">
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Sitemap", href: "/sitemap/" }])} />
      <SectionHeading eyebrow="Sitemap" title="Every page on the site" as="h1" />
      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title}>
            <h2 className="text-2xl">{g.title}</h2>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              {g.links.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-slate-600 hover:underline underline-offset-4">{l.label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
