// controllers/userController.js


exports.getDashboard = (req, res) => {
    // Assuming req.user contains user data after authentication
    // You can customize this to return the appropriate data
    if (req.user) {
        res.status(200).json({
            message: 'Welcome to your dashboard!',
            user: req.user
        });
    } else {
        res.status(401).json({
            message: 'Unauthorized access'
        });
    }
};
