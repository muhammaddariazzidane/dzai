import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DZ-AI",
  applicationName: "DZ-AI",
  description:
    "DZ-AI memanfaatkan teknologi terbaru dalam kecerdasan buatan (AI), khususnya menggunakan model AI dari Gemini. Temukan aplikasi yang inovatif dan solusi cerdas berbasis AI di DZ-AI, memberikan Anda akses ke teknologi yang memimpin di industri ini.",
  authors: [
    {
      name: "Muhammad Dariaz Zidane",
      url: "https://dariazzidane.vercel.app",
    },
  ],
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/144.png',
    apple: '/icons/144.png',
  },
  referrer: 'origin-when-cross-origin',
  keywords: ["AI, artificial intelligence, DZ-AI"],
  generator: 'https://dz-ai.vercel.app',
  creator: 'Muhammad Dariaz Zidane',
  publisher: 'Muhammad Dariaz Zidane',
  formatDetection: {
    email: true,
    address: true,
    url: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
