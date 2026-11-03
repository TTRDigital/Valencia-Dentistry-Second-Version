"use client";

import { useEffect, useRef, useState } from "react";
import { Img, imageSize } from "./Img";
import type { BeforeAfterCase } from "../../../content/types";

/**
 * Drag-to-compare slider: mouse, touch and arrow keys (Home/End too), exposed
 * as role="slider" with aria-valuenow. A one-time hint sweep runs when it
 * first comes into view (not with reduced motion). The frame is never wider
 * than half the files' pixel width, so the photos are never upscaled on 2×
 * screens.
 */
export function BeforeAfter({ c, hint = true, priority }: { c: BeforeAfterCase; hint?: boolean; priority?: boolean }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const hinted = useRef(false);
  const m = imageSize(c.after) ?? { w: 850, h: 808 };
  const maxW = Math.floor(m.w / 2);

  useEffect(() => {
    if (!hint || hinted.current || !box.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = box.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || hinted.current) return;
        hinted.current = true;
        io.disconnect();
        const keys = [50, 32, 68, 50];
        const start = performance.now();
        const dur = 1800;
        const step = (t: number) => {
          if (dragging.current) return;
          const p = Math.min(1, (t - start) / dur);
          const seg = Math.min(keys.length - 2, Math.floor(p * (keys.length - 1)));
          const local = p * (keys.length - 1) - seg;
          const ease = 0.5 - Math.cos(local * Math.PI) / 2;
          setPos(Math.round(keys[seg] + (keys[seg + 1] - keys[seg]) * ease));
          if (p < 1) requestAnimationFrame(step);
        };
        setTimeout(() => requestAnimationFrame(step), 400);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hint, c.id]);

  const fromX = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.round(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100))));
  };
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    const next = { ArrowLeft: pos - step, ArrowDown: pos - step, ArrowRight: pos + step, ArrowUp: pos + step, Home: 0, End: 100, PageDown: pos - 10, PageUp: pos + 10 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setPos(Math.max(0, Math.min(100, next)));
  };

  return (
    <figure className="w-full" style={{ maxWidth: maxW }}>
      <div
        ref={box}
        className="frame relative select-none touch-pan-y"
        style={{ aspectRatio: `${m.w}/${m.h}` }}
        data-cursor="Drag"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromX(e.clientX);
          handle.current?.focus({ preventScroll: true });
        }}
        onPointerMove={(e) => dragging.current && fromX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Img src={c.after} alt={c.afterAlt} fill sizes={`(max-width: 767px) 92vw, ${maxW}px`} priority={priority} draggable={false} style={{ objectPosition: "50% 50%" }} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Img src={c.before} alt={c.beforeAlt} fill sizes={`(max-width: 767px) 92vw, ${maxW}px`} priority={priority} draggable={false} style={{ objectPosition: "50% 50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" style={{ left: `${pos}%` }} aria-hidden="true" />
        <div
          ref={handle}
          role="slider"
          tabIndex={0}
          aria-label={`Before and after: ${c.title}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pos}
          aria-valuetext={`${pos}% showing before`}
          aria-orientation="horizontal"
          onKeyDown={onKey}
          className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-ink-700 shadow-lg focus-visible:outline-gold"
          style={{ left: `${pos}%` }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 7 4 12l5 5M15 7l5 5-5 5" /></svg>
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/75 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-white">Before</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-ink">After</span>
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-3">
        <span className="font-display text-lg">{c.title}</span>
        <span className="text-xs uppercase tracking-wider text-muted">{c.treatment}</span>
      </figcaption>
    </figure>
  );
}
