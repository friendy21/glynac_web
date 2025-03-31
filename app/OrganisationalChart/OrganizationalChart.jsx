"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedElement } from "@/app/components/motion"

const OrganizationalChart = () => {
  const [expandedDepartments, setExpandedDepartments] = useState({
    executive: true,
    engineering: false,
    product: false,
    marketing: false,
    sales: false,
    support: false,
  })

  const toggleDepartment = (department) => {
    setExpandedDepartments({
      ...expandedDepartments,
      [department]: !expandedDepartments[department],
    })
  }

  const executives = [
    {
      name: "Sarah Johnson",
      title: "Chief Executive Officer",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Sarah has over 20 years of experience in the technology industry and has led Glynac since its founding in 2015.",
    },
    {
      name: "Michael Chen",
      title: "Chief Technology Officer",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Michael oversees all technical aspects of Glynac, including product development, engineering, and infrastructure.",
    },
    {
      name: "Emily Rodriguez",
      title: "Chief Operating Officer",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Emily manages day-to-day operations and ensures that Glynac delivers exceptional service to all clients.",
    },
    {
      name: "David Kim",
      title: "Chief Financial Officer",
      image: "/placeholder.svg?height=200&width=200",
      bio: "David manages Glynac's financial strategy and operations, ensuring sustainable growth and profitability.",
    },
  ]

  const departments = [
    {
      id: "engineering",
      name: "Engineering",
      head: "Jennifer Wu",
      headTitle: "VP of Engineering",
      members: [
        { name: "Robert Garcia", title: "Senior Software Engineer" },
        { name: "Lisa Park", title: "Frontend Developer" },
        { name: "James Wilson", title: "Backend Developer" },
        { name: "Aisha Patel", title: "DevOps Engineer" },
      ],
    },
    {
      id: "product",
      name: "Product",
      head: "Thomas Lee",
      headTitle: "VP of Product",
      members: [
        { name: "Sophia Martinez", title: "Product Manager" },
        { name: "Daniel Johnson", title: "UX Designer" },
        { name: "Olivia Brown", title: "Product Analyst" },
      ],
    },
    {
      id: "marketing",
      name: "Marketing",
      head: "Rachel Green",
      headTitle: "VP of Marketing",
      members: [
        { name: "Noah Smith", title: "Marketing Manager" },
        { name: "Emma Davis", title: "Content Strategist" },
        { name: "Jacob Taylor", title: "Digital Marketing Specialist" },
      ],
    },
    {
      id: "sales",
      name: "Sales",
      head: "Marcus Johnson",
      headTitle: "VP of Sales",
      members: [
        { name: "Ava Williams", title: "Sales Manager" },
        { name: "Ethan Miller", title: "Account Executive" },
        { name: "Isabella Jones", title: "Sales Development Representative" },
      ],
    },
    {
      id: "support",
      name: "Customer Support",
      head: "Samantha Lee",
      headTitle: "VP of Customer Success",
      members: [
        { name: "Lucas Anderson", title: "Support Manager" },
        { name: "Mia Thompson", title: "Customer Success Manager" },
        { name: "Alexander White", title: "Technical Support Specialist" },
      ],
    },
  ]

  return (
    <div className="container px-4 py-12 md:py-24 lg:py-32">
      <AnimatedElement animation="fadeIn" className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Leadership Team</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Meet the talented individuals who drive Glynac's vision and success.
        </p>
      </AnimatedElement>

      <AnimatedElement animation="fadeIn" delay={0.2} className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Executive Leadership</h2>
          <p className="mt-2 text-muted-foreground">
            Our executive team brings decades of experience in technology, business, and innovation.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {executives.map((executive, i) => (
            <AnimatedElement key={executive.name} animation="fadeIn" delay={0.1 + i * 0.1}>
              <Card className="h-full card-hover">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 overflow-hidden rounded-full">
                    <Image
                      src={executive.image || "/placeholder.svg"}
                      alt={executive.name}
                      width={120}
                      height={120}
                      className="aspect-square object-cover"
                    />
                  </div>
                  <CardTitle>{executive.name}</CardTitle>
                  <CardDescription>{executive.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{executive.bio}</p>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </AnimatedElement>

      <AnimatedElement animation="fadeIn" delay={0.3} className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Department Leadership</h2>
          <p className="mt-2 text-muted-foreground">
            Our department leaders ensure excellence across all areas of our organization.
          </p>
        </div>
        <div className="space-y-4">
          {departments.map((department) => (
            <AnimatedElement key={department.id} animation="fadeIn" delay={0.1}>
              <Card className="overflow-hidden">
                <button
                  className="flex w-full items-center justify-between p-6"
                  onClick={() => toggleDepartment(department.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">{department.name} Department</h3>
                      <p className="text-sm text-muted-foreground">
                        Led by {department.head}, {department.headTitle}
                      </p>
                    </div>
                  </div>
                  {expandedDepartments[department.id] ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
                {expandedDepartments[department.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t px-6 py-4">
                      <h4 className="mb-2 font-medium">Team Members</h4>
                      <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                        {department.members.map((member) => (
                          <li key={member.name} className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                              {member.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.title}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </AnimatedElement>

      <AnimatedElement animation="fadeIn" delay={0.4} className="mt-16 rounded-lg border bg-muted p-6 md:p-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div>
            <h3 className="text-xl font-bold">Join Our Team</h3>
            <p className="text-muted-foreground">
              We're always looking for talented individuals to join our growing team.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">View Open Positions</Button>
        </div>
      </AnimatedElement>
    </div>
  )
}

export default OrganizationalChart

