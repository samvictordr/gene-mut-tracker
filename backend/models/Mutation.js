const mongoose = require('mongoose');

const mutationSchema = new mongoose.Schema({
  geneSymbol: { type: String, required: true },
  organism: { type: String, required: true },
  mutationType: { type: String, required: true },
  mutationDescription: { type: String, required: true },
  position: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Mutation', mutationSchema);