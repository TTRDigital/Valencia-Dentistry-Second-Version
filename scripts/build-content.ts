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

/** Brand pass: the practice is Valencia Dentistry, led by Dr. Nuriel Lavi, DDS. */
const BRAND: [RegExp, string][] = [
  [/Dr\.? ?Neda Moezzi,? DDS/g, "Dr. Nuriel Lavi, DDS"],
  [/Dr\.? ?Neda Moezzi/g, "Dr. Nuriel Lavi"],
  [/Neda Moezzi/g, "Nuriel Lavi"],
  [/Dr\.? ?Moezzi/g, "Dr. Lavi"],
  [/Dr\.? ?Neda/g, "Dr. Lavi"],
  [/Moezzi/g, "Lavi"],
  [/\bNeda\b/g, "Dr. Lavi"],
  [/Valencia Smile Expert LLC/g, "Valencia Dentistry"],
  [/Valencia Smile Experts?/g, "Valencia Dentistry"],
  [/ValenciaSmile/g, "Valencia Dentistry"],
  [/Valencia Smile(?=[:\s,.)'’])/g, "Valencia Dentistry"],
  [/info@valenciasmileexpert\.com/g, "ValenciaDentistryCA@gmail.com"],
  [/https?:\/\/(www\.)?valenciasmileexpert\.com/g, ""],
  [/www\.valenciasmileexpert\.com/g, "valenciadentistryca.com"],
];
const brand = (s: string) => BRAND.reduce((acc, [re, rep]) => acc.replace(re, rep), s);

const OFFICE: Record<string, [string, string]> = {
  cleaning: ["/images/office/cleaning.jpg", "Hygienist cleaning a patient's teeth in a bright treatment room"],
  room: ["/images/office/treatment-room.jpg", "Treatment room with a dental chair, monitors and large arched windows"],
  room2: ["/images/office/treatment-room-2.jpg", "Calm treatment room with natural light and a modern dental chair"],
  implant: ["/images/office/implant-model-hands.jpg", "Dentist showing a patient how an implant and crown fit on a model"],
  denture: ["/images/office/denture-closeup.jpg", "Close-up of a full-arch implant denture model"],
  scan: ["/images/office/scan-closeup.jpg", "Digital intraoral scan of a patient's teeth shown on a monitor"],
  smile: ["/images/office/veneer-smile.jpg", "Patient checking her smile in a hand mirror"],
};
const POST_IMAGES: Record<string, [string, string]> = {
  _default: OFFICE.room,
  "all-on-x-recovery-timeline": OFFICE.denture,
  "all-on-x-vs-dentures-complete-guide": OFFICE.denture,
  "best-foods-after-dental-implant-surgery": OFFICE.implant,
  "bone-grafting-for-dental-implants-guide": OFFICE.room,
  "bone-grafting-healing-timeline": OFFICE.room2,
  "bone-grafting-is-it-painful": OFFICE.room,
  "candidate-for-dental-implants": OFFICE.implant,
  "crown-vs-filling-dental-crown-guide": OFFICE.scan,
  "delay-replacing-missing-tooth-risks-costs": OFFICE.implant,
  "dental-bridge-cost-guide": OFFICE.implant,
  "dental-bridge-vs-implant-guide": OFFICE.scan,
  "dental-crowns-cost-santa-clarita-prices-guide": OFFICE.scan,
  "dental-implant-timeline": OFFICE.implant,
  "dental-implants-cost": OFFICE.implant,
  "dental-implants-for-one-missing-tooth": OFFICE.implant,
  "dental-implants-for-seniors-safety-success": OFFICE.room2,
  "dental-implants-valencia-cost-guide": OFFICE.implant,
  "dental-implants-vs-dentures": OFFICE.denture,
  "dental-implants-with-bone-loss": OFFICE.room,
  "do-dental-implants-hurt-recovery-pain-healing-guide": OFFICE.room2,
  "how-long-do-dental-bridge-last": OFFICE.scan,
  "how-long-do-dental-crowns-last": OFFICE.scan,
  "how-long-do-dental-implants-take": OFFICE.implant,
  "is-tooth-extraction-painful": OFFICE.room,
  "tooth-extraction-healing-diet-guide": OFFICE.room2,
  "top-5-cosmetic-dentistry-procedures": OFFICE.smile,
  "what-is-all-on-x-complete-guide": OFFICE.denture,
  "when-is-tooth-extraction-necessary": OFFICE.room,
  "why-choose-valencia-smile-what-to-expect-on-your-first-visit": OFFICE.cleaning,
  "why-regular-dental-cleanings-matter-health-cost-how-often-to-come-dental-cleaning-valencia": OFFICE.cleaning,
};

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
  return brand(out.trim());
}

const posts = raws.map((r) => {
  const metaPath = join(ROOT, "content/posts-meta", `${r.slug}.json`);
  if (!existsSync(metaPath)) throw new Error(`missing meta for ${r.slug}`);
  const m = JSON.parse(readFileSync(metaPath, "utf8"));
  const faqs = r.faq.map((f) => ({ q: brand(f.q.trim()), a: brand((f.a || "").replace(CTA_TAIL, "").trim()) })).filter((f) => f.q && f.a);
  // Featured photo per post: the first site's choice where that photo shows no identifiable dentist,
  // otherwise the closest topical photo from the same shoot (content/office-images.ts).
  const [image, imageAlt] = POST_IMAGES[r.slug] ?? POST_IMAGES._default;
  return {
    slug: r.slug,
    title: brand(m.title || r.title),
    seo: { title: m.seoTitle, description: m.seoDescription },
    excerpt: m.excerpt,
    datePublished: r.datePublished,
    dateModified: r.dateModified && r.dateModified > r.datePublished ? r.dateModified : r.datePublished,
    author: "Dr. Nuriel Lavi, DDS",
    image,
    imageAlt,
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
  legal[slug] = { title, html: brand(blocksToHtml(blocks)), updated: "2026-11-02" };
}
writeFileSync(join(ROOT, "content/legal.json"), JSON.stringify(legal, null, 1));
console.log("content/legal.json:", Object.keys(legal).join(", "));
