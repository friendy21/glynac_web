"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageSquare, Send, X, Loader2, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    content: "Hello! I'm Glynac Assistant. How can I help you today?",
    role: "assistant",
    timestamp: new Date(),
  },
]

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(
      () => {
        const botResponse = generateResponse(input)
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          role: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  // Simple response generator - in a real app, this would be replaced with an API call
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("pricing") || input.includes("cost") || input.includes("price")) {
      return "Our pricing plans start at $29/month for the Starter plan. You can view all our pricing options on our pricing page. Would you like me to provide more details about a specific plan?"
    }

    if (input.includes("demo") || input.includes("trial")) {
      return "We offer a 14-day free trial for all our plans. No credit card required to start. Would you like me to help you set up a trial account?"
    }

    if (
      input.includes("ai") ||
      input.includes("analysis") ||
      input.includes("qualitative") ||
      input.includes("quantitative")
    ) {
      return "Our AI analysis tools include both qualitative and quantitative analysis capabilities. Our AI can process large datasets, identify patterns, and generate insights much faster than traditional methods. Would you like to learn more about a specific analysis type?"
    }

    if (input.includes("security") || input.includes("data protection") || input.includes("privacy")) {
      return "Security is our top priority. We use end-to-end encryption, regular security audits, and comply with major regulations like GDPR and SOC 2 Type II. Would you like to speak with our security team for more details?"
    }

    if (input.includes("contact") || input.includes("support") || input.includes("help")) {
      return "Our support team is available Monday-Friday, 9AM-6PM EST. You can reach us at support@glynac.ai or through our contact page. Would you like me to connect you with a support agent?"
    }

    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! How can I assist you with Glynac's services today?"
    }

    return "Thank you for your message. I'm not sure I understand your question. Could you provide more details or ask about our pricing, AI analysis tools, security, or support options?"
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#87CEEB] to-[#1E90FF] text-white shadow-lg transition-all hover:shadow-xl"
        aria-label="Open chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] flex-col rounded-xl border bg-white shadow-xl dark:bg-gray-900 sm:w-[400px]"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#87CEEB] to-[#1E90FF]">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Glynac Assistant</h3>
                  <p className="text-xs text-muted-foreground">Customer Support</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleChat}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-2",
                        message.role === "user"
                          ? "bg-gradient-to-r from-[#87CEEB] to-[#1E90FF] text-white"
                          : "bg-gray-100 dark:bg-gray-800",
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="mt-1 text-right text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={handleInputChange}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
                  {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot

