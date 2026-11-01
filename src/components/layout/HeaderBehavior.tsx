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
      const light = variant === "transparent" && !scrolled && !menuOpen;
      header.toggleAttribute("data-light", light);
      header.classList.toggle("on-dark", light);
      header.toggleAttribute("data-scrolled", scrolled);
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
      if (open) drawer?.querySelector<HTMLElement>("a, button")?.focus();
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
      if (e.key === "Escape") {
        if (menuOpen) setMenu(false);
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

/** Marks the current section's link in the header (runtime data, kept out of the static shell). */
export function ActiveNav() {
  const pathname = usePathname();
  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>("#site-header [data-nav]").forEach((a) => {
      const href = a.getAttribute("href") || "";
      const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
      a.toggleAttribute("data-active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }, [pathname]);
  return null;
}
