import { site } from "../../../content/site";
import { Icon } from "@/components/ui/Icons";
import { MobileBarBehavior } from "./MobileBarBehavior";

/** Floating glass bar on phones and tablets: Call · Book a visit · Directions. Slides in after the hero, hides over the footer. */
export function MobileBar() {
  return (
    <>
      <nav id="mobile-bar" className="mbar fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom))] z-40 lg:hidden" aria-label="Quick actions">
        <ul className="glass-dark grid grid-cols-[1fr_1.4fr_1fr] gap-1 rounded-full p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
          <li>
            <a href={`tel:${site.phoneE164}`} className="flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold active:scale-95 transition-transform">
              <Icon.phone className="h-4 w-4 text-gold" /> Call
            </a>
          </li>
          <li>
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-full bg-gold text-sm font-semibold text-ink active:scale-95 transition-transform">
              <Icon.calendar className="h-4 w-4" /> Book a visit
            </a>
          </li>
          <li>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold active:scale-95 transition-transform">
              <Icon.pin className="h-4 w-4 text-gold" /> Directions
            </a>
          </li>
        </ul>
      </nav>
      <MobileBarBehavior />
    </>
  );
}
