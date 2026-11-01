import { Suspense } from "react";
import { Header } from "@/components/layout/Header";

/** Pages without a hero image: solid ivory header with reserved height. */
export default function SolidLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Suspense fallback={<div className="h-16 lg:h-[116px]" aria-hidden="true" />}><Header variant="solid" /></Suspense>
      {children}
    </>
  );
}
