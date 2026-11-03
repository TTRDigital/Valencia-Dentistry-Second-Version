import { insurers, site } from "../../../content/site";
import { Img, imageSize } from "@/components/ui/Img";
import { Marquee } from "@/components/ui/Effects";

/** Logo size by shape: wide logos get less height, square-ish ones more, so they read as equal weight. */
function logoBox(src: string) {
  const m = imageSize(src) ?? { w: 300, h: 80 };
  const aspect = m.w / m.h;
  const h = Math.round(Math.min(64, Math.max(30, 70 / Math.sqrt(aspect))));
  const w = Math.round(Math.min(150, h * aspect));
  return { w, h: Math.round(w / aspect) };
}

/** 12. Insurance logos as a ticker, each in an equal cell and sized by its shape. */
export function InsuranceTicker() {
  const cells = [...insurers, ...insurers].map((x, i) => {
    const b = logoBox(x.logo);
    return (
      <span key={`${x.name}-${i}`} className="flex h-24 w-[168px] items-center justify-center rounded-[var(--r-sm)] border border-sand bg-white sm:w-[200px]">
        <Img src={x.logo} alt="" sizes={`${b.w}px`} className="object-contain" style={{ width: b.w, height: b.h }} />
      </span>
    );
  });
  return (
    <div>
      <ul className="sr-only">
        {insurers.map((x) => <li key={x.name}>{x.name}</li>)}
      </ul>
      <Marquee items={cells} variant="logos" speed={60} className="[&_.marquee-item]:pr-3 sm:[&_.marquee-item]:pr-4" />
      <p className="mt-8 text-center text-sm text-muted">{site.insurance}. {site.financing}. Not on the list? Call us and we will check your plan.</p>
    </div>
  );
}
