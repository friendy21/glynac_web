"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedElement } from "@/app/components/motion"
import { useToast } from "@/hooks/use-toast"

interface SubscriptionDetails {
  planName: string
  billingCycle: string
  customerId?: string
  subscription?: {
    subscriptionId: string
    status?: string
    currentPeriodEnd?: string
  }
  paymentStatus?: string
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const router = useRouter()
  const { toast } = useToast()
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        toast({
          title: "Error",
          description: "Missing session ID. Please try again or contact support.",
          variant: "destructive",
        })
        setStatus("error")
        return
      }

      try {
        // Verify the session and get subscription details
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to verify session")
        }
        
        const data = await response.json()
        
        if (data.success) {
          setStatus("success")
          setSubscription({
            planName: data.planName,
            billingCycle: data.billingCycle,
            customerId: data.customerId,
            subscription: data.subscription,
            paymentStatus: data.paymentStatus,
          })
          
          // Show success toast
          toast({
            title: "Subscription Confirmed",
            description: `Thank you for subscribing to the ${data.planName} plan!`,
          })
        } else {
          throw new Error(data.error || "Unknown error occurred")
        }
      } catch (error: any) {
        console.error("Error verifying session:", error)
        setStatus("error")
        
        toast({
          title: "Verification Failed",
          description: error.message || "We couldn't confirm your subscription. Please contact support.",
          variant: "destructive",
        })
      }
    }

    verifySession()
  }, [sessionId, toast])

  const handleRedirectToDashboard = () => {
    setIsRedirecting(true)
    // Redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard")
    }, 500)
  }

  return (
    <div className="container px-4 py-12 md:py-24 lg:py-32">
      <AnimatedElement animation="fadeIn" className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            {status === "loading" && (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
                <CardTitle>Processing your subscription...</CardTitle>
                <CardDescription>Please wait while we confirm your payment.</CardDescription>
              </>
            )}

            {status === "success" && (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Subscription Confirmed!</CardTitle>
                <CardDescription>
                  Thank you for subscribing to GLYNAC.AI. Your account has been successfully set up.
                </CardDescription>
              </>
            )}

            {status === "error" && (
              <>
                <CardTitle>Something went wrong</CardTitle>
                <CardDescription>
                  We couldn't confirm your subscription. Please contact our support team for assistance.
                </CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent>
            {status === "success" && subscription && (
              <div className="mt-4 rounded-lg bg-muted p-4">
                <h3 className="font-medium">Subscription Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan:</span>
                    <span className="font-medium">{subscription.planName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Billing Cycle:</span>
                    <span className="font-medium">{subscription.billingCycle}</span>
                  </div>
                  {subscription.subscription && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium capitalize">{subscription.subscription.status || "active"}</span>
                      </div>
                      {subscription.subscription.currentPeriodEnd && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Next billing date:</span>
                          <span className="font-medium">
                            {new Date(subscription.subscription.currentPeriodEnd).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="mt-4 rounded-lg bg-destructive/10 p-4 text-destructive">
                <p className="text-sm">
                  Error verifying your subscription. If you believe this is a mistake, please contact our support team
                  with the following session ID:
                </p>
                <div className="mt-2 overflow-x-auto rounded bg-background p-2 font-mono text-xs">
                  {sessionId || "No session ID provided"}
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center gap-4">
            {status === "success" && (
              <>
                <Button onClick={handleRedirectToDashboard} disabled={isRedirecting}>
                  {isRedirecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Redirecting...
                    </>
                  ) : (
                    "Go to Dashboard"
                  )}
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Home
                  </Link>
                </Button>
              </>
            )}

            {status === "error" && (
              <>
                <Button asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/pricing">Return to Pricing</Link>
                </Button>
              </>
            )}

            {status === "loading" && (
              <Button variant="outline" asChild>
                <Link href="/pricing">Return to Pricing</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </AnimatedElement>
    </div>
  )
}