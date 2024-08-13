// routes/customers.js
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const Customer = require('../models/Customer');
const mongoose = require('mongoose');
const Order = require('../models/Order');

router.get('/:id/orders', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('orders');
    if (!customer) {
      return res.status(404).send('Customer not found');
    }

    res.status(200).json(customer.orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
    try {
      const customers = await Customer.find();
      res.json(customers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// Routes
router.post('/add', async (req, res) => {
  const { name, email, phone, address } = req.body;

  // if (!name || !email || !phone || !address) {
  //   return res.status(400).send('All fields are required');
  // }

  const newCustomer = new Customer({ name, email, phone, address });

  try {
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a customer and their associated orders
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Delete the customer
    const customerResult = await Customer.deleteOne({ _id: new mongoose.Types.ObjectId(id) });

    if (customerResult.deletedCount === 1) {
      // Delete the orders associated with the customer
      const orderResult = await Order.deleteMany({ customer: id });

      res.status(200).send({
        message: 'Customer and their associated orders deleted successfully',
        ordersDeleted: orderResult.deletedCount,
      });
    } else {
      res.status(404).send({ message: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error deleting customer and their orders:', error);
    res.status(500).send({ message: 'Failed to delete customer and their orders' });
  }
});

  

module.exports = router;
