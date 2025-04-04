"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  CpuChipIcon,
  ArrowTrendingUpIcon,
  DocumentChartBarIcon, 
  UserGroupIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";

const ActivityChart = dynamic(() => import("./ActivityChart"), { ssr: false });

// Define interfaces for data types
interface StarryBackgroundProps {
  particleColor?: string;
  blurAmount?: number;
  opacity?: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  color: string;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface IconComponentProps {
  icon: React.ReactNode;
  text: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100 }
  }
};

const hoverEffect = {
  scale: 1.05,
  rotate: 2,
  transition: { duration: 0.5, type: "spring", stiffness: 150 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
};

const StarryBackground: React.FC<StarryBackgroundProps> = ({ 
  particleColor = "white", 
  blurAmount = 10, 
  opacity = 1 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const numParticles = 100;
    const particles: Particle[] = Array.from({ length: numParticles }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
      color: `hsla(${Math.random() * 360}, 100%, 50%, ${opacity})`,
    }));

    let animationFrameId: number;
    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = blurAmount;
        ctx.shadowColor = particleColor;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [blurAmount, opacity, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
      aria-hidden="true"
    />
  );
};

// Icon Component with motion
const IconComponent: React.FC<IconComponentProps> = React.memo(({ icon, text }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ scale: 1.2, rotate: 360 }}
    transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
    className="flex flex-col items-center w-1/2 sm:w-1/3 md:w-1/5 min-w-[160px]"
  >
    <motion.div className="mb-4 rounded-full border border-primary/50 bg-background p-3 h-24 w-24 flex items-center justify-center">
      {icon}
    </motion.div>
    <h3 className="text-lg font-bold text-primary">{text}</h3>
  </motion.div>
));

IconComponent.displayName = 'IconComponent';

const iconCards: IconComponentProps[] = [
  { icon: <ArrowTrendingUpIcon className="h-10 w-10 text-primary" />, text: "Growth" },
  { icon: <DocumentChartBarIcon className="h-10 w-10 text-primary" />, text: "Reports" },
  { icon: <UserGroupIcon className="h-10 w-10 text-primary" />, text: "Team" },
];

// Feature Card Component with motion
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={hoverEffect}
    className="rounded-lg border border-border p-6 bg-background shadow-sm hover:shadow transition-shadow"
  >
    <div className="text-center">
      <motion.div 
        className="flex justify-center mb-4"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

