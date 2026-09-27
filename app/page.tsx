import Link from "next/link"
import { getTrendingGames, getLatestGames, getAllGames } from "@/lib/games"
import { SearchBar } from "@/components/search-bar"
import { Sidebar } from "@/components/sidebar"
import { SectionHeading } from "@/components/section-card"
import { GameHeroCard, GameThumbItem, GameListItem, GameGridCard } from "@/components/game-cards"

export default function HomePage() {
  const trending = getTrendingGames()
  const latest = getLatestGames(5)
  const all = getAllGames()
  const heroGame = trending[0]
  const trendingRest = trending.slice(1, 4)

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-navy">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            {all.length}+ Games ready to play
          </p>
          <h1 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight text-navy-foreground text-balance sm:text-4xl md:text-5xl">
            Highly Compressed PSP Games for the PPSSPP Emulator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-navy-foreground/70">
            Download God of War, PES, Naruto, Tekken, GTA and more, fully optimized to run on Android and PC. Fast
            links, small sizes, no hassle.
          </p>
          <div className="mx-auto mt-8 max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          {/* Trending */}
          <section className="mb-12">
            <SectionHeading title="Trending Games" moreHref="/games" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {heroGame && <GameHeroCard game={heroGame} />}
              <div className="flex flex-col justify-center gap-5 rounded-card border border-border bg-surface p-5 shadow-sm">
                {trendingRest.map((g) => (
                  <GameThumbItem key={g.slug} game={g} />
                ))}
              </div>
            </div>
          </section>

          {/* Latest */}
          <section className="mb-12">
            <SectionHeading title="Latest Games" moreHref="/games" />
            <div className="flex flex-col gap-6">
              {latest.map((g) => (
                <GameListItem key={g.slug} game={g} />
              ))}
            </div>
          </section>

          {/* All games grid */}
          <section>
            <SectionHeading title="Browse All Games" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {all.slice(0, 12).map((g) => (
                <GameGridCard key={g.slug} game={g} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/games"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"
              >
                View all {all.length} games
              </Link>
            </div>
          </section>
        </div>

        <Sidebar />
      </div>
    </div>
  )
}
