"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { site } from "../../../content/site";
import { Icon } from "@/components/ui/Icons";

type Props = { form: "appointment" | "contact" | "emergency" | "offer"; services: string[]; compact?: boolean; defaultService?: string };
type Errors = Partial<Record<"name" | "phone" | "email" | "consent", string>>;

const TIMES = ["Any time", "Early morning (8–10 AM)", "Late morning (10–12)", "Afternoon (12–3 PM)", "Late afternoon (3–5 PM)"];
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

function readUtm() {
  try {
    const stored = JSON.parse(sessionStorage.getItem("vse-utm") || "{}") as Record<string, string>;
    const sp = new URLSearchParams(window.location.search);
    const fresh: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = sp.get(k);
      if (v) fresh[k] = v;
    }
    const merged = { ...stored, ...fresh };
    if (Object.keys(fresh).length) sessionStorage.setItem("vse-utm", JSON.stringify(merged));
    return merged;
  } catch {
    return {};
  }
}

/**
 * Native, accessible lead form: inline validation on blur, honeypot and
 * time-trap, optional Cloudflare Turnstile (NEXT_PUBLIC_TURNSTILE_SITE_KEY),
 * JSON POST to /api/lead, redirect to /thank-you/ on success. On failure the
 * phone number is shown so no patient is lost.
 */
export function AppointmentForm({ form, services, compact, defaultService = "" }: Props) {
  const router = useRouter();
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const [failMsg, setFailMsg] = useState("");
  const started = useRef(0);
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const tsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    started.current = Date.now();
  }, []);

  useEffect(() => {
    if (!turnstileKey || !tsRef.current) return;
    if (document.querySelector("script[data-turnstile]")) return;
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    s.dataset.turnstile = "";
    document.head.appendChild(s);
  }, [turnstileKey]);

  const validateField = (name: keyof Errors, value: string | boolean) => {
    let msg = "";
    if (name === "name" && String(value).trim().length < 2) msg = "Please enter your name.";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value))) msg = "Please enter a valid email address.";
    if (name === "phone" && String(value).replace(/\D/g, "").length < 10) msg = "Please enter a 10-digit phone number.";
    if (name === "consent" && !value) msg = "Please confirm we may contact you.";
    setErrors((e) => ({ ...e, [name]: msg || undefined }));
    return !msg;
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");
    const ok = [validateField("name", get("name")), validateField("email", get("email")), validateField("phone", get("phone")), validateField("consent", fd.get("consent") === "on")].every(Boolean);
    if (!ok) {
      const first = e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form,
          name: get("name"),
          phone: get("phone"),
          email: get("email"),
          service: get("service"),
          preferred_time: get("preferred_time"),
          comments: get("comments"),
          consent: fd.get("consent") === "on",
          website: get("website"),
          started_at: started.current,
          page_url: window.location.href,
          utm: readUtm(),
          turnstile_token: get("cf-turnstile-response"),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; redirect?: string; errors?: Errors; error?: string };
      if (json.ok) {
        router.push(json.redirect || "/thank-you/");
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        setStatus("idle");
        return;
      }
      setFailMsg(json.error || "Something went wrong.");
      setStatus("failed");
    } catch {
      setFailMsg("We could not reach our server.");
      setStatus("failed");
    }
  }

  const field = (name: keyof Errors | "service" | "preferred_time" | "comments") => `${id}-${name}`;
  const inputCls = (err?: string) => `mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-base text-text placeholder:text-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate ${err ? "border-rose-500" : "border-sand"}`;

  if (status === "failed") {
    return (
      <div role="alert" className="rounded-2xl border border-rose-200 bg-white p-7">
        <h3 className="text-2xl">We could not send your request</h3>
        <p className="mt-2 text-muted">{failMsg} Please call us and we will get you scheduled right away.</p>
        <a href={`tel:${site.phoneE164}`} className="btn btn-solid mt-5"><Icon.phone className="h-4 w-4" /> {site.phone}</a>
        <button type="button" className="btn btn-outline mt-5 ml-3" onClick={() => setStatus("idle")}>Try again</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5" aria-describedby={`${id}-note`}>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor={field("name")} className="text-sm font-semibold text-ink-700">Full name <span aria-hidden="true" className="text-rose-500">*</span></label>
          <input id={field("name")} name="name" autoComplete="name" required className={inputCls(errors.name)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${field("name")}-err` : undefined} onBlur={(e) => validateField("name", e.target.value)} />
          {errors.name && <p id={`${field("name")}-err`} className="mt-1 text-sm text-rose-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={field("phone")} className="text-sm font-semibold text-ink-700">Phone <span aria-hidden="true" className="text-rose-500">*</span></label>
          <input id={field("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={inputCls(errors.phone)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? `${field("phone")}-err` : undefined} onBlur={(e) => validateField("phone", e.target.value)} />
          {errors.phone && <p id={`${field("phone")}-err`} className="mt-1 text-sm text-rose-600">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label htmlFor={field("email")} className="text-sm font-semibold text-ink-700">Email <span aria-hidden="true" className="text-rose-500">*</span></label>
        <input id={field("email")} name="email" type="email" autoComplete="email" required className={inputCls(errors.email)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${field("email")}-err` : undefined} onBlur={(e) => validateField("email", e.target.value)} />
        {errors.email && <p id={`${field("email")}-err`} className="mt-1 text-sm text-rose-600">{errors.email}</p>}
      </div>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor={field("service")} className="text-sm font-semibold text-ink-700">What can we help with?</label>
          <select id={field("service")} name="service" defaultValue={defaultService} className={inputCls()}>
            <option value="">Choose a service (optional)</option>
            {services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={field("preferred_time")} className="text-sm font-semibold text-ink-700">Preferred time</label>
          <select id={field("preferred_time")} name="preferred_time" className={inputCls()} defaultValue="">
            <option value="">Choose a time (optional)</option>
            {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={field("comments")} className="text-sm font-semibold text-ink-700">Message</label>
        <textarea id={field("comments")} name="comments" rows={compact ? 3 : 4} className={inputCls()} placeholder="Tell us a little about what you need" />
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" className="mt-1 h-5 w-5 rounded border-sand accent-slate-600" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? `${id}-consent-err` : undefined} onChange={(e) => validateField("consent", e.target.checked)} />
          <span>I agree that Valencia Smile Expert may contact me by phone, text or email about my request. Message and data rates may apply. See our <Link href="/privacy-policy/" className="underline underline-offset-2">privacy policy</Link>.</span>
        </label>
        {errors.consent && <p id={`${id}-consent-err`} className="mt-1 text-sm text-rose-600">{errors.consent}</p>}
      </div>
      {/* Honeypot: hidden from people, filled by bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {turnstileKey && <div ref={tsRef} className="cf-turnstile" data-sitekey={turnstileKey} data-theme="light" />}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-solid btn-lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : form === "emergency" ? "Request urgent care" : "Send request"}
        </button>
        <p id={`${id}-note`} className="text-xs text-muted">Or call <a href={`tel:${site.phoneE164}`} className="font-semibold text-ink-700">{site.phone}</a>. We reply during office hours, usually within a few hours.</p>
      </div>
    </form>
  );
}
