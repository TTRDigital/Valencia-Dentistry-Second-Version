import type { Metadata } from "next";
import { site, technology, cases } from "../../../content/site";
import { services } from "../../../content/services";
import { homeFaqs } from "../../../content/pages";
import { AtelierHero } from "@/components/atelier/Hero";
import { Ribbons } from "@/components/atelier/Ribbons";
import { Manifesto } from "@/components/atelier/Manifesto";
import { TreatmentIndex, type IndexItem } from "@/components/atelier/TreatmentIndex";
import { FlyGallery } from "@/components/atelier/FlyGallery";
import { DoctorChapter } from "@/components/atelier/Doctor";
import { PathTimeline } from "@/components/atelier/PathTimeline";
import { ResultsStage } from "@/components/atelier/Results";
import { Voices } from "@/components/atelier/Voices";
import { TechTabs } from "@/components/atelier/TechTabs";
import { DotField } from "@/components/atelier/DotField";
import { Panels, type PanelItem } from "@/components/atelier/Panels";
import { InsuranceGrid } from "@/components/atelier/Insurance";
import { BeginCta } from "@/components/atelier/Cta";
import { VisitMap } from "@/components/home/Visit";
import { FaqList } from "@/components/ui/Faq";
import { Button } from "@/components/ui/Button";
import { JsonLd, dentistSchema, personSchema, faqSchema, webSiteSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Dentist in Valencia, Santa Clarita | Valencia Dentistry",
  description: "Holistic, one-on-one dentistry in Valencia with Dr. Nuriel Lavi, DDS. Implants, veneers, Invisalign, same-day crowns. Book your first visit.",
  path: "/",
  ogKey: "home",
});

const groupOf: Record<string, string> = { preventive: "Preventive & family", family: "Preventive & family", cosmetic: "Cosmetic", restorative: "Restorative", surgery: "Implants & surgery", holistic: "Holistic" };
const groups = ["Cosmetic", "Restorative", "Implants & surgery", "Preventive & family", "Holistic"];
const index: IndexItem[] = services.map((s) => ({ name: s.name, href: s.path, text: s.menuDescription, image: s.image, group: s.slug === "tmj-treatments" ? "Holistic" : groupOf[s.category] }));

const svc = (slug: string) => services.find((s) => s.slug === slug)!;
const holistic = svc("holistic-dentistry");
const tmj = svc("tmj-treatments");
const preventive = svc("preventive-dentistry");
const panels: PanelItem[] = [
  { eyebrow: "Holistic dentistry", title: "Care that respects the whole body", text: holistic.hero.intro, points: holistic.benefits.items.slice(0, 3).map((b) => b.title), href: holistic.path, image: "/images/office/treatment-room-2.jpg", imageAlt: "Calm treatment room with natural light and a modern dental chair", position: "50% 50%" },
  { eyebrow: "TMJ treatment", title: "Relief for jaw pain and headaches", text: tmj.hero.intro, points: tmj.whoFor.bullets.slice(0, 3).map((b) => b.split(",")[0]), href: tmj.path, image: "/images/office/aligner-patient.jpg", imageAlt: "Smiling patient holding a clear tray and its case", position: "48% 20%" },
  { eyebrow: "Prevention first", title: "Small problems, kept small", text: preventive.hero.intro, points: preventive.benefits.items.slice(0, 3).map((b) => b.title), href: preventive.path, image: "/images/office/cleaning.jpg", imageAlt: "Hygienist cleaning a patient's teeth in a bright treatment room", position: "45% 25%" },
];

const ch = (n: string, label: string, center = false) => <p className={`chapter ${center ? "justify-center" : ""}`}><b>({n})</b> {label}</p>;

