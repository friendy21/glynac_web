"use client";

import React from "react";
import { Typography, Card } from "@material-tailwind/react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import Image from "next/image";

interface FAQItem {
  question: string;
  answer: string;
}

interface ClientFeedback {
  logo: string;
  alt: string;
  feedback: string;
}

interface EfficiencyData {
  month: string;
  efficiency: number;
}

// FAQ Data
const faqData: FAQItem[] = [
  {
    question: "How does Glynac.AI ensure security and privacy?",
    answer: "We use End-to-End Encryption (E2EE) and real-time anonymization, ensuring all data remains protected before AI analysis.",
  },
  {
    question: "How will I know which subscription is right for me?",
    answer: "We offer customized plans tailored to your needs, making sure you get the most value for your business.",
  },
  {
    question: "Is customer service available 24/7?",
    answer: "We provide automated replies for general inquiries and a detailed FAQ section for instant support outside business hours.",
  },
];

// Client Feedback Data
const clientFeedbackData: ClientFeedback[] = [
  {
    logo: "/img/Salesforce-logo.png",
    alt: "Salesforce Logo",
    feedback: "Glynac successfully improved workforce efficiency by an average of 32% across six major corporations through advanced employee analytics.",
  },
  {
    logo: "/img/grammarly.png",
    alt: "Grammarly Logo",
    feedback: "By leveraging Glynac's data-driven insights, Grammarly saw a 25% reduction in employee turnover within the first year.",
  },
  {
    logo: "/img/Ferguson-Logo.png",
    alt: "Ferguson Logo",
    feedback: "Our custom analytics solutions helped teams at Ferguson enhance collaboration, leading to a 40% increase in cross-departmental productivity.",
  },
  {
    logo: "/img/general-electric-ge-logo.png",
    alt: "General Electric Logo",
    feedback: "Over 90% of managers reported greater confidence in decision-making after implementing Glynac's streamlined reporting tools.",
  },
  {
    logo: "/img/broadcom.png",
    alt: "Broadcom Logo",
    feedback: "Within six months, Broadcom experienced an average 18% reduction in operational costs related to workforce inefficiencies.",
  },
  {
    logo: "/img/Loom.png",
    alt: "Loom Logo",
    feedback: "With Glynac's expertise, Loom achieved a 50% improvement in employee engagement scores, fostering stronger workplace communities.",
  },
];

// Efficiency data
const efficiencyData: EfficiencyData[] = [
  { month: "Jan", efficiency: 60 },
  { month: "Feb", efficiency: 65 },
  { month: "Mar", efficiency: 70 },
  { month: "Apr", efficiency: 72 },
  { month: "May", efficiency: 75 },
  { month: "Jun", efficiency: 78 },
  { month: "Jul", efficiency: 80 },
  { month: "Aug", efficiency: 83 },
  { month: "Sep", efficiency: 85 },
  { month: "Oct", efficiency: 88 },
  { month: "Nov", efficiency: 90 },
  { month: "Dec", efficiency: 92 },
];

// FAQ Card Component
interface FAQCardProps {
  question: string;
  answer: string;
}

function FAQCard({ question, answer }: FAQCardProps): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card
        className="bg-card/30 backdrop-blur-xl border border-border p-6 rounded-lg shadow-md hover:scale-105 transition-transform"
        variant="filled"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <ChatBubbleBottomCenterTextIcon className="h-12 w-12 text-primary" />
        <Typography 
          variant="h5" 
          className="font-bold text-foreground mt-4" 
          placeholder="" 
          onPointerEnterCapture={() => {}} 
          onPointerLeaveCapture={() => {}}>
          {question}
        </Typography>
        <Typography className="text-muted-foreground text-center mt-2" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>{answer}</Typography>
      </Card>
    </motion.div>
  );
}

// Client Feedback Item Component
interface ClientFeedbackItemProps {
  logo: string;
  alt: string;
  feedback: string;
}

function ClientFeedbackItem({ logo, alt, feedback }: ClientFeedbackItemProps):React.ReactElement {
  return (
    <div className="flex items-center space-x-6 w-full max-w-4xl">
      <div className="w-[160px] h-16 relative flex-shrink-0">
        <Image
          src={logo}
          alt={alt}
          fill
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </div>
      <Typography className="text-lg font-normal text-muted-foreground">{feedback}</Typography>
    </div>
  );
}

// Main FAQ Component
export default function FAQ(): JSX.Element {
  return (
    <>
      {/* Hero Section */}
      <div className="relative flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center opacity-20" />
        <div className="absolute top-0 h-full w-full backdrop-blur-xl bg-background/40" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center"
        >
          <Typography
            variant="h1"
            className="gradient-text font-black text-5xl md:text-7xl"
          >
            Frequently Asked Questions
          </Typography>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <section className="-mt-32 bg-muted px-6 pb-20 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-10">
          {faqData.map((faq, index) => (
            <FAQCard key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* Client Feedback Section */}
      <section className="bg-background py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Typography variant="h2" className="text-4xl font-bold text-foreground text-left mb-8">
            Client Feedback
          </Typography>
          <div className="flex flex-col space-y-8 items-center w-full">
            {clientFeedbackData.map((item, index) => (
              <ClientFeedbackItem key={index} logo={item.logo} alt={item.alt} feedback={item.feedback} />
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="bg-muted py-16">
        <div className="max-w-5xl mx-auto px-4 text-foreground text-left">
          <Typography
            variant="h2"
            className="text-4xl font-bold gradient-text"
          >
            Case Study
          </Typography>
          <Typography variant="h3" className="text-2xl font-semibold mt-2">
            A Major US-headquartered TNC
          </Typography>
        </div>
      </section>

      {/* Summary Section */}
      <section className="bg-background py-16">
        <div className="max-w-5xl mx-auto text-center">
          <Typography variant="h3" className="text-2xl font-bold text-foreground">
            The below table contains a summary it generated within seconds.
          </Typography>
          <div className="flex justify-center mt-4">
            <PlayCircleIcon className="h-14 w-14 text-primary hover:scale-110 transition-transform" />
          </div>
        </div>
      </section>

      {/* Graph & Insights Section */}
      <section className="bg-background py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <Typography className="text-lg font-semibold text-foreground max-w-lg">
            With a strong history of notable corporate clients, Glynac has been trusted by industry leaders to help 
            analyze and streamline their employee analytics, improving efficiency and helping foster stronger working 
            communities.
          </Typography>
          <div className="w-full md:w-[50%] h-64 mt-8 md:mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" padding={{ left: 10, right: 10 }} stroke="var(--muted-foreground)" />
                <YAxis domain={[50, 100]} stroke="var(--muted-foreground)" />
                <Tooltip 
                  formatter={(value) => `${value}%`} 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="var(--primary)" 
                  strokeWidth={3} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </>
  );
}