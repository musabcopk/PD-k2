"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"

export function GrahamScreener() {
  const [eps, setEps] = useState("10")
  const [bookValue, setBookValue] = useState("50")
  const [currentPrice, setCurrentPrice] = useState("80")

  const calculations = useMemo(() => {
    const epsValue = parseFloat(eps) || 0
    const bv = parseFloat(bookValue) || 0
    const price = parseFloat(currentPrice) || 0

    // Graham Intrinsic Value = sqrt(22.5 * EPS * Book Value)
    // The 22.5 comes from Graham's criteria: P/E of 15 and P/B of 1.5 (15 * 1.5 = 22.5)
    const grahamValue = Math.sqrt(22.5 * epsValue * bv)
    
    // Graham Number with margin of safety (66.67% of intrinsic value)
    const marginOfSafety = grahamValue * 0.6667
    
    // How far is market from truth
    const discount = price > 0 ? ((grahamValue - price) / grahamValue) * 100 : 0
    const premium = price > 0 ? ((price - grahamValue) / grahamValue) * 100 : 0
    
    // P/E and P/B ratios
    const peRatio = epsValue > 0 ? price / epsValue : 0
    const pbRatio = bv > 0 ? price / bv : 0
    
    // Graham criteria check (P/E < 15, P/B < 1.5, P/E * P/B < 22.5)
    const peGrahamOk = peRatio > 0 && peRatio < 15
    const pbGrahamOk = pbRatio > 0 && pbRatio < 1.5
    const productOk = peRatio * pbRatio < 22.5
    
    const isUndervalued = price < grahamValue
    const isBargain = price < marginOfSafety

    return {
      grahamValue,
      marginOfSafety,
      discount,
      premium,
      peRatio,
      pbRatio,
      peGrahamOk,
      pbGrahamOk,
      productOk,
      isUndervalued,
      isBargain,
    }
  }, [eps, bookValue, currentPrice])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Search className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary">Graham Value Screener</h2>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {"Graham IV = sqrt(22.5 x EPS x Book Value)"}
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          <label className="text-sm text-muted-foreground">Book Value per Share</label>
          <input
            type="number"
            value={bookValue}
            onChange={(e) => setBookValue(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            step="0.01"
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
      </div>

      {/* Results */}
      <div className="space-y-3 pt-4 border-t border-border">
        <ResultRow label="Graham Intrinsic Value" value={`Rs ${calculations.grahamValue.toFixed(2)}`} highlight />
        <ResultRow label="Margin of Safety Price (33%)" value={`Rs ${calculations.marginOfSafety.toFixed(2)}`} />
        
        <div className="border-t border-border pt-3 mt-3">
          <ResultRow label="P/E Ratio" value={calculations.peRatio.toFixed(2)} status={calculations.peGrahamOk} />
          <ResultRow label="P/B Ratio" value={calculations.pbRatio.toFixed(2)} status={calculations.pbGrahamOk} />
          <ResultRow label="P/E x P/B" value={(calculations.peRatio * calculations.pbRatio).toFixed(2)} status={calculations.productOk} />
        </div>

        <div className="border-t border-border pt-3 mt-3">
          {calculations.isUndervalued ? (
            <ResultRow 
              label="Discount to Intrinsic Value" 
              value={`${calculations.discount.toFixed(2)}%`} 
              positive
            />
          ) : (
            <ResultRow 
              label="Premium to Intrinsic Value" 
              value={`${calculations.premium.toFixed(2)}%`} 
              negative
            />
          )}
          
          <div className="mt-4 p-3 rounded-lg bg-secondary">
            <p className={`text-sm font-medium ${calculations.isBargain ? "text-green-400" : calculations.isUndervalued ? "text-yellow-400" : "text-destructive"}`}>
              {calculations.isBargain 
                ? "Bargain Territory - Below Margin of Safety" 
                : calculations.isUndervalued 
                  ? "Undervalued - Below Intrinsic Value"
                  : "Overvalued - Above Intrinsic Value"}
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
        {status !== undefined && (
          <span className="ml-2">{status ? "PASS" : "FAIL"}</span>
        )}
      </span>
    </div>
  )
}
