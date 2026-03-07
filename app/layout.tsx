import type { Metadata } from "next";
import { Crimson_Text, EB_Garamond } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/SkipLink";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getBenedictChapters } from "@/lib/markdown";

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteTitle = "Guidelines for Christian Monks";
const siteDescription =
  "The Rule of Saint Benedict, and other monastic wisdom—listen with the ear of your heart.";

export const metadata: Metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL("http://localhost:3000"),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    images: ["/social.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/social.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chapters = await getBenedictChapters();
  return (
    <html lang="en" className="dark">
      <body
        className={`${crimsonText.variable} ${ebGaramond.variable} antialiased bg-stone-texture gradient-manuscript min-h-screen text-[#f5e8d3] overflow-x-hidden`}
      >
        <SkipLink />
        <SiteHeader chapters={chapters} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
