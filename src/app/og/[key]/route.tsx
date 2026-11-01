import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "../../../../content/site";
import { services } from "../../../../content/services";
import { posts } from "@/lib/blog";
import { keyFromPath } from "@/lib/seo";

/**
 * 1200×630 Open Graph image per page, prerendered at build time:
 *   /og/home.png, /og/services--dental-implants.png, /og/post--<slug>.png …
 */
type Card = { key: string; title: string; subtitle: string; image?: string };

const pages: Card[] = [
  { key: "home", title: "Dentistry with heart, one patient at a time", subtitle: "Holistic, one-on-one care in Valencia · Dr. Neda Moezzi, DDS", image: "/images/practice/team-sign.png" },
  { key: "about", title: "A dental home in Valencia since 2007", subtitle: "Meet Dr. Neda Moezzi, DDS", image: "/images/practice/dr-moezzi-portrait.png" },
  { key: "services", title: "Everything your smile needs, under one roof", subtitle: "Preventive · Family · Cosmetic · Restorative · Implants · Holistic", image: "/images/practice/treatment-room.png" },
  { key: "smile-gallery", title: "Real patients, real results", subtitle: "Before & after smile gallery", image: "/images/practice/exam-mirror.png" },
  { key: "testimonials", title: "Kind words from our patients", subtitle: `${site.google.rating} stars on Google`, image: "/images/practice/dr-moezzi-smile-sign.png" },
  { key: "contact", title: "We would love to hear from you", subtitle: `${site.phone} · ${site.address.street}`, image: "/images/practice/team-four.png" },
  { key: "appointment", title: "Book your visit", subtitle: "Online in under a minute, or we will call you", image: "/images/practice/consult-chair.png" },
  { key: "new-patient-offer", title: "$59 new patient exam & X-rays", subtitle: "Unhurried time with Dr. Moezzi", image: "/images/practice/checkup-smile.png" },
  { key: "emergency-dental", title: "In pain? We will see you today", subtitle: "Same-day emergency dental care in Valencia", image: "/images/practice/dr-moezzi-treating.png" },
  { key: "blog", title: "Guides for a healthier smile", subtitle: "Written by Dr. Neda Moezzi, DDS", image: "/images/practice/exam-mirror.png" },
  { key: "sitemap", title: "Sitemap", subtitle: site.name },
  { key: "privacy-policy", title: "Privacy Policy", subtitle: site.name },
  { key: "terms-and-services", title: "Terms and Services", subtitle: site.name },
  { key: "thank-you", title: "Thank you", subtitle: site.name },
  ...services.map((s) => ({ key: keyFromPath(s.path), title: s.hero.title, subtitle: s.menuDescription, image: s.image })),
  ...posts.map((p) => ({ key: `post--${p.slug}`, title: p.title, subtitle: `Blog · Dr. Neda Moezzi, DDS`, image: p.image })),
];

export function generateStaticParams() {
  return pages.map((p) => ({ key: `${p.key}.png` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const card = pages.find((p) => `${p.key}.png` === key);
  if (!card) return new Response("Not found", { status: 404 });
  const [fraunces, manrope] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/Fraunces-Light.ttf")),
    readFile(join(process.cwd(), "public/fonts/Manrope-SemiBold.ttf")),
  ]);
  let photo: string | undefined;
  if (card.image) {
    const buf = await readFile(join(process.cwd(), "public", card.image));
    photo = `data:image/${card.image.endsWith(".jpg") ? "jpeg" : "png"};base64,${buf.toString("base64")}`;
  }
  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, display: "flex", background: "#0F1F33", color: "#F3EEE4", fontFamily: "Manrope", position: "relative" }}>
        {photo && <img src={photo} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, width: 1200, height: 630, objectFit: "cover", opacity: 0.55 }} />}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(15,31,51,0.96) 0%, rgba(15,31,51,0.75) 55%, rgba(15,31,51,0.35) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: 1200, height: 630 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 6, textTransform: "uppercase" }}>
            <span style={{ width: 48, height: 1, background: "#D9BE8C" }} />
            <span>Valencia Smile Expert</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
            <div style={{ fontFamily: "Fraunces", fontSize: card.title.length > 48 ? 56 : 68, lineHeight: 1.08, letterSpacing: -1 }}>{card.title}</div>
            <div style={{ marginTop: 22, fontSize: 26, color: "#B9C2CF" }}>{card.subtitle}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#B9C2CF" }}>
            <span>{site.address.neighborhood} · Santa Clarita, CA</span>
            <span style={{ color: "#D9BE8C" }}>{site.phone}</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: [{ name: "Fraunces", data: fraunces, weight: 300 }, { name: "Manrope", data: manrope, weight: 600 }] },
  );
}
