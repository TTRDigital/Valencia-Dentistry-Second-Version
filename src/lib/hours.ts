import { site } from "../../content/site";

/** Open/closed state in the practice's time zone. */
export function openState(now = new Date()) {
  const { days, opens, closes, timeZone } = site.openingHours;
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  const openToday = days.includes(day);
  const open = openToday && minutes >= opens && minutes < closes;
  let label: string;
  if (open) label = `Open now · closes ${fmt(closes)}`;
  else if (openToday && minutes < opens) label = `Closed · opens today at ${fmt(opens)}`;
  else {
    let d = day;
    for (let i = 1; i <= 7; i++) {
      d = (day + i) % 7;
      if (days.includes(d)) break;
    }
    const name = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d];
    label = `Closed · opens ${d === (day + 1) % 7 ? "tomorrow" : name} at ${fmt(opens)}`;
  }
  return { open, label };
}

function fmt(m: number) {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${h % 12 || 12}${mm ? `:${String(mm).padStart(2, "0")}` : ""} ${h < 12 ? "AM" : "PM"}`;
}
