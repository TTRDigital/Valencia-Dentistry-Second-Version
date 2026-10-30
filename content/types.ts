/**
 * Content model shared by the built-in content (content/*.ts), the Sanity
 * schemas (sanity/schemaTypes) and the page templates. Every page on the
 * site is rendered from these types, whether the data comes from the CMS or
 * from the built-in copy.
 */

export type Seo = {
  /** Title tag, 60 characters or less. */
  title: string;
  /** Meta description, 155 characters or less. */
  description: string;
  noindex?: boolean;
};

export type Faq = { q: string; a: string };

export type TitledItem = { title: string; text: string };

export type Step = { title: string; text: string };

/** Keys of the technology the practice actually has (see content/site.ts). */
export type TechKey = "cbct" | "itero" | "prf" | "guided-implants" | "intraoral-camera" | "laser" | "digital-xray" | "same-day-crowns";

export type ServiceCategory = "preventive" | "family" | "cosmetic" | "restorative" | "surgery" | "holistic";

/** A flexible content section used for service-specific material (symptoms, types, do/don't lists…). */
export type ExtraSection = {
  eyebrow?: string;
  heading: string;
  intro?: string;
  /** Cards with a title and a sentence. */
  items?: TitledItem[];
  /** Plain bullet list. */
  bullets?: string[];
  /** Two bullet columns, e.g. before/after or do/don't. */
  columns?: { title: string; bullets: string[] }[];
  /** Optional image from public/images (path starts with /images/). */
  image?: string;
  imageAlt?: string;
};

export type Service = {
  /** Last URL segment, e.g. "dental-implants". */
  slug: string;
  /** Full path with slashes, e.g. "/services/dental-implants/" or "/tmj-treatments/". */
  path: string;
  /** Parent service path for sub-services, e.g. "/services/cosmetic-dentistry/". */
  parent?: string;
  category: ServiceCategory;
  /** Short name for menus and cards, e.g. "Dental Implants". */
  name: string;
  /** One line for the mega menu and cards (max ~90 characters). */
  menuDescription: string;
  /** Card/menu image from public/images. */
  image: string;
  imageAlt: string;
  seo: Seo;
  hero: {
    eyebrow: string;
    /** The page H1 (include Valencia or Santa Clarita where natural). */
    title: string;
    /** One or two sentences. */
    intro: string;
  };
  overview: {
    heading: string;
    paragraphs: string[];
    /** Short highlights shown next to the overview. */
    highlights?: TitledItem[];
  };
  whoFor: { heading: string; intro?: string; bullets: string[] };
  benefits: { heading: string; intro?: string; items: TitledItem[] };
  process: { heading: string; intro?: string; steps: Step[] };
  technology: TechKey[];
  extraSections?: ExtraSection[];
  /** Show the before/after gallery block (only where real cases exist). */
  showGallery?: boolean;
  cost: { heading: string; paragraphs: string[] };
  faqs: Faq[];
  /** Slugs of related services (2–4). */
  related: string[];
  cta: { heading: string; text: string };
  /** Anything the copywriter was unsure about (medical claims, facts to verify). */
  flags?: string[];
};

export type Post = {
  slug: string;
  title: string;
  seo: Seo;
  excerpt: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image: string;
  imageAlt: string;
  /** Category used for the index filter and related posts. */
  category: "implants" | "oral-surgery" | "restorative" | "cosmetic" | "general";
  keyTakeaways: string[];
  /** Sanitised article HTML (h2/h3/p/ul/ol/table/a/strong/em). */
  html: string;
  faqs: Faq[];
  related: string[];
  flags?: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  /** Review text, verbatim from Google. */
  text: string;
  rating: 5;
  source: "google";
  /** Relative date as shown on the current site, e.g. "a month ago". */
  when?: string;
  /** Optional video testimonial (public path) with captions. */
  video?: { src: string; poster: string; captions: string; transcript: string };
  service?: string;
};

export type BeforeAfterCase = {
  id: string;
  title: string;
  treatment: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};
