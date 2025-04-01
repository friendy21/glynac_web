"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import MegaMenu from "../navigation/MegaMenu"

type NavItem = {
  name: string
  path: string
  dropdown?: boolean
}

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleDropdownHover = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(dropdown)
  }

  const handleDropdownLeave = () => {
    // Add delay before closing dropdown to allow moving to dropdown content
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 100)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const navItems: NavItem[] = [
    { name: "Products", path: "/product", dropdown: true },
    { name: "Solutions", path: "/solutions", dropdown: true },
    { name: "Resources", path: "/resources", dropdown: true },
    { name: "Company", path: "/company", dropdown: true },
    { name: "Pricing", path: "/pricing", dropdown: false },
  ]

  const renderMobileDropdownItems = (category: string) => {
    switch (category) {
      case "Products":
        return [
          { name: "AI Qualitative", path: "/ai-analysis/ai-qualitative" },
          { name: "AI Quantitative", path: "/ai-analysis/ai-quantitative" },
          { name: "Data Selection", path: "/features/data-selection" },
          { name: "Demographic Data", path: "/features/demographic-data" },
          { name: "Standardized Data", path: "/features/standardized-data" },
          { name: "Glynac Software", path: "/software/Glynac-software" },
          { name: "Communication Tools", path: "/software/communication-tools" },
          { name: "Email Tools", path: "/software/email-tools" },
        ]
      case "Solutions":
        return [
          { name: "Security", path: "/security" },
          { name: "Authentication", path: "/solutions/authentication" },
          { name: "Healthcare", path: "/solutions/healthcare" },
          { name: "Finance", path: "/solutions/finance" },
          { name: "Education", path: "/solutions/education" },
        ]
      case "Resources":
        return [
          { name: "About", path: "/resources/about" },
          { name: "Blog", path: "/resources/blog" },
          { name: "Client Cases", path: "/resources/client_case" },
          { name: "FAQ", path: "/resources/faq" },
          { name: "Manual", path: "/resources/manual" },
          { name: "Support", path: "/resources/support" },
          { name: "News", path: "/resources/news" },
          { name: "Partner Program", path: "/resources/partner-program" },
          { name: "Updates", path: "/resources/updates" },
        ]
      case "Company":
        return [
          { name: "Organizational Chart", path: "/OrganisationalChart" },
          { name: "Contacts", path: "/resources/contacts" },
        ]
      default:
        return []
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-lg shadow-md dark:bg-gray-900/95" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2" onClick={closeDropdown}>
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-[#87CEEB] to-[#1E90FF] text-white">
              <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">G</div>
            </div>
            <span className="hidden font-bold text-xl text-[#1E90FF] sm:inline-block">GLYNAC.AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <button
                    className={`nav-link flex items-center gap-1 text-base transition-colors hover:text-[#1E90FF] ${
                      pathname.startsWith(item.path) ? "text-[#1E90FF]" : "text-foreground"
                    }`}
                    onMouseEnter={() => handleDropdownHover(item.name)}
                    onMouseLeave={handleDropdownLeave}
                    onClick={() => {
                      if (activeDropdown === item.name) {
                        setActiveDropdown(null)
                      } else {
                        setActiveDropdown(item.name)
                      }
                    }}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={`nav-link text-base transition-colors hover:text-[#1E90FF] ${
                      pathname === item.path ? "text-[#1E90FF]" : "text-foreground"
                    }`}
                    onClick={closeDropdown}
                  >
                    {item.name}
                  </Link>
                )}
                {item.dropdown && activeDropdown === item.name && (
                  <div onMouseEnter={() => handleDropdownHover(item.name)} onMouseLeave={handleDropdownLeave}>
                    <MegaMenu isOpen={true} category={item.name} onClose={closeDropdown} />
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <Button variant="ghost" size="sm" className="hidden md:flex text-sm font-medium">
            Sign in
          </Button>

          <Button className="hidden md:flex bg-gradient-to-r from-[#87CEEB] to-[#1E90FF] text-white hover:shadow-lg transition-all">
            Get Started
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 md:hidden">
          <div className="container py-6">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-[#87CEEB] to-[#1E90FF] text-white">
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">G</div>
                </div>
                <span className="font-bold text-xl text-[#1E90FF]">GLYNAC.AI</span>
              </Link>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
            </div>
            <nav className="flex flex-col gap-5">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-3">
                  {item.dropdown ? (
                    <>
                      <button
                        className={`flex items-center justify-between w-full text-lg transition-colors hover:text-[#1E90FF] ${
                          pathname.startsWith(item.path) ? "text-[#1E90FF]" : "text-foreground"
                        }`}
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      >
                        {item.name}
                        <ChevronDown className="h-5 w-5" />
                      </button>
                      {activeDropdown === item.name && (
                        <div
                          className="ml-4 space-y-3 border-l-2 border-gray-200 dark:border-gray-700 pl-4"
                        >
                          {renderMobileDropdownItems(item.name).map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              className="block text-base transition-colors hover:text-[#1E90FF]"
                              onClick={toggleMenu}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.path}
                      className={`block text-lg transition-colors hover:text-[#1E90FF] ${
                        pathname === item.path ? "text-[#1E90FF]" : "text-foreground"
                      }`}
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-8 space-y-4">
              <Button variant="outline" className="w-full">
                Sign in
              </Button>
              <Button className="w-full bg-gradient-to-r from-[#87CEEB] to-[#1E90FF] text-white">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default MenuBar