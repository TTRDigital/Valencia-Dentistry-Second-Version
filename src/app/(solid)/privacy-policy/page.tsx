import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Privacy Policy | Valencia Dentistry", description: "How Valencia Dentistry collects, uses and protects your information, including SMS consent and your privacy rights.", path: "/privacy-policy/" });
export default function Page() {
  return <LegalPage slug="privacy-policy" />;
}
