"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedElement } from "@/app/components/motion";

// TypeScript Interfaces
interface Testimonial {
  quote: string;
  author: string;
  role: string;
  bgImage?: string;
}

interface Benefit {
  text: string;
}

const ParallaxTestimonials = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [isLastSectionVisible, setIsLastSectionVisible] = useState(false);
  
  // Testimonial Data with Online Images
  const testimonials: Testimonial[] = [
    {
      quote: "Glynac has transformed how we analyze our customer data. The AI tools are incredibly powerful yet intuitive.",
      author: "Sarah Johnson",
      role: "CTO, TechCorp",
      bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475" // Technology innovation image
    },
    {
      quote: "The security features in Glynac's platform gave us the confidence to migrate all our sensitive data analysis.",
      author: "Michael Chen",
      role: "Security Director, DataSafe Inc.",
      bgImage: "https://images.unsplash.com/photo-1563206767-5b18f218e8de" // Data security image
    },
    {
      quote: "We've seen a 40% increase in productivity since implementing Glynac's communication tools.",
      author: "Emily Rodriguez",
      role: "Operations Manager, Global Solutions",
      bgImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf" // Productivity image
    },
  ];

  // Benefits Data
  const benefits: Benefit[] = [
    { text: "Advanced AI analysis capabilities" },
    { text: "Enterprise-grade security" },
    { text: "Seamless integration with existing tools" },
    { text: "Comprehensive data management" },
    { text: "Real-time collaboration features" },
    { text: "Customizable dashboards and reports" },
  ];

  // Initialize ScrollMagic and Lenis smooth scroll
  useEffect(() => {
    const importLibraries = async () => {
      if (typeof window !== 'undefined') {
        try {
          const Lenis = (await import('lenis')).default;
          const lenis = new Lenis();
          
          const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
          };
          requestAnimationFrame(raf);
          
          const ScrollMagic = (await import('scrollmagic')).default;
          const controller = new ScrollMagic.Controller();
          
          sectionRefs.current.forEach((ref, index) => {
            if (ref && index < sectionRefs.current.length - 1) {
              new ScrollMagic.Scene({
                triggerElement: sectionRefs.current[index + 1],
                triggerHook: "onEnter",
                duration: "200%"
              }).setPin(ref.querySelector(".pinWrapper"), {
                pushFollowers: false
              }).addTo(controller);
            }
          });
          
          // Create a scene to detect when the last section is entered
          const lastSectionIndex = testimonials.length;
          if (sectionRefs.current[lastSectionIndex]) {
            const lastSectionScene = new ScrollMagic.Scene({
              triggerElement: sectionRefs.current[lastSectionIndex],
              triggerHook: "onEnter",
            })
            .on("enter", () => {
              setIsLastSectionVisible(true);
              // Hide pin wrappers when entering the last section
              sectionRefs.current.forEach((ref, idx) => {
                if (ref && idx < lastSectionIndex) {
                  const pinWrapper = ref.querySelector(".pinWrapper");
                  if (pinWrapper) {
                    (pinWrapper as HTMLElement).style.opacity = "0";
                    (pinWrapper as HTMLElement).style.visibility = "hidden";
                  }
                }
              });
            })
            .on("leave", () => {
              setIsLastSectionVisible(false);
              // Show pin wrappers when leaving the last section
              sectionRefs.current.forEach((ref, idx) => {
                if (ref && idx < lastSectionIndex) {
                  const pinWrapper = ref.querySelector(".pinWrapper");
                  if (pinWrapper) {
                    (pinWrapper as HTMLElement).style.opacity = "1";
                    (pinWrapper as HTMLElement).style.visibility = "visible";
                  }
                }
              });
            })
            .addTo(controller);
          }
          
          const scrollBtn = document.getElementById('scrollBtn');
          if (scrollBtn) {
            window.addEventListener('scroll', function () {
              if (window.scrollY > 0) {
                scrollBtn.classList.add('move');
              } else {
                scrollBtn.classList.remove('move');
              }
            });
          }
        } catch (error) {
          console.error("Error loading libraries:", error);
        }
      }
    };
    
    importLibraries();
    
    return () => {};
  }, [testimonials.length]);

  return (
    <div className="parallax-container">
      {/* Custom CSS with added transitions for pin wrappers */}
      <style jsx global>{`
        .event {
          position: relative;
          overflow: hidden;
          height: 100vh;
          width: 100vw;
          z-index: 1;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }
        
        .event::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background-color: rgba(21, 22, 28, 0.75);
        }
        
        .image {
          height: 500px;
          width: 500px;
          top: 50%;
          left: auto;
          right: 100px;
          position: absolute;
          border-radius: 12px;
          transform: translate(0%, -50%);
          box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          transition: width 1s, height 1s;
        }
        
        .text {
          top: 50%;
          left: 0;
          position: absolute;
          transform: translate(100px, -50%);
          width: 43%;
        }
        
        .scrollBtn {
          position: absolute;
          bottom: 2.5%;
          left: 50%;
          transform: translate(-50%, 0);
          width: 100px;
          height: auto;
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 10px;
          z-index: 1;
          transition: all ease-in-out 0.35s;
        }
        
        .scrollBtn.move {
          visibility: hidden;
          opacity: 0;
        }
        
        .scrollBtn span {
          width: 12px;
          height: 12px;
          display: block;
          border-bottom: 2px solid white;
          border-right: 2px solid white;
          transform: rotate(45deg);
          animation: animate 2s infinite;
          margin: auto;
        }
        
        @keyframes animate {
          0% {
            opacity: 0;
            transform: rotate(45deg) translate(-10px, -10px);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: rotate(45deg) translate(10px, 10px);
          }
        }
        
        .pinWrapper {
          height: 100%;
          width: 100%;
          position: relative;
          z-index: 11;
          transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        @media screen and (max-width: 1399px) {
          .text {
            transform: translate(60px, -50%);
          }
          .image {
            height: 450px;
            width: 450px;
            right: 80px;
          }
        }
        
        @media screen and (max-width: 1199px) {
          .text {
            transform: translate(40px, -50%);
            width: 44%;
          }
          .image {
            height: 400px;
            width: 400px;
            right: 60px;
          }
        }
        
        @media screen and (max-width: 991px) {
          .text {
            transform: translate(24px, -50%);
            width: 44%;
          }
          .image {
            height: 310px;
            width: 310px;
            right: 40px;
          }
        }
        
        @media screen and (max-width: 767px) {
          .image {
            height: 220px;
            width: 220px;
          }
        }
        
        @media screen and (max-width: 576px) {
          .text {
            top: 70%;
            width: calc(100% - 40px);
            transform: translate(20px, -50%);
            z-index: 20;
          }
          .image {
            top: 30%;
            left: 50%;
            right: auto;
            transform: translate(-50%, -50%);
            width: 85%;
            height: 40%;
            z-index: 10;
          }
          .event::before {
            background-color: rgba(21, 22, 28, 0.85);
          }
        }
      `}</style>

      {/* Scroll Button */}
      <div id="scrollBtn" className="scrollBtn">
        <span></span>
        <h6 className="text-white text-xs uppercase tracking-wider">Scroll Down</h6>
      </div>

      {/* Testimonial Sections */}
      {testimonials.map((testimonial, i) => (
        <section
          key={testimonial.author}
          ref={el => { sectionRefs.current[i] = el; }}
          id={`section${i + 1}`}
          className="event"
          style={{ backgroundImage: `url(${testimonial.bgImage})` }}
        >
          <div className="pinWrapper">
            <div className="text">
              <h2 className="text-2xl font-bold mb-6 uppercase text-white">
                {i === 0 ? "Testimonials" : ""}
                {i === 1 ? "Enterprise Security" : ""}
                {i === 2 ? "Productivity Tools" : ""}
              </h2>
              <p className="text-4xl font-light mb-8 text-white">
                {testimonial.quote}
              </p>
              <div className="mt-8">
                <h4 className="text-xl font-semibold text-white">{testimonial.author}</h4>
                <p className="text-base text-white/80">{testimonial.role}</p>
              </div>
            </div>

            <div className="image">
              <Image
                src={testimonial.bgImage!}
                alt={testimonial.author}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      ))}

      {/* Benefits Section */}
      <section
        ref={el => { sectionRefs.current[testimonials.length] = el; }}
        id={`section${testimonials.length + 1}`}
        className="event"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1551288049-b5f4a21151c6)` }} // Data dashboard image
      >
        <div className="pinWrapper">
          <div className="text">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-white">
              Why Choose Glynac
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
              Transform Your Business with Glynac
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Our comprehensive suite of tools is designed to help you make better decisions, improve efficiency, and drive growth.
            </p>
            <ul className="grid gap-2 py-4">
              {benefits.map((benefit, i) => (
                <AnimatedElement key={i} animation="slideIn" delay={0.1 + i * 0.1}>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-white">{benefit.text}</span>
                  </li>
                </AnimatedElement>
              ))}
            </ul>
            <div className="flex flex-col gap-2 min-[400px]:flex-row mt-8">
              <Button className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-transform" size="lg">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 bg-primary/10 backdrop-blur-sm hover:bg-primary/20 text-white">
                View Pricing
              </Button>
            </div>
          </div>
          
          <div className="image">
            <Image
              src="https://static.wixstatic.com/media/11062b_2d80a3e84c064ae6aa91e4e58652474d~mv2.jpg" // Data dashboard image
              alt="Glynac Platform"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParallaxTestimonials;