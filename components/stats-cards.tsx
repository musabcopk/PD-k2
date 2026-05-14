import { Wallet, DollarSign, FolderKanban, CheckSquare } from "lucide-react"

const stats = [
  {
    label: "TOTAL PKR PORTFOLIO",
    value: "Rs 58,564.00",
    subtext: "Negative ROI",
    subtextColor: "text-destructive",
    icon: Wallet,
  },
  {
    label: "TOTAL USDT PORTFOLIO",
    value: "$0.00",
    subtext: "Negative ROI",
    subtextColor: "text-destructive",
    icon: DollarSign,
  },
  {
    label: "ACTIVE PROJECTS",
    value: "2",
    icon: FolderKanban,
  },
  {
    label: "WEEKLY TASKS",
    value: "0 / 3",
    icon: CheckSquare,
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </span>
            <stat.icon className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="mt-3">
            <p className="text-2xl font-semibold text-foreground font-mono">
              {stat.value}
            </p>
            {stat.subtext && (
              <p className={`text-xs mt-1 ${stat.subtextColor}`}>
                ↘ {stat.subtext}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
