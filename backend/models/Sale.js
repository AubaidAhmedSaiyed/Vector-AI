const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },

  quantity: { type: Number, required: true },

  saleDate: { type: Date, default: Date.now, index: true },

  storeId: { type: String, default: "store_1" }
});

module.exports = mongoose.model('Sale', SaleSchema);