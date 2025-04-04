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
  Briefcase,
  BookOpen,
  Newspaper,
  Contact,
  PlaySquare,
  Award,
} from "lucide-react"

// Define the menuItems structure to match your data
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

// Icon mapping to use with menu items
const iconMapping: Record<string, React.ReactElement> = {
  "Cloud vs on Premise software": <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "Communication Tools": <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "Email Tools": <LineChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "Demographic Data": <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "Pre-cleaned Data": <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "Standardized Data": <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "AI Qualitative": <BrainCircuit className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "AI Quantitative": <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "Security": <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "About": <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "Blog": <Newspaper className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "Client Case": <PlaySquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "Contacts": <Contact className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "FAQ": <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "Manual": <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "News": <Newspaper className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "Partner Program": <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "Updates": <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  "Pricing": <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
};

// Descriptions for menu items
const descriptionMapping: Record<string, string> = {
  "Cloud vs on Premise software": "What benefit of choosing cloud vs on-premise software",
  "Communication Tools": "Tools to enhance team communication",
  "Email Tools": "Streamline your email communication",
  "Demographic Data": "Comprehensive demographic data analysis",
  "Pre-cleaned Data": "Powerful tools for selecting and filtering data",
  "Standardized Data": "Standardized data processing and analysis",
  "AI Qualitative": "Advanced qualitative analysis powered by AI",
  "AI Quantitative": "Data-driven quantitative analysis with AI",
  "Security": "Enterprise-grade security solutions",
  "Pricing": "View our pricing options",
  "About": "Learn about Glynac",
  "Blog": "Insights and updates",
  "Client Case": "Success stories and case studies",
  "Contacts": "Get in touch with our team",
  "FAQ": "Frequently asked questions",
  "Manual": "Detailed user manual",
  "News": "Latest company news",
  "Partner Program": "Explore partnership opportunities",
  "Updates": "Product and service updates"
};

// Group resources into categories
const resourceGroups = {
  "Learn": ["Blog", "Client Case"],
  "User Manual": ["FAQ", "Manual"],
  "Other Resources": ["News", "Partner Program", "Updates", "Contacts"]
};

interface MegaMenuItem {
  icon: React.ReactElement
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
              items: menuItems.aiAnalysis.map(item => ({
                icon: iconMapping[item.label] || <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                name: item.label,
                description: descriptionMapping[item.label] || "",
                path: item.href,
              })),
            },
            {
              title: "Data Management",
              items: menuItems.features.map(item => ({
                icon: iconMapping[item.label] || <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                name: item.label,
                description: descriptionMapping[item.label] || "",
                path: item.href,
              })),
            },
            {
              title: "Software Solutions",
              items: menuItems.software.map(item => ({
                icon: iconMapping[item.label] || <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                name: item.label,
                description: descriptionMapping[item.label] || "",
                path: item.href,
              })),
            },

          ]
        }
      case "Resources":
        return {
          sections: [
            ...Object.entries(resourceGroups).map(([groupTitle, groupLabels]) => ({
              title: groupTitle,
              items: menuItems.resources
                .filter(item => groupLabels.includes(item.label))
                .map(item => ({
                  icon: iconMapping[item.label] || <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                  name: item.label,
                  description: descriptionMapping[item.label] || "",
                  path: item.href,
                }))
            })),
            {
              title: "Encryption",
              items: [
                ...menuItems.security.map(item => ({
                  icon: iconMapping[item.label] || <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                  name: item.label,
                  description: descriptionMapping[item.label] || "",
                  path: item.href,
                })),
              ],
            }
          ]
        }
      case "Company":
        return {
          sections: [
            {
              title: "About Us",
              items: menuItems.resources
                .filter(item => item.label === "About" || item.label === "Contacts")
                .map(item => ({
                  icon: item.label === "About" 
                    ? <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    : <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                  name: item.label,
                  description: descriptionMapping[item.label] || "",
                  path: item.href,
                })),
            },
          ]
        }
      default:
        return { sections: [] }
    }
  }

  const menuData = getMenuSections();
  const sections = 'sections' in menuData ? menuData.sections : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        ref={menuRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 top-full z-50 mt-1 w-screen max-w-6xl overflow-hidden rounded-xl border shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg mega-menu dark:border-gray-700"
        onMouseLeave={onClose}
      >
        <div className="py-6 px-8">
          <div className="grid grid-cols-3 gap-8">
            {sections.map((section, sectionIndex) => (
              <div key={section.title} className="space-y-6">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{section.title}</h3>
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
                        className="flex items-start gap-4 p-3 rounded-lg transition-all hover:bg-blue-50 dark:hover:bg-gray-800 menu-item-hover"
                        onClick={onClose}
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-white dark:bg-gray-800 shadow-sm">
                          {item.icon}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-base font-semibold dark:text-gray-100">{item.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-300">{item.description}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
      
          {category === "Products" && (
            <div className="mt-8 pt-6 border-t dark:border-gray-700">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#87CEEB]/10 to-[#1E90FF]/10 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">Ready to transform your business?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Explore our AI-powered solutions today.</p>
                </div>
                <Link
                  href="/pricing"
                  className="px-6 py-2 bg-gradient-to-r from-[#87CEEB] to-[#1E90FF] dark:from-blue-600 dark:to-blue-700 text-white rounded-full font-medium hover:shadow-lg transition-all"
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