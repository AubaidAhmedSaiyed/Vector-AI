const mongoose = require('mongoose');

const SnapshotSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  date: { type: Date, required: true, index: true },

  closingStock: { type: Number, required: true },
  estimatedSales: { type: Number, default: 0 }
});

SnapshotSchema.index({ product: 1, date: -1 });

module.exports = mongoose.model('Snapshot', SnapshotSchema);
