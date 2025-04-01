import { motion } from "framer-motion";
import { FileText, BookOpen, Video } from "lucide-react";

export default function Manual() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-float top-10 left-10"></div>
        <div className="absolute w-32 h-32 bg-blue-500 rounded-full opacity-20 animate-float bottom-5 right-20 delay-200"></div>
        <div className="absolute w-16 h-16 bg-blue-300 rounded-full opacity-20 animate-float top-20 right-40 delay-400"></div>
        
        <motion.h1
          className="text-4xl lg:text-6xl font-bold text-white drop-shadow-lg z-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          User Manual
        </motion.h1>
      </section>

      {/* Welcome Message */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Welcome to the User Manual
          </h2>
          <p className="text-gray-600">
            Explore our comprehensive guides, tutorials, and resources designed to help you get the most out of our platform.
          </p>
        </div>
      </section>

      {/* PDF Guide and Glossary */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-6">
          {[
            { title: "PDF Guide", icon: FileText, desc: "Download our detailed PDF guide.", button: "Download Now" },
            { title: "Glossary", icon: BookOpen, desc: "Key terms and definitions.", button: "View Glossary" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="w-full sm:w-[48%] bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <item.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.desc}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                {item.button}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Training Documentation */}
      <section className="py-12 px-4 bg-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-blue-700 text-center mb-8">
            Training Documentation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Getting Started", icon: Video, desc: "Learn the basics of our platform." },
              { title: "Advanced Features", icon: Video, desc: "Master advanced functionalities." },
              { title: "Troubleshooting", icon: Video, desc: "Resolve common issues." },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div whileHover={{ rotate: 360, transition: { duration: 0.5 } }}>
                  <item.icon className="w-10 h-10 text-blue-600 mb-4" />
                </motion.div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                  Watch Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}