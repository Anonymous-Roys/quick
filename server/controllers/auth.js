const nodemailer = require('nodemailer');
const Salesperson = require('../models/Salesperson');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configure nodemailer for email sending
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'davidarhin2005@gmail.com',
    pass: 'fiwy cfmf zntp uhcy',
  },
});

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP and expiration in the user document
const storeOTP = async (user, otp) => {
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
  await user.save();
};

// Send OTP to the user's email
const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: 'davidarhin2005@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};



// Login function that verifies email and password, then sends an OTP
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await Salesperson.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate and store OTP
    const otp = generateOTP();
    await storeOTP(user, otp);
    console.log(otp)
    // Send OTP via email
    await sendOTP(user.email, otp);

    res.status(200).json({ message: 'OTP sent. Please verify the OTP to complete login.' });
  } catch (error) {
    console.error('Error initiating login:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};




// OTP verification function
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  
  try {
    const user = await Salesperson.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }
    
    // Check if OTP is valid and not expired
    if (user.otp === otp && Date.now() < user.otpExpires) {
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );
      console.log(otp)
  
      res.status(200).json({ token });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


module.exports = { login, verifyOtp };
