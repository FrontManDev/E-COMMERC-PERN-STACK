const RefrechTokensGenerate = (User) => {
    const JWT = require('jsonwebtoken');
    const RefrechToken = JWT.sign({id:User.id,Role:User.Role}, process.env.JWT_REFRECH_TOKEN_SECRET_KEY, { expiresIn: process.env.JWT_REFRECH_TOKEN_EXPIRE });
    return RefrechToken;
}
module.exports = { RefrechTokensGenerate };