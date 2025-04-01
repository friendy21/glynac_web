"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import Head from "next/head";

// Color palette (identical to CommunicationTools)
const colors = {
  primary: "#1E3A8A",
  secondary: "#3B82F6",
  accent: "#60A5FA",
  text: "#64748B",
  white: "#FFFFFF",
  lightGray: "#F7FAFC",
  softBlue: "#E0F2FE",
  darkPrimary: "#0F1C4D",
};

// Sample software content object with multiple categories
const softwareContent = {
  "communication-tools": {
    title: "Communication Tools",
    description: "Explore top communication tools designed to improve collaboration and productivity.",
    image: "/img/data-image.jpg",
    details: [
      {
        heading: "What Are Communication Tools?",
        text: "Communication tools enable teams to collaborate efficiently, share information in real-time, and streamline workflow through various digital channels.",
      },
    ],
    prosAndCons: {
      pros: [
        "Enhance team collaboration and productivity.",
        "Allows for real-time communication regardless of location.",
        "Reduces email clutter by offering instant messaging alternatives.",
        "Supports video conferencing and file sharing.",
      ],
      cons: [
        "Some tools require training for effective use.",
        "Security concerns when sharing sensitive information.",
        "Can lead to communication overload if not managed properly.",
      ],
    },
    comparisonTable: {
      headers: ["Feature", "Slack", "Zoom", "Google Meet"],
      rows: [
        ["Instant Messaging", "Yes", "No", "No"],
        ["Video Conferencing", "No", "Yes", "Yes"],
        ["File Sharing", "Yes", "Yes", "Yes"],
        ["Screen Sharing", "Yes", "Yes", "Yes"],
        ["Integration with Other Apps", "Extensive", "Moderate", "Limited"],
      ],
    },
    useCases: [
      {
        title: "When to Use Communication Tools?",
        points: [
          "For remote teams needing seamless real-time collaboration.",
          "To reduce reliance on email for quick updates and discussions.",
          "For hosting virtual meetings and screen-sharing sessions.",
          "When managing projects across different teams and departments.",
        ],
      },
      {
        title: "Best Practices for Using Communication Tools",
        points: [
          "Set clear communication guidelines to avoid overload.",
          "Use appropriate channels for different types of communication.",
          "Leverage integrations to enhance productivity.",
          "Ensure data security and encryption when using communication tools.",
        ],
      },
    ],
  },
  "cloud-vs-on-premise": {
    title: "Cloud vs On-Premise Software",
    description: "Compare cloud-based and on-premise software solutions to find the best fit for your business.",
    image: "/img/data-image.jpg",
    details: [
      {
        heading: "Understanding Deployment Options",
        text: "Cloud software is hosted online, offering flexibility, while on-premise solutions are installed locally, providing control.",
      },
    ],
    prosAndCons: {
      cloud: {
        title: "Cloud-Based Software",
        pros: [
          "Cost-effective with subscription models.",
          "Accessible from anywhere with internet.",
          "Automatic updates and maintenance.",
        ],
        cons: [
          "Dependent on internet connectivity.",
          "Potential data security risks.",
        ],
      },
      onPremise: {
        title: "On-Premise Software",
        pros: [
          "Full control over data and security.",
          "No internet dependency for operation.",
        ],
        cons: [
          "Higher upfront costs for hardware and setup.",
          "Requires in-house IT maintenance.",
        ],
      },
    },
    comparisonTable: {
      headers: ["Aspect", "Cloud", "On-Premise"],
      rows: [
        ["Cost", "Subscription-based", "High initial investment"],
        ["Accessibility", "Anywhere with internet", "Local network only"],
        ["Maintenance", "Vendor-managed", "In-house team"],
      ],
    },
    useCases: [
      {
        title: "When to Choose Cloud?",
        points: [
          "Startups needing cost-effective solutions.",
          "Teams requiring remote access.",
        ],
      },
      {
        title: "When to Choose On-Premise",
        points: [
          "Businesses with strict data security and compliance needs.",
          "Companies requiring full control over IT infrastructure.",
          "Organizations handling sensitive or confidential information.",
        ],
      },
    ],
  },
};

