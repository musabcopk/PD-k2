"use client"

import { useState, useMemo } from "react"
import { TrendingDown } from "lucide-react"

export function DCAPlanner() {
  const [totalCapital, setTotalCapital] = useState("100000")
  const [weeklyAmount, setWeeklyAmount] = useState("15000")
  const [annualReturn, setAnnualReturn] = useState("25")
  const [targetPrice, setTargetPrice] = useState("100")

  const calculations = useMemo(() => {
    const capital = parseFloat(totalCapital) || 0
    const weekly = parseFloat(weeklyAmount) || 0
    const returnRate = parseFloat(annualReturn) || 0
    const price = parseFloat(targetPrice) || 1

    // Calculate deployment schedule
    const weeksToFullDeploy = weekly > 0 ? Math.ceil(capital / weekly) : 0
    const weeklyReturnRate = returnRate / 100 / 52

    // Calculate compounded value after full deployment
    let totalValue = 0
    let totalInvested = 0
    const schedule: { week: number; invested: number; value: number; shares: number }[] = []

    for (let week = 1; week <= weeksToFullDeploy; week++) {
      const investmentThisWeek = Math.min(weekly, capital - totalInvested)
      totalInvested += investmentThisWeek
      
      // Apply weekly return to existing value and add new investment
      totalValue = totalValue * (1 + weeklyReturnRate) + investmentThisWeek
      
      schedule.push({
        week,
        invested: totalInvested,
        value: totalValue,
        shares: Math.floor(investmentThisWeek / price),
      })
    }

    // Project 1 year value (52 weeks from start)
    let oneYearValue = totalValue
    for (let week = weeksToFullDeploy + 1; week <= 52; week++) {
      oneYearValue = oneYearValue * (1 + weeklyReturnRate)
    }

    const totalShares = Math.floor(capital / price)
    const averageCost = totalShares > 0 ? capital / totalShares : 0

    return {
      weeksToFullDeploy,
      totalShares,
      averageCost,
      deploymentEndValue: totalValue,
      oneYearValue,
      oneYearGain: oneYearValue - capital,
      oneYearReturn: capital > 0 ? ((oneYearValue - capital) / capital) * 100 : 0,
    }
  }, [totalCapital, weeklyAmount, annualReturn, targetPrice])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <TrendingDown className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary">DCA Deployment Planner</h2>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            Systematic capital deployment with compound returns
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Total Capital (PKR)</label>
          <input
            type="number"
            value={totalCapital}
            onChange={(e) => setTotalCapital(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Weekly Investment (PKR)</label>
          <input
            type="number"
            value={weeklyAmount}
            onChange={(e) => setWeeklyAmount(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Expected Annual Return (%)</label>
          <input
            type="number"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Target Stock Price (PKR)</label>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3 pt-4 border-t border-border">
        <ResultRow label="Weeks to Full Deployment" value={`${calculations.weeksToFullDeploy} weeks`} />
        <ResultRow label="Total Shares Acquired" value={calculations.totalShares.toLocaleString()} />
        <ResultRow label="Average Cost per Share" value={`Rs ${calculations.averageCost.toFixed(2)}`} />
        <div className="border-t border-border pt-3 mt-3">
          <ResultRow label="Value at Deployment End" value={`Rs ${calculations.deploymentEndValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
          <ResultRow label="Projected 1-Year Value" value={`Rs ${calculations.oneYearValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} highlight />
          <ResultRow label="Projected 1-Year Gain" value={`Rs ${calculations.oneYearGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
          <ResultRow label="Projected 1-Year Return" value={`${calculations.oneYearReturn.toFixed(2)}%`} />
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
