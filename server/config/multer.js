// config/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'salespersons',
    allowedFormats: ['jpg', 'png', 'jpeg'],
  },
});


// const storage = multer.memoryStorage();

const upload = multer({ storage : storage});

module.exports = upload;
