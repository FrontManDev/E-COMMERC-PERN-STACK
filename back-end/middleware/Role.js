function IsAdmin(req,res,next){
    if(req.user && req.user.Role === 'ADMIN'){
        next();
    }else{
        res.status(403).json({message:"acces denied not admin"})
    }
}

module.exports = {IsAdmin};