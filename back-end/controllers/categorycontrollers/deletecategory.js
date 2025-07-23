const prisma = require('../../config/database');
const fs = require('fs');
const path = require('path');
const deletecategory = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await prisma.products.findMany({
            where: {
                categoryId: id
            }
        });
        products.forEach((deletedProduct) => {
                const images = JSON.parse(deletedProduct.ProductsImage);
                images.forEach((img) => {
                    const filepath = path.join(__dirname, "../../ProductsImage", img);
                    try {
                        if (fs.existsSync(filepath)) {
                            fs.unlinkSync(filepath);
                        }
                    } catch (err) {
                        console.error("Failed to delete image:", img, err.message);
                    }
                });
        });
        const DeletedProduct = await prisma.products.deleteMany({
            where: {
                categoryId: id
            }
        });

        const deletedcategory = await prisma.category.delete({
            where: {
                id: id
            }
        });
        if (!deletedcategory || !DeletedProduct) {
            return res.status(500).json({ message: "error in database" });
        }

        return res.status(200).json({ messsage: "the category is deleted succesfully", deletedcategory: deletedcategory });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

module.exports = { deletecategory };
