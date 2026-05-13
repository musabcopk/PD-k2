"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Plus, ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react"

interface Transaction {
  id: number
  type: "deposit" | "withdrawal"
  amount: number
  description: string
  date: string
}

const initialTransactions: Transaction[] = [
  { id: 1, type: "deposit", amount: 50000, description: "Bank Transfer - HBL", date: "2024-01-15" },
  { id: 2, type: "withdrawal", amount: 28000, description: "Stock Purchase - HBL", date: "2024-01-16" },
  { id: 3, type: "withdrawal", amount: 40000, description: "Stock Purchase - PPL", date: "2024-01-18" },
  { id: 4, type: "deposit", amount: 100000, description: "Bank Transfer - MCB", date: "2024-01-20" },
]

export default function PKRWalletPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTx, setNewTx] = useState({ type: "deposit" as "deposit" | "withdrawal", amount: "", description: "" })

  const balance = transactions.reduce((sum, tx) => {
    return tx.type === "deposit" ? sum + tx.amount : sum - tx.amount
  }, 0)

  const totalDeposits = transactions.filter((t) => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0)
  const totalWithdrawals = transactions.filter((t) => t.type === "withdrawal").reduce((sum, t) => sum + t.amount, 0)

  const handleAddTransaction = () => {
    if (newTx.amount && newTx.description) {
      const tx: Transaction = {
        id: Date.now(),
        type: newTx.type,
        amount: parseFloat(newTx.amount),
        description: newTx.description,
        date: new Date().toISOString().split("T")[0],
      }
      setTransactions([tx, ...transactions])
      setNewTx({ type: "deposit", amount: "", description: "" })
      setShowAddForm(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">PKR Wallet</h1>
              <p className="text-muted-foreground">Manage your Pakistani Rupee transactions</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Balance</p>
              </div>
              <p className="text-3xl font-bold text-foreground">Rs {balance.toLocaleString()}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <ArrowDownLeft className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Deposits</p>
              </div>
              <p className="text-3xl font-bold text-green-400">Rs {totalDeposits.toLocaleString()}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <ArrowUpRight className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Withdrawals</p>
              </div>
              <p className="text-3xl font-bold text-red-400">Rs {totalWithdrawals.toLocaleString()}</p>
            </div>
          </div>

          {showAddForm && (
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Add Transaction</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={newTx.type}
                  onChange={(e) => setNewTx({ ...newTx, type: e.target.value as "deposit" | "withdrawal" })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                </select>
                <input
                  type="number"
                  placeholder="Amount (Rs)"
                  value={newTx.amount}
                  onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newTx.description}
                  onChange={(e) => setNewTx({ ...newTx, description: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleAddTransaction} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Add Transaction
                </button>
                <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Transaction History</h3>
            </div>
            <div className="divide-y divide-border/50">
              {transactions.map((tx) => (
                <div key={tx.id} className="px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${tx.type === "deposit" ? "bg-green-500/20" : "bg-red-500/20"}`}>
                      {tx.type === "deposit" ? (
                        <ArrowDownLeft className="w-5 h-5 text-green-400" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tx.description}</p>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`font-semibold ${tx.type === "deposit" ? "text-green-400" : "text-red-400"}`}>
                    {tx.type === "deposit" ? "+" : "-"}Rs {tx.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
