// controllers/itemController.js

const Stock = require('../models/Stock');

exports.getItems = async (req, res) => {
  try {
    const items = await Stock.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

exports.addItem = async (req, res) => {
  const { name, quantity, threshold, description } = req.body;
  try {
    const newItem = new Stock({ name, quantity,threshold, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item' });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, quantity,threshold, description } = req.body;
  try {
    const updatedItem = await Stock.findByIdAndUpdate(
      id,
      { name, quantity,threshold, description, lastUpdated: Date.now() },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item' });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Stock.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
};

//update quantity in the sales dashboard
exports.updateItemQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;


  try {
    // Find the product by ID and update the quantity
    const product = await Stock.findById(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    product.quantity += quantity;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).send('Server error');
  }


};


