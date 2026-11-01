"use client";

import Link from "next/link";
import { useState } from "react";
import { Img } from "@/components/ui/Img";

type Card = { slug: string; title: string; excerpt: string; image: string; imageAlt: string; category: string; date: string; minutes: number };

/** Category chips + card grid; filtering happens on the client, all posts are in the HTML. */
export function BlogFilter({ posts, labels }: { posts: Card[]; labels: Record<string, string> }) {
  const [cat, setCat] = useState<string>("all");
  const cats = ["all", ...Object.keys(labels).filter((k) => posts.some((p) => p.category === k))];
  const list = cat === "all" ? posts : posts.filter((p) => p.category === cat);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles by topic">
        {cats.map((c) => (
          <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={`btn btn-sm ${cat === c ? "btn-ink" : "btn-outline"}`}>
            {c === "all" ? "All topics" : labels[c]}
          </button>
        ))}
      </div>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {list.map((p) => (
          <li key={p.slug}>
            <Link href={`/${p.slug}/`} className="group card img-zoom flex h-full flex-col overflow-hidden">
              <div className="relative aspect-[3/1.6] overflow-hidden"><Img src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /></div>
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow">{labels[p.category]}</p>
                <h3 className="mt-2 text-xl group-hover:underline underline-offset-4 decoration-gold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{p.excerpt}</p>
                <p className="mt-4 text-xs uppercase tracking-wider text-muted">{p.date} · {p.minutes} min read</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
