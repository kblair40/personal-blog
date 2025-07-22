import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { baseUrl } from "./sitemap";
import { cn } from "./lib/utils";
import { NavbarClient } from "@/components/layout/nav-client";
import Providers from "@/components/layout/providers";
import { getSession } from "@/lib/session";
import clsx from "clsx";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html
      lang="en"
      className={cn(
        "text-black bg-white dark:text-white dark:bg-black",
        geistSans.variable,
        geistMono.variable
      )}
    >
      <head>
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
        {/* If adding a script, make sure it goes below react-scan script above */}
      </head>
      <body className="antialiased min-h-dvh max-w-dvw overflow-x-hidden">
        <Providers>
          <main className="flex flex-col min-w-xs h-full">
            <div className="h-16 z-50 flex items-end pb-2 px-2 md:px-6 lg:px-10 fixed left-0 right-0 top-0 bg-neutral-50 shadow-xs">
              <NavbarClient session={session} />
            </div>

            <div
              className={clsx(
                // "min-h-[calc(100dvh-64px)]",
                // "pt-16 min-h-[calc(100dvh-64px)]",
                // "pt-16",
                "relative top-16",
                // "border-2 border-blue-500",
                "min-h-fillpage h-fillpage overflow-y-hidden"
                //
              )}
            >
              {children}
            </div>

            {/* <Footer /> */}
            <Analytics />
            <SpeedInsights />
          </main>
        </Providers>
      </body>
    </html>
  );
}
