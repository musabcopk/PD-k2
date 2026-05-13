"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Plus, Lightbulb, DollarSign, Trash2 } from "lucide-react"

interface Project {
  id: number
  name: string
  description: string
  estimatedInvestment: number
  category: string
  notes: string
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Mutual Fund Portfolio",
    description: "Build a diversified mutual fund portfolio for long-term wealth",
    estimatedInvestment: 200000,
    category: "Investment",
    notes: "Research best performing funds in Pakistan",
  },
]

export default function FutureProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    estimatedInvestment: "",
    category: "",
    notes: "",
  })

  const totalEstimated = projects.reduce((sum, p) => sum + p.estimatedInvestment, 0)

  const handleAddProject = () => {
    if (newProject.name) {
      const project: Project = {
        id: Date.now(),
        name: newProject.name,
        description: newProject.description,
        estimatedInvestment: parseFloat(newProject.estimatedInvestment) || 0,
        category: newProject.category || "General",
        notes: newProject.notes,
      }
      setProjects([...projects, project])
      setNewProject({ name: "", description: "", estimatedInvestment: "", category: "", notes: "" })
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
              <h1 className="text-2xl font-bold text-foreground">Future Projects</h1>
              <p className="text-muted-foreground">Ideas and plans for future investments</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Idea
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Future Ideas</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{projects.length}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Estimated Total</p>
              </div>
              <p className="text-3xl font-bold text-foreground">Rs {totalEstimated.toLocaleString()}</p>
            </div>
          </div>

          {showAddForm && (
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Add Future Project Idea</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Category (e.g. Investment, Business)"
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
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
                  placeholder="Estimated Investment (Rs)"
                  value={newProject.estimatedInvestment}
                  onChange={(e) => setNewProject({ ...newProject, estimatedInvestment: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Notes"
                  value={newProject.notes}
                  onChange={(e) => setNewProject({ ...newProject, notes: e.target.value })}
                  className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleAddProject} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Add Idea
                </button>
                <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-card border border-border rounded-xl p-6 hover:border-purple-500/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-400">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <button onClick={() => handleDeleteProject(project.id)} className="p-2 text-muted-foreground hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Estimated Investment</p>
                    <p className="text-foreground font-medium">Rs {project.estimatedInvestment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Notes</p>
                    <p className="text-foreground font-medium">{project.notes || "No notes"}</p>
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
