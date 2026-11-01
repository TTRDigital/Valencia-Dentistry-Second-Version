import type { Metadata } from "next";
import { about } from "../../../../content/pages";
import { site } from "../../../../content/site";
import { getDoctor } from "@/lib/cms";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Img } from "@/components/ui/Img";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TechnologyRow } from "@/components/sections/Technology";
import { Reviews } from "@/components/sections/Reviews";
import { Visit } from "@/components/sections/Visit";
import { CtaBand } from "@/components/sections/Cta";
import { ServiceGrid } from "@/components/sections/home/ServiceGrid";
import { JsonLd, breadcrumbSchema, personSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: about.seo.title, description: about.seo.description, path: "/about/" });
const crumbs = [{ label: "Home", href: "/" }, { label: "Our Practice", href: "/about/" }];

export default async function AboutPage() {
  const doctor = await getDoctor();
  return (
    <>
      <JsonLd data={[personSchema(), breadcrumbSchema(crumbs)]} />
      <Hero image="/images/practice/team-office-wide.png" imageAlt="Dr. Neda Moezzi seated with her team in the Valencia office" compact objectPosition="center 30%">
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} light />
          <p className="eyebrow mt-6" data-reveal="">{about.hero.eyebrow}</p>
          <h1 className="mt-4" data-reveal="" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>{about.hero.title}</h1>
          <p className="lead mt-6 max-w-2xl" data-reveal="" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>{about.hero.intro}</p>
        </div>
      </Hero>

      <Section tone="ivory" labelledBy="dr-heading" id="dr-neda-moezzi">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal="">
            <div className="gold-frame lg:sticky lg:top-32">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100"><Img src={doctor.portrait} alt={doctor.portraitAlt} fill priority sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover object-top" /></div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Meet your dentist" title={doctor.name} id="dr-heading" />
            <p className="serif-italic mt-8 text-2xl leading-snug text-ink-700">“{doctor.quote}”</p>
            <div className="prose-v mt-8" data-reveal="">{doctor.bio.map((p) => <p key={p}>{p}</p>)}</div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2" data-reveal="">
              {doctor.credentials.map((c) => <li key={c} className="flex items-start gap-3 rounded-xl border border-sand bg-white p-4 text-sm"><Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />{c}</li>)}
            </ul>
            <div className="mt-10" data-reveal="">
              <h3 className="text-2xl">{about.mission.heading}</h3>
              <div className="prose-v mt-4">{about.mission.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="ink" labelledBy="values-heading">
        <SectionHeading eyebrow="What guides us" title="The values behind every visit" id="values-heading" />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v, i) => (
            <li key={v.title} className="bg-ink p-7" data-reveal="" style={{ "--reveal-delay": `${(i % 4) * 80}ms` } as React.CSSProperties}>
              <span className="font-display text-2xl text-gold">0{i + 1}</span>
              <h3 className="mt-4 text-xl">{v.title}</h3>
              <p className="mt-2 text-sm text-on-dark-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="ivory-200" labelledBy="team-heading">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6" data-reveal="">
            <div className="img-zoom overflow-hidden rounded-2xl"><Img src="/images/practice/team-sign.png" alt="Dr. Neda Moezzi and her team under the Neda Moezzi DDS sign" sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full object-cover" /></div>
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <SectionHeading eyebrow="The team" title={about.team.heading} id="team-heading" lead={about.team.text} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2" data-reveal="">
              <div className="img-zoom overflow-hidden rounded-2xl"><div className="relative aspect-[5/4]"><Img src="/images/practice/dr-moezzi-smile-sign.png" alt="Dr. Moezzi holding a Smile sign at the front desk" fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" /></div></div>
              <div className="img-zoom overflow-hidden rounded-2xl"><div className="relative aspect-[5/4]"><Img src="/images/practice/treatment-room.png" alt="A bright treatment room with a patient reclining in the chair" fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" /></div></div>
            </div>
          </div>
        </div>
      </Section>

      <TechnologyRow tone="white" heading={about.technology.heading} eyebrow="Technology" lead={about.technology.text} />
      <ServiceGrid heading="Comprehensive care under one roof" lead="From a child's first checkup to full-arch implants, Dr. Moezzi's training spans the whole of dentistry." />
      <Reviews tone="ivory-200" heading="Why families stay" />
      <Visit />
      <CtaBand title="Come meet us" text={`New to the area or returning after time away? New patients start with the ${site.offer.title}.`} />
    </>
  );
}
