function AccesTokenGenerate(User){
    const JWT = require('jsonwebtoken');
    const token = JWT.sign({id:User.id,Role:User.Role},process.env.JWT_ACESS_TOKEN_SECRET_KEY,{expiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRE});
    return token;
}

module.exports = {AccesTokenGenerate};