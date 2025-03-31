"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2, HandshakeIcon, Lock, Shield, UserCheck } from "lucide-react"
import { AnimatedElement } from "@/app/components/motion"

interface EnterpriseDropdownProps {
  onClose: () => void
  category: string
}

type CategoryMap = {
  [key: string]: {
    title: string
    sections: {
      title: string
      icon: JSX.Element
      links: {
        name: string
        href: string
      }[]
    }[]
    promo?: {
      title: string
      description: string
      linkText: string
      href: string
    }
  }
}

const EnterpriseDropdown = ({ onClose, category }: EnterpriseDropdownProps) => {
  const categoryMap: CategoryMap = {
    Solutions: {
      title: "ENTERPRISE",
      sections: [
        {
          title: "Enterprise",
          icon: <Building2 className="h-6 w-6 text-primary" />,
          links: [
            { name: "Enterprise", href: "/solutions/enterprise" },
            { name: "Built for the largest and most complex GTM teams", href: "/solutions/enterprise" },
          ],
        },
        {
          title: "Partners and Integrations",
          icon: <HandshakeIcon className="h-6 w-6 text-primary" />,
          links: [
            { name: "Find a Partner", href: "/solutions/find-partner" },
            { name: "Become a Glynac Technology Partner", href: "/solutions/tech-partner" },
            { name: "Become an Agency Partner", href: "/solutions/agency-partner" },
            { name: "Partner Portal Login", href: "/solutions/partner-portal" },
          ],
        },
        {
          title: "Trust Center",
          icon: <Lock className="h-6 w-6 text-primary" />,
          links: [
            { name: "Security", href: "/security" },
            { name: "Compliance", href: "/compliance" },
            { name: "Privacy", href: "/privacy" },
          ],
        },
      ],
      promo: {
        title: "EXPLORE OUR PLATFORM",
        description: "Learn how Glynac can help your business",
        linkText: "Learn more",
        href: "/platform-overview",
      },
    },
    Resources: {
      title: "RESOURCES",
      sections: [
        {
          title: "Resources",
          icon: <Shield className="h-6 w-6 text-primary" />,
          links: [
            { name: "Blog", href: "/resources/blog" },
            { name: "Documentation", href: "/resources/documentation" },
            { name: "Webinars", href: "/resources/webinars" },
            { name: "Case Studies", href: "/resources/case-studies" },
            { name: "eBooks & Guides", href: "/resources/guides" },
          ],
        },
        {
          title: "Support",
          icon: <UserCheck className="h-6 w-6 text-primary" />,
          links: [
            { name: "Help Center", href: "/resources/help" },
            { name: "Community", href: "/resources/community" },
            { name: "API Documentation", href: "/resources/api" },
            { name: "FAQs", href: "/resources/faqs" },
          ],
        },
      ],
      promo: {
        title: "EXPLORE OUR PLATFORM",
        description: "Learn how Glynac can help your business",
        linkText: "Learn more",
        href: "/platform-overview",
      },
    },
    Company: {
      title: "COMPANY",
      sections: [
        {
          title: "About Glynac",
          icon: <Building2 className="h-6 w-6 text-primary" />,
          links: [
            { name: "About Us", href: "/company/about" },
            { name: "Leadership Team", href: "/company/leadership" },
            { name: "Careers", href: "/company/careers" },
            { name: "News & Press", href: "/company/news" },
          ],
        },
        {
          title: "Contact",
          icon: <UserCheck className="h-6 w-6 text-primary" />,
          links: [
            { name: "Contact Us", href: "/company/contact" },
            { name: "Office Locations", href: "/company/locations" },
            { name: "Partner Inquiries", href: "/company/partner-inquiries" },
          ],
        },
      ],
      promo: {
        title: "EXPLORE OUR PLATFORM",
        description: "Learn how Glynac can help your business",
        linkText: "Learn more",
        href: "/platform-overview",
      },
    },
  }

  const content = categoryMap[category] || categoryMap["Solutions"]

  return (
    <div
      className="absolute left-0 top-full z-50 mt-1 w-screen overflow-hidden rounded-md border shadow-lg bg-secondary backdrop-blur supports-[backdrop-filter]:bg-secondary/95 mega-menu"
      onMouseLeave={onClose}
    >
      <div className="flex">
        <div className="p-6 flex-1">
          <div className="mb-4 uppercase text-xs font-semibold text-muted-foreground tracking-wider">
            {content.title}
          </div>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {content.sections.map((section, index) => (
              <AnimatedElement key={section.title} animation="fadeIn" delay={index * 0.04}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-accent">
                      {section.icon}
                    </div>
                    <h3 className="text-sm font-medium">{section.title}</h3>
                  </div>
                  <ul className="space-y-2 ml-10">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-primary"
                          onClick={onClose}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>

        {content.promo && (
          <div className="w-80 flex-shrink-0 bg-accent p-6 relative hidden lg:block">
            <AnimatedElement animation="fadeIn" delay={0.1}>
              <div className="mb-3 uppercase text-sm font-bold text-primary">{content.promo.title}</div>
              <p className="text-sm mb-4">{content.promo.description}</p>
              <Link
                href={content.promo.href}
                className="inline-flex items-center text-sm font-medium text-primary"
                onClick={onClose}
              >
                {content.promo.linkText}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <div className="mt-4">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Platform Overview"
                  width={300}
                  height={200}
                  className="rounded-md"
                />
              </div>
            </AnimatedElement>
          </div>
        )}
      </div>
    </div>
  )
}

export default EnterpriseDropdown

