"use client"

import React, { useEffect } from "react"
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

// TypeScript Interfaces
interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}

interface Testimonial {
  quote: string
  author: string
  role: string
}

export default function Home(): React.ReactElement {
  // Feature Data
  const features: Feature[] = [
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

  // Testimonial Data
  const testimonials: Testimonial[] = [
    {
      quote: "Glynac has transformed how we analyze our customer data. The AI tools are incredibly powerful yet intuitive.",
      author: "Sarah Johnson",
      role: "CTO, TechCorp",
    },
    {
      quote: "The security features in Glynac's platform gave us the confidence to migrate all our sensitive data analysis.",
      author: "Michael Chen",
      role: "Security Director, DataSafe Inc.",
    },
    {
      quote: "We've seen a 40% increase in productivity since implementing Glynac's communication tools.",
      author: "Emily Rodriguez",
      role: "Operations Manager, Global Solutions",
    },
  ]

  // Benefits Data
  const benefits: string[] = [
    "Advanced AI analysis capabilities",
    "Enterprise-grade security",
    "Seamless integration with existing tools",
    "Comprehensive data management",
    "Real-time collaboration features",
    "Customizable dashboards and reports",
  ]

  // Initialize particles.js for Hero Section
  useEffect(() => {
    const initParticles = (): void => {
      if (typeof window !== "undefined" && (window as any).particlesJS) {
        (window as any).particlesJS("particles-js", {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 } },
            opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: {
              grab: { distance: 140, line_linked: { opacity: 1 } },
              bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
              repulse: { distance: 200, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
            },
          },
          retina_detect: true,
        })
      }
    }

    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js"
    script.async = true
    script.onload = initParticles
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/ai-tech-background.mp4" type="video/mp4" />
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Fallback Background"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 z-20 animate-float">
          <div className="bg-primary/20 p-4 rounded-full">
            <BrainCircuit className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="absolute bottom-20 right-20 z-20 animate-float" style={{ animationDelay: "1s" }}>
          <div className="bg-secondary/20 p-4 rounded-full">
            <Shield className="h-8 w-8 text-secondary" />
          </div>
        </div>

        {/* Content */}
        <div className="container px-4 md:px-6 relative z-20">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <AnimatedElement animation="fadeIn" className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-sm text-primary backdrop-blur-md animate-bounce">
                Introducing Glynac
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg animate-text">
                AI-Powered Solutions for Business Transformation
              </h1>
              <p className="max-w-[600px] text-white/90 md:text-xl drop-shadow animate-text" style={{ animationDelay: "0.5s" }}>
                Unlock the power of AI with Glynac's comprehensive suite of tools for data analysis, communication, and business intelligence.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  className="bg-primary hover:bg-primary/90 backdrop-blur-sm transform hover:scale-105 transition-transform"
                  size="lg"
                  aria-label="Get Started"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-transform"
                  aria-label="View Pricing"
                >
                  View Pricing
                </Button>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeIn" delay={0.2} className="mx-auto lg:ml-auto">
              <div className="relative">
                <div className="relative overflow-hidden rounded-xl border bg-background/30 shadow-xl backdrop-blur-md transform hover:rotate-1 transition-transform">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    width={800}
                    height={600}
                    alt="Glynac Dashboard"
                    className="w-full object-cover opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="rounded-lg bg-background/70 p-4 backdrop-blur">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/20 p-2 backdrop-blur-md">
                          <BrainCircuit className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">AI Analysis Complete</h3>
                          <p className="text-xs text-white/80">Data insights ready for review</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Glow Effects */}
                <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-primary/30 blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/30 blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
              </div>
            </AnimatedElement>
          </div>
        </div>

        {/* Particles Effect */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div id="particles-js" className="w-full h-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <AnimatedElement animation="fadeIn">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Tools for Every Need</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the comprehensive suite of features designed to transform your business operations.
              </p>
            </AnimatedElement>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {features.map((feature, i) => (
              <AnimatedElement key={feature.title} animation="zoomIn" delay={0.1 + i * 0.1}>
                <Card className="h-full transform hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="mb-2 rounded-lg bg-primary/10 p-2 w-fit">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href={feature.link} className="inline-flex items-center text-sm font-medium text-primary" aria-label={`Learn more about ${feature.title}`}>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trusted by Businesses Worldwide</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our customers have to say about their experience with Glynac.
              </p>
            </div>
          </AnimatedElement>
          <div className="mx-auto max-w-5xl mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <AnimatedElement key={testimonial.author} animation="slideIn" delay={0.1 + i * 0.1}>
                  <Card className="h-full bg-background">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <AnimatedElement animation="fadeIn">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Why Choose Glynac</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Transform Your Business with Glynac</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Our comprehensive suite of tools is designed to help you make better decisions, improve efficiency, and drive growth.
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
                  <Button className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-transform" size="lg" aria-label="Get Started">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="transform hover:scale-105 transition-transform" aria-label="View Pricing">
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
                  loading="lazy"
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
                        <p className="text-xs text-muted-foreground">Your data is protected with industry-leading security</p>
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
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="/videos/platform-overview.mp4" type="video/mp4" />
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    width={800}
                    height={600}
                    alt="Glynac Platform Overview"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-lg bg-background/95 p-4 backdrop-blur">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Database className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Comprehensive Data Management</h3>
                        <p className="text-xs text-muted-foreground">Manage all your data in one place with ease</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                  <Button className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-transform" size="lg" aria-label="Learn More">
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