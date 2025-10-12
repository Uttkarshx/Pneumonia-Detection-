"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import Image from "next/image" // Import the Image component from Next.js

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Replaced the span with an Image component */}
          <Image
            src="Pneumonia.png" // <--- IMPORTANT: Update this path to your actual logo file
            alt="AI-Based Pneumonia Detection Logo"
            width={32} // Set the desired width (h-8 means 32px)
            height={32} // Set the desired height (w-8 means 32px)
            className="rounded-md" // Added rounded corners if your logo needs them
          />
          <div>
            <h1 className="text-sm md:text-base font-semibold">AI-Based Pneumonia Detection</h1>
            <p className="text-[11px] md:text-xs text-muted-foreground">
              Preliminary AI-based detection. Not a clinical diagnosis.
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <NavLink href="#upload" label="Upload" />
          <NavLink href="#gallery" label="Samples" />
          <NavLink href="#metrics" label="Metrics" />
          <NavLink href="#explanation" label="Explanation" />
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Link href="#upload" className="text-sm underline underline-offset-4">
            Start
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Button asChild variant="ghost" className="text-sm">
      <Link href={href}>{label}</Link>
    </Button>
  )
}