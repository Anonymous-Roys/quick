const mongoose = require('mongoose');

const selectionSchema = new mongoose.Schema({
  parent: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  selections: [selectionSchema],
  copies: { type: Number, required: true },
  desc: { type: String },
  status: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesPerson' },
  time: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
