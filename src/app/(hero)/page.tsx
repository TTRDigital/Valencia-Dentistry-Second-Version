import type { Metadata } from "next";
import { Suspense } from "react";
import { site, technology, cases, testimonials } from "../../../content/site";
import { services } from "../../../content/services";
import { emergency, homeFaqs } from "../../../content/pages";
import { HomeHero } from "@/components/home/Hero";
import { HomeTicker } from "@/components/home/Ticker";
import { HomeFacts } from "@/components/home/Facts";
import { Picker, type Choice } from "@/components/home/Picker";
import { HomeTreatments } from "@/components/home/Treatments";
import { HomeDoctor } from "@/components/home/Doctor";
import { HomeFirstVisit } from "@/components/home/FirstVisit";
import { ResultsShowcase } from "@/components/home/Results";
import { ReviewPanel } from "@/components/home/Reviews";
import { StackCards, type StackItem } from "@/components/home/Stack";
import { TechGrid } from "@/components/home/Technology";
import { InsuranceTicker } from "@/components/home/Insurance";
import { ClosingCta } from "@/components/home/Closing";
import { VisitMap } from "@/components/home/Visit";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { FaqList } from "@/components/ui/Faq";
import { JsonLd, dentistSchema, personSchema, faqSchema, webSiteSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Dentist in Valencia, Santa Clarita | Valencia Dentistry",
  description: "Holistic, one-on-one dentistry in Valencia with Dr. Nuriel Lavi, DDS. Implants, veneers, Invisalign, same-day crowns. Book your first visit.",
  path: "/",
  ogKey: "home",
});

const svc = (slug: string) => services.find((s) => s.slug === slug)!;

const choices: Choice[] = [
  { key: "pain", label: "A tooth that hurts", title: emergency.hero.title, text: emergency.hero.intro, href: "/emergency-dental/", cta: "Emergency dental care", image: "/images/office/treatment-room.jpg", imageAlt: "Treatment room with a dental chair, monitors and large arched windows", position: "50% 50%" },
  { key: "missing", label: "Missing teeth", title: "Implants planned in 3D", text: svc("dental-implants").hero.intro, href: svc("dental-implants").path, cta: "About dental implants", image: "/images/office/implant-model-hands.jpg", imageAlt: "Dentist showing a patient how an implant and crown fit on a model" },
  { key: "brighter", label: "A brighter smile", title: "Cosmetic care that looks like you", text: svc("cosmetic-dentistry").hero.intro, href: svc("cosmetic-dentistry").path, cta: "About cosmetic dentistry", image: "/images/office/veneer-smile.jpg", imageAlt: "Patient checking her smile in a hand mirror" },
  { key: "straighter", label: "Straighter teeth", title: "Clear aligners, no braces", text: svc("invisalign").hero.intro, href: svc("invisalign").path, cta: "About Invisalign", image: "/images/office/aligner-patient.jpg", imageAlt: "Smiling patient holding a clear aligner and its case" },
  { key: "jaw", label: "Jaw pain or headaches", title: "Relief for TMJ strain", text: svc("tmj-treatments").hero.intro, href: svc("tmj-treatments").path, cta: "About TMJ treatment", image: "/images/office/aligner-patient-2.jpg", imageAlt: "Patient smiling while placing a clear tray" },
  { key: "checkup", label: "A checkup and cleaning", title: "Prevention, done properly", text: svc("preventive-dentistry").hero.intro, href: svc("preventive-dentistry").path, cta: "About preventive care", image: "/images/office/cleaning.jpg", imageAlt: "Hygienist cleaning a patient's teeth in a bright treatment room", position: "30% 20%" },
];

