"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BarChart3,
  BrainCircuit,
  ChevronRight,
  Database,
  FileText,
  Fingerprint,
  Globe,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  Shield,
  Users,
  LineChart,
  Lock,
  Award,
  Briefcase,
  BookOpen,
  Newspaper,
} from "lucide-react"
import type React from "react"

interface DropdownNavigationProps {
  items: {
    name: string
    path: string
  }[]
  onClose: () => void
  category: string
}

const DropdownNavigation: React.FC<DropdownNavigationProps> = ({ items, onClose, category }) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const getIcon = (name: string) => {
    const iconMap: Record<string, JSX.Element> = {
      // Products Icons
      "AI Qualitative": <BrainCircuit className="h-5 w-5 text-[#1E90FF]" />,
      "AI Quantitative": <BarChart3 className="h-5 w-5 text-[#1E90FF]" />,
      "Data Selection": <Database className="h-5 w-5 text-[#1E90FF]" />,
      "Demographic Data": <Users className="h-5 w-5 text-[#1E90FF]" />,
      "Standardized Data": <FileText className="h-5 w-5 text-[#1E90FF]" />,
      "Glynac Software": <Globe className="h-5 w-5 text-[#1E90FF]" />,
      "Communication Tools": <MessageSquare className="h-5 w-5 text-[#1E90FF]" />,
      "Email Tools": <Mail className="h-5 w-5 text-[#1E90FF]" />,
      "Glynac Forecast": <LineChart className="h-5 w-5 text-[#1E90FF]" />,

      // Solutions Icons
      "Security": <Shield className="h-5 w-5 text-[#1E90FF]" />,
      "Authentication": <Fingerprint className="h-5 w-5 text-[#1E90FF]" />,
      "Healthcare": <Globe className="h-5 w-5 text-[#1E90FF]" />,
      "Finance": <Globe className="h-5 w-5 text-[#1E90FF]" />,
      "Education": <Globe className="h-5 w-5 text-[#1E90FF]" />,

      // Resources Icons
      "About": <Users className="h-5 w-5 text-[#1E90FF]" />,
      "Blog": <Newspaper className="h-5 w-5 text-[#1E90FF]" />,
      "Client Cases": <FileText className="h-5 w-5 text-[#1E90FF]" />,
      "Contacts": <Phone className="h-5 w-5 text-[#1E90FF]" />,
      "FAQ": <HelpCircle className="h-5 w-5 text-[#1E90FF]" />,
      "Manual": <BookOpen className="h-5 w-5 text-[#1E90FF]" />,
      "News": <Newspaper className="h-5 w-5 text-[#1E90FF]" />,
      "Partner Program": <Award className="h-5 w-5 text-[#1E90FF]" />,
      "Support": <HelpCircle className="h-5 w-5 text-[#1E90FF]" />,
      "Updates": <Briefcase className="h-5 w-5 text-[#1E90FF]" />,

      // Company Icons
      "Our Team": <Users className="h-5 w-5 text-[#1E90FF]" />,
      "Careers": <Globe className="h-5 w-5 text-[#1E90FF]" />,
      "Contact Us": <Phone className="h-5 w-5 text-[#1E90FF]" />,
    }

    return iconMap[name] || <ChevronRight className="h-5 w-5 text-[#1E90FF]" />
  }

  const getDescription = (name: string) => {
    const descriptionMap: Record<string, string> = {
      // Products Descriptions
      "AI Qualitative": "Advanced qualitative analysis powered by AI",
      "AI Quantitative": "Data-driven quantitative analysis with AI",
      "Data Selection": "Powerful tools for selecting and filtering data",
      "Demographic Data": "Comprehensive demographic data analysis",
      "Standardized Data": "Standardized data processing and analysis",
      "Glynac Software": "Core Glynac software solutions",
      "Communication Tools": "Tools to enhance team communication",
      "Email Tools": "Advanced email management solutions",
      "Glynac Forecast": "Pinpoint your number and paths to target",

      // Solutions Descriptions
      "Security": "Enterprise-grade security solutions",
      "Authentication": "Advanced authentication methods",
      "Healthcare": "Solutions for healthcare organizations",
      "Finance": "Solutions for financial institutions",
      "Education": "Solutions for educational institutions",

      // Resources Descriptions
      "About": "Learn about Glynac",
      "Blog": "Insights and updates",
      "Client Cases": "Success stories and case studies",
      "Contacts": "Get in touch with our team",
      "FAQ": "Frequently asked questions",
      "Manual": "Detailed user guides and tutorials",
      "News": "Latest company news",
      "Partner Program": "Explore partnership opportunities",
      "Support": "Get help from our support team",
      "Updates": "Product and service updates",

      // Company Descriptions
      "Our Team": "Meet the team behind Glynac",
      "Careers": "Join our growing team",
      "Contact Us": "Get in touch with our team",
    }

    return descriptionMap[name] || ""
  }

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 top-full z-50 mt-1 w-screen max-w-md overflow-hidden rounded-xl border shadow-xl bg-white/95 backdrop-blur-lg mega-menu"
      onMouseLeave={onClose}
    >
      <div className="p-6">
        <h3 className="text-lg font-bold text-[#1E90FF] mb-4">{category}</h3>
        <div className="grid gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link
                href={item.path}
                className="flex items-start gap-4 p-3 rounded-lg transition-all hover:bg-blue-50 menu-item-hover"
                onClick={onClose}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-white shadow-sm">
                  {getIcon(item.name)}
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-semibold">{item.name}</h4>
                  {getDescription(item.name) && <p className="text-sm text-gray-500">{getDescription(item.name)}</p>}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default DropdownNavigation