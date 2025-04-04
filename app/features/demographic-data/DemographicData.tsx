"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import { 
  UserGroupIcon, 
  GlobeAltIcon, 
  CalendarIcon,
  UsersIcon,
  MapIcon
} from "@heroicons/react/24/outline";

// Define interfaces
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface SectionData {
  title: string;
  text: string;
  img: string;
  icon: React.ReactNode;
  stats?: {
    label: string;
    value: string;
  }[];
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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
};

// Feature Card Component with motion
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
    className="rounded-lg border border-border p-6 bg-background shadow-md hover:shadow-lg transition-shadow"
  >
    <div>
      <motion.div 
        className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-6"
        whileHover={{ rotate: 15 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

export function DemographicData(): React.ReactElement {
  const [activeSection, setActiveSection] = useState<number>(0);

  const sections: SectionData[] = [
    {
      title: "Role-Based Seniority Impact",
      text: "Our comprehensive analysis reveals distinct communication patterns between entry-level employees and senior executives. Senior leaders tend to send fewer, more concise messages with higher response rates, while entry-level staff show higher message volumes but lower engagement metrics. Understanding these differences helps organizations bridge communication gaps and improve cross-hierarchical collaboration.",
      img: "/img/feature1a.jpg",
      icon: <UsersIcon className="h-8 w-8" />,
      stats: [
        { label: "Executive Response Rate", value: "87%" },
        { label: "Entry-Level Daily Messages", value: "42" },
        { label: "Cross-Level Collaboration", value: "63%" }
      ]
    },
    {
      title: "Age-Based Impact",
      text: "Age demographics significantly influence work patterns and communication styles. Our analysis tracks responsiveness, communication frequency, and work patterns across different age groups. We've found younger employees (<30) communicate more frequently during non-traditional hours, while employees aged 40+ demonstrate more consistent communication during standard business hours. These insights help organizations better understand generational differences and adapt policies accordingly.",
      img: "/img/feature2a.webp",
      icon: <CalendarIcon className="h-8 w-8" />,
      stats: [
        { label: "Gen-Z After-Hours Work", value: "38%" },
        { label: "Boomer Response Time", value: "3.2h" },
        { label: "Millennial Message Volume", value: "67/day" }
      ]
    },
    {
      title: "Racial Impact",
      text: "Our platform provides sensitive analysis of workforce composition and communication trends to identify inclusion gaps. We examine participation rates in meetings, message frequency, and collaboration patterns across different demographic groups. This data helps organizations ensure equitable communication opportunities and address potential systemic barriers to inclusion, creating a more balanced workplace environment.",
      img: "/img/feature3a.jpg",
      icon: <UserGroupIcon className="h-8 w-8" />,
      stats: [
        { label: "Diverse Team Performance", value: "+27%" },
        { label: "Inclusion Index Score", value: "82/100" },
        { label: "Cross-Cultural Exchanges", value: "12K/mo" }
      ]
    },
    {
      title: "Geographic Impact",
      text: "Location significantly influences work patterns. Our analysis compares remote, hybrid, and in-person employees across metrics like response times, collaboration frequency, and work-hour distribution. Remote workers show more distributed work hours but longer continuous focus periods, while office-based staff engage in more frequent but shorter interactions. These insights help organizations optimize their workplace policies for different work arrangements.",
      img: "/img/feature4a.jpg",
      icon: <MapIcon className="h-8 w-8" />,
      stats: [
        { label: "Remote Deep Work", value: "3.2h/day" },
        { label: "On-Site Collaborations", value: "12/day" },
        { label: "Hybrid Work Efficiency", value: "94%" }
      ]
    },
    {
      title: "Gender-Based Communication",
      text: "Our platform provides detailed analysis of communication patterns across different genders. We track metrics such as message frequency, response times, meeting participation, and communication directness. This data helps organizations identify and address any gender-related disparities in communication practices, fostering a more inclusive workplace where all voices are heard equally and communication styles are valued for their diversity.",
      img: "/img/feature5a.jpg",
      icon: <GlobeAltIcon className="h-8 w-8" />,
      stats: [
        { label: "Meeting Participation Equity", value: "91%" },
        { label: "Balanced Team Innovation", value: "+36%" },
        { label: "Communication Style Diversity", value: "High" }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Demographic Data Analysis | Glynac.AI</title>
        <meta name="description" content="Understanding the impact of demographic factors on workplace communication and productivity" />
      </Head>
      <div className="bg-background min-h-screen">
        {/* Hero Section with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative min-h-[60vh] flex flex-col items-center justify-center text-center pt-32 pb-16 px-6 bg-primary text-primary-foreground overflow-hidden"
        >
          {/* Background gradient animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/40 to-pink-500/20"
            initial={{ y: -100, opacity: 0.5 }}
            animate={{ y: 100, opacity: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 20, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 backdrop-blur-xl"></div>
          
          <motion.div className="relative z-10 max-w-4xl">
            <motion.h1 
              className="mb-8 font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tight text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Demographic Data
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl font-light text-white opacity-90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Uncover insights about how different demographic factors influence workplace communication and productivity
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-24"
        >
          <div className="container mx-auto px-6">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive Analysis Dimensions
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore how demographic factors shape workplace dynamics and influence organizational success
              </p>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sections.map((section, index) => (
                <FeatureCard 
                  key={index}
                  title={section.title} 
                  description={section.text.split('.')[0] + '.'} // Just the first sentence
                  icon={section.icon}
                />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Section Navigator */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-8 bg-muted"
        >
          <div className="container mx-auto px-6">
            <motion.div 
              variants={containerVariants}
              className="flex flex-wrap justify-center gap-3 mb-4"
            >
              {sections.map((section, index) => (
                <motion.button
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeSection === index 
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  onClick={() => setActiveSection(index)}
                >
                  <span className="flex items-center gap-2">
                    {section.icon}
                    <span className="hidden md:inline">{section.title}</span>
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Detailed Sections */}
        <motion.section
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16 bg-background"
        >
          <div className="container mx-auto px-6">
            <motion.div 
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
            >
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="p-2 bg-primary/10 rounded-full">
                    {sections[activeSection].icon}
                  </span>
                  {sections[activeSection].title}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {sections[activeSection].text}
                </p>
                
                {sections[activeSection].stats && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {sections[activeSection].stats.map((stat, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                        className="bg-secondary/30 rounded-lg p-4 text-center"
                      >
                        <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={sections[activeSection].img}
                      alt={sections[activeSection].title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
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
              Ready to Unlock Demographic Insights?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-10"
            >
              Discover how demographic data analysis can transform your understanding of workplace dynamics and drive more inclusive organizational strategies.
            </motion.p>
            <motion.div className="flex flex-wrap justify-center gap-4">
              <motion.button 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-md bg-background text-foreground hover:bg-background/90 font-medium"
              >
                Request Demo
              </motion.button>
              <motion.button 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-md bg-transparent border border-background/70 text-background hover:bg-background/10 font-medium"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}

export default DemographicData;