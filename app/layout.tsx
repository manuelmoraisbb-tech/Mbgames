import type { Metadata } from "next"
import Script from "next/script"
import { Inter, Space_Grotesk } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://mbgames.site"),
  title: {
    default: "MBgames - Highly Compressed PSP Games for PPSSPP Emulator",
    template: "%s | MBgames",
  },
  description:
    "Download 90+ highly compressed PSP games for the PPSSPP emulator on Android and PC. God of War, PES, Naruto, Tekken, GTA and more, ready to play.",
  keywords: ["PPSSPP", "PSP games", "MBgames", "PSP ISO download", "highly compressed", "emulator"],
  authors: [{ name: "MBgames" }],
  other: {
    monetag: "abeec958a7fecba1193518060833b127",
  },
  openGraph: {
    title: "MBgames - Highly Compressed PSP Games for PPSSPP",
    description: "Download 90+ highly compressed PSP games for PPSSPP on Android and PC.",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#0a1020",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Script id="monetag-tag" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='11903639',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>
        <Script id="monetag-vignette" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='11903640',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>
      </body>
    </html>
  )
}
