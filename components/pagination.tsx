import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  page: number
  totalPages: number
  basePath: string
}

function pageHref(basePath: string, page: number) {
  return page === 1 ? basePath : `${basePath}?page=${page}`
}

function visiblePages(page: number, totalPages: number): (number | "gap")[] {
  const pages = new Set([1, totalPages, page - 1, page, page + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)
  const result: (number | "gap")[] = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push("gap")
    result.push(p)
  })
  return result
}

const baseItem =
  "inline-flex size-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors"

export function Pagination({ page, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link
          href={pageHref(basePath, page - 1)}
          aria-label="Previous page"
          className={`${baseItem} border-border bg-surface text-foreground hover:border-primary hover:text-primary`}
        >
          <ChevronLeft className="size-4" />
        </Link>
      ) : null}

      {visiblePages(page, totalPages).map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} className="px-1 text-muted" aria-hidden="true">
            {"…"}
          </span>
        ) : (
          <Link
            key={p}
            href={pageHref(basePath, p)}
            aria-current={p === page ? "page" : undefined}
            className={
              p === page
                ? `${baseItem} border-primary bg-primary text-primary-foreground`
                : `${baseItem} border-border bg-surface text-foreground hover:border-primary hover:text-primary`
            }
          >
            {p}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link
          href={pageHref(basePath, page + 1)}
          aria-label="Next page"
          className={`${baseItem} border-border bg-surface text-foreground hover:border-primary hover:text-primary`}
        >
          <ChevronRight className="size-4" />
        </Link>
      ) : null}
    </nav>
  )
}
