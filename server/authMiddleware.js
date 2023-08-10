// Create a file named authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.header('Authorization');


    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        token = token.split(' ')[1]

        const verified = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret key
        req.user = verified;
        next();
    } catch (err) {

        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;
