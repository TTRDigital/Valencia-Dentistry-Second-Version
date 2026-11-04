import { insurers, site } from "../../../content/site";
import { Img, imageSize } from "@/components/ui/Img";

function box(src: string) {
  const m = imageSize(src) ?? { w: 300, h: 80 };
  const a = m.w / m.h;
  const h = Math.round(Math.min(62, Math.max(30, 72 / Math.sqrt(a))));
  const w = Math.round(Math.min(160, h * a));
  return { w, h: Math.round(w / a) };
}

/** (10) Insurance: logos in equal tiles sized by their shape, revealed in a wave. */
export function InsuranceGrid() {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--r-lg)] border border-sand bg-sand sm:grid-cols-4">
        {insurers.map((x, i) => {
          const b = box(x.logo);
          return (
            <li key={x.name} className="group flex h-32 items-center justify-center bg-white transition-colors duration-500 hover:bg-ivory sm:h-40" data-reveal="" style={{ "--reveal-delay": `${(i % 4) * 70 + Math.floor(i / 4) * 140}ms` } as React.CSSProperties}>
              <Img src={x.logo} alt={x.name} sizes={`${b.w}px`} className="object-contain grayscale transition duration-500 group-hover:grayscale-0" style={{ width: b.w, height: b.h }} />
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-sm text-muted">{site.insurance}. {site.financing}. Not on the list? Call us and we will check your plan.</p>
    </div>
  );
}
