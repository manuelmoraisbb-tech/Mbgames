import type { Metadata } from "next"
import { Mail, MessageCircle } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { SectionHeading } from "@/components/section-card"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the MB Games team.",
}

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0">
        <SectionHeading title="Contact Us" />
        <p className="mb-6 text-pretty leading-relaxed text-foreground/90">
          Have a request for a game, found a broken link, or want to report an issue? Reach out and we&apos;ll get back
          to you as soon as we can.
        </p>
        <div className="flex flex-col gap-4">
          <a
            href="mailto:contact@mbgames.com"
            className="flex items-center gap-4 rounded-card border border-border bg-surface p-5 transition-colors hover:border-primary"
          >
            <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mail className="size-5" />
            </span>
            <span>
              <span className="block font-semibold text-foreground">Email</span>
              <span className="text-sm text-muted">contact@mbgames.com</span>
            </span>
          </a>
          <div className="flex items-center gap-4 rounded-card border border-border bg-surface p-5">
            <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MessageCircle className="size-5" />
            </span>
            <span>
              <span className="block font-semibold text-foreground">Community</span>
              <span className="text-sm text-muted">Join our channel for updates on new game drops.</span>
            </span>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}
