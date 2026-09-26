import type { Metadata } from "next"
import { getAllGames } from "@/lib/games"
import { GameGridCard } from "@/components/game-cards"
import { Sidebar } from "@/components/sidebar"
import { SectionHeading } from "@/components/section-card"

export const metadata: Metadata = {
  title: "All Games",
  description: "Browse all highly compressed PSP games for the PPSSPP emulator.",
}

export default function GamesPage() {
  const games = getAllGames()
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0">
        <SectionHeading title="All Games" />
        <p className="-mt-2 mb-6 text-sm text-muted">{games.length} games available</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {games.map((g) => (
            <GameGridCard key={g.slug} game={g} />
          ))}
        </div>
      </div>
      <Sidebar />
    </div>
  )
}
