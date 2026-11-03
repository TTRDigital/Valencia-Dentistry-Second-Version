import { site, doctor } from "../../../content/site";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { DriftType, GlassBadge } from "@/components/ui/Effects";
import { accent } from "@/components/ui/Accent";

/**
 * 6. Meet Dr. Lavi: a whole portrait in an arch, an offset colour block,
 * proof badges, and his name in giant outline type drifting behind.
 * Until a real portrait of Dr. Lavi is supplied (content/site.ts →
 * doctor.portrait), the arch shows the practice's own treatment room and
 * says so; no other person is presented as him.
 */
export function HomeDoctor() {
  const hasPortrait = !!doctor.portrait;
  const src = hasPortrait ? doctor.portrait : "/images/portrait/treatment-room.jpg";
  const alt = hasPortrait ? doctor.portraitAlt : "Dr. Lavi's treatment room on Tourney Road, with a dental chair and arched windows";
  return (
    <section className="relative overflow-clip bg-ivory-200 text-text section" aria-labelledby="doctor-title">
      <DriftType text="Nuriel Lavi" className="top-[6%]" drift="4,-30" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative mx-auto w-full max-w-[355px] lg:col-span-5 lg:mx-0 lg:max-w-none">
          <div className="relative mx-auto w-[78%] max-w-[340px] sm:w-[300px] lg:w-[340px]">
            <div className="absolute -right-6 -bottom-6 top-16 left-10 rounded-[var(--r-lg)] bg-olive" aria-hidden="true" />
            <Photo src={src} alt={alt} ratio="2/3" w={340} mw={72} arch parallax={4} />
            <GlassBadge className="absolute -left-6 bottom-10 flex items-center gap-3 sm:-left-12">
              <Icon.google className="h-6 w-6" />
              <span className="leading-tight"><span className="font-display text-xl">{site.google.rating} ★</span><span className="block text-xs text-muted">{site.google.reviewCount} Google reviews</span></span>
            </GlassBadge>
            {!hasPortrait && <p className="mt-4 text-center text-xs text-muted">Our treatment room on Tourney Road</p>}
          </div>
        </div>
        <div className="lg:col-span-7">
          <p className="eyebrow" data-reveal=""><span className="gold-rule w-8" aria-hidden="true" />Meet your dentist</p>
          <h2 id="doctor-title" className="mt-5" data-split="">{accent("Dr. Nuriel Lavi, DDS", 2)}</h2>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-muted" data-reveal="">{doctor.title}</p>
          <blockquote className="mt-8 border-l-2 border-gold pl-6 font-display text-[clamp(1.4rem,1.1rem+1vw,2rem)] italic leading-snug text-ink-700" data-reveal="">
            “{doctor.statement}”
          </blockquote>
          <div className="mt-8 space-y-4 text-muted" data-reveal="">
            {doctor.bio.slice(0, 2).map((p) => <p key={p}>{p}</p>)}
          </div>
          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {doctor.credentials.map((c, i) => (
              <li key={c} className="flex items-start gap-3 rounded-[var(--r-sm)] border border-sand bg-ivory px-4 py-3.5 text-sm font-medium" data-reveal="" style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive text-white"><Icon.check className="h-3.5 w-3.5" /></span>
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/about/" variant="ink">About Dr. Lavi</Button>
            <Button href={site.bookingUrl} variant="outline" cursor="Book">Book a consultation</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
