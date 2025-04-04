"use client"

import React from "react"
import Image from "next/image"
import { BarChart3, BrainCircuit, CheckCircle, FileText, MessageSquare, Search, Sparkles, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedElement } from "@/app/components/motion"

interface Feature {
  icon: React.ReactElement
  title: string
  description: string
}

interface UseCase {
  title: string
  description: string
  image: string
}

const QualitativeAnalysis: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Sentiment Analysis",
      description: "Analyze text data to determine sentiment and emotional tone.",
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Theme Extraction",
      description: "Automatically identify key themes and topics from qualitative data.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Interview Analysis",
      description: "Process interview transcripts to extract insights and patterns.",
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Document Analysis",
      description: "Extract meaningful insights from documents, reports, and articles.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Contextual Understanding",
      description: "AI that understands context and nuance in qualitative data.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Visual Reporting",
      description: "Generate visual reports from qualitative analysis results.",
    },
  ]

  const useCases: UseCase[] = [
    {
      title: "Customer Feedback Analysis",
      description: "Analyze customer reviews, support tickets, and feedback to identify trends and sentiment.",
      image: "https://fibery.io/blog/static/076163aec4a13e06a14b7ff8eaf23838/6247c/e30da6dc-e562-4732-ad55-dfc03bfb38a5.png",
    },
    {
      title: "Market Research",
      description: "Process interview transcripts, focus group data, and open-ended survey responses.",
      image: "https://th.bing.com/th/id/OIP.jaXaqpMWEy2r3fhkPz4BMAHaFF?rs=1&pid=ImgDetMain",
    },
    {
      title: "Employee Engagement",
      description: "Analyze employee feedback and survey responses to improve workplace culture.",
      image: "/https://www.talkfreely.com/hs-fs/hubfs/employee%20engagement%20elements%201000.jpg?width=2500&name=employee%20engagement%20elements%201000.jpg",
    },
  ]

  return (
    <div className="container px-4 py-12 md:py-24 lg:py-32">
      <AnimatedElement animation="fadeIn" className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
          AI-Powered Qualitative Analysis
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Transform unstructured qualitative data into actionable insights with our advanced AI analysis tools.
        </p>
      </AnimatedElement>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <AnimatedElement key={feature.title} animation="fadeIn" delay={0.1 + i * 0.1}>
            <Card className="h-full product-card">
              <CardHeader>
                <div className="mb-2 rounded-lg bg-primary/10 p-2 w-fit">{feature.icon}</div>
                <CardTitle className="text-foreground">{feature.title}</CardTitle>
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
            <h2 className="text-2xl font-bold text-foreground">Advanced AI for Qualitative Research</h2>
            <p className="text-muted-foreground">
              Our AI qualitative analysis tools use natural language processing and machine learning to analyze
              unstructured text data, identifying patterns, themes, and sentiments that would take humans days or weeks
              to process.
            </p>
            <ul className="grid gap-2 py-4">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-foreground">Upload text data from multiple sources</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-foreground">AI processes and categorizes the information</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-foreground">Identify key themes and patterns automatically</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-foreground">Generate visual reports and actionable insights</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-foreground">Export findings in multiple formats</span>
              </li>
            </ul>
            <Button>Learn More</Button>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-card shadow-md">
            <Image
              src="https://www.istudy.org.uk/wp-content/uploads/2024/03/From-Planning-To-Execution-Qualitative-Research-Steps-Simplified-scaled.jpeg"
              width={800}
              height={600}
              alt="AI Qualitative Analysis"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="rounded-lg bg-card/95 p-4 backdrop-blur">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">AI Processing</h3>
                    <p className="text-xs text-muted-foreground">Analyzing qualitative data in real-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedElement>

      <AnimatedElement animation="fadeIn" delay={0.4} className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Use Cases</h2>
          <p className="mt-2 text-muted-foreground">
            See how organizations are using our AI qualitative analysis tools.
          </p>
        </div>
        <Tabs defaultValue="feedback" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
            <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
            <TabsTrigger value="research">Market Research</TabsTrigger>
            <TabsTrigger value="employee">Employee Engagement</TabsTrigger>
          </TabsList>
          {useCases.map((useCase, index) => (
            <TabsContent key={index} value={["feedback", "research", "employee"][index]} className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                  <ul className="grid gap-2 py-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-foreground">Faster analysis of large datasets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-foreground">Identify patterns humans might miss</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-foreground">Consistent analysis methodology</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-foreground">Actionable insights and recommendations</span>
                    </li>
                  </ul>
                  <Button>View Case Study</Button>
                </div>
                <div className="relative overflow-hidden rounded-lg border bg-card shadow-md">
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
            <h3 className="text-xl font-bold text-foreground">Ready to transform your qualitative research?</h3>
            <p className="text-muted-foreground">Get started with our AI-powered qualitative analysis tools today.</p>
          </div>
          <Button>Request Demo</Button>
        </div>
      </AnimatedElement>
    </div>
  )
}

export default QualitativeAnalysis