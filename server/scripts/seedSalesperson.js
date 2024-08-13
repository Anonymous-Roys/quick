const mongoose = require('mongoose');
const Salesperson = require('../models/Salesperson');

mongoose.connect('mongodb://localhost:27017/PrintingShop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
}).then(async () => {
  console.log('Connected to MongoDB');
  
  const newSalesperson = new Salesperson({
    username: 'daves',
    password: '12345', // This will be hashed automatically
    email: 'davidarhin2005@gmail.com',
    phone: '000',
  });

  await newSalesperson.save();
  console.log('Salesperson seeded');
  mongoose.disconnect();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
