const refreshtokencontrollers = (req,res)=>{
    const refrecktoken = req.cookies.refrechtoken;
    if(!refrecktoken){
        return res.status(401).json({message:"refrech tooken not found"});
    }
    const JWT = require('jsonwebtoken');
    JWT.verify(refrecktoken,process.env.JWT_REFRECH_TOKEN_SECRET_KEY,(err,decode)=>{
        if(err){
            return res.status(403).json({message:"invalid refrech token"});
        }
        const newaccestoken = JWT.sign({User:decode.User},process.env.JWT_ACESS_TOKEN_SECRET_KEY,{expiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRE});
        return res.status(200).json({message:"new acces token",token:newaccestoken});
    });
}

module.exports = {refreshtokencontrollers};