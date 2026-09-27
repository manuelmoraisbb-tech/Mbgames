import type { Metadata } from "next"
import { getPaginatedGames } from "@/lib/games"
import { GameGridCard } from "@/components/game-cards"
import { Sidebar } from "@/components/sidebar"
import { SectionHeading } from "@/components/section-card"
import { Pagination } from "@/components/pagination"

export const metadata: Metadata = {
  title: "All Games",
  description: "Browse all highly compressed PSP games for the PPSSPP emulator.",
}

export default async function GamesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams
  const { games, page, totalPages, total } = getPaginatedGames(Number(pageParam) || 1)

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0">
        <SectionHeading title="All Games" />
        <p className="-mt-2 mb-6 text-sm text-muted">
          {total} games available
          {totalPages > 1 ? ` · Page ${page} of ${totalPages}` : ""}
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {games.map((g) => (
            <GameGridCard key={g.slug} game={g} />
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} basePath="/games" />
      </div>
      <Sidebar />
    </div>
  )
}
