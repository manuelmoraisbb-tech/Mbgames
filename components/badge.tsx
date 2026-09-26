import Link from "next/link"
import { categoryToSlug } from "@/lib/games"

const badgeClass =
  "inline-flex items-center rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground transition-colors"

/**
 * Category badge. Renders as a plain span by default so it can be safely nested
 * inside a card-level <Link> (nested anchors are invalid HTML and break hydration).
 * Pass `asLink` only when the badge is NOT already inside another link.
 */
export function CategoryBadge({
  category,
  href,
  asLink = false,
}: {
  category: string
  href?: string
  asLink?: boolean
}) {
  if (!asLink) {
    return <span className={badgeClass}>{category}</span>
  }

  const target = href ?? `/category/${categoryToSlug(category)}`
  return (
    <Link href={target} className={`${badgeClass} hover:bg-primary-hover`}>
      {category}
    </Link>
  )
}
