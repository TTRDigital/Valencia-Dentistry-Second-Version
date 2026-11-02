import type { Metadata } from "next";
import { site } from "../../../../content/site";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icons";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { serviceOptions } from "@/lib/forms";
import { Visit } from "@/components/sections/Visit";
import { Reviews } from "@/components/sections/Reviews";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Valencia Dentistry | Dentist in Valencia, CA",
  description: "Call (661) 254-5200, book online or send a message. Valencia Dentistry, 27420 Tourney Rd Suite 240, Santa Clarita, CA 91355. Open Mon–Fri 8am–5pm.",
  path: "/contact/",
});
const crumbs = [{ label: "Home", href: "/" }, { label: "Contact", href: "/contact/" }];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Hero image="/images/office/treatment-room-2.jpg" imageAlt="Calm treatment room with natural light and a modern dental chair" compact objectPosition="center 20%">
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6" data-reveal="">Contact</p>
          <h1 className="mt-4" data-reveal="" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>We would love to hear from you</h1>
          <p className="lead mt-6 max-w-2xl" data-reveal="" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>Questions, appointments or a second opinion: call, book online or send a note and a real person will reply.</p>
        </div>
      </Hero>
      <Section tone="ivory" labelledBy="contact-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Reach us" title="Three easy ways" id="contact-heading" />
            <ul className="mt-10 space-y-6" data-reveal="">
              <li className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory-200 text-gold-700"><Icon.phone className="h-5 w-5" /></span><div><p className="font-semibold text-ink-700">Call or text</p><a href={`tel:${site.phoneE164}`} className="text-lg hover:underline underline-offset-4">{site.phone}</a><p className="text-sm text-muted">Fastest for same-day and urgent needs.</p></div></li>
              <li className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory-200 text-gold-700"><Icon.calendar className="h-5 w-5" /></span><div><p className="font-semibold text-ink-700">Book online</p><a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-link min-h-11">Pick a time in our scheduler <Icon.arrowRight className="h-4 w-4" /></a><p className="text-sm text-muted">Takes about a minute.</p></div></li>
              <li className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory-200 text-gold-700"><Icon.mail className="h-5 w-5" /></span><div><p className="font-semibold text-ink-700">Email</p><a href={`mailto:${site.email}`} className="hover:underline underline-offset-4">{site.email}</a><p className="text-sm text-muted">For records, insurance questions and anything that can wait a day.</p></div></li>
              <li className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory-200 text-gold-700"><Icon.clock className="h-5 w-5" /></span><div><p className="font-semibold text-ink-700">Hours</p><p>Mon–Fri 8 AM – 5 PM · Sat & Sun closed</p><OpenBadge className="text-muted" /></div></li>
            </ul>
          </div>
          <div className="lg:col-span-7" data-reveal="">
            <div className="card p-7 lg:p-10">
              <h2 className="text-2xl">Send us a message</h2>
              <p className="mt-2 text-sm text-muted">Tell us what you need and the best time to reach you.</p>
              <div className="mt-6"><AppointmentForm form="contact" services={serviceOptions} /></div>
            </div>
          </div>
        </div>
      </Section>
      <Visit heading="Find the office" />
      <Reviews tone="ivory" heading="Patients on their first call" />
    </>
  );
}