const holistic = svc("holistic-dentistry");
const tmj = svc("tmj-treatments");
const preventive = svc("preventive-dentistry");
const stack: StackItem[] = [
  { eyebrow: "Holistic dentistry", title: "Care that respects the whole body", text: holistic.hero.intro, points: holistic.benefits.items.slice(0, 4).map((b) => b.title), href: holistic.path, cta: "Holistic dentistry", image: "/images/office/treatment-room-2.jpg", imageAlt: "Calm treatment room with natural light and a modern dental chair", position: "50% 50%" },
  { eyebrow: "TMJ treatment", title: "Relief for jaw pain and headaches", text: tmj.hero.intro, points: tmj.whoFor.bullets.slice(0, 4), href: tmj.path, cta: "TMJ treatment", image: "/images/office/aligner-patient.jpg", imageAlt: "Smiling patient holding a clear tray and its case" },
  { eyebrow: "Prevention first", title: "Small problems, kept small", text: preventive.hero.intro, points: preventive.benefits.items.slice(0, 4).map((b) => b.title), href: preventive.path, cta: "Preventive dentistry", image: "/images/office/cleaning.jpg", imageAlt: "Hygienist cleaning a patient's teeth in a bright treatment room", position: "30% 20%" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[dentistSchema(), personSchema(), webSiteSchema(), faqSchema(homeFaqs)]} />
      {/* 1 */}
      <HomeHero />
      {/* 2 */}
      <HomeTicker />
      {/* 3 */}
      <HomeFacts />
      {/* 4 */}
      <Section tone="light" labelledBy="picker-title">
        <SectionHeading eyebrow="Start here" title="What's bringing you in?" id="picker-title" lead="Choose what sounds closest. We will point you to the right place, and Dr. Lavi will take it from there." accentWords={2} />
        <div className="mt-12 lg:mt-16">
          <Suspense fallback={null}><Picker choices={choices} /></Suspense>
        </div>
      </Section>
      {/* 5 */}
      <HomeTreatments />
      {/* 6 */}
      <HomeDoctor />
      {/* 7 */}
      <HomeFirstVisit />
      {/* 8 */}
      <Section tone="light" labelledBy="results-title">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
          <SectionHeading eyebrow="Smile gallery" title="Real results, side by side" id="results-title" lead="Drag the handle, or use the arrow keys, to compare before and after." />
          <Button href="/smile-gallery/" variant="outline">See the gallery</Button>
        </div>
        <Suspense fallback={null}><ResultsShowcase cases={cases} /></Suspense>
      </Section>
      {/* 9 */}
      <Section tone="dark" labelledBy="reviews-title">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-8 lg:col-span-4">
            <SectionHeading eyebrow="Reviews" title="In our patients' words" id="reviews-title" />
            <div className="rounded-[var(--r-lg)] bg-gold p-7 text-ink sm:p-9" data-reveal="">
              <div className="flex items-center gap-3"><Icon.google className="h-7 w-7" /><span className="text-sm font-semibold">Google rating</span></div>
              <p className="mt-6 font-display text-7xl leading-none tracking-[-0.04em]">{site.google.rating}</p>
              <p className="mt-3 flex gap-1" aria-label={`${site.google.rating} out of 5 stars`}>{[0, 1, 2, 3, 4].map((k) => <Icon.star key={k} className="h-5 w-5" />)}</p>
              <p className="mt-3 text-sm">From {site.google.reviewCount} Google reviews</p>
              <Button href="/testimonials/" variant="ink" size="sm" className="mt-6">Read reviews</Button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Suspense fallback={null}><ReviewPanel reviews={testimonials} /></Suspense>
          </div>
        </div>
      </Section>
      {/* 10 */}
      <Section tone="cream" labelledBy="whole-title">
        <SectionHeading eyebrow="Beyond the tooth" title="Holistic care and TMJ relief" id="whole-title" lead="Dentistry that looks at how your mouth, your jaw and the rest of you work together." />
        <div className="mt-12 lg:mt-16">
          <StackCards items={stack} />
        </div>
      </Section>
      {/* 11 */}
      <Section tone="dark" labelledBy="tech-title">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
          <SectionHeading eyebrow="Technology" title="Modern tools, gentler visits" id="tech-title" lead="Hover, focus or tap a card to see what each one means for you." />
        </div>
        <Suspense fallback={null}><TechGrid items={technology} /></Suspense>
      </Section>
      {/* 12 */}
      <Section tone="light" labelledBy="insurance-title" bare>
        <div className="container-x">
          <SectionHeading eyebrow="Insurance" title="Most major PPO plans accepted" id="insurance-title" align="center" accentWords={2} lead="We check your benefits before treatment, so you know what to expect." />
        </div>
        <div className="mt-12">
          <InsuranceTicker />
        </div>
      </Section>
      {/* 13 */}
      <ClosingCta text="Book online in under a minute, or call and talk to a real person. Your first visit starts with an exam, digital X-rays and time to talk." />
      {/* 14 */}
      <Section tone="cream" labelledBy="visit-title">
        <SectionHeading eyebrow="Visit" title="On Tourney Road, in Valencia" id="visit-title" lead="Free parking at the building and an elevator to our second-floor office." />
        <div className="mt-12">
          <Suspense fallback={null}><VisitMap site={site} /></Suspense>
        </div>
        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="Good to know" title="Before you visit" id="faq-heading" lead="A few things new patients ask before their first visit." /></div>
          <div className="lg:col-span-8"><FaqList items={homeFaqs} /></div>
        </div>
      </Section>
    </>
  );
}
