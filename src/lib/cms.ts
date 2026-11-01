import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { createClient } from "next-sanity";
import { apiVersion, cmsConfigured, dataset, projectId } from "../../sanity/env";
import type { Service, Post, Testimonial, BeforeAfterCase } from "../../content/types";
import { services as builtInServices } from "../../content/services";
import { testimonials as builtInTestimonials, cases as builtInCases, doctor as builtInDoctor } from "../../content/site";
import postsJson from "../../content/posts.json";

/**
 * Content loader with a built-in fallback. When the Sanity project is
 * configured and reachable, published documents from the CMS replace the
 * built-in copies (matched by id/slug); otherwise the site renders the
 * content checked into content/. Results are cached for an hour and tagged
 * "content" so the /api/revalidate webhook can refresh them on publish.
 */
const client = cmsConfigured ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" }) : null;

type SiteImage = { path?: string; alt?: string; upload?: { asset?: { url?: string } } };
const imgPath = (i?: SiteImage) => i?.upload?.asset?.url ?? i?.path ?? "";

async function fetchAll<T>(query: string): Promise<T[] | null> {
  if (!client) return null;
  try {
    return await client.fetch<T[]>(query, {}, { signal: AbortSignal.timeout(5000) } as never);
  } catch (err) {
    console.warn("[cms] falling back to built-in content:", String(err).slice(0, 120));
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "services");
  const docs = await fetchAll<Record<string, unknown>>(`*[_type=="service"]{..., "slug": slug.current, "imageDoc": image{..., upload{asset->{url}}}, extraSections[]{..., image{..., upload{asset->{url}}}}}`);
  if (!docs?.length) return builtInServices;
  return builtInServices.map((b) => {
    const d = docs.find((x) => x.slug === b.slug);
    if (!d) return b;
    const image = d.imageDoc as SiteImage | undefined;
    return {
      ...b,
      ...(d as unknown as Partial<Service>),
      image: imgPath(image) || b.image,
      imageAlt: image?.alt || b.imageAlt,
      extraSections: ((d.extraSections as (Record<string, unknown> & { image?: SiteImage })[]) ?? b.extraSections ?? []).map((x) => ({ ...x, image: imgPath(x.image) || undefined, imageAlt: x.image?.alt })) as Service["extraSections"],
    } as Service;
  });
}

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "posts");
  const builtIn = postsJson as Post[];
  const docs = await fetchAll<Record<string, unknown> & { slug: string; image?: SiteImage }>(`*[_type=="post"]{..., "slug": slug.current, image{..., upload{asset->{url}}}} | order(datePublished desc)`);
  if (!docs?.length) return builtIn;
  const merged = docs.map((d) => {
    const b = builtIn.find((x) => x.slug === d.slug);
    return { ...(b ?? {}), ...d, author: "Dr. Neda Moezzi, DDS", image: imgPath(d.image) || b?.image || "/images/practice/exam-mirror.png", imageAlt: d.image?.alt || b?.imageAlt || "" } as Post;
  });
  return merged.sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "testimonials");
  const docs = await fetchAll<Record<string, unknown>>(`*[_type=="testimonial"] | order(order asc){_id, name, text, rating, source, service}`);
  if (!docs?.length) return builtInTestimonials;
  return docs.map((d) => ({ id: String(d._id), name: String(d.name), text: String(d.text), rating: 5, source: "google", service: d.service as string | undefined }));
}

export async function getCases(): Promise<BeforeAfterCase[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "cases");
  const docs = await fetchAll<Record<string, unknown> & { before?: SiteImage; after?: SiteImage }>(`*[_type=="beforeAfterCase" && consent==true] | order(order asc){_id, title, treatment, before{..., upload{asset->{url}}}, after{..., upload{asset->{url}}}}`);
  if (!docs?.length) return builtInCases;
  return docs.map((d) => ({ id: String(d._id), title: String(d.title), treatment: String(d.treatment ?? ""), before: imgPath(d.before), after: imgPath(d.after), beforeAlt: d.before?.alt ?? "Before", afterAlt: d.after?.alt ?? "After" }));
}

export async function getDoctor() {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "doctor");
  const docs = await fetchAll<Record<string, unknown> & { portrait?: SiteImage }>(`*[_type=="doctor"][0...1]{..., portrait{..., upload{asset->{url}}}}`);
  const d = docs?.[0];
  if (!d) return builtInDoctor;
  return { ...builtInDoctor, ...d, portrait: imgPath(d.portrait) || builtInDoctor.portrait, portraitAlt: d.portrait?.alt || builtInDoctor.portraitAlt };
}
