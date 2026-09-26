import Link from "next/link"
import { Gamepad2 } from "lucide-react"

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Gamepad2 className="size-8" />
      </span>
      <h1 className="mt-6 font-display text-4xl font-bold text-foreground">404</h1>
      <p className="mt-2 text-lg font-semibold text-foreground">Game Over</p>
      <p className="mt-2 max-w-md text-pretty text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        Back to Home
      </Link>
    </div>
  )
}
