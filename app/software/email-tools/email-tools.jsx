import React from "react";

function EmailTool() {
  return (
    <>
      <style>
        {`
          /* Mesh Gradient Animation */
          @keyframes verticalMeshGradient {
            0% { background-position: left bottom; }
            50% { background-position: right top; }
            100% { background-position: left bottom; }
          }
          .animate-mesh-gradient {
            background: linear-gradient(to top, rgba(255, 255, 255, 1) 20%, rgba(111, 238, 200, 0.7), rgba(64, 224, 208, 0.7), rgba(135, 206, 250, 0.7));
            background-size: 400% 400%;
            animation: verticalMeshGradient 6s ease-in-out infinite alternate;
          }

          /* Fade-in Left Animation */
          @keyframes fade-in-left {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-fade-in-left {
            animation: fade-in-left 1s ease-out;
          }

          /* Fade-in Up Animation */
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out;
          }

          /* Fade-in Right Animation */
          @keyframes fade-in-right {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-fade-in-right {
            animation: fade-in-right 1s ease-out;
          }

          /* Fade-in Down Animation */
          @keyframes fade-in-down {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-down {
            animation: fade-in-down 1s ease-out;
          }
        `}
      </style>

      {/* Main Component Container */}
      <div className="min-h-[350vh] bg-gray-50 text-gray-900">
        {/* Header Section */}
        <header className="w-full h-[5cm] bg-teal-900 flex items-center justify-center text-white text-5xl font-bold animate-fade-in-left">
          Email Tool
        </header>

        {/* Hero Section */}
        <section className="relative w-full h-[16cm] flex items-center justify-start p-10 overflow-hidden bg-white animate-fade-in-up">
          <div className="absolute inset-0 animate-mesh-gradient"></div>
          <div className="relative z-10 text-left max-w-5xl">
            <h1 className="text-7xl font-bold text-gray-900 animate-fade-in-left">
              Seamless Email Integration
            </h1>
            <p className="max-w-8xl text-5xl mt-4 text-gray-700 animate-fade-in-left">
              Discover how Gmail, Exchange, AWS, and other email services <br />
              seamlessly integrate with Glynac A.I. for smarter email tracking <br />
              and workflow optimization.
            </p>
            <button className="mt-4 px-6 py-3 bg-black text-white font-bold rounded-lg shadow-lg opacity-75 hover:opacity-100 hover:bg-gray-800 transition duration-300">
              Read More
            </button>
          </div>
        </section>

        {/* Email Providers Section */}
        <section className="mx-[2cm] min-h-[150vh] mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 animate-fade-in-left">
          {[
            { name: "Gmail", logo: "📧", description: "Secure & fast email service by Google. Enables AI-powered tracking and real-time insights." },
            { name: "Exchange", logo: "📨", description: "Enterprise-grade email by Microsoft. Ensures top security and seamless business communication." },
            { name: "AWS SES", logo: "☁️", description: "Scalable email service by Amazon. Ideal for bulk emailing and AI-enhanced analytics." },
            { name: "Yahoo Mail", logo: "✉️", description: "Reliable email service with custom domains. Supports AI-driven email filtering and organization." },
            { name: "Zoho Mail", logo: "📬", description: "Business-focused email hosting solution. Ensures privacy-focused AI email management." },
            { name: "ProtonMail", logo: "🔒", description: "Secure end-to-end encrypted email service. AI-assisted spam and phishing detection included." },
            { name: "iCloud Mail", logo: "☁️", description: "Apple’s cloud-based email service. Integrated with AI-driven smart organization features." },
            { name: "FastMail", logo: "🚀", description: "High-speed business email provider. AI-powered search and analytics available." }
          ].map((provider, index) => (
            <div
              key={index}
              className="h-[14cm] bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300 group"
            >
              <div className="w-20 h-20 mx-auto flex items-center justify-center bg-teal-900 text-white rounded-full text-4xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                {provider.logo}
              </div>
              <h2 className="text-2xl font-semibold mt-3 group-hover:text-teal-900 transition-colors duration-300">
                {provider.name}
              </h2>
              <p className="text-gray-600 mt-2 text-sm">{provider.description}</p>
              <button className="mt-4 px-6 py-2 bg-black text-white font-bold rounded-lg shadow-lg opacity-75 hover:opacity-100 hover:bg-gray-800 transition duration-300">
                Read More
              </button>
            </div>
          ))}
        </section>

        {/* Comparison Table */}
        <section className="mt-16 p-6 animate-fade-in-right">
          <h2 className="text-2xl font-bold text-center mb-6">Comparison of Email Providers</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-center">
              <thead>
                <tr className="bg-blue-100 text-gray-900">
                  <th className="border p-3">Feature</th>
                  <th className="border p-3">Gmail</th>
                  <th className="border p-3">Exchange</th>
                  <th className="border p-3">AWS SES</th>
                  <th className="border p-3">Yahoo Mail</th>
                  <th className="border p-3">Zoho Mail</th>
                  <th className="border p-3">Other Provider</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Email Tracking", "✅", "✅", "✅", "✅", "✅", "⚠️"],
                  ["AI Insights", "✅", "✅", "✅", "✅", "✅", "🔄 (Coming Soon)"],
                  ["Security Compliance", "✅", "✅", "✅", "✅", "✅", "✅"],
                  ["API Integration", "✅", "✅", "✅", "✅", "✅", "⚠️ (Limited)"]
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition duration-300">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border p-3">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-12 p-6 animate-fade-in-down">
          <h3 className="text-xl font-semibold">Start Tracking Your Emails Today</h3>
          <button className="mt-4 px-6 py-3 bg-black text-white font-bold rounded-lg shadow-lg opacity-75 hover:opacity-100 hover:bg-gray-800 transition duration-300">
            Get Started
          </button>
        </section>
      </div>
    </>
  );
}

export default EmailTool;
