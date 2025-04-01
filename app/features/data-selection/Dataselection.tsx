"use client";

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  color: string;
}

export function DataSelection(): JSX.Element {
  // Particle animation logic
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    // Particle settings
    const numParticles = 100;
    const particles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 6 + 2,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        color: `hsla(${Math.random() * 360}, 100%, 100%, ${Math.random() * 0.5 + 0.5})`, // Random opacity for glitter effect
      });
    }

    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap particles around the edges
        if (particle.x > width) particle.x = 0;
        if (particle.x < 0) particle.x = width;
        if (particle.y > height) particle.y = 0;
        if (particle.y < 0) particle.y = height;

        // Draw glowing particles with glitter effect
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

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

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
    <div className="data-selection-container">
      {/* Hero Section with Particle Background */}
      <div className="hero-section scroll-animate relative">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/20 to-pink-500/10 backdrop-blur-xl"></div>
        <div className="container mx-auto text-center z-10 relative">
          <h1 className="title">Data Selection</h1>
          <p className="subtitle">
            Transforming raw data into a refined, optimized resource for AI training.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        {/* Intro Section */}
        <div className="intro-section scroll-animate">
          <p className="intro">
            The foundation of any successful AI model lies in the quality and relevance of its training data. While we are provided with a dataset, it's crucial to understand that this raw data is rarely, if ever, immediately usable. It represents the initial pool of information, a potential goldmine, but it requires longer processing before it can effectively shape the learning process. Data selection, therefore, is not merely about choosing a subset; it's about transforming the provided data into a refined, optimized resource for training.
          </p>
        </div>

        {/* Image Section */}
        <div className="image-section scroll-animate">
          <div className="image-container">
            <img src="/img/raw-data(1).webp" alt="Raw Data" className="image" />
            <div className="image-caption">Raw Data</div>
          </div>
          <div className="image-container">
            <img src="/img/cleaned-data(2).webp" alt="Cleaned Data" className="image" />
            <div className="image-caption">Cleaned Data</div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="steps-section scroll-animate">
          <h2 className="section-title">Data Transformation Steps</h2>
          <div className="steps-grid">
            {/* Step 1: Exploratory Analysis */}
            <div className="step">
              <div className="step-icon">1</div>
              <img
                src="/img/Exploratory-analysis.webp"
                alt="Exploratory Analysis"
                className="step-image"
              />
              <h3>Exploratory Analysis</h3>
              <p>Understand the data's structure, identify patterns, inconsistencies, and potential biases.</p>
            </div>

            {/* Step 2: Data Cleaning */}
            <div className="step">
              <div className="step-icon">2</div>
              <img
                src="/img/Data-cleaning.webp"
                alt="Data Cleaning"
                className="step-image"
              />
              <h3>Data Cleaning</h3>
              <p>Rectify errors, handle missing values, and address outliers that could skew the model's learning.</p>
            </div>

            {/* Step 3: Feature Engineering */}
            <div className="step">
              <div className="step-icon">3</div>
              <img
                src="/img/feature-engineering(4).webp"
                alt="Feature Engineering"
                className="step-image"
              />
              <h3>Feature Engineering</h3>
              <p>Create new, meaningful features from existing ones to enhance the data's representational power.</p>
            </div>

            {/* Step 4: Data Augmentation */}
            <div className="step">
              <div className="step-icon">4</div>
              <img
                src="/img/data-augmentation(5).webp"
                alt="Data Augmentation"
                className="step-image"
              />
              <h3>Data Augmentation</h3>
              <p>Artificially expand the dataset to introduce variations and improve model robustness.</p>
            </div>
          </div>
        </div>

        {/* Conclusion Section */}
        <div className="conclusion-section scroll-animate">
          <p className="conclusion">
            In essence, data selection is a comprehensive, iterative process of refinement, where the raw data is greatly sculpted into a training dataset that empowers the AI to learn effectively and achieve its intended purpose. It's a journey from raw material to a polished training resource, demanding both technical expertise and a deep understanding of the problem domain.
          </p>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        /* General Styling */
        .data-selection-container {
          font-family: 'Inter', sans-serif;
          color: #333; /* Default text color */
          background: #ffffff; /* White background for the rest of the page */
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          padding: 6rem 2rem;
          text-align: center;
          overflow: hidden;
          background:rgb(21, 12, 73); /* Dark purple background for the heading */
        }

        .title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
          color: #ffffff; /* White text for the heading */
        }

        .subtitle {
          font-size: 1.5rem;
          font-weight: 400;
          opacity: 0.9;
          position: relative;
          z-index: 1;
          color: #ffffff; /* White text for the heading */
        }

        /* Intro Section */
        .intro-section {
          max-width: 800px;
          margin: 4rem auto;
          padding: 0 2rem;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .intro-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .intro {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #555; /* Dark gray text for readability */
        }

        /* Image Section */
        .image-section {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 4rem 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .image-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .image-container {
          text-align: center;
        }

        .image {
          width: 300px;
          height: 200px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .image:hover {
          transform: scale(1.05);
        }

        .image-caption {
          margin-top: 1rem;
          font-size: 1rem;
          color: #666; /* Gray for captions */
        }

        /* Steps Section */
        .steps-section {
          background:rgba(47, 72, 95, 0.79); 
          padding: 4rem 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
          border-radius: 12px;
        }

        .steps-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          color:rgb(248, 244, 244); /* Black for section title */
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .step {
          background:rgb(255, 255, 255); /* White background for steps */
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .step:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .step-icon {
          font-size: 1.5rem;
          font-weight: 700;
          color:rgb(37, 69, 199); /* Blue for icons */
          margin-bottom: 1rem;
        }

        .step-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .step h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #2c3e50; /* Dark blue for step titles */
        }

        .step p {
          font-size: 1rem;
          line-height: 1.6;
          color: #666; /* Gray for step descriptions */
        }

        /* Conclusion Section */
        .conclusion-section {
          max-width: 800px;
          margin: 4rem auto;
          padding: 0 2rem;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .conclusion-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .conclusion {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #555; /* Dark gray for conclusion text */
        }
      `}</style>
    </div>
  );
}

export default DataSelection;
