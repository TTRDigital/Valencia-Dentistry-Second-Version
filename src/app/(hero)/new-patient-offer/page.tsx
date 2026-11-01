import type { Metadata } from "next";
import { offer } from "../../../../content/pages";
import { site } from "../../../../content/site";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { serviceOptions } from "@/lib/forms";
import { Reviews } from "@/components/sections/Reviews";
import { Affordable } from "@/components/sections/home/Affordable";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: offer.seo.title, description: offer.seo.description, path: "/new-patient-offer/" });
const crumbs = [{ label: "Home", href: "/" }, { label: "New Patient Special", href: "/new-patient-offer/" }];

export default function OfferPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(offer.faqs)]} />
      <Hero image="/images/practice/checkup-smile.png" imageAlt="A smiling patient in the dental chair during a checkup" compact objectPosition="center 30%">
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6" data-reveal="">{offer.hero.eyebrow}</p>
          <h1 className="mt-4" data-reveal="" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>{offer.hero.title}</h1>
          <p className="lead mt-6 max-w-2xl" data-reveal="" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>{offer.hero.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal="" style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
            <Button href={site.bookingUrl} variant="gold" size="lg">Claim the $59 special</Button>
            <Button href={`tel:${site.phoneE164}`} variant="outline" size="lg" icon={<Icon.phone className="h-4 w-4" />}>{site.phone}</Button>
          </div>
        </div>
      </Hero>
      <Section tone="ivory" labelledBy="includes-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="What is included" title="Everything a first visit should be" id="includes-heading" />
            <ul className="mt-8 space-y-3" data-reveal="">
              {offer.includes.map((t) => <li key={t} className="flex items-start gap-3 rounded-xl border border-sand bg-white p-4 text-[0.95rem]"><Icon.check className="mt-1 h-4 w-4 shrink-0 text-gold-700" />{t}</li>)}
            </ul>
            <p className="mt-4 text-xs text-muted">{site.offer.fineprint}</p>
          </div>
          <div className="lg:col-span-7" data-reveal="">
            <div className="card p-7 lg:p-10">
              <h2 className="text-2xl">Request your $59 visit</h2>
              <p className="mt-2 text-sm text-muted">Prefer to book instantly? Use <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">online scheduling</a>.</p>
              <div className="mt-6"><AppointmentForm form="offer" services={serviceOptions} defaultService="New patient exam ($59 special)" /></div>
            </div>
          </div>
        </div>
      </Section>
      <Section tone="ink" labelledBy="steps-heading">
        <SectionHeading eyebrow="How it works" title="Four simple steps" id="steps-heading" />
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {offer.steps.map((s, i) => (
            <li key={s.title} className="relative border-t border-white/15 pt-6" data-reveal="" style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}>
              <span className="absolute -top-px left-0 h-px w-12 bg-gold" aria-hidden="true" />
              <span className="font-display text-3xl text-gold">0{i + 1}</span>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-on-dark-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="ivory" labelledBy="offer-faq">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="Questions" title="About the special" id="offer-faq" /></div>
          <div className="lg:col-span-8"><FaqList items={offer.faqs} /></div>
        </div>
      </Section>
      <Affordable />
      <Reviews tone="ivory-200" heading="First visits, in their words" />
    </>
  );
}
