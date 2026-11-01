/**
 * Screenshot QA: full-page captures at 390, 768, 1024, 1440 and 1920 px for
 * a set of pages, plus a horizontal-scroll and tap-target check.
 *
 *   npm run shots -- http://localhost:3000 [out-dir]
 */
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const OUT = process.argv[3] || "screenshots";
const PAGES = ["/", "/about/", "/services/", "/services/dental-implants/", "/services/cosmetic-dentistry/veneers/", "/smile-gallery/", "/blog/", "/dental-implant-timeline/", "/contact/", "/new-patient-offer/"];
const WIDTHS = [390, 768, 1024, 1440, 1920];
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
let problems = 0;
for (const w of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 844 : 900 } });
  const page = await ctx.newPage();
  for (const p of PAGES) {
    await page.goto(BASE + p, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      document.querySelectorAll("[data-reveal]").forEach((e) => e.animate([{ opacity: 1, transform: "none" }], { duration: 0, fill: "forwards" }));
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 80)); }
      window.scrollTo({ top: 0, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 400));
    });
    const info = await page.evaluate(() => {
      const scrollW = document.documentElement.scrollWidth;
      const small = [];
      document.querySelectorAll("a, button, input, select, textarea, summary").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none" || el.closest("[inert], [aria-hidden='true']")) return;
        if (el.tagName === "INPUT" && el.closest("label")) return; // the label is the target
        const inline = cs.display === "inline" && el.closest("p, li, td, span, figcaption");
        // 44px minimum height for every control; text links may be narrower than 44px but never under 24px (WCAG 2.5.8).
        const textLink = el.tagName === "A" && !el.querySelector("img, svg") && (el.textContent || "").trim().length > 0;
        if (!inline && (r.height < 43.5 || r.width < (textLink ? 24 : 44))) small.push(`${el.tagName.toLowerCase()} ${Math.round(r.width)}×${Math.round(r.height)} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}"`);
      });
      return { scrollW, small: small.slice(0, 8) };
    });
    const file = join(OUT, `${p === "/" ? "home" : p.replace(/^\/|\/$/g, "").replace(/\//g, "--")}-${w}.png`);
    await page.screenshot({ path: file, fullPage: true });
    const flags = [];
    if (info.scrollW > w) flags.push(`horizontal scroll ${info.scrollW}px`);
    if (info.small.length) flags.push(`small tap targets: ${info.small.join("; ")}`);
    if (flags.length) problems++;
    console.log(`${w}px ${p.padEnd(42)} ${flags.join(" | ") || "ok"}`);
  }
  await ctx.close();
}
await browser.close();
console.log(problems ? `\n${problems} page/width combinations flagged.` : "\nNo horizontal scroll, no small tap targets.");
