import { getTestimonials } from "@/lib/cms";
import { Img } from "@/components/ui/Img";
import { Stars } from "@/components/ui/Stars";

export async function QuoteBand({ id = "tamarea-jaster", image = "/images/office/treatment-room-2.jpg" }: { id?: string; image?: string }) {
  const testimonials = await getTestimonials();
  const t = testimonials.find((x) => x.id === id || x.id === `testimonial-${id}`) ?? testimonials[0];
  return (
    <section className="relative isolate overflow-hidden bg-ink text-on-dark on-dark" aria-label="Featured patient review">
      <div className="absolute inset-0 -z-10">
        <Img src={image} alt="" fill sizes="100vw" className="object-cover object-top opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" aria-hidden="true" />
      </div>
      <div className="container-x py-24 text-center lg:py-32" data-reveal="">
        <Stars n={t.rating} className="h-5 w-5" />
        <blockquote className="mx-auto mt-6 max-w-4xl">
          <p className="serif-italic text-2xl leading-snug sm:text-3xl lg:text-[2.6rem]">“{t.text}”</p>
          <footer className="mt-8 text-sm uppercase tracking-[0.18em] text-on-dark-muted">{t.name} · Google review</footer>
        </blockquote>
      </div>
    </section>
  );
}
