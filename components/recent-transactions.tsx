import { TrendingUp } from "lucide-react"

const transactions = [
  {
    name: "Ethereum",
    type: "BUY",
    amount: "$5,500.00",
    quantity: "2.5 ETH",
  },
  {
    name: "Habib Bank Limited",
    type: "BUY",
    amount: "Rs 28,000.00",
    quantity: "200 HBL",
  },
  {
    name: "Pakistan Petroleum",
    type: "BUY",
    amount: "Rs 40,000.00",
    quantity: "500 PPL",
  },
  {
    name: "Bitcoin",
    type: "BUY",
    amount: "$1,925.00",
    quantity: "0.05 BTC",
  },
  {
    name: "Bitcoin",
    type: "BUY",
    amount: "$4,200.00",
    quantity: "0.1 BTC",
  },
]

export function RecentTransactions() {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Recent Transactions</h3>
      </div>
      <div className="space-y-3">
        {transactions.map((tx, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-secondary/50 border border-border rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{tx.name}</p>
                <p className="text-xs text-primary">{tx.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">{tx.amount}</p>
              <p className="text-xs text-muted-foreground">{tx.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
