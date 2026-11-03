import Image, { type ImageProps } from "next/image";
import images from "../../../content/images.json";

type Meta = { w: number; h: number };
const meta = images as Record<string, Meta>;

type Props = Omit<ImageProps, "src" | "width" | "height" | "placeholder" | "blurDataURL"> & {
  src: string;
  alt: string;
};

/**
 * next/image with intrinsic width and height from content/images.json.
 * Quality 85 everywhere and no blurred placeholder: an image is either sharp
 * or not painted yet. Frames are sized so no photo is shown wider than its
 * file allows (≤ half its pixel width in CSS px on 2× screens).
 */
export function Img({ src, alt, fill, quality = 85, ...rest }: Props) {
  const m = meta[src];
  if (fill) return <Image src={src} alt={alt} fill quality={quality} {...rest} />;
  return <Image src={src} alt={alt} width={m?.w ?? 1200} height={m?.h ?? 800} quality={quality} {...rest} />;
}

export function imageSize(src: string) {
  return meta[src];
}
