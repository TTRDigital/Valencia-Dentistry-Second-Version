import type { Metadata } from "next";
import { site } from "../../../../content/site";
import { getTestimonials } from "@/lib/cms";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ReviewCard, GoogleRating } from "@/components/sections/Reviews";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GalleryPreview } from "@/components/sections/Gallery";
import { CtaBand } from "@/components/sections/Cta";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Patient Reviews & Testimonials | Valencia Smile Expert",
  description: "Read what patients say about Dr. Neda Moezzi and Valencia Smile Expert: 4.9 stars on Google from Santa Clarita families, shown word for word.",
  path: "/testimonials/",
});
const crumbs = [{ label: "Home", href: "/" }, { label: "Reviews", href: "/testimonials/" }];

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Hero image="/images/practice/dr-moezzi-smile-sign.png" imageAlt="Dr. Moezzi smiling behind a Smile sign at the front desk" compact objectPosition="center 25%">
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6" data-reveal="">Reviews</p>
          <h1 className="mt-4" data-reveal="" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>Kind words from our patients</h1>
          <p className="lead mt-6 max-w-2xl" data-reveal="" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>Every review on this page is a real Google review from a patient of the practice, reproduced word for word.</p>
          <div className="mt-8 flex flex-wrap items-center gap-6" data-reveal="" style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
            <GoogleRating dark />
            <Button href={site.mapsUrl} variant="outline" size="sm" icon={<Icon.google className="h-4 w-4" />}>Read all reviews on Google</Button>
          </div>
        </div>
      </Hero>
      <Section tone="ivory" labelledBy="reviews-grid">
        <SectionHeading eyebrow="Google reviews" title="What it is like to be a patient here" id="reviews-grid" />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={t.id} data-reveal="" style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}><ReviewCard t={t} /></li>
          ))}
          <li className="card flex flex-col justify-center bg-ink p-7 text-on-dark on-dark grain" data-reveal="">
            <p className="eyebrow">Been to see us?</p>
            <p className="mt-2 font-display text-2xl">Your words help the next nervous patient walk in</p>
            <Button href={site.mapsUrl} variant="gold" size="sm" className="mt-5 self-start">Leave a Google review</Button>
          </li>
        </ul>
        <p className="mt-8 text-sm text-muted">Video testimonials with captions will appear here as patients share them.</p>
      </Section>
      <GalleryPreview heading="See the results they are talking about" />
      <CtaBand title="Experience it for yourself" text={`Book online or call ${site.phone}. New patients start with the ${site.offer.title}.`} />
    </>
  );
}
