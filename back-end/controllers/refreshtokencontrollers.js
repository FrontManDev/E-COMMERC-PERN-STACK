const prisma = require('../config/database');
const refreshtokencontrollers = async (req, res) => {
    const refrechtoken = req.cookies.refrechtoken;
    const JWT = require('jsonwebtoken');
    if (!refrechtoken) {
        return res.status(401).json({ message: "refrech tooken not found" });
    }
    try {
        const decoded = JWT.verify(refrechtoken, process.env.JWT_REFRECH_TOKEN_SECRET_KEY);
        const user = await prisma.users.findUnique({
            where: {
                id: decoded.id
            }
        });
        req.user = decoded;
        const accestoken = JWT.sign(
            { id: user.id, Role: user.Role },
            process.env.JWT_ACESS_TOKEN_SECRET_KEY,
            { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE }
        );
        return res.status(200).json({ message: "new acces token", accestoken: accestoken });
    } catch (error) {
        return res.status(500).json({Error:error.message});
    }
}

module.exports = { refreshtokencontrollers };