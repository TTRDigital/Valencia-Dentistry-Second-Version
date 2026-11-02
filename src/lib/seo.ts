import type { Metadata } from "next";
import { site } from "../../content/site";

/**
 * Metadata for a page: title (≤60 chars), description (≤155), canonical,
 * Open Graph + Twitter with a 1200×630 image rendered by /og/<key>.png.
 */
export function pageMeta({
  title,
  description,
  path,
  ogKey,
  noindex,
  type = "website",
  publishedTime,
  modifiedTime,
  ogImage,
}: {
  title: string;
  description: string;
  path: string;
  ogKey?: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  ogImage?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const image = ogImage ?? `${site.url}/og/${ogKey ?? keyFromPath(path)}.png`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(type === "article" ? { publishedTime, modifiedTime, authors: ["Dr. Nuriel Lavi, DDS"] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/** "/services/dental-implants/" → "services--dental-implants"; "/" → "home". */
export function keyFromPath(path: string) {
  const k = path.replace(/^\/|\/$/g, "").replace(/\//g, "--");
  return k || "home";
}
