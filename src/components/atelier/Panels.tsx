import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { Arrow } from "@/components/ui/Button";

export type PanelItem = { eyebrow: string; title: string; text: string; points: string[]; href: string; image: string; imageAlt: string; position?: string };

/**
 * (09) Beyond the tooth: three tall photo panels (holistic care, TMJ,
 * prevention). On desktop the one you point at opens wide and shows its
 * details; on phones they stack. Panels are 520px tall so the cover-cropped
 * photo is never drawn wider than ~780px.
 */
export function Panels({ items }: { items: PanelItem[] }) {
  return (
    <div className="panels">
      {items.map((p, i) => (
        <Link key={p.href} href={p.href} className="panel group on-dark relative block min-h-[440px] overflow-hidden rounded-[var(--r-lg)] bg-ink text-on-dark lg:min-h-0" data-cursor="View">
          <Img src={p.image} alt={p.imageAlt} fill sizes="(max-width: 639px) 660px, (max-width: 1023px) 92vw, 780px" className="transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" style={{ objectPosition: p.position ?? "50% 30%" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="chapter"><b>0{i + 1}</b> {p.eyebrow}</p>
            <h3 className="mt-4 text-[clamp(2rem,1.5rem+1.6vw,3.25rem)] leading-[1]">{p.title}</h3>
            <div className="panel-more mt-4 max-w-md">
              <p className="text-sm text-on-dark-muted">{p.text}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.points.map((t) => <li key={t} className="rounded-full border border-white/20 px-3 py-1 text-xs">{t}</li>)}
              </ul>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold">Learn more <Arrow className="h-4 w-4" /></span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
