"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Plus, CheckCircle2, Circle, Trash2, Calendar } from "lucide-react"

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  priority: "high" | "medium" | "low"
  dueDate: string
}

const initialTasks: Task[] = [
  { id: 1, title: "Rebalance portfolio", description: "Review and adjust asset allocation", completed: false, priority: "high", dueDate: "2024-01-31" },
  { id: 2, title: "Pay brokerage fees", description: "Clear outstanding brokerage charges", completed: true, priority: "high", dueDate: "2024-01-28" },
  { id: 3, title: "Review dividend income", description: "Track all dividend payments received", completed: false, priority: "medium", dueDate: "2024-01-30" },
  { id: 4, title: "Update investment spreadsheet", description: "Record all transactions for the month", completed: false, priority: "low", dueDate: "2024-01-31" },
]

export default function MonthlyTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium" as "high" | "medium" | "low", dueDate: "" })

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const handleAddTask = () => {
    if (newTask.title) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        completed: false,
        priority: newTask.priority,
        dueDate: newTask.dueDate || new Date().toISOString().split("T")[0],
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", description: "", priority: "medium", dueDate: "" })
      setShowAddForm(false)
    }
  }

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id))
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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Monthly Tasks</h1>
              <p className="text-muted-foreground">Track your monthly investment tasks</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Progress</p>
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
                    className="text-yellow-500"
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
              <h3 className="text-lg font-semibold text-foreground mb-4">Add New Task</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as "high" | "medium" | "low" })}
                    className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAddTask} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Add Task
                  </button>
                  <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-card border border-border rounded-xl p-4 flex items-start gap-4 hover:border-yellow-500/50 transition-colors ${
                  task.completed ? "opacity-60" : ""
                }`}
              >
                <button onClick={() => handleToggleTask(task.id)} className="mt-1 flex-shrink-0">
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground hover:text-yellow-500 transition-colors" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {task.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {task.dueDate}
                  </div>
                </div>
                <button onClick={() => handleDeleteTask(task.id)} className="p-2 text-muted-foreground hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
