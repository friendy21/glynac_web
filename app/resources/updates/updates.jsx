"use client";

import React, { useState } from 'react';
import { Typography } from '@material-tailwind/react';
import { motion } from 'framer-motion';

export function Updates() {
  const changelogData = [
    {
      version: '(Newest Version) Beta 1.0.0',
      date: 'February 17, 2025',
      changes: [
        { type: 'New', text: 'Software includes communication and email tools.' },
        { type: 'New', text: 'AI-analysis provides qualitative and quantitative analysis of workplace data, providing valuable insights that foster efficiency and collaboration.' },
        { type: 'Improvement', text: 'AI now optimizes workflow insights, generating better extrapolations of the data.' },
        { type: 'Improvement', text: 'AI developed more advanced security encryption, making the data more secure.' },
      ],
    },
  ];

  const [feedback, setFeedback] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    rating: 0, // Added for star rating
    suggestions: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Updates Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h1"
          className="text-center mb-8 text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text tracking-wide"
        >
          Updates
        </Typography>
      </motion.div>

      {/* Versions Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Typography
          variant="h2"
          className="text-center mb-8 text-5xl font-bold border-b-4 border-blue-500 pb-2 text-gray-800"
        >
          Versions
        </Typography>
      </motion.div>

      {/* Changelog Section */}
      {changelogData.map((versionData, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          className="mb-8 border-b pb-6"
        >
          <div className="text-2xl font-semibold text-gray-800">{versionData.version} - {versionData.date}</div>
          <div className="mt-4 space-y-4">
            {versionData.changes.map((change, idx) => (
              <div key={idx} className="flex items-center">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-white text-base font-semibold mr-4 shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                    change.type === 'New'
                      ? 'bg-green-600'
                      : change.type === 'Improvement'
                      ? 'bg-blue-600'
                      : 'bg-red-600'
                  }`}
                >
                  {change.type}
                </span>
                <p className="text-gray-700">{change.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Feedback Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-16 bg-gradient-to-br from-blue-900 to-purple-900 p-8 rounded-lg shadow-xl"
      >
        <Typography variant="h4" className="text-center mb-6 text-4xl font-bold text-white">
          We want YOUR Feedback
        </Typography>
        <p className="text-center mb-6 text-gray-200 text-lg">
          Your suggestions fuel our growth! Share ideas for new features or improvements—don’t hold back!
        </p>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-white">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={feedback.name}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border-2 border-blue-400 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-all duration-300"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-white">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={feedback.phoneNumber}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border-2 border-blue-400 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-all duration-300"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={feedback.email}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border-2 border-blue-400 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Rating */}
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFeedback((prev) => ({ ...prev, rating: star }))}
                className={`text-3xl transition-colors duration-300 ${
                  feedback.rating >= star ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Suggestions */}
          <div>
            <label htmlFor="suggestions" className="block text-sm font-semibold text-white">
              Suggestion for our Next Improvement
            </label>
            <textarea
              id="suggestions"
              name="suggestions"
              value={feedback.suggestions}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border-2 border-blue-400 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-all duration-300"
              rows="4"
              placeholder="Drop your epic ideas here!"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-4 bg-blue-500 text-white text-lg rounded-lg mt-4 hover:bg-blue-600 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/50"
            >
              Send Feedback
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Updates;