"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Plus, CheckCircle2, Circle, Trash2, Target } from "lucide-react"

interface Goal {
  id: number
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  completed: boolean
  deadline: string
}

const initialGoals: Goal[] = [
  { id: 1, title: "Build Rs 500K Portfolio", description: "Reach half million PKR in stock investments", targetAmount: 500000, currentAmount: 196815, completed: false, deadline: "2024-12-31" },
  { id: 2, title: "Crypto Investment Goal", description: "Accumulate $5,000 in cryptocurrency", targetAmount: 5000, currentAmount: 18750, completed: false, deadline: "2024-12-31" },
  { id: 3, title: "Emergency Fund", description: "Build 6 months expense buffer", targetAmount: 300000, currentAmount: 150000, completed: false, deadline: "2024-06-30" },
]

export default function YearlyTasksPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newGoal, setNewGoal] = useState({ title: "", description: "", targetAmount: "", deadline: "" })

  const completedCount = goals.filter((g) => g.completed).length
  const totalCount = goals.length

  const handleToggleGoal = (id: number) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g)))
  }

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.targetAmount) {
      const goal: Goal = {
        id: Date.now(),
        title: newGoal.title,
        description: newGoal.description,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: 0,
        completed: false,
        deadline: newGoal.deadline || "2024-12-31",
      }
      setGoals([...goals, goal])
      setNewGoal({ title: "", description: "", targetAmount: "", deadline: "" })
      setShowAddForm(false)
    }
  }

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter((g) => g.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Yearly Goals</h1>
              <p className="text-muted-foreground">Track your annual financial goals</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Goal
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Goals Achieved</p>
                <p className="text-3xl font-bold text-foreground mt-1">{completedCount} / {totalCount}</p>
              </div>
              <div className="w-32 h-32 relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-secondary" />
                  <circle
                    cx="64" cy="64" r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-purple-500"
                    strokeDasharray={`${(completedCount / totalCount) * 352} 352`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-foreground">
                  {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>

          {showAddForm && (
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Add New Goal</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Goal title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Target Amount"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAddGoal} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Add Goal
                  </button>
                  <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {goals.map((goal) => {
              const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
              return (
                <div
                  key={goal.id}
                  className={`bg-card border border-border rounded-xl p-6 hover:border-purple-500/50 transition-colors ${
                    goal.completed ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button onClick={() => handleToggleGoal(goal.id)} className="mt-1 flex-shrink-0">
                      {goal.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-purple-500" />
                      ) : (
                        <Target className="w-6 h-6 text-muted-foreground hover:text-purple-500 transition-colors" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold ${goal.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                          {goal.title}
                        </h3>
                        <button onClick={() => handleDeleteGoal(goal.id)} className="p-2 text-muted-foreground hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {goal.description && <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Current</p>
                          <p className="text-foreground font-medium">{goal.currentAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Target</p>
                          <p className="text-foreground font-medium">{goal.targetAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Deadline</p>
                          <p className="text-foreground font-medium">{goal.deadline}</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium text-purple-400">{progress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
