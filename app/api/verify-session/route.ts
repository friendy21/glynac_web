import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with better error handling
const getStripeInstance = () => {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  
  if (!stripeKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable")
  }
  
  return new Stripe(stripeKey, {
    apiVersion: "2023-10-16", // Using an explicit API version
  })
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" }, 
        { status: 400 }
      )
    }

    const stripe = getStripeInstance()

    // Retrieve the checkout session with expanded data
    const session = await stripe.checkout.sessions.retrieve(
      sessionId,
      {
        expand: ['subscription', 'customer']
      }
    )

    if (!session) {
      return NextResponse.json(
        { error: "Invalid session ID" }, 
        { status: 400 }
      )
    }

    // Map plan IDs to names
    const planMap: { [key: string]: string } = {
      starter: "Starter",
      professional: "Professional",
      enterprise: "Enterprise",
    }

    // Get plan details from metadata
    const planId = session.metadata?.planId || ""
    const billingCycle = session.metadata?.billingCycle || ""
    
    // Add subscription info if available
    const subscriptionInfo = session.subscription 
      ? {
          subscriptionId: typeof session.subscription === 'string' 
            ? session.subscription 
            : session.subscription.id,
          status: typeof session.subscription === 'string'
            ? null
            : session.subscription.status,
          currentPeriodEnd: typeof session.subscription === 'string'
            ? null
            : new Date(session.subscription.current_period_end * 1000).toISOString(),
        }
      : null;

    return NextResponse.json({
      success: true,
      planName: planMap[planId] || "Unknown Plan",
      billingCycle: billingCycle === "annual" ? "Annual" : "Monthly",
      customerId: typeof session.customer === 'string' 
        ? session.customer 
        : session.customer?.id,
      subscription: subscriptionInfo,
      paymentStatus: session.payment_status,
    })
  } catch (error: any) {
    console.error("Error verifying session:", error)
    return NextResponse.json(
      { 
        error: "Error verifying session", 
        details: error.message 
      }, 
      { status: 500 }
    )
  }
}