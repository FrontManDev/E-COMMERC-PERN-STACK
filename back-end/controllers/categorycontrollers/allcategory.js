const prisma = require('../../config/database');
const allcategory = async (req,res)=>{
    try{
        const category = await prisma.category.findMany();
        if(!category){
            return res.status(500).json({message:"error in database"});
        }

        return res.status(200).json({message:"all category",category:category});
    }catch(error){
        return res.status(500).json({message:"error in server"});
    }
}
module.exports = {allcategory};