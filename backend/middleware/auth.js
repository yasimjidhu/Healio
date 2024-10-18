const jwt = require('jsonwebtoken');

// Verify JWT token
const verifyToken = (req, res, next) => {

    // Access the token from cookies
    const token = req.cookies.token; 

    // Check if the token is present
    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        // Attach the verified user info to the request object
        req.user = verified;

        // Call the next middleware
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = verifyToken;
