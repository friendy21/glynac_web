"use client"

import { useState } from "react"
import { Check, HelpCircle, CreditCard } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedElement } from "../components/motion"

interface Plan {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  popular: boolean
}

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({})

  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for individuals and small teams just getting started.",
      price: billingCycle === "monthly" ? 29 : 290,
      features: ["Basic AI analysis tools", "5 team members", "10GB storage", "Email support", "Basic reporting"],
      popular: false,
    },
    {
      id: "professional",
      name: "Professional",
      description: "Ideal for growing businesses with advanced needs.",
      price: billingCycle === "monthly" ? 79 : 790,
      features: [
        "Advanced AI analysis tools",
        "20 team members",
        "50GB storage",
        "Priority email & chat support",
        "Advanced reporting",
        "Custom integrations",
        "API access",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations requiring maximum security and support.",
      price: billingCycle === "monthly" ? 199 : 1990,
      features: [
        "Full AI analysis suite",
        "Unlimited team members",
        "500GB storage",
        "24/7 phone, email & chat support",
        "Custom reporting",
        "Dedicated account manager",
        "Advanced security features",
        "Custom deployment options",
        "SLA guarantees",
      ],
      popular: false,
    },
  ]

  const handleCheckout = async (planId: string) => {
    setIsLoading({ ...isLoading, [planId]: true })

    try {
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
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const session = await response.json()

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        })

        if (error) {
          console.error("Error redirecting to checkout:", error)
          alert("There was an error processing your payment. Please try again.")
        }
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
      alert("There was an error processing your payment. Please try again.")
    } finally {
      setIsLoading({ ...isLoading, [planId]: false })
    }
  }

  return (
    <div className="container px-4 py-12 md:py-24 lg:py-32">
      <AnimatedElement animation="fadeIn" className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Choose the plan that's right for your business. All plans include a 14-day free trial.
        </p>
      </AnimatedElement>

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

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <AnimatedElement key={plan.id} animation="fadeIn" delay={0.1}>
            <Card className={`relative h-full overflow-hidden ${plan.popular ? "border-primary" : ""}`}>
              {plan.popular && (
                <div className="absolute right-0 top-0">
                  <div className="bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Most Popular</div>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {plan.id === "enterprise" ? (
                  <Button className="w-full" variant="outline" onClick={() => (window.location.href = "/contact")}>
                    Contact Sales
                  </Button>
                ) : (
                  <Button
                    className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                    onClick={() => handleCheckout(plan.id)}
                    disabled={isLoading[plan.id]}
                  >
                    {isLoading[plan.id] ? (
                      "Processing..."
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Subscribe
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </AnimatedElement>
        ))}
      </div>

      <AnimatedElement animation="fadeIn" delay={0.4} className="mt-16 rounded-lg border bg-muted p-6 md:p-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div>
            <h3 className="text-xl font-bold">Need a custom solution?</h3>
            <p className="text-muted-foreground">Contact our sales team to discuss your specific requirements.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => (window.location.href = "/contact")}>
            Contact Sales
          </Button>
        </div>
      </AnimatedElement>

      <AnimatedElement animation="fadeIn" delay={0.5} className="mt-16">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <HelpCircle className="h-5 w-5 text-primary" />
              Can I change plans later?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <HelpCircle className="h-5 w-5 text-primary" />
              What payment methods do you accept?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for annual plans.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <HelpCircle className="h-5 w-5 text-primary" />
              Is there a free trial?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes, all plans come with a 14-day free trial. No credit card required to start.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <HelpCircle className="h-5 w-5 text-primary" />
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

