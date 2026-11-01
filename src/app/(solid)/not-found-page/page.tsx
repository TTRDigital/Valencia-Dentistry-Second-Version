import type { Metadata } from "next";
import { NotFoundView } from "@/components/sections/NotFoundView";

/** Rendered by the proxy for unknown URLs (with a 404 status). */
export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFoundPage() {
  return <NotFoundView />;
}
