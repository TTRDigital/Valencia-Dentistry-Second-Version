import type { Metadata } from "next";
import Link from "next/link";
import { services } from "../../../../content/services";
import { site, serviceCategories } from "../../../../content/site";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Img } from "@/components/ui/Img";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TechnologyRow } from "@/components/sections/Technology";
import { Reviews, GoogleRating } from "@/components/sections/Reviews";
import { Affordable } from "@/components/sections/home/Affordable";
import { CtaBand } from "@/components/sections/Cta";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Dental Services in Valencia, CA | Valencia Smile Expert",
  description: "Preventive, family, cosmetic, restorative, implant and holistic dentistry in one Valencia office, every visit led by Dr. Neda Moezzi, DDS.",
  path: "/services/",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "Services", href: "/services/" }];

const extraLists: Record<string, string[]> = {
  preventive: ["Cleanings & exams", "Digital X-rays & CBCT", "Fluoride treatments", "Custom night guards", "Sealants", "Oral cancer screenings", "Sleep apnea appliances", "Sports mouthguards", "Periodontal deep cleaning", "Safe mercury removal"],
  family: ["Infant exams", "Children's dentistry", "Teen dentistry", "Pediatric restorative care", "Space maintainers", "Oral hygiene education"],
  cosmetic: ["Smile makeovers", "Veneers", "Teeth whitening", "Invisalign clear aligners", "Cosmetic bonding", "Tooth reshaping"],
  restorative: ["Same-day crowns", "Tooth-colored fillings", "Bridges", "Dentures & partials", "Full-mouth rehabilitation", "Functional crown lengthening", "Root canals"],
  surgery: ["Dental implants", "All-on-4 implants", "Extractions, including wisdom teeth", "Bone grafting & ridge augmentation", "Sinus lift", "PRF therapy", "Osseous surgery", "Gum grafting", "Periodontal regeneration", "Sedation options"],
  holistic: ["Mercury-free fillings", "SMART amalgam removal", "Fluoride-free cleanings", "Non-metal restorations", "Ozone therapy", "Holistic periodontal therapy"],
};

export default function ServicesHub() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Hero image="/images/practice/treatment-room.png" imageAlt="Dr. Moezzi treating a patient in a bright treatment room" compact objectPosition="center 40%">
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6" data-reveal="">Services</p>
          <h1 className="mt-4" data-reveal="" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>Everything your smile needs, under one roof</h1>
          <p className="lead mt-6 max-w-2xl" data-reveal="" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>From a child&apos;s first checkup to guided implant surgery, every treatment is planned and delivered by Dr. Neda Moezzi, DDS, in our Valencia office.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal="" style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
            <Button href={site.bookingUrl} variant="gold" size="lg">Book Online</Button>
            <Button href={`tel:${site.phoneE164}`} variant="outline" size="lg" icon={<Icon.phone className="h-4 w-4" />}>{site.phone}</Button>
          </div>
          <div className="mt-8 border-t border-white/15 pt-5" data-reveal="" style={{ "--reveal-delay": "320ms" } as React.CSSProperties}><GoogleRating dark /></div>
        </div>
      </Hero>

      {serviceCategories.map((c, i) => {
        const pages = services.filter((s) => s.category === c.key);
        const alt = i % 2 === 1;
        return (
          <Section key={c.key} tone={alt ? "ivory-200" : "ivory"} id={c.key} labelledBy={`cat-${c.key}`}>
            <div className={`grid items-start gap-10 lg:grid-cols-12 lg:gap-16`}>
              <div className={`lg:col-span-5 ${alt ? "lg:order-2" : ""}`} data-reveal="">
                <div className="gold-frame img-zoom">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl"><Img src={c.image} alt={c.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" /></div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <SectionHeading eyebrow={c.key === "surgery" ? "Surgical" : c.name} title={c.name === "Implants & Oral Surgery" ? "Implants & oral surgery" : `${c.name} dentistry`} id={`cat-${c.key}`} lead={c.text} />
                <ul className="mt-8 grid gap-2 sm:grid-cols-2" data-reveal="">
                  {extraLists[c.key].map((t) => <li key={t} className="flex items-start gap-2 text-[0.95rem]"><Icon.check className="mt-1 h-4 w-4 shrink-0 text-gold-700" />{t}</li>)}
                </ul>
                <ul className="mt-8 flex flex-wrap gap-2" data-reveal="">
                  {pages.map((p) => <li key={p.slug}><Link href={p.path} className="btn btn-outline btn-sm">{p.name}</Link></li>)}
                  {c.key === "surgery" && <li><Link href="/emergency-dental/" className="btn btn-outline btn-sm">Emergency care</Link></li>}
                </ul>
              </div>
            </div>
          </Section>
        );
      })}

      <TechnologyRow tone="white" />
      <Affordable />
      <Reviews tone="ivory-200" heading="Trusted by Santa Clarita families" />
      <CtaBand title="Not sure where to start?" text="Book a consultation and Dr. Moezzi will map out the right care, in the right order, at a pace that suits you." />
    </>
  );
}
