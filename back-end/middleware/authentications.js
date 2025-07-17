function authentication(req, res, next) {
    const JWT = require('jsonwebtoken');
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = JWT.verify(token, process.env.JWT_ACESS_TOKEN_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = { authentication };
