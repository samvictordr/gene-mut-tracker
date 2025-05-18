// client/src/components/MutationDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import GeneSchematic from './GeneSchematic';
import SequenceContext from './SequenceContext';

export default function MutationDetail() {
  const { id } = useParams();
  const [mutation, setMutation] = useState(null);
  const [geneInfo, setGeneInfo] = useState(null);
  const [geneSpan, setGeneSpan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1) Load mutation record
  useEffect(() => {
    setLoading(true);
    axios.get(`/api/mutations/${id}`)
      .then(res => {
        if (!res.data) throw new Error('No record found');
        setMutation(res.data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // 2) Fetch gene metadata ∔ span (MyGene → Ensembl fallback)
  useEffect(() => {
    if (!mutation) return;
    (async () => {
      let span = null;
      try {
        const mg = await axios.get('https://mygene.info/v3/query', {
          params: {
            q: `symbol:${mutation.geneSymbol}`,
            species: 'human',
            fields: 'name,chromosome,map_location,summary,uniprot,genomic_pos_hg38'
          }
        });
        const hit = mg.data.hits?.[0];
        setGeneInfo(hit || null);
        const gp = hit?.genomic_pos_hg38;
        if (Array.isArray(gp)) span = gp[0];
        else if (gp?.chr) span = gp;
      } catch {
        /* ignore */
      }
      if (!span) {
        try {
          const ens = await axios.get(
            `https://rest.ensembl.org/lookup/symbol/human/${mutation.geneSymbol}`,
            { headers: { Accept: 'application/json' } }
          );
          span = {
            chr: ens.data.seq_region_name,
            start: ens.data.start,
            end: ens.data.end
          };
        } catch {
          /* ignore */
        }
      }
      setGeneSpan(span);
    })();
  }, [mutation]);

  // 3) Render
  if (loading)      return <div className="p-6 text-gray-100">Loading mutation details…</div>;
  if (error)        return <div className="p-6 text-red-400">Error: {error}</div>;
  if (!mutation)    return <div className="p-6 text-gray-400">No mutation found.</div>;

  return (
    <div className="container mx-auto p-6">
      <Link to="/" className="text-blue-400 hover:underline mb-4 block">
        ← Back to list
      </Link>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold">{mutation.geneSymbol}</h2>
        <p><strong>Organism:</strong> {mutation.organism}</p>
        <p><strong>Type:</strong> {mutation.mutationType}</p>
        <p><strong>Position:</strong> {mutation.position}</p>
        <p><strong>Description:</strong> {mutation.mutationDescription}</p>
        <p>
          <strong>Submitted on:</strong>{' '}
          {new Date(mutation.createdAt).toLocaleString()}
        </p>

        <p>
          <strong>Chromosome:</strong>{' '}
          {geneInfo?.chromosome || geneSpan?.chr || 'n/a'}
        </p>

        <div className="mt-4 bg-gray-700 p-4 rounded-xl shadow-inner space-y-4">
          {geneInfo && (
            <>
              <h3 className="text-xl font-semibold">Gene Metadata</h3>
              <p><strong>Name:</strong> {geneInfo.name}</p>
              {geneInfo.map_location && (
                <p><strong>Map location:</strong> {geneInfo.map_location}</p>
              )}
              {geneInfo.summary && (
                <p className="mt-2 text-sm leading-relaxed">{geneInfo.summary}</p>
              )}
              {geneInfo.uniprot?.['Swiss-Prot'] && (
                <p>
                  <a
                    href={`https://www.uniprot.org/uniprot/${geneInfo.uniprot['Swiss-Prot']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:underline"
                  >
                    View UniProt Entry
                  </a>
                </p>
              )}
            </>
          )}

          {geneSpan ? (
            <>
              <GeneSchematic span={geneSpan} mutationPos={mutation.position} />
              <SequenceContext span={geneSpan} mutationPos={mutation.position} />
            </>
          ) : (
            <p className="text-yellow-400">
              No genomic span available for schematic/sequence.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
