const prisma = require('../../config/database');

const productbyid = async (req,res)=>{
    try{
        const {id} = req.params;
        const product = await prisma.products.findFirst({where:{
            id:id
        }});
        if(!product){
            return res.status(500).json({message:"error in database"});
        }

        return res.status(200).json({message:"product",product:product});
    }catch(error){
        return res.status(500).json({Error:error.message});
    }
}

module.exports = {productbyid};