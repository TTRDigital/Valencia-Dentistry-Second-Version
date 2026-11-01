import Link from "next/link";
import { site, insurers } from "../../../../content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";

export function Affordable() {
  return (
    <Section tone="white" labelledBy="afford-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading eyebrow="Insurance & financing" title="Affordable care, made simple" id="afford-heading" lead="We verify your benefits before treatment, explain what is covered and put every estimate in writing. No surprises." />
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4" aria-label="Accepted PPO insurance plans" data-reveal="">
            {insurers.map((i) => (
              <li key={i.name} className="flex items-center justify-center rounded-xl border border-sand bg-ivory p-3">
                <Img src={i.logo} alt={i.name} className="h-8 w-auto object-contain grayscale opacity-80" sizes="120px" />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted" data-reveal="">{site.insurance}. Not on the list? Call us and we will check your plan.</p>
        </div>
        <div className="grid gap-5 lg:col-span-6">
          <div className="card flex flex-col justify-between gap-6 rounded-2xl bg-ink p-8 text-on-dark on-dark grain sm:flex-row sm:items-center" data-reveal="">
            <div>
              <p className="eyebrow">New patients</p>
              <p className="mt-2 font-display text-4xl">{site.offer.price} <span className="text-xl">exam &amp; X-rays</span></p>
              <p className="mt-2 max-w-sm text-sm text-on-dark-muted">{site.offer.description}</p>
            </div>
            <Button href="/new-patient-offer/" variant="gold">Claim the special</Button>
          </div>
          <div className="card p-8" data-reveal="" style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory-200 text-gold-700"><Icon.shield className="h-5 w-5" /></span>
              <div>
                <h3 className="text-xl">Flexible financing</h3>
                <p className="mt-2 text-sm text-muted">Monthly payment plans through third-party financing partners help spread the cost of larger treatment such as implants, veneers or All-on-4. Ask our team which option fits your budget.</p>
                <Link href="/contact/" className="text-link mt-3 min-h-11 text-sm">Ask about payment options <Icon.arrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
