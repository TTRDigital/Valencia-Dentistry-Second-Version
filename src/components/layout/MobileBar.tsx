import { site } from "../../../content/site";
import { Icon } from "@/components/ui/Icons";

/** Sticky Call · Book · Directions bar on phones and tablets. */
export function MobileBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-sand bg-ivory/95 backdrop-blur-md pb-safe" aria-label="Quick actions">
      <ul className="grid h-16 grid-cols-3 divide-x divide-sand">
        <li>
          <a href={`tel:${site.phoneE164}`} className="flex h-full flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink-700">
            <Icon.phone className="h-5 w-5 text-slate-600" /> Call
          </a>
        </li>
        <li>
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col items-center justify-center gap-0.5 bg-slate-600 text-xs font-semibold text-white">
            <Icon.calendar className="h-5 w-5" /> Book
          </a>
        </li>
        <li>
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink-700">
            <Icon.pin className="h-5 w-5 text-slate-600" /> Directions
          </a>
        </li>
      </ul>
    </nav>
  );
}
