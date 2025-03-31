"use client"

import Link from "next/link"
import { AnimatedElement } from "@/app/components/motion"
import { BrainCircuit, Database, LanguagesIcon, LineChart, MessageSquare } from "lucide-react"
import type { JSX } from "react"

interface ProductsDropdownProps {
  onClose: () => void
}

type ProductItem = {
  icon: JSX.Element
  name: string
  description: string
  href: string
}

const ProductsDropdown = ({ onClose }: ProductsDropdownProps) => {
  const products: ProductItem[] = [
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      name: "Platform Overview",
      description: "The leading AI platform for revenue transformation",
      href: "/product/platform-overview",
    },
    {
      icon: <LineChart className="h-6 w-6 text-primary" />,
      name: "Glynac Forecast",
      description: "Pinpoint your number and paths to target",
      href: "/product/forecast",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      name: "Glynac Engage",
      description: "Sales engagement reimagined with AI",
      href: "/product/engage",
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      name: "Glynac Data Engine",
      description: "Power your systems with Glynac Data",
      href: "/product/data-engine",
    },
    {
      icon: <BrainCircuit className="h-6 w-6 text-primary" />,
      name: "Glynac AI",
      description: "Outperform competition with industry-leading AI",
      href: "/product/ai",
    },
    {
      icon: <LanguagesIcon className="h-6 w-6 text-primary" />,
      name: "Languages",
      description: "Glynac supports 70+ languages",
      href: "/product/languages",
    },
  ]

  return (
    <div
      className="absolute left-0 top-full z-50 mt-1 w-screen max-w-md overflow-hidden rounded-md border shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mega-menu"
      onMouseLeave={onClose}
    >
      <div className="p-6">
        <div className="mb-4 uppercase text-xs font-semibold text-muted-foreground tracking-wider">PRODUCTS</div>
        <div className="grid gap-4">
          {products.map((product, index) => (
            <AnimatedElement key={product.name} animation="fadeIn" delay={index * 0.04} className="product-card">
              <Link
                href={product.href}
                className="flex items-start gap-4 p-3 transition-colors hover:bg-accent rounded-md"
                onClick={onClose}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-background">
                  {product.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{product.description}</p>
                </div>
              </Link>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsDropdown

