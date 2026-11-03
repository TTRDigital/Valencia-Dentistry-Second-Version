import { site } from "../../../content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { Icon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

export function Visit({ heading = "Visit us in Valencia", eyebrow = "Find us" }: { heading?: string; eyebrow?: string }) {
  return (
    <Section tone="ivory-200" labelledBy="visit-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={eyebrow} title={heading} id="visit-heading" lead="Second floor of the Tourney Road professional building, minutes from the I-5 and Valencia Town Center, with free parking at the door." />
          <dl className="mt-10 space-y-6 text-[0.95rem]" data-reveal="">
            <div className="flex gap-4">
              <dt className="sr-only">Address</dt>
              <Icon.pin className="mt-1 h-5 w-5 shrink-0 text-gold-700" />
              <dd>
                <span className="font-semibold text-ink-700">{site.address.street}</span><br />
                {site.address.city} ({site.address.neighborhood}), {site.address.region} {site.address.postalCode}<br />
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-1 min-h-11 text-sm">Get directions <Icon.arrowRight className="h-4 w-4" /></a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="sr-only">Hours</dt>
              <Icon.clock className="mt-1 h-5 w-5 shrink-0 text-gold-700" />
              <dd>
                <ul className="space-y-1">
                  {site.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-6 tabular">
                      <span>{h.days}</span><span className={h.closed ? "text-muted" : "font-semibold text-ink-700"}>{h.closed ? "Closed" : `${h.open} – ${h.close}`}</span>
                    </li>
                  ))}
                </ul>
                <OpenBadge className="mt-2 text-ink-700" />
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="sr-only">Phone and email</dt>
              <Icon.phone className="mt-1 h-5 w-5 shrink-0 text-gold-700" />
              <dd>
                <a href={`tel:${site.phoneE164}`} className="inline-flex min-h-11 items-center font-semibold text-ink-700 hover:underline underline-offset-4">{site.phone}</a><br />
                <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center hover:underline underline-offset-4">{site.email}</a>
              </dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal="">
            <Button href={site.bookingUrl}>Book your first visit</Button>
            <Button href="/contact/" variant="outline">Contact us</Button>
          </div>
        </div>
        <div className="lg:col-span-7" data-reveal="">
          <div className="gold-frame">
            <iframe
              title="Map to Valencia Dentistry, 27420 Tourney Rd Suite 240, Santa Clarita"
              src={site.mapsEmbed}
              className="h-[380px] w-full rounded-2xl border border-sand bg-ivory grayscale-[35%] lg:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
