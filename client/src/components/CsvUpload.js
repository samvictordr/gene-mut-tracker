// client/src/components/CsvUpload.js
import React from 'react';
import Papa from 'papaparse';
import axios from 'axios';

export default function CsvUpload({ onComplete }) {
  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async results => {
        for (let row of results.data) {
          try {
            await axios.post('/api/mutations', row);
          } catch (err) {
            console.error('Import error:', err, row);
          }
        }
        onComplete();
      }
    });
  };

  return (
    <label className="px-4 py-2 rounded-xl bg-green-600 hover:shadow-glow transition text-white cursor-pointer">
      Import CSV
      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="hidden"
      />
    </label>
  );
}
