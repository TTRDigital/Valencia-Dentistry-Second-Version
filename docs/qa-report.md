# QA report

## Second version, images from the first site (2026-11-02)

| Check | Result |
|---|---|
| Previous-dentist, old-brand or other-dentist names in rendered pages (63) | 0 matches |
| Broken images on 12 key pages (Playwright, full scroll) | 0 |
| Launch audit | No problems; 61 pages, 61 links, 57/57 old URLs |
| Screenshot QA, 10 pages × 5 widths | No horizontal scroll, no small tap targets |
| Lighthouse mobile, Home / service / article | Performance 87 / 93 / 93; Accessibility, Best practices, SEO 100; CLS 0 |

## Second version: Valencia Dentistry rebrand

| Check | Result |
|---|---|
| Previous-dentist / old-brand text in every rendered page (64 pages incl. 404 and thank-you) | 0 matches |
| Photos of the previous dentist in `public/` | 0 (17 files deleted) |
| Launch audit | No problems; 61 sitemap pages, 61 links, 57/57 old URLs (incl. `/category/blogs/` from the first site) |
| Screenshot QA, 10 pages × 5 widths | No horizontal scroll, no small tap targets |
| Header behaviour test | Pass (scroll state, mega menu, drawer, active link) |
| Lighthouse mobile, Home / service / article | Performance 83 / 96 / 93; Accessibility, Best practices, SEO 100 on all three; CLS 0 |

Screenshots of this version: `docs/screenshots/*.jpg`.

## First version of this build (2026-11-01)

Measured on a production build (`next build` + `next start`) inside the build container on 2026-11-01, commit `d61c81b`+. Reproduce with the commands in the README (`npm run audit`, `npm run shots`, Lighthouse CLI 12.8 with `--preset=perf --form-factor=mobile --throttling-method=simulate`).

## Lighthouse (mobile, simulated throttling)

| Page | Performance | Accessibility | Best practices | SEO | LCP (sim.) | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home `/` | 88 (range 80–93 over 6 runs) | 100 | 100 | 100 | 3.0 s | 0 | 290 ms |
| Service `/services/dental-implants/` | 85 (range 80–96) | 100 | 100 | 100 | 3.1 s | 0 | 370 ms |
| Article `/dental-implant-timeline/` | 93 (range 86–94) | 100 | 100 | 100 | 3.1 s | 0 | 120 ms |

Accessibility, best practices and SEO are 100 on all three. Performance is below the 95 target in this container; the two remaining factors are:

- **LCP as simulated by Lighthouse (≈3 s)** versus **LCP measured in a real throttled Chrome** (Slow-4G + 4× CPU in Playwright): the hero H1 paints at **1.05 s** on Home with no layout shift. Lighthouse's model charges the async framework JavaScript (React 19 + Next 16 runtime, ≈170 KB gzipped, the framework floor) against the paint. Our own client code is 26 KB gzipped.
- **The container is slow** (Lighthouse `benchmarkIndex` ≈ 1,860, roughly a third of a laptop), so simulated scores swing ±8 between identical runs. PageSpeed Insights against the Vercel deployment (Brotli, HTTP/2, edge cache) is the number to act on; expect it to land higher.

What was done for performance: poster-first hero with CSS-only reveal (no opacity-0 text, so the H1 is the LCP element), static Fraunces instances instead of the 270 KB variable fonts, server-rendered header with a 6 KB behaviour module (no hydration of the mega menu), `content-visibility: auto` on every below-fold section, blur placeholders only on priority images, PNG grain tile instead of an SVG filter, GTM loaded on first interaction / 12 s idle with Consent Mode defaults, fully static output for every route (no streamed shell, CLS 0), AVIF/WebP images with explicit sizes.

## Launch audit (`npm run audit`)

`No problems found. Checked 61 sitemap pages, 61 internal links, 56/56 old URLs preserved.`

Checks: status, doctype, `<html lang="en">`, charset first in head, one H1, title ≤ 60, description ≤ 155, canonical, 1200×630 og:image that loads, valid JSON-LD (Dentist on Home, BreadcrumbList, FAQPage where FAQs exist), alt on every image, no internal link answering anything but 200, no noindex page in the sitemap, favicon set / manifest / robots / sitemap, and every one of the 56 URLs of the current site answering 200.

## Screenshots (`npm run shots`)

`No horizontal scroll, no small tap targets.` across 10 pages × 5 widths (390, 768, 1024, 1440, 1920).  Tap-target rule: every control ≥ 44 px high; text links ≥ 24 px wide (WCAG 2.5.8); inputs inside a label count through the label.

## Behaviour tests (Playwright, production build)

- Header: transparent over heroes, solid after 40 px; mega menu opens on hover and click, closes on Escape and outside click, is `inert` when closed; active section underlined; mobile drawer locks scroll, focuses the first link, closes on Escape and after navigation.
- 404: `/nope/`, `/services/nope/` and `/a/b/` all answer 404 with the branded page.
- Forms: lead API tested end-to-end against a local webhook catcher: valid lead delivered with first/last name, E.164 phone, UTM fields and labelled `fields`; honeypot submissions silently dropped; submissions under 3 s rejected; invalid fields return per-field errors.
- Popup: once per session, 12 s desktop / 20 s mobile, focus trap, Escape, skipped on offer/appointment/thank-you/CMS pages.

## Not measured here

- Real-device Core Web Vitals (needs the Vercel deployment).
- Sanity Studio and seed against the practice's project (project ID pending; the seed was validated as 90 well-formed documents and the mutate call is dry-run ready).
