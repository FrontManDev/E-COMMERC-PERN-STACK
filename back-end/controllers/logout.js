const logout = (req,res)=>{
    try{
        res.clearCookie("refrechtoken",{
            httpOnly:true,
            secure:false,
            sameSite:"Lax"
        });
        return res.status(200).json({message:"logout succesfully"});
    }catch(error){
        return res.status(500).json({Error:error.message});
    }
}

module.exports = {logout};