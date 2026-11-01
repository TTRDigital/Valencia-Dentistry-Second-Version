import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Terms and Services | Valencia Smile Expert", description: "Terms of use for the Valencia Smile Expert website, services and SMS messaging program.", path: "/terms-and-services/" });
export default function Page() {
  return <LegalPage slug="terms-and-services" />;
}
