# Brief: blog post metadata (Valencia Smile Expert)

We are migrating 31 blog posts from valenciasmileexpert.com to a new site at the same URLs. The article HTML is migrated by script; you write the editorial metadata for each post.

Read first:
1. /home/user/Valencia-Dentistry-Second-Version/docs/copy-guide.md (voice + hard rules)
2. The posts: /tmp/claude-0/-home-user-Valencia-Dentistry-Second-Version/854abdb8-14af-5a89-ad46-9139554f0737/scratchpad/crawl/blog-posts.json (array; each has slug, title, metaTitle, metaDescription, html, faq, image, imageAlt). Read the `html` of each of YOUR posts to write accurate takeaways.

Output: one JSON file per post at /home/user/Valencia-Dentistry-Second-Version/content/posts-meta/<slug>.json:

```json
{
  "slug": "…",
  "title": "Display title (may trim the original if longer than ~70 chars; keep meaning)",
  "seoTitle": "≤ 60 characters, specific, no brand suffix needed",
  "seoDescription": "≤ 155 characters, one benefit + a soft call to action, mention Santa Clarita or Valencia where natural",
  "excerpt": "1–2 sentences (≤ 200 chars) for the blog index card",
  "category": "implants | oral-surgery | restorative | cosmetic | general",
  "keyTakeaways": ["3–5 bullets, ≤ 140 chars each, factual, taken from the article itself"],
  "related": ["3 slugs of other posts in the file that are most relevant"],
  "imageAlt": "descriptive alt text for the featured image (use the existing imageAlt if good)",
  "flags": ["any claim in the article that looks medically doubtful, any broken reference, any table that looks malformed"]
}
```

Rules:
- Categories: implants = dental implants/All-on-X; oral-surgery = extractions, bone grafting, wisdom teeth; restorative = crowns, bridges; cosmetic = cosmetic procedures; general = cleanings, first visit.
- Key takeaways must be true to the article's content; no new claims, no guarantees, no prices unless the article states them.
- Do not invent anything. Keep JSON valid (run `node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" <file>` on each).

Report back: the files written and every `flags` entry.
