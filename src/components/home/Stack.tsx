import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { Arrow } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";

export type StackItem = { eyebrow: string; title: string; text: string; points: string[]; href: string; cta: string; image: string; imageAlt: string; position?: string };

/**
 * 10. Holistic + TMJ: sticky cards that pile up as you scroll, alternating
 * light and dark. Pure CSS sticky; the engine adds a gentle settle-back.
 */
export function StackCards({ items }: { items: StackItem[] }) {
  return (
    <div data-stack="" className="relative">
      {items.map((it, i) => {
        const dark = i % 2 === 1;
        return (
          <article
            key={it.title}
            className={`stack-card mb-6 overflow-hidden rounded-[var(--r-lg)] border shadow-[0_-20px_60px_-30px_rgba(27,26,23,0.35)] last:mb-0 ${dark ? "on-dark border-white/10 bg-ink text-on-dark" : "border-sand bg-white text-text"}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
              <div className="lg:col-span-6">
                <p className="eyebrow">{String(i + 1).padStart(2, "0")} · {it.eyebrow}</p>
                <h3 className="mt-4 font-display text-[clamp(2rem,1.5rem+1.8vw,3.25rem)] leading-[1.05] tracking-[-0.02em]">{it.title}</h3>
                <p className={`mt-5 ${dark ? "text-on-dark-muted" : "text-muted"}`}>{it.text}</p>
                <ul className="mt-6 grid gap-2.5 text-sm sm:grid-cols-2">
                  {it.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5"><Icon.check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-gold" : "text-olive"}`} />{p}</li>
                  ))}
                </ul>
                <Link href={it.href} className="text-link mt-8 min-h-11">{it.cta} <Arrow className="h-4 w-4" /></Link>
              </div>
              <div className="lg:col-span-6 lg:flex lg:justify-end">
                <Photo src={it.image} alt={it.imageAlt} ratio="3/2" w={560} mw={84} position={it.position} />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
