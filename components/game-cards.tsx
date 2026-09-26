import Image from "next/image"
import Link from "next/link"
import { HardDrive, Download } from "lucide-react"
import type { Game } from "@/lib/games"
import { CategoryBadge } from "@/components/badge"

/** Big hero card used as the main trending item */
export function GameHeroCard({ game }: { game: Game }) {
  return (
    <Link
      href={`/game/${game.slug}`}
      className="group relative block overflow-hidden rounded-card border border-border"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={game.cover || "/placeholder.svg"}
          alt={game.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      </div>
      <div className="absolute left-3 top-3">
        <CategoryBadge category={game.category} />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="mb-1.5 inline-block rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
          {game.size}
        </span>
        <h3 className="font-display text-lg font-bold leading-tight text-white text-balance">{game.title}</h3>
      </div>
    </Link>
  )
}

/** Small horizontal item: thumbnail + title (sidebar / trending secondary) */
export function GameThumbItem({ game }: { game: Game }) {
  return (
    <Link href={`/game/${game.slug}`} className="group flex items-center gap-3">
      <div className="relative size-14 shrink-0 overflow-hidden rounded-md border border-border">
        <Image
          src={game.cover || "/placeholder.svg"}
          alt={game.title}
          fill
          sizes="56px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
          <span className="text-primary">[{game.size}]</span> {game.title}
        </p>
      </div>
    </Link>
  )
}

/** Latest games list row: thumbnail + title + excerpt */
export function GameListItem({ game }: { game: Game }) {
  return (
    <article className="flex flex-col gap-4 border-b border-border pb-6 last:border-0 last:pb-0 sm:flex-row">
      <Link
        href={`/game/${game.slug}`}
        className="group relative aspect-video w-full shrink-0 overflow-hidden rounded-card border border-border sm:w-52"
      >
        <Image
          src={game.cover || "/placeholder.svg"}
          alt={game.title}
          fill
          sizes="(max-width: 640px) 100vw, 208px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2">
          <CategoryBadge category={game.category} />
        </span>
      </Link>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg font-bold leading-tight text-foreground sm:text-xl">
          <Link href={`/game/${game.slug}`} className="hover:text-primary">
            <span className="text-primary">[{game.size}]</span> {game.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{game.description[0]}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <HardDrive className="size-3.5" /> {game.size}
          </span>
          <span>{game.genre}</span>
          <span>{game.platform}</span>
        </div>
      </div>
    </article>
  )
}

/** Grid card: cover on top, title + meta below */
export function GameGridCard({ game }: { game: Game }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/game/${game.slug}`} className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={game.cover || "/placeholder.svg"}
          alt={game.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">
          {game.size}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">{game.category}</p>
        <h3 className="mt-1 line-clamp-2 font-display text-sm font-bold leading-snug text-foreground">
          <Link href={`/game/${game.slug}`} className="hover:text-primary">
            {game.title}
          </Link>
        </h3>
        <div className="mt-auto pt-3">
          <Link
            href={`/game/${game.slug}`}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-surface-muted py-2 text-xs font-semibold text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <Download className="size-3.5" /> Download
          </Link>
        </div>
      </div>
    </article>
  )
}
