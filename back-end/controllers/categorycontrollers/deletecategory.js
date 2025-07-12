const prisma = require('../../config/database');
const deletecategory = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteproducts = await prisma.products.deleteMany({
            where: {
                categoryId: id
            }
        })
        const deletedcategory = await prisma.category.delete({
            where: {
                id: id
            }
        });
        if (!deletedcategory || !deleteproducts) {
            return res.status(500).json({ message: "error in database" });
        }

        return res.status(200).json({ messsage: "the category is deleted succesfully", deletedcategory: deletedcategory });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

module.exports = { deletecategory };
