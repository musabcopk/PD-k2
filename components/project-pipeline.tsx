import { FolderKanban } from "lucide-react"

const pipeline = [
  { label: "Enrolled", count: 2, percentage: 100, color: "bg-primary" },
  { label: "Upcoming", count: 1, percentage: 75, color: "bg-amber-500" },
  { label: "Future", count: 1, percentage: 40, color: "bg-slate-500" },
]

export function ProjectPipeline() {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <FolderKanban className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Project Pipeline</h3>
      </div>
      <div className="space-y-4">
        {pipeline.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-medium text-foreground">{item.count}</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full transition-all`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
