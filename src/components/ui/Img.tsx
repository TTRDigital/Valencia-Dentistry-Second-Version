import Image, { type ImageProps } from "next/image";
import images from "../../../content/images.json";

type Meta = { w: number; h: number; blur: string };
const meta = images as Record<string, Meta>;

type Props = Omit<ImageProps, "src" | "width" | "height" | "placeholder" | "blurDataURL"> & {
  src: string;
  alt: string;
};

/** next/image with width, height and a blur placeholder from content/images.json. */
export function Img({ src, alt, fill, ...rest }: Props) {
  const m = meta[src];
  const blur = m ? { placeholder: "blur" as const, blurDataURL: m.blur } : {};
  if (fill) return <Image src={src} alt={alt} fill {...blur} {...rest} />;
  return <Image src={src} alt={alt} width={m?.w ?? 1200} height={m?.h ?? 800} {...blur} {...rest} />;
}

export function imageSize(src: string) {
  return meta[src];
}
