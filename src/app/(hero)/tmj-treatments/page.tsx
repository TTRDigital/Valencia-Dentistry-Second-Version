import type { Metadata } from "next";
import { serviceByPath } from "../../../../content/services";
import { getServices } from "@/lib/cms";
import { ServicePage } from "@/components/sections/ServicePage";
import { pageMeta } from "@/lib/seo";

const s = serviceByPath("/tmj-treatments/")!;

export const metadata: Metadata = pageMeta({ title: s.seo.title, description: s.seo.description, path: s.path });

export default async function Page() {
  const all = await getServices();
  return <ServicePage s={all.find((x) => x.path === s.path) ?? s} all={all} />;
}
