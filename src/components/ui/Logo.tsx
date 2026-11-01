/**
 * Inline SVG logo. Colours come from CSS variables so the header can switch
 * between navy-on-ivory and ivory-on-ink without re-rendering.
 */
export function Logo({ className = "h-9 w-auto", tone, title = "Valencia Smile Expert" }: { className?: string; tone?: "dark" | "light"; title?: string }) {
  const navy = tone === "light" ? "#F3EEE4" : tone === "dark" ? "#112740" : "var(--logo-navy, #112740)";
  const blue = tone === "light" ? "#8FB3D9" : tone === "dark" ? "#366797" : "var(--logo-blue, #366797)";
  return (
    <svg className={className} viewBox="0 0 520 108" role="img" aria-label={title}>
      <path fill={navy} d="M12 6c-8 0-11 7-10 16 2 14 6 24 10 40 3 12 2 30 6 38 2 3 6 4 9 1 4-6 4-20 8-30 1-3 3-6 6-5 6 1 7 11 8 18 2 12 4 20 9 20 4 0 6-4 7-9 1-5 0-13 2-22 1-6 4-12 10-14 0 0 2-1 1-3-1-3-5-6-5-10 0-5 4-8 5-13 1-4-1-9-2-13C73 11 66 5 56 5c-8 0-13 5-20 5S20 6 12 6z" />
      <path fill={blue} d="M76 10c6 2 12 5 15 10 3 5 3 10 0 14-2 3-5 4-5 8 0 3 2 5 3 8 1 3-1 6-3 8-2 2-5 2-5 5 0 2 2 4 1 7-1 4-5 6-8 9-2 2-3 5-2 8 1 3 3 5 2 8-1 4-5 6-8 8-2 1-3 2-3 4v3c7-1 13-5 17-11 3-4 3-9 5-13 1-3 4-5 5-8 1-3 0-6 0-9 1-3 4-5 5-8 1-3-1-6 0-9 1-3 4-5 5-9 1-5-1-10-4-14-4-6-11-10-19-10z" />
      <g fill={navy} fontFamily="var(--font-manrope), Manrope, 'Helvetica Neue', Arial, sans-serif" fontWeight={600}>
        <text x="118" y="60" fontSize="54" letterSpacing="6">VALENCIA</text>
        <text x="121" y="94" fontSize="21" letterSpacing="6.5">SMILE EXPERT</text>
      </g>
    </svg>
  );
}
