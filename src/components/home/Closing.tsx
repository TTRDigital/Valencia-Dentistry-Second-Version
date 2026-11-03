import { site } from "../../../content/site";
import { Photo } from "@/components/ui/Photo";
import { Aurora, Seal } from "@/components/ui/Effects";
import { Icon } from "@/components/ui/Icons";
import { Arrow } from "@/components/ui/Button";
import { accent } from "@/components/ui/Accent";

/** 13. Closing CTA: statement headline, rotating round "Book" button, phone/hours/address, a photo and the aurora. */
export function ClosingCta({ title = "A calmer kind of dental visit starts here", text }: { title?: string; text?: string }) {
  return (
    <section className="on-dark relative overflow-clip bg-ink text-on-dark grain section" aria-labelledby="closing-title">
      <Aurora />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow"><span className="gold-rule w-8" aria-hidden="true" />Ready when you are</p>
          <h2 id="closing-title" className="mt-5 display-xl" data-split="">{accent(title, 3)}</h2>
          {text && <p className="lead mt-6 max-w-xl" data-reveal="">{text}</p>}
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="group relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-500 hover:scale-105 active:scale-95 lg:h-40 lg:w-40" data-magnetic="" data-cursor="Book" aria-label="Book your first visit (opens the booking page)">
              <Seal id="cta-seal" className="absolute inset-2 h-auto w-auto" text="BOOK YOUR FIRST VISIT · BOOK YOUR FIRST VISIT · " />
              <Arrow className="h-7 w-7 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
            </a>
            <ul className="space-y-1 text-sm">
              <li><a href={`tel:${site.phoneE164}`} className="flex min-h-11 items-center gap-3 font-display text-2xl"><Icon.phone className="h-5 w-5 text-gold" />{site.phone}</a></li>
              <li className="flex min-h-11 items-center gap-3 text-on-dark-muted"><Icon.clock className="h-5 w-5 text-gold" />Mon–Fri 8 AM – 5 PM · Sat & Sun closed</li>
              <li><a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 text-on-dark-muted hover:text-on-dark"><Icon.pin className="h-5 w-5 text-gold" />{site.address.street}, {site.address.neighborhood}</a></li>
            </ul>
          </div>
        </div>
        <div className="lg:col-span-5 lg:flex lg:justify-end">
          <Photo src="/images/portrait/veneer-smile.jpg" alt="Patient checking her smile in a hand mirror" ratio="2/3" w={355} mw={70} arch parallax={5} className="mx-auto lg:mx-0" />
        </div>
      </div>
    </section>
  );
}
