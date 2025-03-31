"use client"

import Link from "next/link"
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FooterLink {
  name: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  icon: JSX.Element
  href: string
  label: string
}

const Footer = () => {
  const footerLinks: FooterSection[] = [
    {
      title: "Product",
      links: [
        { name: "Platform Overview", href: "/product/platform-overview" },
        { name: "Glynac Forecast", href: "/product/forecast" },
        { name: "Glynac Engage", href: "/product/engage" },
        { name: "Glynac Data Engine", href: "/product/data-engine" },
        { name: "Glynac AI", href: "/product/ai" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { name: "Enterprise", href: "/solutions/enterprise" },
        { name: "Partners", href: "/solutions/partners" },
        { name: "Integrations", href: "/solutions/integrations" },
        { name: "Security", href: "/security" },
        { name: "Case Studies", href: "/resources/case-studies" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/resources/blog" },
        { name: "Documentation", href: "/resources/documentation" },
        { name: "Support", href: "/resources/support" },
        { name: "Community", href: "/resources/community" },
        { name: "Webinars", href: "/resources/webinars" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/company/about" },
        { name: "Careers", href: "/company/careers" },
        { name: "Contact", href: "/company/contact" },
        { name: "Privacy", href: "/legal/privacy" },
        { name: "Terms", href: "/legal/terms" },
      ],
    },
  ]

  const socialLinks: SocialLink[] = [
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
  ]

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-[#87CEEB] to-[#1E90FF] text-white">
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">G</div>
                </div>
                <span className="font-bold text-xl text-[#1E90FF]">GLYNAC.AI</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-sm">
                Glynac provides AI-powered solutions to transform your business with cutting-edge technology and
                innovative tools designed for the modern enterprise.
              </p>
              <div className="mt-2">
                <h3 className="text-sm font-medium mb-2">Subscribe to our newsletter</h3>
                <div className="flex gap-2">
                  <Input type="email" placeholder="Enter your email" className="max-w-xs" />
                  <Button className="bg-gradient-to-r from-[#87CEEB] to-[#1E90FF] text-white hover:shadow-lg transition-all">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {footerLinks.map((group, i) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-[#1E90FF]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Glynac.AI, Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-[#1E90FF]"
              >
                {link.icon}
                <span className="sr-only">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