export default function HomePage() {
  return (
    <>
      <JsonLd data={[dentistSchema(), personSchema(), webSiteSchema(), faqSchema(homeFaqs)]} />
      <AtelierHero />
      <Ribbons />
      <Manifesto />

      {/* (02) Treatment index */}
      <section className="relative bg-ivory text-text section-lg lg:py-40" aria-labelledby="index-title">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              {ch("02", "Treatments")}
              <h2 id="index-title" className="mt-6" data-split="">Everything your smile needs, <em className="accent">under one roof</em></h2>
            </div>
            <div className="flex items-end lg:col-span-6 lg:col-start-7">
              <p className="lead">From a cleaning to a full arch, every treatment is planned and delivered by Dr. Lavi in our Valencia office. Point at a treatment to preview it.</p>
            </div>
          </div>
          <div className="mt-14 lg:mt-20"><TreatmentIndex items={index} groups={groups} /></div>
        </div>
      </section>

      <FlyGallery />
      <DoctorChapter />
      <PathTimeline />

      {/* (06) Results */}
      <section className="on-dark relative overflow-clip bg-ink text-on-dark grain section-lg lg:py-40" aria-labelledby="results-title">
        <div className="container-x relative">
          <div className="mx-auto max-w-3xl text-center">
            {ch("06", "Results", true)}
            <h2 id="results-title" className="mt-6" data-split="">Real smiles, <em className="accent">side by side</em></h2>
            <p className="lead mx-auto mt-6 max-w-lg">Drag the handle, or use the arrow keys, to compare before and after.</p>
          </div>
          <div className="mt-14 lg:mt-20"><ResultsStage cases={cases} /></div>
          <div className="mt-12 flex justify-center"><Button href="/smile-gallery/" variant="outline">See the smile gallery</Button></div>
        </div>
      </section>

      <Voices />

      {/* (08) Technology */}
      <section className="on-dark relative overflow-clip bg-olive-900 text-on-dark section-lg lg:py-40" aria-labelledby="tech-title">
        <DotField />
        <div className="container-x relative">
          <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12">
            <div className="lg:col-span-6">
              {ch("08", "Technology")}
              <h2 id="tech-title" className="mt-6" data-split="">Modern tools, <em className="accent">gentler visits</em></h2>
            </div>
            <p className="lead self-end lg:col-span-5 lg:col-start-8">The equipment Dr. Lavi works with, and what each one means for you in the chair.</p>
          </div>
          <TechTabs items={technology} />
        </div>
      </section>

      {/* (09) Beyond the tooth */}
      <section className="relative bg-ivory-200 text-text section-lg lg:py-40" aria-labelledby="beyond-title">
        <div className="container-x">
          <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              {ch("09", "Beyond the tooth")}
              <h2 id="beyond-title" className="mt-6" data-split="">Holistic care and <em className="accent">TMJ relief</em></h2>
            </div>
            <p className="lead self-end lg:col-span-5 lg:col-start-8">Dentistry that looks at how your mouth, your jaw and the rest of you work together.</p>
          </div>
          <Panels items={panels} />
        </div>
      </section>

      {/* (10) Insurance */}
      <section className="relative bg-ivory text-text section-lg lg:py-40" aria-labelledby="insurance-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {ch("10", "Insurance")}
            <h2 id="insurance-title" className="mt-6" data-split="">Most major PPO plans <em className="accent">accepted</em></h2>
            <p className="lead mt-6">We check your benefits before treatment, so you know what to expect.</p>
          </div>
          <div className="lg:col-span-8"><InsuranceGrid /></div>
        </div>
      </section>

      {/* (11) FAQ */}
      <section className="relative bg-ivory-200 text-text section-lg lg:py-40" aria-labelledby="faq-heading">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {ch("11", "Good to know")}
            <h2 id="faq-heading" className="mt-6" data-split="">Before you <em className="accent">visit</em></h2>
          </div>
          <div className="lg:col-span-8"><FaqList items={homeFaqs} /></div>
        </div>
      </section>

      <BeginCta n="12" text="Book online in under a minute, or call and talk to a real person. Your first visit starts with an exam, digital X-rays and time to talk." />

      {/* (13) Visit */}
      <section className="relative bg-ivory-200 text-text section-lg" aria-labelledby="visit-title">
        <div className="container-x">
          <div className="mb-12 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              {ch("13", "Visit")}
              <h2 id="visit-title" className="mt-6" data-split="">On Tourney Road, <em className="accent">in Valencia</em></h2>
            </div>
            <p className="lead self-end lg:col-span-5 lg:col-start-8">Free parking at the building and an elevator to our second-floor office.</p>
          </div>
          <VisitMap site={site} />
        </div>
      </section>
    </>
  );
}
