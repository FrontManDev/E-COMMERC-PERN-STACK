const prisma = require("../../config/database");

const UserById = async (req,res)=>{
    try{
        const id = req.params.id;
        const user = await prisma.users.findUnique({where:{
            id : id
        }});

        if(!user){
            return res.status(500).json({message : "error with finding the user"});
        }
        return res.status(200).json({message:"the user ",user:user});
    }catch(error){
        res.status(500).json({Error:error.message});
    }
}

module.exports = {UserById}; 