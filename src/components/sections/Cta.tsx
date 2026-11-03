import { ClosingCta } from "@/components/home/Closing";

/** Closing call to action on inner pages: the same statement band as the home page (rotating Book button, contact details, photo, aurora). */
export function CtaBand({ title, text }: { eyebrow?: string; title: string; text: string; offer?: boolean }) {
  return <ClosingCta title={title} text={text} />;
}
