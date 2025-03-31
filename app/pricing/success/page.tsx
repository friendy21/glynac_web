"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedElement } from "@/app/components/motion"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [subscription, setSubscription] = useState<{
    planName: string
    billingCycle: string
  } | null>(null)

  useEffect(() => {
    if (sessionId) {
      // Verify the session and get subscription details
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setStatus("success")
            setSubscription({
              planName: data.planName,
              billingCycle: data.billingCycle,
            })
          } else {
            setStatus("error")
          }
        })
        .catch(() => {
          setStatus("error")
        })
    } else {
      setStatus("error")
    }
  }, [sessionId])

  return (
    <div className="container px-4 py-12 md:py-24 lg:py-32">
      <AnimatedElement animation="fadeIn" className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            {status === "loading" && (
              <>
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
                  Thank you for subscribing to Glynac. Your account has been successfully set up.
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
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </AnimatedElement>
    </div>
  )
}

