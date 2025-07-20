import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { baseUrl } from "./sitemap";
import { cn } from "./lib/utils";
import { NavbarClient } from "@/components/layout/nav-client";
import Providers from "@/components/layout/providers";
// import Footer from "./components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "OneBlog",
    template: "%s | OneBlog",
  },
  description: "Dev/Tech Blog Aggregator",
  openGraph: {
    title: "OneBlog",
    description: "Dev/Tech Blog Aggregator",
    url: baseUrl,
    siteName: "OneBlog",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "text-black bg-white dark:text-white dark:bg-black",
        geistSans.variable,
        geistMono.variable
      )}
    >
      <body className="antialiased min-h-dvh max-w-dvw overflow-x-hidden">
        <Providers>
          <main className="flex flex-col min-w-xs">
            <div className="h-16 z-50 flex items-end pb-2 px-2 md:px-6 lg:px-10 fixed left-0 right-0 top-0 bg-neutral-50 shadow-xs">
              <NavbarClient />
            </div>

            <div className="pt-16 min-h-[calc(100dvh-64px)]">{children}</div>

            {/* <Footer /> */}
            <Analytics />
            <SpeedInsights />
          </main>
        </Providers>
      </body>
    </html>
  );
}
