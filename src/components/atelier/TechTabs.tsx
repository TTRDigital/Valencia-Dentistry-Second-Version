"use client";

import { useEffect, useRef, useState } from "react";
import { TechIcon } from "@/components/ui/Icons";
import type { TechKey } from "../../../content/types";

type Tech = { key: TechKey; name: string; text: string; benefit: string };

/**
 * (08) Technology as a spec sheet: a list of the practice's equipment on the
 * left, the selected item large on the right with "What this means for you".
 * Advances on its own every 6 s while in view (not with reduced motion; it
 * pauses on hover or focus). Tabs follow the WAI-ARIA tabs pattern.
 */
export function TechTabs({ items }: { items: Tech[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (paused || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearTimeout(id);
  }, [i, paused, inView, items.length]);

  const onKey = (e: React.KeyboardEvent, k: number) => {
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (k + 1) % items.length : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (k - 1 + items.length) % items.length : e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setI(next);
    tabs.current[next]?.focus();
  };
  const t = items[i];
  const running = !paused && inView;

  return (
    <div ref={root} className="grid gap-10 lg:grid-cols-12 lg:gap-14" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div role="tablist" aria-label="Technology" aria-orientation="vertical" className="lg:col-span-5">
        {items.map((x, k) => (
          <button
            key={x.key}
            ref={(el) => { tabs.current[k] = el; }}
            role="tab"
            id={`tt-${x.key}`}
            aria-selected={k === i}
            aria-controls="tt-panel"
            tabIndex={k === i ? 0 : -1}
            onClick={() => setI(k)}
            onKeyDown={(e) => onKey(e, k)}
            className={`relative flex min-h-14 w-full items-center gap-5 border-t border-white/10 py-4 text-left transition-colors last:border-b ${k === i ? "text-on-dark" : "text-on-dark-muted hover:text-on-dark"}`}
          >
            <span className="w-6 text-xs tabular">{String(k + 1).padStart(2, "0")}</span>
            <span className={`font-display text-[clamp(1.4rem,1.1rem+1vw,2rem)] leading-tight transition-transform duration-500 ${k === i ? "translate-x-2 italic" : ""}`}>{x.name}</span>
            {k === i && (
              <span className="absolute inset-x-0 bottom-0 h-px overflow-hidden" aria-hidden="true">
                <span key={`${i}-${running}`} className="tab-progress block h-px bg-gold" style={running ? { animation: "tabfill 6s linear forwards" } : { transform: "scaleX(1)" }} />
              </span>
            )}
          </button>
        ))}
      </div>
      <div id="tt-panel" role="tabpanel" aria-labelledby={`tt-${t.key}`} className="relative lg:col-span-7">
        <div key={t.key} className="tech-panel rounded-[var(--r-lg)] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-12">
          <div className="flex items-start justify-between">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink"><TechIcon k={t.key} className="h-8 w-8" /></span>
            <span className="font-display text-7xl leading-none text-white/10 tabular">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="mt-10 text-[clamp(2.2rem,1.6rem+2vw,3.75rem)]">{t.name}</h3>
          <p className="mt-4 max-w-lg text-on-dark-muted">{t.text}</p>
          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="text-xs uppercase tracking-[0.16em] text-gold">What this means for you</p>
            <p className="mt-3 font-display text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] italic leading-snug">{t.benefit}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
