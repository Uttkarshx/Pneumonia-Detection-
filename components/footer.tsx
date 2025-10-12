"use client"

export function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="container mx-auto px-4 py-6 md:py-8 grid gap-4 md:grid-cols-3">
        <div>
          <h4 className="font-semibold">Disclaimer</h4>
          <p className="text-sm text-muted-foreground">This AI is for research/demo only. Not for clinical use.</p>
        </div>
        <div>
          <h4 className="font-semibold">References</h4>
          <ul className="text-sm text-muted-foreground list-disc pl-5">
            <li>Dataset: Public chest X-ray datasets (e.g., NIH ChestX-ray14)</li>
            <li>
              GitHub Repo:{" "}
              <a className="underline underline-offset-4" href="#" onClick={(e) => e.preventDefault()}>
                Add link
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Team</h4>
          <p className="text-sm text-muted-foreground">TEAM DECTECTIFIERS </p>
        </div>
      </div>
    </footer>
  )
}
