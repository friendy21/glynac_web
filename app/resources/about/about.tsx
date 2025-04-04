"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import { 
  FingerPrintIcon, 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon,
  GlobeAltIcon,
  BriefcaseIcon,
  UserGroupIcon,
  BuildingOffice2Icon
} from "@heroicons/react/24/outline";

// Define leadership item interface
interface LeadershipItem {
  src: string;
  name: string;
  role: string;
  description: string;
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

const staggerItems = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function About(): React.ReactElement {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6]);

  // Video player state and refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  // Handle Play/Pause toggle
  const handlePlayPause = (): void => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle Mute/Unmute toggle
  const handleMuteUnmute = (): void => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle the video time update
  const handleTimeUpdate = (): void => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  // Handle range input change to seek video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Number(e.target.value);
    }
  };

  // Set the video duration once the metadata is loaded
  const handleLoadedMetadata = (): void => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    // Cleanup event listeners
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, []);

  // Leadership data
  const leadershipData: LeadershipItem[] = [
    { 
      src: "/img/leadership1.webp", 
      name: "Andrew Rosenthal", 
      role: "CEO & Founder",
      description: "20+ years in AI analytics and enterprise leadership. Pioneering the future of workplace analytics." 
    },
    { 
      src: "/img/leadership2.webp", 
      name: "Bo Shi", 
      role: "Chief Financial Officer",
      description: "Financial strategist with expertise in scaling AI startups and maximizing sustainable growth." 
    },
    { 
      src: "/img/leadership3.webp", 
      name: "Alisa Kolodizer", 
      role: "Finance Director",
      description: "With over 10 years of experience in finance, consulting, and improving client experience through emerging technologies." 
    },
    { 
      src: "/img/leadership4.webp", 
      name: "Daniel Byalsky", 
      role: "AI Advisor",
      description: "With over 10 years of experience in finance, consulting, and improving client experience through emerging technologies." 
    },
  ];

  // Office locations
  const locations = [
    { city: "Chicago", role: "Headquarters", flag: "🇺🇸" },
    { city: "India", role: "Sales & Development", flag: "🇮🇳" },
    { city: "Israel", role: "Development", flag: "🇮🇱" },
    { city: "Beijing", role: "Sales", flag: "🇨🇳" },
    { city: "London", role: "Sales", flag: "🇬🇧" },
  ];

  return (
    <>
      <Head>
        <title>About Glynac.AI | Transforming Workplace Communication</title>
        <meta name="description" content="Learn about Glynac.AI's mission to revolutionize hybrid and remote work with AI-powered communication analytics" />
      </Head>

      {/* Hero Section */}
      <motion.div
        className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-6 bg-primary text-primary-foreground overflow-hidden"
        style={{ scale, opacity }}
      >
        {/* Background video with overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
          >
            <source src="/videos/bg-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-background/30 to-accent/50 backdrop-blur-sm z-10" />
        </div>

        {/* Hero content */}
        <motion.div 
          className="container mx-auto text-center relative z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <motion.h1 
            className="mb-6 font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            About Us
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl font-light text-white opacity-90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            At Glynac.ai, we revolutionize the hybrid and remote work landscape with cutting-edge AI solutions.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Mission Card Section */}
      <section className="-mt-32 bg-background px-4 pb-16 pt-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-primary/5 backdrop-blur-lg p-6 rounded-xl border border-primary/20 shadow-lg">
              <motion.div 
                className="rounded-xl bg-card p-8 shadow-xl border border-border"
                whileHover={{ scale: 1.02, rotate: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <FingerPrintIcon className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Traditional methods fall short in today's dynamic workplaces. We leverage AI to decode communication patterns, uniting remote and office teams with precision and insight. Our goal is to transform how organizations understand and optimize workplace communication in the hybrid era.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Split Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-border bg-card p-8 shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.03, rotate: -1 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">Letters To Users</h3>
              <p className="text-muted-foreground leading-relaxed">
                Today's workplace thrives on digital conversations. Our AI platform harnesses Large Language Models to process vast communication data from Slack, Teams, and more—delivering real-time, actionable insights that transform how organizations understand their internal dynamics.
              </p>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-border bg-card p-8 shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.03, rotate: 1 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Solutions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tailored for every business, our scalable AI tools deliver deep analytics and sentiment tracking—empowering smarter decisions and stronger teams. We build intelligent systems that adapt to your organization's unique communication patterns and needs.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Statement */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">
              Our Values & Vision
            </h2>
            <motion.p 
              className="text-xl text-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              viewport={{ once: true }}
            >
              Welcome to Glynac.ai—where AI transforms hybrid work. We unite teams, boost productivity, and prioritize sustainability and collaboration.
              <br /><br />
              Our innovative tools drive meaningful change, optimize communication, and enhance well-being. Join us to thrive in the future of work.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-10 text-center text-foreground"
            >
              See Our Vision in Action
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="relative rounded-xl overflow-hidden shadow-2xl border border-border"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <video
                ref={videoRef}
                className="w-full aspect-video object-cover"
                src="/Video/Artificial Intelligence in 2 Minutes _ What is Artificial Intelligence_ _ Edureka(720P_HD).mp4"
                autoPlay
                loop
                muted={isMuted}
              />
              
              {/* Video Controls */}
              <div className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center gap-4 mb-3">
                  <button 
                    onClick={handlePlayPause}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <PauseIcon className="w-5 h-5 text-white" />
                    ) : (
                      <PlayIcon className="w-5 h-5 text-white" />
                    )}
                  </button>
                  
                  <button 
                    onClick={handleMuteUnmute}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isMuted ? (
                      <SpeakerXMarkIcon className="w-5 h-5 text-white" />
                    ) : (
                      <SpeakerWaveIcon className="w-5 h-5 text-white" />
                    )}
                  </button>
                  
                  <div className="relative flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <input
                      type="range"
                      min="0"
                      max={duration || 1}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeek}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground"
            >
              Global Presence
            </motion.h2>
            
            <motion.div 
              variants={staggerItems}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto"
            >
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-card rounded-xl p-6 border border-border shadow-md text-center"
                >
                  <span className="text-5xl mb-4 block">{location.flag}</span>
                  <h3 className="text-xl font-bold text-foreground">{location.city}</h3>
                  <p className="text-muted-foreground mt-2">{location.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground"
            >
              Our Leadership
            </motion.h2>
            
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
            >
              {leadershipData.map((leader, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-md"
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={leader.src}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-110"
                      style={{ objectPosition: "center top" }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground">{leader.name}</h3>
                    <p className="text-primary font-medium mt-1">{leader.role}</p>
                    <p className="text-muted-foreground mt-3">{leader.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Join Us in Transforming Workplace Communication
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-10"
          >
            Discover how our AI-powered solutions can enhance your organization's communication, collaboration, and performance in today's hybrid work environment.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-md bg-background text-foreground hover:bg-background/90 font-medium"
            >
              Contact Us
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-md bg-transparent border border-background/70 text-background hover:bg-background/10 font-medium"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default About;