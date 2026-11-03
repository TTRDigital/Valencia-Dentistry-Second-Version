"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icons";
import type { Testimonial } from "../../../content/types";

/** 9. Reviews: one large quote panel (real reviews, as written) with a switcher. */
export function ReviewPanel({ reviews }: { reviews: Testimonial[] }) {
  const [i, setI] = useState(0);
  const r = reviews[i];
  return (
    <figure className="relative flex h-full flex-col justify-between rounded-[var(--r-lg)] border border-white/10 bg-white/[0.04] p-7 sm:p-10 lg:p-14">
      <Icon.quote className="h-10 w-10 text-gold" />
      <blockquote key={r.id} className="mt-6 font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.6rem)] font-light leading-[1.2] tracking-[-0.01em]" aria-live="polite">
        “{r.text}”
      </blockquote>
      <figcaption className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <span className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-display text-lg text-ink" aria-hidden="true">{r.name.split(" ").map((p) => p[0]).join("")}</span>
          <span>
            <span className="block font-semibold">{r.name}</span>
            <span className="flex items-center gap-2 text-sm text-on-dark-muted">
              <span className="flex text-gold" aria-label={`${r.rating} out of 5 stars`}>{Array.from({ length: r.rating }).map((_, k) => <Icon.star key={k} className="h-3.5 w-3.5" />)}</span>
              Google review{r.service ? ` · ${r.service}` : ""}
            </span>
          </span>
        </span>
        {reviews.length > 1 && (
          <span className="flex gap-2">
            {reviews.map((x, k) => (
              <button key={x.id} type="button" onClick={() => setI(k)} aria-pressed={k === i} aria-label={`Show review by ${x.name}`} className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition ${k === i ? "border-gold bg-gold text-ink" : "border-white/25 hover:border-gold"}`}>
                {k + 1}
              </button>
            ))}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
