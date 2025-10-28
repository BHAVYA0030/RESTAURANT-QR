// const mongoose = require('mongoose');

// const menuItemSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
//   categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuCategory' },
//   imageUrl: String,
//   availability: { type: Boolean, default: true },
//   tags: [String],
//   tableSlug: { type: String, default: "default-table" } // ✅ new field
// });

// menuItemSchema.index({ categoryId: 1, name: 1 });
// module.exports = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuCategory' },
  imageUrl: String,
  availability: { type: Boolean, default: true },
  tags: [String],

  // ✅ Default tableSlug fallback (for QR-based system)
  tableSlug: { type: String, default: "default-table" },
});

// Improve query performance
menuItemSchema.index({ categoryId: 1, name: 1 });

module.exports = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);
