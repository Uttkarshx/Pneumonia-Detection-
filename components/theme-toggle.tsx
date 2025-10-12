"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    // initialize from localStorage or prefers-color-scheme
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldDark = stored ? stored === "dark" : prefersDark
    setIsDark(shouldDark)
    document.documentElement.classList.toggle("dark", shouldDark)
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggle}
      className="transition-colors bg-transparent"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? "Light" : "Dark"}
    </Button>
  )
}
