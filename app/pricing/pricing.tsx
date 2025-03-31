"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { CreditCard, Check } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedElement } from "../components/motion"
import { useToast } from "@/hooks/use-toast"

interface Plan {
  id: string
  name: string
  description: string
  price: number | string
  features: string[]
  popular: boolean
  isPro?: boolean
}

interface Particle {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  color: string
}

// Initialize Stripe with error handling
const getStripe = async () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  
  if (!publishableKey) {
    console.error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable")
    return null
  }
  
  return await loadStripe(publishableKey)
}

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({})
  const { toast } = useToast()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const numParticles = 100
    const particles: Particle[] = []

    // Resize canvas to match its container
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Recreate particles for new dimensions
      particles.length = 0
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
          color: `hsla(${Math.random() * 360}, 100%, 100%, 1)`,
        })
      }
    }

    // Set initial size and listen for resize
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap particles around edges
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Draw glowing particles
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 15
        ctx.shadowColor = particle.color
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup resources
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
    },
  }

  // Pricing plans that align with your Stripe integration
  const plans: Plan[] = [
    {
      id: "basic",
      name: "BASIC",
      description: "Perfect for individual users or small teams",
      price: "Free",
      features: [
        "Basic Communication Monitoring",
        "Message Frequency Analysis",
        "Visualization",
        "20 Devices"
      ],
      popular: false
    },
    {
      id: "starter",
      name: "STARTER",
      description: "Ideal for growing businesses",
      price: billingCycle === "monthly" ? 100 : 1000,
      features: [
        "Relationship Mapping",
        "Department Mapping",
        "Keywords Trends",
        "Happiness Trends",
        "Responsiveness Metrics",
        "Trend Analysis",
        "25 Devices"
      ],
      popular: true
    },
    {
      id: "advanced",
      name: "ADVANCED",
      description: "For businesses with advanced needs",
      price: billingCycle === "monthly" ? 200 : 2000,
      features: [
        "Language Categorization",
        "Sentiment Analysis",
        "Sentiment Mapping",
        "Pay Issues Analysis",
        "Manager Analysis",
        "Ownership Sentiment Analysis",
        "250 Devices"
      ],
      popular: false
    },
    {
      id: "pro",
      name: "PRO",
      description: "Full-featured solution for enterprises",
      price: billingCycle === "monthly" ? 300 : 3000,
      features: [
        "All Advanced Features",
        "API Agent Integration",
        "Retention Insights",
        "Keyword Trends",
        "Happiness Trends",
        "350 Devices"
      ],
      popular: false,
      isPro: true
    }
  ]

  const handleCheckout = async (planId: string) => {
    // Skip checkout for the free plan
    if (planId === "basic") {
      toast({
        title: "Free Plan Selected",
        description: "You can start using the basic features immediately!",
      })
      return
    }
    
    setIsLoading({ ...isLoading, [planId]: true })

    try {
      // 1. Get Stripe instance
      const stripe = await getStripe()
      
      if (!stripe) {
        throw new Error("Stripe failed to initialize")
      }

      // 2. Create checkout session on the server
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId,
          billingCycle,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const session = await response.json()

      // 3. If session.url is provided, redirect directly (newer Stripe approach)
      if (session.url) {
        window.location.href = session.url
        return
      }

      // 4. Otherwise use redirectToCheckout with sessionId (fallback)
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error)
      
      toast({
        title: "Checkout Error",
        description: error.message || "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading({ ...isLoading, [planId]: false })
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section with Canvas Animation */}
      <div className="relative flex h-72 content-center items-center justify-center overflow-hidden bg-gray-900">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/20 to-pink-500/10 backdrop-blur-xl"></div>
        <div className="container mx-auto text-center z-10 relative">
          <h1 className="mb-4 font-black text-5xl text-white drop-shadow-lg">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-white/80">
            Choose the plan that's right for your business
          </p>
        </div>
      </div>

      {/* Pricing Controls */}
      <div className="container mx-auto px-4">
        <div className="mx-auto mt-8 flex max-w-xs items-center justify-center space-x-2 rounded-lg border p-1">
          <Button
            variant={billingCycle === "monthly" ? "default" : "ghost"}
            className={billingCycle === "monthly" ? "bg-primary hover:bg-primary/90" : ""}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === "annual" ? "default" : "ghost"}
            className={billingCycle === "annual" ? "bg-primary hover:bg-primary/90" : ""}
            onClick={() => setBillingCycle("annual")}
          >
            Annual (Save 20%)
          </Button>
        </div>
      </div>

      {/* Pricing Cards */}
      <section className="bg-white px-4 py-10">
        <motion.div
          className="relative container mx-auto py-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            {plans.map((plan) => (
              <motion.div key={plan.id} variants={cardVariants} whileHover="hover">
                <Card
                  className={`relative shadow-lg border ${
                    plan.isPro
                      ? "border-gray-700 shadow-gray-500 bg-gradient-to-b from-gray-900 to-gray-800 text-white"
                      : "border-gray-300 bg-gradient-to-b from-gray-200 to-white"
                  } rounded-2xl p-6 hover:shadow-2xl transition-transform duration-300 h-full flex flex-col overflow-hidden`}
                >
                  <div className={`absolute -top-10 left-0 w-full h-20 ${plan.isPro ? "bg-gray-700" : "bg-gray-300"} rounded-b-full`}></div>
                  <div className="absolute -top-10 left-0 w-full h-20 bg-gray-300 rounded-b-full blur-lg"></div>

                  <CardHeader className="text-center pb-2">
                    <CardTitle className={`mt-10 mb-4 font-bold ${plan.isPro ? "text-white" : "text-gray-800"}`}>
                      {plan.name}
                    </CardTitle>
                    <div className="mb-6 text-center font-extrabold text-3xl text-blue-600">
                      {typeof plan.price === "number" ? (
                        <>
                          ${plan.price}
                          <span className="text-sm font-normal text-muted-foreground">
                            /{billingCycle === "monthly" ? "month" : "year"}
                          </span>
                        </>
                      ) : (
                        plan.price
                      )}
                    </div>
                    <CardDescription className={plan.isPro ? "text-gray-300" : ""}>
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <ul className="list-none text-center space-y-3 mb-6 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className={`flex items-center gap-2 ${plan.isPro ? "" : "text-blue-gray-600"}`}>
                          <span className="inline-block w-5 text-center">🔘</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button
                      className={`w-full ${
                        plan.isPro
                          ? "bg-white text-blue-700 hover:text-white hover:bg-blue-600 border border-gray-300"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      } rounded-full transition-all duration-300`}
                      onClick={() => handleCheckout(plan.id)}
                      disabled={isLoading[plan.id]}
                    >
                      {isLoading[plan.id] ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        <>
                          {plan.id === "basic" ? "Get Started" : (
                            <>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Subscribe
                            </>
                          )}
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <AnimatedElement animation="fadeIn" delay={0.5} className="container mx-auto px-4 mt-16 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="rounded-lg border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Check className="h-5 w-5 text-primary" />
              Can I change plans later?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Check className="h-5 w-5 text-primary" />
              What payment methods do you accept?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for annual plans.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Check className="h-5 w-5 text-primary" />
              Is there a free trial?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes, all plans come with a 14-day free trial. No credit card required to start.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Check className="h-5 w-5 text-primary" />
              Can I cancel anytime?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes, you can cancel your subscription at any time with no cancellation fees.
            </p>
          </div>
        </div>
      </AnimatedElement>
    </div>
  )
}

export default PricingPage