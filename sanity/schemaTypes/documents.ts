import { defineArrayMember, defineField, defineType } from "sanity";
import { pageSections } from "./objects";

const seoField = defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" });
const groups = [
  { name: "content", title: "Content", default: true },
  { name: "seo", title: "SEO" },
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups,
  fields: [
    defineField({ name: "name", title: "Practice name", type: "string", group: "content" }),
    defineField({ name: "phone", title: "Phone (display)", type: "string", group: "content" }),
    defineField({ name: "phoneE164", title: "Phone (E.164, e.g. +16612545200)", type: "string", group: "content" }),
    defineField({ name: "email", title: "Email", type: "string", group: "content" }),
    defineField({ name: "street", title: "Street", type: "string", group: "content" }),
    defineField({ name: "city", title: "City", type: "string", group: "content" }),
    defineField({ name: "region", title: "State", type: "string", group: "content" }),
    defineField({ name: "postalCode", title: "ZIP", type: "string", group: "content" }),
    defineField({ name: "mapsUrl", title: "Google Maps link", type: "url", group: "content" }),
    defineField({ name: "bookingUrl", title: "Online booking link", type: "url", group: "content" }),
    defineField({ name: "hoursText", title: "Hours (display)", type: "string", group: "content" }),
    defineField({ name: "googleRating", title: "Google rating", type: "number", group: "content" }),
    defineField({ name: "googleReviewCount", title: "Google review count", type: "number", group: "content" }),
    defineField({ name: "insurance", title: "Insurance line", type: "string", group: "content" }),
    defineField({ name: "financing", title: "Financing line", type: "string", group: "content" }),
    defineField({ name: "areaServed", title: "Areas served", type: "array", of: [defineArrayMember({ type: "string" })], group: "content" }),
    defineField({ name: "social", title: "Social links", type: "object", group: "content", fields: [
      defineField({ name: "facebook", type: "url" }), defineField({ name: "instagram", type: "url" }), defineField({ name: "linkedin", type: "url" }), defineField({ name: "x", type: "url" }),
    ] }),
    defineField({ name: "gtmId", title: "Google Tag Manager ID", type: "string", group: "content" }),
    { ...seoField, title: "Default SEO" },
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "main", title: "Main menu", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "string" })], preview: { select: { title: "label", subtitle: "href" } } })] }),
    defineField({ name: "footerPractice", title: "Footer: practice links", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "string" })], preview: { select: { title: "label", subtitle: "href" } } })] }),
    defineField({ name: "footerServices", title: "Footer: service links", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "string" })], preview: { select: { title: "label", subtitle: "href" } } })] }),
  ],
});

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  groups,
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "path", title: "URL path", type: "string", group: "content", description: "e.g. /about/", validation: (r) => r.required().regex(/^\/([a-z0-9-]+\/)*$/) }),
    defineField({ name: "sections", title: "Sections", type: "array", of: pageSections, group: "content" }),
    seoField,
  ],
  preview: { select: { title: "title", subtitle: "path" } },
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups,
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", group: "content", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "path", title: "URL path", type: "string", group: "content", validation: (r) => r.required().regex(/^\/([a-z0-9-]+\/)*$/) }),
    defineField({ name: "parent", title: "Parent path", type: "string", group: "content" }),
    defineField({ name: "category", type: "string", group: "content", options: { list: ["preventive", "family", "cosmetic", "restorative", "surgery", "holistic"] }, validation: (r) => r.required() }),
    defineField({ name: "menuDescription", title: "Menu description (one line)", type: "string", group: "content", validation: (r) => r.max(90) }),
    defineField({ name: "image", type: "siteImage", group: "content" }),
    defineField({ name: "hero", type: "object", group: "content", fields: [defineField({ name: "eyebrow", type: "string" }), defineField({ name: "title", title: "H1", type: "string", validation: (r) => r.required() }), defineField({ name: "intro", type: "text", rows: 3 })] }),
    defineField({ name: "overview", type: "object", group: "content", fields: [defineField({ name: "heading", type: "string" }), defineField({ name: "paragraphs", type: "array", of: [defineArrayMember({ type: "text" })] }), defineField({ name: "highlights", type: "array", of: [defineArrayMember({ type: "titledItem" })] })] }),
    defineField({ name: "whoFor", title: "Who it's for", type: "object", group: "content", fields: [defineField({ name: "heading", type: "string" }), defineField({ name: "intro", type: "text", rows: 2 }), defineField({ name: "bullets", type: "array", of: [defineArrayMember({ type: "string" })] })] }),
    defineField({ name: "benefits", type: "object", group: "content", fields: [defineField({ name: "heading", type: "string" }), defineField({ name: "intro", type: "text", rows: 2 }), defineField({ name: "items", type: "array", of: [defineArrayMember({ type: "titledItem" })] })] }),
    defineField({ name: "process", type: "object", group: "content", fields: [defineField({ name: "heading", type: "string" }), defineField({ name: "intro", type: "text", rows: 2 }), defineField({ name: "steps", type: "array", of: [defineArrayMember({ type: "titledItem" })] })] }),
    defineField({ name: "technology", type: "array", group: "content", of: [defineArrayMember({ type: "string" })], options: { list: ["cbct", "itero", "prf", "guided-implants", "intraoral-camera", "laser", "digital-xray", "same-day-crowns"] } }),
    defineField({ name: "extraSections", title: "More sections", type: "array", group: "content", of: [defineArrayMember({ type: "extraSection" })] }),
    defineField({ name: "showGallery", title: "Show before/after gallery", type: "boolean", group: "content", initialValue: false }),
    defineField({ name: "cost", type: "object", group: "content", fields: [defineField({ name: "heading", type: "string" }), defineField({ name: "paragraphs", type: "array", of: [defineArrayMember({ type: "text" })] })] }),
    defineField({ name: "faqs", type: "array", group: "content", of: [defineArrayMember({ type: "faqItem" })] }),
    defineField({ name: "related", title: "Related services (slugs)", type: "array", group: "content", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "cta", type: "object", group: "content", fields: [defineField({ name: "heading", type: "string" }), defineField({ name: "text", type: "text", rows: 2 })] }),
    seoField,
  ],
  preview: { select: { title: "name", subtitle: "path" } },
});

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups,
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", group: "content", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3, group: "content" }),
    defineField({ name: "datePublished", type: "datetime", group: "content" }),
    defineField({ name: "dateModified", type: "datetime", group: "content" }),
    defineField({ name: "author", type: "reference", to: [{ type: "doctor" }], group: "content" }),
    defineField({ name: "image", type: "siteImage", group: "content" }),
    defineField({ name: "category", type: "string", group: "content", options: { list: ["implants", "oral-surgery", "restorative", "cosmetic", "general"] } }),
    defineField({ name: "keyTakeaways", type: "array", of: [defineArrayMember({ type: "string" })], group: "content" }),
    defineField({ name: "html", title: "Article (HTML)", type: "text", rows: 30, group: "content", description: "Migrated article body. Headings (h2/h3), paragraphs, lists, tables and links." }),
    defineField({ name: "faqs", type: "array", of: [defineArrayMember({ type: "faqItem" })], group: "content" }),
    defineField({ name: "related", title: "Related posts (slugs)", type: "array", of: [defineArrayMember({ type: "string" })], group: "content" }),
    seoField,
  ],
  preview: { select: { title: "title", subtitle: "datePublished" } },
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "datePublished", direction: "desc" }] }],
});

