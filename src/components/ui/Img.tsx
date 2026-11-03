import { getImageProps, type ImageProps } from "next/image";
import { preload } from "react-dom";
import images from "../../../content/images.json";

type Meta = { w: number; h: number };
const meta = images as Record<string, Meta>;

type Props = Omit<ImageProps, "src" | "width" | "height" | "placeholder" | "blurDataURL" | "preload"> & {
  src: string;
  alt: string;
};

/**
 * Optimised image as a plain <img>: srcset, sizes and intrinsic width/height
 * come from next/image's getImageProps (no client component, so nothing to
 * hydrate). Quality 85 everywhere and no blurred placeholder: an image is
 * either sharp or not painted yet. `priority` preloads it with high fetch
 * priority (LCP images only). Frames are sized so no photo is shown wider
 * than its file allows (≤ half its pixel width in CSS px on 2× screens).
 */
export function Img({ src, alt, fill, quality = 85, priority, loading, fetchPriority, ...rest }: Props) {
  const m = meta[src];
  const { props } = getImageProps({
    src,
    alt,
    quality,
    ...(fill ? { fill: true } : { width: m?.w ?? 1200, height: m?.h ?? 800 }),
    loading: priority ? "eager" : loading,
    fetchPriority: priority ? "high" : fetchPriority,
    ...rest,
  });
  if (priority && props.srcSet) preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: "high" });
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...props} />;
}

export function imageSize(src: string) {
  return meta[src];
}
