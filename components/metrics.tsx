"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts"

const aucData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.05, tpr: 0.35 },
  { fpr: 0.1, tpr: 0.6 },
  { fpr: 0.2, tpr: 0.78 },
  { fpr: 0.3, tpr: 0.86 },
  { fpr: 0.5, tpr: 0.93 },
  { fpr: 1, tpr: 1 },
]

export function Metrics() {
  // Example placeholder metrics
  const accuracy = 0.92
  const sensitivity = 0.9
  const specificity = 0.93
  const f1 = 0.91

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Accuracy" value={accuracy} />
        <MetricCard label="Sensitivity" value={sensitivity} />
        <MetricCard label="Specificity" value={specificity} />
        <MetricCard label="F1-Score" value={f1} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="animate-in fade-in-50">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-lg font-medium">Confusion Matrix</h3>
            <p className="text-sm text-muted-foreground">Counts are illustrative.</p>
            <Separator className="my-4" />
            <ConfusionMatrix tp={92} tn={93} fp={7} fn={8} />
          </CardContent>
        </Card>

        <Card className="animate-in fade-in-50">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-lg font-medium">ROC Curve (AUC ~ 0.95)</h3>
            <Separator className="my-4" />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={aucData} margin={{ left: 4, right: 8, top: 8, bottom: 4 }}>
                  <CartesianGrid stroke="var(--color-muted)" strokeDasharray="3 3" />
                  <XAxis dataKey="fpr" type="number" domain={[0, 1]} tick={{ fill: "var(--color-muted-foreground)" }} />
                  <YAxis dataKey="tpr" type="number" domain={[0, 1]} tick={{ fill: "var(--color-muted-foreground)" }} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-popover-foreground)",
                    }}
                  />
                  <Line type="monotone" dataKey="tpr" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="animate-in fade-in-50">
      <CardContent className="p-4 md:p-6">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-2xl font-semibold mt-1">{Math.round(value * 100)}%</div>
        <div className="mt-2 h-2 rounded bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-[width] duration-700"
            style={{ width: `${Math.round(value * 100)}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function ConfusionMatrix({ tp, tn, fp, fn }: { tp: number; tn: number; fp: number; fn: number }) {
  return (
    <div className="grid grid-cols-3 gap-px rounded-lg overflow-hidden border">
      {/* Header Row */}
      <Cell label=" " value="" header />
      <Cell label="Pred Normal" value="" header />
      <Cell label="Pred Pneumonia" value="" header />

      {/* Actual Normal Row */}
      <Cell label="Actual Normal" value="" header />
      <Cell label="" value={tn.toString()} emphasized />
      <Cell label="" value={fp.toString()} />

      {/* Actual Pneumonia Row */}
      <Cell label="Actual Pneumonia" value="" header />
      <Cell label="" value={fn.toString()} />
      <Cell label="" value={tp.toString()} emphasized />
    </div>
  )
}

function Cell({
  label,
  value,
  header,
  emphasized,
}: {
  label: string
  value: string
  header?: boolean
  emphasized?: boolean
}) {
  return (
    <div
      className={[
        "p-3 flex items-center justify-center text-sm",
        header ? "bg-muted text-muted-foreground font-medium" : "bg-card",
        emphasized ? "outline outline-2 outline-ring/40" : "",
      ].join(" ")}
      aria-label={label?.trim() || undefined}
    >
      {value || label}
    </div>
  )
}