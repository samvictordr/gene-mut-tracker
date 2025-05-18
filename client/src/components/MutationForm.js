import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function MutationForm() {
  const [form, setForm] = useState({ geneSymbol: '', organism: '', mutationType: '', mutationDescription: '', position: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/api/mutations/${id}`).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`/api/mutations/${id}`, form);
    } else {
      await axios.post('/api/mutations', form);
    }
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{id ? 'Edit Mutation' : 'Add Mutation'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'geneSymbol', label: 'Gene Symbol', type: 'text' },
          { name: 'organism', label: 'Organism', type: 'text' },
          { name: 'mutationType', label: 'Type', type: 'text' },
          { name: 'mutationDescription', label: 'Description', type: 'text' },
          { name: 'position', label: 'Position', type: 'number' }
        ].map(field => (
          <div key={field.name}>
            <label className="block mb-1">{field.label}</label>
            <input
              name={field.name}
              type={field.type}
              value={form[field.name]}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
        ))}
        <button type="submit" className="rounded-xl px-6 py-3 bg-green-600 hover:shadow-glow transition text-white">
          {id ? 'Update' : 'Add'} Mutation
        </button>
      </form>
    </div>
  );
}

export default MutationForm;