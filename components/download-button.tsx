"use client"

import { Download } from "lucide-react"

export function DownloadButton({ url, size }: { url: string; size: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover sm:w-auto"
    >
      <Download className="size-5 transition-transform group-hover:translate-y-0.5" />
      Download Now
      <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-semibold">{size}</span>
    </a>
  )
}
