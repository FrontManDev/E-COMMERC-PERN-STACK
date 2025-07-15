function me(req,res){
    const JWT = require('jsonwebtoken');
    try{
        const token = req.cookeies.token;
        if(!token){
            return  res.status(401).json({Error:"Unauthorized access"});
        }
        const decoded = JWT.verify(token,process.env.JWT_ACESS_TOKEN_SECRET_KEY);
        return res.status(200).json({user:decoded});
    }catch(error){
        res.status(500).json({Error:error.message});
    }
}

module.exports = {me};