import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function MutationChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('/api/mutations').then(res => {
      const counts = res.data.reduce((acc, m) => {
        acc[m.mutationType] = (acc[m.mutationType]||0) + 1;
        return acc;
      }, {});
      setData(Object.entries(counts).map(([type, count]) => ({ type, count })));
    });
  }, []);
  return (
    <div className="w-full h-64 bg-gray-800 p-4 rounded-xl shadow-lg mb-6">
      <h3 className="text-xl mb-2">Mutation Type Distribution</h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <XAxis dataKey="type" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="count" fill="#00d4ff" radius={[8,8,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MutationChart;
