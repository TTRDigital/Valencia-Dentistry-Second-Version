/**
 * Renders the favicon set from public/images/brand/icon-tile.svg (the practice mark on ivory):
 * src/app/favicon.ico (16/32/48), src/app/icon.png (32), src/app/apple-icon.png (180),
 * public/icon-192.png, public/icon-512.png.
 *
 *   npm run favicons
 */
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const svg = readFileSync(join(ROOT, "public/images/brand/icon-tile.svg"));
const png = (size: number) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

const [i16, i32, i48, i180, i192, i512] = await Promise.all([16, 32, 48, 180, 192, 512].map(png));
writeFileSync(join(ROOT, "src/app/icon.png"), i32);
writeFileSync(join(ROOT, "src/app/apple-icon.png"), i180);
writeFileSync(join(ROOT, "public/icon-192.png"), i192);
writeFileSync(join(ROOT, "public/icon-512.png"), i512);

// ICO container with 16, 32 and 48 px PNG entries
const entries = [i16, i32, i48];
const sizes = [16, 32, 48];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(entries.length, 4);
const dirs: Buffer[] = [];
let offset = 6 + 16 * entries.length;
entries.forEach((buf, i) => {
  const d = Buffer.alloc(16);
  d.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 0);
  d.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 1);
  d.writeUInt8(0, 2);
  d.writeUInt8(0, 3);
  d.writeUInt16LE(1, 4);
  d.writeUInt16LE(32, 6);
  d.writeUInt32LE(buf.length, 8);
  d.writeUInt32LE(offset, 12);
  offset += buf.length;
  dirs.push(d);
});
writeFileSync(join(ROOT, "src/app/favicon.ico"), Buffer.concat([header, ...dirs, ...entries]));
console.log("favicons written");
