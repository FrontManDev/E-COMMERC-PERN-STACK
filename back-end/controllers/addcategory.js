const prisma = require('../config/database');
const addcategory = async (req,res)=>{
    try{
        const {Name} = req.body;
        const category = await prisma.category.create({data:{
            Name : Name
        }});
        if(!category){
            return res.status(500).json({Error:"error in database"});
        }
        return res.status(200).json({message : "the category is added succesfully",category:category});
    }catch(error){
        return res.status(500).json({Error:error.message});
    }
}
module.exports = {addcategory};