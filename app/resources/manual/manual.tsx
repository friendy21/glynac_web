import React from "react";
import { motion } from "framer-motion";
import {
  InformationCircleIcon,
  HomeIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

// Define interfaces
interface ContactDataItem {
  title: string;
  icon: React.ElementType;
  description: string;
  link: string;
}

export const contactData: ContactDataItem[] = [
  {
    title: "Overview",
    icon: InformationCircleIcon,
    description:
      "This section provides a comprehensive overview of Glynac, including its features and functionalities.",
    link: "/overview",
  },
  {
    title: "Setup",
    icon: HomeIcon,
    description:
      "Learn how to set up Glynac for your use. This section covers the installation process and configuration.",
    link: "/setup",
  },
  {
    title: "Advanced Features",
    icon: SparklesIcon,
    description:
      "Discover the advanced features of Glynac, including tips for maximizing efficiency and customization.",
    link: "/features",
  },
];

const Manual: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen animate-theme-transition">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-primary/90 dark:bg-primary/70">
        <div className="absolute inset-0 bg-primary/80 dark:bg-primary/60 opacity-60"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-64 h-64 rounded-full bg-primary/50 dark:bg-primary/40 opacity-20 top-10 left-10 animate-float"></div>
          <div className="absolute w-48 h-48 rounded-full bg-primary/40 dark:bg-primary/30 opacity-20 bottom-10 right-10 animate-float delay-1000"></div>
          <div className="absolute w-32 h-32 rounded-full bg-primary/30 dark:bg-primary/20 opacity-20 top-1/2 left-1/2 animate-float delay-2000"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <h1 className="text-white text-4xl lg:text-6xl font-bold text-center drop-shadow-lg">
            Glynac User Manual
          </h1>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="bg-accent dark:bg-secondary py-12 animate-theme-transition">
        {/* Welcome Message */}
        <div className="container px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-background/30 dark:bg-background/20 backdrop-blur-md border border-border/20 p-6 rounded-lg shadow-md text-center animated-bg"
          >
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Welcome to the Glynac User Manual
            </h2>
            <p className="text-lg text-muted-foreground">
              This manual provides you with a comprehensive guide on how to use
              Glynac. Below, you will find links to the full PDF guide, the
              glossary, and the training documentation for each section.
            </p>
          </motion.div>
        </div>

        {/* PDF Guide and Glossary */}
        <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
      }}
      className="container px-6 mx-auto py-12 flex flex-col sm:flex-row sm:justify-between gap-6"
    >
      <motion.div
        variants={{
          hidden: { x: -100, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 },
          },
        }}
        className="w-full sm:w-[48%]"
      >
        <div className="group bg-background/30 dark:bg-background/20 backdrop-blur-md border border-border/20 p-6 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition duration-300 hover:shadow-xl animated-bg animated-border hover:backdrop-blur-none">
          <div
            className="w-full h-48 sm:h-64 bg-muted mb-4"
            style={{
              backgroundImage: `url(/api/placeholder/800/600)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <h3 className="text-xl font-semibold text-center text-foreground mb-4">
            Full PDF Guide
          </h3>
          <p className="text-lg text-muted-foreground mb-4">
            Download the full PDF guide for a comprehensive understanding of
            Glynac. Click below to get started.
          </p>
          <a
            href="https://example.com/glynac-guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary/80 text-primary-foreground py-2 px-4 rounded-md text-lg transition duration-300 hover:shadow-lg"
          >
            Download Full Guide
          </a>
        </div>
      </motion.div>
      <motion.div
        variants={{
          hidden: { x: 100, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 },
          },
        }}
        className="w-full sm:w-[48%]"
      >
        <div className="group bg-background/30 dark:bg-background/20 backdrop-blur-md border border-border/20 p-6 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition duration-300 hover:shadow-xl animated-bg animated-border hover:backdrop-blur-none">
          <div
            className="w-full h-48 sm:h-64 bg-muted mb-4"
            style={{
              backgroundImage: `url(/api/placeholder/800/600)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <h3 className="text-xl font-semibold text-center text-foreground mb-4">
            Glossary
          </h3>
          <p className="text-lg text-muted-foreground mb-4">
            Access the glossary to understand the terminology used in
            Glynac. Click the link below to view.
          </p>
          <a
            href="/glossary"
            className="inline-block bg-primary hover:bg-primary/80 text-primary-foreground py-2 px-4 rounded-md text-lg transition duration-300 hover:shadow-lg"
          >
            View Glossary
          </a>
        </div>
      </motion.div>
    </motion.div>

        {/* Training Documentation */}
        <div className="container px-6 mx-auto py-12">
          <h3 className="text-2xl font-semibold mb-8 text-center text-foreground">
            Training Documentation
          </h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
          >
            {contactData.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 50 },
                  },
                }}
                className="bg-background/30 dark:bg-background/20 backdrop-blur-md border border-border/20 p-6 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition duration-300 hover:shadow-xl animated-bg animated-border"
              >
                <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <motion.div
                    whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                  >
                    <item.icon className="h-8 w-8 text-primary-foreground" />
                  </motion.div>
                </div>
                <h4 className="text-xl font-semibold text-center text-foreground mb-4">
                  {item.title}
                </h4>
                <p className="text-lg text-muted-foreground text-center mb-4">
                  {item.description}
                </p>
                <a
                  href={item.link}
                  className="inline-block bg-primary hover:bg-primary/80 text-primary-foreground py-2 px-4 rounded-md text-lg transition duration-300 hover:shadow-lg"
                >
                  View
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
          100% { transform: translate(0, 0); }
        }
        .animate-float {
          animation: float 8s infinite ease-in-out;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Manual;