"use client";

import { useState } from "react";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Img } from "@/components/ui/Img";
import type { BeforeAfterCase } from "../../../content/types";

/** 8. Before/after: one large compare slider and a thumbnail strip to switch cases. */
export function ResultsShowcase({ cases }: { cases: BeforeAfterCase[] }) {
  const [i, setI] = useState(0);
  const c = cases[i];
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:order-2 lg:col-span-7 lg:flex lg:justify-end">
        <BeforeAfter key={c.id} c={c} hint={i === 0} />
      </div>
      <div className="lg:order-1 lg:col-span-5">
        <p className="text-sm text-muted" aria-live="polite">Case {i + 1} of {cases.length}: <span className="font-semibold text-ink-700">{c.title}</span></p>
        <ul className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-4" aria-label="Choose a case">
          {cases.map((x, k) => (
            <li key={x.id}>
              <button
                type="button"
                onClick={() => setI(k)}
                aria-pressed={k === i}
                aria-label={`${x.title} (${x.treatment})`}
                className={`frame relative block aspect-square w-full max-w-[96px] rounded-[var(--r-sm)] ring-offset-2 ring-offset-ivory transition ${k === i ? "ring-2 ring-olive" : "opacity-70 hover:opacity-100"}`}
              >
                <Img src={x.after} alt="" fill sizes="96px" style={{ objectPosition: "50% 50%" }} />
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted">Individual results vary. Dr. Lavi will talk you through what is realistic for your smile.</p>
      </div>
    </div>
  );
}
