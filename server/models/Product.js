const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  parent: { type: String, required: true },
  children: [
    {
      label: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ]
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
