"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedElement } from "../components/motion"

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form
      setFormState({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      })

      setSubmitStatus("success")
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 5000)
    }
  }

  const officeLocations = [
    {
      city: "San Francisco",
      address: "123 Market Street, Suite 400, San Francisco, CA 94105",
      phone: "+1 (415) 555-1234",
      email: "sf@glynac.com",
    },
    {
      city: "New York",
      address: "456 Madison Avenue, 8th Floor, New York, NY 10022",
      phone: "+1 (212) 555-5678",
      email: "nyc@glynac.com",
    },
    {
      city: "London",
      address: "10 Finsbury Square, London, EC2A 1AF, UK",
      phone: "+44 20 7123 4567",
      email: "london@glynac.com",
    },
  ]

  return (
    <div className="container px-4 py-12 md:py-24 lg:py-32">
      <AnimatedElement animation="fadeIn" className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Have questions or need assistance? Our team is here to help.
        </p>
      </AnimatedElement>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <AnimatedElement animation="fadeIn" delay={0.1}>
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your company"
                    value={formState.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help?"
                    required
                    value={formState.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    required
                    value={formState.message}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {submitStatus === "success" && (
                  <p className="text-center text-sm text-green-600">
                    Your message has been sent successfully. We'll get back to you soon!
                  </p>
                )}

                {submitStatus === "error" && (
                  <p className="text-center text-sm text-red-600">
                    There was an error sending your message. Please try again.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </AnimatedElement>

        <AnimatedElement animation="fadeIn" delay={0.2}>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Office Locations</CardTitle>
                <CardDescription>Visit us at one of our global offices.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {officeLocations.map((office) => (
                    <div key={office.city} className="space-y-2">
                      <h3 className="font-semibold">{office.city}</h3>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 shrink-0" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 shrink-0" />
                        <span>{office.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support Hours</CardTitle>
                <CardDescription>Our support team is available during the following hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Monday - Friday</span>
                    <span className="text-sm font-medium">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Saturday</span>
                    <span className="text-sm font-medium">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sunday</span>
                    <span className="text-sm font-medium">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedElement>
      </div>
    </div>
  )
}

export default ContactPage

