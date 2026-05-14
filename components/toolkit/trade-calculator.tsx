"use client"

import { useState, useMemo } from "react"
import { Calculator } from "lucide-react"

export function TradeCalculator() {
  const [tradeValue, setTradeValue] = useState("100000")
  const [brokerageRate, setBrokerageRate] = useState("0.15")
  const [isBuy, setIsBuy] = useState(true)
  const [holdingPeriod, setHoldingPeriod] = useState("short") // short or long

  const calculations = useMemo(() => {
    const value = parseFloat(tradeValue) || 0
    const brokerage = parseFloat(brokerageRate) || 0

    // PSX Fee Breakdown
    const brokerageAmount = (value * brokerage) / 100
    const sstOnBrokerage = brokerageAmount * 0.13 // 13% SST on brokerage
    const cdcCharges = value * 0.000125 // 0.0125% CDC charges
    const nccplCharges = value * 0.00006 // 0.006% NCCPL charges
    const secp = value * 0.0000015 // 0.00015% SECP fee
    const psx = value * 0.0000035 // 0.00035% PSX fee
    
    // CGT rates: 15% for short-term (< 1 year), 0% for long-term (> 1 year)
    const cgtRate = holdingPeriod === "short" ? 0.15 : 0
    
    const totalFees = brokerageAmount + sstOnBrokerage + cdcCharges + nccplCharges + secp + psx
    const netAmount = isBuy ? value + totalFees : value - totalFees

    return {
      brokerageAmount,
      sstOnBrokerage,
      cdcCharges,
      nccplCharges,
      secp,
      psx,
      totalFees,
      netAmount,
      cgtRate: cgtRate * 100,
    }
  }, [tradeValue, brokerageRate, isBuy, holdingPeriod])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary">Trade Calculator</h2>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            Full PSX fee breakdown: Brokerage + SST + CDC + CGT
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Trade Value (PKR)</label>
          <input
            type="number"
            value={tradeValue}
            onChange={(e) => setTradeValue(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Brokerage Rate (%)</label>
          <input
            type="number"
            value={brokerageRate}
            onChange={(e) => setBrokerageRate(e.target.value)}
            className="w-full h-11 px-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            step="0.01"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Trade Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => setIsBuy(true)}
              className={`flex-1 h-11 rounded-lg font-medium transition-all ${
                isBuy
                  ? "bg-primary text-primary-foreground"
                  : "bg-input border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setIsBuy(false)}
              className={`flex-1 h-11 rounded-lg font-medium transition-all ${
                !isBuy
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-input border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Sell
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Holding Period</label>
          <div className="flex gap-2">
            <button
              onClick={() => setHoldingPeriod("short")}
              className={`flex-1 h-11 rounded-lg text-sm font-medium transition-all ${
                holdingPeriod === "short"
                  ? "bg-primary text-primary-foreground"
                  : "bg-input border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {"< 1 Year"}
            </button>
            <button
              onClick={() => setHoldingPeriod("long")}
              className={`flex-1 h-11 rounded-lg text-sm font-medium transition-all ${
                holdingPeriod === "long"
                  ? "bg-primary text-primary-foreground"
                  : "bg-input border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {"> 1 Year"}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3 pt-4 border-t border-border">
        <ResultRow label="Brokerage" value={`Rs ${calculations.brokerageAmount.toFixed(2)}`} />
        <ResultRow label="SST (13% on Brokerage)" value={`Rs ${calculations.sstOnBrokerage.toFixed(2)}`} />
        <ResultRow label="CDC Charges" value={`Rs ${calculations.cdcCharges.toFixed(2)}`} />
        <ResultRow label="NCCPL Charges" value={`Rs ${calculations.nccplCharges.toFixed(2)}`} />
        <ResultRow label="SECP Fee" value={`Rs ${calculations.secp.toFixed(2)}`} />
        <ResultRow label="PSX Fee" value={`Rs ${calculations.psx.toFixed(2)}`} />
        <ResultRow label="Capital Gains Tax Rate" value={`${calculations.cgtRate}%`} />
        <div className="border-t border-border pt-3 mt-3">
          <ResultRow label="Total Fees" value={`Rs ${calculations.totalFees.toFixed(2)}`} />
          <ResultRow 
            label={isBuy ? "Total Amount to Pay" : "Net Amount Received"} 
            value={`Rs ${calculations.netAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            highlight 
          />
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
