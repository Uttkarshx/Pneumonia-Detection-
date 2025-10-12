"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type Sample = { src: string; label: "Normal" | "Pneumonia" }

const samples: Sample[] = [
  { src: "/chest-x-ray-normal-sample-image.jpg", label: "Normal" },
  { src: "/chest-x-ray-pneumonia-sample-image.jpg", label: "Pneumonia" },
  { src: "/another-chest-x-ray-normal.jpg", label: "Normal" },
  { src: "/another-chest-x-ray-pneumonia.jpg", label: "Pneumonia" },
]

export function Gallery() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + samples.length) % samples.length)
  const next = () => setIndex((i) => (i + 1) % samples.length)

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      <Card className="animate-in fade-in-50">
        <CardContent className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold">Sample X-ray Gallery</h2>
          <p className="text-sm text-muted-foreground">Swipe on mobile or use next/prev.</p>
          <Separator className="my-4" />
          <div className="relative w-full overflow-hidden rounded-lg">
            <img
              src={samples[index].src || "/placeholder.svg"}
              alt={`${samples[index].label} sample X-ray`}
              className="w-full h-auto block"
            />
            <div className="absolute bottom-2 right-2 text-xs bg-background/70 border px-2 py-1 rounded">
              {samples[index].label}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <Button variant="outline" size="sm" onClick={prev}>
              Prev
            </Button>
            <Button variant="outline" size="sm" onClick={next}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-in fade-in-50">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-lg font-medium">Grid View</h3>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-3">
            {samples.map((s, i) => (
              <button
                key={i}
                className="relative rounded-lg overflow-hidden border outline-none focus-visible:ring-2"
                onClick={() => setIndex(i)}
                aria-label={`View ${s.label} sample ${i + 1}`}
              >
                <img src={s.src || "/placeholder.svg"} alt={`${s.label} thumbnail`} className="w-full h-auto block" />
                <span className="absolute bottom-1 left-1 text-[10px] bg-background/70 border px-1.5 py-0.5 rounded">
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
