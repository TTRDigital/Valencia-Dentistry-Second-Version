/**
 * Launch checks on a running site (local or deployed):
 *
 *   npm run audit -- https://<deployment>
 *
 * For every public page: status 200 (404 for the test URL), doctype, <html lang>,
 * <meta charset> first in head, exactly one H1, title ≤ 60, description ≤ 155,
 * canonical, 1200×630 og:image that loads, valid JSON-LD (Dentist on the home
 * page, BreadcrumbList on inner pages, FAQPage where FAQs exist), alt on every
 * image, no internal link that answers anything but 200, no noindex page in the
 * sitemap, every old URL of valenciasmileexpert.com answering 200 (or one 301 to a 200).
 */
import * as cheerio from "cheerio";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const ROOT = new URL("..", import.meta.url).pathname;
const oldUrls = readFileSync(join(ROOT, "content/old-urls.txt"), "utf8").trim().split("\n").map((u) => u.replace(/^https?:\/\/[^/]+/, ""));
const problems: string[] = [];
const bad = (p: string, m: string) => problems.push(`${p}: ${m}`);
const get = (url: string, redirect: RequestRedirect = "manual") => fetch(url, { redirect, headers: { "User-Agent": "launch-audit" } });
const local = (u: string) => u.replace(/^https?:\/\/[^/]+/, BASE);

const sitemapXml = await (await get(BASE + "/sitemap.xml", "follow")).text();
const pages = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""));
const statusCache = new Map<string, number>();
async function status(path: string) {
  if (!statusCache.has(path)) statusCache.set(path, (await get(BASE + path)).status);
  return statusCache.get(path)!;
}

for (const path of [...pages, "/thank-you/", "/this-page-does-not-exist-xyz/"]) {
  const res = await get(BASE + path);
  const want = path.includes("does-not-exist") ? 404 : 200;
  if (res.status !== want) {
    bad(path, `status ${res.status}`);
    continue;
  }
  const html = await res.text();
  const $ = cheerio.load(html);
  if (!/^<!doctype html>/i.test(html.trim())) bad(path, "no doctype");
  if ($("html").attr("lang") !== "en") bad(path, "html lang is not en");
  const first = $("head").children().first();
  if ((first.attr("charset") || "").toLowerCase() !== "utf-8") bad(path, "<meta charset> is not first in head");
  const robots = $('meta[name="robots"]').attr("content") || "";
  const indexable = want === 200 && !/noindex/.test(robots);
  if ($("h1").length !== 1) bad(path, `${$("h1").length} H1s`);
  const title = $("title").text().trim();
  if (!title) bad(path, "no title");
  else if (title.length > 60) bad(path, `title ${title.length} chars: ${title}`);
  const desc = $('meta[name="description"]').attr("content") || "";
  if (indexable && !desc) bad(path, "no meta description");
  if (desc.length > 155) bad(path, `description ${desc.length} chars`);
  if (indexable && !$('link[rel="canonical"]').attr("href")) bad(path, "no canonical");
  const og = $('meta[property="og:image"]').attr("content");
  if (indexable) {
    if (!og) bad(path, "no og:image");
    else {
      if ($('meta[property="og:image:width"]').attr("content") !== "1200" || $('meta[property="og:image:height"]').attr("content") !== "630") bad(path, "og:image is not declared 1200×630");
      const r = await get(local(og), "follow");
      if (!r.ok || !/image\//.test(r.headers.get("content-type") || "")) bad(path, `og:image answers ${r.status}`);
    }
  }
  const ld: Record<string, unknown>[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const j = JSON.parse($(el).html() || "");
      ld.push(...(Array.isArray(j) ? j : [j]));
    } catch (e) {
      bad(path, `invalid JSON-LD: ${String(e).slice(0, 60)}`);
    }
  });
  const types = ld.map((n) => n["@type"]);
  if (indexable && !ld.length) bad(path, "no JSON-LD");
  if (path === "/" && !types.includes("Dentist")) bad(path, "no Dentist schema");
  if (path !== "/" && indexable && !types.includes("BreadcrumbList") && !/^\/(sitemap|privacy-policy|terms-and-services|thank-you)\/$/.test(path)) bad(path, "no BreadcrumbList schema");
  if ($("details summary").length >= 3 && !types.includes("FAQPage")) bad(path, "FAQs on page but no FAQPage schema");
  for (const n of ld) if (n["@type"] === "FAQPage" && !(n.mainEntity as unknown[])?.length) bad(path, "empty FAQPage");
  $("img").each((_, el) => {
    if ($(el).attr("alt") == null) bad(path, `img without alt: ${$(el).attr("src")}`);
  });
  for (const el of $("a[href]").toArray()) {
    const href = $(el).attr("href")!;
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/cms")) continue;
    const s = await status(href.split("#")[0].split("?")[0]);
    if (s !== 200) bad(path, `link ${href} answers ${s}`);
  }
  if (indexable && !/noindex/.test(robots) && !pages.includes(path) && path !== "/thank-you/") bad(path, "indexable page missing from sitemap");
}
for (const p of pages) {
  const r = await get(BASE + p);
  const $ = cheerio.load(await r.text());
  if (/noindex/.test($('meta[name="robots"]').attr("content") || "")) bad(p, "noindex page in sitemap");
}
for (const f of ["/favicon.ico", "/icon.png", "/apple-icon.png", "/icon-192.png", "/icon-512.png", "/manifest.webmanifest", "/robots.txt", "/sitemap.xml"]) {
  const r = await get(BASE + f, "follow");
  if (!r.ok) bad(f, `answers ${r.status}`);
}
// Every URL of the old site answers 200, or one 301/308 hop to a 200.
let migrated = 0;
for (const u of oldUrls) {
  const r = await get(BASE + u);
  if (r.status === 200) migrated++;
  else if ([301, 308].includes(r.status)) {
    const loc = r.headers.get("location") || "";
    const r2 = await get(local(loc));
    if (r2.status === 200) migrated++;
    else bad(u, `redirects to ${loc} which answers ${r2.status}`);
  } else bad(u, `old URL answers ${r.status}`);
}

console.log(problems.join("\n") || "No problems found.");
console.log(`\nChecked ${pages.length} sitemap pages, ${statusCache.size} internal links, ${migrated}/${oldUrls.length} old URLs preserved.`);
process.exitCode = problems.length ? 1 : 0;
