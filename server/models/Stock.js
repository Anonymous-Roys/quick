// models/Item.js

const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  threshold: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Stock = mongoose.model('Item', StockSchema, 'Stocks');
module.exports = Stock;
