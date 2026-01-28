    const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },

  initialQty: { type: Number, required: true },
  currentQty: { type: Number, required: true, min: 0 },

  expiryDate: { type: Date, required: true, index: true },
  receivedDate: { type: Date, default: Date.now },

  purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder' },
  supplier: { type: String },

  status: {
    type: String,
    enum: ['Active', 'Sold', 'Expired', 'Liquidation'],
    default: 'Active'
  }
});

BatchSchema.index({ product: 1, status: 1, expiryDate: 1 });

module.exports = mongoose.model('Batch', BatchSchema);
