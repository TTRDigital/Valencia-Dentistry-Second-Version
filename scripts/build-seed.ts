/**
 * Builds content/seed.json (every Sanity document) from the built-in content:
 * content/site.ts, content/pages.ts, content/services/*, content/posts.json,
 * content/legal.json, src/lib/nav.ts.
 *
 *   npm run build-seed
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const { site, doctor, testimonials, cases } = await import("../content/site.ts");
const { homeFaqs, about, emergency, offer } = await import("../content/pages.ts");
const { services } = await import("../content/services/index.ts");
const { mainNav, footerNav } = await import("../src/lib/nav.ts");
const posts = (await import("../content/posts.json", { with: { type: "json" } })).default as Record<string, unknown>[];
const legal = (await import("../content/legal.json", { with: { type: "json" } })).default as Record<string, { title: string; html: string; updated: string }>;

const img = (path: string | undefined, alt = "") => (path ? { _type: "siteImage", path, alt } : undefined);
const key = (i: number) => `k${i}`;
const withKeys = <T extends object>(arr: T[] | undefined) => (arr ?? []).map((x, i) => ({ _key: key(i), ...x }));
const strings = (arr: string[] | undefined) => (arr ?? []).map((x) => x);

const docs: Record<string, unknown>[] = [];

docs.push({
  _id: "siteSettings", _type: "siteSettings", name: site.name, phone: site.phone, phoneE164: site.phoneE164, email: site.email,
  street: site.address.street, city: site.address.city, region: site.address.region, postalCode: site.address.postalCode,
  mapsUrl: site.mapsUrl, bookingUrl: site.bookingUrl, hoursText: "Mon–Fri 8 AM – 5 PM · Sat & Sun closed",
  googleRating: site.google.rating, googleReviewCount: site.google.reviewCount, insurance: site.insurance, financing: site.financing,
  areaServed: site.areaServed, social: site.social, gtmId: site.gtmId,
  seo: { _type: "seo", title: "Dentist in Valencia, Santa Clarita | Valencia Smile Expert", description: "Holistic, one-on-one dentistry in Valencia with Dr. Neda Moezzi, DDS." },
});
docs.push({ _id: "navigation", _type: "navigation", title: "Navigation", main: withKeys(mainNav.map((n) => ({ _type: "object", label: n.label, href: n.href }))), footerPractice: withKeys(footerNav.practice.map((n) => ({ _type: "object", ...n }))), footerServices: withKeys(footerNav.services.map((n) => ({ _type: "object", ...n }))) });
docs.push({ _id: "offer", _type: "offer", title: site.offer.title, price: site.offer.price, short: site.offer.short, description: site.offer.description, bullets: offer.includes, fineprint: site.offer.fineprint, popupEnabled: true, popupDelayDesktop: 12, popupDelayMobile: 20 });
docs.push({ _id: "doctor-neda-moezzi", _type: "doctor", name: doctor.name, shortName: doctor.shortName, title: doctor.title, school: doctor.school, gradYear: doctor.gradYear, portrait: img(doctor.portrait, doctor.portraitAlt), quote: doctor.quote, bio: doctor.bio, credentials: doctor.credentials });
testimonials.forEach((t, i) => docs.push({ _id: `testimonial-${t.id}`, _type: "testimonial", name: t.name, text: t.text, rating: t.rating, source: t.source, service: t.service, order: i }));
cases.forEach((c, i) => docs.push({ _id: `case-${c.id}`, _type: "beforeAfterCase", title: c.title, treatment: c.treatment, before: img(c.before, c.beforeAlt), after: img(c.after, c.afterAlt), consent: true, order: i }));
homeFaqs.forEach((f, i) => docs.push({ _id: `faq-home-${i}`, _type: "faq", q: f.q, a: f.a, group: "home" }));
offer.faqs.forEach((f, i) => docs.push({ _id: `faq-offer-${i}`, _type: "faq", q: f.q, a: f.a, group: "offer" }));
emergency.faqs.forEach((f, i) => docs.push({ _id: `faq-emergency-${i}`, _type: "faq", q: f.q, a: f.a, group: "emergency" }));

for (const s of services) {
  docs.push({
    _id: `service-${s.slug}`, _type: "service", name: s.name, slug: { _type: "slug", current: s.slug }, path: s.path, parent: s.parent, category: s.category,
    menuDescription: s.menuDescription, image: img(s.image, s.imageAlt),
    hero: { ...s.hero }, overview: { heading: s.overview.heading, paragraphs: s.overview.paragraphs, highlights: withKeys((s.overview.highlights ?? []).map((h) => ({ _type: "titledItem", ...h }))) },
    whoFor: { ...s.whoFor }, benefits: { heading: s.benefits.heading, intro: s.benefits.intro, items: withKeys(s.benefits.items.map((h) => ({ _type: "titledItem", ...h }))) },
    process: { heading: s.process.heading, intro: s.process.intro, steps: withKeys(s.process.steps.map((h) => ({ _type: "titledItem", ...h }))) },
    technology: strings(s.technology),
    extraSections: withKeys((s.extraSections ?? []).map((x) => ({ _type: "extraSection", eyebrow: x.eyebrow, heading: x.heading, intro: x.intro, items: withKeys((x.items ?? []).map((i) => ({ _type: "titledItem", ...i }))), bullets: x.bullets, columns: withKeys((x.columns ?? []).map((c) => ({ _type: "bulletColumn", ...c }))), image: img(x.image, x.imageAlt) }))),
    showGallery: Boolean(s.showGallery), cost: { ...s.cost }, faqs: withKeys(s.faqs.map((f) => ({ _type: "faqItem", ...f }))), related: s.related, cta: { ...s.cta },
    seo: { _type: "seo", ...s.seo },
  });
}
for (const p of posts) {
  docs.push({
    _id: `post-${p.slug}`, _type: "post", title: p.title, slug: { _type: "slug", current: p.slug }, excerpt: p.excerpt, datePublished: p.datePublished, dateModified: p.dateModified,
    author: { _type: "reference", _ref: "doctor-neda-moezzi" }, image: img(p.image as string, p.imageAlt as string), category: p.category, keyTakeaways: p.keyTakeaways, html: p.html,
    faqs: withKeys(((p.faqs as { q: string; a: string }[]) ?? []).map((f) => ({ _type: "faqItem", ...f }))), related: p.related, seo: { _type: "seo", ...(p.seo as object) },
  });
}
for (const [slug, l] of Object.entries(legal)) docs.push({ _id: `legal-${slug}`, _type: "legalPage", title: l.title, slug: { _type: "slug", current: slug }, updated: l.updated, html: l.html, seo: { _type: "seo", title: `${l.title} | Valencia Smile Expert`, description: `${l.title} of Valencia Smile Expert.` } });

// Marketing pages as section-builder documents
const pageDoc = (id: string, title: string, path: string, seo: { title: string; description: string }, sections: Record<string, unknown>[]) =>
  docs.push({ _id: `page-${id}`, _type: "page", title, path, seo: { _type: "seo", ...seo }, sections: withKeys(sections) });
pageDoc("home", "Home", "/", { title: "Dentist in Valencia, Santa Clarita | Valencia Smile Expert", description: "Holistic, one-on-one dentistry in Valencia with Dr. Neda Moezzi, DDS. Implants, veneers, Invisalign, same-day crowns. $59 new patient exam & X-rays." }, [
  { _type: "heroSection", eyebrow: "Valencia · Santa Clarita", title: "Dentistry with heart, one patient at a time", intro: "Holistic, one-on-one care from Dr. Neda Moezzi, DDS. No handoffs, no rush, and a plan built around your long-term health.", image: img("/images/practice/team-sign.png", "Dr. Neda Moezzi and her team in the Valencia office"), compact: false },
  { _type: "componentSection", component: "reviews" }, { _type: "componentSection", component: "serviceGrid" }, { _type: "componentSection", component: "meetDoctor" }, { _type: "componentSection", component: "technology" }, { _type: "componentSection", component: "gallery" }, { _type: "componentSection", component: "affordable" },
  { _type: "faqSection", heading: "Questions, answered", faqs: withKeys(homeFaqs.map((_, i) => ({ _type: "reference", _ref: `faq-home-${i}` }))) }, { _type: "componentSection", component: "visit" }, { _type: "componentSection", component: "cta", heading: "Ready when you are" },
]);
pageDoc("about", "Our Practice", "/about/", about.seo, [
  { _type: "heroSection", ...about.hero, image: img("/images/practice/team-office-wide.png", "Dr. Neda Moezzi seated with her team") },
  { _type: "contentSection", eyebrow: "Our mission", heading: about.mission.heading, intro: about.mission.paragraphs.join("\n\n") },
  { _type: "contentSection", eyebrow: "What guides us", heading: "The values behind every visit", items: withKeys(about.values.map((v) => ({ _type: "titledItem", ...v }))) },
  { _type: "componentSection", component: "technology", heading: about.technology.heading, text: about.technology.text }, { _type: "componentSection", component: "serviceGrid" }, { _type: "componentSection", component: "reviews" }, { _type: "componentSection", component: "visit" },
]);
pageDoc("emergency-dental", "Emergency Dental", "/emergency-dental/", emergency.seo, [
  { _type: "heroSection", ...emergency.hero, image: img("/images/practice/dr-moezzi-treating.png", "Dr. Moezzi treating a patient") },
  { _type: "contentSection", eyebrow: "What to do right now", heading: "Common emergencies and first steps", items: withKeys(emergency.situations.map((v) => ({ _type: "titledItem", ...v }))) },
  { _type: "faqSection", heading: "Emergency questions", faqs: withKeys(emergency.faqs.map((_, i) => ({ _type: "reference", _ref: `faq-emergency-${i}` }))) }, { _type: "componentSection", component: "form" }, { _type: "componentSection", component: "visit" },
]);
pageDoc("new-patient-offer", "New Patient Special", "/new-patient-offer/", offer.seo, [
  { _type: "heroSection", ...offer.hero, image: img("/images/practice/checkup-smile.png", "A smiling patient in the dental chair") },
  { _type: "contentSection", eyebrow: "What is included", heading: "Everything a first visit should be", bullets: offer.includes },
  { _type: "contentSection", eyebrow: "How it works", heading: "Four simple steps", items: withKeys(offer.steps.map((v) => ({ _type: "titledItem", ...v }))) },
  { _type: "faqSection", heading: "About the special", faqs: withKeys(offer.faqs.map((_, i) => ({ _type: "reference", _ref: `faq-offer-${i}` }))) }, { _type: "componentSection", component: "form" }, { _type: "componentSection", component: "affordable" },
]);
for (const [id, title, path, seo] of [
  ["services", "Services", "/services/", { title: "Dental Services in Valencia, CA | Valencia Smile Expert", description: "Preventive, family, cosmetic, restorative, implant and holistic dentistry in one Valencia office." }],
  ["smile-gallery", "Smile Gallery", "/smile-gallery/", { title: "Smile Gallery: Before & After Photos | Valencia Smile Expert", description: "Real before-and-after results from Dr. Neda Moezzi's patients in Valencia." }],
  ["testimonials", "Reviews", "/testimonials/", { title: "Patient Reviews & Testimonials | Valencia Smile Expert", description: "What patients say about Dr. Neda Moezzi and Valencia Smile Expert." }],
  ["contact", "Contact", "/contact/", { title: "Contact Valencia Smile Expert | Dentist in Valencia, CA", description: "Call (661) 254-5200, book online or send a message." }],
  ["appointment", "Appointment", "/appointment/", { title: "Request an Appointment | Valencia Smile Expert", description: "Request a dental appointment with Dr. Neda Moezzi in Valencia." }],
  ["blog", "Blog", "/blog/", { title: "Dental Health Blog | Valencia Smile Expert, Santa Clarita", description: "Plain-language guides from Dr. Neda Moezzi, DDS." }],
] as const) pageDoc(id, title, path, seo, [{ _type: "componentSection", component: id === "contact" || id === "appointment" ? "form" : id === "smile-gallery" ? "gallery" : id === "testimonials" ? "reviews" : "serviceGrid" }]);

writeFileSync(join(ROOT, "content/seed.json"), JSON.stringify(docs, null, 0));
const counts: Record<string, number> = {};
for (const d of docs) counts[d._type as string] = (counts[d._type as string] ?? 0) + 1;
console.log(`content/seed.json: ${docs.length} documents`, counts);
