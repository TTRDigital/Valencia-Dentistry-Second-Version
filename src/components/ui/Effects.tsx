import type { ReactNode } from "react";

/** Slowly drifting gradient blobs behind dark heroes and banners (transform-only animation). */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`aurora ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

/**
 * Ticker row. Two identical groups so the loop is seamless; the engine moves
 * it, and scroll velocity sets its speed and direction. Static without
 * JavaScript or with reduced motion. Decorative by default (aria-hidden):
 * pass `label` to expose the items as a list instead.
 */
export function Marquee({
  items,
  dir = 1,
  speed = 40,
  variant = "italic",
  className = "",
  separator = "✦",
  label,
}: {
  items: ReactNode[];
  dir?: 1 | -1;
  speed?: number;
  variant?: "italic" | "outline" | "plain" | "logos";
  className?: string;
  separator?: ReactNode;
  label?: string;
}) {
  const style = variant === "italic" ? "marquee-row italic" : variant === "outline" ? "marquee-row outline-text" : variant === "plain" ? "marquee-row" : "";
  const group = (hidden: boolean) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <span key={i} className={`marquee-item ${style}`}>
          {it}
          {separator && variant !== "logos" && <span className="text-[0.45em] not-italic text-gold" aria-hidden="true" style={{ WebkitTextStroke: 0 }}>{separator}</span>}
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${className}`} data-marquee={String(dir)} data-speed={speed} aria-hidden={label ? undefined : true} aria-label={label} role={label ? "group" : undefined}>
      <div className="marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}

/** Giant outline type drifting sideways behind a section (decorative). */
export function DriftType({ text, className = "", drift = "6,-28" }: { text: string; className?: string; drift?: string }) {
  return (
    <span className={`drift-type ${className}`} data-drift={drift} aria-hidden="true">
      {text}
    </span>
  );
}

/** Rotating circular seal: "VALENCIA DENTISTRY · SANTA CLARITA ·" around the mark. */
export function Seal({ id = "seal", className = "", text = "VALENCIA DENTISTRY · SANTA CLARITA · ", children }: { id?: string; className?: string; text?: string; children?: ReactNode }) {
  return (
    <div className={`seal relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 140 140" className="seal-text absolute inset-0 h-full w-full">
        <defs>
          <path id={`${id}-circle`} d="M70,70 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" />
        </defs>
        <text fill="currentColor" style={{ fontSize: 10.5, letterSpacing: "0.32em", fontWeight: 600, fontFamily: "var(--font-manrope)" }}>
          <textPath href={`#${id}-circle`}>{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/** Floating glass badge over photos. */
export function GlassBadge({ children, className = "", dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return <div className={`${dark ? "glass-dark" : "glass"} rounded-2xl px-4 py-3 ${className}`}>{children}</div>;
}
