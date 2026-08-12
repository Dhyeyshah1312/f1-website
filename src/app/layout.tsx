import type { Metadata } from "next";
import { Big_Shoulders, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/f1/nav";
import { Footer } from "@/components/f1/footer";
import { SmoothScrollProvider } from "@/components/f1/smooth-scroll-provider";
import { WebGLTelemetryCanvas } from "@/components/f1/webgl-telemetry-canvas";
import { MagneticCursor } from "@/components/f1/magnetic-cursor";
import { PageTransitionOverlay } from "@/components/f1/page-transition-overlay";
import "./globals.css";

// Google consolidated the former standalone "Big Shoulders Display" cut into
// the single variable "Big Shoulders" family — this is the same condensed,
// extra-bold display face DESIGN.md specifies, just under its current name.
const displayFont = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

const bodyFont = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "F1 — Beginner's Guide",
  description: "An immersive guide to Formula 1 — for first-time viewers and lifelong fans.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-carbon text-titanium font-body selection:bg-circuit-red selection:text-titanium">
        <SmoothScrollProvider>
          <WebGLTelemetryCanvas />
          <MagneticCursor />
          <PageTransitionOverlay />
          <Nav />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
