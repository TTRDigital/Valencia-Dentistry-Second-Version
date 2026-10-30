import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { site } from "../../content/site";

export default function NotFound() {
  return (
    <>
      <Header variant="solid" />
      <Section tone="ivory">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-4">This page has moved or never existed</h1>
          <span className="gold-rule gold-rule-center mt-6" aria-hidden="true" />
          <p className="lead mt-6">Try one of the links below, or call us at <a href={`tel:${site.phoneE164}`} className="font-semibold text-ink-700">{site.phone}</a> and we will point you the right way.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/">Home</Button>
            <Button href="/services/" variant="outline">Services</Button>
            <Button href="/blog/" variant="outline">Blog</Button>
            <Button href="/contact/" variant="outline">Contact</Button>
          </div>
          <p className="mt-10 text-sm text-muted">Looking for something specific? The <Link href="/sitemap/" className="underline underline-offset-4">sitemap</Link> lists every page.</p>
        </div>
      </Section>
    </>
  );
}
