const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// GET /api/sequence/:chr/:start/:end
router.get('/sequence/:chr/:start/:end', async (req, res) => {
  const { chr, start, end } = req.params;
  const region = `${chr}:${start}-${end}`;
  try {
    const apiRes = await fetch(
      `https://rest.ensembl.org/sequence/region/human/${encodeURIComponent(region)}:1`,
      { headers: { Accept: 'text/plain' } }
    );
    const seq = await apiRes.text();
    res.type('text/plain').send(seq);
  } catch (err) {
    console.error('Sequence proxy error:', err);
    res.status(502).send('Sequence unavailable');
  }
});

module.exports = router;