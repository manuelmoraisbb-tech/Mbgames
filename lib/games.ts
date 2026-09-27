import curatedData from "@/data/games.json"
import rawData from "@/data/jogos.json"

/**
 * Game schema used across the whole site.
 *
 * Games come from two files:
 * - `data/jogos.json`  → the main catalogue, in its original Portuguese format
 *   (nome, descricao, imagem, tamanho, link_download, imagem_galeria, ...).
 *   To add a game, just append a new object to this file in the same format.
 * - `data/games.json`  → hand-curated games (local images, featured/trending).
 *   These win over a game with the same title in `jogos.json`.
 */
export interface Game {
  slug: string
  title: string
  category: string
  tags?: string[]
  genre: string
  size: string
  platform: string
  emulator: string
  language: string
  cover: string
  screenshots: string[]
  downloadUrl: string
  description: string[]
  featured?: boolean
  trending?: boolean
  releaseYear?: number
  rating?: number
}

/** Shape of each entry in data/jogos.json */
interface RawGame {
  nome: string
  descricao?: string
  imagem?: string | null
  tamanho?: string
  link_download: string
  imagem_galeria?: string[]
  rawg_rating?: number
  rawg_cover_extra?: string
}

export const FALLBACK_COVER = "/images/cover-fallback.png"

interface CategoryRule {
  category: string
  genre: string
  match: RegExp
}

/** First matching rule wins, so franchise rules come before genre rules. */
const CATEGORY_RULES: CategoryRule[] = [
  { category: "God of War Games", genre: "Action / Adventure", match: /god of war/i },
  { category: "GTA Games", genre: "Action / Adventure", match: /\bgta\b|grand theft auto/i },
  { category: "Naruto Games", genre: "Action / Fighting", match: /naruto/i },
  { category: "Tekken Games", genre: "Fighting", match: /tekken/i },
  { category: "Prince of Persia Games", genre: "Action / Adventure", match: /prince of persia/i },
  { category: "Assassin's Creed Games", genre: "Action / Adventure", match: /assassin/i },
  { category: "WWE Games", genre: "Sports / Wrestling", match: /\bwwe\b|smack ?down/i },
  { category: "SpiderMan Games", genre: "Action / Adventure", match: /spider/i },
  { category: "Marvel & DC Games", genre: "Action / Adventure", match: /x-men|iron man|ghost rider|justice league/i },
  { category: "Final Fantasy Games", genre: "RPG", match: /final fantasy|dissidia|kingdom hearts/i },
  { category: "Metal Gear Games", genre: "Stealth / Action", match: /metal gear/i },
  {
    category: "Football Games",
    genre: "Sports / Football",
    match: /\bpes\b|pro evolution|fifa|winning eleven|efootball/i,
  },
  {
    category: "Racing Games",
    genre: "Racing",
    match:
      /need for speed|moto ?gp|fast and furious|race driver|wipe ?out|burnout|ridge racer|motorstorm|gran turismo|test drive|flatout|sega rally|street supremacy|gripshift|hot wheels|m\.a\.c\.h/i,
  },
  { category: "Fighting Games", genre: "Fighting", match: /mortal kombat|soul ?calibur|dante/i },
  {
    category: "Shooter Games",
    genre: "Shooter / War",
    match: /call of duty|splinter cell|syphon filter|army of two|field commander|metal slug|pursuit force|space invaders/i,
  },
  {
    category: "RPG & Strategy Games",
    genre: "RPG / Strategy",
    match:
      /tactics|\bys\b|disgaea|spectral soul|lord of arcana|puzzle quest|half minutes|lord of the rings|hunter x hunter/i,
  },
  { category: "Sports Games", genre: "Sports", match: /golf|tennis/i },
  {
    category: "Kids & Family Games",
    genre: "Family / Platformer",
    match: /ben 10|sims|simpsons|spongebob|sonic|locoroco|little big planet|daxter|xiaolin|pixeljunk|lumines/i,
  },
]

const DEFAULT_RULE = { category: "PPSSPP Games", genre: "Action / Adventure" }

