import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import DataLayerInspector from "@/components/DataLayerInspector";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kodeva — Platform Solusi Digital, Template & Source Code Berkualitas",
  description:
    "Dapatkan website profesional, source code aplikasi siap pakai, dan template premium untuk mengakselerasi pertumbuhan bisnis Anda tanpa ribet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="image"
          href="/hero-bg.webp"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <DataLayerInspector />
      </body>
    </html>
  );
}
