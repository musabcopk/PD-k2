import { Sidebar } from "@/components/sidebar"
import { StatsCards } from "@/components/stats-cards"
import { MarketSessions } from "@/components/market-sessions"
import { RecentTransactions } from "@/components/recent-transactions"
import { ProjectPipeline } from "@/components/project-pipeline"
import { PanelLeftClose } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 ml-60">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <PanelLeftClose className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Title */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-foreground">Command Center</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary font-medium">LIVE SYNC</span>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Market Sessions */}
          <div className="mt-6">
            <MarketSessions />
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-5 gap-6 mt-6">
            <div className="col-span-3">
              <RecentTransactions />
            </div>
            <div className="col-span-2">
              <ProjectPipeline />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
