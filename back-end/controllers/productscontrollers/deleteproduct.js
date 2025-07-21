const prisma = require('../../config/database');
const fs = require('fs');
const path = require('path');
const deletproduct = async (req,res)=>{
    try{
        const {id} = req.params;
        const deletdproduct = await prisma.products.delete({where:{
            id:id
        }});

        const deletedImages =JSON.parse(deletdproduct.ProductsImage);
        deletedImages.forEach((img) => {
            const filepath = path.join(__dirname,"../../ProductsImage",img);
            fs.unlink(filepath,(error)=>{
                if(error){
                    console.log("failed of deleting all images");
                }else{
                    console.log("deleting of the images is sucesfully");
                }
            })
        });
        if(!deletdproduct){
            return res.status(500).json({message:"error in database"});
        }

        return res.status(200).json({message:"product deleted",deletdproduct:deletdproduct});
    }catch(error){
        return res.status(500).json({Error:error.message});
    }
}

module.exports = {deletproduct};