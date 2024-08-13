const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader   
 && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message:   
 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error)   
 {
    console.error('JWT verification error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized: Token expired' });
    } else {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
  }
};

module.exports = { authMiddleware };