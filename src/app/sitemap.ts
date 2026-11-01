import type { MetadataRoute } from "next";
import { site } from "../../content/site";
import { services } from "../../content/services";
import { posts } from "@/lib/blog";

const staticPages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/about/", priority: 0.8, freq: "monthly" },
  { path: "/services/", priority: 0.9, freq: "monthly" },
  { path: "/smile-gallery/", priority: 0.7, freq: "monthly" },
  { path: "/testimonials/", priority: 0.6, freq: "monthly" },
  { path: "/contact/", priority: 0.7, freq: "yearly" },
  { path: "/appointment/", priority: 0.7, freq: "yearly" },
  { path: "/new-patient-offer/", priority: 0.8, freq: "monthly" },
  { path: "/emergency-dental/", priority: 0.8, freq: "monthly" },
  { path: "/blog/", priority: 0.7, freq: "weekly" },
  { path: "/sitemap/", priority: 0.3, freq: "monthly" },
  { path: "/privacy-policy/", priority: 0.2, freq: "yearly" },
  { path: "/terms-and-services/", priority: 0.2, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-30");
  return [
    ...staticPages.map((p) => ({ url: `${site.url}${p.path}`, lastModified: now, changeFrequency: p.freq, priority: p.priority })),
    ...services.map((s) => ({ url: `${site.url}${s.path}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${site.url}/${p.slug}/`, lastModified: new Date(p.dateModified ?? p.datePublished), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
