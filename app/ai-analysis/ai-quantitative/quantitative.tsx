"use client"

import Image from "next/image"
import { BarChart3, BrainCircuit, CheckCircle, LineChart, PieChart, Sigma, Sparkles, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedElement } from "@/app/components/motion"

interface Feature {
  icon: JSX.Element
  title: string
  description: string
}

interface UseCase {
  title: string
  description: string
  image: string
}

const QuantitativeAnalysis = () => {
  const features: Feature[] = [
    {
      icon: <LineChart className="h-8 w-8 text-primary" />,
      title: "Predictive Analytics",
      description: "Forecast future trends based on historical data patterns.",
    },
    {
      icon: <Sigma className="h-8 w-8 text-primary" />,
      title: "Statistical Analysis",
      description: "Advanced statistical methods for rigorous data analysis.",
    },
    {
      icon: <PieChart className="h-8 w-8 text-primary" />,
      title: "Data Visualization",
      description: "Transform complex data into clear, actionable visualizations.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Trend Analysis",
      description: "Identify and analyze trends in your quantitative data.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Anomaly Detection",
      description: "Automatically identify outliers and anomalies in your data.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Comparative Analysis",
      description: "Compare datasets across different time periods or segments.",
    },
  ]

  const useCases: UseCase[] = [
    {
      title: "Financial Analysis",
      description:
        "Analyze financial data to identify trends, forecast future performance, and optimize investment strategies.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Marketing Analytics",
      description: "Measure campaign performance, customer behavior, and ROI across marketing channels.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Operational Efficiency",
      description: "Analyze operational data to identify bottlenecks and optimize business processes.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="container px-4 py-12 md:py-24 lg:py-32">
      <AnimatedElement animation="fadeIn" className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          AI-Powered Quantitative Analysis
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Transform your numerical data into actionable insights with our advanced AI quantitative analysis tools.
        </p>
      </AnimatedElement>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <AnimatedElement key={feature.title} animation="fadeIn" delay={0.1 + i * 0.1}>
            <Card className="h-full product-card">
              <CardHeader>
                <div className="mb-2 rounded-lg bg-primary/10 p-2 w-fit">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </AnimatedElement>
        ))}
      </div>

      <AnimatedElement animation="fadeIn" delay={0.3} className="mt-16">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">How It Works</div>
            <h2 className="text-2xl font-bold">Advanced AI for Quantitative Analysis</h2>
            <p className="text-muted-foreground">
              Our AI quantitative analysis tools use machine learning algorithms to process large datasets, identify
              patterns, and generate predictive models that would take traditional methods much longer to produce.
            </p>
            <ul className="grid gap-2 py-4">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Import data from multiple sources and formats</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>AI automatically cleans and prepares data</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Apply advanced statistical models with one click</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Generate interactive visualizations and dashboards</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Export findings and models for implementation</span>
              </li>
            </ul>
            <Button className="bg-primary hover:bg-primary/90">Learn More</Button>
          </div>
          <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
            <Image
              src="/placeholder.svg?height=600&width=800"
              width={800}
              height={600}
              alt="AI Quantitative Analysis"
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
                    <h3 className="text-sm font-medium">AI Processing</h3>
                    <p className="text-xs text-muted-foreground">Analyzing quantitative data in real-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedElement>

      <AnimatedElement animation="fadeIn" delay={0.4} className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Use Cases</h2>
          <p className="mt-2 text-muted-foreground">
            See how organizations are using our AI quantitative analysis tools.
          </p>
        </div>
        <Tabs defaultValue="financial" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>
          {useCases.map((useCase, index) => (
            <TabsContent key={index} value={["financial", "marketing", "operations"][index]} className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                  <ul className="grid gap-2 py-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Process large datasets in minutes, not days</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Identify patterns and correlations automatically</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Generate accurate predictive models</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Make data-driven decisions with confidence</span>
                    </li>
                  </ul>
                  <Button className="bg-primary hover:bg-primary/90">View Case Study</Button>
                </div>
                <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                  <Image
                    src={useCase.image || "/placeholder.svg"}
                    width={400}
                    height={300}
                    alt={useCase.title}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </AnimatedElement>

      <AnimatedElement animation="fadeIn" delay={0.5} className="mt-16 rounded-lg border bg-muted p-6 md:p-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div>
            <h3 className="text-xl font-bold">Ready to transform your data analysis?</h3>
            <p className="text-muted-foreground">Get started with our AI-powered quantitative analysis tools today.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Request Demo</Button>
        </div>
      </AnimatedElement>
    </div>
  )
}

export default QuantitativeAnalysis

