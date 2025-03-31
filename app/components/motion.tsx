"use client"

import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedElementProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  animation?: "fadeIn" | "slideIn" | "scaleIn" | "float"
  once?: boolean
}

export function AnimatedElement({
  children,
  className,
  delay = 0,
  duration = 0.5,
  animation = "fadeIn",
  once = true,
}: AnimatedElementProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [once])

  const getAnimationClass = () => {
    switch (animation) {
      case "fadeIn":
        return "opacity-0 transition-opacity"
      case "slideIn":
        return "opacity-0 -translate-x-4 transition-all"
      case "scaleIn":
        return "opacity-0 scale-95 transition-all"
      case "float":
        return "transition-transform"
      default:
        return "opacity-0 transition-opacity"
    }
  }

  const getVisibleClass = () => {
    switch (animation) {
      case "fadeIn":
        return "opacity-100"
      case "slideIn":
        return "opacity-100 translate-x-0"
      case "scaleIn":
        return "opacity-100 scale-100"
      case "float":
        return "animate-float"
      default:
        return "opacity-100"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(getAnimationClass(), isVisible && getVisibleClass(), className)}
      style={{
        transitionDelay: `${delay}s`,
        transitionDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  )
}

