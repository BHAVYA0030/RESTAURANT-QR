 const QRCode = require('qrcode');
const Table = require('../models/Table');
const fs = require('fs');
const path = require('path');

/**
 * Generates QR codes for all tables stored in the database.
 * Each QR will link to your frontend's menu route, e.g.:
 *   http://localhost:5173/menu/table-1
 * 
 * @param {string} baseURL - Frontend base URL (e.g. "http://localhost:5173")
 */
async function generateQRCodes(baseURL = "http://localhost:5173") {
  try {
    // Fetch all tables from DB
    const tables = await Table.find();
    if (!tables.length) {
      console.log("⚠️ No tables found in database. Add some tables first.");
      return;
    }

    // Ensure 'qrcodes' folder exists
    const outDir = path.join(__dirname, '..', 'qrcodes');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

    // Generate QR for each table
    for (const t of tables) {
      // If qrSlug missing, skip
      if (!t.qrSlug) {
        console.warn(`⚠️ Table ${t._id} has no qrSlug — skipping`);
        continue;
      }

      const qrUrl = `${baseURL}/menu/${t.qrSlug}`;
      const qrFilePath = path.join(outDir, `${t.qrSlug}.png`);

      await QRCode.toFile(qrFilePath, qrUrl, {
        margin: 2,
        width: 300,
      });

      console.log(`✅ QR generated for ${t.qrSlug}: ${qrUrl}`);
    }

    console.log("🎉 All QR codes successfully generated!");
  } catch (err) {
    console.error("❌ Error generating QR codes:", err);
  }
}

module.exports = generateQRCodes;
