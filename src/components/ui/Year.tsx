"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
/** Current year without making the page dynamic (server renders the build-time year, client corrects it). */
export function Year() {
  const year = useSyncExternalStore(subscribe, () => String(new Date().getFullYear()), () => "2026");
  return <>{year}</>;
}
