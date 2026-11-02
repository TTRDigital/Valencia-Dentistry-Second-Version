import { site } from "../../../content/site";
import { Icon } from "./Icons";

const LABELS = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn", x: "X (Twitter)" } as const;

/** Social icons for the profiles configured in content/site.ts; renders nothing when none are set. */
export function SocialLinks({ className = "", linkClass, iconClass = "h-4 w-4" }: { className?: string; linkClass: string; iconClass?: string }) {
  const entries = (Object.keys(LABELS) as (keyof typeof LABELS)[]).filter((k) => site.social[k]);
  if (!entries.length) return null;
  return (
    <ul className={className} aria-label="Social media">
      {entries.map((k) => {
        const I = Icon[k];
        return (
          <li key={k}>
            <a href={site.social[k]} target="_blank" rel="noopener noreferrer" aria-label={LABELS[k]} className={linkClass}>
              <I className={iconClass} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
