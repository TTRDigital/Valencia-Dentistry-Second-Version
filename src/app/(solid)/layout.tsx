import { Header } from "@/components/layout/Header";

/** Pages without a hero image: solid ivory header with reserved height. */
export default function SolidLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header variant="solid" />
      {children}
    </>
  );
}
