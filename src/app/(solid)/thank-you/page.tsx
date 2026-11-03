import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../../../../content/site";
import { SplitHero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Thank You | Valencia Dentistry", description: "We received your request and will be in touch shortly.", path: "/thank-you/", noindex: true });

export default function ThankYou() {
  return (
    <SplitHero tone="light" image="/images/office/veneer-tryin.jpg" imageAlt="Patient smiling in the dental chair during a visit">
      <div data-reveal=""><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Thank you", href: "/thank-you/" }]} /></div>
      <p className="eyebrow mt-5" data-reveal=""><span className="gold-rule w-8" aria-hidden="true" />Request received</p>
      <h1 className="mt-5" data-reveal="" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>Thank <em className="accent">you</em></h1>
      <p className="lead mt-6 max-w-xl" data-reveal="" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>We have your request and someone from our team will be in touch shortly, usually during office hours the same day. For anything urgent, call us at <a href={`tel:${site.phoneE164}`} className="font-semibold text-ink-700">{site.phone}</a>.</p>
      <div className="mt-8 flex flex-wrap gap-3" data-reveal="" style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
        <Button href={site.bookingUrl} variant="gold">Book a time online now</Button>
        <Button href="/" variant="outline">Back to home</Button>
      </div>
      <p className="mt-8 text-sm text-muted">While you wait, read <Link href="/why-choose-valencia-smile-what-to-expect-on-your-first-visit/" className="underline underline-offset-4">what to expect at your first visit</Link>.</p>
    </SplitHero>
  );
}