export const doctor = defineType({
  name: "doctor",
  title: "Doctor / team",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "shortName", type: "string" }),
    defineField({ name: "title", title: "Role", type: "string" }),
    defineField({ name: "school", type: "string" }),
    defineField({ name: "gradYear", type: "number" }),
    defineField({ name: "portrait", type: "siteImage" }),
    defineField({ name: "quote", type: "text", rows: 3 }),
    defineField({ name: "bio", type: "array", of: [defineArrayMember({ type: "text" })] }),
    defineField({ name: "credentials", type: "array", of: [defineArrayMember({ type: "string" })] }),
  ],
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Patient name (as shown)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Review text (verbatim)", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({ name: "rating", type: "number", initialValue: 5, validation: (r) => r.min(1).max(5) }),
    defineField({ name: "source", type: "string", initialValue: "google", options: { list: ["google"] } }),
    defineField({ name: "service", title: "Service (label)", type: "string" }),
    defineField({ name: "video", title: "Video testimonial", type: "object", fields: [
      defineField({ name: "file", type: "file", options: { accept: "video/mp4" } }),
      defineField({ name: "poster", type: "image" }),
      defineField({ name: "captions", title: "Captions (.vtt)", type: "file" }),
      defineField({ name: "transcript", type: "text", rows: 8 }),
    ] }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "service" } },
});

export const beforeAfterCase = defineType({
  name: "beforeAfterCase",
  title: "Before / after case",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "treatment", type: "string" }),
    defineField({ name: "before", type: "siteImage", validation: (r) => r.required() }),
    defineField({ name: "after", type: "siteImage", validation: (r) => r.required() }),
    defineField({ name: "consent", title: "Patient consent on file", type: "boolean", initialValue: true }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "treatment" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ (shared)",
  type: "document",
  fields: [
    defineField({ name: "q", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "a", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "group", type: "string", options: { list: ["home", "offer", "emergency", "general"] } }),
  ],
  preview: { select: { title: "q", subtitle: "group" } },
});

export const offer = defineType({
  name: "offer",
  title: "Offer / popup",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", type: "string" }),
    defineField({ name: "short", title: "Short label", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "bullets", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "fineprint", type: "text", rows: 2 }),
    defineField({ name: "popupEnabled", title: "Show popup", type: "boolean", initialValue: true }),
    defineField({ name: "popupDelayDesktop", title: "Popup delay desktop (seconds)", type: "number", initialValue: 12 }),
    defineField({ name: "popupDelayMobile", title: "Popup delay mobile (seconds)", type: "number", initialValue: 20 }),
  ],
});

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  groups,
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", group: "content", validation: (r) => r.required() }),
    defineField({ name: "updated", type: "date", group: "content" }),
    defineField({ name: "html", title: "Body (HTML)", type: "text", rows: 30, group: "content" }),
    seoField,
  ],
  preview: { select: { title: "title" } },
});
