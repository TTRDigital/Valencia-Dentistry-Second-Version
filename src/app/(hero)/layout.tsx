import { Suspense } from "react";
import { Header } from "@/components/layout/Header";

/** Pages with a dark cinematic hero: the header starts transparent. */
export default function HeroLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Suspense fallback={<div className="h-16 lg:h-[116px]" aria-hidden="true" />}><Header variant="transparent" /></Suspense>
      {children}
    </>
  );
}
