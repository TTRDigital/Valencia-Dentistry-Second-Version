import type { ReactNode } from "react";

/** The one page container: 84rem max, 16px gutters on phones, 40px on desktop. */
export function Container({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "header" | "nav" }) {
  const Comp = Tag as "div";
  return <Comp className={`container-x ${className}`}>{children}</Comp>;
}
