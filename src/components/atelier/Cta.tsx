import { site } from "../../../content/site";
import { Aurora, Seal } from "@/components/ui/Effects";
import { Icon } from "@/components/ui/Icons";
import { Arrow } from "@/components/ui/Button";

/** (12) Let's begin: giant letters that lean toward the cursor, a rotating round Book button and contact details. */
export function BeginCta({ title = "Let’s begin.", text, n }: { title?: string; text?: string; n?: string }) {
  const words = title.split(" ");
  return (
    <section className="on-dark relative overflow-clip bg-ink text-on-dark grain section-lg lg:py-40" aria-labelledby="begin-title">
      <Aurora />
      <div className="container-x relative">
        <p className="chapter">{n && <b>({n})</b>} Ready when you are</p>
        <h2 id="begin-title" className="mt-8 display-giant">
          <span className="sr-only">{title}</span>
          <span className="mag-letters" data-magnet="" aria-hidden="true">
            {words.map((w, wi) => (
              <span key={wi} className={`inline-block whitespace-nowrap ${wi === words.length - 1 ? "accent" : ""}`}>
                {w.split("").map((ch, ci) => <span key={ci}>{ch}</span>)}
                {wi < words.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </span>
        </h2>
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            {text && <p className="lead max-w-lg">{text}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-8 lg:col-span-6 lg:justify-end">
            <ul className="space-y-1 text-sm">
              <li><a href={`tel:${site.phoneE164}`} className="flex min-h-11 items-center gap-3 font-display text-3xl"><Icon.phone className="h-5 w-5 text-gold" />{site.phone}</a></li>
              <li className="flex min-h-11 items-center gap-3 text-on-dark-muted"><Icon.clock className="h-5 w-5 text-gold" />Mon–Fri 8 AM – 5 PM</li>
            </ul>
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="group relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-500 hover:scale-105 active:scale-95 lg:h-44 lg:w-44" data-magnetic="" data-cursor="Book" aria-label="Book your first visit (opens the booking page)">
              <Seal id="cta-seal" className="absolute inset-2 h-auto w-auto" text="BOOK YOUR FIRST VISIT · BOOK YOUR FIRST VISIT · " />
              <Arrow className="h-8 w-8 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
