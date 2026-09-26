import Link from "next/link"
import { getFeaturedGames, getCategories, getTags, categoryToSlug } from "@/lib/games"
import { GameThumbItem } from "@/components/game-cards"
import { SectionCard } from "@/components/section-card"

export function Sidebar() {
  const popular = getFeaturedGames().slice(0, 5)
  const categories = getCategories()
  const tags = getTags()

  return (
    <aside className="flex w-full flex-col gap-6">
      <SectionCard title="Popular Games">
        <div className="flex flex-col gap-4">
          {popular.map((g) => (
            <GameThumbItem key={g.slug} game={g} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Categories">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={`/category/${categoryToSlug(c.name)}`}
              className="rounded-md border border-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {c.name} <span className="text-muted">({c.count})</span>
            </Link>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Tags">
        <div className="flex flex-col divide-y divide-border">
          {tags.map((t) => (
            <Link
              key={t.name}
              href={`/category/${categoryToSlug(t.name)}`}
              className="flex items-center justify-between py-2 text-sm text-foreground transition-colors hover:text-primary"
            >
              <span>{t.name}</span>
              <span className="text-xs text-muted">({t.count})</span>
            </Link>
          ))}
        </div>
      </SectionCard>
    </aside>
  )
}
