import { Fragment, type ReactNode } from "react";

/** Puts the last `n` words of a headline in italic, in the accent colour. */
export function accent(text: string, n = 2): ReactNode {
  const words = text.trim().split(/\s+/);
  if (words.length <= n) return <em className="accent">{text}</em>;
  const head = words.slice(0, -n).join(" ");
  const tail = words.slice(-n).join(" ");
  return (
    <Fragment>
      {head} <em className="accent">{tail}</em>
    </Fragment>
  );
}
