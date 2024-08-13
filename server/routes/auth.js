// routes/auth.js
const express = require('express');
const { login, verifyOtp } = require('../controllers/auth');
const {authMiddleware} = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const Salesperson = require('../models/Salesperson');

const router = express.Router();

router.post('/login', login);
router.post('/verify-otp', verifyOtp);


// Example of a protected route
// router.get('/protected-route', authMiddleware, (req, res) => {
//     res.status(200).json({ message: 'This is a protected route' });
//   });
// Example of a protected route
router.get('/sales', authMiddleware, async (req, res) => {
  try {
      if (req.user) {
          // Assuming you need to fetch additional user details like email from the database
          // If email is directly available in req.user, you can just include it in the response
          const { userId, username } = req.user;

          // Example of fetching user email from a database
          // Replace this with your actual data retrieval logic
          const user = await Salesperson.findById(userId); // Ensure User is a model representing your users
          
          if (user) {
              res.status(200).json({
                  username: user.username,
                  email: user.email,
                phone: user.phone,
                image: user.image,
                password: user.password,
                address: user.address,
                status: user.status,

              });
          } else {
              res.status(404).json({ message: 'User not found' });
          }
      } else {
          res.status(400).json({ message: 'User not authenticated' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
  }
});







module.exports = router;
