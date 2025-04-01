"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PartnerProgram() {
  const router = useRouter();

  const handleJoinClick = () => {
    router.push("/register");
  };

  const levels = [
    {
      name: "Silver",
      icon: (
        <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
      description: "Entry-level partnership",
      features: [
        "Website partnership listing",
        "Social media spotlight",
        "30% product discount",
        "No sales minimum",
        "Full support access",
        "$2000 ad promotion",
      ],
    },
    {
      name: "Gold",
      icon: (
        <svg className="w-12 h-12 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          <path d="M6 18h12" />
          <path d="M6 14h12" />
        </svg>
      ),
      description: "Mid-tier partnership",
      features: [
        "Website partnership listing",
        "Social media spotlight",
        "CleverControl promotion",
        "$2000-$5000 license sales",
        "40% product discount",
        "Full support access",
        "$2000 ad promotion",
      ],
    },
    {
      name: "Platinum",
      icon: (
        <svg className="w-12 h-12 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          <path d="M6 18h12" />
          <path d="M6 14h12" />
          <path d="M6 10h12" />
        </svg>
      ),
      description: "High-tier partnership",
      features: [
        "Website partnership listing",
        "Social media spotlight",
        "CleverControl promotion",
        "$5000+ license sales",
        "50% product discount",
        "Full support access",
        "$2000 ad promotion (licenses)",
      ],
    },
    {
      name: "White Label",
      icon: (
        <svg className="w-12 h-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18" />
          <path d="M15 3v18" />
          <path d="M3 9h18" />
          <path d="M3 15h18" />
        </svg>
      ),
      description: "Custom branding partnership",
      features: [
        "Branded program creation",
        "Promotion & sales support",
        "Custom terms",
        "$2500 setup or $5000 licenses",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden mb-12 shadow-lg"
      >
        <img
          src="/img/partner.png"
          alt="Partner Program"
          className="w-full h-80 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center p-4">
            Glynac.ai Partner Program
          </h1>
        </div>
      </motion.div>

      <div className="text-center mb-12">
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Elevate your business with AI partnerships. Choose your tier and unlock exclusive benefits.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-purple-500/40 transition-shadow"
          onClick={handleJoinClick}
        >
          🚀 Join Now
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {levels.map((level, index) => (
          <LevelCard key={level.name} level={level} index={index} />
        ))}
      </div>
    </div>
  );
}

function LevelCard({ level, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="h-[380px] w-full perspective-1000"
      whileHover={{ scale: 1.03 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full bg-gray-900 rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-800"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="mb-4 relative">
            {level.icon}
            <div className="absolute inset-0 bg-purple-500/10 blur-xl" />
          </div>
          <h2 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
            {level.name}
          </h2>
          <p className="text-gray-400">{level.description}</p>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full bg-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-700"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h2 className="text-2xl font-semibold text-purple-400 mb-2">{level.name}</h2>
          <p className="text-gray-400 mb-4">{level.description}</p>
          <ul className="text-gray-300 space-y-2 text-sm overflow-y-auto max-h-60">
            {level.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}