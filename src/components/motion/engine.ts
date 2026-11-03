/**
 * Motion engine: GSAP + ScrollTrigger + SplitText, Lenis on desktop.
 * Loaded lazily by MotionProvider after first paint, so none of it is on the
 * LCP path. Every effect is attached to server-rendered markup through data
 * attributes, set up per route inside a gsap.context and reverted on leave.
 *
 * Rules kept here:
 * - Nothing is hidden by CSS. Start states are set by this script, and only
 *   for elements below the fold, so content is visible without JavaScript
 *   and never stuck at opacity 0.
 * - prefers-reduced-motion: nothing moves (the provider does not call run()).
 * - Work is chunked (one element per task) to keep main-thread tasks short.
 */
import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import type { SplitText as Split } from "gsap/SplitText";
import type Lenis from "lenis";

let gsap: typeof Gsap;
let ScrollTrigger: typeof ST;
let SplitText: typeof Split;

/** Loads GSAP and each plugin as its own chunk, one per task, so no single evaluation blocks the main thread for long. */
export async function load() {
  if (gsap) return;
  gsap = (await import("gsap")).gsap;
  await yieldTask();
  ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
  await yieldTask();
  SplitText = (await import("gsap/SplitText")).SplitText;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });
  await yieldTask();
}

const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const isPhone = () => window.innerWidth < 768;
const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;
const yieldTask = () => new Promise<void>((r) => setTimeout(r, 0));

let lenis: Lenis | null = null;

/* ---------------------------------------------------------------- global */

/** Lenis smooth scrolling (desktop only; touch keeps native scrolling) and the custom cursor. */
export async function setupGlobal() {
  if (finePointer() && !lenis) {
    const { default: LenisCtor } = await import("lenis");
    if (lenis) return;
    lenis = new LenisCtor({ lerp: 0.11, smoothWheel: true, syncTouch: false, anchors: { offset: -140 }, prevent: (n) => !!n.closest("[data-lenis-prevent], .drawer, #mega-menu") });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis?.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  if (finePointer()) setupCursor();
}

export function scrollTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}

/** Calls `cb` once when `el` comes within `margin` of the viewport (no layout reads, no ScrollTrigger). */
function once(el: Element, margin: string, cb: () => void, cleanups: (() => void)[]) {
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    cb();
  }, { rootMargin: margin });
  io.observe(el);
  cleanups.push(() => io.disconnect());
}

/** Safe refresh: ScrollTrigger waits until scrolling stops, so a refresh never yanks the page back mid-swipe. */
export function refresh() {
  lenis?.resize();
  ScrollTrigger.refresh(true);
}

function setupCursor() {
  const dot = document.querySelector<HTMLElement>(".cursor-dot");
  const ring = document.querySelector<HTMLElement>(".cursor-ring");
  if (!dot || !ring || ring.dataset.ready) return;
  ring.dataset.ready = "1";
  const label = ring.querySelector("span")!;
  const dx = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
  const dy = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
  const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
  const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
  const root = document.documentElement;
  window.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    root.classList.add("has-cursor");
    dx(e.clientX);
    dy(e.clientY);
    rx(e.clientX);
    ry(e.clientY);
  }, { passive: true });
  document.addEventListener("pointerleave", () => root.classList.remove("has-cursor"));
  document.addEventListener("pointerover", (e) => {
    const t = e.target as Element;
    const tagged = t.closest<HTMLElement>("[data-cursor]");
    if (t.closest("input, textarea, select, iframe, [contenteditable]")) {
      root.classList.add("cursor-hidden");
      ring.dataset.state = "";
      return;
    }
    root.classList.remove("cursor-hidden");
    if (tagged) {
      label.textContent = tagged.dataset.cursor || "";
      ring.dataset.state = "label";
    } else if (t.closest("a, button, summary, label, [role='slider'], [role='button']")) {
      ring.dataset.state = "link";
    } else ring.dataset.state = "";
  });
}

/* ---------------------------------------------------------------- per route */

type Cleanup = () => void;

