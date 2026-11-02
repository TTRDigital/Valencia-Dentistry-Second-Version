import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Terms and Services | Valencia Dentistry", description: "Terms of use for the Valencia Dentistry website, services and SMS messaging program.", path: "/terms-and-services/" });
export default function Page() {
  return <LegalPage slug="terms-and-services" />;
}
