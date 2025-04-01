"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Mon", activity: 4000 },
  { name: "Tue", activity: 3000 },
  { name: "Wed", activity: 2000 },
  { name: "Thu", activity: 2780 },
  { name: "Fri", activity: 1890 },
  { name: "Sat", activity: 2390 },
  { name: "Sun", activity: 3490 },
];

export function ActivityChart() {
  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="activity" fill="#8884d8" />
    </BarChart>
  );
}

export default ActivityChart;