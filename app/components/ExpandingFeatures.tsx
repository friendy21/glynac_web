import React, { useState, useEffect, useRef } from 'react';

// AnimatedElement component (unchanged)
interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: string;
  delay?: number;
  duration?: number;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, animation = "fadeIn", delay = 0, duration = 0.5 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getAnimationClass = () => {
    switch (animation) {
      case "fadeIn":
        return { opacity: 0, transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s` };
      case "slideIn":
        return { 
          opacity: 0, 
          transform: 'translateX(-20px)', 
          transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s` 
        };
      case "scaleIn":
        return { 
          opacity: 0, 
          transform: 'scale(0.95)', 
          transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s` 
        };
      default:
        return { opacity: 0, transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s` };
    }
  };

  const getVisibleStyle = () => {
    return { opacity: 1, transform: 'none' };
  };

  return (
    <div
      ref={ref}
      style={isVisible ? { ...getAnimationClass(), ...getVisibleStyle() } : getAnimationClass()}
    >
      {children}
    </div>
  );
};

// New Icons
const WorkflowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/>
    <path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);

const WellBeingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);

const SecurityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/>
  </svg>
);

const EthicsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20"/>
    <path d="M12 6a6 6 0 0 1 0 12 6 6 0 0 1 0-12"/>
    <path d="M12 10a2 2 0 0 1 0 4 2 2 0 0 1 0-4"/>
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

// Updated Features Data
const features = [
  {
    icon: <WorkflowIcon />,
    title: "Optimizes Workflow Insights",
    description: "Transforms raw data into meaningful analytics for performance improvements.",
    longDescription: "Leverage advanced analytics to gain deep insights into your workflow processes. Identify bottlenecks, optimize resource allocation, and drive continuous improvement through data-driven decision making.",
    image: "https://static.wixstatic.com/media/11062b_a1e2f84dd2764ac29b8734cf5e98c865~mv2.jpg",
    link: "#",
  },
  {
    icon: <WellBeingIcon />,
    title: "Enhanced Employee Well-Being",
    description: "Identifies trends in engagement, workload balance, and satisfaction.",
    longDescription: "Monitor and analyze employee engagement metrics to ensure a healthy work environment. Detect early signs of burnout, optimize workload distribution, and implement targeted interventions to boost morale and productivity.",
    image: "https://static.wixstatic.com/media/11062b_a97014462f7d4728a98cae73d9ba08fe~mv2.jpg",
    link: "#",
  },
  {
    icon: <SecurityIcon />,
    title: "Advanced Security Encryption",
    description: "Ensures strict data protection with anonymization and encryption.",
    longDescription: "Protect sensitive information with state-of-the-art encryption technologies. Implement robust access controls, data anonymization techniques, and compliance-ready security measures to safeguard your organization's data assets.",
    image: "https://static.wixstatic.com/media/11062b_7f58b671a3074769aefce731bb7fceb2~mv2_d_5760_3840_s_4_2.jpg/v1/fit/w_924,h_520/11062b_7f58b671a3074769aefce731bb7fceb2~mv2_d_5760_3840_s_4_2.jpg",
    link: "#",
  },
  {
    icon: <EthicsIcon />,
    title: "Ethical and Transparent Usage",
    description: "Prioritizes fair monitoring, privacy, and actionable insights.",
    longDescription: "Maintain ethical standards in data usage and monitoring practices. Ensure transparency in how data is collected and used, while providing actionable insights that respect individual privacy and promote trust.",
    image: "https://static.wixstatic.com/media/11062b_4db9398f08b34877b8d7735d43d4957b~mv2.jpg",
    link: "#",
  },
];

