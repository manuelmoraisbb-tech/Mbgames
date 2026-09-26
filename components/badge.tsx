import Link from "next/link"
import { categoryToSlug } from "@/lib/games"

export function CategoryBadge({ category, href }: { category: string; href?: string }) {
  const target = href ?? `/category/${categoryToSlug(category)}`
  return (
    <Link
      href={target}
      className="inline-flex items-center rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary-hover"
    >
      {category}
    </Link>
  )
}
