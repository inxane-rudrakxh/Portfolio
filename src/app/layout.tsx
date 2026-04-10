import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rudraksh-eight.vercel.app"
  ),
  title: "Rudraksh Kottalwar — Full Stack Developer",
  description:
    "Portfolio of Rudraksh Kottalwar — Full Stack Developer specialising in React, Next.js, Firebase, AI integrations and Python. Building tools & web apps that solve real problems.",
  keywords: [
    "Rudraksh Kottalwar",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Portfolio",
    "Firebase",
    "AI Developer",
    "inxane-rudrakxh",
  ],
  authors: [{ name: "Rudraksh Kottalwar" }],
  openGraph: {
    title: "Rudraksh Kottalwar — Full Stack Developer",
    description:
      "Building tools & web apps with React, Next.js, Firebase and AI. View my portfolio of projects and experience.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rudraksh-eight.vercel.app",
    siteName: "Rudraksh Kottalwar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudraksh Kottalwar — Full Stack Developer",
    description: "Building tools & web apps with React, Next.js, Firebase and AI.",
    creator: "@inxane_rudrakxh",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