// ExpandingFeatures Component (unchanged structure)
const ExpandingFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const cols = Array(features.length).fill('1fr');
      cols[activeIndex] = '10fr';
      listRef.current.style.gridTemplateColumns = cols.join(' ');
    }
  }, [activeIndex]);

  return (
    <div style={{ 
      width: '100%', 
      padding: '40px 0', 
      backgroundColor: 'hsl(var(--secondary))',
      color: 'hsl(var(--foreground))',         
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <AnimatedElement>
            <div style={{ 
              display: 'inline-block', 
              borderRadius: '8px', 
              backgroundColor: 'var(--feature-highlight-bg)', 
              padding: '4px 12px', 
              fontSize: '14px', 
              color: 'hsl(var(--primary))',       
              marginBottom: '8px',
              transition: 'background-color 0.3s'
            }}>Features</div>
            <h2 style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              marginBottom: '12px',
              color: 'hsl(var(--foreground))'       
            }}>Powerful Tools for Every Need</h2>
            <p style={{ 
              maxWidth: '900px', 
              margin: '0 auto', 
              color: 'hsl(var(--muted-foreground))', 
              fontSize: '18px'
            }}>
              Discover the comprehensive suite of features designed to transform your business operations.
            </p>
          </AnimatedElement>
        </div>

        <ul
          ref={listRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '10fr 1fr 1fr 1fr', // Initial state for 4 features
            gap: '8px',
            listStyleType: 'none',
            height: '400px',
            padding: 0,
            margin: 0,
            width: '100%', 
            transition: 'grid-template-columns 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {features.map((feature, index) => (
            <AnimatedElement key={feature.title} animation="scaleIn" delay={0.1 + index * 0.1}>
              <li
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  minWidth: '40px',
                  borderRadius: '8px',
                  border: '1px solid hsl(var(--border))',      
                  backgroundColor: 'hsl(var(--card))',        
                  cursor: 'pointer',
                  height: '100%',
                  zIndex: activeIndex === index ? 10 : 1,
                  transition: 'background-color 0.3s'
                }}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    gap: '1rem',
                    padding: '16px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none'
                    }}
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: activeIndex === index ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(1.5)',
                        transform: activeIndex === index ? 'scale(1)' : 'scale(1.1)',
                        transition: 'filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: activeIndex === index ? '0.15s' : '0',
                        maskImage: 'radial-gradient(100% 100% at 100% 0, #fff, transparent)',
                        WebkitMaskImage: 'radial-gradient(100% 100% at 100% 0, #fff, transparent)'
                      }}
                    />
                  </div>
                  
                  <h3 
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      transformOrigin: '0 50%',
                      transform: 'rotate(90deg)',
                      fontSize: '16px',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      color: 'hsl(var(--card-foreground))', 
                      opacity: activeIndex === index ? 1 : 0.6,
                      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {feature.title}
                  </h3>
                  
                  <div style={{ marginTop: 'auto', zIndex: 10, marginLeft:10 }}>
                    <div 
                      style={{
                        borderRadius: '8px',
                        backgroundColor: 'var(--feature-highlight-bg)', 
                        padding: '8px',
                        width: 'fit-content',
                        marginBottom: '8px',
                        color: 'hsl(var(--primary))',       
                        opacity: activeIndex === index ? 1 : 0.6,
                        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s'
                      }}
                    >
                      {feature.icon}
                    </div>
                    
                    <p 
                      style={{
                        fontSize: '14px',
                        maxWidth: '400px',
                        marginBottom: '16px',
                        color: 'hsl(var(--muted-foreground))', 
                        opacity: activeIndex === index ? 0.8 : 0,
                        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: activeIndex === index ? '0.15s' : '0'
                      }}
                    >
                      {feature.longDescription}
                    </p>
                    
                    <a 
                      href={feature.link}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: 'hsl(var(--primary))',      
                        opacity: activeIndex === index ? 1 : 0,
                        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: activeIndex === index ? '0.15s' : '0',
                        textDecoration: 'none'
                      }}
                    >
                      Learn more
                      <span style={{ marginLeft: '4px', display: 'inline-flex' }}>
                        <ArrowRight />
                      </span>
                    </a>
                  </div>
                </div>
              </li>
            </AnimatedElement>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpandingFeatures;