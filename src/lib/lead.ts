import "server-only";

/**
 * Delivers a website form submission to the practice's GoHighLevel inbound
 * webhook (GHL_WEBHOOK_URL). Payload: flat top-level fields plus `fields`
 * (label → value). If the webhook is missing or fails, the lead is logged so
 * it can be recovered from the server logs and the visitor is asked to call.
 */
export type LeadInput = {
  form: string;
  page_url: string;
  name: string;
  phone: string;
  email: string;
  service?: string;
  preferred_time?: string;
  comments?: string;
  utm?: Record<string, string>;
  fields: Record<string, string>;
};

export function phoneE164(raw = "") {
  const d = raw.replace(/\D/g, "");
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith("1")) return `+${d}`;
  return raw.trim();
}

export function buildPayload(l: LeadInput) {
  const [first, ...rest] = l.name.trim().split(/\s+/);
  const utm: Record<string, string> = {};
  for (const [k, v] of Object.entries(l.utm ?? {})) if (/^utm_[a-z_]+$/.test(k) && v) utm[k] = String(v).slice(0, 200);
  return {
    source: "Website form",
    form: l.form,
    tags: ["website-lead", l.form],
    submitted_at: new Date().toISOString(),
    first_name: first || "",
    last_name: rest.join(" "),
    name: l.name.trim(),
    email: l.email.trim(),
    phone: phoneE164(l.phone),
    phone_raw: l.phone.trim(),
    service: l.service ?? "",
    preferred_time: l.preferred_time ?? "",
    comments: l.comments ?? "",
    page_url: l.page_url,
    ...utm,
    fields: l.fields,
  };
}

async function post(url: string, body: unknown) {
  let last: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(8000), cache: "no-store" });
      if (res.ok) return true;
      last = new Error(`${res.status} ${(await res.text().catch(() => "")).slice(0, 200)}`);
      if (res.status !== 429 && res.status < 500) break;
    } catch (err) {
      last = err;
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  throw last;
}

export async function deliverLead(l: LeadInput): Promise<{ ok: boolean; reason?: string }> {
  const payload = buildPayload(l);
  const url = (process.env.GHL_WEBHOOK_URL ?? "").trim();
  if (!/^https?:\/\//.test(url)) {
    console.error("[lead] GHL_WEBHOOK_URL is not set. Lead:", JSON.stringify(payload));
    return { ok: false, reason: "not-configured" };
  }
  try {
    await post(url, payload);
    return { ok: true };
  } catch (err) {
    console.error("[lead] delivery failed:", String(err), "Lead:", JSON.stringify(payload));
    return { ok: false, reason: "delivery-failed" };
  }
}

/** Cloudflare Turnstile check; passes when not configured. */
export async function verifyTurnstile(token: string | undefined, ip?: string | null) {
  const secret = (process.env.TURNSTILE_SECRET_KEY ?? "").trim();
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip ?? undefined }),
      signal: AbortSignal.timeout(6000),
    });
    const json = (await res.json()) as { success?: boolean };
    return Boolean(json.success);
  } catch {
    return true; // Cloudflare unreachable: do not lose the lead
  }
}
