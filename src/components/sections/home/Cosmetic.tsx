import { Section } from "@/components/ui/Section";
import { Img } from "@/components/ui/Img";
import { Button, Arrow } from "@/components/ui/Button";

export function CosmeticEditorial() {
  return (
    <Section tone="ivory" labelledBy="cosmetic-heading">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:pr-8" data-reveal="">
          <p className="eyebrow">Cosmetic dentistry</p>
          <h2 id="cosmetic-heading" className="mt-4">Smiles designed <span className="serif-italic">around you</span></h2>
          <span className="gold-rule mt-6" aria-hidden="true" />
          <p className="lead mt-6">
            Veneers, whitening, Invisalign and bonding, planned on a digital scan of your own teeth and shaped to suit your face, not a template.
          </p>
          <p className="mt-4 text-muted">
            Dr. Moezzi previews the result with you before anything begins, keeps as much natural enamel as possible, and chooses materials that look like teeth, not like dental work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/services/cosmetic-dentistry/" icon={<Arrow />}>Explore cosmetic care</Button>
            <Button href="/smile-gallery/" variant="outline">See real results</Button>
          </div>
        </div>
        <div className="lg:col-span-7" data-reveal="" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <div className="gold-frame img-zoom ml-auto max-w-3xl">
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
              <Img src="/images/practice/checkup-smile.png" alt="A smiling patient reclining in the dental chair during a checkup" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