export function run(): Cleanup {
  let alive = true;
  document.documentElement.classList.add("motion-on");
  const extra: Cleanup[] = [];
  const ctx = gsap.context(() => {});
  const add = (fn: () => void) => ctx.add(fn);
  const queue: (() => void)[] = [];
  const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T & HTMLElement>(sel));

  // Measure once, before any writes.
  const below = new WeakMap<Element, boolean>();
  for (const el of $("[data-split], [data-wipe], [data-count], [data-rise]")) below.set(el, belowFold(el));

  /* Section headings: lines rise from masks, once. Split only when near the viewport, restore the plain text afterwards. */
  for (const el of $("[data-split]")) {
    if (!below.get(el)) continue;
    once(el, "0px 0px 60% 0px", () => {
      if (!alive) return;
      const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
      gsap.set(split.lines, { yPercent: 115 });
      once(el, "0px 0px -12% 0px", () => {
        gsap.to(split.lines, { yPercent: 0, duration: 1.15, ease: "expo.out", stagger: 0.09, onComplete: () => split.revert() });
      }, extra);
      extra.push(() => split.revert());
    }, extra);
  }

  /* Blocks that rise in (cards, paragraphs), once. */
  for (const el of $("[data-rise]")) {
    if (!below.get(el)) continue;
    gsap.set(el, { y: 36, autoAlpha: 0 });
    once(el, "0px 0px -10% 0px", () => gsap.to(el, { y: 0, autoAlpha: 1, duration: 1.1, delay: Number(el.dataset.rise) || 0, ease: "expo.out", clearProps: "transform,opacity,visibility" }), extra);
    extra.push(() => gsap.set(el, { clearProps: "transform,opacity,visibility" }));
  }

  /* Photos wipe up into their frame while settling from 1.25× to 1×. */
  for (const el of $("[data-wipe]")) {
    if (!below.get(el)) continue;
    const img = el.querySelector("img");
    gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
    if (img) gsap.set(img, { scale: 1.25 });
    once(el, "0px 0px -10% 0px", () => {
      gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out", clearProps: "clipPath" });
      if (img) gsap.to(img, { scale: 1, duration: 1.8, ease: "expo.out", clearProps: "transform" });
    }, extra);
    extra.push(() => gsap.set([el, img].filter(Boolean), { clearProps: "clipPath,transform" }));
  }

  /* Gentle parallax on whole frames; lighter on phones. */
  for (const el of $("[data-parallax]")) {
    queue.push(() =>
      add(() => {
        const amt = (Number(el.dataset.parallax) || 6) * (isPhone() ? 0.5 : 1);
        gsap.fromTo(el, { yPercent: amt }, { yPercent: -amt, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      }),
    );
  }

  /* Heroes recede: copy lifts and fades slightly, media drifts. */
  for (const hero of $("[data-recede]")) {
    queue.push(() =>
      add(() => {
        const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
        $("[data-recede-copy]", hero).forEach((c) => gsap.to(c, { y: -90, opacity: 0.3, ease: "none", scrollTrigger: st }));
        $("[data-recede-media]", hero).forEach((m) => gsap.to(m, { yPercent: 10, ease: "none", scrollTrigger: st }));
      }),
    );
  }

  /* Giant outline type drifting sideways; faint watermark drifting vertically. */
  for (const el of $("[data-drift]")) {
    queue.push(() =>
      add(() => {
        const [from, to] = (el.dataset.drift || "5,-25").split(",").map(Number);
        gsap.fromTo(el, { xPercent: from }, { xPercent: to, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
      }),
    );
  }
  for (const el of $("[data-drift-y]")) {
    queue.push(() =>
      add(() => {
        const amt = Number(el.dataset.driftY) || 20;
        gsap.fromTo(el, { yPercent: amt, rotate: -4 }, { yPercent: -amt, rotate: 4, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
      }),
    );
  }

  /* Ticker rows: speed and direction follow scroll velocity. */
  const marquees: { tween: gsap.core.Tween; dir: number }[] = [];
  for (const el of $("[data-marquee]")) {
    queue.push(() =>
      add(() => {
        const track = el.querySelector<HTMLElement>(".marquee-track");
        if (!track) return;
        const dir = el.dataset.marquee === "-1" ? -1 : 1;
        const duration = Number(el.dataset.speed) || 40;
        const tween = dir === 1 ? gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration, ease: "none", repeat: -1 }) : gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration, ease: "none", repeat: -1 });
        marquees.push({ tween, dir });
      }),
    );
  }
  queue.push(() =>
    add(() => {
      if (!marquees.length) return;
      let last = 1;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const d = self.direction || last;
          last = d;
          const boost = 1 + Math.min(Math.abs(v) / 350, 5);
          for (const m of marquees) {
            gsap.to(m.tween, { timeScale: d * boost, duration: 0.25, overwrite: true });
            gsap.to(m.tween, { timeScale: d, duration: 1.2, delay: 0.25, ease: "power2.out", overwrite: false });
          }
        },
      });
    }),
  );

  /* Count-up numerals (the final value is in the markup). */
  for (const el of $("[data-count]")) {
    if (!below.get(el)) continue;
    const final = el.dataset.count!;
    const decimals = (final.split(".")[1] || "").length;
    el.textContent = (0).toFixed(decimals);
    once(el, "0px 0px -10% 0px", () => {
      const obj = { v: 0 };
      gsap.to(obj, { v: Number(final), duration: 2, ease: "expo.out", onUpdate: () => (el.textContent = obj.v.toFixed(decimals)), onComplete: () => (el.textContent = final) });
    }, extra);
    extra.push(() => (el.textContent = final));
  }

  /* Lines that draw in as you scroll (process steps). */
  for (const el of $("[data-draw]")) {
    queue.push(() =>
      add(() => {
        const axis = el.dataset.draw === "y" ? "scaleY" : "scaleX";
        gsap.fromTo(el, { [axis]: 0 }, { [axis]: 1, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top 75%", end: "bottom 55%", scrub: true } });
      }),
    );
  }

  /* Map pin drops in. */
  for (const el of $("[data-drop]")) {
    if (!belowFold(el)) continue;
    gsap.set(el, { y: -90, autoAlpha: 0 });
    once(el, "0px 0px -15% 0px", () => gsap.to(el, { y: 0, autoAlpha: 1, duration: 1.2, ease: "bounce.out" }), extra);
  }

  /* Pinned horizontal gallery: vertical scroll slides the cards sideways. Pins are created first. */
  for (const sec of $("[data-hscroll]")) {
    queue.unshift(() =>
      add(() => {
        const viewport = sec.querySelector<HTMLElement>(".hscroll-viewport");
        const track = sec.querySelector<HTMLElement>("[data-hscroll-track]");
        if (!viewport || !track) return;
        const bar = sec.querySelector<HTMLElement>("[data-hscroll-bar]");
        const index = sec.querySelector<HTMLElement>("[data-hscroll-index]");
        const n = track.children.length;
        sec.toggleAttribute("data-pinned", true);
        viewport.scrollLeft = 0;
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
              if (index) index.textContent = String(Math.min(n, Math.round(self.progress * (n - 1)) + 1)).padStart(2, "0");
            },
          },
        });
        return () => sec.removeAttribute("data-pinned");
      }),
    );
  }

  /* Scroll story: sticky photo changes per step, timeline line draws down. */
  for (const story of $("[data-story]")) {
    queue.push(() =>
      add(() => {
        const steps = $("[data-story-step]", story);
        const photos = $("[data-story-photo]", story);
        const line = story.querySelector<HTMLElement>("[data-story-line]");
        const setActive = (i: number) => {
          steps.forEach((s, k) => s.toggleAttribute("data-active", k === i));
          photos.forEach((p, k) => {
            const on = k === Math.min(i, photos.length - 1);
            gsap.to(p, { autoAlpha: on ? 1 : 0, duration: 0.8, ease: "power2.out", overwrite: true });
            const img = p.querySelector("img");
            if (on && img) gsap.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.4, ease: "expo.out", overwrite: true });
          });
        };
        steps.forEach((s, i) => ScrollTrigger.create({ trigger: s, start: "top 62%", end: "bottom 62%", onToggle: (self) => self.isActive && setActive(i) }));
        if (line) gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: line.parentElement, start: "top 62%", end: "bottom 62%", scrub: true } });
      }),
    );
  }

  /* Stacking sticky cards: earlier cards settle back as the next one arrives. */
  for (const stack of $("[data-stack]")) {
    queue.push(() =>
      add(() => {
        const cards = $(".stack-card", stack);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, { scale: 0.94, ease: "none", transformOrigin: "50% 0%", scrollTrigger: { trigger: next, start: "top bottom", end: "top 25%", scrub: true } });
        });
      }),
    );
  }

  /* Desktop only: magnetic buttons, cursor depth, spotlight. */
  if (finePointer()) {
    for (const el of $(".btn, [data-magnetic]")) {
      queue.push(() => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const leave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)", overwrite: true });
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        extra.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
          gsap.set(el, { clearProps: "transform" });
        });
      });
    }
    for (const root of $("[data-depth-root]")) {
      queue.push(() => {
        const layers = $("[data-depth]", root).map((el) => ({ d: Number(el.dataset.depth) || 0.02, x: gsap.quickTo(el, "x", { duration: 1, ease: "power3" }), y: gsap.quickTo(el, "y", { duration: 1, ease: "power3" }) }));
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          for (const l of layers) {
            l.x(nx * l.d * 1000);
            l.y(ny * l.d * 1000);
          }
        };
        root.addEventListener("pointermove", move);
        extra.push(() => root.removeEventListener("pointermove", move));
      });
    }
  }

  /* Cursor-following spotlight on dark grids (desktop). */
  if (finePointer()) {
    for (const el of $("[data-spotlight]")) {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      el.addEventListener("pointermove", move, { passive: true });
      extra.push(() => el.removeEventListener("pointermove", move));
    }
  }

  // Run the queue in small, time-boxed tasks; refresh once more only if web fonts were still loading.
  const fontsPending = document.fonts && document.fonts.status !== "loaded";
  (async () => {
    let t0 = performance.now();
    for (const job of queue) {
      if (!alive) return;
      job();
      if (performance.now() - t0 > 8) {
        await yieldTask();
        t0 = performance.now();
      }
    }
    if (!alive || !fontsPending) return;
    await document.fonts.ready;
    if (alive) refresh();
  })();

  return () => {
    alive = false;
    document.documentElement.classList.remove("motion-on");
    extra.forEach((f) => f());
    ctx.revert();
  };
}
