"use client";

import { useState } from "react";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icons";
import { Arrow } from "@/components/ui/Button";
import { OpenBadge } from "@/components/ui/OpenBadge";

type Site = { name: string; phone: string; phoneE164: string; mapsUrl: string; mapsEmbed: string; address: { street: string; city: string; region: string; postalCode: string; neighborhood: string } };

/**
 * 14. Visit: a static, brand-tinted map (© OpenStreetMap contributors) with a
 * pin that drops in, and a directions card. The live Google map loads only
 * when asked for, so no third-party frame slows the page.
 */
export function VisitMap({ site }: { site: Site }) {
  const [live, setLive] = useState(false);
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
      <div className="relative lg:col-span-7">
        <div className="frame relative aspect-[16/11] w-full max-w-[800px]">
          {live ? (
            <iframe src={site.mapsEmbed} title={`Map showing ${site.name}`} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          ) : (
            <>
              <Img src="/images/map/static-map.jpg" alt={`Map of the area around ${site.address.street}, ${site.address.city}`} fill sizes="(max-width: 1023px) 92vw, 800px" style={{ objectPosition: "50% 50%" }} />
              <span className="map-pin absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full" data-drop="" aria-hidden="true">
                <svg width="44" height="56" viewBox="0 0 44 56"><path d="M22 0C9.85 0 0 9.85 0 22c0 15.4 22 34 22 34s22-18.6 22-34C44 9.85 34.15 0 22 0z" fill="#1b1a17" /><circle cx="22" cy="21" r="8" fill="#cfa36e" /></svg>
              </span>
              <span className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-8 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-black/25 blur-[2px]" aria-hidden="true" />
              <button type="button" onClick={() => setLive(true)} className="btn btn-sm glass absolute bottom-4 left-4">
                <span className="btn-label"><Icon.pin className="h-4 w-4" /> Load the live map</span>
              </button>
              <span className="absolute bottom-1 right-2 text-[10px] text-ink-700/80">© OpenStreetMap contributors</span>
            </>
          )}
        </div>
      </div>
      <div className="lg:col-span-5">
        <div className="on-dark flex h-full flex-col justify-between rounded-[var(--r-lg)] bg-ink p-7 text-on-dark sm:p-9">
          <div>
            <p className="eyebrow">Find us</p>
            <p className="mt-4 font-display text-3xl leading-tight">{site.address.street}</p>
            <p className="mt-1 text-on-dark-muted">{site.address.city} ({site.address.neighborhood}), {site.address.region} {site.address.postalCode}</p>
            <ul className="mt-6 space-y-2 text-sm text-on-dark-muted">
              <li className="flex items-start gap-3"><Icon.clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span>Mon–Fri 8 AM – 5 PM<br />Sat & Sun closed<br /><OpenBadge className="mt-1 text-on-dark" /></span></li>
              <li className="flex items-start gap-3"><Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />Free parking at the building, elevator to the second floor</li>
            </ul>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold"><span className="btn-label">Get directions <Arrow className="btn-arrow" /></span></a>
            <a href={`tel:${site.phoneE164}`} className="btn btn-outline"><span className="btn-label"><Icon.phone className="h-4 w-4" /> {site.phone}</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}
