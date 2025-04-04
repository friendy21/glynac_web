"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import Head from "next/head";
import { Award, TrendingUp, Users, Handshake } from "lucide-react";

// Define interfaces for our data types
interface ContentDetail {
  heading: string;
  text: string;
}

interface PartnerTier {
  title: string;
  pros: string[];
  cons: string[];
}

interface ProsAndCons {
  standard?: PartnerTier;
  premium?: PartnerTier;
  pros?: string[];
  cons?: string[];
}

interface ComparisonTable {
  headers: string[];
  rows: string[][];
}

interface UseCase {
  title: string;
  points: string[];
}

interface ContentData {
  title: string;
  description: string;
  image: string;
  details: ContentDetail[];
  prosAndCons: ProsAndCons;
  comparisonTable: ComparisonTable;
  useCases?: UseCase[];
}

interface PartnershipContent {
  [key: string]: ContentData;
}

interface IconComponentProps {
  icon: React.ReactNode;
  text: string;
}

// Sample partnership content object with multiple categories
const partnershipContent: PartnershipContent = {
  "standard-partners": {
    title: "Standard Partnership",
    description: "Join our network of trusted partners with basic benefits and exclusive access to our resources.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    details: [
      {
        heading: "What Is Our Standard Partnership?",
        text: "Our Standard Partnership program offers businesses an entry-level opportunity to collaborate with us. Partners gain access to our platform, training resources, and co-marketing opportunities.",
      },
    ],
    prosAndCons: {
      pros: [
        "Access to partner portal and training materials.",
        "Co-marketing opportunities for joint campaigns.",
        "Basic level support for implementation and customer issues.",
        "Regular partner newsletter with product updates.",
      ],
      cons: [
        "Limited revenue sharing percentage.",
        "Standard support response times.",
        "No access to premium features and beta programs.",
      ],
    },
    comparisonTable: {
      headers: ["Feature", "Standard", "Premium"],
      rows: [
        ["Partner Portal Access", "Yes", "Yes"],
        ["Revenue Share", "15%", "25%"],
        ["Support Response Time", "48 hours", "4 hours"],
        ["Training Resources", "Basic", "Advanced"],
        ["Co-marketing Funds", "No", "Yes"],
      ],
    },
    useCases: [
      {
        title: "Who Should Choose Standard Partnership?",
        points: [
          "Small businesses looking to enter the partnership ecosystem.",
          "Companies testing the waters before committing to premium tiers.",
          "Partners focused on specific product segments or regional markets.",
          "Organizations with limited implementation resources.",
        ],
      },
      {
        title: "Best Practices for Standard Partners",
        points: [
          "Leverage available training to build expertise quickly.",
          "Focus on specific industry verticals to maximize impact.",
          "Utilize the partner community forum for knowledge sharing.",
          "Collect customer testimonials to enhance credibility.",
        ],
      },
    ],
  },
  "premium-partners": {
    title: "Premium Partnership",
    description: "Unlock advanced benefits and receive priority treatment with our premium partnership tier.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    details: [
      {
        heading: "Understanding Premium Partnership",
        text: "Premium Partners receive our highest level of support, enhanced revenue sharing, dedicated account management, and exclusive access to beta programs and product roadmaps.",
      },
    ],
    prosAndCons: {
      standard: {
        title: "Standard Partnership",
        pros: [
          "Basic partner portal access.",
          "15% revenue sharing on qualified deals.",
          "Standard support channel access.",
        ],
        cons: [
          "Limited co-marketing opportunities.",
          "No dedicated account manager.",
          "Standard support SLAs.",
        ],
      },
      premium: {
        title: "Premium Partnership",
        pros: [
          "Enhanced revenue sharing (25%).",
          "Dedicated partner account manager.",
          "Priority technical support with 4-hour response time.",
          "Co-marketing funds and joint campaign planning.",
          "Early access to product roadmap and beta features.",
        ],
        cons: [
          "Higher qualification requirements.",
          "Annual sales targets to maintain status.",
          "Requires certification of multiple staff members.",
        ],
      },
    },
    comparisonTable: {
      headers: ["Benefit", "Standard", "Premium"],
      rows: [
        ["Revenue Share", "15%", "25%"],
        ["Account Management", "Shared", "Dedicated"],
        ["Support SLA", "48 hours", "4 hours"],
        ["Product Roadmap Access", "Limited", "Full"],
        ["Training Resources", "Basic", "Advanced"],
        ["Co-marketing Funds", "No", "Yes"],
        ["Beta Program Access", "No", "Yes"],
      ],
    },
    useCases: [
      {
        title: "Ideal Premium Partner Profile",
        points: [
          "Established businesses with dedicated sales teams.",
          "Partners looking to build deep expertise in our solutions.",
          "Organizations focused on long-term strategic partnership.",
          "Companies with complementary service offerings.",
        ],
      },
      {
        title: "Premium Partner Success Strategies",
        points: [
          "Invest in comprehensive staff certification.",
          "Develop industry-specific implementation methodologies.",
          "Create custom integrations with complementary systems.",
          "Establish a dedicated practice around our solutions.",
          "Leverage co-marketing funds for joint events and webinars.",
        ],
      },
    ],
  },
};

