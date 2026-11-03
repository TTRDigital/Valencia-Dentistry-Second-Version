# Open items and content flags

## Second version (2026-11-02)

- **Photos.** All site images now come from the first site (valencia-dentistry.vercel.app). Of its 45 photos, the 10 that show no identifiable dentist are used (hygienist cleaning, two treatment rooms, implant model, denture model, four patient shots, intraoral scan cropped to remove an embroidered coat). The other 35 show a dentist whose coat reads "Dr. Jason Verdi, Cosmetic Dentistry", and at least one is identical to a photo on bestdentistthousandoaks.com (Newbury Park Dental Arts); they are not used, because they would present another real dentist as Dr. Lavi. **Please confirm the practice holds a licence for the 10 photos used**, since they appear to come from the same shoot. Doctor sections show a branded card until real photos of Dr. Lavi are supplied (set `doctor.portrait` in `content/site.ts`).
- **Social profiles are empty.** The first site links to facebook.com/iHeartDDS1, instagram.com/Valenciasmileexpert, linkedin.com/in/iHeartDDS1 and x.com/iHeartDDS1, which carry the previous practice's branding. Add Valencia Dentistry's own profiles in `content/site.ts` (`social`) and the icons appear automatically.
- **Google rating (4.9, 180 reviews) and the Maps link** are carried over from the first site. Confirm they belong to the Valencia Dentistry listing; only reviews that name no dentist are shown.
- **Before/after cases** are the same seven cases the first site shows. Confirm they may be presented under Valencia Dentistry.
- **Dr. Lavi's credentials** (school, year, memberships) are not published anywhere yet; the site lists only what the first site states.
- Blog articles are attributed to Dr. Nuriel Lavi, DDS, as on the first site; several are written in the first person, so please confirm he is happy to sign them.


Everything below needs a decision or an asset from the practice. Nothing here blocks the site from launching; where a fact could not be verified, the copy was softened and the item is listed.

## Needed from the client

1. **Sanity project ID** for this site (set in `sanity/env.ts`), an Editor token for `npm run seed`, and CORS origins (localhost:3000, the Vercel preview URL, the domain with and without www). Until then the site serves the built-in content and `/cms` shows a notice.
2. **GoHighLevel webhook URL** (`GHL_WEBHOOK_URL` in Vercel). Tested locally against a webhook catcher; see README.
3. **Logo.** Done in the second version: the V + tooth mark from the first site is used as vector art, with a typeset wordmark. Send the official wordmark file if it differs.
4. **Office/team video** for the hero (MP4, ~10–20 s, muted). Drop it in `public/video/` and pass `video={{ src: "/video/hero.mp4" }}` to the home `Hero`. Until then the poster drifts slowly.
5. **Video testimonials** with captions (.vtt) and transcripts; the testimonial type and page have a slot ready.
6. **Financing partners** (CareCredit, Sunbit, etc.) and whether a **membership plan** exists. Copy currently says "flexible financing options" and no membership plan.
7. **Awards / associations** (ADA, CDA, IAOMT, Invisalign provider tier…). The "Recognized" section is hidden until confirmed.
8. **Areas to name** for local SEO. Default: Valencia, Santa Clarita, Stevenson Ranch, Newhall, Saugus, Canyon Country, Castaic.
9. **Spanish new-patient page** (not built until confirmed).
10. **Google rating/count** should be kept in sync in `content/site.ts` or Site settings.
11. **Sedation**: the current site names nitrous oxide and oral sedation on some pages; confirm which options are offered. The new copy says "sedation options when appropriate" except where the old page named them (oral surgery, wisdom teeth FAQ).

## Facts to confirm (softened in the copy)

- Zygomatic implants listed as an option on the implants page (kept, from the current site).
- Ozone therapy, SMART-certified amalgam removal, biocompatibility testing (holistic page).
- Botox for TMJ relief and sleep apnea appliances (TMJ page).
- Same-day crowns milled in-office (home page claim on the current site).
- Invisalign provider status; digital smile preview; gum contouring (cosmetic pages).
- Preventive and family dentistry pages are new (no source page); cleaning intervals come from the practice's blog post; first-visit timing for children follows general guidance.
- "Serving Santa Clarita since 2007" and "University of Detroit Mercy, 2010" are from the current site.

## Blog articles (migrated as published, with cleanup)

Applied automatically by `scripts/build-content.ts`: stray CTA labels removed from FAQ answers, leaked SEO/drafting notes removed, empty headings removed, a malformed table cell fixed ("10 615 years"), typos fixed ("sinus lif ts", "précis", a euro price), old booking links pointed at the Weave scheduler and styled as buttons, the broken `/dental-implants/` link and the link to a non-existent scaling-and-root-planing post fixed.

Still worth an editorial pass (not changed, since the articles are the practice's published content):
- Heavy use of Reddit/forum anecdotes as evidence in most implant posts.
- Price ranges differ between posts (single implant $1,500–$3,500 vs $3,000–$6,000; All-on-4 $8,000–$18,000 vs $15,000–$50,000 per arch).
- Citations often link to organisation home pages rather than the study cited; PMC4647895 is reused for several different claims.
- "Mrs. L, age 72" case story (seniors post) reads as invented; confirm or remove.
- Top-5 cosmetic procedures post has only H3 headings and quotes an AAO statistic that appears to be Align Technology marketing.
- Some posts promise "free consultation" in the body (no free consultation or price offer is advertised elsewhere).
- Flags per post are stored in `content/posts.json` (`flags`) and in `content/posts-meta/*.json`.

## Technical notes

- The current site's home FAQ said "We're in West Hollywood"; corrected to Valencia.
- Blog count: the sitemap of the current site lists 30 posts (the brief said 31).
- `/thank-you/` is noindex (it was indexable on the current site).
- `/services/preventive-dentistry/` and `/services/family-dentistry/` are new URLs.
