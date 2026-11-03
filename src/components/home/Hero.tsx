import { site } from "../../../content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { Aurora, GlassBadge, Seal } from "@/components/ui/Effects";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { Mark } from "@/components/ui/Logo";
import { accent } from "@/components/ui/Accent";

const d = (ms: number) => ({ "data-reveal": "", style: { "--reveal-delay": `${ms}ms` } as React.CSSProperties });

/** 1. Full-screen hero: huge serif headline, live open pill, fanned stack of real photos that spreads on load and shifts with the cursor. */
export function HomeHero() {
  return (
    <section data-recede="" data-depth-root="" className="hero-rise on-dark relative overflow-clip bg-ink text-on-dark grain" aria-labelledby="hero-title">
      <Aurora />
      <div className="container-x relative grid min-h-[100svh] items-center gap-8 pb-16 pt-[calc(var(--hdr-h)+24px)] lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-[calc(var(--hdr-h)+var(--topbar-h)+32px)]">
        {/* Copy (second on phones) */}
        <div className="order-2 lg:order-1 lg:col-span-7" data-recede-copy="">
          <div {...d(0)} className="flex flex-wrap items-center gap-3">
            <span className="glass-dark inline-flex min-h-11 items-center rounded-full px-4">
              <OpenBadge className="text-on-dark" />
            </span>
            <span className="eyebrow">Valencia · Santa Clarita</span>
          </div>
          <h1 id="hero-title" className="mt-6 max-w-[13ch]" {...d(80)}>
            {accent("Dentistry with heart, one patient at a time", 3)}
          </h1>
          <p className="lead mt-7 max-w-xl" {...d(160)}>
            Dr. Nuriel Lavi, DDS sees every patient himself, at every visit. Holistic, integrative care with modern technology, in a quiet office on Tourney Road.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row" {...d(240)}>
            <Button href={site.bookingUrl} variant="gold" size="lg" cursor="Book">Book your first visit</Button>
            <Button href={`tel:${site.phoneE164}`} variant="outline" size="lg" icon={<Icon.phone className="h-4 w-4" />}>{site.phone}</Button>
          </div>
          <div className="mt-14 hidden items-center gap-4 lg:flex" {...d(320)}>
            <span className="scroll-cue" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-on-dark-muted">Scroll</span>
          </div>
        </div>

        {/* Fanned photo stack (first on phones) */}
        <div className="order-1 lg:order-2 lg:col-span-5" data-recede-media="">
          <div className="fan relative mx-auto h-[400px] w-full max-w-[360px] sm:h-[480px] sm:max-w-[440px] lg:h-[640px] lg:max-w-[560px]">
            <div className="absolute left-0 top-[6%] w-[62%]" data-depth="0.012">
              <div className="fan-left -rotate-[8deg] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                <Photo src="/images/office/treatment-room.jpg" alt="Treatment room with a dental chair, monitors and large arched windows" w={350} mw={56} wipe={false} position="50% 50%" frameClassName="ring-1 ring-white/10" />
              </div>
            </div>
            <div className="absolute right-0 top-[34%] w-[58%]" data-depth="0.022">
              <div className="fan-right rotate-[7deg] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                <Photo src="/images/office/scan-closeup.jpg" alt="Digital intraoral scan of a patient's teeth shown on a monitor" w={330} mw={52} wipe={false} position="50% 50%" frameClassName="ring-1 ring-white/10" />
              </div>
            </div>
            <div className="absolute bottom-0 left-[21%] w-[56%]" data-depth="0.04">
              <div className="fan-front shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]">
                <Photo src="/images/portrait/veneer-tryin.jpg" alt="Patient smiling in the dental chair during a cosmetic visit" ratio="2/3" w={314} mw={50} arch wipe={false} priority />
              </div>
            </div>
            {/* Floating glass badges */}
            <div className="absolute -left-1 bottom-[14%] z-10 sm:left-0" data-depth="0.05">
              <GlassBadge className="float-a flex items-center gap-3">
                <Icon.google className="h-6 w-6" />
                <span className="leading-tight">
                  <span className="flex items-center gap-1 font-display text-xl">{site.google.rating}<span className="flex text-gold-700">{[0, 1, 2, 3, 4].map((k) => <Icon.star key={k} className="h-3.5 w-3.5" />)}</span></span>
                  <span className="block text-xs text-muted">{site.google.reviewCount} Google reviews</span>
                </span>
              </GlassBadge>
            </div>
            <div className="absolute -right-1 top-[18%] z-10 sm:right-0" data-depth="0.035">
              <GlassBadge className="float-b flex items-center gap-2.5">
                <Icon.shield className="h-5 w-5 text-olive" />
                <span className="text-sm font-semibold leading-tight">Most PPO plans<span className="block text-xs font-normal text-muted">accepted</span></span>
              </GlassBadge>
            </div>
            <div className="absolute -top-2 right-[10%] z-10 hidden text-gold sm:block lg:right-[16%]" data-depth="0.03">
              <Seal id="hero-seal" className="relative h-28 w-28 lg:h-[132px] lg:w-[132px]">
                <Mark className="h-9 w-auto" tone="light" />
              </Seal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
