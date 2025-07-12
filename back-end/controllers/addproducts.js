const prisma = require('../config/database');

const addproducts = async (req, res) => {
    try {
        const {Name,Description,Price,Quantity, Category } = req.body;
        const ProductsImage = req.file
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

module.exports = { addproducts };