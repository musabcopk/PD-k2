"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Plus, Calendar, DollarSign, Target, Trash2, Edit2 } from "lucide-react"

interface Project {
  id: number
  name: string
  description: string
  investment: number
  expectedReturn: number
  startDate: string
  endDate: string
  progress: number
  status: "active" | "completed" | "paused"
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: "PSX Dividend Portfolio",
    description: "Long-term dividend investing in blue-chip Pakistani stocks",
    investment: 150000,
    expectedReturn: 15,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    progress: 65,
    status: "active",
  },
  {
    id: 2,
    name: "Crypto DCA Strategy",
    description: "Dollar-cost averaging into BTC and ETH monthly",
    investment: 50000,
    expectedReturn: 25,
    startDate: "2024-02-01",
    endDate: "2025-02-01",
    progress: 40,
    status: "active",
  },
]

export default function EnrolledProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    investment: "",
    expectedReturn: "",
    startDate: "",
    endDate: "",
  })

  const totalInvestment = projects.reduce((sum, p) => sum + p.investment, 0)
  const avgProgress = projects.length > 0 ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) : 0

  const handleAddProject = () => {
    if (newProject.name && newProject.investment) {
      const project: Project = {
        id: Date.now(),
        name: newProject.name,
        description: newProject.description,
        investment: parseFloat(newProject.investment),
        expectedReturn: parseFloat(newProject.expectedReturn) || 10,
        startDate: newProject.startDate || new Date().toISOString().split("T")[0],
        endDate: newProject.endDate || "",
        progress: 0,
        status: "active",
      }
      setProjects([...projects, project])
      setNewProject({ name: "", description: "", investment: "", expectedReturn: "", startDate: "", endDate: "" })
      setShowAddForm(false)
    }
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Enrolled Projects</h1>
              <p className="text-muted-foreground">Manage your active investment projects</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Projects</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{projects.length}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Investment</p>
              </div>
              <p className="text-3xl font-bold text-foreground">Rs {totalInvestment.toLocaleString()}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg. Progress</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{avgProgress}%</p>
            </div>
          </div>

          {showAddForm && (
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Add New Project</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  placeholder="Investment Amount (Rs)"
                  value={newProject.investment}
                  onChange={(e) => setNewProject({ ...newProject, investment: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2"
                />
                <input
                  type="number"
                  placeholder="Expected Return (%)"
                  value={newProject.expectedReturn}
                  onChange={(e) => setNewProject({ ...newProject, expectedReturn: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={newProject.endDate}
                  onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleAddProject} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Add Project
                </button>
                <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === "active" ? "bg-green-500/20 text-green-400" :
                      project.status === "completed" ? "bg-primary/20 text-primary" : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                    <button onClick={() => handleDeleteProject(project.id)} className="p-2 text-muted-foreground hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Investment</p>
                    <p className="text-foreground font-medium">Rs {project.investment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Expected Return</p>
                    <p className="text-green-400 font-medium">{project.expectedReturn}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Start Date</p>
                    <p className="text-foreground font-medium">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">End Date</p>
                    <p className="text-foreground font-medium">{project.endDate || "Ongoing"}</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-primary">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
