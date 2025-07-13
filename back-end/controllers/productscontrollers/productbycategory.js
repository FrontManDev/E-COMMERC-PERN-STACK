const prisma = require('../../config/database');

const productbycategory = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.products.findMany({ where: { categoryId: id } });
        if(!product){
            return res.status(500).json({message:"error in database"});
        }

        return res.status(200).json({message:"all poducts by category",product:product});
    } catch (error) {
        return res.status(500).json({ Erro: error.message });
    }
}

module.exports = {productbycategory};