import { Header } from "@/components/layout/Header";

/** Pages with a dark cinematic hero: the header starts transparent. */
export default function HeroLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header variant="transparent" />
      {children}
    </>
  );
}
