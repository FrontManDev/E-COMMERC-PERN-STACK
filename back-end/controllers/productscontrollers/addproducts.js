const prisma = require('../../config/database');
const addproducts = async (req, res) => {
    try {
        const { Name, Description, Price, Quantity, categoryId } = req.body;
        const files = req.files;
        if (!Name || !Description || !Price || !Quantity || !categoryId || !files.length === 0) {
            return res.status(400).json({ message: " all feilds are requirde" });
        }
        const IsExiste = await prisma.products.findFirst({where:{
            Name:Name
        }});
        if(IsExiste){
            return res.status(400).json({message:"this product is allready existe"});
        }
        const image = files.map((file)=>file.filename);
        const NewProduct = await prisma.products.create({
            data: {
                Name,
                Description,
                Price : parseFloat(Price),
                Quantity : parseInt(Quantity),
                categoryId,
                ProductsImage: JSON.stringify(image),
            }
        });
        if (!NewProduct) {
            return res.status(500).json({ message: "error in database" });
        }

        return res.status(200).json({ message: "the products is added succesfully", NewProduct: NewProduct });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

module.exports = { addproducts };