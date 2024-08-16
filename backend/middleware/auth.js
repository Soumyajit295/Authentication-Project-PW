const JWT = require('jsonwebtoken')

const jwtAuth = (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || null;
    console.log('Extracted Token:', token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized user"
        });
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET);
        console.log('Decoded Payload:', payload);
        req.user = { id: payload.id, email: payload.email }; // Ensure this matches what you're sending in the token
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = jwtAuth