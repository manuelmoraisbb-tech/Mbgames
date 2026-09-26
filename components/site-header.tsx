"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Gamepad2 } from "lucide-react"
import { SearchBar } from "@/components/search-bar"

const NAV = [
  { label: "Home", href: "/" },
  { label: "PPSSPP Games", href: "/category/ppsspp-games" },
  { label: "Football Games", href: "/category/football-games" },
  { label: "GTA Games", href: "/category/gta-games" },
  { label: "WWE Games", href: "/category/wwe-games" },
  { label: "Blog", href: "/blog" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-navy text-navy-foreground shadow-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-md bg-primary">
            <Gamepad2 className="size-5 text-primary-foreground" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            MB<span className="text-primary">games</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-navy-foreground/80 hover:text-navy-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden w-64 lg:block">
          <SearchBar variant="compact" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-md text-navy-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy px-4 py-4 lg:hidden">
          <div className="mb-4">
            <SearchBar variant="compact" />
          </div>
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-navy-foreground/90 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
