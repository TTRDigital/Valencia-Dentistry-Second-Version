"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "../../../content/site";
import { Icon } from "@/components/ui/Icons";

const KEY = "vse-offer-seen";
const SKIP = ["/new-patient-offer/", "/thank-you/", "/appointment/", "/cms", "/styleguide/"];

/**
 * New-patient offer dialog: once per visit (sessionStorage), after 12s on
 * desktop and 20s on phones, focus-trapped, closes with Esc, the X, or the
 * backdrop. Never shown on the offer, appointment, thank-you or CMS pages.
 */
export function OfferPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const restore = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (SKIP.some((p) => pathname.startsWith(p))) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      return;
    }
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      restore.current = document.activeElement as HTMLElement;
      setOpen(true);
    }, mobile ? 20_000 : 12_000);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>("a[href], button, [tabindex]:not([tabindex='-1'])");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    restore.current?.focus?.();
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 pb-24 sm:items-center sm:pb-4" role="presentation">
      <button type="button" className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]" aria-label="Close" onClick={close} tabIndex={-1} />
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-title"
        aria-describedby="offer-desc"
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-ivory text-ink-700 shadow-2xl"
      >
        <div className="bg-ink px-7 pt-7 pb-6 text-on-dark on-dark grain">
          <p className="eyebrow">New patients</p>
          <p className="mt-2 font-display text-4xl leading-none">{site.offer.price} <span className="text-2xl">exam &amp; X-rays</span></p>
          <button ref={closeBtn} type="button" onClick={close} className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-on-dark hover:bg-white/10" aria-label="Close this offer">
            <Icon.close className="h-5 w-5" />
          </button>
        </div>
        <div className="px-7 py-6">
          <h2 id="offer-title" className="h3">Start with unhurried time with Dr. Moezzi</h2>
          <p id="offer-desc" className="mt-2 text-sm text-muted">{site.offer.description}</p>
          <ul className="mt-4 space-y-1.5 text-sm">
            {["Complete exam and digital X-rays", "A clear, written plan with no surprises", site.insurance, site.financing].map((t) => (
              <li key={t} className="flex items-start gap-2"><Icon.check className="mt-1 h-4 w-4 shrink-0 text-gold-700" />{t}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid flex-1">Book Online</a>
            <a href={`tel:${site.phoneE164}`} className="btn btn-outline flex-1"><Icon.phone className="h-4 w-4" /> Call</a>
          </div>
          <p className="mt-4 text-xs text-muted">{site.offer.fineprint} <Link href="/new-patient-offer/" className="underline underline-offset-2">Details</Link></p>
        </div>
      </div>
    </div>
  );
}
