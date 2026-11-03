import type { Faq as FaqT } from "../../../content/types";
import { Icon } from "./Icons";

/** Native, accessible accordion (details/summary) that opens with a smooth height where supported. */
export function FaqList({ items, className = "", dark }: { items: FaqT[]; className?: string; dark?: boolean }) {
  return (
    <div className={`divide-y border-y ${dark ? "divide-white/10 border-white/10" : "divide-sand border-sand"} ${className}`}>
      {items.map((f, i) => (
        <details key={i} className="acc group" data-reveal="" style={{ "--reveal-delay": `${Math.min(i, 5) * 60}ms` } as React.CSSProperties}>
          <summary className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-[clamp(1.2rem,1.1rem+0.4vw,1.45rem)] leading-snug ${dark ? "" : "text-ink-700 hover:text-olive"}`}>
            <span>{f.q}</span>
            <span className={`acc-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${dark ? "border-white/20 text-gold" : "border-sand text-gold-700"}`}><Icon.plus className="h-4 w-4" /></span>
          </summary>
          <div className={`pb-6 pr-4 sm:pr-14 ${dark ? "text-on-dark-muted" : "text-muted"}`}>{f.a}</div>
        </details>
      ))}
    </div>
  );
}
