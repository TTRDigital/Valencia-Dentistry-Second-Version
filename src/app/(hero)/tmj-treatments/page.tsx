import type { Metadata } from "next";
import { serviceByPath } from "../../../../content/services";
import { ServicePage } from "@/components/sections/ServicePage";
import { pageMeta } from "@/lib/seo";

const s = serviceByPath("/tmj-treatments/")!;

export const metadata: Metadata = pageMeta({ title: s.seo.title, description: s.seo.description, path: s.path });

export default function Page() {
  return <ServicePage s={s} />;
}
