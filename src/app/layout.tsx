import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import { site } from "../../content/site";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Analytics } from "@/components/layout/Analytics";

// Display: Instrument Serif (OFL, one weight + italic, two small files). Text: Inter Tight (variable).
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const sans = Inter_Tight({ subsets: ["latin"], weight: "variable", variable: "--font-sans-src", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Dentist in Valencia, Santa Clarita`, template: `%s | ${site.name}` },
  description: "Holistic, one-on-one dentistry in Valencia, Santa Clarita with Dr. Nuriel Lavi, DDS. Implants, veneers, Invisalign and same-day crowns. Book your first visit today.",
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0F0F0D", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${display.variable} ${sans.variable} h-full`}>
      <head>
        {/* The intro curtain plays once per browser session. */}
        <script dangerouslySetInnerHTML={{ __html: "try{sessionStorage.getItem('vd-intro')?document.documentElement.classList.add('intro-seen'):sessionStorage.setItem('vd-intro','1')}catch(e){document.documentElement.classList.add('intro-seen')}" }} />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="intro" aria-hidden="true">
          <div className="intro-panel">
            <div className="intro-word"><span>Valencia</span></div>
            <div className="intro-count">Dentistry · Santa Clarita</div>
            <span className="intro-bar" />
          </div>
        </div>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
        <Footer />
        <Suspense fallback={null}><MobileBar /></Suspense>
        <Suspense fallback={null}><MotionProvider /></Suspense>
        <Analytics />
      </body>
    </html>
  );
}
