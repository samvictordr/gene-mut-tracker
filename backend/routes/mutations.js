const express = require('express');
const router = express.Router();
const Mutation = require('../models/Mutation');

router.get('/', async (req, res) => {
  try {
    const mutations = await Mutation.find();
    res.json(mutations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const mutation = await Mutation.findById(req.params.id);
    if (!mutation) return res.status(404).json({ message: 'Not found' });
    res.json(mutation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Original POST route without createdAt handling
// router.post('/', async (req, res) => {
//   try {
//     const newMutation = new Mutation(req.body);
//     const saved = await newMutation.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     // Pull everything from the body, including createdAt if present
//     const data = { ...req.body };

//     // If user supplied createdAt, convert it to a Date object
//     if (data.createdAt) {
//       data.createdAt = new Date(data.createdAt);
//     }

//     const newMutation = new Mutation(data);
//     const saved = await newMutation.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// CREATE single or bulk mutations
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    // Detect bulk array
    if (Array.isArray(body)) {
      // Normalize createdAt fields
      const docs = body.map(data => {
        if (data.createdAt) data.createdAt = new Date(data.createdAt);
        return data;
      });
      const inserted = await Mutation.insertMany(docs);
      return res.status(201).json(inserted);
    }
    // Single create
    const data = { ...body };
    if (data.createdAt) data.createdAt = new Date(data.createdAt);
    const newMutation = new Mutation(data);
    const saved = await newMutation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Mutation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Mutation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;