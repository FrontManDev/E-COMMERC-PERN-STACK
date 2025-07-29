const prisma = require('../../config/database');
const MinusFromCart = async (req, res) => {
    try {
        const { ProductId, UserId } = req.body;
        if (!ProductId || !UserId) {
            return res.status(500).json({ message: "bad requist" });
        }
        const CartItem = await prisma.cartItem.findUnique({
            where: {
                ProductId_CartId: {
                    ProductId: ProductId,
                    UserId: UserId
                }
            }
        });

        const CartItemUpdate = await prisma.cartItem.update({
            where: {
                ProductId_CartId: {
                    ProductId: ProductId,
                    UserId: UserId
                }
            },
            data:{
                Quantity: CartItem.Quantity-1
            }
        });
        if(!CartItemUpdate){
            return res.status(500).json({message:"error in database"});
        }

        return res.status(200).json({message:"succes fully"});
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

module.exports = { MinusFromCart };