"use client"

import { useRef, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageUploader } from "@/components/image-uploader"
import { Prediction } from "@/components/prediction"
import { GradCamOverlay } from "@/components/gradcam-overlay"
import { Explanation } from "@/components/explanation"
import { Gallery } from "@/components/gallery"
import { Metrics } from "@/components/metrics"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

export default function HomePage() {
  const explainRef = useRef<HTMLDivElement>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [overlaySrc, setOverlaySrc] = useState<string | null>(null)
  const [opacity, setOpacity] = useState<number>(0.6)
  const [prediction, setPrediction] = useState<{ label: "Pneumonia" | "Normal"; confidence: number } | null>(null)
  const [explanation, setExplanation] = useState<string>("")

  const handleAnalyzed = async (payload: {
    imageDataUrl: string
    prediction: { label: "Pneumonia" | "Normal"; confidence: number }
    overlayDataUrl: string
    explanation: string
  }) => {
    setImageSrc(payload.imageDataUrl)
    setPrediction(payload.prediction)
    setOverlaySrc(payload.overlayDataUrl)
    setExplanation(payload.explanation)

    // Smoothly scroll to explanation after results are ready
    requestAnimationFrame(() => {
      explainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section id="upload" className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <ImageUploader onAnalyzed={handleAnalyzed} />
          <div className="space-y-6">
            <Card className="animate-in fade-in-50">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-semibold text-pretty">Prediction Output</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Output transitions smoothly with confidence visualization.
                </p>
                <Separator className="my-4" />
                <Prediction prediction={prediction} />
              </CardContent>
            </Card>

            <Card className="animate-in fade-in-50">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl md:text-2xl font-semibold">Grad-CAM Overlay</h2>
                  <div className="flex items-center gap-3 w-48">
                    <Label htmlFor="opacity" className="whitespace-nowrap text-sm">
                      Opacity
                    </Label>
                    <Slider
                      id="opacity"
                      value={[Math.round(opacity * 100)]}
                      onValueChange={(v) => setOpacity((v[0] ?? 60) / 100)}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>
                </div>
                <Separator className="my-4" />
                <GradCamOverlay imageSrc={imageSrc} overlaySrc={overlaySrc} opacity={opacity} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="explanation" ref={explainRef} className="container mx-auto px-4 py-8 md:py-12">
        <Explanation text={explanation} />
      </section>

      <section id="gallery" className="container mx-auto px-4 py-8 md:py-12">
        <Gallery />
      </section>

      <section id="metrics" className="container mx-auto px-4 py-8 md:py-12">
        <Metrics />
      </section>

      <Footer />
    </main>
  )
}
