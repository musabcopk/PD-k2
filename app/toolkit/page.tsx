"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Calculator, Percent, TrendingUp, RefreshCw } from "lucide-react"

export default function ToolkitPage() {
  const [compoundCalc, setCompoundCalc] = useState({ principal: "100000", rate: "12", years: "5", frequency: "12" })
  const [compoundResult, setCompoundResult] = useState<number | null>(null)

  const [roiCalc, setRoiCalc] = useState({ investment: "50000", returns: "65000" })
  const [roiResult, setRoiResult] = useState<number | null>(null)

  const [convertCalc, setConvertCalc] = useState({ amount: "1000", fromCurrency: "USD", toCurrency: "PKR" })
  const [convertResult, setConvertResult] = useState<number | null>(null)

  const exchangeRates: Record<string, number> = { USD: 1, PKR: 278.50, EUR: 0.92, GBP: 0.79, AED: 3.67 }

  const calculateCompound = () => {
    const p = parseFloat(compoundCalc.principal)
    const r = parseFloat(compoundCalc.rate) / 100
    const t = parseFloat(compoundCalc.years)
    const n = parseFloat(compoundCalc.frequency)
    const result = p * Math.pow(1 + r / n, n * t)
    setCompoundResult(result)
  }

  const calculateROI = () => {
    const investment = parseFloat(roiCalc.investment)
    const returns = parseFloat(roiCalc.returns)
    const roi = ((returns - investment) / investment) * 100
    setRoiResult(roi)
  }

  const calculateConversion = () => {
    const amount = parseFloat(convertCalc.amount)
    const fromRate = exchangeRates[convertCalc.fromCurrency]
    const toRate = exchangeRates[convertCalc.toCurrency]
    const result = (amount / fromRate) * toRate
    setConvertResult(result)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Financial Toolkit</h1>
            <p className="text-muted-foreground">Useful calculators and tools for your investments</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compound Interest Calculator */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Compound Interest</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Principal Amount</label>
                  <input
                    type="number"
                    value={compoundCalc.principal}
                    onChange={(e) => setCompoundCalc({ ...compoundCalc, principal: e.target.value })}
                    className="w-full mt-1 bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Interest Rate (%)</label>
                    <input
                      type="number"
                      value={compoundCalc.rate}
                      onChange={(e) => setCompoundCalc({ ...compoundCalc, rate: e.target.value })}
                      className="w-full mt-1 bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Years</label>
                    <input
                      type="number"
                      value={compoundCalc.years}
                      onChange={(e) => setCompoundCalc({ ...compoundCalc, years: e.target.value })}
                      className="w-full mt-1 bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Compounding Frequency (per year)</label>
                  <select
                    value={compoundCalc.frequency}
                    onChange={(e) => setCompoundCalc({ ...compoundCalc, frequency: e.target.value })}
                    className="w-full mt-1 bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="1">Annually</option>
                    <option value="4">Quarterly</option>
                    <option value="12">Monthly</option>
                    <option value="365">Daily</option>
                  </select>
                </div>
                <button onClick={calculateCompound} className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Calculate
                </button>
                {compoundResult !== null && (
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground">Future Value</p>
                    <p className="text-2xl font-bold text-primary">Rs {compoundResult.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    <p className="text-sm text-green-400 mt-1">
                      +Rs {(compoundResult - parseFloat(compoundCalc.principal)).toLocaleString(undefined, { maximumFractionDigits: 2 })} interest earned
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Percent className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">ROI Calculator</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Initial Investment</label>
                  <input
                    type="number"
                    value={roiCalc.investment}
                    onChange={(e) => setRoiCalc({ ...roiCalc, investment: e.target.value })}
                    className="w-full mt-1 bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Final Value / Returns</label>
                  <input
                    type="number"
                    value={roiCalc.returns}
                    onChange={(e) => setRoiCalc({ ...roiCalc, returns: e.target.value })}
                    className="w-full mt-1 bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button onClick={calculateROI} className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Calculate ROI
                </button>
                {roiResult !== null && (
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground">Return on Investment</p>
                    <p className={`text-2xl font-bold ${roiResult >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {roiResult >= 0 ? "+" : ""}{roiResult.toFixed(2)}%
                    </p>
                    <p className={`text-sm mt-1 ${roiResult >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {roiResult >= 0 ? "Profit" : "Loss"}: Rs {Math.abs(parseFloat(roiCalc.returns) - parseFloat(roiCalc.investment)).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Currency Converter */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-yellow-400" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Currency Converter</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Amount</label>
                  <input
                    type="number"
                    value={convertCalc.amount}
                    onChange={(e) => setConvertCalc({ ...convertCalc, amount: e.target.value })}
                    className="w-full mt-1 bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">From</label>
                    <select
                      value={convertCalc.fromCurrency}
                      onChange={(e) => setConvertCalc({ ...convertCalc, fromCurrency: e.target.value })}
                      className="w-full mt-1 bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="USD">USD</option>
                      <option value="PKR">PKR</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="AED">AED</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">To</label>
                    <select
                      value={convertCalc.toCurrency}
                      onChange={(e) => setConvertCalc({ ...convertCalc, toCurrency: e.target.value })}
                      className="w-full mt-1 bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="PKR">PKR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="AED">AED</option>
                    </select>
                  </div>
                </div>
                <button onClick={calculateConversion} className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Convert
                </button>
                {convertResult !== null && (
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground">Converted Amount</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {convertResult.toLocaleString(undefined, { maximumFractionDigits: 2 })} {convertCalc.toCurrency}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Rate: 1 {convertCalc.fromCurrency} = {(exchangeRates[convertCalc.toCurrency] / exchangeRates[convertCalc.fromCurrency]).toFixed(4)} {convertCalc.toCurrency}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Calculator className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Quick Reference</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground">USD/PKR Rate</p>
                  <p className="text-xl font-bold text-foreground">Rs 278.50</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground">PSX Trading Hours</p>
                  <p className="text-xl font-bold text-foreground">9:30 AM - 3:30 PM PKT</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground">Crypto Market</p>
                  <p className="text-xl font-bold text-green-400">24/7 Open</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
