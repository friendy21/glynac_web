import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import MenuBar from "./components/menu/MenuBar"
import Footer from "./widgets/layout/footer/Footer"
import ChatBotProvider from "./components/chat/ChatBotProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Glynac.AI - AI-Powered Solutions",
  description: "Glynac provides AI-powered solutions for business transformation",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ChatBotProvider>
            <div className="flex min-h-screen flex-col">
              <MenuBar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ChatBotProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

