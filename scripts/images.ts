/**
 * Reads every image in public/images and writes content/images.json with
 * intrinsic width and height, so next/image can reserve space without static
 * imports (no blur placeholders: images are sharp or not yet painted).
 *
 *   npm run images
 */
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const PUBLIC = join(ROOT, "public");
const out: Record<string, { w: number; h: number }> = {};

async function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) await walk(p);
    else if (/\.(png|jpe?g|webp|avif)$/i.test(name)) {
      const img = sharp(p);
      const meta = await img.metadata();
      out["/" + relative(PUBLIC, p).split("\\").join("/")] = { w: meta.width!, h: meta.height! };
    }
  }
}
await walk(join(PUBLIC, "images"));
writeFileSync(join(ROOT, "content/images.json"), JSON.stringify(out, null, 0));
console.log(`content/images.json: ${Object.keys(out).length} images`);
