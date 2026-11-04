import type { ReactNode } from "react";
import { Photo } from "@/components/ui/Photo";
import { imageSize } from "@/components/ui/Img";
import { Aurora } from "@/components/ui/Effects";

/** The head-safe 2:3 crop of an office photo, when one exists. */
export function portraitOf(src: string) {
  const p = src.replace("/images/office/", "/images/portrait/");
  return p !== src && imageSize(p) ? p : undefined;
}

/**
 * Split hero for inner pages: copy on the left, the whole photo on the right
 * in its own ratio (a 2:3 crop in an arch where one exists, otherwise the
 * 3:2 original). Dark with the aurora under a transparent header, or light
 * under the solid header. The copy rises in with CSS, so it is visible
 * without JavaScript and stays an LCP candidate.
 */
export function SplitHero({
  image,
  imageAlt,
  children,
  tone = "light",
  portrait = true,
  solidHeader,
}: {
  image: string;
  imageAlt: string;
  children: ReactNode;
  tone?: "dark" | "light";
  portrait?: boolean;
  /** The page sits under the solid header (which reserves its own height). */
  solidHeader?: boolean;
}) {
  const dark = tone === "dark";
  const tall = portrait ? portraitOf(image) : undefined;
  return (
    <section data-recede="" className={`split-hero hero-rise relative overflow-clip ${dark ? "on-dark grain bg-ink text-on-dark" : "bg-ivory text-text"}`}>
      {dark ? <Aurora /> : <div className="grid-lines" aria-hidden="true" />}
      <div className={`container-x relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14 ${solidHeader ? "pb-14 pt-8 lg:pb-20 lg:pt-12" : "min-h-[72svh] pb-16 pt-[calc(var(--hdr-h)+28px)] lg:pb-24 lg:pt-[calc(var(--hdr-h)+var(--topbar-h)+40px)]"}`}>
        <div className="lg:col-span-7" data-recede-copy="">{children}</div>
        <div className="lg:col-span-5" data-recede-media="">
          {tall ? (
            <Photo src={tall} alt={imageAlt} ratio="2/3" w={340} mw={70} arch wipe={false} priority className="mx-auto lg:ml-auto lg:mr-0" />
          ) : (
            <Photo src={image} alt={imageAlt} w={540} mw={92} wipe={false} priority className="mx-auto lg:ml-auto lg:mr-0" position="50% 30%" />
          )}
        </div>
      </div>
    </section>
  );
}

/** Inner-page hero (dark split layout). Kept under its old name so every page picks up the new design. */
export function Hero({ image, imageAlt, children }: { image: string; imageAlt: string; children: ReactNode; compact?: boolean; objectPosition?: string; align?: "left" | "center" }) {
  return (
    <SplitHero image={image} imageAlt={imageAlt}>
      {children}
    </SplitHero>
  );
}
