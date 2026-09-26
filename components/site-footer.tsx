import Link from "next/link"
import { Gamepad2 } from "lucide-react"

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
]

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-navy text-navy-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary">
              <Gamepad2 className="size-5 text-primary-foreground" />
            </span>
            <div>
              <p className="font-display text-lg font-bold">
                MB<span className="text-primary">games</span>
              </p>
              <p className="text-xs text-navy-foreground/60">Highly compressed PSP games for PPSSPP</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Footer navigation">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-navy-foreground/70 hover:text-primary">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-navy-foreground/50">
          <p>&copy; {new Date().getFullYear()} MBgames. All rights reserved. All games are property of their respective owners.</p>
        </div>
      </div>
    </footer>
  )
}
