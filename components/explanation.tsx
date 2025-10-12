"use client"

import { Card, CardContent } from "@/components/ui/card"

export function Explanation({ text }: { text: string }) {
  return (
    <Card className="animate-in fade-in-50">
      <CardContent className="p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold">AI Explanation</h2>
        <p className="text-sm text-muted-foreground">Plain-language context for the model’s decision.</p>
        <div className="mt-4 max-h-64 overflow-auto leading-relaxed text-pretty">
          {text ? (
            text
          ) : (
            <p className="text-muted-foreground">Run an analysis to see a generated explanation of the prediction.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
