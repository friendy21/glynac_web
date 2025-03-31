"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  BrainCircuit,
  Database,
  FileText,
  Globe,
  HelpCircle,
  LineChart,
  Lock,
  MessageSquare,
  Shield,
  Users,
} from "lucide-react"

interface MegaMenuItem {
  icon: JSX.Element
  name: string
  description: string
  path: string
}

interface MegaMenuSection {
  title: string
  items: MegaMenuItem[]
}

interface MegaMenuProps {
  isOpen: boolean
  category: string
  onClose: () => void
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, category, onClose }) => {
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const getMenuSections = (): Record<string, MegaMenuSection[]> => {
    switch (category) {
      case "Products":
        return {
          sections: [
            {
              title: "AI Analysis",
              items: [
                {
                  icon: <BrainCircuit className="h-6 w-6 text-[#1E90FF]" />,
                  name: "AI Qualitative",
                  description: "Advanced qualitative analysis powered by AI",
                  path: "/ai-analysis/ai-qualitative",
                },
                {
                  icon: <BarChart3 className="h-6 w-6 text-[#1E90FF]" />,
                  name: "AI Quantitative",
                  description: "Data-driven quantitative analysis with AI",
                  path: "/ai-analysis/ai-quantitative",
                },
              ],
            },
            {
              title: "Data Management",
              items: [
                {
                  icon: <Database className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Data Selection",
                  description: "Powerful tools for selecting and filtering data",
                  path: "/features/data-selection",
                },
                {
                  icon: <Users className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Demographic Data",
                  description: "Comprehensive demographic data analysis",
                  path: "/features/demographic-data",
                },
                {
                  icon: <FileText className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Standardized Data",
                  description: "Standardized data processing and analysis",
                  path: "/features/standardized-data",
                },
              ],
            },
            {
              title: "Platform",
              items: [
                {
                  icon: <Globe className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Glynac Software",
                  description: "Core Glynac software solutions",
                  path: "/product/platform-overview",
                },
                {
                  icon: <MessageSquare className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Communication Tools",
                  description: "Tools to enhance team communication",
                  path: "/product/engage",
                },
                {
                  icon: <LineChart className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Glynac Forecast",
                  description: "Pinpoint your number and paths to target",
                  path: "/product/forecast",
                },
              ],
            },
          ]
        }
      case "Solutions":
        return {
          sections: [
            {
              title: "Enterprise",
              items: [
                {
                  icon: <Shield className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Security",
                  description: "Enterprise-grade security solutions",
                  path: "/security",
                },
                {
                  icon: <Lock className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Authentication",
                  description: "Advanced authentication methods",
                  path: "/solutions/authentication",
                },
              ],
            },
            {
              title: "Industries",
              items: [
                {
                  icon: <Globe className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Healthcare",
                  description: "Solutions for healthcare organizations",
                  path: "/solutions/healthcare",
                },
                {
                  icon: <Globe className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Finance",
                  description: "Solutions for financial institutions",
                  path: "/solutions/finance",
                },
                {
                  icon: <Globe className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Education",
                  description: "Solutions for educational institutions",
                  path: "/solutions/education",
                },
              ],
            },
          ]
        }
      case "Resources":
        return {
          sections: [
            {
              title: "Documentation",
              items: [
                {
                  icon: <FileText className="h-6 w-6 text-[#1E90FF]" />,
                  name: "API Documentation",
                  description: "Comprehensive API documentation",
                  path: "/resources/api-docs",
                },
                {
                  icon: <FileText className="h-6 w-6 text-[#1E90FF]" />,
                  name: "User Guides",
                  description: "Detailed user guides and tutorials",
                  path: "/resources/user-guides",
                },
              ],
            },
            {
              title: "Support",
              items: [
                {
                  icon: <HelpCircle className="h-6 w-6 text-[#1E90FF]" />,
                  name: "FAQ",
                  description: "Frequently asked questions",
                  path: "/resources/faq",
                },
                {
                  icon: <HelpCircle className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Support",
                  description: "Get help from our support team",
                  path: "/resources/support",
                },
              ],
            },
          ]
        }
      case "Company":
        return {
          sections: [
            {
              title: "About Us",
              items: [
                {
                  icon: <Users className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Our Team",
                  description: "Meet the team behind Glynac",
                  path: "/OrganisationalChart",
                },
                {
                  icon: <Globe className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Careers",
                  description: "Join our growing team",
                  path: "/company/careers",
                },
              ],
            },
            {
              title: "Contact",
              items: [
                {
                  icon: <MessageSquare className="h-6 w-6 text-[#1E90FF]" />,
                  name: "Contact Us",
                  description: "Get in touch with our team",
                  path: "/contact",
                },
              ],
            },
          ]
        }
      default:
        return { sections: [] }
    }
  }

  const { sections } = getMenuSections()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-full z-50 mt-1 w-screen max-w-6xl overflow-hidden rounded-xl border shadow-xl bg-white/95 backdrop-blur-lg mega-menu"
          onMouseLeave={onClose}
        >
          <div className="py-6 px-8">
            <div className="grid grid-cols-3 gap-8">
              {sections.map((section, sectionIndex) => (
                <div key={section.title} className="space-y-6">
                  <h3 className="text-lg font-semibold text-[#1E90FF]">{section.title}</h3>
                  <div className="grid gap-6">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: itemIndex * 0.05 + sectionIndex * 0.1 }}
                      >
                        <Link
                          href={item.path}
                          className="flex items-start gap-4 p-3 rounded-lg transition-all hover:bg-blue-50 menu-item-hover"
                          onClick={() => onClose()}
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-white shadow-sm">
                            {item.icon}
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-base font-semibold">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {category === "Products" && (
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between bg-gradient-to-r from-[#87CEEB]/10 to-[#1E90FF]/10 p-4 rounded-lg">
                  <div>
                    <h3 className="text-lg font-bold text-[#1E90FF]">Ready to transform your business?</h3>
                    <p className="text-sm text-gray-600">Explore our AI-powered solutions today.</p>
                  </div>
                  <Link
                    href="/pricing"
                    className="px-6 py-2 bg-gradient-to-r from-[#87CEEB] to-[#1E90FF] text-white rounded-full font-medium hover:shadow-lg transition-all"
                    onClick={onClose}
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MegaMenu