"use client"

export function GradCamOverlay({
  imageSrc,
  overlaySrc,
  opacity = 0.6,
}: {
  imageSrc: string | null
  overlaySrc: string | null
  opacity?: number
}) {
  if (!imageSrc) {
    return <div className="text-sm text-muted-foreground">Upload and analyze an image to see Grad-CAM overlay.</div>
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg animate-in fade-in-50">
      <img src={imageSrc || "/placeholder.svg"} alt="X-ray" className="w-full h-auto block" />
      {overlaySrc && (
        <img
          src={overlaySrc || "/placeholder.svg"}
          alt="Grad-CAM overlay"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-opacity"
          style={{ opacity }}
        />
      )}
    </div>
  )
}
