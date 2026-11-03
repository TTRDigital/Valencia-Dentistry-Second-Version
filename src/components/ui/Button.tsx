import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "ink" | "outline" | "outline-light" | "gold";
type Size = "sm" | "md" | "lg";

/**
 * Pill button. Links get an arrow that nudges on hover; on desktop the engine
 * makes every .btn magnetic, and on touch :active gives press feedback.
 * `cursor` tags it for the custom cursor label ("Book", "View"…).
 */
export function Button({
  href,
  children,
  variant = "solid",
  size = "md",
  className = "",
  external,
  icon,
  arrow,
  type,
  onClick,
  disabled,
  ariaLabel,
  cursor,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  icon?: ReactNode;
  arrow?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  cursor?: string;
}) {
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : ""} ${className}`;
  const showArrow = arrow ?? (!!href && !icon);
  const inner = (
    <span className="btn-label">
      {icon}
      {children}
      {showArrow && <Arrow className="btn-arrow" />}
    </span>
  );
  const data = cursor ? { "data-cursor": cursor } : {};
  if (href) {
    const isExt = external ?? /^(https?:|tel:|mailto:)/.test(href);
    if (isExt) {
      return (
        <a href={href} className={cls} aria-label={ariaLabel} {...data} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel} {...data}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel} {...data}>
      {inner}
    </button>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 shrink-0 ${className}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
