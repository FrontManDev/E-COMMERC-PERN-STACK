const prisma = require("../../config/database");
const blockuser = async (req,res)=>{
    try{
        const id = req.params.id;
        const blockuser = await prisma.users.update({
            where:{
                id
            },data:{
                Status : "BLOCK"
             }
        });
        if(!blockuser){
            return res.status(500).json({message : "error  in database"});
        }
        return res.status(200).json({message:"user is blocked susecfully",blockuser:blockuser});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}
module.exports = {blockuser};