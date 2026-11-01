"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Background video that is inserted only after load + idle, and only when
 * the visitor has not asked for reduced motion or reduced data. It fades
 * over the poster so the LCP image is never blocked.
 */
export function HeroVideo({ src }: { src: string }) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (nav.connection?.saveData || /2g/.test(nav.connection?.effectiveType ?? "")) return;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      setReady(true);
    };
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const schedule = () => {
      if (idle) idle(go, { timeout: 2500 });
      else setTimeout(go, 1200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
  }, []);

  useEffect(() => {
    if (!ready || !ref.current) return;
    const v = ref.current;
    const onVisibility = () => (document.hidden ? v.pause() : v.play().catch(() => {}));
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [ready]);

  if (!ready) return null;
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000 data-[on]:opacity-100"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={(e) => e.currentTarget.setAttribute("data-on", "")}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
