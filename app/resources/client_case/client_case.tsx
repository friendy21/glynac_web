import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ReferenceLine, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

// Define interfaces for data types
interface ActivityData {
  time: string;
  activity: number;
}

interface InactivityData {
  category: string;
  inactivity: number;
  benchmark: number;
}

interface TrendData {
  date: string;
  activity: number;
  inactivity: number;
}

interface DemographicData {
  category: string;
  responses: number;
}

interface ManagerPerformanceData {
  manager: string;
  satisfaction: number;
  taskCompletion: number;
  feedbackScore: number;
}

interface ToolIntegrationData {
  tool: string;
  type: string;
  performance: number;
  issues: string;
  suggestedImprovement: string;
}

// Sample data with proper typing
const activityData: ActivityData[] = [
  { time: 'Jan', activity: 400 },
  { time: 'Feb', activity: 300 },
  { time: 'Mar', activity: 500 },
  { time: 'Apr', activity: 200 },
];

const averageActivity = 350;

const inactivityData: InactivityData[] = [
  { category: 'Low', inactivity: 150, benchmark: 200 },
  { category: 'Medium', inactivity: 250, benchmark: 200 },
  { category: 'High', inactivity: 350, benchmark: 200 },
];

const trendData: TrendData[] = [
  { date: '2021-01-01', activity: 300, inactivity: 100 },
  { date: '2021-02-01', activity: 400, inactivity: 150 },
  { date: '2021-03-01', activity: 200, inactivity: 120 },
];

const demographicData: DemographicData[] = [
  { category: 'Female', responses: 120 },
  { category: 'Male', responses: 80 },
];

const managerPerformanceData: ManagerPerformanceData[] = [
  { manager: 'John Doe', satisfaction: 80, taskCompletion: 90, feedbackScore: 75 },
  { manager: 'Jane Smith', satisfaction: 70, taskCompletion: 85, feedbackScore: 80 },
];

const toolIntegrationData: ToolIntegrationData[] = [
  { tool: 'Tool A', type: 'Management', performance: 85, issues: 'None', suggestedImprovement: 'N/A' },
  { tool: 'Tool B', type: 'Analytics', performance: 75, issues: 'Minor glitches', suggestedImprovement: 'Update version' },
];

// Chart colors that stay consistent regardless of theme
const chartColors = {
  activity: '#3b82f6',
  activityGradientStart: '#3b82f6',
  activityGradientEnd: '#60a5fa',
  inactivity: '#ef4444',
  benchmark: '#3b82f6',
  reference: '#ef4444',
  female: '#60a5fa',
  male: '#3b82f6',
};

