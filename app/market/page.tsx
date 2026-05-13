"use client"

import { Sidebar } from "@/components/sidebar"
import { TrendingUp, TrendingDown, Clock, Globe } from "lucide-react"

const marketData = {
  psx: [
    { name: "KSE-100 Index", value: "72,456.32", change: "+1.24%", positive: true },
    { name: "KSE-30 Index", value: "26,789.45", change: "+0.87%", positive: true },
    { name: "KMI-30 Index", value: "45,123.67", change: "-0.32%", positive: false },
  ],
  stocks: [
    { symbol: "HBL", name: "Habib Bank", price: "145.50", change: "+2.35%", positive: true },
    { symbol: "PPL", name: "Pakistan Petroleum", price: "58.93", change: "-1.45%", positive: false },
    { symbol: "OGDC", name: "Oil & Gas Dev", price: "89.25", change: "+0.78%", positive: true },
    { symbol: "LUCK", name: "Lucky Cement", price: "985.00", change: "+1.12%", positive: true },
    { symbol: "ENGRO", name: "Engro Corp", price: "265.00", change: "-0.56%", positive: false },
    { symbol: "MCB", name: "MCB Bank", price: "198.75", change: "+1.89%", positive: true },
  ],
  crypto: [
    { symbol: "BTC", name: "Bitcoin", price: "$67,500.00", change: "+3.45%", positive: true },
    { symbol: "ETH", name: "Ethereum", price: "$3,450.00", change: "+2.12%", positive: true },
    { symbol: "BNB", name: "Binance Coin", price: "$580.00", change: "-0.78%", positive: false },
    { symbol: "SOL", name: "Solana", price: "$145.00", change: "+5.67%", positive: true },
    { symbol: "XRP", name: "Ripple", price: "$0.52", change: "+1.23%", positive: true },
  ],
}

const marketSessions = [
  { name: "London", status: "closed", hours: "12:00 - 17:00 PKT", timezone: "GMT" },
  { name: "New York", status: "open", hours: "18:00 - 22:00 PKT", timezone: "EST" },
  { name: "Tokyo", status: "closed", hours: "04:00 - 10:00 PKT", timezone: "JST" },
  { name: "PSX", status: "closed", hours: "09:30 - 15:30 PKT", timezone: "PKT" },
]

export default function MarketPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Market Overview</h1>
            <p className="text-muted-foreground">Live market data and trading sessions</p>
          </div>

          {/* Market Sessions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {marketSessions.map((session) => (
              <div key={session.name} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{session.name}</span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${session.status === "open" ? "bg-green-400" : "bg-red-400"}`} />
                </div>
                <p className={`text-sm font-semibold ${session.status === "open" ? "text-green-400" : "text-red-400"}`}>
                  {session.status.toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{session.hours}</p>
              </div>
            ))}
          </div>

          {/* PSX Indices */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">PSX Indices</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {marketData.psx.map((index) => (
                <div key={index.name} className="bg-secondary rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">{index.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xl font-bold text-foreground">{index.value}</span>
                    <span className={`flex items-center gap-1 text-sm font-medium ${index.positive ? "text-green-400" : "text-red-400"}`}>
                      {index.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {index.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PSX Stocks */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="font-semibold text-foreground">PSX Stocks</h2>
              </div>
              <div className="divide-y divide-border/50">
                {marketData.stocks.map((stock) => (
                  <div key={stock.symbol} className="px-6 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                    <div>
                      <p className="font-medium text-foreground">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">Rs {stock.price}</p>
                      <p className={`text-xs font-medium flex items-center justify-end gap-1 ${stock.positive ? "text-green-400" : "text-red-400"}`}>
                        {stock.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {stock.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crypto */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Cryptocurrency</h2>
                <span className="flex items-center gap-1 text-xs text-green-400">
                  <Clock className="w-3 h-3" /> 24/7 Market
                </span>
              </div>
              <div className="divide-y divide-border/50">
                {marketData.crypto.map((coin) => (
                  <div key={coin.symbol} className="px-6 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                    <div>
                      <p className="font-medium text-foreground">{coin.symbol}</p>
                      <p className="text-xs text-muted-foreground">{coin.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{coin.price}</p>
                      <p className={`text-xs font-medium flex items-center justify-end gap-1 ${coin.positive ? "text-green-400" : "text-red-400"}`}>
                        {coin.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {coin.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
