import Link from "next/link";
import { offer } from "../../../content/pages";
import { Icon } from "@/components/ui/Icons";
import { Arrow } from "@/components/ui/Button";

const icons = [Icon.calendar, Icon.check, Icon.heart, Icon.sparkle];

/**
 * (05) Your first visit as a path: a curved line draws itself as you scroll,
 * a bronze dot travels along it, and each milestone lights up as the line
 * reaches it. Milestones alternate sides on desktop and sit to the right of
 * the line on phones. All text is visible without JavaScript.
 */
export function PathTimeline() {
  const n = offer.steps.length;
  return (
    <section className="relative overflow-clip bg-ivory text-text section-lg lg:py-40" aria-labelledby="path-title">
      <div className="grid-lines" aria-hidden="true" />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="chapter justify-center"><b>(05)</b> Your first visit</p>
          <h2 id="path-title" className="mt-6" data-split="">Four steps, <em className="accent">no surprises</em></h2>
          <p className="lead mx-auto mt-6 max-w-xl" data-reveal="">{offer.hero.intro}</p>
        </div>

        <div className="path-wrap relative mx-auto mt-16 max-w-5xl lg:mt-24" data-path="">
          <svg className="path-svg absolute bottom-0 left-[22px] top-0 h-full w-12 lg:left-1/2 lg:w-40 lg:-translate-x-1/2" viewBox="0 0 100 1000" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path className="track" d="M50 0 C 95 125, 5 250, 50 375 S 95 625, 50 750 S 5 925, 50 1000" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path className="draw" data-path-line="" d="M50 0 C 95 125, 5 250, 50 375 S 95 625, 50 750 S 5 925, 50 1000" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          </svg>
          <span data-path-dot="" className="absolute left-[46px] top-0 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_0_8px_rgba(212,168,114,0.25)] lg:left-1/2" aria-hidden="true" />
          <ol className="relative">
            {offer.steps.map((s, i) => {
              const I = icons[i % icons.length];
              const right = i % 2 === 1;
              return (
                <li key={s.title} className={`ms relative pb-16 pl-20 last:pb-0 lg:w-1/2 lg:pb-24 lg:pl-0 ${right ? "lg:ml-auto lg:pl-24" : "lg:pr-24 lg:text-right"}`} data-ms={String((i + 0.5) / n)}>
                  <span className={`ms-dot absolute left-[22px] top-1 flex h-12 w-12 -translate-x-0 items-center justify-center rounded-full border border-sand bg-ivory text-ink lg:top-2 ${right ? "lg:-left-6" : "lg:left-auto lg:-right-6"}`}>
                    <I className="h-5 w-5" />
                  </span>
                  <p className="text-xs tabular tracking-[0.16em] text-gold-700">STEP 0{i + 1}</p>
                  <h3 className="mt-3 text-[clamp(1.9rem,1.4rem+1.6vw,3rem)]">{s.title}</h3>
                  <p className={`mt-3 max-w-sm text-muted ${right ? "" : "lg:ml-auto"}`}>{s.text}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mx-auto mt-16 max-w-4xl text-center lg:mt-20" data-reveal="">
          <p className="text-sm uppercase tracking-[0.16em] text-muted">Included at your first visit</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {offer.includes.map((t) => <li key={t} className="rounded-full border border-sand bg-white px-4 py-2 text-sm">{t}</li>)}
          </ul>
          <Link href="/new-patient-offer/" className="btn btn-ink btn-lg mt-10"><span className="btn-label">What to expect <Arrow className="btn-arrow" /></span></Link>
        </div>
      </div>
    </section>
  );
}
