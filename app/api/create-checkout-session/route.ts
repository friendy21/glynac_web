import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    const { planId, billingCycle } = await request.json()

    // Validate inputs
    if (!planId || !billingCycle) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      )
    }

    // Set price based on plan and billing cycle - matching pricing page
    let unitAmount
    switch (planId) {
      case "starter":
        unitAmount = billingCycle === "monthly" ? 10000 : 100000 // $100/month or $1000/year
        break
      case "advanced":
        unitAmount = billingCycle === "monthly" ? 20000 : 200000 // $200/month or $2000/year
        break
      case "pro":
        unitAmount = billingCycle === "monthly" ? 30000 : 300000 // $300/month or $3000/year
        break
      default:
        return NextResponse.json(
          { error: "Invalid plan ID" },
          { status: 400 }
        )
    }

    const productName = planId.charAt(0).toUpperCase() + planId.slice(1)
    const interval = billingCycle === "monthly" ? "month" : "year"

    // First, try to find existing product
    const existingProducts = await stripe.products.list({
      active: true,
      limit: 100,
    })
    let product = existingProducts.data.find(
      (p) => p.name === `${productName} Plan`
    )

    // Create product if it doesn't exist
    if (!product) {
      product = await stripe.products.create({
        name: `${productName} Plan`,
        description: `${productName} subscription plan`,
      })
    }

    // Try to find existing price that matches our criteria
    const existingPrices = await stripe.prices.list({
      product: product.id,
      active: true,
      limit: 100,
    })

    let price = existingPrices.data.find(
      (p) =>
        p.unit_amount === unitAmount &&
        p.currency === "usd" &&
        p.recurring?.interval === interval
    )

    // Create price if it doesn't exist
    if (!price) {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: unitAmount,
        currency: "usd",
        recurring: {
          interval,
        },
      })
    }

    // Create a unique checkout session with customer-specific metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      metadata: {
        planId,
        billingCycle,
        timestamp: new Date().toISOString(), // Add timestamp for uniqueness
      },
      // Optional: Add customer email if available
      // customer_email: customer.email,
    })

    return NextResponse.json({ id: session.id })
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json(
      { error: `Error creating checkout session: ${error.message}` },
      { status: 500 }
    )
  }
}