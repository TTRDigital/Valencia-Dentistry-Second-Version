import { site } from "../../../content/site";
import { services } from "../../../content/services";
import { Icon } from "@/components/ui/Icons";

/** 3. Facts band in giant count-up numerals (final values are in the markup). */
export function HomeFacts() {
  const facts = [
    { value: String(site.google.rating), label: "Google rating", extra: <span className="flex text-gold">{[0, 1, 2, 3, 4].map((k) => <Icon.star key={k} className="h-4 w-4" />)}</span> },
    { value: String(site.google.reviewCount), label: "Google reviews" },
    { value: String(services.length), label: "Treatments under one roof" },
    { value: "PPO", label: "Most major plans accepted", text: true },
  ];
  return (
    <section className="on-dark relative overflow-clip bg-olive-900 py-16 text-on-dark grain lg:py-24" aria-labelledby="facts-title">
      <div className="container-x relative">
        <h2 id="facts-title" className="sr-only">Valencia Dentistry in numbers</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.label} className={`flex flex-col-reverse ${i > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""}`} data-reveal="" style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
              <dt className="mt-3 flex flex-wrap items-center gap-2 text-sm text-on-dark-muted">{f.label}{f.extra}</dt>
              <dd className="font-display text-[clamp(3.75rem,2rem+7vw,8.5rem)] font-light leading-[0.85] tracking-[-0.04em] tabular">
                {f.text ? <span className="italic text-gold">{f.value}</span> : <span data-count={f.value}>{f.value}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
