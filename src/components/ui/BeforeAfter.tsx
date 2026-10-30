"use client";

import { useId, useRef, useState } from "react";
import { Img } from "./Img";
import type { BeforeAfterCase } from "../../../content/types";

/**
 * Drag/slide comparison. The range input is the accessible control
 * (keyboard arrows, screen readers); pointer dragging anywhere on the image
 * moves the same value.
 */
export function BeforeAfter({ c, sizes = "(min-width: 1024px) 33vw, 90vw", priority }: { c: BeforeAfterCase; sizes?: string; priority?: boolean }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const id = useId();
  const dragging = useRef(false);

  const fromEvent = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.round(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100))));
  };

  return (
    <figure className="group">
      <div
        ref={box}
        className="relative aspect-[437/404] select-none overflow-hidden rounded-2xl bg-ivory-200 touch-pan-y"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromEvent(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && fromEvent(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Img src={c.after} alt={c.afterAlt} fill sizes={sizes} className="object-cover" priority={priority} draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Img src={c.before} alt={c.beforeAlt} fill sizes={sizes} className="object-cover" priority={priority} draggable={false} />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-700 shadow-lg">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 7 4 12l5 5M15 7l5 5-5 5" /></svg>
          </span>
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-white">Before</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-ink">After</span>
        <label htmlFor={id} className="sr-only">Compare before and after: {c.title}</label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize opacity-0 focus-visible:opacity-100"
          aria-valuetext={`${pos}% before`}
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-3">
        <span className="font-display text-lg text-ink-700">{c.title}</span>
        <span className="text-xs uppercase tracking-wider text-muted">{c.treatment}</span>
      </figcaption>
    </figure>
  );
}
