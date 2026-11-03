import { Img, imageSize } from "./Img";

type Ratio = "3/2" | "2/3" | "1/1" | "4/5" | "4/3" | "16/10" | "auto";

/**
 * A real photo in its own frame. The frame never grows wider than the file
 * allows on a 2× screen (pixel width ÷ 2, less any object-fit crop), `sizes`
 * describes the width the image is actually drawn at (frame × crop factor),
 * and any crop is anchored near the top (50% 20%) so heads stay in frame.
 *
 * `w` is the frame's CSS width on desktop, `mw` its width in vw on phones.
 * `wipe` reveals it with a clip-path wipe; `parallax` drifts the whole frame.
 */
export function Photo({
  src,
  alt,
  ratio,
  w,
  mw = 92,
  arch,
  wipe = true,
  parallax,
  priority,
  className = "",
  frameClassName = "",
  position,
  children,
}: {
  src: string;
  alt: string;
  ratio?: Ratio;
  w: number;
  mw?: number;
  arch?: boolean;
  wipe?: boolean;
  parallax?: number | boolean;
  priority?: boolean;
  className?: string;
  frameClassName?: string;
  position?: string;
  children?: React.ReactNode;
}) {
  const m = imageSize(src) ?? { w: 1600, h: 1067 };
  const imgRatio = m.w / m.h;
  const r = ratio && ratio !== "auto" ? ratio : `${m.w}/${m.h}`;
  const [a, b] = r.split("/").map(Number);
  const frameRatio = a / b;
  // When the frame is narrower than the photo, cover-cropping draws the image wider than the frame.
  const k = imgRatio > frameRatio ? imgRatio / frameRatio : 1;
  const maxFrame = Math.floor(m.w / 2 / k);
  const sizes = `(max-width: 767px) ${Math.round(mw * k)}vw, ${Math.round(Math.min(w, maxFrame) * k)}px`;
  const frame = (
    <div
      className={`frame ${arch ? "arch" : ""} ${frameClassName}`}
      style={{ aspectRatio: r, maxWidth: maxFrame }}
      data-wipe={wipe ? "" : undefined}
    >
      <Img src={src} alt={alt} fill sizes={sizes} priority={priority} fetchPriority={priority ? "high" : undefined} style={position ? { objectPosition: position } : undefined} />
      {children}
    </div>
  );
  return (
    <div className={`w-full ${className}`} style={{ maxWidth: maxFrame }} data-parallax={parallax ? String(parallax === true ? 6 : parallax) : undefined}>
      {frame}
    </div>
  );
}

/** Largest CSS width a photo can be shown at without upscaling on a 2× screen. */
export function maxCssWidth(src: string, frameRatio?: number) {
  const m = imageSize(src) ?? { w: 1600, h: 1067 };
  const k = frameRatio && m.w / m.h > frameRatio ? m.w / m.h / frameRatio : 1;
  return Math.floor(m.w / 2 / k);
}
