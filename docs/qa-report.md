# QA report

Measured on a production build (`next build` + `next start`) in the build container on 2026-11-01. Numbers are updated by hand after each run; see the commands in the README to reproduce.

## Lighthouse (mobile, simulated throttling, Lighthouse 12.8)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home `/` | _pending_ | | | | | | |
| Service `/services/dental-implants/` | _pending_ | | | | | | |
| Article `/dental-implant-timeline/` | _pending_ | | | | | | |

Notes on what the scores depend on:
- GTM loads on the first interaction or after 12 s idle, so it is outside the Lighthouse window. When it loads it pulls the practice's Google Ads tag (AW-339190937), which sets a third-party cookie; Consent Mode defaults deny ad storage, so the container should be configured to respect consent.
- The hero image is a full-viewport image, which Chrome excludes from LCP; the H1 is the LCP element.

## Launch audit (`npm run audit`)

_pending_

## Screenshots (`npm run shots`)

_pending_

## Forms

Lead API tested end-to-end against a local webhook catcher: valid lead delivered with first/last name, E.164 phone, UTM fields and labelled `fields`; honeypot submissions silently accepted and dropped; submissions under 3 s rejected; invalid fields return per-field errors.

## Old URLs

All 56 URLs from the current site's `sitemap_index.xml` answer 200 on the new site (checked by the audit; see `content/old-urls.txt`).
