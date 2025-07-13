const prisma = require('../../config/database');

const deletproduct = async (req,res)=>{
    try{
        const {id} = req.params;
        const deletdproduct = await prisma.products.delete({where:{
            id:id
        }});
        if(!deletdproduct){
            return res.status(500).json({message:"error in database"});
        }

        return res.status(200).json({message:"product deleted",deletdproduct:deletdproduct});
    }catch(error){
        return res.status(500).json({Error:error.message});
    }
}

module.exports = {deletproduct};