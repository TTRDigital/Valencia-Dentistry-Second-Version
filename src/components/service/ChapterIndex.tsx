"use client";

import { useEffect, useState } from "react";

/** Desktop chapter index: numbered list with scrollspy and a progress line for the current chapter. */
export function ChapterIndex({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav aria-label="Chapters" className="sticky top-32">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">On this page</p>
      <ol className="mt-5 space-y-1">
        {items.map((it, i) => {
          const on = active === it.id;
          return (
            <li key={it.id}>
              <a href={`#${it.id}`} aria-current={on ? "true" : undefined} className={`group flex min-h-11 items-center gap-4 transition-colors ${on ? "text-text" : "text-muted hover:text-text"}`}>
                <span className="w-6 text-xs tabular">{String(i + 1).padStart(2, "0")}</span>
                <span className={`h-px transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? "w-10 bg-gold" : "w-4 bg-sand group-hover:w-6"}`} aria-hidden="true" />
                <span className={`font-display text-xl transition-transform duration-500 ${on ? "italic" : ""}`}>{it.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
