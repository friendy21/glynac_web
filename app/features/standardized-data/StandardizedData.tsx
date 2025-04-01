"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import { ChartBarIcon, ShieldCheckIcon, CpuChipIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const ActivityChart = dynamic(() => import("./ActivityChart"), { ssr: false });

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
      style={{ opacity }}
      aria-hidden="true"
    />
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
    className="shadow-lg hover:shadow-xl transition-shadow"
  >
    <Card>
      <CardBody className="text-center">
        {icon}
        <Typography variant="h5" className="text-gray-900 font-bold mb-2">
          {title}
        </Typography>
        <Typography variant="paragraph" className="text-gray-800">
          {description}
        </Typography>
      </CardBody>
    </Card>
  </motion.div>
);

export function StandardizedData(): JSX.Element {
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
          <ul className="list-disc text-white">
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
      icon: <ChartBarIcon className="h-10 w-10 text-red-500" />,
    },
    {
      title: "Privacy Protection",
      description: "Maintains privacy by removing personally identifiable information.",
      icon: <ShieldCheckIcon className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "AI Integration",
      description: "Prepares structured data sets for AI-driven analysis.",
      icon: <CpuChipIcon className="h-10 w-10 text-blue-500" />,
    },
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative flex min-h-72 items-center justify-center overflow-hidden bg-gray-900">
        <StarryBackground particleColor="rgba(96, 165, 250, 0.8)" blurAmount={15} opacity={0.9} />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/20 to-pink-500/10 backdrop-blur-xl"></div>
        <div className="container mx-auto text-center z-10 relative">
          <Typography variant="h1" className="mb-4 font-black text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-lg">
            Standardized Data Analysis
          </Typography>
          <Typography variant="lead" className="text-lg sm:text-xl text-white mb-8">
            Unlock meaningful insights with our AI-powered data standardization tools.
          </Typography>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-8 py-16">
        <Typography variant="h2" className="text-3xl font-bold text-center mb-12 text-gray-700">
          Key Features
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Email Summary Section */}
      <section className="mt-16 relative overflow-hidden rounded-lg bg-gray-900 p-8 mx-8">
        <StarryBackground particleColor="rgba(255, 255, 255, 0.97)" blurAmount={8} opacity={1} />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <Typography variant="h2" className="text-3xl font-bold text-center mb-12 text-white">
            Summary of Emails Sent by Diana Prince
          </Typography>
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {tabs.map((tab, index) => (
              <Button
                key={index}
                color={activeTab === index ? "blue" : "gray"}
                className={`w-36 h-12 text-sm p-2 transition-all rounded-full ${activeTab === index ? "bg-blue-900 shadow-lg" : "bg-gray-800"}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </Button>
            ))}
          </div>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-lg bg-white/10 backdrop-blur-sm">
              <CardBody>
                <div className="text-white">
                  {tabs[activeTab].content}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Standardization Section */}
      <section className="container mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="w-full md:w-1/2 text-left md:pr-10">
            <Typography variant="h2" className="text-3xl font-bold text-gray-900 mb-6">
              Standardization
            </Typography>
            <div className="text-gray-800 mb-4">
              Our patented analysis formulas synthesize key categories and data into standardized scores on a scale of 1 to 100. Standardization allows an employee to be compared to peers with similar demographic data to find:
              <ul className="list-disc pl-5 mt-2">
                <li>Untapped potential</li>
                <li>Retention concerns</li>
                <li>Performance challenges</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <Image
              src="/img/standarization1.png"
              alt="Illustration of data standardization process"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Client Cases Section */}
      <section className="bg-gray-100 w-full px-8 py-16">
        <div className="text-center mb-16">
          <Typography variant="h1" className="text-4xl font-bold text-gray-900 mb-4">
            Client's Cases: Visualized Reports
          </Typography>
          <Typography variant="paragraph" className="text-lg text-gray-700">
            The AI Platform generates detailed reports to analyze communication patterns across various dimensions.
          </Typography>
        </div>

        <div className="flex items-center space-x-4 mb-16">
          <div className="text-4xl text-gray-500">📊</div>
          <Typography variant="h2" className="text-2xl font-semibold text-gray-800">
            Employee Reports
          </Typography>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h5" className="text-xl font-semibold text-gray-800 mb-4">
            Activity Volume Report
          </Typography>
          <div className="w-full">
            <ActivityChart />
          </div>
          <div className="text-gray-700 mb-4">
            <strong>Purpose</strong>: Show activity levels by time block and day.
          </div>
          <div className="text-gray-700 mb-4">
            <strong>Visualization</strong>: Via bar graph.
          </div>
          <div className="text-gray-700 mb-4">
            <strong>Insights</strong>:
            <ul className="list-disc pl-5 mt-2">
              <li>Identify time blocks with the least and most activity.</li>
              <li>Compare these periods to the overall average activity.</li>
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default StandardizedData;