# Brief: write service page content (Valencia Smile Expert)

You are writing the content file for service pages of a brand-new premium website for Valencia Smile Expert, a dental practice in Valencia / Santa Clarita, CA led by Dr. Neda Moezzi, DDS.

Read first:
1. /home/user/Valencia-Dentistry-Second-Version/docs/copy-guide.md (voice + hard rules; follow it exactly)
2. /home/user/Valencia-Dentistry-Second-Version/content/types.ts (the `Service` type you must satisfy)
3. The extracted source content for each of your pages (JSON with `blocks`, `faqs`, `images`): /tmp/claude-0/-home-user-Valencia-Dentistry-Second-Version/854abdb8-14af-5a89-ad46-9139554f0737/scratchpad/crawl/extracted/<file>.json. Use `blocks` (headings/paragraphs/list items in page order) and `faqs` as your source material. Ignore review text, contact block, and "Visit…" sections in it.

Output: one file per service at /home/user/Valencia-Dentistry-Second-Version/content/services/<slug>.ts with exactly this shape:

```ts
import type { Service } from "../types";

const service: Service = {
  // ...all required fields
};

export default service;
```

Rules:
- Rewrite every sentence (no copy-paste from the source). Keep facts, procedure lists, FAQ intent.
- Fill every required field of `Service`. `technology` only from the allowed TechKey list and only where the source page mentions it (implants/surgery: cbct, guided-implants, prf; cosmetic: itero, intraoral-camera; crowns: same-day-crowns, itero, cbct; holistic: laser, digital-xray; fillings: intraoral-camera, digital-xray; general: digital-xray, intraoral-camera).
- `related`: 2–4 slugs from this list: cosmetic-dentistry, composite-filling, invisalign, teeth-whitening, veneers, dental-crowns, dental-implants, holistic-dentistry, oral-surgery, all-on-4-implants, bone-grafting, tooth-extractions, wisdom-teeth-removal, restorative-dentistry, dental-bridges, tmj-treatments, preventive-dentistry, family-dentistry.
- `showGallery: true` only for cosmetic-dentistry, veneers, teeth-whitening, invisalign, composite-filling, dental-crowns, dental-implants, all-on-4-implants, restorative-dentistry, dental-bridges.
- Images: choose `image` from this list (exact paths):
  - /images/practice/dr-moezzi-patient-chair.png — Dr. Moezzi talking with a patient in the treatment chair
  - /images/practice/dr-moezzi-treating.png — Dr. Moezzi treating a patient
  - /images/practice/treatment-room.png — Dr. Moezzi treating a patient in a bright treatment room
  - /images/practice/consult-chair.png — Dr. Moezzi in consultation with a seated patient
  - /images/practice/preventive-cleaning.png — hygienist cleaning a patient's teeth
  - /images/practice/family-consult.png — dentist talking with a family in the treatment room
  - /images/practice/checkup-smile.png — smiling woman in a dental chair during a checkup
  - /images/practice/exam-mirror.png — close-up of a dental mirror exam of a patient's smile
  - /images/practice/cbct-scan.png — patient standing at the CBCT 3D imaging unit
  - /images/practice/tooth-model.jpg — dentist showing a patient a tooth model
  - /images/practice/dr-moezzi-smile-sign.png — Dr. Moezzi holding a "Smile" sign
  - /images/practice/dr-moezzi-office.png — Dr. Moezzi standing in the office
  - /images/practice/team-four.png — Dr. Moezzi with three team members
  Write a descriptive `imageAlt` (what is in the picture, no keyword stuffing). Use `extraSections[].image` sparingly (0–1 per page) from the same list.
- `flags`: list any medical claim you softened or could not verify (e.g. "zygomatic implants offered?").
- Typescript must be valid: strings with apostrophes in double quotes, no trailing commas problems, escape as needed. Use plain ASCII quotes inside text (curly quotes are fine inside strings). Do not add fields not in the type.
- After writing, run from the repo root: `npx tsc --noEmit -p tsconfig.json 2>&1 | grep content/services` and fix any error in your files.

Report back: the list of files written and every `flags` entry.
