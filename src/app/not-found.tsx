import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { NotFoundView } from "@/components/sections/NotFoundView";

export default function NotFound() {
  return (
    <>
      <Suspense fallback={null}><Header variant="solid" /></Suspense>
      <NotFoundView />
    </>
  );
}
