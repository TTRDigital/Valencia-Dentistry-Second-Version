import { defineArrayMember, defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title tag", type: "string", validation: (r) => r.required().max(60).warning("Keep it under 60 characters") }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3, validation: (r) => r.required().max(155).warning("Keep it under 155 characters") }),
    defineField({ name: "noindex", title: "Hide from search engines", type: "boolean", initialValue: false }),
    defineField({ name: "ogImage", title: "Share image (1200×630)", type: "image", description: "Optional. Without it the site renders a branded image automatically." }),
  ],
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "q", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "a", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "q" } },
});

export const titledItem = defineType({
  name: "titledItem",
  title: "Item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const bulletColumn = defineType({
  name: "bulletColumn",
  title: "Bullet column",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "bullets", title: "Bullets", type: "array", of: [defineArrayMember({ type: "string" })] }),
  ],
});

export const siteImage = defineType({
  name: "siteImage",
  title: "Image",
  type: "object",
  description: "Either upload an image or reference one of the built-in photos by path (e.g. /images/practice/checkup-smile.png).",
  fields: [
    defineField({ name: "upload", title: "Upload", type: "image", options: { hotspot: true } }),
    defineField({ name: "path", title: "Built-in image path", type: "string" }),
    defineField({ name: "alt", title: "Alt text", type: "string", validation: (r) => r.required().warning("Describe the picture for screen readers and search engines") }),
  ],
  preview: { select: { title: "alt", subtitle: "path", media: "upload" } },
});

export const extraSection = defineType({
  name: "extraSection",
  title: "Content section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({ name: "items", title: "Cards", type: "array", of: [defineArrayMember({ type: "titledItem" })] }),
    defineField({ name: "bullets", title: "Bullets", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "columns", title: "Two columns", type: "array", of: [defineArrayMember({ type: "bulletColumn" })], validation: (r) => r.max(2) }),
    defineField({ name: "image", title: "Image", type: "siteImage" }),
  ],
  preview: { select: { title: "heading", subtitle: "eyebrow" } },
});

/** Section builder blocks for the generic Page type. */
export const pageSections = [
  defineArrayMember({
    type: "object",
    name: "heroSection",
    title: "Hero",
    fields: [
      defineField({ name: "eyebrow", type: "string" }),
      defineField({ name: "title", type: "string", validation: (r) => r.required() }),
      defineField({ name: "intro", type: "text", rows: 3 }),
      defineField({ name: "image", type: "siteImage" }),
      defineField({ name: "compact", type: "boolean", initialValue: true }),
    ],
    preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `Hero: ${title}` }) },
  }),
  defineArrayMember({
    type: "object",
    name: "richTextSection",
    title: "Text",
    fields: [defineField({ name: "eyebrow", type: "string" }), defineField({ name: "heading", type: "string" }), defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block" })] })],
    preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: `Text: ${title ?? ""}` }) },
  }),
  defineArrayMember({ type: "extraSection", name: "contentSection", title: "Cards / bullets" }),
  defineArrayMember({
    type: "object",
    name: "faqSection",
    title: "FAQs",
    fields: [defineField({ name: "heading", type: "string", initialValue: "Questions, answered" }), defineField({ name: "faqs", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] }), defineArrayMember({ type: "faqItem" })] })],
    preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: `FAQs: ${title ?? ""}` }) },
  }),
  defineArrayMember({
    type: "object",
    name: "componentSection",
    title: "Site component",
    description: "Drops in one of the site's ready-made sections.",
    fields: [
      defineField({
        name: "component",
        type: "string",
        options: { list: ["reviews", "technology", "gallery", "serviceGrid", "affordable", "visit", "cta", "form", "meetDoctor"] },
        validation: (r) => r.required(),
      }),
      defineField({ name: "heading", type: "string" }),
      defineField({ name: "text", type: "text", rows: 2 }),
    ],
    preview: { select: { title: "component", subtitle: "heading" } },
  }),
];
