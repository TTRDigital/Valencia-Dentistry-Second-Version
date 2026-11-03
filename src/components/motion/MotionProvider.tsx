"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Engine = typeof import("./engine");
let enginePromise: Promise<Engine> | null = null;
const loadEngine = () => (enginePromise ??= import("./engine"));

/**
 * First visit: wait for the first interaction, or idle time after load, so
 * the motion libraries stay off the LCP path. Never start in the middle of a
 * scroll (pins and measurements would nudge the page): wait for it to pause.
 */
function whenReady(): Promise<void> {
  return new Promise((resolve) => {
    let started = false;
    let lastScroll = 0;
    const onScroll = () => (lastScroll = performance.now());
    window.addEventListener("scroll", onScroll, { passive: true });
    const events = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown", "scroll"];
    const settle = () => {
      const wait = 250 - (performance.now() - lastScroll);
      if (wait > 0) return void setTimeout(settle, wait);
      window.removeEventListener("scroll", onScroll);
      resolve();
    };
    const go = () => {
      if (started) return;
      started = true;
      events.forEach((e) => window.removeEventListener(e, go));
      settle();
    };
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    const idle = () => ("requestIdleCallback" in window ? requestIdleCallback(go, { timeout: 2500 }) : setTimeout(go, 1200));
    if (document.readyState === "complete") setTimeout(idle, 1500);
    else window.addEventListener("load", () => setTimeout(idle, 1500), { once: true });
  });
}

/**
 * Fade-and-rise for [data-reveal] blocks, without any library: only blocks
 * below the fold get a start state (set here, never in CSS), so content is
 * visible without JavaScript and nothing can stay at opacity 0.
 */
function reveal(): () => void {
  if (!("IntersectionObserver" in window)) return () => {};
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter((el) => !el.closest(".hero-rise"));
  const hidden = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.95);
  const show = (el: HTMLElement) => {
    const delay = Number.parseInt(el.style.getPropertyValue("--reveal-delay")) || 0;
    const a = el.animate([{ opacity: 0, transform: "translateY(28px)" }, { opacity: 1, transform: "none" }], { duration: 1000, delay, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" });
    el.style.opacity = "";
    el.style.transform = "";
    return a;
  };
  hidden.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
  });
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        show(e.target as HTMLElement);
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
  );
  hidden.forEach((el) => io.observe(el));
  return () => {
    io.disconnect();
    hidden.forEach((el) => {
      el.style.opacity = "";
      el.style.transform = "";
    });
  };
}

/**
 * One client provider in the root layout. Per route: reveal blocks, then the
 * GSAP/Lenis engine (headings, photo wipes, parallax, tickers, pinned
 * gallery, scroll story, cursor, magnetic buttons), reverted on leave.
 * New pages open at the top; a subtle fade runs on route change, never on
 * first load. With reduced motion, nothing moves.
 */
export function MotionProvider() {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => (popped.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const isFirst = first.current;
    first.current = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let stopEngine: (() => void) | null = null;

    if (!isFirst) {
      if (!popped.current && !window.location.hash) {
        window.scrollTo(0, 0);
        enginePromise?.then((e) => e.scrollTop());
      }
      popped.current = false;
      if (!reduce) document.getElementById("main")?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: "ease-out" });
    }
    if (reduce) return;

    const stopReveal = reveal();
    (isFirst ? whenReady() : Promise.resolve())
      .then(loadEngine)
      .then((engine) => {
        if (cancelled) return;
        engine.setupGlobal();
        stopEngine = engine.run();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      stopReveal();
      stopEngine?.();
    };
  }, [pathname]);

  return (
    <>
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true"><span /></div>
    </>
  );
}
