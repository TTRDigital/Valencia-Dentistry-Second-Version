import postsJson from "../../content/posts.json";
import type { Post } from "../../content/types";

export const posts = postsJson as Post[];
export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const categoryLabel: Record<Post["category"], string> = {
  implants: "Dental implants",
  "oral-surgery": "Oral surgery",
  restorative: "Crowns & bridges",
  cosmetic: "Cosmetic dentistry",
  general: "Healthy smiles",
};

export type TocItem = { id: string; text: string; level: 2 | 3 };

/** Adds ids to h2/h3 for the table of contents and returns the entries. */
export function withHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const seen = new Set<string>();
  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g, (_m, lvl, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim();
    let id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "section";
    while (seen.has(id)) id += "-2";
    seen.add(id);
    if (lvl === "2") toc.push({ id, text, level: 2 });
    return `<h${lvl} id="${id}"${attrs}>${inner}</h${lvl}>`;
  });
  return { html: out, toc };
}

export function readingTime(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 220));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "America/Los_Angeles" });
}
