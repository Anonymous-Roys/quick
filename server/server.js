require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const customersRouter = require('./routes/customers');
const adminRouter = require('./routes/admin');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
// Middleware
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes

app.use('/auth', authRoutes);

app.use('/api/products', productsRouter);

app.use('/api/orders', ordersRouter);

app.use('/api/customers', customersRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
