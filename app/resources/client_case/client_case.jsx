import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

// Data remains unchanged (omitted for brevity)
const data = [
  { time: 'Jan', activity: 400 },
  { time: 'Feb', activity: 300 },
  { time: 'Mar', activity: 500 },
  { time: 'Apr', activity: 200 }
];

const averageActivity = 350;

const inactivityData = [
  { category: 'Low', inactivity: 150, benchmark: 200 },
  { category: 'Medium', inactivity: 250, benchmark: 200 },
  { category: 'High', inactivity: 350, benchmark: 200 }
];

const trendData = [
  { date: '2021-01-01', activity: 300, inactivity: 100 },
  { date: '2021-02-01', activity: 400, inactivity: 150 },
  { date: '2021-03-01', activity: 200, inactivity: 120 }
];

const demographicData = [
  { category: 'Female', responses: 120 },
  { category: 'Male', responses: 80 }
];

const managerPerformanceData = [
  { manager: 'John Doe', satisfaction: 80, taskCompletion: 90, feedbackScore: 75 },
  { manager: 'Jane Smith', satisfaction: 70, taskCompletion: 85, feedbackScore: 80 }
];

const toolIntegrationData = [
  { tool: 'Tool A', type: 'Management', performance: 85, issues: 'None', suggestedImprovement: 'N/A' },
  { tool: 'Tool B', type: 'Analytics', performance: 75, issues: 'Minor glitches', suggestedImprovement: 'Update version' }
];

