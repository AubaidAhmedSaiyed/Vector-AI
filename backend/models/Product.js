const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, index: true },
  brand: { type: String },

  sellingPrice: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  holdingCost: { type: Number, default: 0.1 },

  reorderPoint: { type: Number, default: 10 },
  safetyStock: { type: Number, default: 5 },
  leadTime: { type: Number, default: 2 },

  totalStock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
