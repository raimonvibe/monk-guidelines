import type { Metadata } from "next";
import { Crimson_Text, EB_Garamond } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/SkipLink";

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

export const metadata: Metadata = {
  title: "Guidelines for Christian Monks",
  description:
    "The Rule of Saint Benedict, and other monastic wisdom—listen with the ear of your heart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${crimsonText.variable} ${ebGaramond.variable} antialiased bg-stone-texture gradient-manuscript min-h-screen text-[#f5e8d3] overflow-x-hidden`}
      >
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
