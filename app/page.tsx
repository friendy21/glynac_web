"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle,
  Database,
  LineChart,
  Lock,
  MessageSquare,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedElement } from "./components/motion"

export default function Home() {
  const features = [
    {
      icon: <BrainCircuit className="h-10 w-10 text-primary" />,
      title: "AI Analysis",
      description: "Powerful AI-driven analysis tools for qualitative and quantitative data processing.",
      link: "/ai-analysis",
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: "Data Management",
      description: "Comprehensive data management solutions for all your business needs.",
      link: "/features/data-selection",
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Glynac Forecast",
      description: "Pinpoint your number and paths to target with advanced forecasting.",
      link: "/product/forecast",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Glynac Engage",
      description: "Sales engagement reimagined with AI-powered communication tools.",
      link: "/product/engage",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Enterprise Security",
      description: "Top-tier security measures to protect your sensitive data.",
      link: "/security",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Advanced Analytics",
      description: "Detailed analytics to help you make data-driven decisions.",
      link: "/ai-analysis/ai-quantitative",
    },
  ]

  const testimonials = [
    {
      quote:
        "Glynac has transformed how we analyze our customer data. The AI tools are incredibly powerful yet intuitive.",
      author: "Sarah Johnson",
      role: "CTO, TechCorp",
    },
    {
      quote:
        "The security features in Glynac's platform gave us the confidence to migrate all our sensitive data analysis to their system.",
      author: "Michael Chen",
      role: "Security Director, DataSafe Inc.",
    },
    {
      quote:
        "We've seen a 40% increase in productivity since implementing Glynac's communication tools across our organization.",
      author: "Emily Rodriguez",
      role: "Operations Manager, Global Solutions",
    },
  ]

  const benefits = [
    "Advanced AI analysis capabilities",
    "Enterprise-grade security",
    "Seamless integration with existing tools",
    "Comprehensive data management",
    "Real-time collaboration features",
    "Customizable dashboards and reports",
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <AnimatedElement animation="fadeIn" className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Introducing Glynac
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                AI-Powered Solutions for Business Transformation
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Unlock the power of AI with Glynac's comprehensive suite of tools for data analysis, communication, and
                business intelligence.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-primary hover:bg-primary/90" size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeIn" delay={0.2} className="mx-auto lg:ml-auto">
              <div className="relative">
                <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    width={800}
                    height={600}
                    alt="Glynac Dashboard"
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="rounded-lg bg-background/95 p-4 backdrop-blur">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <BrainCircuit className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">AI Analysis Complete</h3>
                          <p className="text-xs text-muted-foreground">Data insights ready for review</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/20 blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary/20 blur-xl"></div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <AnimatedElement animation="fadeIn">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Tools for Every Need
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the comprehensive suite of features designed to transform your business operations.
              </p>
            </AnimatedElement>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {features.map((feature, i) => (
              <AnimatedElement key={feature.title} animation="fadeIn" delay={0.1 + i * 0.1}>
                <Card className="h-full product-card">
                  <CardHeader>
                    <div className="mb-2 rounded-lg bg-primary/10 p-2 w-fit">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href={feature.link} className="inline-flex items-center text-sm font-medium text-primary">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <AnimatedElement animation="fadeIn">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by Businesses Worldwide
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our customers have to say about their experience with Glynac.
              </p>
            </div>
          </AnimatedElement>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
            {testimonials.map((testimonial, i) => (
              <AnimatedElement key={testimonial.author} animation="fadeIn" delay={0.1 + i * 0.1}>
                <Card className="h-full product-card bg-background">
                  <CardContent className="pt-6">
                    <div className="mb-4 text-4xl text-primary">"</div>
                    <p className="mb-4 text-muted-foreground">{testimonial.quote}</p>
                    <div className="mt-auto">
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <AnimatedElement animation="fadeIn">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Why Choose Glynac
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Transform Your Business with Glynac
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Our comprehensive suite of tools is designed to help you make better decisions, improve efficiency,
                  and drive growth.
                </p>
                <ul className="grid gap-2 py-4">
                  {benefits.map((benefit, i) => (
                    <AnimatedElement key={benefit} animation="slideIn" delay={0.1 + i * 0.1}>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>{benefit}</span>
                      </li>
                    </AnimatedElement>
                  ))}
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-primary hover:bg-primary/90" size="lg">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    View Pricing
                  </Button>
                </div>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeIn" delay={0.2} className="mx-auto lg:ml-auto">
              <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Glynac Platform"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-lg bg-background/95 p-4 backdrop-blur">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Lock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Enterprise Security</h3>
                        <p className="text-xs text-muted-foreground">
                          Your data is protected with industry-leading security
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Platform Overview Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <AnimatedElement animation="fadeIn" delay={0.2} className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Glynac Platform"
                  className="w-full object-cover"
                />
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeIn" className="order-1 lg:order-2">
              <div className="space-y-4">
                <div className="uppercase text-base font-bold text-primary">PLATFORM OVERVIEW</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Explore Glynac at Your Own Pace</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Learn how to harness the power of Glynac's features to accelerate your business growth.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-primary hover:bg-primary/90" size="lg">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
    </div>
  )
}

