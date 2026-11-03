import Link from "next/link";
import { Suspense } from "react";
import { site } from "../../../content/site";
import { mainNav, servicesMenu } from "@/lib/nav";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icons";
import { Img } from "@/components/ui/Img";
import { Aurora } from "@/components/ui/Effects";
import { Arrow } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { HeaderBehavior, ActiveNav } from "./HeaderBehavior";

const i = (n: number) => ({ "data-i": "", style: { "--i": n } as React.CSSProperties });

/**
 * Site header, rendered on the server. `transparent` sits over a dark hero;
 * after scrolling it turns solid with a shadow and gets slightly shorter
 * (transforms only, so nothing below moves). Behaviour lives in HeaderBehavior.
 */
export function Header({ variant = "solid" }: { variant?: "transparent" | "solid" }) {
  const light = variant === "transparent";
  let n = 0;
  return (
    <>
      <header id="site-header" data-variant={variant} data-light={light ? "" : undefined} className={`site-header fixed inset-x-0 top-0 z-50 ${light ? "on-dark" : ""}`}>
        <div className="topbar hidden lg:block">
          <div className="container-x flex h-full items-center justify-between text-[0.8125rem]">
            <div className="flex items-center gap-6">
              <a href={`tel:${site.phoneE164}`} className="inline-flex min-h-11 items-center gap-2 hover:underline underline-offset-4">
                <Icon.phone className="h-4 w-4" /> {site.phone}
              </a>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:underline underline-offset-4">
                <Icon.pin className="h-4 w-4" /> {site.address.street}, {site.address.neighborhood}, {site.address.region} {site.address.postalCode}
              </a>
              <span className="inline-flex items-center gap-2 opacity-80"><Icon.clock className="h-4 w-4" /> Mon–Fri 8 AM – 5 PM</span>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/new-patient-offer/" className="hdr-offer inline-flex min-h-11 items-center gap-2 font-semibold hover:underline underline-offset-4">
                <Icon.sparkle className="h-4 w-4" /> Your first visit
              </Link>
              <SocialLinks className="flex items-center gap-1 border-l border-current/20 pl-4" linkClass="flex h-11 w-11 items-center justify-center opacity-80 hover:opacity-100" />
            </div>
          </div>
        </div>

        <div className="hdr-bar">
          <div className="hdr-inner container-x flex h-full items-center justify-between gap-4">
            <Link href="/" className="hdr-logo flex min-h-11 shrink-0 items-center" aria-label={`${site.name}, home`}>
              <Logo className="h-8 w-auto sm:h-9 lg:h-10" />
            </Link>

            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
              {mainNav.map((item) =>
                item.label === "Services" ? (
                  <div key={item.href} className="relative">
                    <button type="button" data-mega-button="" className="nav-link inline-flex min-h-11 items-center gap-1.5 px-4 text-[0.9375rem] font-medium" aria-expanded="false" aria-controls="mega-menu">
                      {item.label}
                      <Icon.chevron className="hdr-chev h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <Link key={item.href} href={item.href} data-nav="" className="nav-link inline-flex min-h-11 items-center px-4 text-[0.9375rem] font-medium">
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <a href={`tel:${site.phoneE164}`} className="btn btn-sm btn-outline hidden md:inline-flex" aria-label={`Call ${site.phone}`}>
                <span className="btn-label"><Icon.phone className="h-4 w-4" /> <span className="hidden xl:inline">{site.phone}</span><span className="xl:hidden">Call</span></span>
              </a>
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm hdr-book hidden sm:inline-flex" data-cursor="Book">
                <span className="btn-label">Book your first visit <Arrow className="btn-arrow" /></span>
              </a>
              <button type="button" data-menu-button="" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/20 lg:hidden" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
                <span data-icon="menu"><Icon.menu /></span>
                <span data-icon="close" hidden><Icon.close /></span>
              </button>
            </div>
          </div>
        </div>

        {/* Services mega menu: items stagger in, keyboard accessible, Escape closes. */}
        <div className="mega-wrap absolute inset-x-0 top-full hidden lg:block">
          <div id="mega-menu" data-mega="" className="mega" inert>
            <div className="border-y border-sand bg-ivory text-ink-700 shadow-[0_30px_70px_-30px_rgba(27,26,23,0.35)]">
              <div className="container-x py-9">
                <div className="grid grid-cols-3 gap-x-8 gap-y-9 xl:grid-cols-6">
                  {servicesMenu.map(({ category, links }) => (
                    <div key={category.key} {...i(n++)}>
                      <Link href={category.href} className="group block">
                        <div className="frame relative aspect-[4/3] rounded-[var(--r-sm)] img-zoom">
                          <Img src={category.image} alt="" fill sizes="250px" />
                        </div>
                        <span className="sweep mt-3 inline-block font-display text-xl leading-tight">{category.name}</span>
                      </Link>
                      <ul className="mt-2 space-y-0.5">
                        {links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="group flex min-h-11 flex-col justify-center py-0.5">
                              <span className="block text-sm font-semibold group-hover:text-olive">{l.label}</span>
                              <span className="block text-xs text-muted">{l.description}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-sand pt-5 text-sm" {...i(n++)}>
                  <Link href="/services/" className="text-link min-h-11">View all services <Icon.arrowRight className="h-4 w-4" /></Link>
                  <span className="text-muted">{site.insurance} · {site.financing}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen dark mobile menu: large serif links cascade in, then booking and call. */}
      <div id="mobile-menu" className="drawer on-dark fixed inset-0 z-40 overflow-hidden bg-ink text-on-dark lg:hidden" role="dialog" aria-modal="true" aria-label="Site menu" inert>
        <Aurora />
        <div className="relative h-full overflow-y-auto px-5 pb-12 pt-24" data-lenis-prevent="">
          <nav aria-label="Mobile">
            <ul>
              {mainNav.map((item, k) =>
                item.label === "Services" ? (
                  <li key={item.href} {...i(k)} className="border-b border-white/10">
                    <details className="acc group">
                      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between py-3 font-display text-[2.5rem] leading-none">
                        Services <span className="acc-icon flex h-11 w-11 items-center justify-center rounded-full border border-white/20"><Icon.plus className="h-5 w-5" /></span>
                      </summary>
                      <div className="pb-5">
                        <Link href="/services/" className="flex min-h-11 items-center text-sm font-semibold text-gold">All services</Link>
                        {servicesMenu.map(({ category, links }) => (
                          <div key={category.key} className="pt-3">
                            <p className="eyebrow">{category.name}</p>
                            <ul className="mt-1">
                              {links.map((l) => (
                                <li key={l.href}>
                                  <Link href={l.href} className="flex min-h-11 items-center py-1 text-base text-on-dark">{l.label}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>
                  </li>
                ) : (
                  <li key={item.href} {...i(k)} className="border-b border-white/10">
                    <Link href={item.href} data-nav="" className="flex min-h-16 items-center justify-between py-3 font-display text-[2.5rem] leading-none">
                      {item.label} <Arrow className="h-5 w-5 opacity-50" />
                    </Link>
                  </li>
                ),
              )}
              <li {...i(mainNav.length)}>
                <Link href="/new-patient-offer/" className="flex min-h-14 items-center gap-2 py-3 font-semibold text-gold">
                  <Icon.sparkle className="h-4 w-4" /> Your first visit
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-6 grid gap-3" {...i(mainNav.length + 1)}>
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg"><span className="btn-label">Book your first visit <Arrow className="btn-arrow" /></span></a>
            <a href={`tel:${site.phoneE164}`} className="btn btn-outline btn-lg"><span className="btn-label"><Icon.phone className="h-4 w-4" /> Call {site.phone}</span></a>
          </div>
          <div className="mt-8 text-sm text-on-dark-muted" {...i(mainNav.length + 2)}>
            <p>{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postalCode}</p>
            <p className="mt-2">Mon–Fri 8 AM – 5 PM · Sat & Sun closed</p>
            <SocialLinks className="mt-4 flex gap-2" linkClass="flex h-11 w-11 items-center justify-center" iconClass="h-5 w-5" />
          </div>
          <button type="button" data-close-menu="" className="sr-only focus:not-sr-only">Close menu</button>
        </div>
      </div>

      <HeaderBehavior />
      <Suspense fallback={null}>
        <ActiveNav />
      </Suspense>

      {variant === "solid" && <div className="h-[var(--hdr-h)] lg:h-[calc(var(--hdr-h)+var(--topbar-h))]" aria-hidden="true" />}
    </>
  );
}
