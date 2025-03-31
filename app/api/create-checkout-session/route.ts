import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    const { planId, billingCycle } = await request.json()

    // Create a Stripe product and price if they don't exist
    // This is a simplified approach for testing - in production you'd manage products in Stripe dashboard
    const productName = planId.charAt(0).toUpperCase() + planId.slice(1)

    // Create or retrieve product
    let product
    try {
      product = await stripe.products.create({
        name: `${productName} Plan`,
        description: `${productName} subscription plan`,
      })
    } catch (error) {
      // If product creation fails, try to retrieve existing products
      const products = await stripe.products.list({ limit: 100 })
      product = products.data.find((p) => p.name === `${productName} Plan`)

      if (!product) {
        throw new Error(`Could not create or find product for ${productName} Plan`)
      }
    }

    // Set price based on plan and billing cycle
    let unitAmount
    switch (planId) {
      case "starter":
        unitAmount = billingCycle === "monthly" ? 10000 : 100000
        break
      case "professional":
        unitAmount = billingCycle === "monthly" ? 20000 : 200000
        break
      case "enterprise":
        unitAmount = billingCycle === "monthly" ? 30000 : 300000
        break
      default:
        unitAmount = 999
    }

    // Create price
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: unitAmount,
      currency: "usd",
      recurring: {
        interval: billingCycle === "monthly" ? "month" : "year",
      },
    })

    // Create a checkout session
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
      },
    })

    return NextResponse.json({ id: session.id })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 })
  }
}

