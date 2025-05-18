// client/src/components/MutationList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MutationChart from './MutationChart';
import MutationTimeline from './MutationTimeline';
import CsvUpload from './CsvUpload';

function downloadCSV(data) {
  const header = ['geneSymbol','organism','mutationType','mutationDescription','position'];
  const rows = data.map(m =>
    header.map(key => JSON.stringify(m[key] ?? '')).join(',')
  );
  const csvContent = [ header.join(','), ...rows ].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mutations_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function MutationList() {
  const [mutations, setMutations] = useState([]);

  useEffect(() => {
    fetchMutations();
  }, []);

  const fetchMutations = async () => {
    try {
      const res = await axios.get('/api/mutations');
      setMutations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMutation = async (id) => {
    if (window.confirm('Delete this mutation?')) {
      try {
        await axios.delete(`/api/mutations/${id}`);
        fetchMutations();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <MutationChart />
      <MutationTimeline />

      <div className="flex items-center mb-4 space-x-2">
        <button
          onClick={() => downloadCSV(mutations)}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:shadow-glow transition text-white"
        >
          Export CSV
        </button>
        <CsvUpload onComplete={fetchMutations} />
      </div>

      <h1 className="text-3xl font-semibold mb-6">Mutation Records</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <thead className="bg-gray-700">
            <tr>
              {['Gene','Organism','Type','Position','Actions'].map(h => (
                <th key={h} className="px-4 py-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mutations.map(m => (
              <tr key={m._id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                <td className="px-4 py-2">{m.geneSymbol}</td>
                <td className="px-4 py-2">{m.organism}</td>
                <td className="px-4 py-2">{m.mutationType}</td>
                <td className="px-4 py-2">{m.position}</td>
                <td className="px-4 py-2 space-x-2">
                  {/* View detail */}
                  <Link
                    to={`/detail/${m._id}`}
                    className="rounded-xl px-2 py-1 bg-blue-600 hover:shadow-glow transition text-white"
                  >
                    View
                  </Link>

                  {/* Edit form */}
                  <Link
                    to={`/edit/${m._id}`}
                    className="rounded-xl px-2 py-1 bg-green-600 hover:shadow-glow transition text-white"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteMutation(m._id)}
                    className="rounded-xl px-2 py-1 bg-red-600 hover:shadow-glow transition text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
