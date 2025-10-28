//  const mongoose = require('mongoose');
// const menuCategorySchema = new mongoose.Schema({
//   name: String,
//   displayOrder: Number,
//   active: { type: Boolean, default: true }
// });
// module.exports = mongoose.model('MenuCategory', menuCategorySchema);
const mongoose = require("mongoose");

const menuCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  displayOrder: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("MenuCategory", menuCategorySchema);
