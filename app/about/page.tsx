import type { Metadata } from "next"
import { Sidebar } from "@/components/sidebar"
import { SectionHeading } from "@/components/section-card"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about MB Games and our highly compressed PSP games for PPSSPP.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0">
        <SectionHeading title="About MB Games" />
        <div className="flex flex-col gap-4 text-pretty leading-relaxed text-foreground/90">
          <p>
            MB Games is a community-driven library of highly compressed PSP games optimized for the PPSSPP emulator on
            Android and PC. Our goal is simple: make it fast and easy to find great games with small download sizes.
          </p>
          <p>
            Every game listed here includes clear specs, screenshots, step-by-step installation guides, and a direct
            download link. We focus on quality over quantity, and we keep growing our catalog with the titles our
            community loves most.
          </p>
          <p>
            All content is shared for educational and archival purposes. If you enjoy a game, please support the
            original developers by purchasing an official copy.
          </p>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}
