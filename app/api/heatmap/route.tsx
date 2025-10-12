import { NextResponse } from "next/server"

export async function POST() {
  // Return a simple red radial gradient SVG as a data URL to simulate Grad-CAM overlay
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="none">
  <defs>
    <radialGradient id="g" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="red" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="red" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="red" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
</svg>`.trim()

  const overlayDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`

  return NextResponse.json({ overlayDataUrl })
}
