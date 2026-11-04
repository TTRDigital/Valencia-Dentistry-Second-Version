import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NotFoundView } from "@/components/sections/NotFoundView";

/**
 * Branded 404 for any URL that matches no route (served with a 404 status).
 * It bypasses the root layout, so fonts and styles are imported here.
 */
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const sans = Inter_Tight({ subsets: ["latin"], weight: "variable", variable: "--font-sans-src", display: "swap" });

export const metadata: Metadata = { title: "Page not found | Valencia Dentistry", robots: { index: false, follow: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">Skip to content</a>
        <Header variant="solid" />
        <main id="main" className="flex-1"><NotFoundView /></main>
        <Footer />
      </body>
    </html>
  );
}
