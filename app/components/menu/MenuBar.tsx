"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronDown, 
  Menu, 
  Moon, 
  Sun, 
  X,
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
  Award
} from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

// Define the menuItems structure
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

// Icon mapping to use with menu items
const iconMapping = {
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
const descriptionMapping = {
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

// MegaMenu Component
const MegaMenu = ({ isOpen, category, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const getMenuSections = () => {
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
        };
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
        };
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
        };
      default:
        return { sections: [] };
    }
  };

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
  );
};

// Main MenuBar Component
const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const timeoutRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownHover = (dropdown) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { name: "Products", path: "/product", dropdown: true },
    { name: "Resources", path: "/resources", dropdown: true },
    { name: "Company", path: "/company", dropdown: true },
    { name: "Pricing", path: "/pricing", dropdown: false },
  ];

  const renderMobileDropdownItems = (category) => {
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
        ];
      case "Resources":
        return [
          { name: "About", path: "/resources/about" },
          { name: "Blog", path: "/resources/blog" },
          { name: "Client Cases", path: "/resources/client_case" },
          { name: "FAQ", path: "/resources/faq" },
          { name: "Manual", path: "/resources/manual" },
          { name: "News", path: "/resources/news" },
          { name: "Partner Program", path: "/resources/partner-program" },
          { name: "Updates", path: "/resources/updates" },
        ];
      case "Company":
        return [
          { name: "About", path: "/resources/about" },
          { name: "Contacts", path: "/resources/contacts" },
        ];
      default:
        return [];
    }
  };

  const headerClasses = scrolled && !isOpen
    ? "bg-background/95 backdrop-blur-lg shadow-md"
    : "bg-transparent";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${headerClasses}`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2" onClick={closeDropdown}>
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-blue-300 to-blue-600 dark:from-blue-400 dark:to-blue-700 text-white">
              <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">G</div>
            </div>
            <span className="hidden font-bold text-xl text-primary sm:inline-block">GLYNAC.AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <button
                    className={`nav-link flex items-center gap-1 text-base transition-colors hover:text-primary ${
                      pathname.startsWith(item.path) ? "text-primary" : "text-foreground"
                    }`}
                    onMouseEnter={() => handleDropdownHover(item.name)}
                    onMouseLeave={handleDropdownLeave}
                    onClick={() => {
                      setActiveDropdown(activeDropdown === item.name ? null : item.name);
                    }}
                  >
                    {item.name}
                    <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={`nav-link text-base transition-colors hover:text-primary ${
                      pathname === item.path ? "text-primary" : "text-foreground"
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
            className="rounded-full p-2 hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <Button className="hidden md:flex bg-primary text-primary-foreground hover:shadow-lg transition-all">
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
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleMenu}></div>
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-background shadow-xl">
            <div className="container py-6">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-blue-300 to-blue-600 dark:from-blue-400 dark:to-blue-700 text-white">
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">G</div>
                  </div>
                  <span className="font-bold text-xl text-primary">GLYNAC.AI</span>
                </Link>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="rounded-full p-2 hover:bg-accent transition-colors"
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
                          className={`flex items-center justify-between w-full text-lg transition-colors hover:text-primary ${
                            pathname.startsWith(item.path) ? "text-primary" : "text-foreground"
                          }`}
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        >
                          {item.name}
                          <ChevronDown className={`h-5 w-5 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`} />
                        </button>
                        {activeDropdown === item.name && (
                          <div className="ml-4 space-y-3 border-l-2 border-border dark:border-border pl-4">
                            {renderMobileDropdownItems(item.name).map((subItem) => (
                              <Link
                                key={subItem.path}
                                href={subItem.path}
                                className="block text-base transition-colors hover:text-primary"
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
                        className={`block text-lg transition-colors hover:text-primary ${
                          pathname === item.path ? "text-primary" : "text-foreground"
                        }`}
                        onClick={toggleMenu}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-8">
                <Button className="w-full bg-primary text-primary-foreground">Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MenuBar;