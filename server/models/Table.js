const mongoose = require('mongoose');
const tableSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  qrSlug: { type: String, required: true, unique: true },
  activeSessionId: String
});

module.exports = mongoose.model('Table', tableSchema);
