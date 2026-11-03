/**
 * Derived images, made from the untouched originals (no AI, no generative fill):
 *
 *  - Before/after cases: the source files are ~430 px wide. Each pair is
 *    centre-cropped to a shared size, then enlarged 2× with a Lanczos filter
 *    and a light unsharp mask, so a slider shown at up to ~430 CSS px stays
 *    sharp on retina screens. Originals live in assets/originals/cases/.
 *  - Portrait (2:3) crops of the 3:2 office photos, framed so no head is cut,
 *    for arches and tall frames. The 3:2 originals stay in public/images/office/.
 *
 *   npm run derive-images && npm run images
 */
import sharp from "sharp";
import { mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const ORIG_CASES = join(ROOT, "assets/originals/cases");
const OUT_CASES = join(ROOT, "public/images/cases");
const OFFICE = join(ROOT, "public/images/office");
const OUT_PORTRAIT = join(ROOT, "public/images/portrait");
mkdirSync(OUT_PORTRAIT, { recursive: true });

const SHARPEN = { sigma: 0.6, m1: 0.4, m2: 0.8 };

// 1. Cases: shared size per pair, then 2× Lanczos.
for (const name of readdirSync(ORIG_CASES).filter((n) => n.endsWith(".jpg"))) {
  const src = sharp(join(ORIG_CASES, name));
  const { width = 0, height = 0 } = await src.metadata();
  const isImplant = name.startsWith("implant");
  const w = isImplant ? 599 : 425;
  const h = isImplant ? 351 : 404;
  const left = Math.floor((width - w) / 2);
  const top = Math.floor((height - h) / 2);
  await sharp(join(ORIG_CASES, name))
    .extract({ left, top, width: w, height: h })
    .resize(w * 2, h * 2, { kernel: "lanczos3" })
    .sharpen(SHARPEN)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(join(OUT_CASES, name));
}

// 2. Portrait 2:3 crops (x = left edge in the 1600 px original), heads fully inside.
const portraits: [string, number][] = [
  ["aligner-patient-2", 397],
  ["aligner-patient", 445],
  ["veneer-smile", 365],
  ["veneer-tryin", 381],
  ["implant-model-hands", 439],
  ["treatment-room", 480],
];
for (const [name, left] of portraits) {
  const src = sharp(join(OFFICE, `${name}.jpg`));
  const { height = 0 } = await src.metadata();
  const width = Math.round((height * 2) / 3);
  await src.extract({ left, top: 0, width, height }).jpeg({ quality: 90, mozjpeg: true }).toFile(join(OUT_PORTRAIT, `${name}.jpg`));
}
console.log("derived: cases ×2 (Lanczos), portrait crops", portraits.length);
