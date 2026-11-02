import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NotFoundView } from "@/components/sections/NotFoundView";

/**
 * Branded 404 for any URL that matches no route (served with a 404 status).
 * It bypasses the root layout, so fonts and styles are imported here.
 */
const fraunces = Fraunces({ subsets: ["latin"], weight: ["300", "400"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: "variable", variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = { title: "Page not found | Valencia Dentistry", robots: { index: false, follow: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">Skip to content</a>
        <Header variant="solid" />
        <main id="main" className="flex-1"><NotFoundView /></main>
        <Footer />
      </body>
    </html>
  );
}
