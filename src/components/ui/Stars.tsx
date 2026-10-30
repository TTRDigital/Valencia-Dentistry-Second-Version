import { Icon } from "./Icons";

export function Stars({ n = 5, className = "h-4 w-4" }: { n?: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-gold" aria-label={`${n} out of 5 stars`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon.star key={i} className={`${className} ${i < n ? "" : "opacity-30"}`} />
      ))}
    </span>
  );
}
