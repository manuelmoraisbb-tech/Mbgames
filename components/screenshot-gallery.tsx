"use client"

import Image from "next/image"
import { useState } from "react"

export function ScreenshotGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  if (!images.length) return null

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-card border border-border bg-surface-muted">
        <Image
          src={images[active] || "/placeholder.svg"}
          alt={`${title} screenshot ${active + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View screenshot ${i + 1}`}
              className={`relative aspect-video overflow-hidden rounded-md border-2 transition-colors ${
                i === active ? "border-primary" : "border-border hover:border-primary/50"
              }`}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
