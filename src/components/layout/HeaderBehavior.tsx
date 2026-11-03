"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * All header interactivity, attached to the server-rendered markup with
 * data attributes (no React-owned header DOM, so nothing to hydrate):
 * transparent → solid on scroll, Services mega menu (hover intent, click,
 * keyboard, Escape, click outside, `inert` when closed), mobile drawer
 * (scroll lock, focus, Escape), close on navigation.
 */
export function HeaderBehavior() {
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    const variant = header.dataset.variant;
    const megaBtn = header.querySelector<HTMLButtonElement>("[data-mega-button]");
    const mega = header.querySelector<HTMLElement>("[data-mega]");
    const menuBtn = header.querySelector<HTMLButtonElement>("[data-menu-button]");
    const drawer = document.getElementById("mobile-menu");
    let megaOpen = false;
    let menuOpen = false;
    let closeTimer = 0;
    let scrolled = false;

    const paint = () => {
      const light = (variant === "transparent" && !scrolled) || menuOpen;
      header.toggleAttribute("data-light", light);
      header.classList.toggle("on-dark", light);
      header.toggleAttribute("data-scrolled", scrolled && !menuOpen);
      header.toggleAttribute("data-menu-open", menuOpen);
    };
    const onScroll = () => {
      const s = window.scrollY > 40;
      if (s !== scrolled) {
        scrolled = s;
        paint();
      }
    };
    const setMega = (open: boolean) => {
      megaOpen = open;
      mega?.toggleAttribute("data-open", open);
      if (mega) mega.inert = !open;
      megaBtn?.setAttribute("aria-expanded", String(open));
    };
    const setMenu = (open: boolean) => {
      menuOpen = open;
      drawer?.toggleAttribute("data-open", open);
      if (drawer) drawer.inert = !open;
      menuBtn?.setAttribute("aria-expanded", String(open));
      menuBtn?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menuBtn?.querySelectorAll<HTMLElement>("[data-icon]").forEach((i) => (i.hidden = i.dataset.icon !== (open ? "close" : "menu")));
      document.documentElement.style.overflow = open ? "hidden" : "";
      if (open) window.setTimeout(() => drawer?.querySelector<HTMLElement>("a, summary")?.focus({ preventScroll: true }), 50);
      else menuBtn?.focus();
      paint();
    };

    const openMega = () => {
      window.clearTimeout(closeTimer);
      setMega(true);
    };
    const scheduleClose = () => {
      closeTimer = window.setTimeout(() => setMega(false), 180);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab" && menuOpen && drawer && menuBtn) {
        const items = [menuBtn, ...Array.from(drawer.querySelectorAll<HTMLElement>("a, summary, button:not([data-close-menu])"))].filter((el) => el.offsetParent !== null);
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
      // The mega menu sits at the end of the header in the DOM: keep Tab order as if it followed the Services button.
      if (e.key === "Tab" && megaOpen && mega && megaBtn) {
        const items = Array.from(mega.querySelectorAll<HTMLElement>("a, button"));
        const active = document.activeElement as HTMLElement | null;
        if (!e.shiftKey && active === megaBtn && items[0]) {
          e.preventDefault();
          items[0].focus();
        } else if (e.shiftKey && active === items[0]) {
          e.preventDefault();
          megaBtn.focus();
        } else if (!e.shiftKey && active === items[items.length - 1]) {
          e.preventDefault();
          const nav = Array.from(header.querySelectorAll<HTMLElement>("nav[aria-label='Main'] a, nav[aria-label='Main'] button"));
          setMega(false);
          (nav[nav.indexOf(megaBtn) + 1] ?? megaBtn).focus();
        }
      }
      if (e.key === "Escape") {
        if (menuOpen) setMenu(false);
        if (megaOpen && mega?.contains(document.activeElement)) megaBtn?.focus();
        setMega(false);
      }
    };
    const onDocClick = (e: MouseEvent) => {
      if (megaOpen && !header.contains(e.target as Node)) setMega(false);
    };
    const onLinkClick = (e: Event) => {
      if ((e.target as HTMLElement).closest("a")) {
        if (menuOpen) setMenu(false);
        setMega(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick);
    megaBtn?.addEventListener("click", () => (megaOpen ? setMega(false) : openMega()));
    const hoverZone = megaBtn?.parentElement;
    hoverZone?.addEventListener("mouseenter", openMega);
    hoverZone?.addEventListener("mouseleave", scheduleClose);
    mega?.addEventListener("mouseenter", openMega);
    mega?.addEventListener("mouseleave", scheduleClose);
    mega?.addEventListener("click", onLinkClick);
    menuBtn?.addEventListener("click", () => setMenu(!menuOpen));
    drawer?.addEventListener("click", onLinkClick);
    drawer?.querySelector<HTMLButtonElement>("[data-close-menu]")?.addEventListener("click", () => setMenu(false));
    if (mega) mega.inert = true;
    if (drawer) drawer.inert = true;

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
      document.documentElement.style.overflow = "";
    };
  }, []);
  return null;
}

/** Pages that are not blog posts among single-segment URLs. */
const PAGES = new Set(["about", "appointment", "contact", "emergency-dental", "new-patient-offer", "smile-gallery", "testimonials", "tmj-treatments", "blog", "privacy-policy", "sitemap", "terms-and-services", "thank-you", "styleguide", "services"]);

/** The nav section a path belongs to: blog posts → Blog, service pages (and TMJ) → Services. */
function section(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length) return "/";
  if (parts[0] === "services" || parts[0] === "tmj-treatments") return "/services/";
  if (parts.length === 1 && !PAGES.has(parts[0])) return "/blog/";
  return `/${parts[0]}/`;
}

/** Highlights the current section in the header and mobile menu (runtime data, kept out of the static shell). */
export function ActiveNav() {
  const pathname = usePathname();
  useEffect(() => {
    const current = section(pathname);
    document.querySelectorAll<HTMLAnchorElement>("[data-nav]").forEach((a) => {
      const active = a.getAttribute("href") === current;
      a.toggleAttribute("data-active", active);
      if (active) a.setAttribute("aria-current", pathname === current ? "page" : "true");
      else a.removeAttribute("aria-current");
    });
    document.querySelector("[data-mega-button]")?.toggleAttribute("data-active", current === "/services/");
  }, [pathname]);
  return null;
}
