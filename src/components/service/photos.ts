import { officeImages } from "../../../content/office-images";
import images from "../../../content/images.json";
import type { Service } from "../../../content/types";

const pool: Record<string, string[]> = {
  preventive: ["cleaning", "treatment-room-2", "scan-closeup"],
  family: ["treatment-room-2", "cleaning", "veneer-tryin"],
  cosmetic: ["veneer-smile", "veneer-tryin", "aligner-patient-2"],
  restorative: ["implant-model-hands", "scan-closeup", "denture-closeup"],
  surgery: ["implant-model-hands", "denture-closeup", "treatment-room"],
  holistic: ["cleaning", "treatment-room", "treatment-room-2"],
};

const altBySrc = Object.fromEntries(Object.values(officeImages).map((o) => [o.src, o.alt])) as Record<string, string>;
const has = (p: string) => p in (images as Record<string, unknown>);
const name = (src: string) => src.split("/").pop()!.replace(/\.jpg$/, "");

export type SvcPhoto = { src: string; alt: string; portrait?: string };

/** The treatment's own photos (its card image, then its section images, then its category's), with a 2:3 crop where one exists. */
export function photosFor(s: Service, n = 4): SvcPhoto[] {
  const srcs = [s.image, ...(s.extraSections ?? []).map((x) => x.image).filter(Boolean), ...(pool[s.category] ?? []).map((k) => `/images/office/${k}.jpg`)] as string[];
  const unique = Array.from(new Set(srcs)).filter(has).slice(0, n);
  return unique.map((src) => {
    const portrait = `/images/portrait/${name(src)}.jpg`;
    return { src, alt: altBySrc[src] ?? s.imageAlt, portrait: has(portrait) ? portrait : undefined };
  });
}
