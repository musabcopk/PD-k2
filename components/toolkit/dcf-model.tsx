"use client"

import { useState, useMemo } from "react"
import { LineChart } from "lucide-react"

export function DCFModel() {
  const [freeCashFlow, setFreeCashFlow] = useState("1000000")
  const [growthRate, setGrowthRate] = useState("15")
  const [discountRate, setDiscountRate] = useState("12")
  const [terminalGrowth, setTerminalGrowth] = useState("3")
  const [projectionYears, setProjectionYears] = useState("5")
  const [sharesOutstanding, setSharesOutstanding] = useState("100000")

  const calculations = useMemo(() => {
    const fcf = parseFloat(freeCashFlow) || 0
    const g = parseFloat(growthRate) / 100 || 0
    const r = parseFloat(discountRate) / 100 || 0
    const tg = parseFloat(terminalGrowth) / 100 || 0
    const years = parseInt(projectionYears) || 5
    const shares = parseFloat(sharesOutstanding) || 1

    // Project FCF and calculate PV for each year
    const projections: { year: number; fcf: number; pv: number }[] = []
    let pvSum = 0

    for (let year = 1; year <= years; year++) {
      const projectedFCF = fcf * Math.pow(1 + g, year)
      const pv = projectedFCF / Math.pow(1 + r, year)
      pvSum += pv
      projections.push({ year, fcf: projectedFCF, pv })
    }

    // Terminal Value using Gordon Growth Model
    // TV = FCF(n+1) / (r - tg)
    const finalYearFCF = fcf * Math.pow(1 + g, years)
    const terminalFCF = finalYearFCF * (1 + tg)
    const terminalValue = r > tg ? terminalFCF / (r - tg) : 0
    const pvTerminalValue = terminalValue / Math.pow(1 + r, years)

    // Enterprise Value = PV of projected FCFs + PV of Terminal Value
    const enterpriseValue = pvSum + pvTerminalValue
    
    // Intrinsic Value per Share
    const intrinsicValue = enterpriseValue / shares

    return {
      projections,
      pvOfFCFs: pvSum,
      terminalValue,
      pvTerminalValue,
      enterpriseValue,
      intrinsicValue,
      finalYearFCF,
    }
  }, [freeCashFlow, growthRate, discountRate, terminalGrowth, projectionYears, sharesOutstanding])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <LineChart className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary">Discounted Cash Flow Model</h2>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {"DCF: PV = Sum[FCF(1+g)^t / (1+r)^t] + TV / (1+r)^n"}
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Current Free Cash Flow</label>
          <input
            type="number"
            value={freeCashFlow}
            onChange={(e) => setFreeCashFlow(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Growth Rate (%)</label>
          <input
            type="number"
            value={growthRate}
            onChange={(e) => setGrowthRate(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Discount Rate (%)</label>
          <input
            type="number"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Terminal Growth Rate (%)</label>
          <input
            type="number"
            value={terminalGrowth}
            onChange={(e) => setTerminalGrowth(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Projection Years</label>
          <input
            type="number"
            value={projectionYears}
            onChange={(e) => setProjectionYears(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            min="1"
            max="10"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Shares Outstanding</label>
          <input
            type="number"
            value={sharesOutstanding}
            onChange={(e) => setSharesOutstanding(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3 pt-4 border-t border-border">
        <ResultRow label="PV of Projected Cash Flows" value={`Rs ${calculations.pvOfFCFs.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Terminal Value" value={`Rs ${calculations.terminalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        <ResultRow label="PV of Terminal Value" value={`Rs ${calculations.pvTerminalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        <div className="border-t border-border pt-3 mt-3">
          <ResultRow label="Enterprise Value" value={`Rs ${calculations.enterpriseValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
          <ResultRow label="Intrinsic Value per Share" value={`Rs ${calculations.intrinsicValue.toFixed(2)}`} highlight />
        </div>
      </div>
    </div>
  )
}

function ResultRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`font-mono text-sm ${highlight ? "text-primary text-lg font-bold" : "text-primary"}`}>
        {value}
      </span>
    </div>
  )
}
