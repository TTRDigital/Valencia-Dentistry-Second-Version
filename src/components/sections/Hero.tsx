import { Img } from "@/components/ui/Img";
import { HeroVideo } from "./HeroVideo";

/**
 * Cinematic full-bleed hero. The poster image is the LCP element (priority);
 * an optional muted video loads only after the page is interactive and never
 * under reduced motion / data saver (see HeroVideo). Without a video, the
 * poster drifts slowly (CSS, off under reduced motion).
 */
export function Hero({
  image,
  imageAlt,
  video,
  children,
  compact,
  align = "left",
  objectPosition = "center",
}: {
  image: string;
  imageAlt: string;
  video?: { src: string; poster?: string };
  children: React.ReactNode;
  compact?: boolean;
  align?: "left" | "center";
  objectPosition?: string;
}) {
  return (
    <section className={`relative isolate flex ${compact ? "min-h-[62svh] lg:min-h-[66svh]" : "min-h-[92svh]"} items-end overflow-hidden bg-ink text-on-dark on-dark`}>
      <div className="absolute inset-0 -z-10">
        <div className={`absolute inset-0 ${video ? "" : "hero-drift"}`}>
          <Img src={image} alt={imageAlt} fill priority fetchPriority="high" sizes="100vw" className="object-cover" style={{ objectPosition }} />
        </div>
        {video && <HeroVideo src={video.src} />}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" aria-hidden="true" />
      </div>
      <div className={`container-x hero-rise w-full ${compact ? "pb-14 pt-40 lg:pb-20 lg:pt-48" : "pb-16 pt-44 lg:pb-24 lg:pt-56"} ${align === "center" ? "text-center" : ""}`}>
        {children}
      </div>
    </section>
  );
}
