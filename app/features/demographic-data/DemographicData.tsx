"use client";

import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import React, { useRef, useEffect } from "react";
import Image from "next/image";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  color: string;
}

interface SectionData {
  title: string;
  text: string;
  img: string;
}

export function DemographicData(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const numParticles = 100;
    const particles: Particle[] = [];

    const resizeCanvas = () => {
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      // Recreate particles based on the new size
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 6 + 4,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
          color: `hsla(${Math.random() * 360}, 100%, 100%, 1)`,
        });
      }
    };

    // Initial setup and resize listener
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

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
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const sections: SectionData[] = [
    {
      title: "📊 Role-Based Seniority Impact",
      text: "Analyzes differences in communication between entry-level employees and senior executives.",
      img: "/img/feature1a.jpg",
    },
    {
      title: "📅 Age-Based Impact",
      text: "Tracks responsiveness and work patterns across different age groups.",
      img: "/img/feature2a.webp",
    },
    {
      title: "🌍 Racial Impact",
      text: "Analyzes the workforce composition and communication trends to identify inclusion gaps.",
      img: "/img/feature3a.jpg",
    },
    {
      title: "🏠 Geographic Impact",
      text: "Examines work habits and collaboration patterns of different types of employees, whether remote, hybrid, or in-person.",
      img: "/img/feature4a.jpg",
    },
    {
      title: "🚻 Gender-Based Communication",
      text: "Examines the differences in communication levels and work efficiency between genders.",
      img: "/img/feature5a.jpg",
    },
  ];

  return (
    <>
      <div className="relative flex h-72 content-center items-center justify-center overflow-hidden bg-gray-900">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/20 to-pink-500/10 backdrop-blur-xl"></div>
        <div className="container mx-auto text-center z-10 relative">
          <Typography variant="h1" className="mb-4 font-black text-5xl text-white drop-shadow-lg">
            Demographic Data
          </Typography>
        </div>
      </div>

      {sections.map((section, index) => (
        <section key={index} className={`px-4 py-14 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
          <motion.div
            className={`container mx-auto flex flex-col lg:flex-row items-center gap-10 ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full lg:w-1/2">
              <Typography variant="h4" className="font-semibold text-gray-900 mb-4">
                {section.title}
              </Typography>
              <Typography variant="paragraph" className="text-gray-800">
                {section.text}
              </Typography>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="w-10/12 mx-auto">
                <Image
                  src={section.img}
                  alt={section.title}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </section>
      ))}
    </>
  );
}

export default DemographicData;
