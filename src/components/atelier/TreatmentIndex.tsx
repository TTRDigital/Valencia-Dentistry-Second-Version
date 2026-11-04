"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Img } from "@/components/ui/Img";
import { Arrow } from "@/components/ui/Button";

export type IndexItem = { name: string; href: string; text: string; image: string; group: string };

/**
 * (02) Treatment index: an editorial list with filter chips. On desktop a
 * preview photo follows the cursor and leans with its speed; on phones each
 * row shows a thumbnail. Every row is a plain link.
 */
export function TreatmentIndex({ items, groups }: { items: IndexItem[]; groups: string[] }) {
  const [group, setGroup] = useState("All");
  const [hover, setHover] = useState<string | null>(null);
  const [armed, setArmed] = useState(false);
  const photos = useMemo(() => Array.from(new Set(items.map((i) => i.image))), [items]);
  const preview = useRef<HTMLDivElement>(null);
  const list = useMemo(() => (group === "All" ? items : items.filter((i) => i.group === group)), [group, items]);

  useEffect(() => {
    const el = preview.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      const k = reduce ? 1 : 0.14;
      const vx = (tx - x) * k;
      x += vx;
      y += (ty - y) * k;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${Math.max(-12, Math.min(12, vx * 0.35))}deg)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div>
      {groups.length > 0 && <div className="flex flex-wrap gap-2" role="group" aria-label="Filter treatments">
        {["All", ...groups].map((g) => (
          <button key={g} type="button" onClick={() => setGroup(g)} aria-pressed={group === g} className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${group === g ? "border-ink bg-ink text-white" : "border-sand hover:border-ink"}`}>
            {g}
          </button>
        ))}
      </div>}
      <ul className={`tx-list ${groups.length ? "mt-10" : ""}`} onPointerEnter={() => setArmed(true)} onPointerLeave={() => setHover(null)}>
        {list.map((it, i) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="tx-row group"
              data-cursor="View"
              onPointerEnter={() => setHover(it.image)}
              onFocus={() => setHover(null)}
            >
              <span className="text-xs font-medium tabular text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex min-w-0 items-center gap-4">
                <span className="frame relative aspect-square w-14 shrink-0 rounded-[var(--r-sm)] sm:hidden">
                  <Img src={it.image} alt="" fill sizes="84px" style={{ objectPosition: "50% 25%" }} />
                </span>
                <span className="min-w-0">
                  <span className="tx-name block">{it.name}</span>
                  <span className="mt-2 hidden max-w-xl text-sm text-muted md:block">{it.text}</span>
                </span>
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-sand transition-all duration-500 group-hover:-rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white" aria-hidden="true"><Arrow /></span>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={preview} className="tx-preview hidden lg:block" data-on={hover !== null ? "" : undefined} aria-hidden="true">
        {armed && photos.map((src) => <Img key={src} src={src} alt="" fill sizes="570px" data-on={hover === src ? "" : undefined} />)}
      </div>
    </div>
  );
}
