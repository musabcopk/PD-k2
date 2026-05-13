"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Plus, TrendingUp, TrendingDown, Trash2 } from "lucide-react"

interface Asset {
  id: number
  name: string
  symbol: string
  quantity: number
  avgPrice: number
  currentPrice: number
  value: number
  change: number
}

const initialAssets: Asset[] = [
  { id: 1, name: "Bitcoin", symbol: "BTC", quantity: 0.15, avgPrice: 40833.33, currentPrice: 67500, value: 10125, change: 65.31 },
  { id: 2, name: "Ethereum", symbol: "ETH", quantity: 2.5, avgPrice: 2200, currentPrice: 3450, value: 8625, change: 56.82 },
]

export default function USDTAssetsPage() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAsset, setNewAsset] = useState({ name: "", symbol: "", quantity: "", avgPrice: "", currentPrice: "" })

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
  const totalInvested = assets.reduce((sum, asset) => sum + asset.quantity * asset.avgPrice, 0)
  const totalPnL = totalValue - totalInvested
  const totalPnLPercent = totalInvested > 0 ? ((totalPnL / totalInvested) * 100).toFixed(2) : "0.00"

  const handleAddAsset = () => {
    if (newAsset.name && newAsset.symbol && newAsset.quantity && newAsset.avgPrice && newAsset.currentPrice) {
      const qty = parseFloat(newAsset.quantity)
      const avg = parseFloat(newAsset.avgPrice)
      const current = parseFloat(newAsset.currentPrice)
      const asset: Asset = {
        id: Date.now(),
        name: newAsset.name,
        symbol: newAsset.symbol,
        quantity: qty,
        avgPrice: avg,
        currentPrice: current,
        value: qty * current,
        change: ((current - avg) / avg) * 100,
      }
      setAssets([...assets, asset])
      setNewAsset({ name: "", symbol: "", quantity: "", avgPrice: "", currentPrice: "" })
      setShowAddForm(false)
    }
  }

  const handleDeleteAsset = (id: number) => {
    setAssets(assets.filter((a) => a.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">USDT Assets</h1>
              <p className="text-muted-foreground">Manage your cryptocurrency portfolio</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Asset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Value</p>
              <p className="text-2xl font-bold text-foreground mt-1">${totalValue.toLocaleString()}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Invested</p>
              <p className="text-2xl font-bold text-foreground mt-1">${totalInvested.toLocaleString()}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Total P&L</p>
              <p className={`text-2xl font-bold mt-1 ${totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
                {totalPnL >= 0 ? "+" : ""}${totalPnL.toLocaleString()}
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Overall Return</p>
              <p className={`text-2xl font-bold mt-1 flex items-center gap-2 ${parseFloat(totalPnLPercent) >= 0 ? "text-green-400" : "text-red-400"}`}>
                {parseFloat(totalPnLPercent) >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                {totalPnLPercent}%
              </p>
            </div>
          </div>

          {showAddForm && (
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Add New Crypto Asset</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input
                  type="text"
                  placeholder="Coin Name"
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Symbol (e.g. BTC)"
                  value={newAsset.symbol}
                  onChange={(e) => setNewAsset({ ...newAsset, symbol: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  step="0.00001"
                  value={newAsset.quantity}
                  onChange={(e) => setNewAsset({ ...newAsset, quantity: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  placeholder="Avg. Price ($)"
                  value={newAsset.avgPrice}
                  onChange={(e) => setNewAsset({ ...newAsset, avgPrice: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  placeholder="Current Price ($)"
                  value={newAsset.currentPrice}
                  onChange={(e) => setNewAsset({ ...newAsset, currentPrice: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleAddAsset} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Add Asset
                </button>
                <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground">Asset</th>
                  <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground">Quantity</th>
                  <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground">Avg. Price</th>
                  <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground">Current Price</th>
                  <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground">Value</th>
                  <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground">Change</th>
                  <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">{asset.name}</p>
                        <p className="text-sm text-muted-foreground">{asset.symbol}</p>
                      </div>
                    </td>
                    <td className="text-right px-6 py-4 text-foreground">{asset.quantity}</td>
                    <td className="text-right px-6 py-4 text-foreground">${asset.avgPrice.toLocaleString()}</td>
                    <td className="text-right px-6 py-4 text-foreground">${asset.currentPrice.toLocaleString()}</td>
                    <td className="text-right px-6 py-4 text-foreground font-medium">${asset.value.toLocaleString()}</td>
                    <td className="text-right px-6 py-4">
                      <span className={`flex items-center justify-end gap-1 ${asset.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {asset.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {asset.change >= 0 ? "+" : ""}{asset.change.toFixed(2)}%
                      </span>
                    </td>
                    <td className="text-right px-6 py-4">
                      <button onClick={() => handleDeleteAsset(asset.id)} className="p-2 text-muted-foreground hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
