"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"

export function SearchBar({
  defaultValue = "",
  variant = "block",
}: {
  defaultValue?: string
  variant?: "block" | "compact"
}) {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const q = value.trim()
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search")
  }

  if (variant === "compact") {
    return (
      <form onSubmit={submit} className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search games..."
          aria-label="Search games"
          className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </form>
    )
  }

  return (
    <form onSubmit={submit} className="flex w-full items-stretch gap-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for a game, e.g. God of War, PES, Tekken..."
          aria-label="Search games"
          className="w-full rounded-lg border border-border bg-surface py-3.5 pl-11 pr-4 text-base text-foreground shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"
      >
        Search
      </button>
    </form>
  )
}
