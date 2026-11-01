"use client";

import { useEffect } from "react";

/**
 * Fade-and-rise for every [data-reveal] element as it enters the viewport.
 * The hidden start state lives in CSS and only applies when scripting is
 * enabled and motion is allowed; the animation runs through the Web
 * Animations API so no attribute changes can conflict with React hydration.
 */
const KEYFRAMES: Keyframe[] = [
  { opacity: 0, transform: "translateY(24px)" },
  { opacity: 1, transform: "none" },
];

function show(el: HTMLElement, instant = false) {
  const delay = Number.parseInt(getComputedStyle(el).getPropertyValue("--reveal-delay")) || 0;
  el.animate(KEYFRAMES, { duration: instant ? 0 : 900, delay: instant ? 0 : delay, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)", fill: "forwards" });
}

export function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window) || !("animate" in HTMLElement.prototype)) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => (el.style.opacity = "1"));
      return;
    }
    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          if (seen.has(e.target)) continue;
          seen.add(e.target);
          show(e.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    const observe = (root: ParentNode) => root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => !seen.has(el) && !el.closest(".hero-rise") && io.observe(el));
    observe(document);
    const mo = new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => n instanceof HTMLElement && (n.matches("[data-reveal]") ? !n.closest(".hero-rise") && io.observe(n) : observe(n)));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}

/** Wrapper that fades and rises into view. `delay` staggers siblings (ms). */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" | "article" | "figure" | "header" | "span" }) {
  const Comp = Tag as "div";
  return (
    <Comp data-reveal="" className={className} style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}>
      {children}
    </Comp>
  );
}
