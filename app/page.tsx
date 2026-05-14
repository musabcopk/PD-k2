import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { StatsCards } from "@/components/stats-cards"
import { MarketSessions } from "@/components/market-sessions"
import { RecentTransactions } from "@/components/recent-transactions"
import { ProjectPipeline } from "@/components/project-pipeline"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 md:ml-60">
        {/* Mobile Header */}
        <MobileHeader />
        
        {/* Desktop Header */}
        <header className="hidden md:block sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-6">
          {/* Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Command Center</h1>
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
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mt-6">
            <div className="xl:col-span-3">
              <RecentTransactions />
            </div>
            <div className="xl:col-span-2">
              <ProjectPipeline />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
