import Link from "next/link";
import { site } from "../../../content/site";
import { footerNav } from "@/lib/nav";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icons";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { Year } from "@/components/ui/Year";
import { Aurora } from "@/components/ui/Effects";
import { Arrow } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="relative overflow-clip bg-ink text-on-dark on-dark grain" aria-labelledby="footer-heading">
      <Aurora className="opacity-60" />
      {/* Big closing CTA */}
      <div className="container-x relative border-b border-white/10 pb-14 pt-20 lg:pb-20 lg:pt-28">
        <p className="eyebrow"><span className="gold-rule w-8" aria-hidden="true" />Valencia · Santa Clarita</p>
        <h2 id="footer-heading" className="mt-6 max-w-5xl display-giant" data-split="">
          Book your visit with <em className="accent">Dr. Lavi.</em>
        </h2>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg" data-cursor="Book"><span className="btn-label">Book your first visit <Arrow className="btn-arrow" /></span></a>
          <a href={`tel:${site.phoneE164}`} className="btn btn-outline btn-lg"><span className="btn-label"><Icon.phone className="h-4 w-4" /> {site.phone}</span></a>
        </div>
      </div>
      <div className="container-x relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" className="h-9 w-auto" />
            <p className="mt-6 max-w-sm text-on-dark-muted">
              Holistic, one-on-one dentistry in Valencia, Santa Clarita. Every visit led by Dr. Nuriel Lavi, DDS, with no handoffs and no rush.
            </p>
            <div className="mt-8 space-y-1 text-sm">
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-start gap-3 py-2 hover:underline underline-offset-4">
                <Icon.pin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{site.address.street}<br />{site.address.city} ({site.address.neighborhood}), {site.address.region} {site.address.postalCode}</span>
              </a>
              <a href={`tel:${site.phoneE164}`} className="flex min-h-11 items-center gap-3 hover:underline underline-offset-4"><Icon.phone className="h-4 w-4 text-gold" />{site.phone}</a>
              <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-3 hover:underline underline-offset-4"><Icon.mail className="h-4 w-4 text-gold" />{site.email}</a>
              <div className="flex min-h-11 items-center gap-3"><Icon.clock className="h-4 w-4 text-gold" /><span>Mon–Fri 8 AM – 5 PM · Sat & Sun closed</span></div>
              <OpenBadge className="pl-7 text-on-dark-muted" />
            </div>
          </div>
          <div className="lg:col-span-2">
            <p className="eyebrow">Practice</p>
            <ul className="mt-3 text-sm">
              {footerNav.practice.map((l) => (
                <li key={l.href}><Link href={l.href} className="inline-flex min-h-11 items-center sweep">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow">Services</p>
            <ul className="mt-3 grid grid-cols-1 gap-x-6 text-sm sm:grid-cols-2 lg:grid-cols-1">
              {footerNav.services.map((l) => (
                <li key={l.href}><Link href={l.href} className="inline-flex min-h-11 items-center sweep">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow">Get started</p>
            <p className="mt-4 text-sm text-on-dark-muted">{site.insurance}. {site.financing}.</p>
            <div className="mt-5 flex flex-col items-start gap-3">
              <Link href="/appointment/" className="btn btn-outline"><span className="btn-label">Request an appointment <Arrow className="btn-arrow" /></span></Link>
              <Link href="/new-patient-offer/" className="text-link min-h-11">What to expect at your first visit</Link>
            </div>
            <SocialLinks className="mt-8 flex gap-2" linkClass="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold" />
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>© <Year /> {site.name} · Dr. Nuriel Lavi, DDS · Dentist in Valencia, Santa Clarita, serving {site.areaServed.slice(2).join(", ")} and the Santa Clarita Valley.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerNav.legal.map((l) => (
              <li key={l.href}><Link href={l.href} className="inline-flex min-h-11 items-center sweep">{l.label}</Link></li>
            ))}
            <li><Link href="/cms" className="inline-flex min-h-11 items-center hover:underline underline-offset-4">Edit site</Link></li>
          </ul>
        </div>
      </div>
      {/* Giant faint wordmark */}
      <div className="relative select-none overflow-hidden" aria-hidden="true">
        <p className="translate-y-[18%] whitespace-nowrap text-center font-display text-[clamp(5rem,24vw,24rem)] font-light leading-[0.8] tracking-[-0.05em] text-white/[0.05]">Valencia</p>
      </div>
    </footer>
  );
}
