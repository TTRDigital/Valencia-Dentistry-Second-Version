import type { ReactNode } from "react";
import { accent } from "./Accent";

type Tone = "ivory" | "ivory-200" | "white" | "ink" | "olive" | "light" | "cream" | "dark";

const tones: Record<Tone, string> = {
  ivory: "bg-ivory text-text",
  light: "bg-ivory text-text",
  "ivory-200": "bg-ivory-200 text-text",
  cream: "bg-ivory-200 text-text",
  white: "bg-white text-text",
  ink: "bg-ink text-on-dark on-dark grain",
  dark: "bg-ink text-on-dark on-dark grain",
  olive: "bg-olive-900 text-on-dark on-dark grain",
};

/** A page section: one tone, one spacing step (sm 64 / default 64–128 / lg 96–128), one container. */
export function Section({
  children,
  tone = "ivory",
  className = "",
  id,
  size = "lg",
  as: Tag = "section",
  labelledBy,
  bare,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  size?: "lg" | "sm";
  as?: "section" | "div" | "article" | "aside";
  labelledBy?: string;
  /** Skip the inner container (full-bleed children). */
  bare?: boolean;
}) {
  const Comp = Tag as "section";
  return (
    <Comp id={id} aria-labelledby={labelledBy} className={`relative overflow-clip ${tones[tone]} ${size === "lg" ? "section" : "section-sm"} ${className}`}>
      {bare ? children : <div className="container-x relative">{children}</div>}
    </Comp>
  );
}

/**
 * Eyebrow + heading + optional lead. The heading's lines rise from masks as
 * it enters (data-split); string titles get their last words in italic accent.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  id,
  className = "",
  size,
  accentWords = 2,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  size?: "h1" | "h2" | "h3";
  accentWords?: number;
}) {
  const center = align === "center";
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="eyebrow mb-5" data-reveal="">
          <span className="gold-rule w-8" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={size ?? Tag} data-split="">
        {typeof title === "string" && accentWords > 0 ? accent(title, accentWords) : title}
      </Tag>
      {lead && <p className="lead mt-6" data-reveal="">{lead}</p>}
    </div>
  );
}
