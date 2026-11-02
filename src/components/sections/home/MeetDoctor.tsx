import { getDoctor } from "@/lib/cms";
import { Section } from "@/components/ui/Section";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { Button, Arrow } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";

export async function MeetDoctor() {
  const doctor = await getDoctor();
  return (
    <Section tone="ivory-200" labelledBy="doctor-heading">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal="">
          <div className="gold-frame mx-auto max-w-md">
            <DoctorCard name={doctor.name} title={doctor.title} portrait={doctor.portrait} portraitAlt={doctor.portraitAlt} />
          </div>
        </div>
        <div className="lg:col-span-7 lg:pl-10" data-reveal="" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <p className="eyebrow">Meet your dentist</p>
          <h2 id="doctor-heading" className="mt-4">{doctor.name}</h2>
          <span className="gold-rule mt-6" aria-hidden="true" />
          <p className="serif-italic mt-8 text-2xl leading-snug text-ink-700 lg:text-3xl">{doctor.statement}</p>
          <p className="mt-6 text-muted">{doctor.bio[0]}</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {doctor.credentials.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm"><Icon.check className="mt-1 h-4 w-4 shrink-0 text-gold-700" />{c}</li>
            ))}
          </ul>
          <div className="mt-8"><Button href="/about/" variant="outline" icon={<Arrow />}>Read his story</Button></div>
        </div>
      </div>
    </Section>
  );
}
