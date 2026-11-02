import type { Metadata } from "next";
import { site } from "../../../../content/site";
import { getCases } from "@/lib/cms";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reviews } from "@/components/sections/Reviews";
import { CtaBand } from "@/components/sections/Cta";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Smile Gallery: Before & After Photos | Valencia Dentistry",
  description: "Real before-and-after results from Dr. Nuriel Lavi's patients in Valencia: veneers, crowns, implants and smile makeovers. Drag to compare each case.",
  path: "/smile-gallery/",
});
const crumbs = [{ label: "Home", href: "/" }, { label: "Smile Gallery", href: "/smile-gallery/" }];

export default async function GalleryPage() {
  const cases = await getCases();
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Hero image="/images/office/veneer-smile.jpg" imageAlt="Patient checking her smile in a hand mirror" compact objectPosition="center 45%">
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6" data-reveal="">Smile gallery</p>
          <h1 className="mt-4" data-reveal="" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>Real patients, real results</h1>
          <p className="lead mt-6 max-w-2xl" data-reveal="" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>Every case below is a patient of Dr. Lavi, photographed in our office and shared with permission. Drag the handle to compare.</p>
        </div>
      </Hero>
      <Section tone="ivory" labelledBy="cases-heading">
        <SectionHeading eyebrow="Before & after" title={`${["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"][cases.length - 1] ?? cases.length} transformations`} id="cases-heading" lead="Results vary from person to person. Each plan was designed around the patient's bite, health and goals." />
        <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <li key={c.id} data-reveal="" style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}><BeforeAfter c={c} priority={i < 3} /></li>
          ))}
        </ul>
        <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-sand bg-white p-8 text-center sm:flex-row sm:text-left" data-reveal="">
          <div className="flex-1">
            <h2 className="text-2xl">Curious what is possible for your smile?</h2>
            <p className="mt-2 text-muted">Dr. Lavi can preview your options on a digital scan at your consultation. New patients start with the {site.offer.title}.</p>
          </div>
          <Button href={site.bookingUrl}>Book a consultation</Button>
        </div>
      </Section>
      <Reviews tone="ivory-200" heading="In their words" />
      <CtaBand title="Your smile, designed around you" text="Book a cosmetic consultation in Valencia and see a preview before anything begins." />
    </>
  );
}
