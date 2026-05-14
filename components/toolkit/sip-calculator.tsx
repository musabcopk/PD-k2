"use client"

import { useState, useMemo } from "react"
import { PiggyBank } from "lucide-react"

export function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("10000")
  const [annualReturn, setAnnualReturn] = useState("12")
  const [investmentYears, setInvestmentYears] = useState("10")
  const [stepUp, setStepUp] = useState("10")

  const calculations = useMemo(() => {
    const P = parseFloat(monthlyInvestment) || 0
    const annualRate = parseFloat(annualReturn) / 100 || 0
    const years = parseInt(investmentYears) || 0
    const stepUpRate = parseFloat(stepUp) / 100 || 0

    const r = annualRate / 12 // Monthly rate
    const n = years * 12 // Total months

    // Standard SIP Formula: FV = P * [(1+r)^n - 1] / r * (1+r)
    let standardMaturity = 0
    if (r > 0) {
      standardMaturity = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
    } else {
      standardMaturity = P * n
    }

    // Step-up SIP calculation (increasing investment by stepUp% annually)
    let stepUpMaturity = 0
    let currentMonthly = P
    let totalInvestedStepUp = 0

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        const monthsRemaining = (years - year) * 12 + (12 - month) + 1
        const fvFactor = Math.pow(1 + r, monthsRemaining)
        stepUpMaturity += currentMonthly * fvFactor
        totalInvestedStepUp += currentMonthly
      }
      currentMonthly = currentMonthly * (1 + stepUpRate)
    }

    const totalInvested = P * n
    const standardReturns = standardMaturity - totalInvested
    const stepUpReturns = stepUpMaturity - totalInvestedStepUp

    // CAGR calculation
    const cagr = totalInvested > 0 ? (Math.pow(standardMaturity / totalInvested, 1 / years) - 1) * 100 : 0

    return {
      standardMaturity,
      totalInvested,
      standardReturns,
      wealthGain: totalInvested > 0 ? (standardReturns / totalInvested) * 100 : 0,
      stepUpMaturity,
      totalInvestedStepUp,
      stepUpReturns,
      cagr,
    }
  }, [monthlyInvestment, annualReturn, investmentYears, stepUp])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <PiggyBank className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary">SIP Calculator</h2>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {"SIP Maturity = P x [(1+r)^n - 1] / r x (1+r)"}
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Monthly Investment (PKR)</label>
          <input
            type="number"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
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
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Investment Period (Years)</label>
          <input
            type="number"
            value={investmentYears}
            onChange={(e) => setInvestmentYears(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            min="1"
            max="40"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Annual Step-up (%)</label>
          <input
            type="number"
            value={stepUp}
            onChange={(e) => setStepUp(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h3 className="text-sm font-medium text-foreground">Standard SIP</h3>
        <ResultRow label="Total Investment" value={`Rs ${calculations.totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Expected Returns" value={`Rs ${calculations.standardReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Maturity Value" value={`Rs ${calculations.standardMaturity.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} highlight />
        <ResultRow label="Wealth Gain" value={`${calculations.wealthGain.toFixed(1)}%`} />
        
        <div className="border-t border-border pt-3 mt-3">
          <h3 className="text-sm font-medium text-foreground mb-2">Step-up SIP ({stepUp}% annual increase)</h3>
          <ResultRow label="Total Investment" value={`Rs ${calculations.totalInvestedStepUp.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
          <ResultRow label="Expected Returns" value={`Rs ${calculations.stepUpReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
          <ResultRow label="Maturity Value" value={`Rs ${calculations.stepUpMaturity.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} highlight />
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
