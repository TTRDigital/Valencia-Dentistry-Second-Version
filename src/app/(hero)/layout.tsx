import { Suspense } from "react";
import { Header } from "@/components/layout/Header";

/** Pages with a dark cinematic hero: the header starts transparent. */
export default function HeroLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Suspense fallback={null}><Header variant="transparent" /></Suspense>
      {children}
    </>
  );
}
