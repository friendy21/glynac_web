"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedElement } from "@/app/components/motion"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"

interface Plan {
  id: string
  name: string
  description: string
  price: number | string
  features: string[]
  popular: boolean
  isPro?: boolean
}

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({})
  const { toast } = useToast()
  const { theme } = useTheme()

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
    },
  }

  // Pricing plans that align with Stripe integration
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
      // 1. Get Stripe instance (via dynamic import to avoid SSR issues)
      const { loadStripe } = await import('@stripe/stripe-js')
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      
      if (!publishableKey) {
        throw new Error("Missing Stripe publishable key")
      }
      
      const stripe = await loadStripe(publishableKey)
      
      if (!stripe) {
        throw new Error("Failed to initialize Stripe")
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

      // 3. Redirect to checkout
      if (session.url) {
        window.location.href = session.url
        return
      } else if (session.id) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        })

        if (error) {
          throw error
        }
      } else {
        throw new Error("Invalid session response")
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
      <div className="relative flex h-72 content-center items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="col-span-1 row-span-1 rounded-full bg-primary/5"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.1, 0.2, 0.1], 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut" 
              }}
            />
          ))}
        </div>
        <div className="container mx-auto text-center z-10 relative">
          <h1 className="mb-4 font-black text-5xl drop-shadow">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground">
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
      <section className="px-4 py-10">
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
                  className={`relative shadow-lg ${
                    plan.isPro
                      ? "border-primary shadow-primary/20 dark:shadow-primary/10"
                      : "border-border"
                  } rounded-2xl p-6 transition-transform duration-300 h-full flex flex-col overflow-hidden`}
                >
                  <div className={`absolute -top-10 left-0 w-full h-20 ${plan.isPro ? "bg-primary/50" : "bg-muted"} rounded-b-full`}></div>
                  <div className="absolute -top-10 left-0 w-full h-20 bg-muted rounded-b-full blur-lg"></div>

                  <CardHeader className="text-center pb-2">
                    <CardTitle className={`mt-10 mb-4 font-bold ${plan.isPro ? "text-primary" : ""}`}>
                      {plan.name}
                    </CardTitle>
                    <div className="mb-6 text-center font-extrabold text-3xl text-primary">
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
                    <CardDescription>
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <ul className="list-none text-center space-y-3 mb-6 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="inline-block w-5 text-center">🔘</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button
                      className={`w-full ${
                        plan.isPro
                          ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/30"
                          : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      } rounded-full transition-all duration-300`}
                      onClick={() => handleCheckout(plan.id)}
                      disabled={isLoading[plan.id]}
                    >
                      {isLoading[plan.id] ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
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
              <span className="text-primary">Q:</span>
              Can I change plans later?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately at the start of your next billing cycle.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <span className="text-primary">Q:</span>
              What payment methods do you accept?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for annual plans via our secure Stripe payment system.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <span className="text-primary">Q:</span>
              Is there a free trial?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes, all paid plans come with a 14-day free trial. No credit card required to start exploring our platform.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <span className="text-primary">Q:</span>
              Can I cancel anytime?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes, you can cancel your subscription at any time with no cancellation fees. Your service will continue until the end of your billing period.
            </p>
          </div>
        </div>
      </AnimatedElement>

      {/* Enterprise Call-to-Action */}
      <AnimatedElement animation="fadeIn" delay={0.6} className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto rounded-lg bg-primary/5 p-8 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">Need a custom enterprise solution?</h3>
              <p className="text-muted-foreground mt-2">
                Contact our sales team for a tailored package that meets your organization's specific requirements.
              </p>
            </div>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Contact Sales
            </Button>
          </div>
        </div>
      </AnimatedElement>
    </div>
  )
}

export default PricingPage