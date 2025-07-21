const prisma = require('../../config/database');
const path = require('path');
const fs = require('fs');
const updateproducts = async (req, res) => {
    try {
        const { Name, Description, Price, Quantity, Category, categoryId } = req.body;
        const file = req.files;
        const { id } = req.params;
        if (!Name && !Description && !Price && !Quantity && !Category && !categoryId && (!file || file.length === 0)) {
            return res.status(400).json({ message: "you have to update atleast one information about the product" });
        }
        const OldImages = req.body.OldImages ? JSON.parse(req.body.OldImages) : [];
        const DeletedImages = req.body.DeletedImages ? JSON.parse(req.body.DeletedImages) : [];
        DeletedImages.forEach((deleteimage) => {
            const filePath = path.join(__dirname, "../../ProductsImage", deleteimage);
            fs.unlink(filePath, (error) => {
                if (error) {
                    console.log("deleted image failed", error.message);
                } else {
                    console.log("deleted of images is succesfully");
                }
            })
        });
        const Newfile = (file && file.length > 0) ? file.map((f) => f.filename) : [];
        const UpdateProduct = {};
        AllImages = [...Newfile, ...OldImages.filter(img => !DeletedImages.includes(img))];
        UpdateProduct.ProductsImage = JSON.stringify(AllImages);
        UpdateProduct.Name = Name;
        UpdateProduct.Description = Description;
        UpdateProduct.Price = parseFloat(Price);
        UpdateProduct.Quantity = parseInt(Quantity);
        UpdateProduct.Category = Category;
        UpdateProduct.categoryId = categoryId;
        const updateproduct = await prisma.products.update({
            where: {
                id: id
            },
            data: UpdateProduct
        });

        if (!updateproduct) {
            return res.status(500).json({ message: "error in database" });
        }

        return res.status(200).json({ message: "the products is updated succesfully", updateproduct: updateproduct });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}
module.exports = { updateproducts };