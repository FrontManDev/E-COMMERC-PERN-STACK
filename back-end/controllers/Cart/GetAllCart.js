const prisma = require('../../config/database');
const GetAllCart = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'bad requsit' });
        }
        const cart = await prisma.cart.findUnique({
            where: {
                UserId: id
            }
        });
        if (!cart) {
            return res.status(500).json({ message: "cart not found" });
        }

        const CartItem = await prisma.cartItem.findMany({
            where: {
                CartId: cart.id
            }
        });

        if (!CartItem) {
            return res.status(500).json({ message: "cartItem not found" });
        }

        const ProductsId = CartItem.map((item) => item.ProductId);
        const Products = await prisma.products.findMany({
            where: {
                id: { in: ProductsId }
            }
        });

        if (!Products) {
            return res.status(500).json({ message: "Product not found" });
        }

        const ProdcutInCartItem = Products.map((product) => { return { ...product, QuantityInCart: CartItem.find((item) => product.id === item.ProductId) ? CartItem.find((item) => product.id === item.ProductId).Quantity : 0 } });
        
        return res.status(200).json({ message: "all the products of the cart is ", ProdcutInCartItem: ProdcutInCartItem })
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

module.exports = { GetAllCart };