// Memoized Icon Component
const IconComponent = React.memo(({ img, text }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 50, scale: 0.9 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    }}
    whileHover={{ scale: 1.2, rotate: 360 }}
    transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
    className="flex flex-col items-center w-1/2 sm:w-1/3 md:w-1/5 min-w-[160px]"
  >
    <Image
      src={img}
      alt={text}
      width={96}
      height={96}
      className="mb-4 rounded-full shadow-xl border border-[colors.secondary]/50 bg-[colors.white] p-3"
    />

    <Typography className="text-lg font-bold text-[colors.primary]">{text}</Typography>
  </motion.div>
));

export function Software() {
  const { category = "cloud-vs-on-premise" } = useParams();
  const content = softwareContent[category] || softwareContent["cloud-vs-on-premise"];

  // Animation variants (identical to CommunicationTools)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100 },
    },
  };

  const hoverEffect = {
    scale: 1.05,
    rotate: 2,
    transition: { duration: 0.5, type: "spring", stiffness: 150 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
  };

  return (
    <>
      <Head>
        <title>{content.title} | Glynac.AI</title>
        <meta name="description" content={content.description} />
      </Head>
      <div className="bg-gradient-to-br from-[colors.softBlue] via-[colors.white] to-[colors.softBlue] min-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative min-h-screen flex flex-col items-center justify-center text-center text-[colors.white] pt-32 pb-16 px-6 bg-[colors.primary]/95 backdrop-blur-2xl overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[colors.secondary]/30 to-[colors.accent]/30"
            initial={{ y: -200 }}
            animate={{ y: 200 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 15, ease: "linear" }}
          />
          <Typography
            variant="h1"
            className="relative z-10 mb-8 font-extrabold text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-grey-900 bg-clip-text bg-gradient-to-r from-[colors.secondary] via-[colors.accent] to-[colors.white] tracking-widest uppercase drop-shadow-2xl"
          >
            {content.title.split(" ").map((word, index) => (
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
          </Typography>
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="relative z-10 max-w-4xl">
            <Typography
              variant="lead"
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wider opacity-90 text-[colors.white]"
            >
              {content.description}
            </Typography>
          </motion.div>
        </motion.div>

        {/* Dynamic Content Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="container mx-auto -mt-28 px-6 py-20"
        >
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div variants={itemVariants} className="w-full lg:w-1/2 text-left">
              <Typography
                variant="h2"
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[${colors.darkPrimary}] tracking-tight leading-tight`}
              >
                {content.title}
              </Typography>
              <Typography className="text-lg md:text-xl text-[colors.text] leading-relaxed">
                {content.description}
              </Typography>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={hoverEffect}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <Image
                src={content.image}
                alt="Software Visual"
                width={600}
                height={400}
                className="w-full max-w-md h-auto rounded-2xl shadow-2xl border border-[colors.secondary]/20 transform transition-all duration-700 hover:shadow-[0_0_50px_rgba(59,130,246,0.7)]"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Additional Content */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="container mx-auto px-6 py-20 flex flex-col items-center text-center"
        >
          {content && (
            <>
              {/* Icons Section */}
              <motion.div variants={containerVariants} className="flex flex-wrap justify-center gap-12 py-16">
                {[
                  { img: "/img/i'm_watching_you.png", text: "Employee Monitoring" },
                  { img: "/img/timer_icon.png", text: "Work Time Tracking" },
                  { img: "/img/stats_icon.png", text: "Remote Access & Stats" },
                  { img: "/img/list_icon.png", text: "Monitoring Guide" },
                ].map((item, index) => (
                  <IconComponent key={index} img={item.img} text={item.text} />
                ))}
              </motion.div>

              {/* Details Section */}
              {content.details && (
                <motion.div variants={itemVariants} className="mt-16 max-w-4xl">
                  {content.details.map((section, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="mb-10 bg-[colors.white] p-8 rounded-2xl shadow-lg"
                    >
                      <Typography
                        variant="h3"
                        className="text-3xl md:text-4xl font-bold text-[colors.primary] mb-4"
                      >
                        {section.heading}
                      </Typography>
                      <Typography className="text-lg text-[colors.text] leading-loose">
                        {section.text}
                      </Typography>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Pros and Cons Section */}
              {content.prosAndCons && (
                <motion.div variants={itemVariants} className="mt-16 max-w-5xl">
                  {content.prosAndCons.cloud && (
                    <div className="mb-12">
                      <Typography
                        variant="h3"
                        className="text-3xl md:text-4xl font-bold text-[colors.primary] mb-6"
                      >
                        {content.prosAndCons.cloud.title}
                      </Typography>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[colors.text] text-lg">
                        {content.prosAndCons.cloud.pros.map((pro, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                            className="flex items-start gap-3 bg-[colors.lightGray] p-4 rounded-lg shadow-md"
                          >
                            <span className="text-[colors.secondary] text-2xl">✔</span> {pro}
                          </motion.li>
                        ))}
                        {content.prosAndCons.cloud.cons.map((con, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                            className="flex items-start gap-3 bg-[colors.lightGray] p-4 rounded-lg shadow-md"
                          >
                            <span className="text-red-500 text-2xl">✘</span> {con}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {content.prosAndCons.onPremise && (
                    <div>
                      <Typography
                        variant="h3"
                        className="text-3xl md:text-4xl font-bold text-[colors.primary] mb-6"
                      >
                        {content.prosAndCons.onPremise.title}
                      </Typography>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[colors.text] text-lg">
                        {content.prosAndCons.onPremise.pros.map((pro, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                            className="flex items-start gap-3 bg-[colors.lightGray] p-4 rounded-lg shadow-md"
                          >
                            <span className="text-[colors.secondary] text-2xl">✔</span> {pro}
                          </motion.li>
                        ))}
                        {content.prosAndCons.onPremise.cons.map((con, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                            className="flex items-start gap-3 bg-[colors.lightGray] p-4 rounded-lg shadow-md"
                          >
                            <span className="text-red-500 text-2xl">✘</span> {con}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {content.prosAndCons.pros && (
                    <div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[colors.text] text-lg">
                        {content.prosAndCons.pros.map((pro, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                            className="flex items-start gap-3 bg-[colors.lightGray] p-4 rounded-lg shadow-md"
                          >
                            <span className="text-[colors.secondary] text-2xl">✔</span> {pro}
                          </motion.li>
                        ))}
                        {content.prosAndCons.cons.map((con, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                            className="flex items-start gap-3 bg-[colors.lightGray] p-4 rounded-lg shadow-md"
                          >
                            <span className="text-red-500 text-2xl">✘</span> {con}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Comparison Table */}
              {content.comparisonTable && (
                <motion.div variants={itemVariants} className="mt-16 max-w-5xl w-full">
                  <Typography
                    variant="h3"
                    className="text-3xl md:text-4xl font-bold text-[colors.primary] mb-8 text-center"
                  >
                    Feature Comparison
                  </Typography>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="shadow-2xl rounded-xl overflow-hidden bg-[colors.white]"
                  >
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[colors.primary] text-[colors.white]">
                          {content.comparisonTable.headers.map((header, index) => (
                            <th
                              key={index}
                              className="px-6 py-4 font-semibold text-base uppercase tracking-wider border-b border-[colors.secondary]/50"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {content.comparisonTable.rows.map((row, rowIndex) => (
                          <motion.tr
                            key={rowIndex}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: rowIndex * 0.1, duration: 0.6 }}
                            className={`${
                              rowIndex % 2 === 0 ? "bg-[colors.white]" : "bg-[colors.lightGray]"
                            } hover:bg-[colors.secondary]/10 transition-colors`}
                          >
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="px-6 py-4 text-[colors.text] text-base border-b border-[colors.secondary]/20"
                              >
                                {cell}
                              </td>
                            ))}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                </motion.div>
              )}

              {/* Use Cases Section */}
              {content.useCases && (
                <motion.div variants={itemVariants} className="mt-16 max-w-4xl">
                  {content.useCases.map((useCase, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="mb-12 bg-[colors.white] p-8 rounded-2xl shadow-lg"
                    >
                      <Typography
                        variant="h3"
                        className="text-3xl md:text-4xl font-bold text-[colors.primary] mb-4"
                      >
                        {useCase.title}
                      </Typography>
                      <ul className="list-none text-lg text-[colors.text] space-y-4">
                        {useCase.points.map((point, i) => (
                          <motion.li
                            key={i}
                            variants={itemVariants}
                            className="flex items-start gap-3"
                          >
                            <span className="text-[colors.secondary] font-bold text-2xl">→</span> {point}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </motion.section>
      </div>
    </>
  );
}

export default Software;