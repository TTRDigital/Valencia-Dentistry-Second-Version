/**
 * Reads every image in public/images and writes content/images.json with
 * width, height and a tiny blur placeholder, so next/image can reserve space
 * and blur-up without static imports.
 *
 *   npm run images
 */
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const PUBLIC = join(ROOT, "public");
const out: Record<string, { w: number; h: number; blur: string }> = {};

async function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) await walk(p);
    else if (/\.(png|jpe?g|webp|avif)$/i.test(name)) {
      const img = sharp(p);
      const meta = await img.metadata();
      const blur = await img.clone().resize(12, 12, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
      out["/" + relative(PUBLIC, p).split("\\").join("/")] = { w: meta.width!, h: meta.height!, blur: `data:image/webp;base64,${blur.toString("base64")}` };
    }
  }
}
await walk(join(PUBLIC, "images"));
writeFileSync(join(ROOT, "content/images.json"), JSON.stringify(out, null, 0));
console.log(`content/images.json: ${Object.keys(out).length} images`);
