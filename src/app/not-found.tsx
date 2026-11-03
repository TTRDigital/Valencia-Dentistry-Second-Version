import { Header } from "@/components/layout/Header";
import { NotFoundView } from "@/components/sections/NotFoundView";

export default function NotFound() {
  return (
    <>
      <Header variant="solid" />
      <main id="main" className="flex-1"><NotFoundView /></main>
    </>
  );
}
