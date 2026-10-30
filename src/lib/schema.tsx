import { site, doctor, technology } from "../../content/site";
import type { Faq, Post, Service } from "../../content/types";

const ID = {
  dentist: `${site.url}/#dentist`,
  person: `${site.url}/about/#dr-neda-moezzi`,
  website: `${site.url}/#website`,
};

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const list = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return (
    <script
      type="application/ld+json"
      // Structured data for search engines. "<" is escaped so content can never close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(list.length === 1 ? list[0] : list).replace(/</g, "\\u003c") }}
    />
  );
}

export function dentistSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": ID.dentist,
    name: site.name,
    url: site.url,
    telephone: site.phoneE164,
    email: site.email,
    image: `${site.url}/images/practice/team-sign.png`,
    logo: `${site.url}/images/brand/logo.svg`,
    priceRange: site.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
    ],
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    sameAs: Object.values(site.social),
    founder: { "@id": ID.person },
    employee: { "@id": ID.person },
    medicalSpecialty: ["Dentistry", "CosmeticDentistry", "OralSurgery"],
    paymentAccepted: "Cash, Credit Card, Insurance, Financing",
    makesOffer: {
      "@type": "Offer",
      name: site.offer.title,
      price: "59",
      priceCurrency: "USD",
      description: "New patient exam and digital X-rays.",
      eligibleCustomerType: "New patients",
    },
    availableService: technology.map((t) => ({ "@type": "MedicalProcedure", name: t.name })),
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ID.person,
    name: "Neda Moezzi",
    honorificPrefix: "Dr.",
    honorificSuffix: "DDS",
    jobTitle: doctor.title,
    image: `${site.url}${doctor.portrait}`,
    url: `${site.url}/about/`,
    worksFor: { "@id": ID.dentist },
    alumniOf: { "@type": "CollegeOrUniversity", name: doctor.school },
    knowsAbout: ["Cosmetic dentistry", "Dental implants", "Holistic dentistry", "Oral surgery"],
    sameAs: [site.social.linkedin],
  };
}

export function webSiteSchema() {
  return { "@context": "https://schema.org", "@type": "WebSite", "@id": ID.website, url: site.url, name: site.name, publisher: { "@id": ID.dentist }, inLanguage: "en-US" };
}

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${site.url}${c.href}` })),
  };
}

export function faqSchema(faqs: Faq[]) {
  if (!faqs?.length) return null as unknown as Record<string, unknown>;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${site.url}${s.path}#service`,
    name: s.name,
    url: `${site.url}${s.path}`,
    description: s.seo.description,
    image: `${site.url}${s.image}`,
    procedureType: "https://schema.org/NoninvasiveProcedure",
    howPerformed: s.process.steps.map((st) => st.title).join(" → "),
    provider: { "@id": ID.dentist },
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
  };
}

export function articleSchema(p: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${site.url}/${p.slug}/#article`,
    headline: p.title,
    description: p.seo.description,
    image: [`${site.url}${p.image}`],
    datePublished: p.datePublished,
    dateModified: p.dateModified ?? p.datePublished,
    author: { "@id": ID.person },
    publisher: { "@id": ID.dentist },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/${p.slug}/` },
    inLanguage: "en-US",
  };
}
