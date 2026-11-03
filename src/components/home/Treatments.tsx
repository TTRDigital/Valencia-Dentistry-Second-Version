import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { Arrow } from "@/components/ui/Button";
import { accent } from "@/components/ui/Accent";

const cards = [
  { name: "Dental implants", text: "Replace one tooth or many, planned in 3D.", href: "/services/dental-implants/", image: "/images/office/implant-model-hands.jpg", alt: "Dentist showing a patient how an implant and crown fit on a model", pos: "50% 30%" },
  { name: "Veneers", text: "Thin shells that cover chips, gaps and stains.", href: "/services/cosmetic-dentistry/veneers/", image: "/images/office/veneer-smile.jpg", alt: "Patient checking her smile in a hand mirror", pos: "40% 20%" },
  { name: "Invisalign", text: "Clear, removable aligners from a digital scan.", href: "/services/cosmetic-dentistry/invisalign/", image: "/images/office/aligner-patient.jpg", alt: "Smiling patient holding a clear aligner and its case", pos: "50% 20%" },
  { name: "Same-day crowns", text: "Custom crowns designed and made in house.", href: "/services/dental-crowns/", image: "/images/office/scan-closeup.jpg", alt: "Digital intraoral scan of a patient's teeth shown on a monitor", pos: "55% 30%" },
  { name: "Teeth whitening", text: "Lift everyday stains, tailored to your sensitivity.", href: "/services/cosmetic-dentistry/teeth-whitening/", image: "/images/office/aligner-patient-2.jpg", alt: "Patient smiling while placing a clear aligner", pos: "45% 20%" },
  { name: "All-on-4", text: "A full arch of fixed teeth on four implants.", href: "/services/oral-surgery/all-on-4-implants/", image: "/images/office/denture-closeup.jpg", alt: "Close-up of a full-arch implant denture model", pos: "50% 40%" },
  { name: "Preventive care", text: "Cleanings and exams that keep problems small.", href: "/services/preventive-dentistry/", image: "/images/office/cleaning.jpg", alt: "Hygienist cleaning a patient's teeth in a bright treatment room", pos: "30% 20%" },
  { name: "Holistic dentistry", text: "Biocompatible, mercury-free, whole-body care.", href: "/services/holistic-dentistry/", image: "/images/office/treatment-room.jpg", alt: "Treatment room with a dental chair, monitors and large arched windows", pos: "50% 50%" },
];

/**
 * 5. Treatments: a pinned horizontal gallery. Vertical scroll slides the
 * square cards sideways, with a progress bar and an "01 / 08" counter.
 * Without JavaScript, or with reduced motion, it is a native swipe row.
 */
export function HomeTreatments() {
  const total = String(cards.length).padStart(2, "0");
  return (
    <section data-hscroll="" className="hscroll on-dark relative overflow-clip bg-ink text-on-dark grain" aria-labelledby="treatments-title">
      <div className="flex min-h-[100svh] flex-col justify-center py-16 lg:py-20">
        <div className="container-x flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow"><span className="gold-rule w-8" aria-hidden="true" />Treatments</p>
            <h2 id="treatments-title" className="mt-5 max-w-2xl" data-split="">{accent("Everything your smile needs, under one roof", 3)}</h2>
          </div>
          <div className="flex items-center gap-5">
            <span className="font-display text-2xl tabular" aria-hidden="true"><span data-hscroll-index="">01</span> <span className="text-on-dark-muted">/ {total}</span></span>
            <Link href="/services/" className="btn btn-outline btn-sm"><span className="btn-label">All services <Arrow className="btn-arrow" /></span></Link>
          </div>
        </div>
        <div className="hscroll-viewport mt-10 lg:mt-14">
          <ul data-hscroll-track="" className="flex w-max gap-4 px-[max(1rem,calc((100vw-84rem)/2+2.5rem))] lg:gap-6">
            {cards.map((c, i) => (
              <li key={c.href} className="w-[78vw] max-w-[440px] shrink-0 sm:w-[46vw] lg:w-[min(30vw,440px)]">
                <Link href={c.href} className="group relative block" data-cursor="View">
                  <div className="frame relative aspect-square">
                    <Img src={c.image} alt={c.alt} fill sizes="(max-width: 639px) 117vw, (max-width: 1023px) 69vw, 660px" className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" style={{ objectPosition: c.pos }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" aria-hidden="true" />
                    <span className="absolute left-5 top-4 font-display text-lg text-white/85 tabular">{String(i + 1).padStart(2, "0")}</span>
                    <div className="absolute inset-x-5 bottom-5 text-white">
                      <h3 className="font-display text-[clamp(1.6rem,1.3rem+1vw,2.2rem)] leading-tight">{c.name}</h3>
                      <p className="mt-1 max-w-[30ch] text-sm text-white/80">{c.text}</p>
                    </div>
                    <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-gold group-hover:text-ink" aria-hidden="true"><Arrow /></span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-x mt-10">
          <div className="h-px w-full bg-white/15" aria-hidden="true">
            <div data-hscroll-bar="" className="h-px origin-left scale-x-0 bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
