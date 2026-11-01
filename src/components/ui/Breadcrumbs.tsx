import Link from "next/link";

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items, light }: { items: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-xs ${light ? "text-on-dark-muted" : "text-muted"}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? <span aria-current="page" className={`inline-flex min-h-11 items-center ${light ? "text-on-dark" : "text-ink-700"}`}>{c.label}</span> : <Link href={c.href} className="-mx-1.5 inline-flex min-h-11 min-w-11 items-center justify-center px-1.5 hover:underline underline-offset-4">{c.label}</Link>}
              {!last && <span aria-hidden="true" className="opacity-50">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
