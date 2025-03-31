import { Metadata } from "next"
import PricingPage from "./pricing"

export const metadata: Metadata = {
  title: "Pricing | GLYNAC.AI",
  description: "Explore our pricing plans and choose the package that best fits your business needs.",
}

export default function Page() {
  return <PricingPage />
}