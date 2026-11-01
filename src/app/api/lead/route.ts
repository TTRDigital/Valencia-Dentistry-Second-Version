import { NextResponse, type NextRequest } from "next/server";
import { deliverLead, verifyTurnstile } from "@/lib/lead";

const MAX = { name: 120, email: 200, phone: 40, service: 120, preferred_time: 120, comments: 2000 };
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot + time trap: bots fill hidden fields and submit instantly.
  if (str(body.website, 100)) return NextResponse.json({ ok: true, redirect: "/thank-you/" });
  const started = Number(body.started_at);
  if (!started || Date.now() - started < 3000) return NextResponse.json({ ok: false, error: "Please take a moment and try again." }, { status: 400 });

  const name = str(body.name, MAX.name);
  const email = str(body.email, MAX.email);
  const phone = str(body.phone, MAX.phone);
  const consent = body.consent === true || body.consent === "on" || body.consent === "true";
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Please enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 10) errors.phone = "Please enter a 10-digit phone number.";
  if (!consent) errors.consent = "Please confirm we may contact you.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  if (!(await verifyTurnstile(str(body.turnstile_token, 2000) || undefined, ip))) {
    return NextResponse.json({ ok: false, error: "Verification failed. Please try again or call us." }, { status: 400 });
  }

  const service = str(body.service, MAX.service);
  const preferred_time = str(body.preferred_time, MAX.preferred_time);
  const comments = str(body.comments, MAX.comments);
  const form = str(body.form, 60) || "contact";
  const page_url = str(body.page_url, 500);
  const utm: Record<string, string> = {};
  if (body.utm && typeof body.utm === "object") for (const [k, v] of Object.entries(body.utm as Record<string, unknown>)) utm[k] = str(v, 200);

  const fields: Record<string, string> = { "Full Name": name, "Phone Number": phone, "Email Address": email };
  if (service) fields["Service of Interest"] = service;
  if (preferred_time) fields["Preferred Time"] = preferred_time;
  if (comments) fields["Message"] = comments;
  fields["Consent"] = "Yes";

  const result = await deliverLead({ form, page_url, name, phone, email, service, preferred_time, comments, utm, fields });
  if (!result.ok) return NextResponse.json({ ok: false, error: "We could not send your request right now." }, { status: 502 });
  return NextResponse.json({ ok: true, redirect: "/thank-you/" });
}
