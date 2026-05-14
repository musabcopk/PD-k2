"use client"

import { useState, useMemo } from "react"
import { Target } from "lucide-react"

export function PositionSizeCalculator() {
  const [accountBalance, setAccountBalance] = useState("10000")
  const [riskPercent, setRiskPercent] = useState("1")
  const [entryPrice, setEntryPrice] = useState("100")
  const [stopLoss, setStopLoss] = useState("90")
  const [targetPrice, setTargetPrice] = useState("120")

  const calculations = useMemo(() => {
    const account = parseFloat(accountBalance) || 0
    const risk = parseFloat(riskPercent) || 0
    const entry = parseFloat(entryPrice) || 0
    const stop = parseFloat(stopLoss) || 0
    const target = parseFloat(targetPrice) || entry

    const riskAmount = (account * risk) / 100
    const riskPerShare = Math.abs(entry - stop)
    const positionSize = riskPerShare > 0 ? Math.floor(riskAmount / riskPerShare) : 0
    const totalValue = positionSize * entry
    const potentialLoss = positionSize * riskPerShare
    const potentialGain = positionSize * Math.abs(target - entry)
    const riskReward = potentialLoss > 0 ? potentialGain / potentialLoss : 0

    return {
      riskAmount,
      riskPerShare,
      positionSize,
      totalValue,
      riskReward,
    }
  }, [accountBalance, riskPercent, entryPrice, stopLoss, targetPrice])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Target className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary">Position Size Calculator</h2>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {"Units = (Account x Risk%) / (Entry - Stop Loss)"}
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Account Balance (PKR)</label>
          <input
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Risk per Trade %</label>
          <input
            type="number"
            value={riskPercent}
            onChange={(e) => setRiskPercent(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Entry Price (PKR)</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Stop Loss Price (PKR)</label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm text-muted-foreground">Target Price (PKR) - Optional</label>
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
        <ResultRow label="Risk Amount" value={`Rs ${calculations.riskAmount.toLocaleString()}`} />
        <ResultRow label="Risk per Share" value={`Rs ${calculations.riskPerShare.toFixed(4)}`} />
        <ResultRow label="Position Size (Shares)" value={calculations.positionSize.toLocaleString()} highlight />
        <ResultRow label="Total Position Value" value={`Rs ${calculations.totalValue.toLocaleString()}`} />
        <ResultRow label="Risk:Reward (1:?)" value={`1 : ${calculations.riskReward.toFixed(2)}`} />
      </div>
    </div>
  )
}

function ResultRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`font-mono text-sm ${highlight ? "text-primary text-lg font-bold" : "text-primary"}`}>
        {value}
      </span>
    </div>
  )
}
