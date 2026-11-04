import { site } from "../../../content/site";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { Seal } from "@/components/ui/Effects";
import { Mark } from "@/components/ui/Logo";

const strip = [
  { src: "/images/portrait/veneer-tryin.jpg", alt: "Patient smiling in the dental chair during a cosmetic visit" },
  { src: "/images/portrait/implant-model-hands.jpg", alt: "Dentist showing a patient how an implant and crown fit on a model" },
  { src: "/images/portrait/aligner-patient.jpg", alt: "Smiling patient holding a clear aligner and its case" },
  { src: "/images/portrait/treatment-room.jpg", alt: "Treatment room with a dental chair and arched windows" },
  { src: "/images/portrait/veneer-smile.jpg", alt: "Patient checking her smile in a hand mirror" },
];

const line = (text: React.ReactNode, d: number) => (
  <span className="mline">
    <span style={{ "--d": `${d}ms` } as React.CSSProperties}>{text}</span>
  </span>
);
const rv = (ms: number) => ({ "data-reveal": "", style: { "--reveal-delay": `${ms}ms` } as React.CSSProperties });

/**
 * Atelier hero: a giant editorial headline whose lines rise out of masks, a
 * vertical filmstrip of the practice's own photos running inside an arch,
 * and a contact bar. The headline is the LCP element (CSS animation only).
 */
export function AtelierHero() {
  return (
    <section data-recede="" className="hero-rise relative overflow-clip bg-ivory text-text" aria-labelledby="hero-title">
      <div className="grid-lines" aria-hidden="true" />
      <div className="container-x relative flex min-h-[100svh] flex-col pb-8 pt-[calc(var(--hdr-h)+20px)] lg:pt-[calc(var(--hdr-h)+var(--topbar-h)+28px)]">
        <div className="flex flex-wrap items-center justify-between gap-4" {...rv(0)}>
          <p className="chapter"><b>(00)</b> Valencia · Santa Clarita</p>
          <span className="inline-flex min-h-11 items-center rounded-full border border-sand bg-white/60 px-4"><OpenBadge /></span>
        </div>

        <div className="relative mt-8 grid flex-1 items-end gap-10 lg:mt-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8" data-recede-copy="">
            <h1 id="hero-title" className="text-[clamp(3.4rem,1rem+9.6vw,10.5rem)] leading-[0.88]">
              {line("Dentistry with", 0)}
              {line("heart, one patient", 110)}
              {line(<em className="accent">at a time.</em>, 220)}
            </h1>
            <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end lg:mt-12">
              <p className="lead max-w-md" {...rv(380)}>
                Dr. Nuriel Lavi, DDS sees every patient himself, at every visit. Holistic, integrative care with modern technology, in a quiet office on Tourney Road.
              </p>
              <div className="flex flex-col gap-3 sm:items-end" {...rv(460)}>
                <Button href={site.bookingUrl} variant="ink" size="lg" cursor="Book">Book your first visit</Button>
                <a href={`tel:${site.phoneE164}`} className="text-link min-h-11 justify-end"><Icon.phone className="h-4 w-4" /> {site.phone}</a>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[240px] sm:max-w-[300px] lg:col-span-4 lg:mx-0 lg:ml-auto lg:max-w-[340px]" data-recede-media="">
            <div className="filmstrip arch aspect-[2/3] w-full bg-ivory-200 shadow-[0_40px_80px_-40px_rgba(15,15,13,0.55)]" aria-label="Photos from the practice" role="img">
              <div className="filmstrip-track">
                {[...strip, ...strip].map((p, i) => (
                  <div key={i} className="relative aspect-[2/3] w-full shrink-0 overflow-hidden" aria-hidden="true">
                    <Img src={p.src} alt="" fill sizes="(max-width: 639px) 240px, (max-width: 1023px) 300px, 340px" priority={i === 0} loading={i < 2 ? "eager" : "lazy"} />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -left-6 bottom-10 z-10 sm:-left-12" {...rv(600)}>
              <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
                <Icon.google className="h-6 w-6" />
                <span className="leading-tight">
                  <span className="flex items-center gap-1 font-display text-2xl">{site.google.rating}<span className="flex text-gold-700" role="img" aria-label={`${site.google.rating} out of 5 stars`}>{[0, 1, 2, 3, 4].map((k) => <Icon.star key={k} className="h-3.5 w-3.5" />)}</span></span>
                  <span className="block text-xs text-muted">{site.google.reviewCount} Google reviews</span>
                </span>
              </div>
            </div>
            <div className="absolute -right-4 -top-6 z-10 hidden text-ink-700 sm:block" {...rv(700)}>
              <Seal id="hero-seal" className="relative h-28 w-28 rounded-full bg-ivory lg:h-32 lg:w-32">
                <Mark className="h-8 w-auto" />
              </Seal>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-3 border-t border-sand pt-5 text-sm text-muted sm:grid-cols-3" {...rv(760)}>
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 hover:text-text"><Icon.pin className="h-4 w-4 text-gold-700" />{site.address.street}, {site.address.neighborhood}</a>
          <span className="flex min-h-11 items-center gap-2 sm:justify-center"><Icon.clock className="h-4 w-4 text-gold-700" />Mon–Fri 8 AM – 5 PM</span>
          <span className="flex min-h-11 items-center gap-2 sm:justify-end"><span className="scroll-cue" style={{ height: 32, background: "rgba(15,15,13,0.15)" }} aria-hidden="true" />Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
