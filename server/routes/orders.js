// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb');


router.post('/', async (req, res) => {
  try {
      const { customer, selections, copies, desc, status, time } = req.body;

      const newOrder = new Order({
          customer,
          selections,
          copies,
          desc,
          status,
          time
      });

      const savedOrder = await newOrder.save();

      res.status(201).json(savedOrder);
  } catch (error) {
      console.error('Error saving order:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


// GET all orders
router.get('/', async (req, res) => {
  try {
      const orders = await Order.find().populate('customer');
      res.status(200).json(orders);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error });
  }
});


// GET orders by customer ID
router.get('/customer/:customerId', async (req, res) => {
  try {
      const orders = await Order.find({ customer: req.params.customerId }).populate('customer');
      res.status(200).json(orders);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error });
  }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
      const result = await Order.deleteOne({  _id: new mongoose.Types.ObjectId(id) });
  
      if (result.deletedCount === 1) {
        res.status(200).send({ message: 'Order deleted successfully' });
      } else {
        res.status(404).send({ message: 'Order not found' });
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).send({ message: 'Failed to delete order' });
    }
  });

module.exports = router;
