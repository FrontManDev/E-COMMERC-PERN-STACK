const prisma = require('../../config/database');

const DeleteFromCart = async (req, res) => {
    try {

        const { ProductId, UserId } = req.body;

        if (!ProductId || !UserId) {
            return res.status(400).json({ message: "bad requist" });
        }

        const cart = await prisma.cart.findUnique({
            where: {
                UserId: UserId
            }
        });

        if (!cart) {
            return res.status(500).json({ message: "error in database" });
        }

        const DeleteCartItem = await prisma.cartItem.delete({
            where: {
                CartId: cart.id
            }
        });

        if(!DeleteCartItem){
            return res.status(500).json({message:"faild of delting the Item"});
        }

        return res.status(200).json({message:"deleting of item is succes"});
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

module.exports = {DeleteFromCart};