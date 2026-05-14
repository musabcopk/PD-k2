"use client"

import { useState, useMemo } from "react"
import { Building2 } from "lucide-react"

export function AssetNAV() {
  const [totalAssets, setTotalAssets] = useState("10000000")
  const [totalLiabilities, setTotalLiabilities] = useState("3000000")
  const [sharesOutstanding, setSharesOutstanding] = useState("100000")
  const [currentPrice, setCurrentPrice] = useState("80")
  const [cashAndEquivalents, setCashAndEquivalents] = useState("1000000")
  const [investments, setInvestments] = useState("2000000")

  const calculations = useMemo(() => {
    const assets = parseFloat(totalAssets) || 0
    const liabilities = parseFloat(totalLiabilities) || 0
    const shares = parseFloat(sharesOutstanding) || 1
    const price = parseFloat(currentPrice) || 0
    const cash = parseFloat(cashAndEquivalents) || 0
    const investmentValue = parseFloat(investments) || 0

    // Net Asset Value = Total Assets - Total Liabilities
    const nav = assets - liabilities

    // NAV per Share
    const navPerShare = nav / shares

    // Premium/Discount to NAV
    const premiumDiscount = navPerShare > 0 ? ((price - navPerShare) / navPerShare) * 100 : 0

    // Book Value (same as NAV)
    const bookValue = nav

    // Book Value per Share
    const bookValuePerShare = bookValue / shares

    // Price to Book (P/B) Ratio
    const pbRatio = bookValuePerShare > 0 ? price / bookValuePerShare : 0

    // Tangible NAV (excluding intangibles - assuming 10% of assets are intangible)
    const tangibleAssets = assets * 0.9
    const tangibleNav = tangibleAssets - liabilities
    const tangibleNavPerShare = tangibleNav / shares

    // Liquid NAV (Cash + Investments - Liabilities)
    const liquidNav = cash + investmentValue - liabilities
    const liquidNavPerShare = shares > 0 ? liquidNav / shares : 0

    // Market Cap
    const marketCap = price * shares

    // Enterprise Value (Market Cap + Debt - Cash)
    const enterpriseValue = marketCap + liabilities - cash

    return {
      nav,
      navPerShare,
      premiumDiscount,
      bookValuePerShare,
      pbRatio,
      tangibleNavPerShare,
      liquidNavPerShare,
      marketCap,
      enterpriseValue,
      isUndervalued: price < navPerShare,
    }
  }, [totalAssets, totalLiabilities, sharesOutstanding, currentPrice, cashAndEquivalents, investments])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary">Asset-Based Valuation (NAV)</h2>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {"NAV = Total Assets - Total Liabilities | NAV/Share = NAV / Shares"}
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Total Assets</label>
          <input
            type="number"
            value={totalAssets}
            onChange={(e) => setTotalAssets(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Total Liabilities</label>
          <input
            type="number"
            value={totalLiabilities}
            onChange={(e) => setTotalLiabilities(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
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
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Current Market Price</label>
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Cash & Equivalents</label>
          <input
            type="number"
            value={cashAndEquivalents}
            onChange={(e) => setCashAndEquivalents(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Investments</label>
          <input
            type="number"
            value={investments}
            onChange={(e) => setInvestments(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3 pt-4 border-t border-border">
        <ResultRow label="Net Asset Value (NAV)" value={`Rs ${calculations.nav.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        <ResultRow label="NAV per Share" value={`Rs ${calculations.navPerShare.toFixed(2)}`} highlight />
        <ResultRow label="Book Value per Share" value={`Rs ${calculations.bookValuePerShare.toFixed(2)}`} />
        
        <div className="border-t border-border pt-3 mt-3">
          <ResultRow label="P/B Ratio" value={calculations.pbRatio.toFixed(2)} status={calculations.pbRatio < 1.5 && calculations.pbRatio > 0} />
          <ResultRow label="Tangible NAV/Share" value={`Rs ${calculations.tangibleNavPerShare.toFixed(2)}`} />
          <ResultRow label="Liquid NAV/Share" value={`Rs ${calculations.liquidNavPerShare.toFixed(2)}`} />
        </div>

        <div className="border-t border-border pt-3 mt-3">
          <ResultRow label="Market Cap" value={`Rs ${calculations.marketCap.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
          <ResultRow label="Enterprise Value" value={`Rs ${calculations.enterpriseValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
          
          <div className="mt-4 p-3 rounded-lg bg-secondary">
            <p className={`text-sm font-medium ${calculations.isUndervalued ? "text-green-400" : "text-destructive"}`}>
              {calculations.isUndervalued 
                ? `Trading at ${Math.abs(calculations.premiumDiscount).toFixed(1)}% discount to NAV` 
                : `Trading at ${Math.abs(calculations.premiumDiscount).toFixed(1)}% premium to NAV`}
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
  status 
}: { 
  label: string
  value: string
  highlight?: boolean
  status?: boolean
}) {
  let valueClass = "text-primary"
  if (highlight) valueClass = "text-primary text-lg font-bold"
  if (status === true) valueClass = "text-green-400"
  if (status === false) valueClass = "text-destructive"

  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`font-mono text-sm ${valueClass}`}>
        {value}
        {status !== undefined && (
          <span className="ml-2 text-xs">{status ? "ATTRACTIVE" : ""}</span>
        )}
      </span>
    </div>
  )
}
