"use client"

import { Sidebar } from "@/components/sidebar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function USDTAssetsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-60 p-6">
        <div className="max-w-6xl">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Overview
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">USDT Assets</h1>
          <p className="text-muted-foreground">View and manage your USDT cryptocurrency assets.</p>
          
          <div className="mt-8 p-6 rounded-xl bg-card border border-card-border">
            <div className="text-4xl font-bold text-foreground">$0.00</div>
            <p className="text-sm text-muted-foreground mt-1">Total USDT Portfolio Value</p>
          </div>
        </div>
      </main>
    </div>
  )
}
