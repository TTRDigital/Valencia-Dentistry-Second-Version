"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { site } from "../../../content/site";
import { mainNav, servicesMenu } from "@/lib/nav";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icons";
import { Img } from "@/components/ui/Img";

/**
 * Site header. `variant="transparent"` sits over a dark hero and turns solid
 * ivory after the first 40px of scroll; `variant="solid"` is always ivory and
 * reserves its own height.
 */
export function Header({ variant = "solid" }: { variant?: "transparent" | "solid" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();
  const megaId = useId();
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // Lock body scroll under the mobile menu
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes, click outside closes mega menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMenuOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const openMega = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);
  const scheduleClose = useCallback(() => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 180);
  }, []);

  const light = variant === "transparent" && !scrolled && !menuOpen;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${
          light ? "bg-transparent text-on-dark" : "bg-ivory/95 text-ink-700 backdrop-blur-md shadow-[0_1px_0_0_var(--sand)]"
        }`}
        data-light={light ? "" : undefined}
      >
        {/* Slim top bar */}
        <div className={`hidden lg:block border-b transition-[max-height,opacity] duration-500 overflow-hidden ${scrolled ? "max-h-0 opacity-0 border-transparent" : "max-h-12 opacity-100"} ${light ? "border-white/15" : "border-sand"}`}>
          <div className="container-x flex h-10 items-center justify-between text-[0.8125rem]">
            <div className="flex items-center gap-6">
              <a href={`tel:${site.phoneE164}`} className="inline-flex items-center gap-2 hover:underline underline-offset-4">
                <Icon.phone className="h-4 w-4" /> {site.phone}
              </a>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline underline-offset-4">
                <Icon.pin className="h-4 w-4" /> {site.address.street}, {site.address.neighborhood}, {site.address.region} {site.address.postalCode}
              </a>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/new-patient-offer/" className={`inline-flex items-center gap-2 font-semibold ${light ? "text-gold" : "text-gold-700"} hover:underline underline-offset-4`}>
                <Icon.sparkle className="h-4 w-4" /> {site.offer.title}
              </Link>
              <span className={`h-4 w-px ${light ? "bg-white/20" : "bg-sand"}`} aria-hidden="true" />
              <ul className="flex items-center gap-3" aria-label="Social media">
                <li><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="block p-1 opacity-80 hover:opacity-100"><Icon.facebook /></a></li>
                <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="block p-1 opacity-80 hover:opacity-100"><Icon.instagram /></a></li>
                <li><a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="block p-1 opacity-80 hover:opacity-100"><Icon.linkedin /></a></li>
                <li><a href={site.social.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="block p-1 opacity-80 hover:opacity-100"><Icon.x /></a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="container-x flex h-16 items-center justify-between lg:h-[76px]">
          <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
            <Logo tone={light ? "light" : "dark"} className="h-8 w-auto sm:h-9" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {mainNav.map((item) =>
              item.label === "Services" ? (
                <div key={item.href} className="relative" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                  <button
                    type="button"
                    className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[0.9375rem] font-medium transition-colors ${isActive(item.href) ? "underline underline-offset-8 decoration-gold" : ""} hover:bg-black/5 ${light ? "hover:bg-white/10" : ""}`}
                    aria-expanded={megaOpen}
                    aria-controls={megaId}
                    onClick={() => setMegaOpen((v) => !v)}
                  >
                    {item.label}
                    <Icon.chevron className={`h-3.5 w-3.5 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors hover:bg-black/5 ${light ? "hover:bg-white/10" : ""} ${isActive(item.href) ? "underline underline-offset-8 decoration-gold" : ""}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href={`tel:${site.phoneE164}`} className={`btn btn-sm hidden md:inline-flex ${light ? "btn-outline-light" : "btn-outline"}`}>
              <Icon.phone className="h-4 w-4" /> <span className="hidden xl:inline">{site.phone}</span><span className="xl:hidden">Call</span>
            </a>
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={`btn btn-sm ${light ? "btn-gold" : "btn-solid"}`}>
              Book Online
            </a>
            <button
              type="button"
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/5"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <Icon.close /> : <Icon.menu />}
            </button>
          </div>
        </div>

        {/* Services mega menu */}
        <div
          id={megaId}
          className={`absolute inset-x-0 top-full hidden lg:block transition-[opacity,transform] duration-300 ${megaOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"}`}
          onMouseEnter={openMega}
          onMouseLeave={scheduleClose}
          aria-hidden={!megaOpen}
        >
          <div className="bg-ivory text-ink-700 border-y border-sand shadow-[0_24px_60px_-20px_rgba(15,31,51,0.25)]">
            <div className="container-x py-8">
              <div className="grid grid-cols-3 gap-x-8 gap-y-8 xl:grid-cols-6">
                {servicesMenu.map(({ category, links }) => (
                  <div key={category.key}>
                    <Link href={category.href} className="group block img-zoom rounded-xl" tabIndex={megaOpen ? 0 : -1}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                        <Img src={category.image} alt="" fill sizes="220px" className="object-cover" />
                      </div>
                      <span className="mt-3 block font-display text-lg leading-tight group-hover:underline underline-offset-4 decoration-gold">{category.name}</span>
                    </Link>
                    <ul className="mt-3 space-y-1.5">
                      {links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="group block py-0.5" tabIndex={megaOpen ? 0 : -1}>
                            <span className="block text-sm font-semibold group-hover:text-slate-600">{l.label}</span>
                            <span className="block text-xs text-muted">{l.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-sand pt-5 text-sm">
                <Link href="/services/" className="text-link" tabIndex={megaOpen ? 0 : -1}>View all services <Icon.arrowRight className="h-4 w-4" /></Link>
                <span className="text-muted">{site.offer.title} · {site.insurance} · {site.financing}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {variant === "solid" && <div className="h-16 lg:h-[116px]" aria-hidden="true" />}
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const first = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (open) first.current?.focus();
  }, [open]);
  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-40 lg:hidden bg-ivory text-ink-700 transition-[opacity,visibility] duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      aria-hidden={!open}
      role="dialog"
      aria-label="Site menu"
    >
      <div className="h-full overflow-y-auto pt-20 pb-28 px-6">
        <nav aria-label="Mobile">
          <ul className="divide-y divide-sand">
            {mainNav.map((item, i) =>
              item.label === "Services" ? (
                <li key={item.href}>
                  <details className="group">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between py-3 font-display text-2xl">
                      Services <Icon.plus className="chev h-5 w-5 text-gold-700" />
                    </summary>
                    <div className="pb-4">
                      <Link href="/services/" className="block py-2 text-sm font-semibold text-slate-600" tabIndex={open ? 0 : -1}>All services</Link>
                      {servicesMenu.map(({ category, links }) => (
                        <div key={category.key} className="pt-3">
                          <p className="eyebrow">{category.name}</p>
                          <ul className="mt-1">
                            {links.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} className="block min-h-11 py-2 text-base" tabIndex={open ? 0 : -1}>{l.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>
                </li>
              ) : (
                <li key={item.href}>
                  <Link ref={i === 0 ? first : undefined} href={item.href} className="flex min-h-14 items-center py-3 font-display text-2xl" tabIndex={open ? 0 : -1}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
            <li>
              <Link href="/new-patient-offer/" className="flex min-h-14 items-center gap-2 py-3 font-semibold text-gold-700" tabIndex={open ? 0 : -1}>
                <Icon.sparkle className="h-4 w-4" /> {site.offer.title}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-8 grid gap-3">
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid btn-lg" tabIndex={open ? 0 : -1}>Book Online</a>
          <a href={`tel:${site.phoneE164}`} className="btn btn-outline btn-lg" tabIndex={open ? 0 : -1}><Icon.phone className="h-4 w-4" /> {site.phone}</a>
        </div>
        <div className="mt-8 text-sm text-muted">
          <p>{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postalCode}</p>
          <p className="mt-2">Mon–Fri 8 AM – 5 PM</p>
          <ul className="mt-4 flex gap-4" aria-label="Social media">
            <li><a href={site.social.facebook} aria-label="Facebook" className="block p-1" tabIndex={open ? 0 : -1}><Icon.facebook className="h-5 w-5" /></a></li>
            <li><a href={site.social.instagram} aria-label="Instagram" className="block p-1" tabIndex={open ? 0 : -1}><Icon.instagram className="h-5 w-5" /></a></li>
            <li><a href={site.social.linkedin} aria-label="LinkedIn" className="block p-1" tabIndex={open ? 0 : -1}><Icon.linkedin className="h-5 w-5" /></a></li>
            <li><a href={site.social.x} aria-label="X (Twitter)" className="block p-1" tabIndex={open ? 0 : -1}><Icon.x className="h-5 w-5" /></a></li>
          </ul>
        </div>
        <button type="button" onClick={onClose} className="sr-only focus:not-sr-only" tabIndex={open ? 0 : -1}>Close menu</button>
      </div>
    </div>
  );
}
