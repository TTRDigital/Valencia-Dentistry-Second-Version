import { Img } from "./Img";
import { Mark } from "./Logo";

/**
 * Doctor visual. Shows the portrait when one is configured; otherwise a
 * quiet branded card with the practice mark (no stand-in photo of anyone).
 */
export function DoctorCard({ name, title, portrait, portraitAlt, className = "", sizes = "(min-width: 1024px) 36vw, 90vw", priority }: { name: string; title: string; portrait?: string; portraitAlt?: string; className?: string; sizes?: string; priority?: boolean }) {
  if (portrait) {
    return (
      <div className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 ${className}`}>
        <Img src={portrait} alt={portraitAlt || name} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    );
  }
  return (
    <div className={`grain relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl bg-ink p-8 text-on-dark on-dark lg:p-10 ${className}`}>
      <Mark tone="light" className="h-16 w-auto self-start opacity-90" />
      <div>
        <span className="gold-rule" aria-hidden="true" />
        <p className="mt-5 font-display text-3xl leading-tight lg:text-4xl">{name}</p>
        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-on-dark-muted">{title}</p>
      </div>
    </div>
  );
}
