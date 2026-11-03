import { site } from "../../../content/site";
import type { Service } from "../../../content/types";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { Aurora, GlassBadge } from "@/components/ui/Effects";
import { accent } from "@/components/ui/Accent";
import type { SvcPhoto } from "./photos";

const d = (ms: number) => ({ "data-reveal": "", style: { "--reveal-delay": `${ms}ms` } as React.CSSProperties });

/**
 * Dark service hero: breadcrumbs, headline with italic accent, and a fanned
 * stack of the treatment's own photos. Landscape-aware: when the lead photo
 * has a head-safe 2:3 crop it stands in front in an arch; otherwise a large
 * landscape print leads.
 */
export function ServiceHero({ s, crumbs, photos }: { s: Service; crumbs: Crumb[]; photos: SvcPhoto[] }) {
  const [lead, b1, b2] = photos;
  const arch = !!lead?.portrait;
  return (
    <section data-recede="" data-depth-root="" className="hero-rise on-dark relative overflow-clip bg-ink text-on-dark grain" aria-labelledby="svc-title">
      <Aurora />
      <div className="container-x relative grid items-center gap-10 pb-28 pt-[calc(var(--hdr-h)+20px)] lg:grid-cols-12 lg:gap-12 lg:pb-36 lg:pt-[calc(var(--hdr-h)+var(--topbar-h)+28px)]">
        <div className="order-2 lg:order-1 lg:col-span-7" data-recede-copy="">
          <div {...d(0)}><Breadcrumbs items={crumbs} light /></div>
          <p className="eyebrow mt-5" {...d(40)}><span className="gold-rule w-8" aria-hidden="true" />{s.hero.eyebrow}</p>
          <h1 id="svc-title" className="mt-5 text-[clamp(2.6rem,1.4rem+4.2vw,5.25rem)]" {...d(80)}>{accent(s.hero.title, 2)}</h1>
          <p className="lead mt-6 max-w-2xl" {...d(160)}>{s.hero.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row" {...d(240)}>
            <Button href={site.bookingUrl} variant="gold" size="lg" cursor="Book">Book a consultation</Button>
            <Button href={`tel:${site.phoneE164}`} variant="outline" size="lg" icon={<Icon.phone className="h-4 w-4" />}>{site.phone}</Button>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5" data-recede-media="">
          <div className="fan relative mx-auto h-[320px] w-full max-w-[380px] sm:h-[420px] sm:max-w-[460px] lg:h-[520px] lg:max-w-[520px]">
            {b1 && (
              <div className="absolute left-0 top-[4%] w-[60%]" data-depth="0.012">
                <div className="fan-left -rotate-[7deg] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                  <Photo src={b1.src} alt={b1.alt} w={320} mw={56} wipe={false} position="50% 30%" frameClassName="ring-1 ring-white/10" />
                </div>
              </div>
            )}
            {b2 && (
              <div className={`absolute right-0 w-[56%] ${arch ? "top-[30%]" : "top-[8%]"}`} data-depth="0.022">
                <div className="fan-right rotate-[6deg] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                  <Photo src={b2.src} alt={b2.alt} w={300} mw={52} wipe={false} position="50% 30%" frameClassName="ring-1 ring-white/10" />
                </div>
              </div>
            )}
            {lead &&
              (arch ? (
                <div className="absolute bottom-0 left-[23%] w-[52%]" data-depth="0.04">
                  <div className="fan-front shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]">
                    <Photo src={lead.portrait!} alt={lead.alt} ratio="2/3" w={270} mw={44} arch wipe={false} priority />
                  </div>
                </div>
              ) : (
                <div className="absolute bottom-[4%] left-[8%] w-[84%]" data-depth="0.035">
                  <div className="fan-front shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]">
                    <Photo src={lead.src} alt={lead.alt} w={440} mw={78} wipe={false} priority position="50% 30%" frameClassName="ring-1 ring-white/15" />
                  </div>
                </div>
              ))}
            <div className="absolute -left-1 bottom-[10%] z-10 sm:-left-4" data-depth="0.05">
              <GlassBadge className="float-a flex items-center gap-3">
                <Icon.google className="h-6 w-6" />
                <span className="leading-tight"><span className="font-display text-lg">{site.google.rating} ★</span><span className="block text-xs text-muted">{site.google.reviewCount} Google reviews</span></span>
              </GlassBadge>
            </div>
            <div className="absolute -right-1 top-[2%] z-10 sm:-right-3" data-depth="0.035">
              <GlassBadge className="float-b flex items-center gap-2.5">
                <Icon.shield className="h-5 w-5 text-olive" />
                <span className="text-sm font-semibold leading-tight">Most PPO plans<span className="block text-xs font-normal text-muted">accepted</span></span>
              </GlassBadge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
