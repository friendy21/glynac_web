"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  FunnelIcon, 
  AdjustmentsHorizontalIcon, 
  MagnifyingGlassIcon,
  ArrowsPointingOutIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";

// Define interfaces for data types
// Removed Particle interface

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

// Removed StarryBackground Component

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

export function DataSelection(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<number>(0);

  const dataTransformationSteps: Tab[] = [
    { 
      title: "Exploratory Analysis", 
      content: "Understand the data's structure, identify patterns, inconsistencies, and potential biases. This crucial first step lays the foundation for all subsequent processing, as it helps determine which cleaning and transformation techniques are most appropriate." 
    },
    { 
      title: "Data Cleaning", 
      content: "Rectify errors, handle missing values, and address outliers that could skew the model's learning. This step ensures the integrity of the dataset by removing corrupted records, standardizing formats, and imputing missing values using statistically sound methods." 
    },
    { 
      title: "Feature Engineering", 
      content: "Create new, meaningful features from existing ones to enhance the data's representational power. This involves transforming raw data into formats that better represent the underlying problem, such as creating interaction terms, polynomial features, or domain-specific indicators." 
    },
    { 
      title: "Data Augmentation", 
      content: "Artificially expand the dataset to introduce variations and improve model robustness. Techniques include generating synthetic samples, applying transformations, and leveraging domain knowledge to create realistic variations that help the model generalize better to unseen data." 
    },
  ];

  const features: Feature[] = [
    {
      title: "Advanced Data Filtering",
      description: "Intelligently filter out irrelevant data to focus on the most valuable information for training.",
      icon: <FunnelIcon className="h-10 w-10 text-primary" />,
    },
    {
      title: "Contextual Analysis",
      description: "Understand relationships between data points to preserve meaningful patterns during selection.",
      icon: <MagnifyingGlassIcon className="h-10 w-10 text-primary" />,
    },
    {
      title: "Adaptive Processing",
      description: "Automatically adjust selection criteria based on data characteristics and model requirements.",
      icon: <AdjustmentsHorizontalIcon className="h-10 w-10 text-primary" />,
    },
  ];

  // Add scroll animation effect using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    // Observe all elements with the class 'scroll-animate'
    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  return (
    <>
      <Head>
        <title>Data Selection | Glynac.AI</title>
        <meta name="description" content="Transform raw data into a refined, optimized resource for AI training" />
      </Head>
      <div className="bg-background min-h-screen">
        {/* Hero Section with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative min-h-screen flex flex-col items-center justify-center text-center pt-32 pb-16 px-6 bg-primary text-primary-foreground overflow-hidden"
        >
          {/* Background gradient instead of particles */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-500/20 to-accent/30 backdrop-blur-xl"
            initial={{ y: -200 }}
            animate={{ y: 200 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 15, ease: "linear" }}
          />
          <motion.h1 
            className="mb-8 font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tight relative z-10 text-white dark:text-white"
          >
            {["Data", "Selection", "Process"].map((word, index) => (
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
              Transforming raw data into a refined, optimized resource for AI training.
            </p>
          </motion.div>
        </motion.div>

        {/* Intro Section */}
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
                The Foundation of AI Success
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The foundation of any successful AI model lies in the quality and relevance of its training data. While we are provided with a dataset, it's crucial to understand that this raw data is rarely, if ever, immediately usable. It represents the initial pool of information, a potential goldmine, but it requires longer processing before it can effectively shape the learning process. Data selection, therefore, is not merely about choosing a subset; it's about transforming the provided data into a refined, optimized resource for training.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Image Comparison Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-16 bg-muted"
        >
          <div className="container mx-auto px-6">
            <motion.div 
              variants={containerVariants}
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
            >
              <motion.div 
                variants={itemVariants}
                whileHover={hoverEffect}
                className="relative rounded-xl overflow-hidden border border-border shadow-md max-w-md"
              >
                <div className="relative pb-2">
                  <Image
                    src="/img/raw-data(1).webp"
                    alt="Raw Data"
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 w-full text-center py-2 bg-background/75 backdrop-blur-sm">
                    <h3 className="font-semibold text-lg">Raw Data</h3>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center justify-center"
              >
                <ArrowsPointingOutIcon className="h-8 w-8 text-primary transform rotate-45" />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={hoverEffect}
                className="relative rounded-xl overflow-hidden border border-border shadow-md max-w-md"
              >
                <div className="relative pb-2">
                  <Image
                    src="/img/cleaned-data(2).webp"
                    alt="Cleaned Data"
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 w-full text-center py-2 bg-background/75 backdrop-blur-sm">
                    <h3 className="font-semibold text-lg">Cleaned Data</h3>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

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
                Advanced Selection Capabilities
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our platform provides powerful tools to transform raw data into high-quality training sets.
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

        {/* Data Transformation Steps with Tabs */}
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
                Data Transformation Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our comprehensive approach ensures data is properly prepared for optimal AI model performance.
              </p>
            </motion.div>
            
            <div className="max-w-5xl mx-auto">
              <motion.div 
                variants={containerVariants}
                className="flex flex-wrap justify-center gap-2 mb-8"
              >
                {dataTransformationSteps.map((tab, index) => (
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
                  {dataTransformationSteps[activeTab].content}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Visualization Section */}
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { 
                  title: "Exploratory Analysis", 
                  image: "/img/Exploratory-analysis.webp",
                  desc: "Understand the data's structure, identify patterns, inconsistencies, and potential biases."
                },
                { 
                  title: "Data Cleaning", 
                  image: "/img/Data-cleaning.webp",
                  desc: "Rectify errors, handle missing values, and address outliers that could skew the model's learning."
                },
                { 
                  title: "Feature Engineering", 
                  image: "/img/feature-engineering(4).webp",
                  desc: "Create new, meaningful features from existing ones to enhance the data's representational power."
                },
                { 
                  title: "Data Augmentation", 
                  image: "/img/data-augmentation(5).webp",
                  desc: "Artificially expand the dataset to introduce variations and improve model robustness."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-sm"
                >
                  <div className="relative h-48">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm mb-2">
                          {index + 1}
                        </div>
                        <h3 className="text-white text-xl font-bold">{step.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Conclusion Section */}
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
              Transform Your AI Training Data
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-10"
            >
              In essence, data selection is a comprehensive, iterative process of refinement, where the raw data is greatly sculpted into a training dataset that empowers the AI to learn effectively and achieve its intended purpose. It's a journey from raw material to a polished training resource, demanding both technical expertise and a deep understanding of the problem domain.
            </motion.p>
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-md bg-background text-foreground hover:bg-background/90 font-medium"
            >
              Get Started
            </motion.button>
          </div>
        </motion.section>
      </div>
    </>
  );
}

export default DataSelection;