"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface MarketSession {
  name: string
  status: "OPEN" | "CLOSED"
  hours: string
}

function getMarketSessions(): { sessions: MarketSession[]; time: string } {
  const now = new Date()
  const pktHour = now.getUTCHours() + 5 // PKT is UTC+5
  const adjustedHour = pktHour >= 24 ? pktHour - 24 : pktHour

  const sessions: MarketSession[] = [
    {
      name: "LONDON",
      status: adjustedHour >= 12 && adjustedHour < 17 ? "OPEN" : "CLOSED",
      hours: "12:00 – 17:00 PKT",
    },
    {
      name: "NEW YORK",
      status: adjustedHour >= 18 && adjustedHour < 22 ? "OPEN" : "CLOSED",
      hours: "18:00 – 22:00 PKT",
    },
    {
      name: "PSX",
      status: adjustedHour >= 10 && adjustedHour < 15 ? "OPEN" : "CLOSED",
      hours: "10:00 – 15:00 PKT",
    },
  ]

  const hours = now.getUTCHours() + 5
  const minutes = now.getUTCMinutes()
  const displayHours = hours >= 24 ? hours - 24 : hours
  const time = `${displayHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`

  return { sessions, time }
}

export function MarketSessions() {
  const [data, setData] = useState(getMarketSessions())

  useEffect(() => {
    const interval = setInterval(() => {
      setData(getMarketSessions())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Market Sessions</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {data.time} <span className="text-xs">PKT</span>
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {data.sessions.map((session) => (
          <div
            key={session.name}
            className="bg-secondary/50 border border-border rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground tracking-wider">
                {session.name}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${
                  session.status === "OPEN" ? "bg-primary" : "bg-muted-foreground"
                }`}
              />
            </div>
            <p
              className={`font-semibold text-sm ${
                session.status === "OPEN" ? "text-primary" : "text-foreground"
              }`}
            >
              {session.status}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{session.hours}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
