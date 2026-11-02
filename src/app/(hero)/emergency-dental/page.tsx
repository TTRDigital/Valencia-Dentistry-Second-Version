import type { Metadata } from "next";
import { emergency } from "../../../../content/pages";
import { site } from "../../../../content/site";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { serviceOptions } from "@/lib/forms";
import { Visit } from "@/components/sections/Visit";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: emergency.seo.title, description: emergency.seo.description, path: "/emergency-dental/" });
const crumbs = [{ label: "Home", href: "/" }, { label: "Emergency Dental", href: "/emergency-dental/" }];

export default function EmergencyPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(emergency.faqs)]} />
      <Hero image="/images/practice/exam-mirror.png" imageAlt="Close-up of a dental mirror exam of a patient's smile" compact objectPosition="center 30%">
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6" data-reveal="">{emergency.hero.eyebrow}</p>
          <h1 className="mt-4" data-reveal="" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>{emergency.hero.title}</h1>
          <p className="lead mt-6 max-w-2xl" data-reveal="" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>{emergency.hero.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal="" style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
            <Button href={`tel:${site.phoneE164}`} variant="gold" size="lg" icon={<Icon.phone className="h-4 w-4" />}>Call {site.phone}</Button>
            <Button href={site.bookingUrl} variant="outline" size="lg">Book Online</Button>
          </div>
          <div className="mt-6" data-reveal="" style={{ "--reveal-delay": "320ms" } as React.CSSProperties}><OpenBadge className="text-on-dark-muted" /></div>
        </div>
      </Hero>
      <Section tone="ivory" labelledBy="situations-heading">
        <SectionHeading eyebrow="What to do right now" title="Common emergencies and first steps" id="situations-heading" lead="These steps help until we see you. If you have trouble breathing or swallowing, call 911 or go to the nearest emergency room." />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {emergency.situations.map((s, i) => (
            <li key={s.title} className="card p-7" data-reveal="" style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}>
              <h3 className="text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="ivory-200" labelledBy="urgent-form">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Request urgent care" title="Tell us what happened" id="urgent-form" lead="Calling is fastest. If you cannot talk right now, send this form and we will call you back as soon as the office opens." />
            <div className="mt-8"><FaqList items={emergency.faqs} /></div>
          </div>
          <div className="lg:col-span-7" data-reveal="">
            <div className="card p-7 lg:p-10"><AppointmentForm form="emergency" services={serviceOptions} defaultService="Emergency / tooth pain" /></div>
          </div>
        </div>
      </Section>
      <Visit />
    </>
  );
}
