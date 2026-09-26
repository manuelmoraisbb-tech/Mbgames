import type { Metadata } from "next"
import { searchGames } from "@/lib/games"
import { GameGridCard } from "@/components/game-cards"
import { Sidebar } from "@/components/sidebar"
import { SectionHeading } from "@/components/section-card"
import { SearchBar } from "@/components/search-bar"

export const metadata: Metadata = {
  title: "Search",
  description: "Search highly compressed PSP games for PPSSPP.",
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = "" } = await searchParams
  const results = q ? searchGames(q) : []

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0">
        <SectionHeading title="Search Games" />
        <div className="-mt-2 mb-6">
          <SearchBar defaultValue={q} />
        </div>
        {q ? (
          <>
            <p className="mb-6 text-sm text-muted">
              {results.length} {results.length === 1 ? "result" : "results"} for{" "}
              <span className="font-semibold text-foreground">&ldquo;{q}&rdquo;</span>
            </p>
            {results.length ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {results.map((g) => (
                  <GameGridCard key={g.slug} game={g} />
                ))}
              </div>
            ) : (
              <p className="text-muted">No games found. Try a different search term.</p>
            )}
          </>
        ) : (
          <p className="text-muted">Type a game name above to start searching.</p>
        )}
      </div>
      <Sidebar />
    </div>
  )
}
