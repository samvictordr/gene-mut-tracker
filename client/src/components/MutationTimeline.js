import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export default function MutationTimeline() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/mutations').then(res => {
      const countsByDay = res.data.reduce((acc, m) => {
        // Extract YYYY-MM-DD from createdAt
        const day = m.createdAt.slice(0,10);
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});
      // Turn into sorted array
      const timeline = Object.entries(countsByDay)
        .map(([date, count]) => ({ date, count }))
        .sort((a,b) => a.date.localeCompare(b.date));
      setData(timeline);
    }).catch(err => console.error(err));
  }, []);

  return (
    <div className="w-full h-64 bg-gray-800 p-4 rounded-xl shadow-lg mb-6">
      <h3 className="text-xl mb-2">Submissions Over Time</h3>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#00ffea"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
