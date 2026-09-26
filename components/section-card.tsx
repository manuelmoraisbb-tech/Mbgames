import Link from "next/link"

export function SectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-card border border-border bg-surface p-5 shadow-sm">
      <h2 className="relative mb-5 pb-3 font-display text-base font-bold text-foreground">
        {title}
        <span className="absolute bottom-0 left-0 h-0.5 w-10 rounded-full bg-primary" />
      </h2>
      {children}
    </section>
  )
}

export function SectionHeading({
  title,
  moreHref,
}: {
  title: string
  moreHref?: string
}) {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
      <h2 className="relative font-display text-xl font-bold text-foreground">
        {title}
        <span className="absolute -bottom-3 left-0 h-0.5 w-12 rounded-full bg-primary" />
      </h2>
      {moreHref && (
        <Link href={moreHref} className="text-sm font-medium text-primary hover:underline">
          Show more
        </Link>
      )}
    </div>
  )
}
