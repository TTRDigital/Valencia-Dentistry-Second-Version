import type { Metadata } from "next";
import { site } from "../../../../content/site";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { serviceOptions } from "@/lib/forms";
import { Visit } from "@/components/sections/Visit";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Request an Appointment | Valencia Dentistry",
  description: "Request a dental appointment with Dr. Nuriel Lavi in Valencia. Book online instantly or send your preferred time and we will confirm it by phone.",
  path: "/appointment/",
});
const crumbs = [{ label: "Home", href: "/" }, { label: "Appointment", href: "/appointment/" }];

export default function AppointmentPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Hero image="/images/office/treatment-room.jpg" imageAlt="Treatment room with a dental chair, monitors and large arched windows" compact objectPosition="center 30%">
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6" data-reveal="">Appointments</p>
          <h1 className="mt-4" data-reveal="" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>Book your visit</h1>
          <p className="lead mt-6 max-w-2xl" data-reveal="" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>Choose a time online right now, or send us your preferred time and we will confirm by phone or text.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal="" style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
            <Button href={site.bookingUrl} variant="gold" size="lg">Book your first visit</Button>
            <Button href={`tel:${site.phoneE164}`} variant="outline" size="lg" icon={<Icon.phone className="h-4 w-4" />}>{site.phone}</Button>
          </div>
        </div>
      </Hero>
      <Section tone="ivory" labelledBy="request-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Request a time" title="Prefer we call you?" id="request-heading" lead="Fill in the form and our team will reach out during office hours to confirm a time that works." />
            <ul className="mt-8 space-y-3 text-[0.95rem]" data-reveal="">
              {["Same-day visits often available", "Exam and digital X-rays at your first visit", site.insurance, site.financing, "Sedation options for anxious patients"].map((t) => <li key={t} className="flex items-start gap-3"><Icon.check className="mt-1 h-4 w-4 shrink-0 text-gold-700" />{t}</li>)}
            </ul>
          </div>
          <div className="lg:col-span-7" data-reveal="">
            <div className="card p-7 lg:p-10"><AppointmentForm form="appointment" services={serviceOptions} /></div>
          </div>
        </div>
      </Section>
      <Visit />
    </>
  );
}
