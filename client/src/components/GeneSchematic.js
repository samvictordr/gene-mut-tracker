// client/src/components/GeneSchematic.js
import React from 'react';

export default function GeneSchematic({ span, mutationPos }) {
  const { chr, start, end } = span;
  const total = end - start;
  // clamp between 0–1
  const frac = Math.max(0, Math.min(1, (mutationPos - start) / total));

  return (
    <div className="mt-6">
      <div className="text-gray-300 mb-1">Chromosome {chr}: {start.toLocaleString()}–{end.toLocaleString()}</div>
      <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
        {/* gene body */}
        <div className="absolute inset-y-0 left-0 right-0 bg-blue-500 opacity-50" />

        {/* mutation marker */}
        <div
          className="absolute top-0 h-full w-1 bg-red-400 rounded-full"
          style={{ left: `${frac * 100}%` }}
        />
      </div>
      <div className="text-sm text-gray-400 mt-1">Position {mutationPos.toLocaleString()}</div>
    </div>
  );
}
