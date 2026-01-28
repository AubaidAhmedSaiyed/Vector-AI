const mongoose = require('mongoose');

const PurchaseOrderSchema = new mongoose.Schema({
  poNumber: { type: String, unique: true },
  supplier: { type: String, required: true },

  status: {
    type: String,
    enum: ['Pending', 'Received', 'Cancelled'],
    default: 'Pending'
  },

  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    orderedQty: { type: Number, required: true },
    receivedQty: { type: Number, default: 0 },
    costPerUnit: { type: Number }
  }],

  orderDate: { type: Date, default: Date.now },
  expectedDate: { type: Date },
  receivedDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
