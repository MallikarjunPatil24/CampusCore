const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Get token from the header
    const token = req.header('Authorization');

    // 2. Check if token exists
    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        // 3. Verify the token using your secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Add user data to the request object
        next(); // Move to the actual controller function
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = { verifyToken };