function classify(title: string) {
  return CATEGORY_RULES.find((r) => r.match.test(title)) ?? DEFAULT_RULE
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/** Loose key used to detect the same game written in two different ways. */
function dedupeKey(title: string): string {
  return slugify(
    title
      .toLowerCase()
      .replace(/grand theft auto/g, "gta")
      .replace(/assassin'?s? creed/g, "assassins creed")
      .replace(/smack ?down vs raw /g, "")
      .replace(/ppsspp|psp iso|\bthe\b/g, ""),
  ).replace(/-/g, "")
}

/** Cleans titles like "Spider – Man 3" or "Naruto Shippuden –  Ultimate" */
function cleanTitle(title: string): string {
  return title
    .replace(/\s*–\s*/g, " – ")
    .replace(/Spider – Man/g, "Spider-Man")
    .replace(/\s{2,}/g, " ")
    .trim()
}

function normalizeSize(size?: string): string {
  if (!size?.trim()) return "N/A"
  return size.replace(/\s+/g, "").toUpperCase()
}

/** Splits the long description into the first sentence + the rest for readability. */
function toParagraphs(text?: string): string[] {
  if (!text?.trim()) return ["Download this PSP game highly compressed for the PPSSPP emulator."]
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g)?.map((s) => s.trim()) ?? [text]
  if (sentences.length <= 2) return [text.trim()]
  return [sentences.slice(0, 2).join(" "), sentences.slice(2).join(" ")]
}

function fromRaw(raw: RawGame): Game {
  const title = cleanTitle(raw.nome)
  const { category, genre } = classify(title)
  const gallery = (raw.imagem_galeria ?? []).filter(Boolean)
  const cover = raw.imagem || raw.rawg_cover_extra || gallery[0] || FALLBACK_COVER

  return {
    slug: slugify(title),
    title,
    category,
    tags: category === "PPSSPP Games" ? ["PPSSPP Games"] : ["PPSSPP Games", category],
    genre,
    size: normalizeSize(raw.tamanho),
    platform: "PSP",
    emulator: "PPSSPP (Android / PC)",
    language: "English",
    cover,
    screenshots: gallery.length ? gallery : [cover],
    downloadUrl: raw.link_download,
    description: toParagraphs(raw.descricao),
    rating: raw.rawg_rating,
  }
}

function buildCatalogue(): Game[] {
  const curated = curatedData as Game[]
  const seenKeys = new Set(curated.map((g) => dedupeKey(g.title)))
  const seenSlugs = new Set(curated.map((g) => g.slug))
  const result = [...curated]

  for (const raw of rawData as RawGame[]) {
    if (!raw?.nome || !raw.link_download) continue
    const game = fromRaw(raw)
    const key = dedupeKey(game.title)
    if (seenKeys.has(key)) continue

    let slug = game.slug
    for (let i = 2; seenSlugs.has(slug); i++) slug = `${game.slug}-${i}`

    seenKeys.add(key)
    seenSlugs.add(slug)
    result.push({ ...game, slug })
  }
  return result
}

const games = buildCatalogue()

export const GAMES_PER_PAGE = 24

export function getAllGames(): Game[] {
  return games
}

export function getPaginatedGames(page: number, perPage = GAMES_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(games.length / perPage))
  const current = Math.min(Math.max(1, Math.floor(page) || 1), totalPages)
  const start = (current - 1) * perPage
  return { games: games.slice(start, start + perPage), page: current, totalPages, total: games.length }
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
  const topRated = games
    .filter((g) => !g.featured && (g.rating ?? 0) >= 4)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  return [...featured, ...topRated]
}

/** Newest additions first: the end of jogos.json is shown at the top. */
export function getLatestGames(limit?: number): Game[] {
  const latest = [...games].reverse()
  return limit ? latest.slice(0, limit) : latest
}

export function getRelatedGames(slug: string, limit = 4): Game[] {
  const current = getGameBySlug(slug)
  if (!current) return games.slice(0, limit)
  const sameCategory = games.filter((g) => g.slug !== slug && g.category === current.category)
  const sameGenre = games.filter(
    (g) => g.slug !== slug && g.category !== current.category && g.genre === current.genre,
  )
  const others = games.filter((g) => g.slug !== slug && g.genre !== current.genre)
  return [...sameCategory, ...sameGenre, ...others].slice(0, limit)
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
