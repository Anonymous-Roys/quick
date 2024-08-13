// routes/customers.js
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Salesperson = require('../models/Salesperson');
const cloudinary = require("../config/cloudinary");
const uploader = require("../config/multer")


const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  updateItemQuantity,
} = require('../controllers/stockController');
const bcrypt = require('bcrypt');
const upload = require('../config/multer');




// Get all salespersons
router.get('/salespersons', async (req, res) => {
  try {
    const salespersons = await Salesperson.find();
    res.json(salespersons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching salespersons' });
  }
});

// Get a single salesperson by ID
router.get('/salespersons/:id', async (req, res) => {
  try {
    const salesperson = await Salesperson.findById(req.params.id);
    if (!salesperson) return res.status(404).json({ message: 'Salesperson not found' });
    res.json(salesperson);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching salesperson' });
  }
});









router.post('/salespersons', uploader.single("image") , async (req, res) => {
  try {
   

    console.log('Uploaded File:', req.file.originalname);

    const { username, email, phone, password, status, address } = req.body;


   const image = req.file.path


    const salesperson = new Salesperson({ 
      username, 
      email, 
      phone, 
      password, 
      status, 
      address, 
      image 
    });

    await salesperson.save();

    res.status(201).json(salesperson);
  } catch (error) {
    console.error('Error creating salesperson:', error);
    res.status(500).json({ message: 'Error creating salesperson', error });
  }
});




// Update a salesperson
router.put('/salespersons/:id', uploader.single('image'), async (req, res) => {
  try {
    const { username, email, phone, password, status, address } = req.body;
    const salesperson = await Salesperson.findById(req.params.id);

    if (!salesperson) return res.status(404).json({ message: 'Salesperson not found' });

    salesperson.username = username || salesperson.username;
    salesperson.email = email || salesperson.email;
    salesperson.phone = phone || salesperson.phone;
    if (password) salesperson.password = password;
    salesperson.status = status || salesperson.status;
    salesperson.address = address || salesperson.address;
    if (req.file) salesperson.image = req.file.path; // Update image if new image is uploaded

    await salesperson.save();
    res.json(salesperson);
  } catch (error) {
    res.status(400).json({ message: 'Error updating salesperson' });
  }
});

// Delete a salesperson
router.delete('/salespersons/:id', async (req, res) => {
  try {
    const salesperson = await Salesperson.findByIdAndDelete(req.params.id);
    if (!salesperson) return res.status(404).json({ message: 'Salesperson not found' });
    res.json({ message: 'Salesperson deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting salesperson' });
  }
});

// Change Password
router.put('/salespersons/:id/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const salesperson = await Salesperson.findById(req.params.id);
    if (!salesperson) return res.status(404).json({ message: 'Salesperson not found' });

    const isMatch = await bcrypt.compare(currentPassword, salesperson.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    salesperson.password = newPassword;
    await salesperson.save();
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error changing password' });
  }
});

module.exports = router;

  
  // --------------------------------------------------------------------------------

// routes/itemRoutes.js


router.get('/stock', getItems);
router.post('/stock', addItem);
router.put('/stock/:id', updateItem);
router.put('/stockQuantity/:id', updateItemQuantity);
router.delete('/stock/:id', deleteItem);

module.exports = router;





  module.exports = router;
  