"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export const contactData = [
  {
    title: "Phone Support",
    icon: PhoneIcon,
    description: (
      <>
        Available 24/7 at{" "}
        <a href="tel:+1234567890" className="text-blue-600 font-medium hover:underline">
          (123) 456-7890
        </a>
      </>
    ),
  },
  {
    title: "Email Us",
    icon: EnvelopeIcon,
    description: (
      <>
        Reach us at{" "}
        <a href="mailto:hello@reallygreatsite.com" className="text-blue-600 font-medium hover:underline">
          hello@reallygreatsite.com
        </a>
      </>
    ),
  },
  {
    title: "Office Location",
    icon: MapPinIcon,
    description: (
      <>
        Visit us at{" "}
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium hover:underline"
        >
          123 Business Ave, Suite 100
        </a>
      </>
    ),
  },
];

export function Contacts() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Animation cycle completed");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 150, damping: 20, duration: 0.8 },
    },
  };

  const socialVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">

      {/* Header */}
      <motion.header
        className="text-center pt-20 pb-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white"
        variants={titleVariants}
        initial="initial"
        animate="animate"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Contact Our Team
        </h1>
        <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
          We’re here to assist you. Reach out today!
        </p>
      </motion.header>

      {/* Main Content */}
      <div className="relative container mx-auto px-6 py-16 max-w-6xl">
        {/* Contact Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          {contactData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-4 bg-blue-50 rounded-full p-3">
                <item.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-center text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Media Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Connect With Us
          </h3>
          <div className="flex justify-center space-x-6">
            {[
              { Icon: FaFacebook, href: "https://facebook.com" },
              { Icon: FaTwitter, href: "https://twitter.com" },
              { Icon: FaInstagram, href: "https://instagram.com" },
              { Icon: FaLinkedin, href: "https://linkedin.com" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover="hover"
                whileTap="tap"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <social.Icon className="h-8 w-8" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  );
}

export default Contacts;