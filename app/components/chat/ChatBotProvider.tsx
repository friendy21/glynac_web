"use client"

import type { ReactNode } from "react"
import ChatBot from "./chatbot"

interface ChatBotProviderProps {
  children: ReactNode
}

const ChatBotProvider = ({ children }: ChatBotProviderProps) => {
  return (
    <>
      {children}
      <ChatBot />
    </>
  )
}

export default ChatBotProvider

