/**
 * Builds the migrated content that is generated from the crawl of the old site:
 *   content/posts.json  – 31 blog posts (article HTML + editorial metadata from content/posts-meta)
 *   content/legal.json  – privacy policy and terms pages
 *
 *   node --experimental-strip-types scripts/build-content.ts <crawl-dir>
 *
 * The crawl itself is not in the repo. Cleanup applied to article HTML:
 * leaked SEO/drafting notes removed, CTA labels appended to the last FAQ
 * answer stripped, empty headings/paragraphs removed, a malformed table cell
 * fixed, internal links made root-relative, old booking buttons replaced by
 * the practice's booking link.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import * as cheerio from "cheerio";

const ROOT = new URL("..", import.meta.url).pathname;
const CRAWL = process.argv[2];
if (!CRAWL) throw new Error("usage: build-content.ts <crawl-dir>");
const BOOK = "https://book2.getweave.com/657e8080-2ad9-44fa-8cfb-2c06a59cd7a7/request-appointment?source=WEBSITE";

type Raw = { slug: string; title: string; datePublished: string; dateModified?: string; author: string; image: string; imageAlt: string; faq: { q: string; a: string }[]; html: string };
const raws: Raw[] = JSON.parse(readFileSync(join(CRAWL, "blog-posts.json"), "utf8"));

const CTA_TAIL = /\s*(Request Your Post-Op Guide|Book a Same-Day Crown Consultation|Get a Written Cost Comparison|Request a Written Cost Estimate|Schedule Your Implant Consultation|Book a Dental Bridge Consultation|Schedule a Post-Op Check|Schedule a Free [A-Za-z ]+|Book [A-Z][A-Za-z -]+Consultation|Schedule [A-Z][A-Za-z -]+Consultation)\s*$/;

function cleanHtml(html: string, slug: string) {
  const $ = cheerio.load(`<div id="r">${html}</div>`, null, false);
  const root = $("#r");
  // Leaked drafting / SEO notes
  root.find("h2, h3").each((_, el) => {
    const t = $(el).text().trim();
    if (/^(Local SEO|Suggested images|FAQ — quick answers|FAQ - quick answers)/i.test(t) || /\(voice-search/i.test(t)) {
      // remove heading and everything until the next heading of same or higher level
      let n = $(el).next();
      while (n.length && !/^h[1-3]$/i.test(n[0].tagName)) { const nx = n.next(); n.remove(); n = nx; }
      $(el).remove();
    } else if (/voice-search|snippet optimized/i.test(t)) $(el).text(t.replace(/\s*\(.*?\)\s*$/, ""));
  });
  root.find("p").each((_, el) => {
    const t = $(el).text().trim();
    if (/^Local SEO matters/i.test(t) || /we can generate them after you approve/i.test(t)) $(el).remove();
    if (t === "" || t === "." || t === " ") $(el).remove();
  });
  root.find("h2, h3, h4").each((_, el) => { if (!$(el).text().replace(/ /g, "").trim()) $(el).remove(); });
  // Booking buttons / CTAs → our booking link, plain text CTAs kept as links
  root.find("a[href*='getweave']").each((_, el) => {
    $(el).attr("href", BOOK).attr("target", "_blank").attr("rel", "noopener noreferrer").attr("class", "btn btn-outline btn-sm");
    const parent = $(el).parent();
    if (parent.is("p") && parent.text().trim() === $(el).text().trim()) parent.attr("class", "cta-row");
  });
  // Anchors without href (leftover button markup): drop CTA duplicates, unwrap the rest
  root.find("a:not([href])").each((_, el) => {
    const t = $(el).text().trim();
    if (CTA_TAIL.test(" " + t) || /consultation|schedule|book|request/i.test(t)) $(el).remove();
    else $(el).replaceWith($(el).html() ?? "");
  });
  // External links open in a new tab
  root.find("a[href^='http']").each((_, el) => {
    const h = $(el).attr("href") ?? "";
    if (!/valenciasmileexpert\.com/.test(h)) $(el).attr("target", "_blank").attr("rel", "noopener noreferrer");
  });
  // Table fixes
  root.find("td, th").each((_, el) => {
    let h = $(el).html() ?? "";
    h = h.replace(/10 615 years/g, "10 to 15 years").replace(/\)\s*Source: internal cost guide/g, ")");
    $(el).html(h);
  });
  // Typos reported in review
  let out = root.html() ?? "";
  out = out.replace(/sinus lif ts/g, "sinus lifts").replace(/précis estimate/g, "precise estimate").replace(/€1,500 to €3,500/g, "$1,500 to $3,500");
  // Internal links: root-relative, fix the known broken one
  out = out.replace(/https?:\/\/(www\.)?valenciasmileexpert\.com/g, "").replace(/href="\/dental-implants\/"/g, 'href="/services/dental-implants/"');
  // The scaling vs root planing post does not exist on the old site either: link to the preventive page
  out = out.replace(/href="\/scaling-vs-root-planing[^"]*"/g, 'href="/services/preventive-dentistry/"');
  if (slug === "why-regular-dental-cleanings-matter-health-cost-how-often-to-come-dental-cleaning-valencia") {
    out = out.replace(/<p>(How often do I need a cleaning\?)(Most adults[^<]*)<\/p>/, "<p><strong>$1</strong> $2</p>");
  }
  return out.trim();
}

const posts = raws.map((r) => {
  const metaPath = join(ROOT, "content/posts-meta", `${r.slug}.json`);
  if (!existsSync(metaPath)) throw new Error(`missing meta for ${r.slug}`);
  const m = JSON.parse(readFileSync(metaPath, "utf8"));
  const faqs = r.faq.map((f) => ({ q: f.q.trim(), a: (f.a || "").replace(CTA_TAIL, "").trim() })).filter((f) => f.q && f.a);
  const image = existsSync(join(ROOT, "public/images/blog", `${r.slug}.png`)) ? `/images/blog/${r.slug}.png` : "/images/practice/exam-mirror.png";
  return {
    slug: r.slug,
    title: m.title || r.title,
    seo: { title: m.seoTitle, description: m.seoDescription },
    excerpt: m.excerpt,
    datePublished: r.datePublished,
    dateModified: r.dateModified && r.dateModified > r.datePublished ? r.dateModified : r.datePublished,
    author: "Dr. Neda Moezzi, DDS",
    image,
    imageAlt: m.imageAlt || r.imageAlt || r.title,
    category: m.category,
    keyTakeaways: m.keyTakeaways,
    html: cleanHtml(r.html, r.slug),
    faqs,
    related: m.related,
    flags: m.flags,
  };
});
posts.sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
writeFileSync(join(ROOT, "content/posts.json"), JSON.stringify(posts, null, 1));
console.log(`content/posts.json: ${posts.length} posts`);

// Legal pages from the extracted blocks
type Block = { t: string; text: string };
function blocksToHtml(blocks: Block[]) {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const out: string[] = [];
  let list: string[] = [];
  const flush = () => { if (list.length) { out.push(`<ul>${list.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>`); list = []; } };
  for (const b of blocks) {
    if (b.t === "li") { list.push(b.text); continue; }
    flush();
    if (/^h[1-6]$/.test(b.t)) out.push(`<h2>${esc(b.text)}</h2>`);
    else out.push(`<p>${esc(b.text)}</p>`);
  }
  flush();
  return out.join("\n");
}
const legal: Record<string, { title: string; html: string; updated: string }> = {};
for (const [slug, title] of [["privacy-policy", "Privacy Policy"], ["terms-and-services", "Terms and Services"]] as const) {
  const d = JSON.parse(readFileSync(join(CRAWL, "extracted", `${slug}.json`), "utf8"));
  const blocks: Block[] = d.blocks.filter((b: Block) => !/^(Privacy Policy|terms and services|Terms and Services)$/i.test(b.text));
  legal[slug] = { title, html: blocksToHtml(blocks), updated: "2026-10-30" };
}
writeFileSync(join(ROOT, "content/legal.json"), JSON.stringify(legal, null, 1));
console.log("content/legal.json:", Object.keys(legal).join(", "));
