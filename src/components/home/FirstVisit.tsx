import { offer } from "../../../content/pages";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { accent } from "@/components/ui/Accent";

const photos = [
  { src: "/images/office/treatment-room.jpg", alt: "Treatment room with a dental chair, monitors and large arched windows", pos: "50% 50%" },
  { src: "/images/office/veneer-tryin.jpg", alt: "Patient smiling in the dental chair during a visit", pos: "40% 20%" },
  { src: "/images/office/scan-closeup.jpg", alt: "Digital intraoral scan of a patient's teeth shown on a monitor", pos: "50% 30%" },
  { src: "/images/office/implant-model-hands.jpg", alt: "Dentist explaining a treatment on a model", pos: "50% 30%" },
];

/**
 * 7. Your first visit, as a scroll story: a sticky photo changes per step
 * (crossfade + settle) while a timeline line draws down and steps light up.
 * On phones the photo stays pinned at the top while the steps scroll under it.
 */
export function HomeFirstVisit() {
  return (
    <section className="on-dark relative bg-olive-900 text-on-dark grain section" aria-labelledby="visit-story-title">
      <div className="container-x relative">
        <div className="max-w-3xl">
          <p className="eyebrow"><span className="gold-rule w-8" aria-hidden="true" />Your first visit</p>
          <h2 id="visit-story-title" className="mt-5" data-split="">{accent("Four simple steps, no surprises", 2)}</h2>
          <p className="lead mt-6" data-reveal="">{offer.hero.intro}</p>
        </div>

        <div data-story="" className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Sticky photo: top of the screen on phones, beside the steps on desktop */}
          <div className="sticky top-[calc(var(--hdr-h)-1px)] z-10 -mx-4 bg-olive-900 px-4 pb-4 pt-3 lg:top-[calc(var(--hdr-h)+48px)] lg:col-span-6 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0">
            <div className="frame relative aspect-[3/2] w-full max-w-[640px]">
              {photos.map((p, i) => (
                <div key={p.src} data-story-photo="" className="absolute inset-0" style={i ? { opacity: 0, visibility: "hidden" } : undefined}>
                  <Img src={p.src} alt={i ? "" : p.alt} fill sizes="(max-width: 1023px) 92vw, 640px" style={{ objectPosition: p.pos }} />
                </div>
              ))}
            </div>
          </div>

          <ol className="relative lg:col-span-6">
            <span className="absolute bottom-6 left-[19px] top-6 w-px bg-white/15" aria-hidden="true">
              <span data-story-line="" className="block h-full w-px origin-top bg-gold" />
            </span>
            {offer.steps.map((s, i) => (
              <li key={s.title} data-story-step="" data-active={i === 0 ? "" : undefined} className="story-step relative flex gap-6 pb-14 last:pb-0 lg:min-h-[44vh] lg:pb-0">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-olive-900 font-display text-lg tabular">{i + 1}</span>
                <div className="pt-1">
                  <h3 className="font-display text-[clamp(1.6rem,1.3rem+1vw,2.25rem)] leading-tight">{s.title}</h3>
                  <p className="mt-3 max-w-md text-on-dark-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row lg:mt-4">
          <Button href="/new-patient-offer/" variant="gold">What to expect</Button>
        </div>
      </div>
    </section>
  );
}
