import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { services, serviceByPath } from "../../../../../content/services";
import { ServicePage } from "@/components/sections/ServicePage";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return services.filter((s) => s.path.startsWith("/services/")).map((s) => ({ slug: s.path.replace(/^\/services\/|\/$/g, "").split("/") }));
}

async function load(params: Promise<{ slug: string[] }>) {
  const { slug } = await params;
  return serviceByPath(`/services/${slug.join("/")}/`);
}

export async function generateMetadata({ params }: PageProps<"/services/[...slug]">): Promise<Metadata> {
  const s = await load(params);
  if (!s) return {};
  return pageMeta({ title: s.seo.title, description: s.seo.description, path: s.path });
}

async function Content({ params }: Pick<PageProps<"/services/[...slug]">, "params">) {
  const s = await load(params);
  if (!s) notFound();
  return <ServicePage s={s} />;
}

export default function Page({ params }: PageProps<"/services/[...slug]">) {
  return (
    <Suspense fallback={null}>
      <Content params={params} />
    </Suspense>
  );
}
