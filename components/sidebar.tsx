"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  CheckSquare,
  Wrench,
  TrendingUp,
  Bot,
  ChevronRight,
  TrendingUpIcon,
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/" },
  {
    icon: Briefcase,
    label: "Portfolio",
    href: "#",
    submenu: [
      { label: "PKR Assets", href: "#" },
      { label: "USDT Assets", href: "#" },
      { label: "PKR Wallet", href: "#" },
      { label: "USDT Wallet", href: "#" },
    ],
  },
  {
    icon: FolderKanban,
    label: "Projects",
    href: "#",
    submenu: [
      { label: "Enrolled", href: "#" },
      { label: "Upcoming", href: "#" },
      { label: "Future", href: "#" },
    ],
  },
  {
    icon: CheckSquare,
    label: "Tasks",
    href: "#",
    submenu: [
      { label: "Weekly", href: "#" },
      { label: "Monthly", href: "#" },
      { label: "Yearly", href: "#" },
    ],
  },
  { icon: Wrench, label: "Toolkit", href: "/toolkit" },
  { icon: TrendingUp, label: "Market", href: "#" },
  { icon: Bot, label: "AI Advisor", href: "#" },
]

export function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  const isActive = (href: string) => pathname === href

  return (
    <aside className="hidden md:flex w-60 bg-sidebar border-r border-sidebar-border flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <TrendingUpIcon className="w-5 h-5 text-primary" />
        </div>
        <h1 className="text-lg font-bold text-foreground">MUSAB&CO</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.submenu ? (
              <>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedItems.includes(item.label) ? "rotate-90" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    expandedItems.includes(item.label) ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-8 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Link
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className={`w-5 h-5 transition-all duration-200 ${
                  isActive(item.href) ? "scale-110" : "group-hover:scale-110 group-hover:text-primary"
                }`} />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Social Links */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
          Connect with us
        </p>
        <div className="flex gap-3">
          <a
            href="https://x.com/MusabandCo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 hover:scale-110 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/musab.co.pk/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 hover:scale-110 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/musabandco/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 hover:scale-110 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  )
}
