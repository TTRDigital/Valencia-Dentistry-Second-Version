import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "../../../content/site";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/home/Pillars";
import { Reviews, GoogleRating } from "@/components/sections/Reviews";
import { CosmeticEditorial } from "@/components/sections/home/Cosmetic";
import { ServiceGrid } from "@/components/sections/home/ServiceGrid";
import { CareFirst } from "@/components/sections/home/CareFirst";
import { MeetDoctor } from "@/components/sections/home/MeetDoctor";
import { TechnologyRow } from "@/components/sections/Technology";
import { GalleryPreview } from "@/components/sections/Gallery";
import { Affordable } from "@/components/sections/home/Affordable";
import { QuoteBand } from "@/components/sections/home/QuoteBand";
import { Visit } from "@/components/sections/Visit";
import { CtaBand } from "@/components/sections/Cta";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { JsonLd, dentistSchema, personSchema, faqSchema, webSiteSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FaqList } from "@/components/ui/Faq";
import { homeFaqs } from "../../../content/pages";

export const metadata: Metadata = pageMeta({
  title: "Dentist in Valencia, Santa Clarita | Valencia Smile Expert",
  description: "Holistic, one-on-one dentistry in Valencia with Dr. Neda Moezzi, DDS. Implants, veneers, Invisalign, same-day crowns. $59 new patient exam & X-rays.",
  path: "/",
  ogKey: "home",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[dentistSchema(), personSchema(), webSiteSchema(), faqSchema(homeFaqs)]} />
      <Hero image="/images/practice/team-sign.png" imageAlt="Dr. Neda Moezzi and her team in the Valencia office, in front of the Neda Moezzi DDS sign" objectPosition="center 30%">
        <div className="max-w-3xl">
          <p className="eyebrow" data-reveal="">Valencia · Santa Clarita</p>
          <h1 className="display-xl mt-5" data-reveal="" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            Dentistry with <span className="serif-italic">heart</span>, one patient at a time
          </h1>
          <p className="lead mt-6 max-w-xl" data-reveal="" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            Holistic, one-on-one care from Dr. Neda Moezzi, DDS. No handoffs, no rush, and a plan built around your long-term health.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row" data-reveal="" style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
            <Button href={site.bookingUrl} variant="gold" size="lg">Book Online</Button>
            <Button href={`tel:${site.phoneE164}`} variant="outline" size="lg" icon={<Icon.phone className="h-4 w-4" />}>{site.phone}</Button>
          </div>
        </div>
        <ul className="mt-12 grid max-w-4xl gap-4 border-t border-white/15 pt-6 sm:grid-cols-3" data-reveal="" style={{ "--reveal-delay": "320ms" } as React.CSSProperties}>
          <li><GoogleRating dark /></li>
          <li className="flex items-center gap-3"><Icon.shield className="h-6 w-6 text-gold" /><span className="text-sm"><span className="block font-semibold">{site.insurance}</span><span className="text-on-dark-muted">{site.financing}</span></span></li>
          <li className="flex items-center gap-3"><Icon.sparkle className="h-6 w-6 text-gold" /><span className="text-sm"><span className="block font-semibold">{site.offer.title}</span><span className="text-on-dark-muted">Exam &amp; X-rays for new patients</span></span></li>
        </ul>
      </Hero>
      {/* Each below-the-fold section is its own Suspense boundary so React hydrates them in small, interruptible tasks. */}
      <Pillars />
      <Suspense fallback={null}><Reviews /></Suspense>
      <CosmeticEditorial />
      <ServiceGrid />
      <CareFirst />
      <Suspense fallback={null}><MeetDoctor /></Suspense>
      <TechnologyRow />
      <Suspense fallback={null}><GalleryPreview /></Suspense>
      <Affordable />
      <Suspense fallback={null}><QuoteBand /></Suspense>
      <Section tone="ivory" labelledBy="faq-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="Good to know" title="Questions, answered" id="faq-heading" lead="A few things new patients ask before their first visit." /></div>
          <div className="lg:col-span-8"><FaqList items={homeFaqs} /></div>
        </div>
      </Section>
      <Visit />
      <CtaBand title="Ready when you are" text="Book online in under a minute, or call and talk to a real person. New patients start with a $59 exam and X-rays." />
    </>
  );
}
