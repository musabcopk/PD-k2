"use client"

import { useState, useMemo } from "react"
import { Percent } from "lucide-react"

export function DividendProjector() {
  const [investmentAmount, setInvestmentAmount] = useState("100000")
  const [dividendYield, setDividendYield] = useState("5")
  const [dividendGrowth, setDividendGrowth] = useState("10")
  const [reinvestDividends, setReinvestDividends] = useState(true)
  const [years, setYears] = useState("5")

  const calculations = useMemo(() => {
    const investment = parseFloat(investmentAmount) || 0
    const yieldRate = parseFloat(dividendYield) / 100 || 0
    const growthRate = parseFloat(dividendGrowth) / 100 || 0
    const period = parseInt(years) || 5

    const projections: { year: number; dividend: number; totalValue: number; cumulativeDividends: number }[] = []
    
    let currentValue = investment
    let currentYield = yieldRate
    let cumulativeDividends = 0
    let totalDividendsReceived = 0

    for (let year = 1; year <= period; year++) {
      const annualDividend = currentValue * currentYield
      cumulativeDividends += annualDividend
      totalDividendsReceived += annualDividend

      if (reinvestDividends) {
        currentValue += annualDividend
      }

      projections.push({
        year,
        dividend: annualDividend,
        totalValue: currentValue,
        cumulativeDividends,
      })

      // Increase yield by growth rate for next year
      currentYield = yieldRate * Math.pow(1 + growthRate, year)
    }

    const firstYearDividend = investment * yieldRate
    const quarterlyDividend = firstYearDividend / 4
    const monthlyDividend = firstYearDividend / 12
    const finalValue = projections[projections.length - 1]?.totalValue || investment
    const finalYearDividend = projections[projections.length - 1]?.dividend || 0

    return {
      firstYearDividend,
      quarterlyDividend,
      monthlyDividend,
      finalValue,
      finalYearDividend,
      totalDividendsReceived,
      yieldOnCost: investment > 0 ? (finalYearDividend / investment) * 100 : 0,
      projections,
    }
  }, [investmentAmount, dividendYield, dividendGrowth, reinvestDividends, years])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Percent className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary">Dividend Income Projector</h2>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            Build passive income on PSX with dividend reinvestment
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Investment Amount (PKR)</label>
          <input
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Dividend Yield (%)</label>
          <input
            type="number"
            value={dividendYield}
            onChange={(e) => setDividendYield(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Dividend Growth Rate (%)</label>
          <input
            type="number"
            value={dividendGrowth}
            onChange={(e) => setDividendGrowth(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Investment Horizon (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            min="1"
            max="30"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm text-muted-foreground">Reinvest Dividends?</label>
          <div className="flex gap-2">
            <button
              onClick={() => setReinvestDividends(true)}
              className={`flex-1 h-11 rounded-lg font-medium transition-all ${
                reinvestDividends
                  ? "bg-primary text-primary-foreground"
                  : "bg-input border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Yes (DRIP)
            </button>
            <button
              onClick={() => setReinvestDividends(false)}
              className={`flex-1 h-11 rounded-lg font-medium transition-all ${
                !reinvestDividends
                  ? "bg-primary text-primary-foreground"
                  : "bg-input border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              No (Cash Out)
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3 pt-4 border-t border-border">
        <ResultRow label="Year 1 Annual Dividend" value={`Rs ${calculations.firstYearDividend.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Year 1 Quarterly Dividend" value={`Rs ${calculations.quarterlyDividend.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Year 1 Monthly Dividend" value={`Rs ${calculations.monthlyDividend.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        <div className="border-t border-border pt-3 mt-3">
          <ResultRow label={`Year ${years} Annual Dividend`} value={`Rs ${calculations.finalYearDividend.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
          <ResultRow label="Total Dividends Received" value={`Rs ${calculations.totalDividendsReceived.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
          <ResultRow label={`Portfolio Value (Year ${years})`} value={`Rs ${calculations.finalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} highlight />
          <ResultRow label="Yield on Cost" value={`${calculations.yieldOnCost.toFixed(2)}%`} />
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
