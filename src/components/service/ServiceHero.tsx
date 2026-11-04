import { site } from "../../../content/site";
import type { Service } from "../../../content/types";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import type { SvcPhoto } from "./photos";

const rv = (ms: number) => ({ "data-reveal": "", style: { "--reveal-delay": `${ms}ms` } as React.CSSProperties });

/** Splits a title so its last two words can sit on their own italic line. */
function titleLines(t: string) {
  const w = t.split(" ");
  return w.length > 3 ? [w.slice(0, -2).join(" "), w.slice(-2).join(" ")] : [t, ""];
}

/**
 * Editorial service hero: breadcrumbs, a giant title whose lines rise from
 * masks, then a three-column row (lead and booking, the treatment's own
 * photo in its own ratio, and quick facts).
 */
export function ServiceHero({ s, crumbs, photos }: { s: Service; crumbs: Crumb[]; photos: SvcPhoto[] }) {
  const [lead] = photos;
  const [a, b] = titleLines(s.hero.title);
  return (
    <section data-recede="" className="hero-rise relative overflow-clip bg-ivory text-text" aria-labelledby="svc-title">
      <div className="grid-lines" aria-hidden="true" />
      <div className="container-x relative pb-16 pt-[calc(var(--hdr-h)+20px)] lg:pb-24 lg:pt-[calc(var(--hdr-h)+var(--topbar-h)+28px)]">
        <div className="flex flex-wrap items-center justify-between gap-3" {...rv(0)}>
          <Breadcrumbs items={crumbs} />
          <p className="chapter"><b>(S)</b> {s.hero.eyebrow}</p>
        </div>
        <h1 id="svc-title" className="mt-8 text-[clamp(3rem,1rem+7.4vw,8.75rem)] leading-[0.9]" data-recede-copy="">
          <span className="mline"><span>{a}</span></span>
          {b && <span className="mline"><span style={{ "--d": "120ms" } as React.CSSProperties}><em className="accent">{b}</em></span></span>}
        </h1>
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4" {...rv(240)}>
            <p className="lead">{s.hero.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href={site.bookingUrl} variant="ink" size="lg" cursor="Book">Book a consultation</Button>
              <Button href={`tel:${site.phoneE164}`} variant="outline" size="lg" icon={<Icon.phone className="h-4 w-4" />}>{site.phone}</Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted"><Icon.google className="h-5 w-5" /> {site.google.rating} ★ · {site.google.reviewCount} Google reviews · {site.insurance}</p>
          </div>
          <div className="lg:col-span-5" data-recede-media="">
            {lead && <Photo src={lead.src} alt={lead.alt} w={600} mw={92} wipe={false} priority position="50% 30%" className="mx-auto" />}
          </div>
          <dl className="grid gap-px self-end overflow-hidden rounded-[var(--r-md)] border border-sand bg-sand lg:col-span-3" {...rv(360)}>
            {(s.overview.highlights ?? []).slice(0, 3).map((h, i) => (
              <div key={h.title} className="flex flex-col-reverse gap-1 bg-ivory p-5">
                <dd className="text-sm text-muted">{h.text}</dd>
                <dt className="flex items-baseline gap-3 font-display text-xl leading-tight"><span className="text-xs tabular text-gold-700">0{i + 1}</span>{h.title}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
