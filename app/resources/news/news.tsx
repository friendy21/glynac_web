"use client";

import { Typography, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";

// Define TypeScript interfaces
interface Slide {
  title: string;
  description: string;
  imageUrl: string;
}

interface Category {
  name: string;
  description: string;
  imageUrl: string;
}

interface FooterLink {
  text: string;
  href: string;
}

interface SocialIcon {
  src: string;
  alt: string;
  href: string;
}

export function News(): React.ReactElement {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const slides: Slide[] = [
    {
      title: "Business Trends in 2025",
      description: "We explore the key trends to watch for in the business world in the coming years.",
      imageUrl: "/img/Bus Trend.jpeg",
    },
    {
      title: "Exploring the Future of AI",
      description: "A deep dive into the advancements in AI and how it's shaping industries worldwide.",
      imageUrl: "/img/AI 2.jpeg",
    },
  ];

  const categories: Category[] = [
    { name: "Business", description: "AI helps businesses streamline operations, enhance customer experiences, and make data-driven decisions. With AI-powered tools, businesses can automate tasks, improve productivity, and predict market trends more accurately.", imageUrl: "/img/Business.jpg" },
    { name: "Technology", description: "AI is at the forefront of technological advancements, enabling smarter devices, enhanced connectivity, and automation of complex systems. From self-driving cars to advanced robotics, AI is transforming technology by making it more adaptive, efficient, and scalable.", imageUrl: "/img/Technology.jpeg" },
    { name: "Innovation", description: "New ideas and breakthroughs in various industries.AI drives innovation by enabling new solutions that were previously impossible. With AI, industries are able to develop cutting-edge products, automate processes, and create new business models.", imageUrl: "/img/Innovation.jpg" },
  ];

  const footerLinks: FooterLink[] = [
    { text: "Home", href: "/home" },
    { text: "Software", href: "/software" },
    { text: "Features", href: "/features" },
    { text: "AI Analysis", href: "/ai-analysis" },
    { text: "Pricing", href: "/pricing" },
    { text: "Security", href: "/security" },
    { text: "Blog", href: "/blog" },
    { text: "Updates", href: "/updates" },
    { text: "Manual", href: "/manual" },
    { text: "FAQ", href: "/faq" },
    { text: "Partner Program", href: "/partner-program" },
    { text: "Support", href: "/support" },
    { text: "Contacts", href: "/contacts" },
    { text: "About Us", href: "/about-us" },
  ];

  const socialIcons: SocialIcon[] = [
    { src: "/img/Facebook.jfif", alt: "Facebook", href: "#" },
    { src: "/img/Instagram.png", alt: "Instagram", href: "#" },
    { src: "/img/Linkedin.png", alt: "LinkedIn", href: "#" },
    { src: "/img/X.jfif", alt: "Twitter", href: "#" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="container mx-auto px-4 py-8 mt-16 md:mt-8">
      {/* Header */}
      <div className="relative mb-8 animate-fadeIn">
        <Typography 
          variant="h1" 
          className="text-3xl md:text-5xl font-bold text-gray-900"
          placeholder=""
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <span className="text-red-500 animate-pulse">N</span>ews
        </Typography>
        <div className="w-full h-[2px] bg-gradient-to-r from-red-500 to-gray-900 mt-2"></div>
      </div>

      {/* Intro Section */}
      <div className="bg-white rounded-xl shadow-lg mb-8 animate-fadeInUp shadow-2xl border-[#3B82F6] bg-white/95 p-4 md:p-8 rounded-xl transform transition-all duration-700 hover:scale-105 md:hover:scale-110 hover:shadow-[0_0_50px_rgba(255,182,193,0.7)]">
        <Typography
          variant="h2"
          className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Stay Up to Date with the Latest News
        </Typography>
        <Typography 
          variant="paragraph" 
          className="text-base md:text-lg text-gray-600"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Stay informed with the latest business, technology, and innovation news. Discover in-depth analysis, expert commentary, and breaking news.
        </Typography>
      </div>

      {/* Carousel */}
      <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden mb-8 shadow-lg hover:scale-105 md:hover:scale-110 transform transition-all duration-700">
        {/* Carousel Content */}
        <div className="relative w-full h-full flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 md:p-6">
                <Typography variant="h3" className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  {slide.title}
                </Typography>
                <Typography variant="paragraph" className="text-sm md:text-lg text-white mb-2 md:mb-4" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                  {slide.description}
                </Typography>
                <a
                  href={`/article/${slide.title.toLowerCase().replace(" ", "-")}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm md:text-base"
                >
                  Read more...
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows in Circular Buttons */}
        <button
          className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 rounded-full bg-white p-2 md:p-4 shadow-lg opacity-50 hover:opacity-75 transition-opacity z-20 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        >
          &lt;
        </button>
        
        <button
          className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 rounded-full bg-white p-2 md:p-4 shadow-lg opacity-50 hover:opacity-75 transition-opacity z-20 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        >
          &gt;
        </button>
      </div>

      {/* Categories Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8">
        <Typography variant="h3" className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Explore Categories
        </Typography>
        <Typography variant="paragraph" className="text-sm md:text-base text-gray-600 mb-4 md:mb-6" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
          Explore a wide range of categories that keep you informed about the latest trends and updates.
        </Typography>
        
        {/* Category buttons and images in separate fields with light pink background */}
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="hover:scale-105 md:hover:scale-110 transform transition-all duration-700 flex flex-col items-center bg-white-100 p-4 md:p-6 rounded-xl max-w-4xl mx-auto glassmorphism-extreme bg-[#4239c2]/10 backdrop-lg mt-6 md:mt-12 relative flex items-center justify-center py-8 md:py-19 bg-black rounded-xl border border-[#f370e8]/30 transition-all duration-700 hover:shadow-[0_0_50px_rgba(255,182,193,0.9)]"
            >
              <div className="w-full h-[180px] md:h-[220px] rounded-lg overflow-hidden mb-4 transform transition-transform duration-300 hover:scale-105">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Conditionally render button or description */}
              {selectedCategory === category.name ? (
                <div className="p-2 md:p-4">
                  <Typography variant="paragraph" className="text-sm md:text-lg text-gray-600 mb-4 text-center" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                    {category.description}
                  </Typography>
                  <Button
                    color="blue"
                    size="sm"
                    className="mt-2 transition-transform duration-300 hover:scale-105"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    onClick={() => setSelectedCategory(null)}
                  >
                    Back
                  </Button>
                </div>
              ) : (
                <Button
                  color="red"
                  size="sm"
                  className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-lg transition-transform duration-800 hover:scale-105"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Expert Insights Section */}
      <div className="relative w-full h-[200px] md:h-[300px] rounded-xl overflow-hidden mb-8 shadow-lg animate-fadeInUp hover:scale-105 md:hover:scale-110 transform transition-all duration-700 hover:shadow-[0_0_50px_rgba(255,182,193,0.7)]">
        <img
          src="/img/expert.jpg"
          alt="Expert Insights"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 md:p-6">
          <Typography variant="h3" className="text-xl md:text-2xl font-semibold text-white mb-1 md:mb-2" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
            Expert Insights
          </Typography>
          <Typography variant="paragraph" className="text-sm md:text-lg text-white"placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
            Read exclusive interviews and insights from industry leaders and experts.
          </Typography>
          <a
            href="/expert-interviews"
            className="text-blue-400 hover:text-blue-300 transition-colors mt-1 md:mt-2 inline-block text-sm md:text-base"
          >
            See Interviews...
          </a>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative w-full h-auto min-h-[500px] md:h-[450px] bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        <img
          src="/img/pattern.png"
          alt="Background Pattern"
          className="w-full h-full object-cover opacity-30 absolute inset-0"
        />
        <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 p-4 md:p-6 animate-fadeInUp">
          <Typography variant="h2" className="text-lg md:text-xl font-semibold text-white mb-2" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
            Stay Updated with Our Newsletter
          </Typography>
          <Typography variant="paragraph" className="text-sm md:text-base text-white mb-4"placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
            Subscribe now to get the latest news, analysis, and insights delivered to your inbox.
          </Typography>
          <Button
            color="white"
            size="sm"
            className="px-4 py-2 md:px-6 md:py-3 transition-transform duration-300 hover:scale-105 text-sm md:text-base"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Subscribe Now
          </Button>
        </div>
        <div className="absolute top-4 md:top-6 left-4 md:left-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 text-white text-xs sm:text-sm md:text-base max-h-[250px] overflow-y-auto pr-2">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="hover:text-red-400 transition-colors mb-2"
            >
              {link.text}
            </a>
          ))}
        </div>
        <div className="absolute top-4 right-4 md:top-6 md:right-6 flex gap-2 md:gap-4">
          {socialIcons.map((icon, index) => (
            <a
              key={index}
              href={icon.href}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <img src={icon.src} alt={icon.alt} className="w-4 h-4 sm:w-6 sm:h-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default News;