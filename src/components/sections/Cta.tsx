import { BeginCta } from "@/components/atelier/Cta";

/** Closing call to action on inner pages: the same "Let's begin" band as the home page. */
export function CtaBand({ title, text }: { eyebrow?: string; title: string; text: string; offer?: boolean }) {
  return <BeginCta title={title} text={text} />;
}
