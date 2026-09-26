import type { Metadata } from "next"
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
      </body>
    </html>
  )
}
