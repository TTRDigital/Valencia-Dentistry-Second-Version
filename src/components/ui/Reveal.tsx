/**
 * Wrapper that fades and rises into view (MotionProvider sets the start state
 * only for blocks below the fold). `delay` staggers siblings (ms).
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" | "article" | "figure" | "header" | "span" }) {
  const Comp = Tag as "div";
  return (
    <Comp data-reveal="" className={className} style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}>
      {children}
    </Comp>
  );
}
