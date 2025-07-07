function AccesTokenGenerate(User){
    const JWT = require('jsonwebtoken');
    const token = JWT.sign({User},process.env.JWT_ACESS_TOKEN_SECRET_KEY,process.envJWT_ACESS_TOKEn_EXSPIRE);
    return token;
}

module.exports = {AccesTokenGenerate};