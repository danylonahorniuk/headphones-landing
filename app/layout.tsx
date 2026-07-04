import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://velv-landing.vercel.app"),
  title: "Velv — Free your ears.",
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
    title: "Velv — Free your ears.",
    description:
      "Open-fit earbuds designed for all-day comfort. Sound that fits.",
    type: "website",
    siteName: "Velv",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velv — Free your ears.",
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
