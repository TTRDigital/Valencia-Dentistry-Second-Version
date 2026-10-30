import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "ink" | "outline" | "outline-light" | "gold";
type Size = "sm" | "md" | "lg";

export function Button({
  href,
  children,
  variant = "solid",
  size = "md",
  className = "",
  external,
  icon,
  type,
  onClick,
  disabled,
  ariaLabel,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  icon?: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : ""} ${className}`;
  if (href) {
    const isExt = external ?? /^(https?:|tel:|mailto:)/.test(href);
    if (isExt) {
      return (
        <a href={href} className={cls} aria-label={ariaLabel} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {icon}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {icon}
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {icon}
      {children}
    </button>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
