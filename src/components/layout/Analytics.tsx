"use client";

import { useEffect } from "react";
import { site } from "../../../content/site";

/**
 * Google Tag Manager, loaded after the page is idle or on the first
 * interaction (never in the critical path). Consent Mode v2 defaults are set
 * before the container loads: analytics allowed, ads/personalisation denied,
 * so GTM tags can be gated on consent later without changing the site.
 * Set NEXT_PUBLIC_GTM_ID to override the container; empty disables it.
 */
export function Analytics() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_GTM_ID ?? site.gtmId;
    if (!id || process.env.NODE_ENV !== "production") return;
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      const w = window as unknown as { dataLayer: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push(["consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted", wait_for_update: 500 }]);
      w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
      document.head.appendChild(s);
      events.forEach((e) => window.removeEventListener(e, load));
    };
    const events = ["scroll", "pointerdown", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, load, { passive: true, once: true }));
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const t = idle ? idle(load, { timeout: 6000 }) : window.setTimeout(load, 6000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, load));
      if (!idle) window.clearTimeout(t as number);
    };
  }, []);
  return null;
}
