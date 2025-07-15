const RefrechTokensGenerate = (user) => {
    const JWT = require('jsonwebtoken');
    const RefrechToken = JWT.sign({ user }, process.env.JWT_REFRECH_TOKEN_SECRET_KEY, { expiresIn: process.env.JWT_REFRECH_TOKEN_EXPIRE });
    return RefrechToken;
}
module.exports = { RefrechTokensGenerate };