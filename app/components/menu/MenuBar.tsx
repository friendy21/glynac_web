"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

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

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleDropdownToggle = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
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
                    onClick={() => handleDropdownToggle(item.name)}
                    onMouseEnter={() => handleDropdownToggle(item.name)}
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
                  <MegaMenu isOpen={true} category={item.name} onClose={closeDropdown} />
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
                        onClick={() => handleDropdownToggle(item.name)}
                      >
                        {item.name}
                        <ChevronDown className="h-5 w-5" />
                      </button>
                      {activeDropdown === item.name && (
                        <motion.div
                          className="ml-4 space-y-3 border-l-2 border-gray-200 dark:border-gray-700 pl-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.name === "Products" && (
                            <>
                              <Link
                                href="/ai-analysis/ai-qualitative"
                                className="block text-base transition-colors hover:text-[#1E90FF]"
                                onClick={toggleMenu}
                              >
                                AI Qualitative
                              </Link>
                              <Link
                                href="/ai-analysis/ai-quantitative"
                                className="block text-base transition-colors hover:text-[#1E90FF]"
                                onClick={toggleMenu}
                              >
                                AI Quantitative
                              </Link>
                              <Link
                                href="/product/platform-overview"
                                className="block text-base transition-colors hover:text-[#1E90FF]"
                                onClick={toggleMenu}
                              >
                                Platform Overview
                              </Link>
                            </>
                          )}
                          {item.name === "Solutions" && (
                            <>
                              <Link
                                href="/security"
                                className="block text-base transition-colors hover:text-[#1E90FF]"
                                onClick={toggleMenu}
                              >
                                Security
                              </Link>
                              <Link
                                href="/solutions/enterprise"
                                className="block text-base transition-colors hover:text-[#1E90FF]"
                                onClick={toggleMenu}
                              >
                                Enterprise
                              </Link>
                            </>
                          )}
                          {item.name === "Resources" && (
                            <>
                              <Link
                                href="/resources/documentation"
                                className="block text-base transition-colors hover:text-[#1E90FF]"
                                onClick={toggleMenu}
                              >
                                Documentation
                              </Link>
                              <Link
                                href="/resources/support"
                                className="block text-base transition-colors hover:text-[#1E90FF]"
                                onClick={toggleMenu}
                              >
                                Support
                              </Link>
                            </>
                          )}
                          {item.name === "Company" && (
                            <>
                              <Link
                                href="/OrganisationalChart"
                                className="block text-base transition-colors hover:text-[#1E90FF]"
                                onClick={toggleMenu}
                              >
                                Our Team
                              </Link>
                              <Link
                                href="/contact"
                                className="block text-base transition-colors hover:text-[#1E90FF]"
                                onClick={toggleMenu}
                              >
                                Contact
                              </Link>
                            </>
                          )}
                        </motion.div>
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

