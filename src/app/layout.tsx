import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Fraunces, Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { site } from "../../content/site";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { RevealObserver } from "@/components/ui/Reveal";
import { Analytics } from "@/components/layout/Analytics";

// Static instances (not the variable font): four small files instead of two 120–150 KB ones on the LCP path.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const manrope = Manrope({ subsets: ["latin"], weight: "variable", variable: "--font-manrope", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Dentist in Valencia, Santa Clarita`, template: `%s | ${site.name}` },
  description: "Holistic, one-on-one dentistry in Valencia, Santa Clarita with Dr. Nuriel Lavi, DDS. Implants, veneers, Invisalign and same-day crowns. Book your first visit today.",
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#1C1B19", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">Skip to content</a>
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <MobileBar />
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