export function StandardizedData(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs: Tab[] = [
    { title: "Responsiveness", content: "Diana's consistent communication and reminders suggest that she is proactive and responsive." },
    { title: "Volume and Frequency", content: "Diana sent 10 emails between January 21 and February 2, averaging 1-2 per day, demonstrating consistent communication." },
    { title: "Positive vs. Complaint Language", content: "Most emails have a neutral tone, focusing on factual updates, while messages about team-building events have a slightly positive undertone." },
    { title: "Inactivity", content: "No indication of inactivity, as her emails were consistently sent over the given timeframe." },
    { title: "Management, Ownership & Pay Complaints", content: "No evidence of discussions about leadership, company direction, or pay-related complaints." },
    { title: "Professionalism & Action-Oriented Language", content: "Diana's emails are concise, professional, and solution-focused, ensuring clarity without unnecessary details." },
    {
      title: "Key Themes and Topics",
      content: (
        <div className="pl-5">
          <ul className="list-disc">
            <li><strong>Facilitating Meetings (30%)</strong> – Organizing and coordinating meetings, particularly for Chicago-based clients.</li>
            <li><strong>Presentation Preparation (20%)</strong> – Preparing and refining presentations with key materials.</li>
            <li><strong>Sales Pricing Discussions (20%)</strong> – Handling sales pricing negotiations and client queries.</li>
            <li><strong>Scheduling Internal Meetings (15%)</strong> – Coordinating team meetings with clear agendas.</li>
            <li><strong>General Team Communication (15%)</strong> – Project updates, task assignments, and reminders.</li>
          </ul>
        </div>
      ),
    },
  ];

  const features: Feature[] = [
    {
      title: "Data Filtering",
      description: "Filters out irrelevant data to focus on meaningful insights.",
      icon: <ChartBarIcon className="h-10 w-10 text-primary" />,
    },
    {
      title: "Privacy Protection",
      description: "Maintains privacy by removing personally identifiable information.",
      icon: <ShieldCheckIcon className="h-10 w-10 text-primary" />,
    },
    {
      title: "AI Integration",
      description: "Prepares structured data sets for AI-driven analysis.",
      icon: <CpuChipIcon className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <>
      <Head>
        <title>Standardized Data Analysis | Glynac.AI</title>
        <meta name="description" content="Unlock meaningful insights with our AI-powered data standardization tools." />
      </Head>
      <div className="bg-background min-h-screen">
        {/* Hero Section with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative min-h-screen flex flex-col items-center justify-center text-center pt-32 pb-16 px-6 bg-primary text-primary-foreground overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30"
            initial={{ y: -200 }}
            animate={{ y: 200 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 15, ease: "linear" }}
          />
          <motion.h1 
            className="mb-8 font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tight relative z-10 text-white dark:text-white"
          >
            {["Standardized", "Data", "Analysis"].map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div 
            variants={fadeIn} 
            initial="hidden" 
            animate="visible" 
            className="relative z-10 max-w-4xl"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-light dark:text-white text-white">
              Unlock meaningful insights with our AI-powered data standardization tools.
            </p>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-24"
        >
          <div className="container mx-auto px-6">
            <motion.div 
              variants={itemVariants}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Enterprise-Grade Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our advanced platform provides the tools you need to extract meaningful insights from complex data sets.
              </p>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Icon Grid Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-20 bg-muted"
        >
          <div className="container mx-auto px-6">
            <motion.div 
              variants={itemVariants}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive Analytics Suite
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A complete toolkit for analyzing and visualizing employee communication data.
              </p>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              className="flex flex-wrap justify-center gap-6"
            >
              {iconCards.map((card, index) => (
                <IconComponent key={index} {...card} />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Email Summary Section with Tabs */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-24 bg-background"
        >
          <div className="container mx-auto px-6">
            <motion.div 
              variants={itemVariants}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Communication Analysis Demo
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore a sample analysis of emails sent by Diana Prince, showing how our platform breaks down communication patterns.
              </p>
            </motion.div>
            
            <div className="max-w-5xl mx-auto">
              <motion.div 
                variants={containerVariants}
                className="flex flex-wrap justify-center gap-2 mb-8"
              >
                {tabs.map((tab, index) => (
                  <motion.button
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      activeTab === index 
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab.title}
                  </motion.button>
                ))}
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="rounded-lg border border-border bg-card p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={activeTab} // Force re-render animation on tab change
              >
                <div className="text-card-foreground">
                  {tabs[activeTab].content}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Standardization Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-24 bg-muted"
        >
          <div className="container mx-auto px-6">
            <motion.div 
              variants={containerVariants}
              className="flex flex-col md:flex-row items-center justify-between gap-12"
            >
              <motion.div 
                variants={itemVariants}
                className="w-full md:w-1/2"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Advanced Standardization Methodology
                </h2>
                <div className="mb-6 text-foreground space-y-4">
                  <p>Our patented analysis formulas synthesize key categories and data into standardized scores on a scale of 1 to 100, providing unprecedented visibility into employee performance and engagement metrics.</p>
                  <p>Standardization allows an employee to be compared to peers with similar demographic data to identify:</p>
                  <motion.ul 
                    variants={containerVariants}
                    className="list-none pl-0 mt-4 space-y-4"
                  >
                    {[
                      { title: "Untapped Potential", description: "Identify employees who could be contributing more with the right support and resources." },
                      { title: "Retention Concerns", description: "Spot early warning signs of potential turnover before it affects your organization." },
                      { title: "Performance Challenges", description: "Pinpoint specific areas where targeted coaching can improve results." }
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-start gap-4 bg-card p-4 rounded-lg border border-border"
                      >
                        <div className="bg-primary rounded-full p-2 text-primary-foreground mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                whileHover={hoverEffect}
                className="w-full md:w-1/2"
              >
                <div className="relative rounded-xl overflow-hidden border border-border shadow-md">
                  <Image
                    src="/img/standarization1.png"
                    alt="Illustration of data standardization process"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Activity Volume Report Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-24 bg-background"
        >
          <div className="container mx-auto px-6">
            <motion.div 
              variants={itemVariants}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Interactive Data Visualization
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our platform turns complex data into clear, actionable visualizations that help you make informed decisions quickly.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
            >
              <div className="p-6 border-b border-border bg-muted">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 1 }}
                      className="text-3xl"
                    >
                      📊
                    </motion.div>
                    <h3 className="text-xl font-bold">Activity Volume Report</h3>
                  </div>
                  <div className="flex gap-2">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 text-sm rounded-md border border-border hover:bg-accent"
                    >
                      Export
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Share
                    </motion.button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="w-full h-[400px] mb-8"
                >
                  <ActivityChart />
                </motion.div>
                
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
                >
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-lg border border-border p-4"
                  >
                    <h4 className="font-semibold mb-2">Purpose</h4>
                    <p className="text-muted-foreground">
                      Show activity levels by time block and day to identify patterns and optimize scheduling.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-lg border border-border p-4"
                  >
                    <h4 className="font-semibold mb-2">Visualization</h4>
                    <p className="text-muted-foreground">
                      Interactive bar graph with filtering capabilities and drill-down options for detailed analysis.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-lg border border-border p-4"
                  >
                    <h4 className="font-semibold mb-2">Insights</h4>
                    <ul className="text-muted-foreground list-disc pl-5 space-y-1">
                      <li>Identify peak productivity periods</li>
                      <li>Spot underutilized time blocks</li>
                      <li>Compare to team and industry benchmarks</li>
                    </ul>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-20 bg-primary text-primary-foreground"
        >
          <div className="container mx-auto px-6 text-center">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Transform Your Data Analytics?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-10"
            >
              Join leading enterprises that have revolutionized their decision-making process with our standardized data analysis platform.
            </motion.p>
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-md bg-background text-foreground hover:bg-background/90 font-medium"
            >
              Request Demo
            </motion.button>
          </div>
        </motion.section>
      </div>
    </>
  );
}

export default StandardizedData;