"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icons";

/**
 * Scroll-snap carousel: native scrolling (touch, trackpad, keyboard with
 * arrow keys when focused) plus prev/next buttons. No library.
 */
export function Carousel({ children, label, itemClass = "w-[88%] sm:w-[60%] lg:w-[40%]", dark }: { children: ReactNode[]; label: string; itemClass?: string; dark?: boolean }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = children.length;

  const scrollTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const child = el.children[Math.max(0, Math.min(count - 1, i))] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }, [count]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const items = Array.from(el.children) as HTMLElement[];
      const left = el.scrollLeft;
      let best = 0;
      let dist = Infinity;
      items.forEach((it, i) => {
        const d = Math.abs(it.offsetLeft - left);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setIndex(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const btn = `flex h-11 w-11 items-center justify-center rounded-full border transition-colors disabled:opacity-30 ${dark ? "border-white/25 hover:bg-white/10" : "border-ink-700/30 hover:bg-ink-700 hover:text-white"}`;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={track}
        className="flex snap-x gap-5 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") scrollTo(index + 1);
          if (e.key === "ArrowLeft") scrollTo(index - 1);
        }}
      >
        {children.map((c, i) => (
          <li key={i} className={`snap-start shrink-0 ${itemClass}`} aria-roledescription="slide" aria-label={`${i + 1} of ${count}`}>
            {c}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between">
        <p className={`tabular text-sm ${dark ? "text-on-dark-muted" : "text-muted"}`}>
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <button type="button" className={btn} onClick={() => scrollTo(index - 1)} disabled={index === 0} aria-label="Previous"><Icon.arrowLeft /></button>
          <button type="button" className={btn} onClick={() => scrollTo(index + 1)} disabled={index >= count - 1} aria-label="Next"><Icon.arrowRight /></button>
        </div>
      </div>
    </div>
  );
}
