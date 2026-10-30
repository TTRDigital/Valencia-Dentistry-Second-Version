import { doctor } from "../../../../content/site";
import { Section } from "@/components/ui/Section";
import { Img } from "@/components/ui/Img";
import { Button, Arrow } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";

export function MeetDoctor() {
  return (
    <Section tone="ivory-200" labelledBy="doctor-heading">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal="">
          <div className="gold-frame mx-auto max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
              <Img src={doctor.portrait} alt={doctor.portraitAlt} fill sizes="(min-width: 1024px) 36vw, 90vw" className="object-cover object-top" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pl-10" data-reveal="" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <p className="eyebrow">Meet your dentist</p>
          <h2 id="doctor-heading" className="mt-4">{doctor.name}</h2>
          <span className="gold-rule mt-6" aria-hidden="true" />
          <blockquote className="mt-8">
            <Icon.quote className="h-7 w-7 text-gold" />
            <p className="serif-italic mt-3 text-2xl leading-snug text-ink-700 lg:text-3xl">“{doctor.quote}”</p>
          </blockquote>
          <p className="mt-6 text-muted">{doctor.bio[0]}</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {doctor.credentials.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm"><Icon.check className="mt-1 h-4 w-4 shrink-0 text-gold-700" />{c}</li>
            ))}
          </ul>
          <div className="mt-8"><Button href="/about/" variant="outline" icon={<Arrow />}>Read her story</Button></div>
        </div>
      </div>
    </Section>
  );
}
