const prisma = require('../../config/database');

const allproducts = async (req,res)=>{
    try{
        const allproduct = await prisma.products.findMany();
        if(!allproduct){
            return res.status(500).json({message:"error in database"});
        } 
        return res.status(200).json({message:"all poducts",allproduct:allproduct});
    }catch(error){
        return res.status(500).json({Error:error.message});
    }
}

module.exports = {allproducts};