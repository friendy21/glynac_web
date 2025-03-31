import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return NextResponse.json({ error: "Invalid session ID" }, { status: 400 })
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

    return NextResponse.json({
      success: true,
      planName: planMap[planId] || "Unknown Plan",
      billingCycle: billingCycle === "annual" ? "Annual" : "Monthly",
    })
  } catch (error) {
    console.error("Error verifying session:", error)
    return NextResponse.json({ error: "Error verifying session", details: String(error) }, { status: 500 })
  }
}

