"use client";

import React, { useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle,
  Database,
  LineChart,
  Lock,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedElement } from "./components/motion";
import ExpandingFeatures from "./components/ExpandingFeatures";
import ParallaxTestimonials from "./components/ParallaxTestimonials";

// TypeScript Interfaces
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

export default function Home(): React.ReactElement {
  const primaryColorRef = useRef<HTMLSpanElement>(null);

    // Function to initialize or update particles 
    const initParticles = useCallback(() => {
      if (typeof window === "undefined" || !(window as any).particlesJS) return;

      // Clean up existing instances to prevent lag
      if ((window as any).pJSDom && (window as any).pJSDom.length > 0) {
        (window as any).pJSDom[0].pJS.fn.vendors.destroypJS();
        (window as any).pJSDom = [];
      }

      // Check if dark mode is active
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      // Define optimized particle configuration with enhanced contrast
      const config: any = isDarkMode
        ? {
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } }, 
              color: { value: "#60a5fa" },
              shape: { type: "circle" },
              opacity: { value: 0.7, random: false },
              size: { value: 3, random: true }, 
              line_linked: {
                enable: true,
                distance: 150, 
                color: "#93c5fd", 
                opacity: 0.9, 
                width: 1.5, 
              },
              move: {
                enable: true,
                speed: 0.7, 
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
              },
            },
          }
        : {
            // Light mode configuration with enhanced contrast
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: "#111827" }, 
              shape: { type: "circle" },
              opacity: { value: 0.7, random: false }, 
              size: { value: 3, random: true }, 
              line_linked: {
                enable: true,
                distance: 150,
                color: "#000000", 
                opacity: 0.5, 
                width: 1.5,
              },
              move: {
                enable: true,
                speed: 0.7,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
              },
            },
          };

      // Enhanced interactivity settings with improved mouse interactions
      config.interactivity = {
        detect_on: "canvas",
        events: {
          onhover: { 
            enable: true, 
            mode: "grab" 
          },
          onclick: { 
            enable: true,
            mode: "push" 
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140, 
            line_linked: {
              opacity: 0.8
            }
          },
          repulse: { 
            distance: 200, 
            duration: 0.4 
          },
          push: { 
            particles_nb: 10 
          },
          remove: {
            particles_nb: 2
          },
          bubble: {
            distance: 150,
            size: 6,
            duration: 2,
            opacity: 0.8,
            speed: 3
          }
        },
      };
      config.retina_detect = true;

      // Initialize particles with the optimized configuration
      (window as any).particlesJS("particles-js", config);
    }, []);

  // Load particles.js script only once
  useEffect(() => {
    // Check if particles.js is already loaded
    if (typeof window !== "undefined" && !(window as any).particlesJS) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js";
      script.async = true;
      script.onload = initParticles;
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    } else if (typeof window !== "undefined" && (window as any).particlesJS) {
      // If already loaded, just initialize
      initParticles();
    }
  }, [initParticles]);

  // Separate effect for theme change listeners
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Debounce function to prevent too frequent updates
    const debounce = (func: Function, wait: number) => {
      let timeout: NodeJS.Timeout;
      return function executedFunction(...args: any[]) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    // Debounced version of theme change handler
    const debouncedHandleThemeChange = debounce(() => {
      // Destroy previous particles instance if it exists
      if ((window as any).pJSDom && (window as any).pJSDom.length > 0) {
        (window as any).pJSDom[0].pJS.fn.vendors.destroypJS();
        (window as any).pJSDom = [];
      }
      initParticles();
    }, 300); 

    // Watch for theme changes via media query
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", debouncedHandleThemeChange);

    // Watch for manual class changes (e.g., via Tailwind)
    const observer = new MutationObserver(debouncedHandleThemeChange);
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ["class"] 
    });

    return () => {
      mediaQuery.removeEventListener("change", debouncedHandleThemeChange);
      observer.disconnect();
      
      // Clean up particles on component unmount
      if ((window as any).pJSDom && (window as any).pJSDom.length > 0) {
        (window as any).pJSDom[0].pJS.fn.vendors.destroypJS();
        (window as any).pJSDom = [];
      }
    };
  }, [initParticles]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Content */}
        <div className="container px-4 md:px-6 relative z-20">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <AnimatedElement animation="fadeIn" className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-sm text-primary backdrop-blur-md animate-bounce">
                Introducing Glynac
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-foreground drop-shadow-lg animate-text">
                AI-Powered Solutions for Business Transformation
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl drop-shadow animate-text" style={{ animationDelay: "0.5s" }}>
                Unlock the power of AI with Glynac's comprehensive suite...
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  className="bg-primary hover:bg-primary/90 backdrop-blur-sm transform hover:scale-105 transition-transform"
                  size="lg"
                  aria-label="Get Started"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-primary/10 backdrop-blur-sm hover:bg-primary/10 transform hover:scale-105 transition-transform"
                  aria-label="View Pricing"
                >
                  View Pricing
                </Button>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeIn" delay={0.2} className="mx-auto lg:ml-auto">
              <div className="relative">
                <div className="relative overflow-hidden rounded-xl border bg-background/30 shadow-xl backdrop-blur-md transform hover:rotate-1 transition-transform">
                  <Image
                    src="/img/landing_image.PNG?height=1000&width=1000"
                    width={1000}
                    height={1000}
                    alt="Glynac Dashboard"
                    className="w-full object-cover opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="rounded-lg bg-background/70 p-4 backdrop-blur">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/20 p-2 backdrop-blur-md">
                          <BrainCircuit className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-primary">AI Analysis Complete</h3>
                          <p className="text-xs text-primary/80">Data insights ready for review</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Glow Effects */}
                <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-primary/30 blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/30 blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
              </div>
            </AnimatedElement>
          </div>
        </div>

        {/* Particles Effect */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div id="particles-js" className="w-full h-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <ExpandingFeatures />
      
      {/* Parallax Testimonials Section*/}
      <ParallaxTestimonials />

      {/* How It Works Section */}

      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-extrabold mb-8 text-primary">
            How Does Glynac.ai Work?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-muted-foreground">
            Glynac A.I. is an A.I. application that tracks the performance of
            employees by collecting data from common work applications such as
            Outlook, Microsoft Teams, and more. The data is analyzed by A.I. to
            determine overall productivity and employee attitude.
          </p>
          <div className="flex justify-center items-center space-x-8">
            {[
              { src: "/img/left-process.png", alt: "Left Process", size: "w-2/5" },
              { src: "/img/right-arrow.png", alt: "Right Arrow", size: "w-1/12" },
              { src: "/img/center-process.png", alt: "Center Process", size: "w-1/5" },
              { src: "/img/left-arrow.png", alt: "Left Arrow", size: "w-1/12" },
              { src: "/img/right-process.png", alt: "Right Process", size: "w-2/5" },
            ].map((img, index) => (
              <div key={index} className={img.size}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.size === "w-2/5" ? 400 : img.size === "w-1/5" ? 200 : 100}
                  height={200}
                  className="w-full object-contain rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Overview Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <AnimatedElement animation="fadeIn" delay={0.2} className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                  <Image
                    src="https://ssdc.ac.in/wp-content/uploads/2023/03/Business-Analytics.jpg"
                    width={800}
                    height={600}
                    alt="Glynac Platform Overview"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-lg bg-background/95 p-4 backdrop-blur">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Database className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Comprehensive Data Management</h3>
                        <p className="text-xs text-muted-foreground">Manage all your data in one place with ease</p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeIn" className="order-1 lg:order-2">
              <div className="space-y-4">
                <div className="uppercase text-base font-bold text-primary">PLATFORM OVERVIEW</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Explore Glynac at Your Own Pace</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Learn how to harness the power of Glynac's features to accelerate your business growth.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-transform" size="lg" aria-label="Learn More">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </AnimatedElement>
          </div>

        </div>
      </section>
    </div>
  );
}