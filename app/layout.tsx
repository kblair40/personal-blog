import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { baseUrl } from "./sitemap";
import Footer from "./components/footer";
import { NavbarClient } from "./components/nav-client";
import { UserContextProvider } from "./store/userStore";
import { cn } from "./lib/utils";

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
    default: "Blog",
    template: "%s | Kevin Blair Blog",
  },
  description: "Kevin Blair's personal blog.",
  openGraph: {
    title: "Kevin Blair's Blog",
    description: "Kevin Blair's personal blog.",
    url: baseUrl,
    siteName: "My Portfolio",
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
      <UserContextProvider>
        <body className="antialiased min-h-dvh max-w-dvw overflow-x-hidden">
          <main className="flex flex-col px-2 md:px-6 lg:px-10 min-w-xs">
            <div className="h-16 flex items-end pb-1">
              <NavbarClient />
            </div>

            {children}

            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </body>
      </UserContextProvider>
    </html>
  );
}
