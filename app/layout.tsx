import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ViewportHeightVar from "@/components/ViewportHeightVar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://headphones-landing-one.vercel.app"),
  title: "Velv — Free your ears. Open-fit wireless earbuds.",
  description:
    "Velv open-fit earbuds. Sound that fits, all-day comfort, no silicone tips. 24-hour battery, crystal-clear calls. Starting at $149.",
  keywords: [
    "open-fit earbuds",
    "TWS earbuds",
    "wireless earbuds",
    "Velv",
    "comfortable earbuds",
    "no silicone tips",
  ],
  authors: [{ name: "Velv" }],
  openGraph: {
    title: "Velv — Free your ears. Open-fit wireless earbuds.",
    description:
      "Open-fit earbuds designed for all-day comfort. Sound that fits.",
    type: "website",
    siteName: "Velv",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velv — Free your ears. Open-fit wireless earbuds.",
    description:
      "Open-fit earbuds designed for all-day comfort. Sound that fits.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {/* Set --vh synchronously, before the sections below are laid out and
            before Framer Motion's useScroll measures them. Doing it later (in
            an effect) lets useScroll capture the section at the 1vh-fallback
            height, then --vh resizes it — leaving stale scroll ranges so the
            hero animation never reaches its final frames. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.style.setProperty('--vh',(window.innerHeight*0.01)+'px');",
          }}
        />
        <ViewportHeightVar />
        {children}
      </body>
    </html>
  );
}
