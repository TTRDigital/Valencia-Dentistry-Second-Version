import { MARK_ACCENT, MARK_DARK, MARK_VIEWBOX } from "./logo-paths";

/**
 * Valencia Dentistry logo: the practice's V + tooth mark with the wordmark.
 * Colours come from CSS variables so the header can switch between
 * charcoal-on-ivory and ivory-on-dark without re-rendering; `tone` forces one.
 */
export function Logo({ className = "h-9 w-auto", tone, title = "Valencia Dentistry" }: { className?: string; tone?: "dark" | "light"; title?: string }) {
  const dark = tone === "light" ? "#F3EEE4" : tone === "dark" ? "#2E2E2E" : "var(--logo-dark, #2E2E2E)";
  const accent = tone === "light" ? "#C9BA9C" : tone === "dark" ? "#9A8B72" : "var(--logo-accent, #9A8B72)";
  const sub = tone === "light" ? "#C9BA9C" : tone === "dark" ? "#7A6B52" : "var(--logo-sub, #7A6B52)";
  return (
    <svg className={className} viewBox="0 0 2060 495" role="img" aria-label={title}>
      <svg viewBox={MARK_VIEWBOX} width="598" height="495">
        <path fill={dark} d={MARK_DARK} />
        <path fill={accent} d={MARK_ACCENT} />
      </svg>
      <g fontFamily="var(--font-manrope), Manrope, 'Helvetica Neue', Arial, sans-serif">
        <text x="660" y="300" fontSize="210" fontWeight={500} letterSpacing="22" fill={dark}>VALENCIA</text>
        <text x="672" y="420" fontSize="74" fontWeight={600} letterSpacing="38" fill={sub}>DENTISTRY</text>
      </g>
    </svg>
  );
}

/** The mark on its own (doctor card, favicon-style accents). */
export function Mark({ className = "h-10 w-auto", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <svg className={className} viewBox={MARK_VIEWBOX} aria-hidden="true">
      <path fill={tone === "light" ? "#F3EEE4" : "#2E2E2E"} d={MARK_DARK} />
      <path fill={tone === "light" ? "#C9BA9C" : "#9A8B72"} d={MARK_ACCENT} />
    </svg>
  );
}
