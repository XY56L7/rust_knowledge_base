import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeScript from "@/components/ThemeScript";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blockchain Development with Rust - Complete Course",
  description: "Learn blockchain development using Rust. Build secure, high-performance blockchain applications, smart contracts, and decentralized systems with hands-on lessons and exercises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased font-sans relative">
        <ParticleBackground />
        <Navbar />
        <div className="relative z-10">
          {children}
        </div>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
