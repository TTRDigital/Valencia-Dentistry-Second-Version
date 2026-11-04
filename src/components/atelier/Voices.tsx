import Link from "next/link";
import { site, testimonials } from "../../../content/site";
import { Icon } from "@/components/ui/Icons";
import { Arrow } from "@/components/ui/Button";

/** (07) Voices: the two real Google reviews, as written; their words fill in as you scroll. */
export function Voices() {
  return (
    <section className="relative overflow-clip bg-ivory text-text section-lg lg:py-40" aria-labelledby="voices-title">
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="chapter"><b>(07)</b> Voices</p>
            <h2 id="voices-title" className="mt-6" data-split="">In our patients’ <em className="accent">words</em></h2>
          </div>
          <div className="flex items-center gap-5 rounded-full border border-sand bg-white px-6 py-4">
            <Icon.google className="h-7 w-7" />
            <span className="font-display text-4xl leading-none">{site.google.rating}</span>
            <span className="text-sm leading-tight text-muted"><span className="flex text-gold-700" role="img" aria-label={`${site.google.rating} out of 5 stars`}>{[0, 1, 2, 3, 4].map((k) => <Icon.star key={k} className="h-4 w-4" />)}</span>{site.google.reviewCount} Google reviews</span>
          </div>
        </div>
        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {testimonials.map((t, i) => (
            <figure key={t.id} className={`max-w-5xl ${i % 2 ? "lg:ml-auto lg:text-right" : ""}`}>
              <blockquote className="mf" data-words="">
                <span className="sr-only">{t.text}</span>
                <span aria-hidden="true" className="mw">“</span>
                {t.text.split(" ").map((w, k) => <span key={k} className="mw" aria-hidden="true">{w} </span>)}
                <span aria-hidden="true" className="mw">”</span>
              </blockquote>
              <figcaption className={`mt-8 flex items-center gap-4 ${i % 2 ? "lg:justify-end" : ""}`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-display text-lg text-white" aria-hidden="true">{t.name.split(" ").map((p) => p[0]).join("")}</span>
                <span className="text-left"><span className="block font-medium">{t.name}</span><span className="text-sm text-muted">Google review{t.service ? ` · ${t.service}` : ""}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
        <Link href="/testimonials/" className="text-link mt-16 min-h-11">Read more reviews <Arrow className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
