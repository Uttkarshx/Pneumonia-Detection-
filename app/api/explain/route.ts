import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const label = (body?.label as "Pneumonia" | "Normal") || "Normal"
  const confidence = typeof body?.confidence === "number" ? body.confidence : 0.5

  const percent = Math.round(confidence * 100)
  const explanation =
    label === "Pneumonia"
      ? `The model predicts Pneumonia with about ${percent}% confidence. Areas of higher activation likely correspond to regions with increased opacities that can be suggestive of consolidation. This is a preliminary signal and must not be used for clinical decisions.`
      : `The model predicts Normal with about ${percent}% confidence. No dominant activation regions indicative of pneumonia-like opacities were detected. This is a preliminary signal and must not be used for clinical decisions.`

  return NextResponse.json({ explanation })
}
