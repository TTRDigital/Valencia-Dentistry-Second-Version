"use client";

import { useState } from "react";
import { Icon, TechIcon } from "@/components/ui/Icons";
import type { TechKey } from "../../../content/types";

type Tech = { key: TechKey; name: string; text: string; benefit: string };

/**
 * 11. Technology: a dark grid with a cursor-following spotlight (desktop) and
 * a "What this means for you" reveal on hover, focus or tap. On phones it is
 * a swipe carousel.
 */
export function TechGrid({ items }: { items: Tech[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul data-spotlight="" data-reveal="" className="spotlight scrollbar-none -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-4">
      {items.map((t, i) => {
        const isOpen = open === t.key;
        return (
          <li key={t.key} className="group relative w-[80vw] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none">
            <div className="card-dark relative flex h-full min-h-[300px] flex-col overflow-hidden p-6 transition-colors duration-500 hover:border-gold/40 lg:min-h-[320px]">
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-gold"><TechIcon k={t.key} className="h-6 w-6" /></span>
                <span className="font-display text-sm text-on-dark-muted tabular">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl leading-tight">{t.name}</h3>
              <p className="mt-3 text-sm text-on-dark-muted">{t.text}</p>
              <button
                type="button"
                className="mt-auto flex min-h-11 items-center gap-2 pt-5 text-left text-sm font-semibold text-gold"
                aria-expanded={isOpen}
                aria-controls={`tech-${t.key}`}
                onClick={() => setOpen(isOpen ? null : t.key)}
              >
                What this means for you <Icon.plus className={`h-4 w-4 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} />
              </button>
              <div
                id={`tech-${t.key}`}
                className={`absolute inset-x-0 bottom-0 bg-gold p-6 text-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-y-0" : "translate-y-full lg:group-hover:translate-y-0 lg:group-focus-within:translate-y-0"}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em]">What this means for you</p>
                <p className="mt-2 font-display text-xl leading-snug">{t.benefit}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
