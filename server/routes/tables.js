// const express = require('express');
// const router = express.Router();
// const Table = require('../models/Table');

// // GET all tables
// router.get('/', async (req,res)=>{
//   const tables = await Table.find();
//   res.json(tables);
// });

// // GET table by qrSlug
// router.get('/:slug', async (req,res)=>{
//   const table = await Table.findOne({qrSlug:req.params.slug});
//   if(!table) return res.status(404).json({error:'Table not found'});
//   res.json(table);
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const Table = require('../models/Table');

// ✅ GET all tables
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    console.error('Error fetching tables:', err);
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
});

// ✅ GET table by qrSlug
router.get('/:slug', async (req, res) => {
  try {
    const table = await Table.findOne({ qrSlug: req.params.slug });
    if (!table) return res.status(404).json({ error: 'Table not found' });
    res.json(table);
  } catch (err) {
    console.error('Error fetching table by slug:', err);
    res.status(500).json({ error: 'Failed to fetch table' });
  }
});

// ✅ Generate QR code for a specific table (auto-create if missing)
router.post('/generate-qr', async (req, res) => {
  try {
    const { number } = req.body;

    if (!number)
      return res.status(400).json({ error: 'Table number is required' });

    const qrSlug = `table-${number}`;

    // Check if table already exists
    let table = await Table.findOne({ qrSlug });
    if (!table) {
      table = await Table.create({ number, qrSlug });
    }

    // ✅ Frontend URL for this table’s menu
    const qrUrl = `http://localhost:5173/menu/${qrSlug}`; // change domain when deployed

    // ✅ Generate base64 QR image
    const qrImage = await QRCode.toDataURL(qrUrl);

    res.json({
      success: true,
      message: 'QR code generated successfully',
      qrUrl,
      qrImage,
      table,
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

module.exports = router;
