import type { Faq as FaqT } from "../../../content/types";
import { Icon } from "./Icons";

/** Native, accessible accordion (details/summary). */
export function FaqList({ items, className = "" }: { items: FaqT[]; className?: string }) {
  return (
    <div className={`divide-y divide-sand border-y border-sand ${className}`}>
      {items.map((f, i) => (
        <details key={i} className="group" data-reveal="" style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-xl text-ink-700 hover:text-slate-600">
            <span>{f.q}</span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sand text-gold-700"><Icon.plus className="chev h-4 w-4" /></span>
          </summary>
          <div className="pb-6 pr-12 text-muted">{f.a}</div>
        </details>
      ))}
    </div>
  );
}
