const prisma = require('../../config/database');
const categorybyid = async (req,res)=>{
    try{
        const id = req.params.id;
        const category = await prisma.category.findFirst({
            where:{
                id:id
            }
        });
        if(!category){
            return res.status(500).json({message:"error in database"});
        }

        return res.status(200).json({message:"the cateory",category:category});
    }catch(error){
        return res.status(500).json({Error:error.message});
    }
}

module.exports = {categorybyid};