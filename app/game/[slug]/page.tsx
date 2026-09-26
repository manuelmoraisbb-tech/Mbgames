import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { HardDrive, Gamepad2, Languages, Cpu, Tag, ChevronRight } from "lucide-react"
import { getAllGames, getGameBySlug, getRelatedGames, categoryToSlug } from "@/lib/games"
import { DownloadButton } from "@/components/download-button"
import { ScreenshotGallery } from "@/components/screenshot-gallery"
import { Sidebar } from "@/components/sidebar"
import { SectionHeading } from "@/components/section-card"
import { GameGridCard } from "@/components/game-cards"
import { CategoryBadge } from "@/components/badge"

export function generateStaticParams() {
  return getAllGames().map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const game = getGameBySlug(slug)
  if (!game) return { title: "Game not found" }
  return {
    title: `[${game.size}] ${game.title} Highly Compressed`,
    description: game.description[0],
    openGraph: {
      title: `${game.title} - Highly Compressed for PPSSPP`,
      description: game.description[0],
      images: game.cover.startsWith("http") ? [game.cover] : undefined,
    },
  }
}

const META_ROWS = (game: ReturnType<typeof getGameBySlug>) =>
  game
    ? [
        { icon: HardDrive, label: "Size", value: game.size },
        { icon: Gamepad2, label: "Platform", value: game.platform },
        { icon: Cpu, label: "Emulator", value: game.emulator },
        { icon: Tag, label: "Genre", value: game.genre },
        { icon: Languages, label: "Language", value: game.language },
      ]
    : []

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const game = getGameBySlug(slug)
  if (!game) notFound()

  const related = getRelatedGames(slug, 3)

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
      <article className="min-w-0">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="size-4" />
          <Link href={`/category/${categoryToSlug(game.category)}`} className="hover:text-primary">
            {game.category}
          </Link>
          <ChevronRight className="size-4" />
          <span className="truncate text-foreground">{game.title}</span>
        </nav>

        <div className="mb-3">
          <CategoryBadge category={game.category} asLink />
        </div>
        <h1 className="font-display text-2xl font-bold leading-tight text-foreground text-balance sm:text-3xl">
          <span className="text-primary">[{game.size}]</span> {game.title} Highly Compressed
        </h1>

        {/* Cover + meta */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-[200px_1fr]">
          <div className="relative mx-auto aspect-[3/4] w-44 shrink-0 overflow-hidden rounded-card border border-border shadow-sm sm:mx-0 sm:w-full">
            <Image
              src={game.cover || "/placeholder.svg"}
              alt={game.title}
              fill
              sizes="200px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-between gap-5">
            <dl className="divide-y divide-border overflow-hidden rounded-card border border-border bg-surface">
              {META_ROWS(game).map((row) => (
                <div key={row.label} className="flex items-center gap-3 px-4 py-2.5">
                  <row.icon className="size-4 shrink-0 text-primary" />
                  <dt className="w-24 shrink-0 text-sm font-medium text-muted">{row.label}</dt>
                  <dd className="text-sm font-semibold text-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
            <DownloadButton url={game.downloadUrl} size={game.size} />
          </div>
        </div>

        {/* Screenshots */}
        {game.screenshots.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 font-display text-xl font-bold text-foreground">Screenshots</h2>
            <ScreenshotGallery images={game.screenshots} title={game.title} />
          </section>
        )}

        {/* Description */}
        <section className="mt-10">
          <h2 className="mb-4 font-display text-xl font-bold text-foreground">About {game.title}</h2>
          <div className="flex flex-col gap-4 text-pretty leading-relaxed text-foreground/90">
            {game.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* How to install */}
        <section className="mt-10 rounded-card border border-border bg-surface p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-foreground">How to Download &amp; Install</h2>
          <ol className="flex flex-col gap-3 text-sm leading-relaxed text-foreground/90">
            {[
              "Click the Download Now button above to open the download link.",
              "Wait for the file to finish downloading to your device.",
              `Extract the downloaded file using ZArchiver or 7-Zip (${game.size}).`,
              "Open the PPSSPP emulator and locate the extracted ISO/CSO file.",
              "Tap the game to start playing. Enjoy!",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Download CTA */}
        <div className="mt-8 flex flex-col items-center gap-3 rounded-card border border-border bg-navy p-6 text-center">
          <p className="font-display text-lg font-bold text-navy-foreground text-balance">
            Ready to play {game.title}?
          </p>
          <DownloadButton url={game.downloadUrl} size={game.size} />
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <SectionHeading title="Related Games" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {related.map((g) => (
                <GameGridCard key={g.slug} game={g} />
              ))}
            </div>
          </section>
        )}
      </article>

      <Sidebar />
    </div>
  )
}
