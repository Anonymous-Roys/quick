// routes/api/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');

// @route   POST api/orders
// @desc    Create an order
// @access  Public
router.post('/', async (req, res) => {
  const { customerName, product, quantity, status } = req.body;
  try {
    let order = new Order({
      customerName,
      product,
      quantity,
      status,
    });

    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/orders
// @desc    Get all orders
// @access  Public
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
