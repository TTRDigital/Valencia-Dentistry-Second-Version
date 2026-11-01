# Design direction — Valencia Smile Expert

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
| Affordable care + membership | PPO logos (the eight the practice lists), financing paragraph, $59 special card; membership omitted (not offered). |
| Big quote band | One real review as a quote over a darkened practice image. |
| Map/visit section | Map, hours with live Open/Closed badge (America/Los_Angeles), parking/suite directions, final CTA. |
| New-patient popup | Once per session, 12s delay (15s+ on mobile), focus-trapped, Esc closes, never covers the sticky bar. |

Overall: fewer elements per screen, more air (section padding 120–160px desktop), hairline borders instead of shadows, ivory backgrounds instead of white, deep ink instead of black.

## Tokens (proposed, all text pairs pass WCAG AA)

| Token | Value | Use |
|---|---|---|
| `--ink` | #0F1F33 | dark surfaces, headings |
| `--ink-700` | #112740 | brand navy (from logo) |
| `--slate` | #366797 | brand steel blue; links, secondary accents |
| `--slate-600` | #2E5A85 | solid buttons (6.1:1 on ivory with white text) |
| `--ivory` | #FAF7F1 | page background |
| `--ivory-200` | #F2ECE1 | alternate band |
| `--sand` | #E9E1D2 | hairlines on light |
| `--gold` | #D9BE8C | dividers, numerals, accents (decorative only) |
| `--gold-700` | #856A33 | gold used for text/eyebrows on ivory (4.8:1) and white (5.1:1) |
| `--text` | #1C2A3A | body text on ivory (12.9:1) |
| `--muted` | #56657A | secondary text (5.9:1 on ivory) |
| `--on-dark` | #F3EEE4 | text on ink |
| `--on-dark-muted` | #B9C2CF | secondary text on ink (8.4:1) |

## Type
- Display: **Fraunces** static instances (Light 300 + Light Italic for headings and quotes, Regular 400 for H3) for H1/H2/pull quotes — proposed over Bodoni Moda because its lighter weights stay legible on phones and it self-hosts through next/font. The variable font with its optical-size and "soft" axes was tried first and dropped: its two preloaded files weighed 270 KB and sat on the LCP path. Alternate: **Cormorant Garamond** 300/400 (also wired in the style guide for comparison).
- Body/UI: **Manrope** 400/500/600.
- Eyebrows: Manrope 600, 0.72rem, letter-spacing 0.18em, uppercase, gold-700.
- Fluid sizes with clamp(): H1 2.6rem→4.6rem, H2 2rem→3.2rem, H3 1.25rem→1.5rem, body 1rem→1.0625rem.
- Gold 48px × 1px divider under every section heading.

## Motion
- Reveal: opacity 0→1, translateY 24px→0, 900ms, cubic-bezier(.2,.7,.2,1), staggered 80ms, via IntersectionObserver + Web Animations API (data-reveal). Hero content uses a pure CSS keyframe instead (visible without JavaScript, counted by Chrome as the LCP). Off under prefers-reduced-motion.
- Images: hover scale 1→1.04 over 1.2s. Hero drift 24s.
- Carousels: CSS scroll-snap, buttons + keyboard, no library.
