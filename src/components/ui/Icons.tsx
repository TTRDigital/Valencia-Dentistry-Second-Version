import type { TechKey } from "../../../content/types";

type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.25, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const Icon = {
  phone: ({ className = "h-5 w-5" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
  ),
  pin: ({ className = "h-5 w-5" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
  ),
  clock: ({ className = "h-5 w-5" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  ),
  mail: ({ className = "h-5 w-5" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
  ),
  calendar: ({ className = "h-5 w-5" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
  ),
  star: ({ className = "h-4 w-4" }: P) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.8L12 17.7 5.9 21l1.3-6.8-5-4.7 6.8-.8z" /></svg>
  ),
  check: ({ className = "h-4 w-4" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} strokeWidth={1.75} aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" /></svg>
  ),
  shield: ({ className = "h-5 w-5" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /><path d="m9 12 2 2 4-4" /></svg>
  ),
  leaf: ({ className = "h-5 w-5" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true"><path d="M20 4c-9 0-15 5-15 13 0 1 .2 2 .5 3C9 14 13 11 17 9c-3 3-6 7-8 12 7 0 11-5 11-17z" /></svg>
  ),
  heart: ({ className = "h-5 w-5" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" /></svg>
  ),
  sparkle: ({ className = "h-5 w-5" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>
  ),
  menu: ({ className = "h-6 w-6" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} strokeWidth={1.5} aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  ),
  close: ({ className = "h-6 w-6" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} strokeWidth={1.5} aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
  ),
  chevron: ({ className = "h-4 w-4" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} strokeWidth={1.5} aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
  ),
  arrowLeft: ({ className = "h-5 w-5" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} strokeWidth={1.5} aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
  ),
  arrowRight: ({ className = "h-5 w-5" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} strokeWidth={1.5} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  ),
  plus: ({ className = "h-4 w-4" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} strokeWidth={1.5} aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
  ),
  quote: ({ className = "h-8 w-8" }: P) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.5 6C5 6 3 8.2 3 11v7h7v-7H6.2c0-1.6 1-2.5 2.3-2.8zm10 0C15 6 13 8.2 13 11v7h7v-7h-3.8c0-1.6 1-2.5 2.3-2.8z" /></svg>
  ),
  facebook: ({ className = "h-4 w-4" }: P) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3v2.3H7.4V14h2.8v8z" /></svg>
  ),
  instagram: ({ className = "h-4 w-4" }: P) => (
    <svg className={className} viewBox="0 0 24 24" {...base} strokeWidth={1.5} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>
  ),
  linkedin: ({ className = "h-4 w-4" }: P) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 8.5h-3V21h3zM5 3.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM21 13.3c0-3.4-1.8-5-4.3-5-2 0-2.9 1.1-3.4 1.9V8.5h-3V21h3v-6.6c0-1.7.3-3.4 2.4-3.4 2.1 0 2.3 2 2.3 3.5V21h3z" /></svg>
  ),
  x: ({ className = "h-4 w-4" }: P) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 3h3l-7 8 8.3 10h-6.4l-5-6.5L4.6 21h-3l7.5-8.6L1.2 3h6.5l4.5 6z" /></svg>
  ),
  google: ({ className = "h-4 w-4" }: P) => (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4c-.2 1.2-.9 2.3-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z" /><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6C4.8 19.8 8.1 22 12 22z" /><path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1A10 10 0 0 0 2 12c0 1.6.4 3.1 1.1 4.6z" /><path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 3 14.7 2 12 2 8.1 2 4.8 4.2 3.1 7.4l3.3 2.6C7.2 7.7 9.4 5.9 12 5.9z" /></svg>
  ),
};

/** Refined line icons for the technology row. */
export function TechIcon({ k, className = "h-8 w-8" }: { k: TechKey; className?: string }) {
  const p = { className, viewBox: "0 0 48 48", ...base, strokeWidth: 1.1, "aria-hidden": true as const };
  switch (k) {
    case "cbct":
      return <svg {...p}><path d="M10 14h28v8H10z" /><path d="M24 22v16M14 38h20M18 8h12M20 8v6M28 8v6" /><circle cx="24" cy="18" r="2" /></svg>;
    case "itero":
      return <svg {...p}><path d="M8 30c0-4 4-6 10-6h4l10-14 6 4-8 12v8c0 2-2 4-4 4H14c-4 0-6-3-6-8z" /><circle cx="20" cy="30" r="2" /></svg>;
    case "prf":
      return <svg {...p}><path d="M24 6s10 12 10 20a10 10 0 0 1-20 0c0-8 10-20 10-20z" /><path d="M18 28a6 6 0 0 0 6 6" /></svg>;
    case "guided-implants":
      return <svg {...p}><path d="M18 8h12l-2 10h-8z" /><path d="M20 18l2 20h4l2-20" /><path d="M22 24h4M22 30h4" /><path d="M8 22h6M34 22h6" /></svg>;
    case "digital-xray":
      return <svg {...p}><rect x="8" y="10" width="32" height="28" rx="2" /><path d="M24 14v20M16 18h16M16 30h16" /><circle cx="24" cy="24" r="3" /></svg>;
    case "intraoral-camera":
      return <svg {...p}><path d="M10 30c0-3 2-5 5-5h8l6-6c2-2 4-2 6 0l2 2c2 2 2 4 0 6l-6 6h-8" /><circle cx="18" cy="30" r="3" /><path d="M22 38h-7c-3 0-5-2-5-5" /></svg>;
    case "laser":
      return <svg {...p}><path d="M30 10l8 8-16 16-8-8z" /><path d="M14 26 8 32M20 32l-6 6" /><path d="M36 6l4 4M40 12l2 2" /></svg>;
    case "same-day-crowns":
      return <svg {...p}><path d="M14 18c0-6 4-10 10-10s10 4 10 10c0 4-2 6-2 10l-2 10h-12l-2-10c0-4-2-6-2-10z" /><circle cx="36" cy="12" r="6" /><path d="M36 9v3l2 1" /></svg>;
  }
}