const ClientCase: React.FC = () => {
  return (
    <div className="bg-background text-foreground min-h-screen animate-theme-transition">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative h-96 flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 rounded-b-[50px] shadow-lg"
      >
        <h1 className="text-5xl sm:text-7xl text-primary-foreground font-bold transition-transform duration-300 hover:scale-105">
          Client Case
        </h1>
      </motion.div>

      <div className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Employee Reports Section */}
        <section className="bg-card/50 backdrop-blur-md p-6 rounded-xl shadow-md border border-border animate-theme-transition">
          <h2 className="text-3xl font-semibold mb-6 text-card-foreground">Employee Reports</h2>

          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-6 mb-8"
          >
            <div className="bg-card p-6 rounded-lg shadow-sm w-full md:w-80 border border-border hover:shadow-lg transition-all duration-300 animate-theme-transition">
              <p className="text-lg text-muted-foreground text-center">
                <strong>Insights:</strong> Identifies time blocks with the highest and lowest activity, compared to the average.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm flex-1 border border-border hover:shadow-lg transition-all duration-300 animate-theme-transition">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="time" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)', borderRadius: '8px', borderColor: 'var(--border)' }} />
                  <Legend />
                  <ReferenceLine y={averageActivity} stroke={chartColors.reference} strokeDasharray="3 3" label={{ position: 'top', value: 'Avg', fill: chartColors.reference }} />
                  <Bar dataKey="activity" fill="url(#activityGradient)" />
                  <defs>
                    <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.activityGradientStart} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={chartColors.activityGradientEnd} stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Inactivity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-6 mb-8"
          >
            <div className="bg-card p-6 rounded-lg shadow-sm flex-1 border border-border hover:shadow-lg transition-all duration-300 animate-theme-transition">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inactivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="category" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)', borderRadius: '8px', borderColor: 'var(--border)' }} />
                  <Legend />
                  <Bar dataKey="inactivity" fill={chartColors.inactivity} stackId="a" />
                  <Bar dataKey="benchmark" fill={chartColors.benchmark} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm w-full md:w-80 border border-border hover:shadow-lg transition-all duration-300 animate-theme-transition">
              <p className="text-lg text-muted-foreground text-center">
                <strong>Insights:</strong> Detects if inactivity periods are outliers or typical compared to benchmarks.
              </p>
            </div>
          </motion.div>

          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <div className="bg-card p-6 rounded-lg shadow-sm w-full md:w-80 border border-border hover:shadow-lg transition-all duration-300 animate-theme-transition">
              <p className="text-lg text-muted-foreground text-center">
                <strong>Insights:</strong> Highlights trends in activity and inactivity over time.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm flex-1 border border-border hover:shadow-lg transition-all duration-300 animate-theme-transition">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)', borderRadius: '8px', borderColor: 'var(--border)' }} />
                  <Legend />
                  <Bar dataKey="activity" fill={chartColors.activity} />
                  <Bar dataKey="inactivity" fill={chartColors.inactivity} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </section>

        {/* Demographic Report Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-card/50 backdrop-blur-md p-6 rounded-xl shadow-md border border-border animate-theme-transition"
        >
          <h2 className="text-3xl font-semibold mb-6 text-card-foreground">Demographic Report: Female vs. Male</h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-card p-6 rounded-lg shadow-sm flex-1 border border-border hover:shadow-lg transition-all duration-300 animate-theme-transition">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={demographicData} dataKey="responses" nameKey="category" outerRadius="80%" label>
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.category === 'Female' ? chartColors.female : chartColors.male} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)', borderRadius: '8px', borderColor: 'var(--border)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center mt-4 space-x-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: chartColors.female }}></div>
                  <span className="text-muted-foreground ml-2">Female</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: chartColors.male }}></div>
                  <span className="text-muted-foreground ml-2">Male</span>
                </div>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm w-full md:w-80 border border-border hover:shadow-lg transition-all duration-300 animate-theme-transition">
              <p className="text-lg text-muted-foreground text-center">
                <strong>Insights:</strong> Compares response volumes by gender.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Manager Performance Report Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-card p-6 rounded-xl shadow-md border border-border animate-theme-transition"
        >
          <h2 className="text-3xl font-semibold mb-4 text-card-foreground">Manager Performance Report</h2>
          <p className="text-muted-foreground mb-6">Overview of manager performance metrics and improvement areas.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-border rounded-lg">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-muted-foreground">Manager</th>
                  <th className="px-4 py-3 text-muted-foreground">Satisfaction (%)</th>
                  <th className="px-4 py-3 text-muted-foreground">Task Completion (%)</th>
                  <th className="px-4 py-3 text-muted-foreground">Feedback Score (%)</th>
                  <th className="px-4 py-3 text-muted-foreground">Improvement Areas</th>
                </tr>
              </thead>
              <tbody>
                {managerPerformanceData.map((manager, index) => (
                  <tr key={index} className="border-t border-border hover:bg-muted/50 transition-colors duration-200">
                    <td className="px-4 py-3 text-foreground">{manager.manager}</td>
                    <td className="px-4 py-3 text-foreground">{manager.satisfaction}%</td>
                    <td className="px-4 py-3 text-foreground">{manager.taskCompletion}%</td>
                    <td className="px-4 py-3 text-foreground">{manager.feedbackScore}%</td>
                    <td className="px-4 py-3 text-foreground">
                      {manager.satisfaction < 75 ? 'Improve engagement' : 'Maintain performance'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Tool Integration Report Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-card p-6 rounded-xl shadow-md border border-border animate-theme-transition"
        >
          <h2 className="text-3xl font-semibold mb-4 text-card-foreground">Tool Integration Report</h2>
          <p className="text-muted-foreground mb-6">Performance overview of integrated tools.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-border rounded-lg">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-muted-foreground">Tool</th>
                  <th className="px-4 py-3 text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-muted-foreground">Performance (%)</th>
                  <th className="px-4 py-3 text-muted-foreground">Issues</th>
                  <th className="px-4 py-3 text-muted-foreground">Suggested Improvements</th>
                </tr>
              </thead>
              <tbody>
                {toolIntegrationData.map((tool, index) => (
                  <tr key={index} className="border-t border-border hover:bg-muted/50 transition-colors duration-200">
                    <td className="px-4 py-3 text-foreground">{tool.tool}</td>
                    <td className="px-4 py-3 text-foreground">{tool.type}</td>
                    <td className="px-4 py-3 text-foreground">{tool.performance}%</td>
                    <td className="px-4 py-3 text-foreground">{tool.issues}</td>
                    <td className="px-4 py-3 text-foreground">{tool.suggestedImprovement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ClientCase;