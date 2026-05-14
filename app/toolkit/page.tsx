"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import {
  Target,
  Calculator,
  TrendingDown,
  Percent,
  Search,
  LineChart,
  DollarSign,
  PiggyBank,
  Building2,
} from "lucide-react"
import { PositionSizeCalculator } from "@/components/toolkit/position-size-calculator"
import { TradeCalculator } from "@/components/toolkit/trade-calculator"
import { DCAPlanner } from "@/components/toolkit/dca-planner"
import { DividendProjector } from "@/components/toolkit/dividend-projector"
import { GrahamScreener } from "@/components/toolkit/graham-screener"
import { DCFModel } from "@/components/toolkit/dcf-model"
import { PEValue } from "@/components/toolkit/pe-value"
import { SIPCalculator } from "@/components/toolkit/sip-calculator"
import { AssetNAV } from "@/components/toolkit/asset-nav"

const tools = [
  {
    id: "position-size",
    label: "Position Size",
    icon: Target,
    component: PositionSizeCalculator,
  },
  {
    id: "trade-calculator",
    label: "Trade Calculator",
    icon: Calculator,
    component: TradeCalculator,
  },
  {
    id: "dca-planner",
    label: "DCA Planner",
    icon: TrendingDown,
    component: DCAPlanner,
  },
  {
    id: "dividend-projector",
    label: "Dividend Projector",
    icon: Percent,
    component: DividendProjector,
  },
  {
    id: "graham-screener",
    label: "Graham Screener",
    icon: Search,
    component: GrahamScreener,
  },
  {
    id: "dcf-model",
    label: "DCF Model",
    icon: LineChart,
    component: DCFModel,
  },
  {
    id: "pe-value",
    label: "P/E Value",
    icon: DollarSign,
    component: PEValue,
  },
  {
    id: "sip",
    label: "SIP",
    icon: PiggyBank,
    component: SIPCalculator,
  },
  {
    id: "asset-nav",
    label: "Asset NAV",
    icon: Building2,
    component: AssetNAV,
  },
]

export default function ToolkitPage() {
  const [activeTab, setActiveTab] = useState("position-size")

  const ActiveComponent = tools.find((t) => t.id === activeTab)?.component || PositionSizeCalculator

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

        {/* Toolkit Content */}
        <div className="p-4 lg:p-6">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Investment Toolkit</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              9 professional calculators — each in its own workspace
            </p>
          </div>

          {/* Toolkit Container */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Tab Navigation - Vertical on desktop, Horizontal scroll on mobile */}
            <div className="lg:w-56 flex-shrink-0">
              <div className="bg-card border border-border rounded-xl p-2 lg:p-3">
                {/* Mobile: Horizontal scroll */}
                <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {tools.map((tool) => {
                    const Icon = tool.icon
                    const isActive = activeTab === tool.id
                    return (
                      <button
                        key={tool.id}
                        onClick={() => setActiveTab(tool.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
                        <span>{tool.label}</span>
                      </button>
                    )
                  })}
                </div>
                
                {/* Desktop: Vertical list */}
                <div className="hidden lg:flex flex-col gap-1">
                  {tools.map((tool) => {
                    const Icon = tool.icon
                    const isActive = activeTab === tool.id
                    return (
                      <button
                        key={tool.id}
                        onClick={() => setActiveTab(tool.id)}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        <Icon 
                          className={`w-4 h-4 transition-all duration-200 ${
                            isActive 
                              ? "scale-110 text-primary" 
                              : "group-hover:scale-110 group-hover:text-primary"
                          }`} 
                        />
                        <span>{tool.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Calculator Content */}
            <div className="flex-1">
              <div className="bg-card border border-border rounded-xl p-4 lg:p-6 min-h-[500px]">
                <ActiveComponent />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
