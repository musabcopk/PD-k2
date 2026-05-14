"use client"

import { useState, useMemo } from "react"
import { DollarSign } from "lucide-react"

export function PEValue() {
  const [eps, setEps] = useState("10")
  const [targetPE, setTargetPE] = useState("15")
  const [currentPrice, setCurrentPrice] = useState("120")
  const [epsGrowth, setEpsGrowth] = useState("10")

  const calculations = useMemo(() => {
    const epsValue = parseFloat(eps) || 0
    const pe = parseFloat(targetPE) || 0
    const price = parseFloat(currentPrice) || 0
    const growth = parseFloat(epsGrowth) / 100 || 0

    // Basic P/E Intrinsic Value
    const intrinsicValue = epsValue * pe

    // Current P/E
    const currentPE = epsValue > 0 ? price / epsValue : 0

    // Discount/Premium to intrinsic value
    const discount = intrinsicValue > 0 ? ((intrinsicValue - price) / intrinsicValue) * 100 : 0

    // PEG Ratio (P/E to Growth)
    const pegRatio = growth > 0 ? currentPE / (growth * 100) : 0

    // Forward EPS (1 year)
    const forwardEPS = epsValue * (1 + growth)
    const forwardPE = forwardEPS > 0 ? price / forwardEPS : 0

    // Fair value based on PEG = 1 (Peter Lynch)
    const pegFairValue = epsValue * (growth * 100)

    // Upside/Downside potential
    const upsidePotential = price > 0 ? ((intrinsicValue - price) / price) * 100 : 0

    return {
      intrinsicValue,
      currentPE,
      discount,
      pegRatio,
      forwardEPS,
      forwardPE,
      pegFairValue,
      upsidePotential,
      isUndervalued: price < intrinsicValue,
    }
  }, [eps, targetPE, currentPrice, epsGrowth])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary">P/E Intrinsic Value</h2>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            Intrinsic Value = EPS (TTM) x Target P/E Ratio
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">EPS (TTM)</label>
          <input
            type="number"
            value={eps}
            onChange={(e) => setEps(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            step="0.01"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Target P/E Ratio</label>
          <input
            type="number"
            value={targetPE}
            onChange={(e) => setTargetPE(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Current Market Price</label>
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            step="0.01"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">EPS Growth Rate (%)</label>
          <input
            type="number"
            value={epsGrowth}
            onChange={(e) => setEpsGrowth(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            step="0.1"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3 pt-4 border-t border-border">
        <ResultRow label="P/E Intrinsic Value" value={`Rs ${calculations.intrinsicValue.toFixed(2)}`} highlight />
        <ResultRow label="Current P/E Ratio" value={calculations.currentPE.toFixed(2)} />
        <ResultRow label="Forward P/E (1 Year)" value={calculations.forwardPE.toFixed(2)} />
        
        <div className="border-t border-border pt-3 mt-3">
          <ResultRow label="Forward EPS" value={`Rs ${calculations.forwardEPS.toFixed(2)}`} />
          <ResultRow label="PEG Ratio" value={calculations.pegRatio.toFixed(2)} status={calculations.pegRatio < 1 && calculations.pegRatio > 0} />
          <ResultRow label="PEG Fair Value (PEG=1)" value={`Rs ${calculations.pegFairValue.toFixed(2)}`} />
        </div>

        <div className="border-t border-border pt-3 mt-3">
          <ResultRow 
            label={calculations.isUndervalued ? "Upside Potential" : "Downside Risk"} 
            value={`${Math.abs(calculations.upsidePotential).toFixed(2)}%`}
            positive={calculations.isUndervalued}
            negative={!calculations.isUndervalued}
          />
          
          <div className="mt-4 p-3 rounded-lg bg-secondary">
            <p className={`text-sm font-medium ${calculations.isUndervalued ? "text-green-400" : "text-destructive"}`}>
              {calculations.isUndervalued 
                ? `Trading at ${Math.abs(calculations.discount).toFixed(1)}% discount to intrinsic value` 
                : `Trading at ${Math.abs(calculations.discount).toFixed(1)}% premium to intrinsic value`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultRow({ 
  label, 
  value, 
  highlight = false, 
  status, 
  positive = false, 
  negative = false 
}: { 
  label: string
  value: string
  highlight?: boolean
  status?: boolean
  positive?: boolean
  negative?: boolean
}) {
  let valueClass = "text-primary"
  if (highlight) valueClass = "text-primary text-lg font-bold"
  if (status === true) valueClass = "text-green-400"
  if (status === false) valueClass = "text-destructive"
  if (positive) valueClass = "text-green-400"
  if (negative) valueClass = "text-destructive"

  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`font-mono text-sm ${valueClass}`}>
        {value}
        {status !== undefined && status && (
          <span className="ml-2 text-xs">ATTRACTIVE</span>
        )}
      </span>
    </div>
  )
}
