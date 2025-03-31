"use client"

import Image from "next/image"
import { CheckCircle, Database, FileCheck, FileText, Lock, Server, Shield, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedElement } from "../components/motion"

interface SecurityFeature {
  icon: JSX.Element
  title: string
  description: string
}

interface Certification {
  name: string
  description: string
}

const SecurityPage = () => {
  const securityFeatures: SecurityFeature[] = [
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest using industry-standard AES-256 encryption.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Advanced Threat Protection",
      description: "Real-time monitoring and protection against the latest security threats and vulnerabilities.",
    },
    {
      icon: <Database className="h-8 w-8 text-primary" />,
      title: "Secure Data Storage",
      description: "Your data is stored in SOC 2 Type II certified data centers with redundant backups.",
    },
    {
      icon: <FileCheck className="h-8 w-8 text-primary" />,
      title: "Compliance",
      description: "Compliant with GDPR, HIPAA, SOC 2, and other major regulatory requirements.",
    },
    {
      icon: <Server className="h-8 w-8 text-primary" />,
      title: "Regular Security Audits",
      description: "Continuous security testing and third-party penetration testing to identify vulnerabilities.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Access Controls",
      description: "Granular role-based access controls and multi-factor authentication for all users.",
    },
  ]

  const certifications: Certification[] = [
    { name: "SOC 2 Type II", description: "Service Organization Control 2" },
    { name: "ISO 27001", description: "Information Security Management" },
    { name: "GDPR", description: "General Data Protection Regulation" },
    { name: "HIPAA", description: "Health Insurance Portability and Accountability Act" },
    { name: "PCI DSS", description: "Payment Card Industry Data Security Standard" },
    { name: "CCPA", description: "California Consumer Privacy Act" },
  ]

  return (
    <div className="container px-4 py-12 md:py-24 lg:py-32">
      <AnimatedElement animation="fadeIn" className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Enterprise-Grade Security</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Glynac provides industry-leading security measures to protect your data and ensure compliance with global
          regulations.
        </p>
      </AnimatedElement>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {securityFeatures.map((feature, i) => (
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
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="whitepaper">Whitepaper</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Security Approach</h2>
                <p className="text-muted-foreground">
                  At Glynac, security is built into every aspect of our platform. We employ a defense-in-depth approach
                  to protect your data at every layer.
                </p>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Physical data center security</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Network security with advanced firewalls</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Application security with regular code reviews</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Data encryption at rest and in transit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Regular security audits and penetration testing</span>
                  </li>
                </ul>
              </div>
              <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Security Infrastructure"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="certifications" className="mt-6">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Our Certifications</h2>
                <p className="mt-2 text-muted-foreground">
                  Glynac maintains compliance with major security standards and regulations.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {certifications.map((cert, i) => (
                  <AnimatedElement key={cert.name} animation="fadeIn" delay={0.1 + i * 0.05}>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">{cert.description}</p>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="whitepaper" className="mt-6">
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Security Whitepaper</h2>
                <p className="mt-2 text-muted-foreground">
                  Download our detailed security whitepaper for an in-depth look at our security practices.
                </p>
              </div>
              <div className="rounded-lg border p-6 text-center">
                <FileText className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Glynac Security Whitepaper</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A comprehensive overview of our security infrastructure, policies, and compliance measures.
                </p>
                <Button className="mt-4 bg-primary hover:bg-primary/90">Download Whitepaper</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </AnimatedElement>

      <AnimatedElement animation="fadeIn" delay={0.4} className="mt-16 rounded-lg border bg-muted p-6 md:p-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div>
            <h3 className="text-xl font-bold">Have security questions?</h3>
            <p className="text-muted-foreground">
              Our security team is available to discuss your specific security requirements.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => (window.location.href = "/contact")}>
            Contact Security Team
          </Button>
        </div>
      </AnimatedElement>
    </div>
  )
}

export default SecurityPage

