import Link from "next/link";
import { Suspense } from "react";
import { site } from "../../../content/site";
import { mainNav, servicesMenu } from "@/lib/nav";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icons";
import { Img } from "@/components/ui/Img";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { HeaderBehavior, ActiveNav } from "./HeaderBehavior";

/**
 * Site header, rendered on the server. `variant="transparent"` sits over a
 * dark hero and turns solid ivory after 40px of scroll; `variant="solid"` is
 * always ivory and reserves its own height. Behaviour lives in HeaderBehavior.
 */
export function Header({ variant = "solid" }: { variant?: "transparent" | "solid" }) {
  const light = variant === "transparent";
  return (
    <>
      <header
        id="site-header"
        data-variant={variant}
        data-light={light ? "" : undefined}
        className={`site-header fixed inset-x-0 top-0 z-50 ${light ? "on-dark" : ""}`}
      >
        {/* Slim top bar */}
        <div className="topbar hidden lg:block">
          <div className="container-x flex h-11 items-center justify-between text-[0.8125rem]">
            <div className="flex items-center gap-6">
              <a href={`tel:${site.phoneE164}`} className="inline-flex min-h-11 items-center gap-2 hover:underline underline-offset-4">
                <Icon.phone className="h-4 w-4" /> {site.phone}
              </a>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:underline underline-offset-4">
                <Icon.pin className="h-4 w-4" /> {site.address.street}, {site.address.neighborhood}, {site.address.region} {site.address.postalCode}
              </a>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/new-patient-offer/" className="hdr-offer inline-flex min-h-11 items-center gap-2 font-semibold hover:underline underline-offset-4">
                <Icon.sparkle className="h-4 w-4" /> Your first visit
              </Link>
              <SocialLinks className="flex items-center gap-1 border-l border-current/20 pl-4" linkClass="flex h-11 w-11 items-center justify-center opacity-80 hover:opacity-100" />
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="container-x flex h-16 items-center justify-between lg:h-[76px]">
          <Link href="/" className="flex min-h-11 shrink-0 items-center" aria-label={site.name}>
            <Logo className="h-8 w-auto sm:h-9" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {mainNav.map((item) =>
              item.label === "Services" ? (
                <div key={item.href} className="relative">
                  <button
                    type="button"
                    data-mega-button=""
                    className="nav-link inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[0.9375rem] font-medium transition-colors"
                    aria-expanded="false"
                    aria-controls="mega-menu"
                  >
                    {item.label}
                    <Icon.chevron className="hdr-chev h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <Link key={item.href} href={item.href} data-nav="" className="nav-link inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors">
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href={`tel:${site.phoneE164}`} className="btn btn-sm btn-outline hidden md:inline-flex">
              <Icon.phone className="h-4 w-4" /> <span className="hidden xl:inline">{site.phone}</span><span className="xl:hidden">Call</span>
            </a>
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm hdr-book">
              Book your first visit
            </a>
            <button
              type="button"
              data-menu-button=""
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/5"
              aria-expanded="false"
              aria-controls="mobile-menu"
              aria-label="Open menu"
            >
              <span data-icon="menu"><Icon.menu /></span>
              <span data-icon="close" hidden><Icon.close /></span>
            </button>
          </div>
        </div>

        {/* Services mega menu */}
        <div id="mega-menu" data-mega="" className="mega absolute inset-x-0 top-full hidden lg:block" inert>
          <div className="bg-ivory text-ink-700 border-y border-sand shadow-[0_24px_60px_-20px_rgba(28,27,25,0.25)]">
            <div className="container-x py-8">
              <div className="grid grid-cols-3 gap-x-8 gap-y-8 xl:grid-cols-6">
                {servicesMenu.map(({ category, links }) => (
                  <div key={category.key}>
                    <Link href={category.href} className="group block img-zoom rounded-xl">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                        <Img src={category.image} alt="" fill sizes="220px" className="object-cover" />
                      </div>
                      <span className="mt-3 block font-display text-lg leading-tight group-hover:underline underline-offset-4 decoration-gold">{category.name}</span>
                    </Link>
                    <ul className="mt-3 space-y-1.5">
                      {links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="group flex min-h-11 flex-col justify-center py-0.5">
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
                <Link href="/services/" className="text-link min-h-11">View all services <Icon.arrowRight className="h-4 w-4" /></Link>
                <span className="text-muted">{site.insurance} · {site.financing}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div id="mobile-menu" className="drawer fixed inset-0 z-40 lg:hidden bg-ivory text-ink-700" role="dialog" aria-label="Site menu" inert>
        <div className="h-full overflow-y-auto pt-20 pb-28 px-6">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-sand">
              {mainNav.map((item) =>
                item.label === "Services" ? (
                  <li key={item.href}>
                    <details className="group">
                      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between py-3 font-display text-2xl">
                        Services <Icon.plus className="chev h-5 w-5 text-gold-700" />
                      </summary>
                      <div className="pb-4">
                        <Link href="/services/" className="flex min-h-11 items-center text-sm font-semibold text-slate-600">All services</Link>
                        {servicesMenu.map(({ category, links }) => (
                          <div key={category.key} className="pt-3">
                            <p className="eyebrow">{category.name}</p>
                            <ul className="mt-1">
                              {links.map((l) => (
                                <li key={l.href}>
                                  <Link href={l.href} className="flex min-h-11 items-center py-2 text-base">{l.label}</Link>
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
                    <Link href={item.href} className="flex min-h-14 items-center py-3 font-display text-2xl">{item.label}</Link>
                  </li>
                ),
              )}
              <li>
                <Link href="/new-patient-offer/" className="flex min-h-14 items-center gap-2 py-3 font-semibold text-gold-700">
                  <Icon.sparkle className="h-4 w-4" /> Your first visit
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-8 grid gap-3">
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid btn-lg">Book your first visit</a>
            <a href={`tel:${site.phoneE164}`} className="btn btn-outline btn-lg"><Icon.phone className="h-4 w-4" /> {site.phone}</a>
          </div>
          <div className="mt-8 text-sm text-muted">
            <p>{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postalCode}</p>
            <p className="mt-2">Mon–Fri 8 AM – 5 PM</p>
            <SocialLinks className="mt-4 flex gap-2" linkClass="flex h-11 w-11 items-center justify-center" iconClass="h-5 w-5" />
          </div>
          <button type="button" data-close-menu="" className="sr-only focus:not-sr-only">Close menu</button>
        </div>
      </div>

      <HeaderBehavior />
      <Suspense fallback={null}>
        <ActiveNav />
      </Suspense>

      {variant === "solid" && <div className="h-16 lg:h-[120px]" aria-hidden="true" />}
    </>
  );
}
