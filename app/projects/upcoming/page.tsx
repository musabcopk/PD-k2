"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Plus, Calendar, DollarSign, Clock, Trash2 } from "lucide-react"

interface Project {
  id: number
  name: string
  description: string
  plannedInvestment: number
  expectedReturn: number
  plannedStart: string
  priority: "high" | "medium" | "low"
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Real Estate Investment",
    description: "Invest in residential property for rental income",
    plannedInvestment: 500000,
    expectedReturn: 12,
    plannedStart: "2024-06-01",
    priority: "high",
  },
]

export default function UpcomingProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    plannedInvestment: "",
    expectedReturn: "",
    plannedStart: "",
    priority: "medium" as "high" | "medium" | "low",
  })

  const totalPlannedInvestment = projects.reduce((sum, p) => sum + p.plannedInvestment, 0)

  const handleAddProject = () => {
    if (newProject.name && newProject.plannedInvestment) {
      const project: Project = {
        id: Date.now(),
        name: newProject.name,
        description: newProject.description,
        plannedInvestment: parseFloat(newProject.plannedInvestment),
        expectedReturn: parseFloat(newProject.expectedReturn) || 10,
        plannedStart: newProject.plannedStart || "",
        priority: newProject.priority,
      }
      setProjects([...projects, project])
      setNewProject({ name: "", description: "", plannedInvestment: "", expectedReturn: "", plannedStart: "", priority: "medium" })
      setShowAddForm(false)
    }
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-400"
      case "medium": return "bg-yellow-500/20 text-yellow-400"
      case "low": return "bg-green-500/20 text-green-400"
      default: return "bg-secondary text-muted-foreground"
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Upcoming Projects</h1>
              <p className="text-muted-foreground">Projects planned to start soon</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Plan Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Upcoming Projects</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{projects.length}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Planned Investment</p>
              </div>
              <p className="text-3xl font-bold text-foreground">Rs {totalPlannedInvestment.toLocaleString()}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">High Priority</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{projects.filter((p) => p.priority === "high").length}</p>
            </div>
          </div>

          {showAddForm && (
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Plan New Project</h3>
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
                  placeholder="Planned Investment (Rs)"
                  value={newProject.plannedInvestment}
                  onChange={(e) => setNewProject({ ...newProject, plannedInvestment: e.target.value })}
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
                  type="date"
                  placeholder="Planned Start Date"
                  value={newProject.plannedStart}
                  onChange={(e) => setNewProject({ ...newProject, plannedStart: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  value={newProject.priority}
                  onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as "high" | "medium" | "low" })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
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
              <div key={project.id} className="bg-card border border-border rounded-xl p-6 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
                    </span>
                    <button onClick={() => handleDeleteProject(project.id)} className="p-2 text-muted-foreground hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Planned Investment</p>
                    <p className="text-foreground font-medium">Rs {project.plannedInvestment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Expected Return</p>
                    <p className="text-green-400 font-medium">{project.expectedReturn}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Planned Start</p>
                    <p className="text-foreground font-medium">{project.plannedStart || "TBD"}</p>
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
