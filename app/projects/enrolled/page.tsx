"use client"

import { Sidebar } from "@/components/sidebar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EnrolledProjectsPage() {
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Enrolled Projects</h1>
          <p className="text-muted-foreground">View your currently enrolled projects.</p>
          
          <div className="mt-8 p-6 rounded-xl bg-card border border-card-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground font-medium">Enrolled</span>
              <span className="text-primary font-bold">50%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "50%" }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
