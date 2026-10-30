"use client";

import { useEffect, useState } from "react";
import { openState } from "@/lib/hours";

/** Live Open/Closed badge (America/Los_Angeles). Renders neutral text until mounted. */
export function OpenBadge({ className = "" }: { className?: string }) {
  const [state, setState] = useState<{ open: boolean; label: string } | null>(null);
  useEffect(() => {
    const tick = () => setState(openState());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium ${className}`} aria-live="polite">
      <span className={`h-2 w-2 rounded-full ${state ? (state.open ? "bg-emerald-500" : "bg-rose-400") : "bg-sand"}`} aria-hidden="true" />
      {state ? state.label : "Mon–Fri 8 AM – 5 PM"}
    </span>
  );
}
