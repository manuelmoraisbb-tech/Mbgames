import gamesData from "@/data/games.json"

/**
 * Game schema used across the whole site.
 *
 * To add your 90+ games, just append objects to `data/games.json` with this
 * exact shape. `cover` and each `screenshots` entry can be either a local path
 * (e.g. "/images/gow-tm.webp") or a full external URL (e.g. "https://...").
 */
export interface Game {
  /** URL-safe unique id, used as the route: /game/<slug> */
  slug: string
  title: string
  /** Main category, e.g. "God of War Games", "Football Games" */
  category: string
  /** Extra tags for filtering / SEO */
  tags?: string[]
  /** Gameplay genre, e.g. "Action / Adventure" */
  genre: string
  /** Human readable size, e.g. "305MB" or "1.34GB" */
  size: string
  platform: string
  emulator: string
  language: string
  /** Cover image (local path or external URL) */
  cover: string
  /** Gallery images (local paths or external URLs) */
  screenshots: string[]
  /** Direct download link */
  downloadUrl: string
  /** One or more paragraphs describing the game */
  description: string[]
  featured?: boolean
  trending?: boolean
  releaseYear?: number
}

const games = gamesData as Game[]

export function getAllGames(): Game[] {
  return games
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug)
}

export function getTrendingGames(): Game[] {
  const trending = games.filter((g) => g.trending)
  return trending.length ? trending : games.slice(0, 4)
}

export function getFeaturedGames(): Game[] {
  const featured = games.filter((g) => g.featured)
  return featured.length ? featured : games.slice(0, 5)
}

export function getLatestGames(limit?: number): Game[] {
  const latest = [...games]
  return limit ? latest.slice(0, limit) : latest
}

export function getRelatedGames(slug: string, limit = 4): Game[] {
  const current = getGameBySlug(slug)
  if (!current) return games.slice(0, limit)
  const sameCategory = games.filter((g) => g.slug !== slug && g.category === current.category)
  const others = games.filter((g) => g.slug !== slug && g.category !== current.category)
  return [...sameCategory, ...others].slice(0, limit)
}

export interface CategoryCount {
  name: string
  count: number
}

export function getCategories(): CategoryCount[] {
  const map = new Map<string, number>()
  for (const g of games) {
    map.set(g.category, (map.get(g.category) ?? 0) + 1)
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

export function getTags(): CategoryCount[] {
  const map = new Map<string, number>()
  for (const g of games) {
    for (const t of g.tags ?? []) {
      map.set(t, (map.get(t) ?? 0) + 1)
    }
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getGamesByCategory(category: string): Game[] {
  return games.filter((g) => g.category.toLowerCase() === category.toLowerCase())
}

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function searchGames(query: string): Game[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return games.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.genre.toLowerCase().includes(q) ||
      (g.tags ?? []).some((t) => t.toLowerCase().includes(q)),
  )
}
