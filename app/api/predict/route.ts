import { NextResponse } from "next/server"

export async function POST(req: Request) {
  // Read file for a deterministic-ish mock based on size/name
  const form = await req.formData()
  const file = form.get("file") as File | null

  let hash = 0
  if (file) {
    const name = file.name || "sample"
    for (let i = 0; i < name.length; i++) {
      hash = (hash * 31 + name.charCodeAt(i)) >>> 0
    }
    hash = (hash + (file.size ?? 0)) >>> 0
  }

  // Map hash to pseudo probabilities
  const confidence = ((hash % 100) / 100) * 0.5 + 0.45 // 0.45 - 0.95
  const label = hash % 2 === 0 ? "Pneumonia" : "Normal"

  return NextResponse.json({ label, confidence })
}
