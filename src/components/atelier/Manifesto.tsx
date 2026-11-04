import Link from "next/link";
import { site, doctor } from "../../../content/site";
import { services } from "../../../content/services";
import { Img } from "@/components/ui/Img";
import { Arrow } from "@/components/ui/Button";

type Part = string | { img: string; alt: string };

const parts: Part[] = [
  "One dentist, every visit.",
  { img: "/images/office/veneer-tryin.jpg", alt: "A patient smiling in the chair" },
  "Dr. Nuriel Lavi sees every patient himself and takes the time to listen",
  { img: "/images/office/implant-model-hands.jpg", alt: "Dr. Lavi explaining a treatment on a model" },
  "before he recommends anything. Care is built around your long-term health, your comfort and your goals,",
  { img: "/images/office/treatment-room.jpg", alt: "The treatment room on Tourney Road" },
  "with modern imaging, biocompatible materials and a preference for prevention over quick fixes.",
];

/**
 * (01) Philosophy: a large statement whose words light up as you scroll
 * (dimmed only once the motion engine runs), with real photos set inline as
 * pills, followed by the numbers band (a rating ring and count-ups).
 */
export function Manifesto() {
  const plain = parts.filter((p): p is string => typeof p === "string").join(" ");
  return (
    <section className="on-dark relative overflow-clip bg-ink text-on-dark grain section-lg lg:py-40" aria-labelledby="philosophy-title">
      <div className="container-x relative">
        <p className="chapter"><b>(01)</b> Philosophy</p>
        <h2 id="philosophy-title" className="sr-only">Our philosophy</h2>
        <p className="mf mt-10 max-w-[22ch] lg:mt-14" data-words="">
          <span className="sr-only">{plain}</span>
          {parts.map((p, i) =>
            typeof p === "string" ? (
              p.split(" ").map((w, k) => (
                <span key={`${i}-${k}`} className="mw" aria-hidden="true">{w} </span>
              ))
            ) : (
              <span key={i} className="mpill" aria-hidden="true">
                <Img src={p.img} alt="" fill sizes="180px" />
              </span>
            ),
          )}
        </p>
        <div className="mt-14 flex flex-wrap items-center gap-6 lg:mt-20">
          <Link href="/about/" className="btn btn-gold btn-lg"><span className="btn-label">Meet Dr. Lavi <Arrow className="btn-arrow" /></span></Link>
          <p className="max-w-sm text-sm text-on-dark-muted">“{doctor.statement}”</p>
        </div>

        {/* Numbers */}
        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--r-lg)] border border-white/10 bg-white/10 lg:mt-28 lg:grid-cols-4">
          <div className="flex flex-col-reverse justify-center bg-ink p-6 sm:p-8">
            <dt className="mt-2 text-sm text-on-dark-muted">Google rating</dt>
            <dd className="flex items-center gap-4">
              <svg viewBox="0 0 120 120" className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" aria-hidden="true">
                <circle cx="60" cy="60" r="52" fill="none" strokeWidth="6" className="ring-track" />
                <circle cx="60" cy="60" r="52" fill="none" strokeWidth="6" className="ring-fill" pathLength={100} strokeDasharray="100" strokeDashoffset={100 - (site.google.rating / 5) * 100} data-ring={String((site.google.rating / 5) * 100)} />
              </svg>
              <span className="font-display text-6xl leading-none tabular" data-count={String(site.google.rating)}>{site.google.rating}</span>
            </dd>
          </div>
          {[
            { v: String(site.google.reviewCount), l: "Google reviews" },
            { v: String(services.length), l: "Treatments under one roof" },
            { v: "1", l: "Dentist, at every visit" },
          ].map((f) => (
            <div key={f.l} className="flex flex-col-reverse justify-center bg-ink p-6 sm:p-8">
              <dt className="mt-2 text-sm text-on-dark-muted">{f.l}</dt>
              <dd className="font-display text-6xl leading-none tabular sm:text-7xl"><span data-count={f.v}>{f.v}</span></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
