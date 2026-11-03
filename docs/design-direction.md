# Design direction — Valencia Dentistry

The reference (Newbury Park Dental Arts) was studied for *section ideas and mood only*. Nothing from it (text, photos, video, logo, doctor, awards, prices, membership, code) is used.

## What we adapt from the reference, and how ours differs

| Reference idea | Our version |
|---|---|
| Full-bleed video hero with one short line | Poster-first hero of the practice's own team photo with a slow Ken Burns drift; a muted office video slots in when the client provides one (loads after LCP, pauses under reduced motion / data saver). Trust strip under the buttons: Google 4.9★, PPO accepted, $59 new-patient special. |
| "Kind words" early on the page | A review carousel with the Google rating, verbatim 5★ reviews, initials avatars (no scraped profile photos). Video testimonial slot ready, hidden until videos with captions exist. |
| Dark "thoughtful dentistry" pillars | Dark ink band with film-grain texture, three pillars (advanced technology, calming spaces, one-on-one care) with hairline dividers and champagne-gold numerals. |
| "Smiles designed around you" cosmetic editorial | Asymmetric two-column: oversized serif headline, short copy, large editorial image with a gold hairline frame offset behind it. |
| "Everything your smile needs" service grid | Six image cards (Preventive, Family, Cosmetic, Restorative, Implants & Oral Surgery, Holistic) with slow zoom on hover, eyebrow + one line + arrow. |
| "Care that puts you first" | Comfort options + first-visit timeline (4 steps) instead of generic copy. |
| Doctor section with signature | Portrait, a pull-quote in italic serif, credentials list, "Read her story". |
| Awards wall | Hidden until the client confirms real credentials. |
| Technology icon row | Refined line icons on ivory for CBCT, iTero, PRF, guided implants, digital X-rays, intraoral cameras, laser, same-day crowns, each with a 10-word explanation. |
| Smile gallery | Drag before/after sliders using the practice's six real cases + implant case. |
| Affordable care + membership | PPO logos (the eight the practice lists), financing paragraph, a "Your first visit" card (no price); membership omitted (not offered). |
| Big quote band | One real review as a quote over a darkened practice image. |
| Map/visit section | Map, hours with live Open/Closed badge (America/Los_Angeles), parking/suite directions, final CTA. |
| New-patient popup | Once per session, 12s delay (15s+ on mobile), focus-trapped, Esc closes, never covers the sticky bar. |

Overall: fewer elements per screen, more air (section padding 120–160px desktop), hairline borders instead of shadows, ivory backgrounds instead of white, deep ink instead of black.

## Tokens (premium upgrade: charcoal, olive, warm cream, bronze accent; all text pairs pass WCAG AA)

| Token | Value | Use |
|---|---|---|
| `--ink` | #1B1A17 | charcoal surfaces (hero, process, reviews, CTA, footer) |
| `--olive` / `--slate-600` | #4A4F3B | solid buttons (8.5:1 with white), outline stroke, checks |
| `--olive-900` | #2C3024 | dark olive sections (facts, first visit, "What it is", "Why us") |
| `--ivory` | #F5F0E6 | warm cream page background |
| `--ivory-200` | #ECE5D6 | alternate cream band |
| `--sand` | #DDD3C0 | hairlines on light |
| `--gold` (bronze) | #CFA36E | accent on dark (7.5:1 on charcoal), gold buttons with charcoal text |
| `--gold-700` (bronze deep) | #82572A | accent text and eyebrows on cream (5.5:1) |
| `--text` / `--muted` | #22211E / #5E5A51 | body and secondary text on cream |
| `--on-dark` / `--on-dark-muted` | #F3EEE4 / #C2BCB0 | text on charcoal and olive |

Radii: 12 / 20 / 32 px and pills; arches are `999px 999px 20px 20px`. Section spacing is one scale: 64 px (phones), 96 px (tablets), 128 px (desktop); `.section-sm` is 64 px. One container: 84rem, 16 px gutters on phones, 40 px on desktop.

The logo mark keeps its own colours: charcoal #2E2E2E and taupe #9A8B72 on light backgrounds, ivory and #C9BA9C on dark ones.

## Type
- Display: **Fraunces** (self-hosted through next/font, OFL) Light 300 + Light Italic for H1/H2 and quotes, Regular 400 for H3. Body/UI: **Manrope**.
- Sizes: hero H1 up to ~100 px (`clamp(2.75rem, 1.4rem + 5.4vw, 6.25rem)`), section H2 ~54 px, body 16 px on phones and 17 px on desktop.
- The last 2–3 words of hero and section headlines are italic in the accent colour (`accent()` in `src/components/ui/Accent.tsx`).

## Motion
All motion runs through one client `MotionProvider` in the root layout (`src/components/motion/`). It loads GSAP, ScrollTrigger, SplitText and Lenis after first paint (on first interaction or idle, never mid-scroll), sets up effects per route from data attributes, and reverts them on route change. Nothing is hidden by CSS: start states are set by script only for content below the fold, so pages read fine without JavaScript. With `prefers-reduced-motion: reduce`, nothing moves.

| Effect | Attribute / class |
|---|---|
| Section headings rise line by line from masks (once) | `data-split` |
| Photos wipe up into their frame and settle 1.25× → 1× | `data-wipe` (in `<Photo>`) |
| Gentle parallax on whole frames (half on phones) | `data-parallax` |
| Heroes recede: copy lifts and fades, media drifts | `data-recede`, `data-recede-copy`, `data-recede-media` |
| Ticker rows; speed and direction follow scroll velocity | `data-marquee` (`<Marquee>`) |
| Giant outline type and watermark drifting | `data-drift`, `data-drift-y` |
| Count-up numerals (final value in the markup) | `data-count` |
| Pinned horizontal gallery with progress and counter | `data-hscroll` |
| Scroll story: sticky photo crossfade, timeline line | `data-story` |
| Stacking sticky cards | `data-stack` + `.stack-card` |
| Lines that draw in | `data-draw="x|y"` |
| Cursor depth on the hero stack, magnetic buttons, spotlight (desktop) | `data-depth-root` / `data-depth`, `.btn`, `data-spotlight` |
| Custom cursor labels | `data-cursor="View|Drag|Book"` |
| Fade-and-rise blocks (no library) | `data-reveal` |

Lenis smooth scrolling runs on mouse/trackpad devices only; touch keeps native scrolling. The hero fan, aurora, seal and scroll cue are CSS animations (final state without JavaScript).

## Images
Real practice photos only. A frame never draws a photo wider than half its file's pixel width (sharp on 2× screens), `sizes` states the drawn width including any cover crop, quality is 85 and there are no blurred placeholders. Head-safe 2:3 crops live in `public/images/portrait/`; before/after cases were enlarged 2× with Lanczos and a light unsharp mask (`npm run derive-images`, originals in `assets/originals/`). The Visit map is a brand-tinted composite of OpenStreetMap tiles (© OpenStreetMap contributors); the live Google map loads only on request.
