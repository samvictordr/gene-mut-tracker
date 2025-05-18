import React, { useEffect, useState } from 'react';

export default function SequenceContext({ span, mutationPos }) {
  const [seq, setSeq] = useState(null);
  const flank = 20; // bases on either side

  // Destructure span including strand
  const { chr, start, end, strand } = span;
  // Calculate genomic position based on strand
  const genomicPos = (strand === -1 || strand === '-1')
    ? end - (mutationPos - 1)
    : start + (mutationPos - 1);

  const left = genomicPos - flank;
  const right = genomicPos + flank;

  useEffect(() => {
    fetch(`/api/sequence/${chr}/${left}/${right}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.text();
      })
      .then(text => setSeq(text.trim()))
      .catch(err => {
        console.error('Error fetching sequence:', err);
        setSeq('');  // mark as unavailable
      });
  }, [chr, left, right]);

  if (seq === null) {
    return <div className="text-lg text-gray-400">Loading sequence…</div>;
  }
  if (seq === '') {
    return <div className="text-lg text-red-400">Sequence unavailable.</div>;
  }

  // Color mapping for bases
  const colorMap = {
    'A': 'text-red-400',
    'T': 'text-green-400',
    'C': 'text-blue-400',
    'G': 'text-yellow-400'
  };

  return (
    <div className="mt-6">
      <div className="text-lg text-gray-200 mb-1">Sequence context (±20 bp):</div>
      <pre className="bg-gray-700 p-3 rounded-xl overflow-x-auto font-mono text-lg">
        {seq.split('').map((base, i) => {
          const isMut = i === flank;
          const colorClass = colorMap[base.toUpperCase()] || 'text-gray-100';
          return (
            <span
              key={i}
              className={`${colorClass} ${isMut ? 'bg-red-600 text-white rounded px-0.5' : ''}`}
            >
              {base}
            </span>
          );
        })}
      </pre>
    </div>
  );
}
