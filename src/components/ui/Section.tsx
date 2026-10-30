import type { ReactNode } from "react";

type Tone = "ivory" | "ivory-200" | "white" | "ink";

const tones: Record<Tone, string> = {
  ivory: "bg-ivory text-text",
  "ivory-200": "bg-ivory-200 text-text",
  white: "bg-white text-text",
  ink: "bg-ink text-on-dark on-dark grain",
};

export function Section({
  children,
  tone = "ivory",
  className = "",
  id,
  size = "lg",
  as: Tag = "section",
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  size?: "lg" | "sm";
  as?: "section" | "div" | "article" | "aside";
  labelledBy?: string;
}) {
  const Comp = Tag as "section";
  return (
    <Comp id={id} aria-labelledby={labelledBy} className={`${tones[tone]} ${size === "lg" ? "section" : "section-sm"} ${className}`}>
      <div className="container-x">{children}</div>
    </Comp>
  );
}

/** Eyebrow + heading + gold rule + optional lead, left or centered. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  id,
  className = "",
  size,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  size?: "h1" | "h2" | "h3";
}) {
  const center = align === "center";
  return (
    <div data-reveal="" className={`max-w-3xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Tag id={id} className={size ?? Tag}>{title}</Tag>
      <span className={`gold-rule mt-6 ${center ? "gold-rule-center" : ""}`} aria-hidden="true" />
      {lead && <p className="lead mt-6">{lead}</p>}
    </div>
  );
}
