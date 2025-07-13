const prisma = require('../../config/database');
const updateproducts = async (req, res) => {
    try {
        const { Name, Description, Price, Quantity, Category, categoryId } = req.body;
        const file = req.files;
        const { id } = req.prams;
        if (!Name && !Description && !Price && !Quantity && !Category && !categoryId && file.length === 0) {
            return res.status(400).json({ message: "you have to update atleast one information about the product" });
        }
        const UpdateProduct = {};
        UpdateProduct.Name = Name;
        UpdateProduct.Description = Description;
        UpdateProduct.Price = Price;
        UpdateProduct.Quantity = Quantity;
        UpdateProduct.Category = Category;
        UpdateProduct.categoryId = categoryId;

        const updateproduct = await prisma.products.update({
            where: {
                id: id
            },
            data: UpdateProduct
        });

        if(!updateproduct){
            return res.status(500).json({message:"error in database"});
        }

        return res.status(200).json({message:"the products is updated succesfully",updateproduct:updateproduct});
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}
module.exports = {updateproducts};