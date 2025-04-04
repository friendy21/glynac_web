import React, { useState, useEffect } from "react";

interface EmailProvider {
  name: string;
  logo: string;
  description: string;
  popularFeatures: string[];
}

interface ComparisonRow {
  feature: string;
  gmail: string;
  exchange: string;
  awsSes: string;
  yahooMail: string;
  zohoMail: string;
  otherProvider: string;
}

const EmailTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("providers");


  // Email providers data with expanded information
  const emailProviders: EmailProvider[] = [
    { 
      name: "Gmail", 
      logo: "📧", 
      description: "Secure & fast email service by Google. Enables AI-powered tracking and real-time insights.", 
      popularFeatures: ["AI-powered insights", "Advanced security", "15GB free storage"]
    },
    { 
      name: "Exchange", 
      logo: "📨", 
      description: "Enterprise-grade email by Microsoft. Ensures top security and seamless business communication.",
      popularFeatures: ["Calendar integration", "Mobile sync", "Document sharing"] 
    },
    { 
      name: "AWS SES", 
      logo: "☁️", 
      description: "Scalable email service by Amazon. Ideal for bulk emailing and AI-enhanced analytics.",
      popularFeatures: ["Pay-as-you-go pricing", "High deliverability", "Detailed analytics"] 
    },
    { 
      name: "Yahoo Mail", 
      logo: "✉️", 
      description: "Reliable email service with custom domains. Supports AI-driven email filtering and organization.",
      popularFeatures: ["1TB storage", "Custom themes", "Mobile app"] 
    },
    { 
      name: "Zoho Mail", 
      logo: "📬", 
      description: "Business-focused email hosting solution. Ensures privacy-focused AI email management.",
      popularFeatures: ["Ad-free interface", "S/MIME encryption", "CRM integration"] 
    },
    { 
      name: "ProtonMail", 
      logo: "🔒", 
      description: "Secure end-to-end encrypted email service. AI-assisted spam and phishing detection included.",
      popularFeatures: ["End-to-end encryption", "Zero-access encryption", "Open source"] 
    },
    { 
      name: "iCloud Mail", 
      logo: "☁️", 
      description: "Apple's cloud-based email service. Integrated with AI-driven smart organization features.",
      popularFeatures: ["Apple ecosystem integration", "Hide My Email", "Custom domain"] 
    },
    { 
      name: "FastMail", 
      logo: "🚀", 
      description: "High-speed business email provider. AI-powered search and analytics available.",
      popularFeatures: ["Ultra-fast interface", "Custom domains", "Advanced filters"] 
    }
  ];

  // Comparison table data
  const comparisonData: ComparisonRow[] = [
    {
      feature: "Email Tracking",
      gmail: "✅",
      exchange: "✅",
      awsSes: "✅",
      yahooMail: "✅",
      zohoMail: "✅",
      otherProvider: "⚠️"
    },
    {
      feature: "AI Insights",
      gmail: "✅",
      exchange: "✅",
      awsSes: "✅",
      yahooMail: "✅",
      zohoMail: "✅",
      otherProvider: "🔄 (Coming Soon)"
    },
    {
      feature: "Security Compliance",
      gmail: "✅",
      exchange: "✅",
      awsSes: "✅",
      yahooMail: "✅",
      zohoMail: "✅",
      otherProvider: "✅"
    },
    {
      feature: "API Integration",
      gmail: "✅",
      exchange: "✅",
      awsSes: "✅",
      yahooMail: "✅",
      zohoMail: "✅",
      otherProvider: "⚠️ (Limited)"
    },
    {
      feature: "Custom Domain",
      gmail: "✅",
      exchange: "✅",
      awsSes: "✅",
      yahooMail: "⚠️",
      zohoMail: "✅",
      otherProvider: "⚠️"
    },
    {
      feature: "Advanced Analytics",
      gmail: "✅",
      exchange: "✅",
      awsSes: "✅",
      yahooMail: "⚠️",
      zohoMail: "✅",
      otherProvider: "⚠️"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground animate-theme-transition">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10 pattern-dots"></div>
        <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Smart Email Integration for Modern Teams
            </h1>
            <p className="text-xl md:text-2xl mt-6 text-white">
              Connect Gmail, Exchange, AWS and other email services with Glynac A.I. for seamless tracking, insights, and workflow optimization.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-primary hover:bg-accent font-bold px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold px-6 py-3 rounded-lg transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Email Providers Section */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Email Providers</h2>
              <p className="text-muted-foreground mt-2">We offer the extraction from this email platform below</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emailProviders.map((provider, index) => (
              <div
                key={index}
                className="bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-border"
              >
                <div className="p-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-accent text-accent-foreground rounded-lg text-2xl mb-4">
                    {provider.logo}
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    {provider.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{provider.description}</p>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Popular Features</p>
                    <ul className="space-y-1">
                      {provider.popularFeatures.map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center">
                          <span className="text-green-500 mr-2">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-muted p-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Compatible</span>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium">
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 mb-20 bg-secondary -mx-6 px-6 rounded-2xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-foreground mb-4">Why Use Our Email Integration?</h2>
            <p className="text-xl text-secondary-foreground/80">Streamline your workflow with powerful features designed for modern teams</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 mb-4">📊</div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Real-time Analytics</h3>
              <p className="text-muted-foreground">Track email performance metrics and gain actionable insights to optimize your communication.</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Enhanced Security</h3>
              <p className="text-muted-foreground">Enterprise-grade security features to keep your sensitive communication protected.</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">AI-Powered Insights</h3>
              <p className="text-muted-foreground">Leverage machine learning to automate email categorization and extract valuable data.</p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Feature Comparison</h2>
              <p className="text-muted-foreground mt-2">See how different email providers compare with our integration</p>
            </div>
          </div>
          
          <div className="bg-card rounded-xl shadow-sm overflow-hidden border border-border">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-4 text-left text-muted-foreground font-semibold border-b border-border">Feature</th>
                    <th className="p-4 text-center text-muted-foreground font-semibold border-b border-border">Gmail</th>
                    <th className="p-4 text-center text-muted-foreground font-semibold border-b border-border">Exchange</th>
                    <th className="p-4 text-center text-muted-foreground font-semibold border-b border-border">AWS SES</th>
                    <th className="p-4 text-center text-muted-foreground font-semibold border-b border-border">Yahoo Mail</th>
                    <th className="p-4 text-center text-muted-foreground font-semibold border-b border-border">Zoho Mail</th>
                    <th className="p-4 text-center text-muted-foreground font-semibold border-b border-border">Other Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-card' : 'bg-muted'}>
                      <td className="p-4 border-b border-border font-medium text-card-foreground">{row.feature}</td>
                      <td className="p-4 text-center border-b border-border">{row.gmail}</td>
                      <td className="p-4 text-center border-b border-border">{row.exchange}</td>
                      <td className="p-4 text-center border-b border-border">{row.awsSes}</td>
                      <td className="p-4 text-center border-b border-border">{row.yahooMail}</td>
                      <td className="p-4 text-center border-b border-border">{row.zohoMail}</td>
                      <td className="p-4 text-center border-b border-border">{row.otherProvider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-10 text-white text-center mb-20">
          <h3 className="text-2xl font-bold mb-4">Start Optimizing Your Email Workflow Today</h3>
          <p className="text-primary-foreground max-w-2xl mx-auto mb-8">
            Join thousands of teams that have transformed their communication efficiency with our platform.
            Get started with a 14-day free trial.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-primary hover:bg-accent font-bold px-6 py-3 rounded-lg shadow-lg transition-all">
              Start Free Trial
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold px-6 py-3 rounded-lg transition-all">
              Schedule Demo
            </button>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold text-card-foreground">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">Marketing Director</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">"This email integration tool has completely transformed how our team handles communication. The analytics are incredibly insightful."</p>
              <div className="mt-4 text-yellow-400">★★★★★</div>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold text-card-foreground">Michael Chen</h4>
                  <p className="text-sm text-muted-foreground">Product Manager</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">"The AI-powered insights have helped us improve our customer response times by 35%. Worth every penny."</p>
              <div className="mt-4 text-yellow-400">★★★★★</div>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold text-card-foreground">Alex Rivera</h4>
                  <p className="text-sm text-muted-foreground">CEO, TechStart</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">"Implementing this solution across our organization has improved productivity and given us valuable data on our communication patterns."</p>
              <div className="mt-4 text-yellow-400">★★★★★</div>
            </div>
          </div>
        </section>
      </div>
      
      
    </div>
  );
};

export default EmailTool;