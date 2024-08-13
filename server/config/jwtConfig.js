module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your_fallback_secret', // Fallback if env variable is not set
    jwtExpiry: '8h', // Expiry time, for example, 3 hours
  };