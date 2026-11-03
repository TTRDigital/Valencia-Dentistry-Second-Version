"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Img } from "@/components/ui/Img";
import { Arrow } from "@/components/ui/Button";

export type Choice = { key: string; label: string; title: string; text: string; href: string; cta: string; image: string; imageAlt: string; position?: string };

/**
 * 4. "What's bringing you in?" Large serif choices with an underline sweep;
 * the answer panel's real photo crossfades per choice. On phones, choosing
 * scrolls to the answer. Every answer is a plain link, so it works as a list
 * of destinations without JavaScript.
 */
export function Picker({ choices }: { choices: Choice[] }) {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const c = choices[active];

  const choose = (i: number) => {
    setActive(i);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = (panel.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 88;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <ul className="lg:col-span-6" aria-label="Choose what brings you in">
        {choices.map((ch, i) => (
          <li key={ch.key} className="border-b border-sand first:border-t">
            <button
              type="button"
              onClick={() => choose(i)}
              aria-pressed={i === active}
              aria-controls="picker-answer"
              className="group flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left lg:py-5"
            >
              <span className="flex items-baseline gap-4">
                <span className="w-7 shrink-0 text-xs font-semibold tabular text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className={`sweep pb-1 font-display text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] leading-[1.05] transition-colors ${i === active ? "text-ink-700" : "text-muted group-hover:text-ink-700"}`} data-on={i === active ? "" : undefined}>
                  {ch.label}
                </span>
              </span>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${i === active ? "border-ink-700 bg-ink-700 text-white" : "border-sand text-ink-700 group-hover:border-ink-700"}`} aria-hidden="true">
                <Arrow />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div ref={panel} id="picker-answer" className="scroll-mt-24 lg:col-span-6" aria-live="polite">
        <div className="lg:sticky lg:top-[calc(var(--hdr-h)+32px)]">
          <div className="frame relative aspect-[3/2] w-full max-w-[640px]">
            {choices.map((ch, i) => (
              <Img
                key={ch.key}
                src={ch.image}
                alt={i === active ? ch.imageAlt : ""}
                aria-hidden={i === active ? undefined : true}
                fill
                sizes="(max-width: 1023px) 92vw, 640px"
                className={`transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`}
                style={{ objectPosition: ch.position ?? "50% 20%" }}
              />
            ))}
          </div>
          <div className="mt-7 max-w-[640px]">
            <p className="eyebrow">{c.label}</p>
            <h3 className="mt-3 font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] leading-tight">{c.title}</h3>
            <p className="mt-4 text-muted">{c.text}</p>
            <Link href={c.href} className="btn btn-ink mt-6"><span className="btn-label">{c.cta} <Arrow className="btn-arrow" /></span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
