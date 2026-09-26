import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCategories, getTags, getAllGames, categoryToSlug } from "@/lib/games"
import { GameGridCard } from "@/components/game-cards"
import { Sidebar } from "@/components/sidebar"
import { SectionHeading } from "@/components/section-card"

function resolveCategory(slug: string) {
  const all = [...getCategories(), ...getTags()]
  return all.find((c) => categoryToSlug(c.name) === slug)?.name
}

export function generateStaticParams() {
  const names = new Set<string>()
  for (const c of getCategories()) names.add(categoryToSlug(c.name))
  for (const t of getTags()) names.add(categoryToSlug(t.name))
  return [...names].map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const name = resolveCategory(slug)
  if (!name) return { title: "Category not found" }
  return {
    title: `${name} - Highly Compressed for PPSSPP`,
    description: `Download the best ${name} highly compressed for the PPSSPP emulator on Android and PC.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const name = resolveCategory(slug)
  if (!name) notFound()

  const games = getAllGames().filter((g) => g.category === name || (g.tags ?? []).includes(name))

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0">
        <SectionHeading title={name} />
        <p className="-mt-2 mb-6 text-sm text-muted">
          {games.length} {games.length === 1 ? "game" : "games"} available
        </p>
        {games.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {games.map((g) => (
              <GameGridCard key={g.slug} game={g} />
            ))}
          </div>
        ) : (
          <p className="text-muted">No games in this category yet. Check back soon.</p>
        )}
      </div>
      <Sidebar />
    </div>
  )
}
