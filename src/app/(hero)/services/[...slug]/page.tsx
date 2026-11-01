import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "../../../../../content/services";
import { getServices } from "@/lib/cms";
import { ServicePage } from "@/components/sections/ServicePage";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return services.filter((s) => s.path.startsWith("/services/")).map((s) => ({ slug: s.path.replace(/^\/services\/|\/$/g, "").split("/") }));
}

async function load(params: Promise<{ slug: string[] }>) {
  const { slug } = await params;
  const all = await getServices();
  return { s: all.find((x) => x.path === `/services/${slug.join("/")}/`), all };
}

export async function generateMetadata({ params }: PageProps<"/services/[...slug]">): Promise<Metadata> {
  const { s } = await load(params);
  if (!s) return {};
  return pageMeta({ title: s.seo.title, description: s.seo.description, path: s.path });
}

export default async function Page({ params }: PageProps<"/services/[...slug]">) {
  const { s, all } = await load(params);
  if (!s) notFound();
  return <ServicePage s={s} all={all} />;
}
