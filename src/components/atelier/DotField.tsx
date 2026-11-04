"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative dot grid on a canvas that swells around the cursor (or a slow
 * wandering point on touch screens). Draws only while on screen; static with
 * reduced motion. aria-hidden.
 */
export function DotField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = false, t = 0;
    let mx = -9999, my = -9999, cx = -9999, cy = -9999;
    const gap = 26;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const d = Math.hypot(x - cx, y - cy);
          const k = Math.max(0, 1 - d / 180);
          ctx.fillStyle = k > 0 ? `rgba(212,168,114,${0.18 + k * 0.7})` : "rgba(243,238,228,0.12)";
          ctx.beginPath();
          ctx.arc(x, y, 1 + k * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    const loop = () => {
      if (!visible) return (raf = 0);
      if (!fine) {
        t += 0.006;
        mx = w * (0.5 + 0.35 * Math.sin(t));
        my = h * (0.5 + 0.3 * Math.sin(t * 1.7));
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (fine && !reduce) canvas.parentElement?.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      canvas.parentElement?.removeEventListener("pointermove", onMove);
    };
  }, []);
  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
