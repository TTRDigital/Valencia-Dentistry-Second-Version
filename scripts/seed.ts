/**
 * Loads content/seed.json into Sanity through the global API host:
 *   https://api.sanity.io/v2024-01-01/projects/<id>/datasets/<dataset>/mutate
 *
 *   SANITY_WRITE_TOKEN=... npm run seed              # adds missing documents
 *   SANITY_WRITE_TOKEN=... npm run seed -- --force   # overwrites every document
 *   npm run seed -- --dry-run                        # validates without writing
 *   npm run seed -- --project <id> --dataset <name>  # override the pinned project
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { projectId as pinned, dataset as pinnedDataset } from "../sanity/env.ts";

const ROOT = new URL("..", import.meta.url).pathname;
const arg = (name: string) => { const i = process.argv.indexOf(name); return i > -1 ? process.argv[i + 1] : undefined; };
const projectId = arg("--project") ?? pinned;
const dataset = arg("--dataset") ?? pinnedDataset;
const token = process.env.SANITY_WRITE_TOKEN;
const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");

if (!/^[a-z0-9]{8}$/.test(projectId)) {
  console.error(`Sanity project ID is "${projectId}". Set it in sanity/env.ts or pass --project <id>.`);
  process.exit(1);
}
if (!token && !dryRun) {
  console.error("Set SANITY_WRITE_TOKEN (an Editor token from sanity.io/manage > API > Tokens).");
  process.exit(1);
}

const docs: { _id: string; _type: string }[] = JSON.parse(readFileSync(join(ROOT, "content/seed.json"), "utf8"));
const url = `https://api.sanity.io/v2024-01-01/projects/${projectId}/datasets/${dataset}/mutate${dryRun ? "?dryRun=true" : ""}`;
const batches: unknown[][] = [];
let current: unknown[] = [];
let size = 0;
for (const doc of docs) {
  const m = force ? { createOrReplace: doc } : { createIfNotExists: doc };
  const s = JSON.stringify(m).length;
  if (current.length && size + s > 1_500_000) { batches.push(current); current = []; size = 0; }
  current.push(m);
  size += s;
}
if (current.length) batches.push(current);

let n = 0;
for (const mutations of batches) {
  if (dryRun && !token) { n += mutations.length; continue; }
  const res = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ mutations }) });
  if (!res.ok) { console.error(`Sanity answered ${res.status}: ${(await res.text()).slice(0, 500)}`); process.exit(1); }
  n += mutations.length;
  console.log(`${dryRun ? "checked" : force ? "wrote" : "added (if missing)"} ${n}/${docs.length}`);
}
console.log(`Done: ${docs.length} documents ${dryRun ? "validated" : "sent"} to ${projectId}/${dataset}.`);
