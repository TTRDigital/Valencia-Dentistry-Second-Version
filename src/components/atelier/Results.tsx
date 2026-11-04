"use client";

import { useState } from "react";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Img } from "@/components/ui/Img";
import type { BeforeAfterCase } from "../../../content/types";

/** (06) Results: a dark stage with giant outline Before/After words, the compare slider in the middle, and a case rail. */
export function ResultsStage({ cases }: { cases: BeforeAfterCase[] }) {
  const [i, setI] = useState(0);
  const c = cases[i];
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-between lg:flex" aria-hidden="true">
        <span className="outline-text font-display text-[clamp(5rem,10vw,10rem)] leading-none">Before</span>
        <span className="outline-text font-display text-[clamp(5rem,10vw,10rem)] italic leading-none">After</span>
      </div>
      <div className="relative z-10 mx-auto flex justify-center">
        <BeforeAfter key={c.id} c={c} hint={i === 0} />
      </div>
      <div className="mt-10 flex flex-col items-center gap-4">
        <p className="text-sm text-on-dark-muted" aria-live="polite">Case {String(i + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")} · <span className="text-on-dark">{c.title}</span></p>
        <ul className="flex flex-wrap justify-center gap-2" aria-label="Choose a case">
          {cases.map((x, k) => (
            <li key={x.id}>
              <button type="button" onClick={() => setI(k)} aria-pressed={k === i} aria-label={`${x.title} (${x.treatment})`} className={`frame relative block h-14 w-14 rounded-full transition duration-500 ${k === i ? "scale-110 ring-2 ring-gold ring-offset-2 ring-offset-ink" : "opacity-60 hover:opacity-100"}`}>
                <Img src={x.after} alt="" fill sizes="84px" style={{ objectPosition: "50% 50%" }} />
              </button>
            </li>
          ))}
        </ul>
        <p className="text-xs text-on-dark-muted">Individual results vary. Dr. Lavi will talk you through what is realistic for your smile.</p>
      </div>
    </div>
  );
}
