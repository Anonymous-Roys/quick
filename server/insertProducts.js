require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { parent: 'Scanning', children: [{ label: 'Black and White, Simplex', price: 1 }, { label: 'Black and White, Duplex', price: 1.5 }, { label: 'Coloured, Simplex', price: 1.5 }, { label: 'Coloured, Duplex', price: 2 }] },
  { parent: 'Photocopy', children: [{ label: 'Black and White, Simplex', price: 0.5 }, { label: 'Black and White, Duplex', price: 1 }, { label: 'Coloured, Simplex', price: 1.5 }, { label: 'Coloured, Duplex', price: 2 }] },
  { parent: 'Printing A4', children: [{ label: 'Black and White, Simplex', price: 1 }, { label: 'Black and White, Duplex', price: 1.5 }, { label: 'Coloured, Simplex', price: 1.5 }, { label: 'Coloured, Duplex', price: 2 }] },
  { parent: 'Printing A3', children: [{ label: 'Black and White, Simplex', price: 1.5 }, { label: 'Black and White, Duplex', price: 2 }, { label: 'Coloured, Simplex', price: 2 }, { label: 'Coloured, Duplex', price: 2.5 }] },
  { parent: 'Typing & Editing A4', children: [{ label: '1 Page, Simplex', price: 0.7 }] },
  { parent: 'Business Cards', children: [{ label: '50 Copies', price: 120 }, { label: '1 Copy', price: 3 }] },
  { parent: 'Tags', children: [{ label: '1 Copy', price: 11 }] },
  { parent: 'Photo Paper Printing', children: [{ label: 'A4 (1 Copy)', price: 10 }, { label: 'A3 (1 Copy)', price: 20 }] },
  { parent: 'Comb-Bining', children: [{ label: '6mm-12mm', price: 10 }, { label: '14mm-20mm', price: 12 }, { label: '20mm and upwards', price: 15 }] },
  { parent: 'Designing', children: [{ label: 'Logo Designing', price: 50 }, { label: 'Normal Designing', price: 75 }] },
  { parent: 'Heat Press Printing', children: [{ label: 'Lacoste', price: 70 }, { label: 'T-Shirt, Round Neck', price: 55 }] }
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    await Product.insertMany(products);
    console.log('Products inserted');
    mongoose.disconnect();
  })
  .catch(err => console.log(err));
