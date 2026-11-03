"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sticky section menu with scrollspy, plus a reading-progress bar at the top
 * of the window. Links are plain anchors, so it works without JavaScript.
 */
export function ServiceNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const list = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.current?.style.setProperty("--p", String(h > 0 ? Math.min(1, window.scrollY / h) : 0));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  // Keep the active pill in view on phones.
  useEffect(() => {
    const a = list.current?.querySelector<HTMLElement>(`[href="#${active}"]`);
    const ul = list.current;
    if (a && ul && ul.scrollWidth > ul.clientWidth) ul.scrollTo({ left: a.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  return (
    <>
      <div ref={bar} className="reading-progress" aria-hidden="true" />
      <nav aria-label="On this page" className="sticky top-[calc(var(--hdr-h)*0.82)] z-30 border-b border-sand bg-ivory/90 backdrop-blur-md">
        <ul ref={list} className="container-x scrollbar-none flex gap-1 overflow-x-auto py-2">
          {items.map((i) => (
            <li key={i.id} className="shrink-0">
              <a href={`#${i.id}`} aria-current={active === i.id ? "true" : undefined} className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors ${active === i.id ? "bg-ink-700 text-white" : "text-muted hover:text-ink-700"}`}>
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
