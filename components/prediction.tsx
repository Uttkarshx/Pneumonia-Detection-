"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function Prediction({
  prediction,
}: {
  prediction: { label: "Pneumonia" | "Normal"; confidence: number } | null
}) {
  const { pneu, normal, label, conf } = useMemo(() => {
    if (!prediction) return { pneu: 0, normal: 0, label: "—", conf: 0 }
    const p = prediction.label === "Pneumonia" ? prediction.confidence : 1 - prediction.confidence
    const n = 1 - p
    return {
      pneu: p,
      normal: n,
      label: prediction.label,
      conf: prediction.confidence,
    }
  }, [prediction])

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">Predicted</span>
        <span className="text-base font-medium">
          {label}
          {label !== "—" ? ` (${Math.round(conf * 100)}%)` : ""}
        </span>
      </div>

      <BarRow name="Pneumonia" value={pneu} intent="danger" />
      <BarRow name="Normal" value={normal} intent="ok" />

      {!prediction && (
        <Card className="p-3 text-sm text-muted-foreground">Upload an image and click Analyze to see predictions.</Card>
      )}
    </div>
  )
}

function BarRow({ name, value, intent }: { name: string; value: number; intent: "danger" | "ok" }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span>{name}</span>
        <span className="tabular-nums">{Math.round(value * 100)}%</span>
      </div>
      <div className="h-3 rounded bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full transition-[width] duration-700 will-change-[width]",
            intent === "danger" ? "bg-destructive" : "bg-chart-2",
          )}
          style={{ width: `${Math.max(0, Math.min(100, Math.round(value * 100)))}%` }}
        />
      </div>
    </div>
  )
}
