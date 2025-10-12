"use client"

import type React from "react"

import { useCallback, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type PredictionResult = { label: "Pneumonia" | "Normal"; confidence: number }

export function ImageUploader({
  onAnalyzed,
}: {
  onAnalyzed: (payload: {
    imageDataUrl: string
    prediction: PredictionResult
    overlayDataUrl: string
    explanation: string
  }) => void
}) {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  const isImage = useMemo(() => !!file && /image\/(jpeg|png)/.test(file.type), [file])

  const onFile = useCallback((f: File | null) => {
    if (!f) return
    if (!/image\/(jpeg|png)/.test(f.type)) {
      alert("Please upload a .jpg or .png image.")
      return
    }
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreview(url)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragOver(false)
      const f = e.dataTransfer.files?.[0]
      if (f) onFile(f)
    },
    [onFile],
  )

  const handleBrowse = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0] || null
      if (f) onFile(f)
    },
    [onFile],
  )

  const analyze = useCallback(async () => {
    if (!file || !preview) return
    try {
      setLoading(true)
      const form = new FormData()
      form.append("file", file)

      const [predRes, heatRes] = await Promise.all([
        fetch("/api/predict", { method: "POST", body: form }),
        fetch("/api/heatmap", { method: "POST", body: form }),
      ])
      const prediction: PredictionResult = await predRes.json()
      const { overlayDataUrl } = await heatRes.json()

      const expRes = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prediction),
      })
      const { explanation } = await expRes.json()

      onAnalyzed({
        imageDataUrl: preview,
        prediction,
        overlayDataUrl,
        explanation,
      })
    } catch (err) {
      console.error("[v0] analyze error:", err)
      alert("Something went wrong analyzing the image. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [file, onAnalyzed, preview])

  return (
    <Card className="animate-in fade-in-50">
      <CardContent className="p-4 md:p-6 space-y-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">Upload Chest X-Ray</h2>
          <p className="text-sm text-muted-foreground">Accepts .jpg or .png. Drag & drop supported.</p>
        </div>

        <div
          ref={dropRef}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 transition-colors",
            dragOver ? "border-primary bg-accent/40" : "border-border",
          )}
          aria-label="Image dropzone"
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="h-16 w-16 rounded-md bg-secondary" aria-hidden />
            <p className="text-center text-sm">Drag and drop your X-ray image here, or browse to select.</p>
            <div className="flex items-center gap-3">
              <Label htmlFor="file" className="sr-only">
                Browse file
              </Label>
              <Input id="file" type="file" accept=".jpg,.jpeg,.png" onChange={handleBrowse} />
              <Button onClick={analyze} disabled={!isImage || loading}>
                {loading ? "Analyzing…" : "Analyze"}
              </Button>
            </div>
          </div>

          {preview && (
            <div className="mt-4 animate-in fade-in-50">
              <img
                src={preview || "/placeholder.svg"}
                alt="Uploaded X-ray preview"
                className="w-full h-auto rounded-md"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
