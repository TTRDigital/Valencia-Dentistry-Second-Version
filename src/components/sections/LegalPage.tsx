import legal from "../../../content/legal.json";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SplitHero } from "./Hero";
import { accent } from "@/components/ui/Accent";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export function LegalPage({ slug }: { slug: keyof typeof legal }) {
  const doc = legal[slug];
  const crumbs = [{ label: "Home", href: "/" }, { label: doc.title, href: `/${slug}/` }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <SplitHero solidHeader image="/images/office/treatment-room-2.jpg" imageAlt="Calm treatment room with natural light and a modern dental chair" portrait={false}>
        <div data-reveal=""><Breadcrumbs items={crumbs} /></div>
        <p className="eyebrow mt-5" data-reveal=""><span className="gold-rule w-8" aria-hidden="true" />Legal</p>
        <h1 className="mt-5" data-reveal="" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>{accent(doc.title, 2)}</h1>
        <p className="mt-6 text-sm text-muted" data-reveal="" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>Last updated {new Date(doc.updated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</p>
      </SplitHero>
      <Section tone="ivory" size="sm">
        <div className="mx-auto max-w-3xl">
          <div className="prose-v" dangerouslySetInnerHTML={{ __html: doc.html }} />
        </div>
      </Section>
    </>
  );
}
