import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../../../../content/site";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Thank You | Valencia Smile Expert", description: "We received your request and will be in touch shortly.", path: "/thank-you/", noindex: true });

export default function ThankYou() {
  return (
    <Section tone="ivory">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ivory-200 text-gold-700"><Icon.check className="h-7 w-7" /></span>
        <p className="eyebrow mt-6">Request received</p>
        <h1 className="mt-4">Thank you</h1>
        <span className="gold-rule gold-rule-center mt-6" aria-hidden="true" />
        <p className="lead mt-6">We have your request and someone from our team will be in touch shortly, usually during office hours the same day. For anything urgent, call us at <a href={`tel:${site.phoneE164}`} className="font-semibold text-ink-700">{site.phone}</a>.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={site.bookingUrl} variant="gold">Book a time online now</Button>
          <Button href="/" variant="outline">Back to home</Button>
        </div>
        <p className="mt-10 text-sm text-muted">While you wait, read <Link href="/why-choose-valencia-smile-what-to-expect-on-your-first-visit/" className="underline underline-offset-4">what to expect at your first visit</Link>.</p>
      </div>
    </Section>
  );
}
