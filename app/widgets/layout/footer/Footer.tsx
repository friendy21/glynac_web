"use client"

import Link from "next/link"
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Using the same menu structure as the menubar
const menuItems = {
  software: [
    { href: "/software/Glynac-software", label: "Cloud vs on Premise software" },
    { href: "/software/communication-tools", label: "Communication Tools" },
    { href: "/software/email-tools", label: "Email Tools" },
  ],
  features: [
    { href: "/features/demographic-data", label: "Demographic Data" },
    { href: "/features/data-selection", label: "Pre-cleaned Data" },
    { href: "/features/standardized-data", label: "Standardized Data" },
  ],
  aiAnalysis: [
    { href: "/ai-analysis/ai-qualitative", label: "AI Qualitative" },
    { href: "/ai-analysis/ai-quantitative", label: "AI Quantitative" },
  ],
  pricing: [{ href: "/pricing", label: "Pricing" }],
  security: [{ href: "/security", label: "Security" }],
  resources: [
    { href: "/resources/about", label: "About" },
    { href: "/resources/blog", label: "Blog" },
    { href: "/resources/client_case", label: "Client Case" },
    { href: "/resources/contacts", label: "Contacts" },
    { href: "/resources/faq", label: "FAQ" },
    { href: "/resources/manual", label: "Manual" },
    { href: "/resources/news", label: "News" },
    { href: "/resources/partner-program", label: "Partner Program" },
    { href: "/resources/updates", label: "Updates" },
  ],
};

// Define menu labels
const menuLabels = {
  software: "Software",
  features: "Features",
  aiAnalysis: "AI Analysis",
  pricing: "Pricing",
  security: "Security",
  resources: "Resources",
};

// Group resources into the same categories as menubar
const resourceGroups = {
  "Learn": ["Blog", "Client Case"],
  "User Manual": ["FAQ", "Manual"],
  "Other Resources": ["News", "Partner Program", "Updates", "Contacts"]
};

// Format links structure for footer
const footerLinks = [
  {
    title: "Products",
    links: [
      ...menuItems.software.map(item => ({ name: item.label, href: item.href })),
      ...menuItems.features.map(item => ({ name: item.label, href: item.href })),
      ...menuItems.aiAnalysis.map(item => ({ name: item.label, href: item.href })),
    ],
  },
  {
    title: "Resources",
    links: [
      ...menuItems.resources
        .filter(item => resourceGroups.Learn.includes(item.label) || 
                         resourceGroups["User Manual"].includes(item.label))
        .map(item => ({ name: item.label, href: item.href })),
    ],
  },
  {
    title: "Other Resources",
    links: [
      ...menuItems.resources
        .filter(item => resourceGroups["Other Resources"].includes(item.label))
        .map(item => ({ name: item.label, href: item.href })),
    ],
  },
  {
    title: "Company",
    links: [
      ...menuItems.resources
        .filter(item => item.label === "About" || item.label === "Contacts")
        .map(item => ({ name: item.label, href: item.href })),
      ...menuItems.security.map(item => ({ name: item.label, href: item.href })),
      ...menuItems.pricing.map(item => ({ name: item.label, href: item.href })),
    ],
  },
];

const socialLinks = [
  { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
  { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
  { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
  { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
];

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-blue-300 to-blue-600 dark:from-blue-400 dark:to-blue-700 text-white">
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">G</div>
                </div>
                <span className="font-bold text-xl text-blue-600 dark:text-blue-400">GLYNAC.AI</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-sm">
                Glynac provides AI-powered solutions to transform your business with cutting-edge technology and
                innovative tools designed for the modern enterprise.
              </p>
              <div className="mt-2">
                <h3 className="text-sm font-medium mb-2">Subscribe to our newsletter</h3>
                <div className="flex gap-2">
                  <Input type="email" placeholder="Enter your email" className="max-w-xs" />
                  <Button className="bg-gradient-to-r from-blue-300 to-blue-600 dark:from-blue-400 dark:to-blue-700 text-white hover:shadow-lg transition-all">
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
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
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
                className="text-muted-foreground transition-colors hover:text-primary"
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