const ClientCase = () => {
  return (
    <div className="bg-white text-black min-h-screen h-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative h-96 flex items-center justify-center shadow-md bg-gradient-to-br from-blue-500 to-gray-900 rounded-b-[50%] pb-10"
      >
        <h1 className="text-5xl sm:text-7xl text-white font-bold transition-all duration-500 transform hover:scale-105 hover:text-yellow-300">
          Client Case
        </h1>
      </motion.div>

      <div className="max-w-full mx-auto p-4">
        {/* Employee Reports */}
        <div className="bg-green-100 p-6 rounded-lg shadow-lg mb-6 mx-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Employee Reports</h2>

          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-4 flex flex-col md:flex-row items-center gap-4"
          >
            <div className="bg-opacity-30 bg-white backdrop-blur-lg p-4 rounded-xl shadow-lg w-full md:w-72 h-auto md:h-72 border border-gray-200 transition-all duration-500 transform hover:scale-105">
              <div className="bg-gray-700 text-white p-6 rounded-xl w-full h-full flex items-center justify-center text-center shadow-md">
                <p className="text-lg font-semibold">
                  Insights: The graph identifies time blocks with the least and most activity and compares them to the overall average.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex-1 border border-gray-200 transition-all duration-500 transform hover:scale-105">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} animationDuration={1000}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" stroke="#4B5563" />
                  <YAxis stroke="#4B5563" />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine y={averageActivity} stroke="red" strokeDasharray="3 3" label={{ position: 'top', value: 'Avg', fill: 'red' }} />
                  <Bar dataKey="activity" fill="url(#colorUv)" />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Inactivity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-6 flex flex-col md:flex-row items-center gap-4"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg flex-1 border border-gray-200 transition-all duration-500 transform hover:scale-105">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={inactivityData} animationDuration={1000}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" stroke="#4B5563" />
                  <YAxis stroke="#4B5563" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inactivity" fill="#FF5733" stackId="a" />
                  <Bar dataKey="benchmark" fill="#33A1FF" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-opacity-30 bg-white backdrop-blur-lg p-4 rounded-xl shadow-lg w-full md:w-72 h-auto md:h-72 border border-gray-200 transition-all duration-500 transform hover:scale-105">
              <div className="bg-gray-700 text-white p-6 rounded-xl w-full h-full flex items-center justify-center text-center shadow-md">
                <p className="text-lg font-semibold">
                  Insights: Determine if inactivity periods are normal or outliers compared to peers. Identify if certain individuals or teams have unusual inactivity patterns.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-6 flex flex-col md:flex-row items-center gap-4"
          >
            <div className="bg-opacity-30 bg-white backdrop-blur-lg p-4 rounded-xl shadow-lg w-full md:w-72 h-auto md:h-72 border border-gray-200 transition-all duration-500 transform hover:scale-105">
              <div className="bg-gray-700 text-white p-6 rounded-xl w-full h-full flex items-center justify-center text-center shadow-md">
                <p className="text-lg font-semibold">
                  Insights: The graph highlights recurring inactivity periods over time, allowing trend analysis of activity vs. inactivity.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex-1 border border-gray-200 transition-all duration-500 transform hover:scale-105">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={trendData} animationDuration={1000}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#4B5563" />
                  <YAxis stroke="#4B5563" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="activity" fill="#34D399" />
                  <Bar dataKey="inactivity" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Demographic Report */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-col md:flex-row items-center gap-4 bg-light-blue-100 p-6 rounded-lg shadow-lg border border-gray-200"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg flex-1 transition-all duration-500 transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Demographic Report: Female vs. Male</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie data={demographicData} dataKey="responses" nameKey="category" outerRadius="80%" fill="#8884d8" label>
                  {demographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.category === 'Female' ? '#82ca9d' : '#FF73A1'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-4">
              <div className="flex items-center mr-6 transition-all duration-500 transform hover:scale-105">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#82ca9d' }}></div>
                <span className="ml-2">Female</span>
              </div>
              <div className="flex items-center transition-all duration-500 transform hover:scale-105">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FF73A1' }}></div>
                <span className="ml-2">Male</span>
              </div>
            </div>
          </div>
          <div className="bg-opacity-30 bg-white backdrop-blur-lg p-4 rounded-xl shadow-lg w-full md:w-72 h-auto md:h-72 border border-gray-200 transition-all duration-500 transform hover:scale-105">
            <div className="bg-gray-700 text-white p-6 rounded-xl w-full h-full flex items-center justify-center text-center shadow-md">
              <p className="text-lg font-semibold">Insights: Compares response volumes and pay-related issues based on gender.</p>
            </div>
          </div>
        </motion.div>

        {/* Manager Performance Report */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold mb-4">Manager Performance Report</h3>
          <p className="text-md font-medium mb-4">
            Overview of performance metrics for managers and areas for improvement based on employee feedback and performance data.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Manager</th>
                  <th className="px-4 py-2 text-left">Satisfaction (%)</th>
                  <th className="px-4 py-2 text-left">Task Completion (%)</th>
                  <th className="px-4 py-2 text-left">Feedback Score (%)</th>
                  <th className="px-4 py-2 text-left">Improvement Areas</th>
                </tr>
              </thead>
              <tbody>
                {managerPerformanceData.map((manager, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-300">
                    <td className="px-4 py-2">{manager.manager}</td>
                    <td className="px-4 py-2">{manager.satisfaction}%</td>
                    <td className="px-4 py-2">{manager.taskCompletion}%</td>
                    <td className="px-4 py-2">{manager.feedbackScore}%</td>
                    <td className="px-4 py-2">
                      {manager.satisfaction < 75 ? 'Improving employee engagement' : 'Maintain positive feedback'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Tool Integration Report */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold mb-4">Tool and Integration Report</h3>
          <p className="text-md font-medium mb-4">
            An overview of key software tools in project management, analytics, communication, and development, along with performance metrics, issues, and improvements.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Tool</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Performance (%)</th>
                  <th className="px-4 py-2 text-left">Issues</th>
                  <th className="px-4 py-2 text-left">Suggested Improvements</th>
                </tr>
              </thead>
              <tbody>
                {toolIntegrationData.map((tool, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-300">
                    <td className="px-4 py-2">{tool.tool}</td>
                    <td className="px-4 py-2">{tool.type}</td>
                    <td className="px-4 py-2">{tool.performance}%</td>
                    <td className="px-4 py-2">{tool.issues}</td>
                    <td className="px-4 py-2">{tool.suggestedImprovement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientCase;