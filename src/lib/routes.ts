import { services } from "../../content/services";
import postsJson from "../../content/posts.json";

/** Every public page path (with trailing slash). Used by the proxy for real 404s and by the audit. */
export const staticRoutes = [
  "/", "/about/", "/services/", "/smile-gallery/", "/testimonials/", "/contact/", "/appointment/", "/new-patient-offer/",
  "/emergency-dental/", "/blog/", "/sitemap/", "/privacy-policy/", "/terms-and-services/", "/thank-you/", "/styleguide/", "/tmj-treatments/",
];

export const routes: string[] = [
  ...staticRoutes,
  ...services.map((s) => s.path),
  ...(postsJson as { slug: string }[]).map((p) => `/${p.slug}/`),
];
