import Link from "next/link";
import { site, doctor } from "../../../content/site";
import { Photo } from "@/components/ui/Photo";
import { Arrow } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { DriftType } from "@/components/ui/Effects";

/**
 * (04) Dr. Lavi. A sticky vertical nameplate on desktop, his statement in
 * large italic, the credentials as a ruled list that draws in, and the arch.
 * Until a real portrait is supplied (doctor.portrait), the arch shows his
 * treatment room and says so; no one else is presented as him.
 */
export function DoctorChapter() {
  const hasPortrait = !!doctor.portrait;
  return (
    <section className="relative overflow-clip bg-ivory-200 text-text section-lg lg:py-40" aria-labelledby="doctor-title">
      <DriftType text="Nuriel Lavi · DDS ·" className="bottom-[2%]" drift="0,-30" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="chapter"><b>(04)</b> Your dentist</p>
            <h2 id="doctor-title" className="mt-6" data-split="">Dr. Nuriel Lavi, <em className="accent">DDS</em></h2>
            <p className="mt-4 text-sm uppercase tracking-[0.16em] text-muted">{doctor.title}</p>
            <div className="relative mt-10 w-[78%] max-w-[320px]">
              <div className="absolute -bottom-5 -right-5 left-8 top-14 rounded-[var(--r-lg)] bg-olive" aria-hidden="true" />
              <Photo src={hasPortrait ? doctor.portrait : "/images/portrait/treatment-room.jpg"} alt={hasPortrait ? doctor.portraitAlt : "Dr. Lavi's treatment room on Tourney Road"} ratio="2/3" w={320} mw={70} arch parallax={4} />
              {!hasPortrait && <p className="relative mt-8 text-xs text-muted">Dr. Lavi’s treatment room on Tourney Road</p>}
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-24">
          <blockquote className="font-display text-[clamp(2rem,1.2rem+2.6vw,3.75rem)] italic leading-[1.08]" data-split="">
            “{doctor.statement}”
          </blockquote>
          <div className="mt-12 grid gap-6 text-muted sm:grid-cols-2" data-reveal="">
            {doctor.bio.slice(0, 2).map((p) => <p key={p}>{p}</p>)}
          </div>
          <ol className="mt-14">
            {doctor.credentials.map((c, i) => (
              <li key={c} className="relative flex items-baseline gap-6 py-5" data-reveal="" style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
                <span className="absolute inset-x-0 top-0 h-px bg-sand" aria-hidden="true"><span className="block h-px w-full origin-left bg-ink" data-draw="x" /></span>
                <span className="text-xs tabular text-gold-700">0{i + 1}</span>
                <span className="font-display text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] leading-tight">{c}</span>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link href="/about/" className="btn btn-ink btn-lg"><span className="btn-label">About Dr. Lavi <Arrow className="btn-arrow" /></span></Link>
            <span className="flex items-center gap-2 text-sm text-muted"><Icon.google className="h-5 w-5" /> {site.google.rating} ★ from {site.google.reviewCount} Google reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