// Memoized Icon Component using Lucide icons instead of external images
const IconComponent: React.FC<IconComponentProps> = React.memo(({ icon, text }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
    className="flex flex-col items-center w-1/2 sm:w-1/3 md:w-1/5 min-w-[160px]"
  >
    <div className="p-4 mb-4 rounded-full bg-primary/10 dark:bg-primary/20 shadow-md border border-primary/20 dark:border-primary/30">
      {icon}
    </div>
    <Typography className="text-lg font-medium text-foreground dark:text-foreground" placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}>{text}</Typography>
  </motion.div>
));

IconComponent.displayName = 'IconComponent';

export function Partnership(): React.ReactElement {
  // Type-safe params (could be undefined)
  const params = useParams();
  // Extract category from params with default
  const category = typeof params.category === 'string' ? params.category : "premium-partners";
  // Type-safe content retrieval
  const content = partnershipContent[category] || partnershipContent["premium-partners"];

  // Animation variants - simplified for professionalism
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const hoverEffect = {
    scale: 1.03,
    transition: { duration: 0.3, type: "spring", stiffness: 120 },
  };

  return (
    <>
      <Head>
        <title>{content.title} | Glynac.AI</title>
        <meta name="description" content={content.description} />
      </Head>
      <div className="bg-gradient-to-br from-background via-accent to-background dark:from-background dark:via-accent/5 dark:to-background min-h-screen overflow-x-hidden animate-theme-transition">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-[60vh] flex flex-col items-center justify-center text-center pt-32 pb-16 px-6 bg-primary/90 dark:bg-primary/80 text-primary-foreground backdrop-blur-md overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 dark:from-primary/10 dark:to-background/10"
            initial={{ y: -100 }}
            animate={{ y: 100 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 20, ease: "linear" }}
          />
          <Typography
            variant="h1"
            className="relative z-10 mb-8 font-bold text-5xl sm:text-6xl md:text-7xl tracking-tight drop-shadow-md"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {content.title.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </Typography>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.3 }} 
            className="relative z-10 max-w-4xl"
          >
            <Typography
              variant="lead"
              className="text-lg sm:text-xl md:text-2xl font-light tracking-wide opacity-90"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
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
          className="container mx-auto -mt-20 px-6 py-16"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div variants={itemVariants} className="w-full lg:w-1/2 text-left">
              <Typography
                variant="h2"
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground dark:text-foreground tracking-tight leading-tight"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                {content.title}
              </Typography>
              <Typography className="text-lg text-muted-foreground dark:text-muted-foreground leading-relaxed"
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}>
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
                alt="Partnership Visual"
                width={600}
                height={400}
                className="w-full max-w-md h-auto rounded-lg shadow-md border border-border dark:border-border/50 transition-all duration-300"
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
          className="container mx-auto px-6 py-16 flex flex-col items-center"
        >
          {content && (
            <>
              {/* Icons Section */}
              <motion.div variants={containerVariants} className="flex flex-wrap justify-center gap-10 py-12">
                <IconComponent 
                  icon={<TrendingUp size={32} className="text-primary" />} 
                  text="Revenue Sharing" 
                />
                <IconComponent 
                  icon={<Award size={32} className="text-primary" />} 
                  text="Marketing Support" 
                />
                <IconComponent 
                  icon={<Users size={32} className="text-primary" />} 
                  text="Technical Resources" 
                />
                <IconComponent 
                  icon={<Handshake size={32} className="text-primary" />} 
                  text="Partner Portal" 
                />
              </motion.div>

              {/* Details Section */}
              {content.details && (
                <motion.div variants={itemVariants} className="mt-16 max-w-4xl w-full">
                  {content.details.map((section, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="mb-10 bg-card dark:bg-card p-8 rounded-lg shadow-md border border-border/30 dark:border-border/20"
                    >
                      <Typography
                        variant="h3"
                        className="text-2xl md:text-3xl font-bold text-foreground dark:text-foreground mb-4"
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                      >
                        {section.heading}
                      </Typography>
                      <Typography className="text-lg text-muted-foreground dark:text-muted-foreground leading-relaxed"
                                        placeholder=""
                                        onPointerEnterCapture={() => {}}
                                        onPointerLeaveCapture={() => {}}>
                        {section.text}
                      </Typography>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Pros and Cons Section */}
              {content.prosAndCons && (
                <motion.div variants={itemVariants} className="mt-16 max-w-5xl w-full">
                  {content.prosAndCons.standard && (
                    <div className="mb-12">
                      <Typography
                        variant="h3"
                        className="text-2xl md:text-3xl font-bold text-foreground dark:text-foreground mb-6"
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                      >
                        {content.prosAndCons.standard.title}
                      </Typography>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground dark:text-muted-foreground text-base">
                        {content.prosAndCons.standard.pros.map((pro, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                            className="flex items-start gap-3 bg-muted dark:bg-muted p-4 rounded-lg shadow-sm border border-border/10 dark:border-border/5"
                          >
                            <span className="text-green-600 dark:text-green-400 text-xl">✔</span> {pro}
                          </motion.li>
                        ))}
                        {content.prosAndCons.standard.cons.map((con, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                            className="flex items-start gap-3 bg-muted dark:bg-muted p-4 rounded-lg shadow-sm border border-border/10 dark:border-border/5"
                          >
                            <span className="text-red-600 dark:text-red-400 text-xl">✘</span> {con}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {content.prosAndCons.premium && (
                    <div>
                      <Typography
                        variant="h3"
                        className="text-2xl md:text-3xl font-bold text-foreground dark:text-white mb-6"
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                      >
                        {content.prosAndCons.premium.title}
                      </Typography>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground dark:text-muted-foreground text-base">
                        {content.prosAndCons.premium.pros.map((pro, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                            className="flex items-start gap-3 bg-muted dark:bg-muted p-4 rounded-lg shadow-sm border border-border/10 dark:border-border/5"
                          >
                            <span className="text-green-600 dark:text-green-400 text-xl">✔</span> {pro}
                          </motion.li>
                        ))}
                        {content.prosAndCons.premium.cons.map((con, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                            className="flex items-start gap-3 bg-muted dark:bg-muted p-4 rounded-lg shadow-sm border border-border/10 dark:border-border/5"
                          >
                            <span className="text-red-600 dark:text-red-400 text-xl">✘</span> {con}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {content.prosAndCons.pros && (
                    <div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground dark:text-muted-foreground text-base">
                        {content.prosAndCons.pros.map((pro, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                            className="flex items-start gap-3 bg-muted dark:bg-muted p-4 rounded-lg shadow-sm border border-border/10 dark:border-border/5"
                          >
                            <span className="text-green-600 dark:text-green-400 text-xl">✔</span> {pro}
                          </motion.li>
                        ))}
                        {content.prosAndCons.cons && content.prosAndCons.cons.map((con, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                            className="flex items-start gap-3 bg-muted dark:bg-muted p-4 rounded-lg shadow-sm border border-border/10 dark:border-border/5"
                          >
                            <span className="text-red-600 dark:text-red-400 text-xl">✘</span> {con}
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
                    className="text-2xl md:text-3xl font-bold text-foreground dark:text-foreground mb-6 text-center"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Partnership Tier Comparison
                  </Typography>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="shadow-md rounded-lg overflow-hidden bg-card dark:bg-card border border-border/20 dark:border-border/10"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-primary text-primary-foreground">
                            {content.comparisonTable.headers.map((header, index) => (
                              <th
                                key={index}
                                className="px-6 py-3 font-medium text-sm uppercase tracking-wider border-b border-primary-foreground/10"
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
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: rowIndex * 0.05, duration: 0.3 }}
                              className={`${
                                rowIndex % 2 === 0 ? "bg-background dark:bg-background/80" : "bg-muted dark:bg-muted/50"
                              } hover:bg-accent/30 dark:hover:bg-accent/10 transition-colors duration-150`}
                            >
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={cellIndex}
                                  className="px-6 py-3 text-muted-foreground dark:text-muted-foreground text-sm border-b border-border/10 dark:border-border/5"
                                >
                                  {cell}
                                </td>
                              ))}
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Use Cases Section */}
              {content.useCases && (
                <motion.div variants={itemVariants} className="mt-16 max-w-4xl w-full">
                  {content.useCases.map((useCase, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="mb-10 bg-card dark:bg-card p-8 rounded-lg shadow-md border border-border/30 dark:border-border/20"
                    >
                      <Typography
                        variant="h3"
                        className="text-2xl md:text-3xl font-bold text-foreground dark:text-foreground mb-4"
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                      >
                        {useCase.title}
                      </Typography>
                      <ul className="list-none text-base text-muted-foreground dark:text-muted-foreground space-y-3">
                        {useCase.points.map((point, i) => (
                          <motion.li
                            key={i}
                            variants={itemVariants}
                            className="flex items-start gap-3"
                          >
                            <span className="text-primary dark:text-primary/90 font-medium">→</span> {point}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              {/* Call to Action */}
              <motion.div
                variants={itemVariants}
                className="mt-16 w-full max-w-4xl bg-primary dark:bg-primary/90 p-8 rounded-lg shadow-lg text-center border border-primary/20 dark:border-primary/10"
              >
                <Typography
                  variant="h3"
                  className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  Ready to Become a Partner?
                </Typography>
                <Typography className="text-lg text-primary-foreground/90 mb-6"
                                      placeholder=""
                                      onPointerEnterCapture={() => {}}
                                      onPointerLeaveCapture={() => {}}>
                  Join our partnership program today and start growing your business with our solutions.
                </Typography>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-background dark:bg-background text-primary dark:text-primary px-6 py-3 rounded-md text-base font-medium hover:bg-accent/80 dark:hover:bg-accent/20 transition-colors shadow-md"
                >
                  Apply Now
                </motion.button>
              </motion.div>
            </>
          )}
        </motion.section>
      </div>
    </>
  );
}

export default Partnership;