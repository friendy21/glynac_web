"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, X, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Interface for chat messages
interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  quickReplies?: string[]; // Optional quick reply options
}

// Initial welcome message
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    content: "Hello! I'm Glynac Assistant. How can I help you today?",
    role: "assistant",
    timestamp: new Date(),
    quickReplies: ["Pricing", "Demo", "Features"],
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null); // Context tracking
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response with delay
    setTimeout(() => {
      const { content, quickReplies } = generateResponse(input);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content,
        role: "assistant",
        timestamp: new Date(),
        quickReplies,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  // Handle quick reply clicks
  const handleQuickReply = (reply: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: reply,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const { content, quickReplies } = generateResponse(reply);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content,
        role: "assistant",
        timestamp: new Date(),
        quickReplies,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Local response generator with context awareness
  const generateResponse = (userInput: string): { content: string; quickReplies?: string[] } => {
    const input = userInput.toLowerCase().replace(/[^\w\s]/g, ""); // Normalize input

    // Response definitions
    const responses = [
      {
        keywords: ["pricing", "cost", "price"],
        response: "Our pricing plans start at $29/month for the Starter plan. We also have Pro at $99/month and Enterprise at $499/month. Want details on a specific plan?",
        quickReplies: ["Starter", "Pro", "Enterprise"],
        topic: "pricing",
      },
      {
        keywords: ["demo", "trial"],
        response: "We offer a 14-day free trial for all plans—no credit card needed. Would you like to know how to start one?",
        quickReplies: ["Yes", "No"],
        topic: "demo",
      },
      {
        keywords: ["ai", "analysis", "features", "qualitative", "quantitative"],
        response: "Our AI tools handle both qualitative and quantitative analysis, processing large datasets quickly. Want to dive into a specific feature?",
        quickReplies: ["Qualitative", "Quantitative"],
        topic: "features",
      },
      {
        keywords: ["security", "privacy", "data protection"],
        response: "We prioritize security with end-to-end encryption and GDPR compliance. Need more details?",
        quickReplies: ["Yes", "No"],
        topic: "security",
      },
      {
        keywords: ["contact", "support", "help"],
        response: "Our support team is available Monday-Friday, 9AM-6PM EST at support@glynac.ai. Want me to connect you?",
        quickReplies: ["Yes", "No"],
        topic: "support",
      },
      {
        keywords: ["hello", "hi", "hey"],
        response: "Hi there! How can I assist you today?",
        quickReplies: ["Pricing", "Demo", "Features"],
        topic: null,
      },
    ];

    // Check context for follow-ups
    if (currentTopic === "pricing") {
      if (input.includes("starter")) {
        setCurrentTopic(null);
        return { content: "The Starter plan is $29/month and includes basic features." };
      }
      if (input.includes("pro")) {
        setCurrentTopic(null);
        return { content: "The Pro plan is $99/month with advanced analytics." };
      }
      if (input.includes("enterprise")) {
        setCurrentTopic(null);
        return { content: "The Enterprise plan is $499/month with full support." };
      }
    } else if (currentTopic === "demo") {
      if (input.includes("yes")) {
        setCurrentTopic(null);
        return { content: "Great! Visit our website and click 'Start Trial' to begin." };
      }
      if (input.includes("no")) {
        setCurrentTopic(null);
        return { content: "No problem! Anything else I can help with?" };
      }
    } else if (currentTopic === "features") {
      if (input.includes("qualitative")) {
        setCurrentTopic(null);
        return { content: "Qualitative analysis helps you understand text data insights." };
      }
      if (input.includes("quantitative")) {
        setCurrentTopic(null);
        return { content: "Quantitative analysis crunches numbers fast." };
      }
    } else if (currentTopic === "security" || currentTopic === "support") {
      if (input.includes("yes")) {
        setCurrentTopic(null);
        return { content: "I’ll pass you to a human agent soon. For now, check our website!" };
      }
      if (input.includes("no")) {
        setCurrentTopic(null);
        return { content: "Okay, let me know what else you need!" };
      }
    }

    // Match input to responses
    for (const { keywords, response, quickReplies, topic } of responses) {
      if (keywords.some((keyword) => input.includes(keyword))) {
        setCurrentTopic(topic);
        return { content: response, quickReplies };
      }
    }

    // Default response
    setCurrentTopic(null);
    return {
      content: "I’m not sure I understand. Could you ask about pricing, demo, or features?",
      quickReplies: ["Pricing", "Demo", "Features"],
    };
  };

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
                      {message.quickReplies && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.quickReplies.map((reply) => (
                            <Button
                              key={reply}
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickReply(reply)}
                            >
                              {reply}
                            </Button>
                          ))}
                        </div>
                      )}
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
  );
};

export default ChatBot;