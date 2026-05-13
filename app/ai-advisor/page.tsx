"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Bot, Send, Sparkles, TrendingUp, Shield, PiggyBank } from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

const suggestedQuestions = [
  { icon: TrendingUp, text: "What stocks should I invest in?", category: "Investment" },
  { icon: Shield, text: "How do I diversify my portfolio?", category: "Risk" },
  { icon: PiggyBank, text: "Best savings strategies for 2024?", category: "Savings" },
  { icon: Sparkles, text: "Explain cryptocurrency basics", category: "Crypto" },
]

const aiResponses: Record<string, string> = {
  "What stocks should I invest in?": "Based on the current PSX market conditions, consider looking into:\n\n1. **Banking Sector**: HBL and MCB show strong fundamentals with good dividend yields.\n\n2. **Energy Sector**: OGDC and PPL are worth considering for long-term value.\n\n3. **Cement Sector**: Lucky Cement (LUCK) has shown consistent growth.\n\nRemember to always do your own research and consider your risk tolerance before investing.",
  "How do I diversify my portfolio?": "Portfolio diversification is key to managing risk. Here are some strategies:\n\n1. **Asset Classes**: Spread investments across stocks, bonds, and crypto.\n\n2. **Sectors**: Don't put all funds in one industry - mix banking, energy, tech, etc.\n\n3. **Geographic**: Consider international ETFs alongside local PSX stocks.\n\n4. **60/40 Rule**: A classic approach is 60% stocks, 40% bonds.\n\nYour current portfolio shows heavy concentration in banking - consider adding exposure to other sectors.",
  "Best savings strategies for 2024?": "Here are effective savings strategies for 2024:\n\n1. **50/30/20 Rule**: 50% needs, 30% wants, 20% savings.\n\n2. **Emergency Fund**: Build 6 months of expenses first.\n\n3. **Automated Savings**: Set up automatic transfers on payday.\n\n4. **High-Yield Accounts**: Consider NSS certificates for tax-free returns.\n\n5. **SIP Investing**: Start a Systematic Investment Plan in mutual funds.\n\nBased on your portfolio, you're doing well but could increase monthly contributions.",
  "Explain cryptocurrency basics": "Here's a quick overview of cryptocurrency:\n\n**What is it?**\nDigital currency secured by cryptography, operating on blockchain technology.\n\n**Key Coins**:\n- **Bitcoin (BTC)**: The original, store of value\n- **Ethereum (ETH)**: Smart contracts platform\n- **Stablecoins (USDT)**: Pegged to USD\n\n**Getting Started**:\n1. Use reputable exchanges (Binance, Coinbase)\n2. Start small - maybe 5-10% of portfolio\n3. Never invest more than you can afford to lose\n\nYour current crypto allocation shows BTC and ETH - good choices for beginners!",
}

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI Financial Advisor. I can help you with investment strategies, portfolio analysis, market insights, and financial planning. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = (question?: string) => {
    const userMessage = question || input
    if (!userMessage.trim()) return

    const newUserMessage: Message = {
      id: Date.now(),
      role: "user",
      content: userMessage,
    }
    setMessages((prev) => [...prev, newUserMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = aiResponses[userMessage] || "That's a great question! Based on your portfolio data, I'd recommend reviewing your current asset allocation and considering your long-term financial goals. Would you like me to analyze any specific aspect of your investments?"
      
      const newAssistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: response,
      }
      setMessages((prev) => [...prev, newAssistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <div className="max-w-4xl mx-auto h-[calc(100vh-3rem)] flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Financial Advisor</h1>
                <p className="text-muted-foreground">Get personalized investment advice and insights</p>
              </div>
            </div>
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q.text)}
                  className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors text-left"
                >
                  <div className="p-2 bg-secondary rounded-lg">
                    <q.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{q.category}</p>
                    <p className="text-sm text-foreground mt-1">{q.text}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-primary">AI Advisor</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-primary" />
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="bg-card border border-border rounded-xl p-2 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything about your finances..."
              className="flex-1 bg-transparent px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
