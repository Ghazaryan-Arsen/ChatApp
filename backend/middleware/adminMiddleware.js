const User = require('../models/User');

// This is a simple admin middleware. In a real application, you'd have a more robust role system.
// For now, we'll assume the first user registered is the admin.
module.exports = async function (req, res, next) {
    try {
        const user = await User.findById(req.user.id);
        if (user.email === 'admin@example.com') { // You can change this to a more secure check
            next();
        } else {
            res.status(403).json({ msg: 'Admin resource. Access denied.' });
        }
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};