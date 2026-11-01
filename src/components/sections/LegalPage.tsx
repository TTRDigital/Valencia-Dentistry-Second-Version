import legal from "../../../content/legal.json";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export function LegalPage({ slug }: { slug: keyof typeof legal }) {
  const doc = legal[slug];
  const crumbs = [{ label: "Home", href: "/" }, { label: doc.title, href: `/${slug}/` }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Section tone="ivory" size="sm" className="pt-10 lg:pt-14">
        <Breadcrumbs items={crumbs} />
        <div className="mx-auto mt-8 max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4">{doc.title}</h1>
          <span className="gold-rule mt-6" aria-hidden="true" />
          <p className="mt-4 text-sm text-muted">Last updated {new Date(doc.updated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</p>
          <div className="prose-v mt-10" dangerouslySetInnerHTML={{ __html: doc.html }} />
        </div>
      </Section>
    </>
  );
}
